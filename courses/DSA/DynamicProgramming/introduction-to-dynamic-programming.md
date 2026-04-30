---
title: "Real World Example"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/Introduction to Dynamic Programming.html"
---
Dynamic programming (DP) may seem daunting at first, but we’ll break it down into manageable concepts and techniques. First, let’s get an idea of what DP aims to do by considering the bigger picture.

Some problems can be broken down into **subproblems**, where each subproblem is a smaller version of the main problem. These subproblems may themselves be broken down into more subproblems as well. This isn’t a foreign concept to us. Recursion is often used to solve problems like these, where we make recursive calls to solve each subproblem.

However, in the recursive process, it’s possible to generate and solve the same subproblem multiple times, which can be unnecessarily expensive.

![Image represents a tree-like diagram illustrating a recursive problem-solving approach.  The top node is labeled `f(main_problem)`, representing the main problem to be solved. This node branches into two subproblems: `f(subproblem_a)` and `f(subproblem_b)`.  `f(subproblem_a)` further breaks down into `f(subproblem_b)` and `f(subproblem_c)`.  Each `f(subproblem_x)` represents a function call to solve a subproblem.  The `f(subproblem_b)` on the right branch is highlighted with a peach-colored background and a curved orange arrow points to it from the text 'solved before,' indicating that this specific subproblem has been solved previously.  Solid lines represent direct function calls, while dashed lines indicate further, unspecified sub-problems stemming from the leaf nodes `f(subproblem_b)` and `f(subproblem_c)`. The diagram visually demonstrates how a complex problem is broken down into smaller, potentially reusable subproblems, highlighting the concept of memoization or dynamic programming where previously solved subproblems are reused to improve efficiency.](/assets/images/dsa/dynamicprogramming/98ef8414c4d73bcc.webp)

DP is the antidote to this. It’s a technique that stores solutions to each subproblem, so they can be reused when they’re needed again. In other words, it’s an efficient tool that **ensures each subproblem is solved at most one time**. This can greatly increase the performance of an algorithm.

**The DP process** DP is often perceived as challenging, but it follows a pretty consistent problem-solving process, best demonstrated with an example. First, we'll briefly explain some key DP terms, and then dive into the *Climbing Stairs* problem to learn how to identify a DP problem and develop a DP solution.

- Optimal substructure: the optimal solution to a problem can be constructed from the optimal solutions to its subproblems.
- Overlapping subproblems: if the same subproblems are solved repeatedly during the problem-solving process.
- Recurrence relation: a formula that expresses the solution to the problem in terms of the solutions to its subproblems.
- Base cases: the simplest instances of the problem where the solution is already known, without needing to be decomposed into more subproblems.

The first two terms are essential attributes that a problem must have to be solvable using DP. The last two terms are essential components in every DP solution. These definitions may seem abstract now, but keep them in mind as they will become clearer in the context of a problem.

## Real-world Example

**Word segmentation:** Search engines use DP in a process called “word segmentation.” When users enter a search query without spaces, DP is employed to determine if white spaces can be added to form valid words. For example, given a query without spaces (like “bestrestaurants”), DP checks all possible ways to insert spaces (“best restaurants,” “best rest aunts”) by solving each segment (subproblem) separately, and storing their solutions to avoid recalculation.

## Chapter Outline

![Image represents a hierarchical diagram illustrating the application of Dynamic Programming.  At the top, a rounded rectangle labeled 'Dynamic Programming' serves as the root node.  A downward-pointing arrow connects it to two rectangular boxes with dashed borders, representing subcategories. The left box is labeled '1D-DP' and lists four problems solved using one-dimensional dynamic programming: 'Climbing Stairs,' 'Minimum Coin Combination,' 'Neighborhood Burglary,' and 'Maximum Subarray Sum.' The right box is labeled '2D-DP' and lists five problems solved using two-dimensional dynamic programming: 'Matrix Pathways,' 'Longest Palindrome in a String,' 'Longest Common Subsequence,' '0/1 Knapsack,' and 'Largest Square in an Array.'  Dashed lines connect the root node to each subcategory box, indicating a parent-child relationship, showing how these specific problems fall under the broader umbrella of Dynamic Programming techniques.](/assets/images/dsa/dynamicprogramming/c940e57598262d9e.webp)

The nature of each DP problem in this chapter is quite unique, but for simplicity, we’ve grouped them into two categories: one-dimensional DP (1D-DP), and two-dimensional DP (2D-DP).
