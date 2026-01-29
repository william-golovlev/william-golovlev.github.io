---
layout: post
title: Random Forests in 10 Minutes - Wisdom of the Crowd
date: 2026-01-28 00:00:00 -0000
description: Moving from a single neural network to a "forest" of decision makers.
image: /assets/blog-images/18.png
tags: ["Machine Learning", "Random Forest", "Decision Trees", "AI Tutorial", "PyTorch"]
category: "AI/ML"
author: "William Golovlev"
---

In my last post, we built a Neural Network from scratch. It was powerful, but it was also a "black box" that required constant babysitting of learning rates and gradients. Today, we're looking at an algorithm that is much harder to break and often performs better on tabular data: the **Random Forest**.

<div style="text-align: center; margin: 2rem 0;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/KltwEHLvto4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

We're still using **Pandas** for our data and **Pandas** logic to understand the mechanics, but the strategy has changed. Instead of one complex brain, we are using a "committee" of hundreds of simple Decision Trees. If you missed the basics of how we prep the Titanic data, check out my full series here: [https://www.youtube.com/@WillGWithAI](https://www.youtube.com/@WillGWithAI)

---

### The Decision Tree: The DNA of the Forest 🌲

Before you have a forest, you need a tree. A Decision Tree is just a series of binary "If/Then" questions.

**The Logic:** Is the passenger male? If yes, was their ticket 3rd class?

**The Problem:** A single tree is a "perfectionist." It will memorize your training data so well that it fails on any new passenger it hasn't seen before. In the AI world, we call this **overfitting**.

> **Thought Provoker:** If you ask one person for medical advice, they might be wrong. If you ask 1,000 people and take the most common answer, you're tapping into the "Wisdom of the Crowd." At what point does a group of "simple" thinkers become more reliable than one "genius" expert?

---

### Bagging: Creating Diversity through Randomness 🎲

How do we make sure our 100 trees aren't all just clones of each other? We use a technique called **Bagging** (Bootstrap Aggregating).

In the video, I explain how we don't show every tree the same data. We give each tree a random subset of passengers and, crucially, a random subset of **features** (like Age, Sex, or Fare).

**Tree A** might only see Age and Siblings.

**Tree B** might only see Fare and Pclass.

**The Result:** Because the trees see different things, they make different mistakes. When we average their votes, the mistakes cancel out, and the "truth" remains.

**Challenge:** After watching the 10-minute guide, can you explain why we intentionally withhold certain columns from each tree? What would happen if every tree saw the "Sex" column first?

---

### Stability vs. Complexity: Why the Forest Wins 🏛️

The beauty of the Random Forest is that it doesn't care if your data is "noisy" or if you forgot to normalize your numbers.

**Handling Outliers:** A single person with a $500 ticket won't ruin a Random Forest the way it might throw off a Neural Network's gradients.

**No Babying:** You don't have to worry about "exploding gradients" or setting a learning rate to exactly 2.0. You just grow the trees and let them vote.

> **Thought Provoker:** If Random Forests are more stable and easier to build, why did we spend so much time learning about Neural Networks? Are there some problems a forest simply can't "see"?

---

### Final Reflection: The Tools in Your Belt 🌐

Building this Titanic predictor in 10 minutes shows just how accessible these powerful tools have become. I'm starting to realize that "AI" isn't one specific thing—it's a toolbox. Sometimes you need the surgical precision of a Neural Network; other times, you need the brute-force reliability of a Random Forest.

**The Trade-off:** We hit high accuracy again, but we traded "mathematical elegance" for "logical voting."

**The Future:** As I dive deeper into these algorithms, I'm finding that the most important skill isn't just writing the code—it's knowing which tool to grab for the job at hand.

I'm still reeling from how much simpler this was than the NN training loop. What do you think—is "simpler" always "better" in AI?
