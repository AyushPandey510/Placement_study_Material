---
title: "01 Knapsack"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/01 Knapsack.html"
---
You are a thief planning to rob a store. However, you can only carry a knapsack with a maximum capacity of `cap` units. Each item (`i`) in the store has a weight (`weights[i]`) and a value (`values[i]`).

Find the maximum total value of items you can carry in your knapsack.

#### Example:

![Image represents a visual depiction of a knapsack problem, a classic optimization problem in computer science.  Four items are shown, each labeled 'item 0,' 'item 1,' 'item 2,' and 'item 3,' respectively. Each item has an associated value (price) represented by a dollar amount ($70, $50, $40, $0) displayed in a gray rectangle, and a weight (w) indicated numerically (5, 3, 4, 1). A larger, brown rectangular box labeled 'cap = 7' represents the knapsack with a weight capacity of 7. Inside the knapsack are items 1 and 2, indicating that these items have been selected.  The arrangement shows that items 1 and 2, with a combined weight of 7 (3 + 4), fill the knapsack to its capacity.  The other items are not included, suggesting they were not selected due to weight constraints or to optimize the value within the capacity limit.  The image illustrates a solution to the knapsack problem where the goal is to maximize the total value of items within the knapsack's weight constraint.](/assets/images/dsa/dynamicprogramming/8ad49dadb3475540.webp)

```python
Input: cap = 7, weights = [5, 3, 4, 1], values = [70, 50, 40, 10]
Output: 90
```

Explanation: The most valuable combination of items that can fit in the knapsack together are items 1 and 2 . These items have a combined value of 50 + 40 = 90 and a total weight of 3 + 4 = 7 , which fits within the knapsack's capacity.

## Intuition

For each item, we have two choices: include it in the knapsack, or exclude it. This binary decision is why this classic problem is called “0/1 Knapsack.”

The brute force approach involves making this decision for every item. Since two choices can be made for each item, this results in 2 ⋅ 2 ⋅ 2 … 2 = 2 n 2\cdot 2\cdot 2…2=2n 2 ⋅ 2 ⋅ 2 … 2 = 2 n possible combinations of choices. As we can see, generating all possible combinations is inefficient.

A greedy solution that involves picking the most valuable items first isn’t a good choice either, as it doesn’t always lead to the optimal outcome, which we can see in the example below:

![Image represents four rectangular boxes arranged horizontally, each representing an item with an associated price and weight.  The boxes are labeled 'item 0,' 'item 1,' 'item 2,' and 'item 3' above each respective box. Inside each box is a dollar amount representing the price: $70, $50, $40, and $10 respectively. Below each box, the weight (w) of the item is specified: w = 5, w = 3, w = 4, and w = 1 respectively.  There are no connections or information flow visually depicted between the boxes; they are presented independently as individual data points.](/assets/images/dsa/dynamicprogramming/a4b202a73ebd8aca.webp)

![Image represents two knapsack problem solutions.  The top section displays 'option 1: take the most valuable item first' and 'option 2: optimal solution' as headings for two distinct approaches.  Each option is visually represented by a rounded-rectangle container labeled 'cap = 7,' indicating a knapsack capacity of 7 units. Inside each container, multiple smaller rectangles represent items. Each item rectangle shows an 'item' number, its value (in dollars), and its weight ('w'). Option 1 (brown container) shows item 3 ($10, w=1) and item 0 ($70, w=5), resulting in a total value of $80. Option 2 (green container), labeled as the optimal solution, contains item 1 ($50, w=3) and item 2 ($40, w=4), achieving a total value of $90.  The arrangement highlights the difference between a greedy approach (Option 1) and an optimal solution (Option 2) for the same knapsack problem.](/assets/images/dsa/dynamicprogramming/d781fd14bc77b6be.webp)

So, let's approach this problem from a different angle. Consider the first item from the above item list (`i = 0`). What’s the most value we can attain with a knapsack of capacity 7, if we include this item? What about if we exclude this item? Let’s define the function `knapsack(i, cap)` to represent the maximum value achievable with items starting from index `i` and a knapsack capacity of `cap`:

![Image represents a visual depiction of the 0/1 knapsack problem.  The top section shows four items, labeled `item 0`, `item 1`, `item 2`, and `item 3`, each with an associated value (in dollars: $70, $50, $40, $10 respectively) and weight (`w`: 5, 3, 4, 1 respectively).  An arrow points from a labeled box containing 'i' downwards to `item 0`, suggesting an index or iterator variable. Below this, a brown rectangular shape represents a knapsack with a capacity (`cap`) of 7. To the right, the text `knapsack(i = 0, cap = 7) = ?` indicates the problem being posed: finding the maximum value that can be put into the knapsack of capacity 7, starting with item 0.  The arrangement implies that the algorithm will iterate through the items, considering their values and weights to determine the optimal combination fitting within the knapsack's capacity.](/assets/images/dsa/dynamicprogramming/6764e8503779cd74.webp)

We explore the implications of including or excluding this item, separately.

**Including item i** Picking the first item gives a value of 70. This item weighs 5, so our knapsack now has a remaining capacity of 7 - 5 = 2. With an updated capacity of 2, what’s the optimal combination possible with the remaining items in our selection?

This question leads us to realize that if we determine the maximum value that can be obtained from the remaining items (starting from index 1) with a knapsack capacity of 2, we can find the solution:

![Image represents a visual depiction of a knapsack problem's recursive solution.  At the top, a rectangular box displays four items labeled 'item 0,' 'item 1,' 'item 2,' and 'item 3,' each with an associated value (in dollars) and weight (w).  Item 0 has a value of $70 and weight 5; item 1 has $50 and weight 3; item 2 has $40 and weight 4; and item 3 has $10 and weight 1.  Below, a brown rectangular box represents the knapsack with a 'cap' of 7 (representing the maximum weight capacity).  Inside this knapsack, item 0 ($70, w=5) is already included, indicated by the green 'include' label and an arrow pointing from item 0 to the knapsack. A grey curved arrow originates from the knapsack and points to item 1, indicating consideration of this item.  Another grey curved arrow connects the knapsack to a rounded rectangle containing the expression '70 + knapsack(i = 1, cap = 7 - 5 = 2),' showing the recursive call to the knapsack function with the remaining capacity (2) after including item 0, and starting from item 1 (i=1).  A small square labeled 'i' above the items suggests an input or index.  The overall diagram illustrates the step-by-step process of the recursive algorithm, showing how the algorithm considers each item and its impact on the knapsack's capacity and total value.](/assets/images/dsa/dynamicprogramming/cfb2a197fba4a397.webp)

We’ve identified that this case can be solved by solving a subproblem, which means we’re dealing with a problem that has an **optimal substructure**.

Therefore, we can generalize a recurrence relation for this case. Below, c denotes the remaining knapsack capacity we want to solve for (we give it a different name because it can be different to the initial value of `cap`):

If we include item `i`, the most value we can get is `values[i] + knapsack(i + 1, c - weights[i])`

**Excluding item i** Now, let’s say we exclude item 0. This means our knapsack will maintain a capacity of 7. Here, the most value we can get is just from the maximum value from the rest of the items, with a knapsack of capacity 7:

![Image represents a visual depiction of a knapsack problem's recursive step.  A rectangular box contains four items, each labeled 'item 0,' 'item 1,' 'item 2,' and 'item 3,' respectively.  Each item displays its value (in dollars: $70, $50, $40, $10) and weight (w: 5, 3, 4, 1). Item 0 is marked 'exclude' in red, indicating it's not considered in this step.  A brown rectangular shape representing a knapsack with a 'cap = 7' label signifies a weight capacity of 7 units. A grey rounded rectangle labeled 'knapsack(i = 1, cap = 7)' represents a recursive call to the knapsack function, starting from item 1 (index i=1) with the same capacity. A grey arrow points from this function call to item 2, indicating that the algorithm is currently evaluating whether to include item 2 in the knapsack given the remaining capacity.  Above the items, a downward-pointing arrow from a small square labeled 'i' points to item 0, suggesting an iterative approach where items are processed sequentially.](/assets/images/dsa/dynamicprogramming/1239047a24f3f078.webp)

Again, this case can be solved by solving a subproblem:

If we exclude item `i`, the most value we can get is `knapsack(i + 1, c)`.

Now that we’ve established the recurrence relations for both cases (including and excluding item `i`), we can combine them: the maximum value we can get from any selection of items is the larger value obtained from these two cases:

`knapsack(i, c)` = max(include item `i`, exclude item `i`) = `max(values[i] + knapsack(i + 1, c - weights[i]), knapsack(i + 1, c))`

One case we haven’t covered yet is the possibility the item does not fit in the knapsack. In this case, we have no choice but to exclude the item, resulting in a maximum value of `knapsack(i + 1, c)`, as discussed earlier.

**Dynamic programming** Given this problem has an **optimal substructure**, we can translate our recurrence relations directly into DP formulas:

```python
if weights[i] <= c: \# If item i fits in a knapsack of capacity c.
    dp[i][c] = max(values[i] + dp[i + 1][c - weights[i]], dp[i + 1][c])
else: \# If item i doesn't fit.
    dp[i][c] = dp[i + 1][c]
```

For clarity, there are two dimensions in our DP table:

- One for the current item, `i`, represented by the rows of the DP table.
- One for the current knapsack capacity, `c`, represented by the columns on the DP table.

With this in mind, let’s think about what the base cases should be.

**Base cases** The simplest version of this problem is when there are no items in our selection, meaning the maximum value we can attain is 0. But which cells of the DP table represent this base case?

We know that when `i = n - 1`, only one item from the selection is being considered (where `n` denotes the total number of items):

![Image represents a diagram illustrating a data structure, possibly an array or list, containing four items with associated values and weights.  Each item is labeled 'item 0,' 'item 1,' 'item 2,' and 'item 3,' respectively, positioned horizontally.  Each item displays a monetary value ($70, $50, $40, $10) within a light gray rectangular box. Below each monetary value, a weight ('w') is assigned (5, 3, 4, 1). A separate box above the structure shows the equation 'i = n - 1,' indicating a relationship between an index 'i' and the total number of items 'n'.  A downward arrow connects this box to 'item 3,' suggesting that 'i' points to the last item in the structure when 'n' represents the total number of items. The overall arrangement suggests a sequential access pattern, possibly related to an algorithm processing the items from the end.](/assets/images/dsa/dynamicprogramming/45ee8eb5524c0f96.webp)

This implies that when `i = n`, no items are being considered. Therefore, we can populate the DP table using `dp[n][c] = 0` for all c. The reason `i = 0` isn’t the base case is because `i = 0` encapsulates all items starting from index 0.

Another subproblem we know the answer to is `c = 0`, since no items can fit in a knapsack of capacity 0. For this, we can populate the DP table using `dp[i][0] = 0` for all `i`.

Let’s draw the DP table with just the base case values, to get a better idea of what this looks like:

![Image represents a table or matrix labeled 'C', with rows indexed by 'i' (0 to 4) and columns indexed by 'c' (0 to 7).  The matrix is primarily empty, containing only zeros ('0') in the first column for rows 0 through 3, and in the last row (row 4) from column 0 to 7.  A thick black border surrounds the matrix. An arrow points from the label '(n) 4' to the right, indicating data flow. Another arrow points from the label 'base cases' upwards to the bottom row of the matrix (row 4), suggesting that the values in this row are initialized or provided as base cases for some computation.  The overall structure suggests a dynamic programming approach where the matrix is populated iteratively, starting from the base cases in the last row and potentially filling the rest of the matrix based on calculations involving previous rows and columns.](/assets/images/dsa/dynamicprogramming/c7dcc05efdd04f69.webp)

As shown, the first column and last row are set to 0 for the base cases.

**Populating the DP table** We populate the DP table starting from the smallest subproblems (excluding base cases). Specifically, this means starting from row `i = n - 1`, where only the last item is considered, and ending at `i = 0`, where we consider all items. For each of these rows, we iterate through each possible knapsack capacity from `c = 1` to `c = cap`.

![Image represents a grid illustrating a coding pattern, possibly related to array manipulation or memory allocation.  The grid is labeled with 'i' along the vertical axis (rows 0-4) and 'c' along the horizontal axis (columns 0-7). Each cell contains a numerical value, predominantly '0'.  Three horizontal orange arrows, originating from cells (3,1), (2,1), and (1,1) respectively, extend across the grid to the 'end' label in column 7.  The arrow starting at (3,1) is additionally labeled 'start'.  The arrangement suggests a sequential process where data, represented by the arrows, flows from a 'start' point across the 'c' axis to an 'end' point. The '0' values in the cells might represent an initial state or default values before the process begins. The bottom row (i=4) shows only '0' values, suggesting it's either unused or represents a different state.](/assets/images/dsa/dynamicprogramming/b24f8e64f63a5833.webp)

Once the DP table is populated, we return `dp[0][cap]`, which stores the maximum value after all items and knapsack capacities are considered.

## Implementation

```python
from typing import List
    
def knapsack(cap: int, weights: List[int], values: List[int]) -> int:
    n = len(values)
    # Base case: Set the first column and last row to 0 by initializing the entire DP
    # table to 0.
    dp = [[0 for x in range(cap + 1)] for x in range(n + 1)]
    # Populate the DP table.
    for i in range(n - 1, -1, -1):
        for c in range(1, cap + 1):
           # If the item 'i' fits in the current knapsack capacity, the maximum
           # value at 'dp[i][c]' is the largest of either:
            # 1. The maximum value if we include item 'i'.
            # 2. The maximum value if we exclude item 'i'.
            if weights[i] <= c:
                dp[i][c] = max(values[i] + dp[i + 1][c - weights[i]], dp[i + 1][c])
            # If it doesn't fit, we have to exclude it.
            else:
                dp[i][c] = dp[i + 1][c]
    return dp[0][cap]
```

### Complexity Analysis

**Time complexity:** The time complexity of `knapsack` is O ( n ⋅ c a p ) O(n\cdot cap) O ( n ⋅ c a p ) because each cell of the DP table is populated once.

**Space complexity:** The space complexity is O ( n ⋅ c a p ) O(n\cdot cap) O ( n ⋅ c a p ) because we're maintaining a DP table that stores ( n + 1 ) ⋅ ( c a p + 1 ) (n+1)\cdot (cap+1) ( n + 1 ) ⋅ ( c a p + 1 ) elements.

## Optimization

We can optimize the solution by recognizing that, for each cell in the DP table, we only need access cells from the row below it.

Therefore, we only need to maintain two rows:

- `curr_row`: the current row being populated.
- `prev_row`: the row below the current row.

This effectively reduces the space complexity to O ( c a p ) O(cap) O ( c a p ). Below is the optimized code:

```python
from typing import List
    
def knapsack_optimized(cap: int, weights: List[int], values: List[int]) -> int:
    n = len(values)
    # Initialize 'prev_row' as the DP values of the row below the
    # current row.
    prev_row = [0] * (cap + 1)
    for i in range(n - 1, -1, -1):
        # Set the first cell of the 'curr_row' to 0 to set the base
        # case for this row. This is done by initializing the entire
        # row to 0.
        curr_row = [0] * (cap + 1)
        for c in range(1, cap + 1):
            # If item 'i' fits in the current knapsack capacity, the
            # maximum value at 'curr_row[c]' is the largest of either:
            # 1. The maximum value if we include item 'i'.
            # 2. The maximum value if we exclude item 'i'.
            if weights[i] <= c:
                curr_row[c] = max(values[i] + prev_row[c - weights[i]],prev_row[c])
            # If item 'i' doesn't fit, we exclude it.
            else:
                curr_row[c] = prev_row[c]
        # Set 'prev_row' to 'curr_row' values for the next iteration.
        prev_row = curr_row
    return prev_row[cap]
```
