---
layout: post
title: "Why Your AI is Probably Cheating (and How to Stop It)"
date: 2026-01-15 11:00:00 -0800
description: "Diving into One-Hot encoding, smart data splitting, and the trap of the single metric."
image: /assets/blog-images/12.png
---

In my last post, I teased the idea of **One-Hot Encoding** and mentioned how to tell if your model is actually "accurate." Well, today’s the day we look under the hood and realize that most models are actually lazy students... if you give them a chance to cheat, they will.

### 1. The "Dumb" Way to Talk to Computers: One-Hot Encoding
Last time we talked about Embeddings (the cool, multi-dimensional way to represent data). But before Embeddings became the gold standard, we had **One-Hot Encoding**.

Think of it like a giant checklist of "Yes/No" questions. If you have three colors—Red, Blue, and Green: One-Hot Encoding represents Red as `[1, 0, 0]`, Blue as `[0, 1, 0]`, and Green as `[0, 0, 1]`. 

So with One-Hot Encoding- the whole idea is simple, but it’s "dumb." Why? Because in this math, Red is just as different from Pink as it is from a Tractor. There is no nuance, no relationships, and if you have 10,000 categories, your spreadsheet suddenly has 10,000 extra columns. It's a memory nightmare. We usually use this for simple stuff, but for the complex "brain-like" behavior, we graduate to those Embeddings I mentioned before. It's good to know the difference!

### 2. The Great Validation Trap: Don't Split Randomly!
This is where most beginners (and even some pros) mess up. When you train a model, you split your data into a **Training Set** and a **Validation Set**, usually at an 80-20 ratio. Most people just do a "random shuffle." 

**Stop doing that.** If your data is a time series (like stock prices or sales over two years), and you split it randomly, your model "cheats." It sees data from Tuesday, skips Wednesday, and sees Thursday. When you ask it to predict Wednesday, it’s not "predicting"—it’s just interpolating because it already saw the future (Thursday). 

Instead, you should split your data **temporarily**. Use the first 18 months to train, and the *last* 6 months to validate. This forces the model to actually learn the patterns and predict an unknown future, rather than just memorizing the gaps in the past.

### 3. The Danger of the "One Metric" Obsession
We all want a high "Accuracy" score. It feels good. But Accuracy is often a liar. 

Imagine you’re building an AI to detect a super rare disease that only 1 in 1,000 people have. If I build a "model" that just says **"No, you don't have it"** to every single person, my model is **99.9% accurate.** I’d be a hero on paper, but a disaster in the real world because I missed every single sick person. 

#### What to do instead?
Don't just look at Accuracy. Look at:
* **Precision and Recall:** Are you catching the rare events? How many "False Alarms" are you triggering?
* **The Confusion Matrix:** A literal table that shows exactly where the model is getting confused. 
* **The "Eye Test":** Actually look at the rows your model got wrong. Is there a pattern to its failures?

For those who don't know those terms, think about this super tiny example: instead if the model's prediction is right or wrong, perhaps you should consider the *trend* the model is going for as well to see if that matches the training data's trend?

---

### The Takeaway
Training a model isn't just about hitting "Run" and watching the loss go down. It’s about setting up a fair "test" that the model can't cheat on. If you give it a random split and a single metric to optimize, it will find the path of least resistance—which usually isn't the path to true intelligence.

As a case in point, imagine a student who memorizes a practice test and aces it because they remember all the questions and answers. As soon as you give them the real test which has changes such as shuffling, wording, etc. the student will not be able to answer since they don't understand the concepts... they only memorized the practice test!