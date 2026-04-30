---
title: "Matrix Pathways"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/Matrix Pathways.html"
---
You are positioned at the top-left corner of a `m × n` matrix, and can only move **downward** or **rightward** through the matrix. Determine the **number of unique pathways** you can take to reach the bottom-right corner of the matrix.

#### Example:

![Image represents six distinct diagrams, each enclosed within a black square and overlaid on a 3x3 grid.  Each diagram depicts a path formed by a thick, orange line connecting two orange circles; one circle is located at the top-left corner of the grid in every diagram, representing a starting point, while the other circle, representing an endpoint, is positioned at various locations within the grid in each diagram. The orange line connecting these circles follows a path constrained by the grid lines, forming different right-angled routes across the grid in each of the six diagrams.  The paths vary in length and direction, demonstrating different possible routes from the top-left starting point to various endpoints within the 3x3 grid.  The endpoint circles have a slightly larger, lighter orange ring around them, visually distinguishing them from the starting point circles.](/assets/images/dsa/dynamicprogramming/668dcc9f643ad670.webp)

```python
Input: m = 3, n = 3
Output: 6
```

#### Constraints:

- `m, n ≥ 1`

## Intuition

At each cell, we can either move right or move down. No matter which direction we choose at any point, it will always move us closer to the destination. This means we just need to keep moving either right or down until we can no longer do so, at which point we’ve reached the bottom-right corner.

Let's think about this problem backward. Assume we have already reached the bottom-right corner. How did we get here? We know for certain we came from either the cell directly above, or the cell directly to the left of the current position.

![Image represents a 3x3 grid, enclosed within a bold black border, with each cell delineated by thin black lines.  A light-blue circle with a slightly darker-blue inner circle is positioned in the bottom-right cell. An orange arrow points horizontally from the cell to the left of the circle, into the circle itself.  Simultaneously, another orange arrow points vertically downwards from the cell above the circle, also into the circle.  No text, URLs, or parameters are present within the grid or on the arrows; the image solely depicts the directional flow of information into a central point within a structured grid system.](/assets/images/dsa/dynamicprogramming/16a0cac5e6d45fee.webp)

This is equally true for any cell on the matrix, which means a generalization can be made: the number of paths to any cell is equal to the sum of the number of paths to the cell above it and the cell to its left.

![Image represents a diagram illustrating a recursive approach to calculating the number of pathways in a matrix.  The diagram uses a grid to visually represent matrix cells, with coordinates (r, c) denoting row 'r' and column 'c'.  An orange arrow points from cell (r-1, c) vertically downwards to cell (r, c), and another orange arrow points from cell (r, c-1) horizontally to the right towards cell (r, c). This visually demonstrates that the number of pathways to reach cell (r, c) is the sum of the pathways to reach cell (r-1, c) above it and cell (r, c-1) to its left.  Below the diagram, the equation `matrix_pathways(r, c) = matrix_pathways(r - 1, c) + matrix_pathways(r, c - 1)` explicitly defines this recursive relationship, stating that the total number of pathways to reach a cell (r, c) is equal to the sum of pathways to reach the cell above it and the cell to its left.](/assets/images/dsa/dynamicprogramming/a7f23a7e1b7e85c4.webp)

This demonstrates the existence of subproblems, and that this problem has an **optimal substructure**, where we need to solve two subproblems in order to solve the main problem. This makes this problem well-suited for DP. So, let’s translate the above **recurrence relation** to a DP formula:

`dp[r][c] = dp[r - 1][c] + dp[r][c - 1]`, where `dp[r][c]` represents the total number of paths that lead to cell (`r`, `c`).

Before populating the DP table, we need to know our base cases.

**Base cases** We know `dp[0][0]` should be 1 because there’s only one path leading to cell (0, 0).

What else do we know for certain? Since we can only move right or down, once we leave a row or column, we can never return to it because we can't move left or up. This means, for any cell in row 0 or column 0, there’s only one path to those cells:

![Image represents two grid diagrams illustrating different data processing approaches.  The left diagram shows a single row of a grid highlighted in peach, containing a light-blue filled circle at the far left and three consecutive orange right-pointing arrows extending from it across the row.  This suggests a horizontal, sequential processing of data.  A light-blue outlined circle is present at the bottom-right corner of the grid, implying a final result or output. The right diagram displays a peach-highlighted column, with a light-blue filled circle at the top and three consecutive orange downward-pointing arrows leading to a light-blue outlined circle at the bottom-right. This depicts a vertical, sequential processing of data, contrasting with the horizontal flow in the left diagram. Both diagrams use the same grid structure, suggesting a comparison between horizontal and vertical data processing methods within a similar context.  The small circles likely represent data points, while the arrows indicate the direction and flow of processing steps.](/assets/images/dsa/dynamicprogramming/89ec10b21e453451.webp)

Therefore, we can set all cells in row 0 and column 0 to 1 as the base cases.

Problem-solving tip: another way to identify row 0 and column 0 as base cases is by examining the DP formula. Since we need the values from row `r - 1` and column `c - 1` to populate `dp[r][c]`, all values at `r = 0` and `c = 0` must be pre-populated before using the formula to avoid index out-of-bound errors.

**Populating the DP table** Once the base cases are set, we can populate the remaining DP table, starting from cell (1, 1), using our DP formula (`dp[r][c] = dp[r-1][c] + dp[r][c-1]`):

![Image represents a transformation of a 4x4 matrix.  The left matrix is initialized with the value '1' in the first column and row, and all other cells are empty.  The top row and leftmost column are labeled with indices 0, 1, 2, and 3.  A thick black arrow points from the left matrix to the right matrix. The right matrix shows the result of a cumulative sum operation.  Specifically, each cell (i, j) in the right matrix contains the sum of all cells (x, y) in the left matrix where x ≤ i and y ≤ j.  For example, the cell at (1,1) in the right matrix is 2 (1+1 from the left matrix), the cell at (2,3) is 10 (1+1+1+1+1+1+1+1+1+1), and the cell at (3,3) is 20, representing the cumulative sum of all elements in the left matrix.  The values in the right matrix are calculated by iteratively summing the values from the left matrix, demonstrating a cumulative sum pattern.](/assets/images/dsa/dynamicprogramming/05159fd0c88b08a9.webp)

After we fill in the DP table, we can return **dp[m - 1][n - 1]**, which contains the number of paths to the bottom-right corner.

## Implementation

```python
def matrix_pathways(m: int, n: int) -> int:
    # Base cases: Set all cells in row 0 and column 0 to 1. We can do this by
    # initializing all cells in the DP table to 1.
    dp = [[1] * n for _ in range(m)]
    # Fill in the rest of the DP table.
    for r in range(1, m):
        for c in range(1, n):
            # Paths to current cell = paths from above + paths from left.
            dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
    return dp[m - 1][n - 1]
```

### Complexity Analysis

**Time complexity:** The time complexity of `matrix_pathways` is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) because each cell in the DP table is populated once.

**Space complexity:** The space complexity is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) due to the DP table, which contains m ⋅ n m\cdot n m ⋅ n elements.

## Optimization

We can optimize our solution by understanding that, for each cell in the DP table, we only need to access the cells directly above it and to its left.

![Image represents a 2x2 grid illustrating a dynamic programming approach, likely for a problem involving a 2D array or matrix.  The grid is divided into four quadrants, each representing a cell in the DP table. The top-right quadrant is labeled `dp[r-1][c]`, representing the value at row `r-1` and column `c`. The bottom-left quadrant is labeled `dp[r][c-1]`, representing the value at row `r` and column `c-1`. The bottom-right quadrant is labeled `dp[r][c]`, representing the value at row `r` and column `c`. A downward-pointing arrow connects `dp[r-1][c]` to `dp[r][c]`, indicating a dependency; the value of `dp[r][c]` is calculated using the value of `dp[r-1][c]`. A rightward-pointing arrow connects `dp[r][c-1]` to `dp[r][c]`, indicating another dependency; the value of `dp[r][c]` also depends on the value of `dp[r][c-1]`.  This suggests a recursive or iterative approach where the value of each cell is computed based on the values of its top and left neighbors.](/assets/images/dsa/dynamicprogramming/c25cb5285db003f4.webp)

- To get the cell above it (`dp[r-1][c]`), we only need access to the previous row.
- To get the cell to its left (`dp[r][c-1]`), we just need to look at the cell to the left of the current cell, which is in the same row we're currently populating.

Therefore, we only need to maintain two rows:

- `prev_row`: the previous row.
- `curr_row`: the current row being populated.

![Image represents a 4x4 grid illustrating a coding pattern, possibly related to dynamic programming or matrix calculations.  The grid is labeled with row and column indices (0-3 for both).  The grid's cells contain numerical values; the top two rows (rows 0 and 1) show light gray numbers (1, 1, 1, 1; 1, 2, 3, 4 respectively). Row 2 displays bold black numbers (1, 3, 6, 10). Row 3 begins with a bold black '1'.  Downward-pointing gray arrows connect each element in row 2 to the corresponding element below in row 3, indicating a calculation dependency.  A horizontal gray arrow connects the initial '1' in row 3 to the next cell, suggesting a cumulative or iterative process.  To the right, an explanatory text states: 'to calculate row 3, the only other row we need is row 2,' clarifying the dependency between rows 2 and 3 in the calculation.  The labels 'prev_row: 2' and 'curr_row: 3' explicitly identify rows 2 and 3 as the previous and current rows in the computation, respectively.](/assets/images/dsa/dynamicprogramming/4739a4a0a005d672.webp)

This effectively reduces the space complexity to O ( n ) O(n) O ( n ) because we now only need to maintain two arrays of size n n n. After populating the DP values for the current row, we’ll need to make sure to update `prev_row` with the values from `curr_row` to prepare for the next iteration since the next row’s previous row is the current row. Below is the optimized code:

```python
def matrix_pathways_optimized(m: int, n: int) -> int:
    # Initialize 'prev_row' as the DP values of row 0, which are all 1s.
    prev_row = [1] * n
    # Iterate through the matrix starting from row 1.
    for r in range(1, m):
        # Set the first cell of 'curr_row' to 1. This is done by
        # setting the entire row to 1.
        curr_row = [1] * n
        for c in range(1, n):
            # The number of unique paths to the current cell is the sum
            # of the paths from the cell above it ('prev_row[c]') and
            # the cell to the left ('curr_row[c - 1]').
            curr_row[c] = prev_row[c] + curr_row[c - 1]
        # Update 'prev_row' with 'curr_row' values for the next
        # iteration.
        prev_row = curr_row
    # The last element in 'prev_row' stores the result for the
    # bottom-right cell.
    return prev_row[n - 1]
```
