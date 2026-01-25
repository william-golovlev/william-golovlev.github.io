---
layout: post
title: "The Atoms of AI: Understanding Tensors"
date: 2026-01-25 00:00:00 -0800
description: "Breaking down what tensors actually are and why they're the foundation of machine learning."
image: /assets/blog-images/1.png
---

When you start looking into how AI actually works under the hood, you run into the word "tensor" almost immediately. It sounds like some complex term from a physics textbook, but at its core, it's the foundation of everything we do in machine learning.

In this first part of my learning series, I wanted to break down what a tensor actually is and why we use them instead of standard programming tools like Python lists or Excel-style spreadsheets.

<div class="video-container">
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/zzjUZ0q9J1c" 
    title="The Atoms of AI: Understanding Tensors" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

### What is a Tensor?

The simplest way to think about a tensor is as a matrix of numbers. It doesn't have to be some complicated 3D box.

- A scalar (just a single number like 99) is technically a rank zero tensor.
- A list of numbers is a rank one tensor.  
- A grid or matrix is a rank two tensor.

While we often visualize them as grids of numbers, they're much more than just static data storage.

### Tensors vs. DataFrames

If you've done any data work in Python, you probably know about Pandas DataFrames or NumPy arrays. You might wonder why we don't just use those for AI.

The biggest difference is that tensors are optimized for computers, not humans. A DataFrame has labels and indices that make it easy for us to read, but computers don't care about labels. They care about raw numbers and speed. Tensors strip away the "human-friendly" parts to focus on performance.

### The Secret Sauce: Tracking History

The most important thing I learned is that tensors in libraries like PyTorch or TensorFlow have a "memory."

When you perform math on a tensor, it doesn't just give you the result. It keeps track of every operation that happened to it in something called a computational graph.

In PyTorch, there's a setting called `requires_grad`. When this is on, the tensor records its history. This is vital for AI because:

1. The model makes a prediction.
2. It looks at the error.  
3. It uses that "memory" to backtrack and figure out exactly which numbers (weights) need to be adjusted to get a better result next time.

Without this ability to remember the history of the math, the model wouldn't be able to learn from its mistakes.

### Turning the Knobs

Think of a machine learning model like an old radio. You're trying to turn the knobs to find the perfect frequency. Tensors allow the computer to know exactly how much to turn each knob.

Sometimes we want to stop the recording, like when we're actually updating the settings and don't want to create a messy feedback loop. We use a setting like `torch.no_grad` to pause the tracking while we make our final adjustments.

### The Bottom Line

Tensors are the building blocks of AI because they're fast, they're focused purely on numbers, and they remember the path they took to get to a result. That "computational history" is what actually allows a machine to learn.

I'm still learning this as I go, and it can definitely feel like a lot of jargon at first. But once you see tensors as a grid of numbers with a memory, the rest of the machine learning world starts to make a lot more sense.

Let me know what you think in the comments, and stay tuned for more videos in this series!
