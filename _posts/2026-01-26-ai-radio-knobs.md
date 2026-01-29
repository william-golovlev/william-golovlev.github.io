---
layout: post
title: "The Radio Knobs of AI: Weights, Biases, and the Learning Loop"
date: 2026-01-26 00:00:00 -0800
description: "Understanding how AI models actually learn through weights, biases, gradients, and the training loop."
image: /assets/blog-images/15.png
tags: ["Machine Learning", "Weights", "Biases", "AI Tutorial", "Neural Networks", "Model Training"]
category: "AI/ML"
author: "William Golovlev"
---

In my last post, we found the "Scorecard" (Loss). But a score is useless if you don't know how to change it. Today, we meet the only two things an AI can actually move: Weights and Biases.

## What are we actually turning?

Think of an AI model like an old-school radio. To get the signal clear, you have to twist the knobs.

**Weights:** These decide "How much do I care about this data?" If we're predicting house prices, the "Number of Rooms" gets a big weight. The "Color of the Mailbox"? A tiny weight.

**Biases:** This is the "Base Level." It's the starting point before we even look at the data.

### The Code Lab

In my init_coeffs function, I'm setting up these knobs. Notice the - 0.5? That's me centering the knobs at zero so we start the game totally unbiased.

```python
def init_coeffs(n_coeffs):
    # Creating our knobs and centering them at 0
    return (torch.rand(n_coeffs) - 0.5).requires_grad_()
```

*Note: We use requires_grad_() because it tells the "Atoms" to remember every time we turn the knob. This is how the AI keeps track of its own history!*

---

## The AI Compass (Gradients & The Mountain of Loss)

If you had 1,000 radio knobs, you'd be guessing forever. You need a compass to tell you which way to turn them. That compass is the Gradient.

### The Mountain in the Fog

Imagine you're standing on a foggy mountain (High Loss). You want to get to the valley (Zero Loss). You can't see the bottom, but you can feel the slope under your feet.

- The Gradient is that slope.
- Gradient Descent is the act of taking a step downhill.

### The "Step Size" (Learning Rate)

How big is your step?

- Too small? You'll never reach the valley.
- Too big? You'll over-jump the valley and fly off the mountain. In the code, we call this the lr (Learning Rate).

*Note: Why do we call coeffs.grad.zero_()? Because after every step, we need to wipe the "old" directions off the map. If we don't, the AI tries to walk in two directions at once and gets lost!*

---

## The Grand Finale (The Full Loop)

We've got the Atoms, the Scorecard, the Knobs, and the Compass. Now, we pull the trigger. This is the "Master Loop" that makes AI actually work.

### The 4-Step Cycle

Every AI, from a simple calculator to ChatGPT, follows this exact loop:

1. **Predict:** The AI gives its "Opinion."
2. **Loss:** The "Scorecard" tells us how far off we are.
3. **Backward:** The "Compass" (Gradient) finds the downhill path.
4. **Step:** We turn the knobs (Weights) and go again.

### The Full Code Reveal

Here it is—the entire engine in just a few lines of PyTorch:

```python
# 1. Start the game
coeffs = init_coeffs(n_coeffs)

# 2. Check the score
loss = calc_loss(coeffs, indeps, deps)

# 3. Find the way downhill
loss.backward()

# 4. Take the step
with torch.no_grad():
    coeffs.sub_(coeffs.grad * lr)
    coeffs.grad.zero_()
```

**The Result:** I ran this 10 times, and the Loss dropped from 0.51 to 0.02. The AI didn't "think"—it just followed the compass until it stopped being wrong.

<div class="video-container">
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/kfLRVfHFnmI" 
    title="The Radio Knobs of AI: Weights, Biases, and the Learning Loop" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

---

This completes our journey through the fundamental building blocks of machine learning. From tensors to loss functions, from weights and biases to gradients and the training loop—these are the universal patterns that power every AI system, from the simplest linear regression to the most complex language models.

The beauty is in the simplicity: AI doesn't "think" in the way humans do. It's just a mathematical process of following gradients downhill until it finds the lowest possible error. It's elegant, it's powerful, and now you understand exactly how it works.

Let me know what you think in the comments, and stay tuned for more deep dives into the world of AI!
