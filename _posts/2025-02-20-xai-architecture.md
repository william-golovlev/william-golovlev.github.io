---
layout: post
title: "Building Trust in AI: Engineering an Explainable Document Research Assistant"
date: 2025-02-20 12:20:00 -0800
description: "How I solved the AI 'Black Box' problem using hybrid search, reranking, and programmatic faithfulness scoring to create a transparent RAG pipeline."
image: /assets/blog-images/xai-architecture.png
tags: ["RAG", "Explainable AI", "LangSmith", "ChromaDB", "BM25", "FlashRank", "AI Trust"]
category: "AI Engineering"
author: "William Golovlev"
---

## The Black Box Dilemma in Professional AI Adoption

As artificial intelligence becomes more sophisticated, organizations face a critical trust gap: how do we know if the AI is providing accurate, grounded answers or simply hallucinating? This "Black Box" problem has been one of the biggest barriers to enterprise AI adoption, especially in high-stakes domains like legal research, medical analysis, and document intelligence.

My XAI Document Research Assistant was designed to solve this fundamental challenge by making every step of the retrieval-augmented generation (RAG) pipeline transparent and verifiable.

## Architecture Overview: The Hybrid Retrieval Strategy

The core insight was that no single retrieval method works perfectly for all query types. I implemented a **hybrid search approach** that combines the strengths of two complementary systems:

### Semantic Search: Finding Concepts
Using `all-MiniLM-L6-v2` embeddings with ChromaDB, the system excels at understanding conceptual relationships and semantic similarity. When users ask "What are the key themes in this document?" or "Explain the methodology," semantic search finds relevant passages through vector similarity.

### Keyword Search: Finding Specifics
But semantic search alone struggles with exact matches—specific IDs, part numbers, or rare acronyms. That's where **BM25** (Best Matching 25) comes in. By treating the document corpus as a search engine, BM25 can find that "needle in a haystack" when users query for exact terms like "model X-17" or "section 4.2(b)."

### The Reranking Layer: Quality Control
Even with hybrid search, you get potentially 20 relevant chunks. Users shouldn't have to sift through them. **FlashRank** provides the final quality filter—a cross-encoder reranker that scores passages by relevance to the specific query. This ensures the most contextually appropriate content reaches the language model.

## The Trust Layer: Programmatic Faithfulness Scoring

Here's where the system becomes truly transparent. Instead of just trusting the output, I built an automated evaluation pipeline using **Ragas**:

```python
# The system automatically scores each answer on faithfulness
# High faithfulness (0.95+) means the answer is derived solely from retrieved documents
# Low faithfulness indicates potential hallucination
evaluation = evaluator.evaluate_faithfulness(question, answer, retrieved_chunks)
```

But scoring alone isn't enough—the real breakthrough was integrating this with **LangSmith tracing**. Every interaction gets a unique trace URL showing exactly which documents were retrieved, how they were reranked, and what the final answer was. No more "trust me, it works"—the evidence is right there in the trace.

## Engineering Challenges and Solutions

### The Database Sync Problem
One of the most challenging issues was maintaining consistency between the Streamlit UI and the ChromaDB backend. When users removed files from the uploader, the database still contained the old embeddings, creating a state mismatch.

**Solution:** Implemented a lifecycle management system that compares `processed_files` with current `uploaded_files` on every script rerun, automatically purging deleted files from the database:

```python
# Detect deletions and sync database
current_uploaded_names = [f.name for f in uploaded_files] if uploaded_files else []
files_to_remove = [f for f in st.session_state.processed_files if f not in current_uploaded_names]

for file_name in files_to_remove:
    st.session_state.rag_app.db.delete_file(file_name)
    st.session_state.processed_files.remove(file_name)
```

### The BM25 Index Sync Issue
The most insidious bug was the "documents don't match index corpus!" error. This occurred because after file deletion, the BM25 index still referenced the old corpus size while the chunks cache had been updated.

**Solution:** Rebuild both the chunks cache and BM25 index atomically after every deletion:

```python
# Rebuild both cache and index from remaining documents
leftovers = self.collection.get(include=["documents"], limit=self.collection.count())
self.chunks_cache = leftovers["documents"]
tokenized_chunks = [simple_tokenizer(chunk) for chunk in self.chunks_cache]
self.bm25 = BM25Okapi(tokenized_chunks) if self.chunks_cache else None
```

## Performance Optimizations

### Batch Encoding for Large Documents
Processing embeddings can be memory-intensive. I implemented batch processing with progress tracking:

```python
batch_size = 10
total_batches = (len(chunks) + batch_size - 1) // batch_size

for i in range(0, len(chunks), batch_size):
    batch_chunks = chunks[i:i+batch_size]
    batch_embeddings = np.array(self.model.encode(batch_chunks, normalize_embeddings=True)).tolist()
    # Update progress bar for user feedback
    update_progress(current_batch, total_batches)
```

### Singleton Pattern for Resource Management
Multiple RAG instances would cause memory bloat and inconsistent state. Using `@st.cache_resource` ensures exactly one instance per session:

```python
@st.cache_resource
def get_rag_app(persist_dir='./db'):
    """Singleton pattern to ensure only one RAGApp instance."""
    return RAGApp(persist_dir)
```

## The Audit Trail: LangSmith Integration

Every interaction is automatically traced with detailed metadata:

- **Query Analysis**: Shows the HyDE-generated search query
- **Retrieval Metrics**: Number of chunks found, search method used
- **Reranking Results**: FlashRank scores and final selection
- **LLM Performance**: Token usage, latency measurements  
- **Faithfulness Score**: Automated quality assessment

This creates a complete audit trail that can be reviewed for compliance, accuracy, and performance analysis.

## Lessons Learned

### 1. State Management is Critical
The most complex bugs weren't in the algorithms—they were in the state management. Multi-user environments require careful synchronization between UI state, database state, and cache state.

### 2. Error Handling Must Be Granular
Generic "database error" messages aren't helpful. Specific error handling that tells users exactly what went wrong (and suggests solutions) dramatically improves user experience.

### 3. Performance Requires Visibility
Users need to see what's happening. Progress bars, status messages, and debug logs aren't just nice-to-have—they're essential for building trust in production systems.

### 4. Testing Edge Cases
The system works perfectly with single documents, but the real test is multi-document workflows: adding, removing, switching between documents. These edge cases revealed the most critical bugs.

## The Impact: From Black Box to Glass Box

This architecture transforms the AI from a mysterious oracle into a transparent system where:

- **Users can verify** every answer against source documents
- **Administrators can audit** every interaction for compliance  
- **Developers can debug** issues with complete trace information
- **Stakeholders can trust** the outputs because they're systematically validated

The result isn't just a better document research assistant—it's a template for building trustworthy, explainable AI systems that can be deployed in high-stakes professional environments.

**Try the live demo:** [XAI Document Research Assistant](https://huggingface.co/spaces/william-ai-dev/xai-document-research)

---

*This post demonstrates the technical depth and problem-solving approach required to build production-ready AI systems that prioritize transparency, reliability, and user trust over algorithmic black boxes.*
