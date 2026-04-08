---
layout: post
title: SQL Window Functions - A Beginner to Intermediate Guide
date: 2025-09-09 11:00:00 -0800
description: A SQL tutorial to learn about window functions.
image: /assets/blog-images/5.png
tags: ["SQL", "Database", "Data Analysis", "Window Functions", "Tutorial"]
category: "Data Engineering"
author: "William Golovlev"
---

I'll be honest: window functions changed my entire approach to SQL. Before I really understood them, I was writing these insane subqueries and self-joins that were 200 lines long just to calculate running totals. Then I discovered OVER() and my code got 10x cleaner.

Here's the deal: window functions let you do calculations across a set of rows while keeping all your original rows. Unlike regular aggregate functions that smash everything into one row, window functions give you the calculation result for each row.

### The OVER() Clause: Your New Best Friend

The OVER() clause is where the magic happens. You can leave it empty, or add PARTITION BY and ORDER BY.

PARTITION BY splits your data into groups. Think of it like GROUP BY but without smashing your rows together. Each group gets its own calculation.

ORDER BY puts rows in order within each group. Super important for rankings and running totals—otherwise you're just calculating random numbers.

The basic pattern looks like this:

```sql
WINDOW_FUNCTION() OVER (
    PARTITION BY column1, column2,
    ORDER BY column3
)
```

Simple enough, right? Now let's get to the good stuff.

### Ranking Functions: The Easy Wins

These are the functions I use every single day:

**ROW_NUMBER()** - Gives each row a unique number. Simple. I use this to find the Nth record in each group.

**RANK()** - Same numbers for ties, but skips the next rank. So if two people tie for 2nd place, the next person gets 4th.

**DENSE_RANK()** - Same numbers for ties, but doesn't skip. Two people tie for 2nd, next person gets 3rd.

**NTILE(n)** - Splits rows into n equal groups. Great for quartiles or deciles.

Here's a real example I used last week. I needed to find the top-selling product in each region:

```sql
SELECT 
    product,
    region,
    amount,
    ROW_NUMBER() OVER(PARTITION BY region ORDER BY amount DESC) as regional_rank
FROM sales
WHERE regional_rank = 1;  -- Only the #1 product per region
```

Clean, right? Before window functions, I would have needed a subquery with a self-join. Nightmare fuel.

### LAG() and LEAD(): Time Travel in SQL

LAG() lets you peek at previous rows. LEAD() shows you future rows. Incredibly useful for time-series data.

```sql
LAG(sales_amount, 1, 0) -- Previous row's sales, default to 0 if none
LEAD(sales_amount, 1, 0) -- Next row's sales, default to 0 if none
```

I used this to calculate day-over-day sales changes:

```sql
SELECT 
    sale_date,
    amount,
    LAG(amount, 1) OVER(ORDER BY sale_date) as prev_day,
    amount - LAG(amount, 1) OVER(ORDER BY sale_date) as daily_change
FROM sales
```

The first row shows NULL for prev_day since there's no previous day. That's normal—you can handle it with COALESCE() if needed.

### Advanced Stuff: Running Totals and Rolling Averages

This is where window functions really shine. You can turn regular aggregates into window functions just by adding OVER().

Running totals changed my life when I was building financial reports. No more complex subqueries or self-joins.

```sql
SELECT 
    sale_date,
    amount,
    SUM(amount) OVER(ORDER BY sale_date) as running_total
FROM sales
```

That's it. That's the whole running total. Every row shows the cumulative sum up to that date. Beautiful.

### Window Frames: Precision Control

Sometimes you don't want the entire partition. Maybe you just want the last 7 days, or the 3 rows before and after.

ROWS BETWEEN gives you that control. You can specify exactly which rows to include in your calculation.

Here's a 3-day rolling average I used for smoothing out volatile sales data:

```sql
SELECT 
    sale_date,
    amount,
    AVG(amount) OVER(
        ORDER BY sale_date 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as three_day_avg
FROM sales
```

This looks at today plus the previous 2 days. You can also do FOLLOWING, or mix them like `BETWEEN 1 PRECEDING AND 1 FOLLOWING` for a centered window.

Look, window functions aren't just some fancy SQL feature—they're fundamental tools that will make you a better data analyst. I went from writing 200-line queries to 20-line queries once I really got them.

Start with ROW_NUMBER() and LAG(). Those alone will solve 80% of the problems you're probably using subqueries for right now.

Want to practice? [DataLemur](https://datalemur.com/) has good datasets. But honestly, the best way to learn is to find a complex query you wrote last month and rewrite it with window functions. You'll be amazed at how much cleaner it becomes.
