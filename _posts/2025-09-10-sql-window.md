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

SQL window functions are one of the most powerful tools in a data analyst's arsenal, allowing you to perform calculations across a set of table rows that are somehow related to the current row. Unlike aggregate functions (like `SUM()` or `COUNT()`), which collapse rows into a single summary row, window functions perform a calculation and return a value for each row in the result set.

The core syntax for any window function is the OVER() clause. This is what transforms an ordinary aggregate function into a window function.

### 1. The Basics: OVER() and Partitions

The `OVER()` clause is where you define the "window" or set of rows the function will operate on. It can be empty, or it can contain two important clauses: PARTITION BY and ORDER BY.

PARTITION BY: This clause divides your data into separate groups, or "partitions." The window function is then applied independently to each partition. This is similar to a GROUP BY clause, but it doesn't collapse the rows.

ORDER BY: This clause orders the rows within each partition. This is crucial for ranking functions and for sequential calculations like running totals.

Basic Syntax:

```sql
WINDOW_FUNCTION() OVER (
PARTITION BY column1, column2, ...
ORDER BY column3, ...
)
```

### 2. Beginner's Toolkit: Ranking and Value Functions

These are a great starting point for understanding how window functions work.

a. Ranking Functions 🏆

Ranking functions assign a rank to each row based on the specified order.
Function Description Example Use Case
`ROW_NUMBER()` Assigns a unique, sequential integer to each row within the partition. Ranking products by sales within a region.
`RANK()` Assigns the same rank to rows with the same value, then skips the next rank. Finding the top 3 students by score, where ties get the same rank.
`DENSE_RANK()` Assigns the same rank to rows with the same value, but does not skip the next rank. The same as RANK(), but without gaps in the ranking.
`NTILE(n)` Divides rows into n groups and assigns a group number. Splitting customers into four quartiles based on spending.

Example:
Imagine a sales table. To rank products by sales amount within each region:
SQL

```sql
SELECT
product,
region,
amount,
ROW_NUMBER() OVER(PARTITION BY region ORDER BY amount DESC) AS regional_rank
FROM
sales;
```

### b. Value Functions ➡️

These functions let you access a value from a preceding or succeeding row in your window. They are essential for comparing a row to a previous or next one, often in time-series data.

    `LAG(column_name, offset, default_value)`: Retrieves a value from a row before the current row. offset is how many rows back you want to look, and default_value is what to return if there's no row.

    `LEAD(column_name, offset, default_value)`: Retrieves a value from a row after the current row.

Example:
To find the difference in sales amount from the previous sale:
SQL

```sql
SELECT
sale_date,
amount,
LAG(amount, 1, 0) OVER(ORDER BY sale_date) AS previous_amount,
amount - LAG(amount, 1, 0) OVER(ORDER BY sale_date) AS amount_difference
FROM
sales;
```

### 3. Intermediate Toolkit: Advanced Aggregates and Window Frames

Once you're comfortable with the basics, you can unlock the true power of window functions.

a. Aggregate Functions as Window Functions 📊

You can use standard aggregate functions like `SUM()`, `AVG()`, `MIN()`, and `MAX()` as window functions by adding `OVER()`. The key is defining the window to get a running total or rolling average.

Example: Running Total
To calculate the cumulative sales total over time:
SQL

```sql
SELECT
sale_date,
amount,
SUM(amount) OVER(ORDER BY sale_date) AS running_total
FROM
sales;
```

Without a `PARTITION BY`, this calculates the running total across the entire table.

b. Window Frames: ROWS and RANGE

This is a more advanced concept that gives you granular control over the "window" of rows an aggregate function operates on. It defines a subset of the partition.

    ROWS: Defines the window based on a number of physical rows.

    RANGE: Defines the window based on a range of values within the ORDER BY column.

Common keywords include PRECEDING, FOLLOWING, and CURRENT ROW.

Example: Rolling Average
To calculate the average sales for the current day and the previous two days:
SQL

```sql
SELECT
sale_date,
amount,
AVG(amount) OVER(
ORDER BY sale_date
ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) AS three_day_avg
FROM
sales;
```

The `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` clause tells the function to look at the current row and the two rows before it within the ordered partition.

### Conclusion

Window functions are incredibly versatile and can simplify complex calculations that would otherwise require cumbersome subqueries or self-joins. By mastering the core syntax—OVER(), PARTITION BY, and ORDER BY—and then graduating to more advanced concepts like window frames, you'll be able to solve a wide range of analytical problems with concise and efficient SQL code.

Ready to start practicing? Try [DataLemur](https://datalemur.com/) for some nice datasets and practice.
