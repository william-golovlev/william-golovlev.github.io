---
layout: post
title: "Beyond the JSON Bridge: The Rise of Code-Centric Agents"
date: 2026-04-08 12:00:00 -0800
category: "AI Engineering"
tags: ["AI Agents", "Code Agents", "ReAct", "Tool Calling", "Claude", "Gemini", "AI Architecture"]
image: /assets/blog-images/20.png
description: "How we're moving from models that ask to use tools to models that write the logic to use those tools."
author: "William Golovlev"
---

## The Two Paths of Agentic Action

The world of AI agents is undergoing a fundamental transformation. For years, we've operated under one paradigm, but a new approach is emerging that promises to change how agents think and work. Understanding this shift is critical for anyone building or working with AI systems.

### The ReAct Paradigm (JSON): The Classic Approach

The "Reason + Act" (ReAct) paradigm has been the workhorse of agentic AI. It's beautifully simple: the model outputs a structured JSON block, the system executes it, and feeds the result back. Think of it like:

```json
{"tool": "weather", "args": {"city": "NYC"}}
```

This approach is predictable, safe, and easy to debug. The model essentially asks permission to use a tool, waits for the result, and then decides what to do next. It's the "classic" way we've built agents for years.

### The Code Agent Paradigm: The New Frontier

The newer approach is radically different. Instead of a rigid schema, the model writes a snippet of executable code to achieve a goal. Rather than asking to use a weather tool, it might write:

```python
import requests
weather_data = requests.get(f"https://api.weather.com/v1/weather?city=NYC").json()
temperature = weather_data['current']['temp']
print(f"The temperature in NYC is {temperature}°F")
```

### The Core Shift: From Asking to Doing

This is the fundamental change: **we're moving from models that ask to use a tool to models that write the logic to use those tools.** It's the difference between asking someone to pass you a screwdriver and just building the damn thing yourself.

---

## How the Frontier Models Do It

### Claude (Anthropic): The Hybrid Approach

Claude uses an interesting hybrid strategy. For broad ecosystem interactions like web searching, it sticks with **Tool Calling** (structured JSON). But behind the scenes, it utilizes **"Agent Swarms"** or sub-agents to handle multi-step reasoning. It's like having a manager who delegates specific tasks to specialists.

### Gemini (Google): The Thinking Agent

Gemini takes a different approach with its **"Thinking" as Chain-of-Thought (CoT)**. This is the hidden reasoning layer where it executes a Think -> Observe -> React loop before giving you the final answer. Gemini emphasizes "native" tool use where the reasoning and execution are tightly coupled in the model's internal processing.

The "Thinking" block is essentially an internal monologue that prevents users from seeing the messy "trial and error" phase of the agent's work. It's like watching a chef's final plated dish versus seeing all the burnt attempts and spilled ingredients.

---

## The Rule of Thumb: Don't Overengineer

### Simple is Better

If you just need the current temperature, a simple JSON tool call is perfect. It's fast, predictable, and uses minimal resources.

### The Overengineering Trap

Using a full Code Agent (with a VM spin-up and logic overhead) for a basic API fetch is like using a chainsaw to cut a grape. You're introducing complexity, security risks, and latency for no real benefit.

### When Code Agents Win

Code agents shine in three key scenarios:

**Ambiguity**: When the workflow isn't a straight line. "Clean this messy CSV and find the outliers" requires judgment, conditional logic, and iterative processing that's painful to express in JSON.

**Complex Data Types**: JSON struggles with non-serializable objects. Try passing a live database connection, a complex PyTorch model object, or large binary blobs through JSON. You'll end up with 20 different tool definitions to handle what code can do in one line.

**Logic Density**: Code allows agents to do if/else, loops, and data transformations locally without needing to call the LLM for every single tiny step. This is crucial for performance and cost efficiency.

---

## Comparison: Frameworks at a Glance

| Framework | Primary Logic | Philosophy |
|-----------|---------------|------------|
| HF SmolAgents | Code-First | Minimalist; the agent writes Python. Extremely high efficiency for complex tasks. |
| LangGraph | State-First | Focuses on "cycles" and controlled graphs. Great for complex, repeatable business logic. |
| LlamaIndex ReAct | JSON-First | Optimized for RAG; uses tool-calling to fetch data and reason over documents. |

---

## The Security Elephant in the Room

### The Risk

A code agent is, by definition, an "Arbitrary Code Execution" engine. It can (and eventually will) try to do something unwanted--either by mistake or through prompt injection. This isn't a theoretical concern; it's a certainty.

### The Solution: The Micro-VM Sandbox

Never run agent code on your host machine. Ever.

The solution is lightweight VMs (like Firecracker or specialized Docker containers) with strict import controls. Only allow the libraries the agent actually needs (e.g., pandas, requests). Block `os`, `sys`, or `subprocess` entirely.

Think of it like a chemistry lab: you don't let random interns mix whatever chemicals they want in the main building. You give them a fume hood with specific, approved reagents.

---

## Conclusion: Choosing Your Architecture

The choice between ReAct/JSON and Code Agents isn't about which is "better"--it's about which is right for your use case.

**Use ReAct/JSON for:**
- Rigid, predictable tool use
- Simple API calls
- High-security environments
- When you need maximum control and observability

**Use Code Agents for:**
- Open-ended data science tasks
- Complex reasoning with ambiguity
- When "tooling" requires actual logic
- Performance-critical data processing

The most powerful agents of the future won't just follow a script; they'll write it. But like any powerful tool, the key is knowing when to use it and when to reach for something simpler.

---

*This post explores the fundamental architectural shift in AI agents from structured tool calling to code-native reasoning. Understanding this evolution is crucial for making informed decisions about agent architecture in your own projects.*
