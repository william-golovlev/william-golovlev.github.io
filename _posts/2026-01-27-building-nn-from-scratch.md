---
layout: post
title: Turning the Key - Building a Neural Network From Scratch
date: 2026-01-27 12:00:00 -0000
description: Going line-by-line through the "Master Loop" that powers modern AI.
image: /assets/blog-images/17.png
---

Most people treat AI like a "black box": you put data in, and a prediction pops out. But if you want to actually *build* the future, you have to understand the engine. In this finale, we stop talking about theory and start looking at the actual code that predicts Titanic survivors, where you'll see the model getting smarter in real time.

<div style="text-align: center; margin: 2rem 0;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/DQdX1Xsgvg4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

We aren't using `scikit-learn` shortcuts here. We are using **PyTorch Tensors**, manual **Gradient Descent**, and custom **Matrix Multiplication** to show exactly how a machine "learns." (If you don't know what any of these terms are, you should look them up before continuing. My series covers them on YouTube! [https://www.youtube.com/@WillGWithAI](https://www.youtube.com/@WillGWithAI))

---

### The Anatomy of the Master Loop: 4 Lines of Code ⚙️

Every advanced AI follows the same pattern. When we go line-by-line through my `train_model` function, we see the 4-step cycle:

1. **The Forward Pass:** Taking raw passenger data and "squeezing" it through a Sigmoid activation. Sigmoid is a function that takes a number and returns a number between 0 and 1 which is good for our model because it makes the data less "noisy" and easier to work with. 
2. **The Loss Calculation:** Comparing the AI's "opinion" to the actual survival records. This is done with comparing our prediction to the actual value doing something such as mean squared error or cross-entropy for example.
3. **The Backward Pass:** Using the `loss.backward()` command to find the downhill slope for every weight. Remember that loss is both a number that represents how wrong our model is and a tensor that comes with useful information about the slope of the loss function. The lower the loss, the better our model is doing. We are not able to figure these things out without PyTorch's automatic differentiation and other tools not provided in other datastructures like a numpy array, Pandas dataframe, or a simple list. 
4. **The Step:** Manually adjusting our "Radio Knobs" (weights) to be slightly less wrong next time. This is done with taking our gradient that was assigned by the backward pass and using it to adjust our weights * the learning rate. Remember, we don't want to track this gradient for every weight, so we use `layer.grad.zero_()` to reset it to 0 after every step. In my video, I give the analogy that resetting the gradient to 0 after every step is like making sure your GPS is always pointing in the right direction, rather than the direction it was pointing before.

> **Thought Provoker:** If an AI is just a series of matrix multiplications and subtractions, at what point does "math" become "intelligence"? Or is "intelligence" just a word we use for very complex statistics? As of writing this article, it feels crazy to me that this tabular data can be used to predict survival on the Titanic with such accuracy, using matrix multiplications and subtractions. 

---

### Squeezing Reality: Why Sigmoid Matters 🔄

In the code, you'll see us wrap our results in `torch.sigmoid()`. Without this, our model would just output random, giant numbers. 

- **Normalization:** We had to divide our inputs by their maximum values. Why? Because an "Age" of 80 shouldn't be 80x more important than a "Class" of 1 just because the number is bigger.
- **The Probability Squeeze:** The Sigmoid function ensures the AI gives us a clean answer between 0 and 1. 

**Challenge:** Take a look at the `LogFare` column we created. After watching the video, can you explain in your own words why we took the log of the fare instead of using the raw dollar amount?

---

### The "Zero Grad" Mystery: Wiping the Compass 🧭

One of the most confusing lines for beginners is `layer.grad.zero_()`. In PyTorch, gradients *accumulate*. If you don't wipe the compass clean after every step, the AI tries to follow the directions from where it *used* to be, not where it *is* now. Remember the GPS analogy right above?

- **What happens if you delete that line?** Your AI will likely "explode," taking massive, erratic steps until the numbers become `NaN` (Not a Number). Computers have limits, just like you do.
- **The Human Parallel:** Do we do this? When you learn from a mistake, do you carry the old "bad" data with you, or do you start fresh with a new perspective? I'm making connections with our brain and AI here, but I'm not sure if I'm ready to answer that question personally.

---

### Final Reflection: What’s Next? 🌐

We’ve built the engine. We’ve seen the numbers drop. We’ve hit 83% accuracy. But building a model/watching the video is only half the battle. the real magic is knowing *why* it works and *where* it fails. I can't stress enough- if you watch the video, please deep dive in the terminolgy I use that may be new to you. 

- **Overfitting:** If we ran this loop 10,000 times, would the AI get "smarter," or would it just memorize the names of the survivors?
- **The Bias in the Data:** If our data is from 1912, can this model predict anything about a shipwreck in 2026?

I have such a different perspective on AI now that I see how it works on a low level. I can't wait to see what I can build with this knowledge!