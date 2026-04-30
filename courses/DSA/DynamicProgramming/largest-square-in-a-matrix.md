---
title: "Largest Square In A Matrix"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/Largest Square in a Matrix.html"
---
Determine the **area of the largest square** of 1's in a binary matrix.

#### Example:

![Image represents a 5x5 matrix, visually depicted as a grid of cells, each containing a binary digit (either '0' or '1').  The matrix is enclosed within a bold black border.  The cells are arranged in five rows and five columns. A rectangular region encompassing the bottom three rows and the first three columns is highlighted with a light peach or orange fill.  No arrows or other explicit connections between cells are shown; the information flow is implicitly represented by the spatial arrangement of the binary digits within the matrix.  The numerical values within each cell are simply data points, with no further labels, URLs, or parameters associated with them. The overall structure suggests a representation of data, possibly used as input or output for a coding pattern algorithm, where the highlighted region might indicate a specific area of interest or a subset of the data.](/assets/images/dsa/dynamicprogramming/96cb158ecba5ccb1.webp)

```python
Output: 9
```

## Intuition

The brute force solution to this problem involves examining every possible submatrix within the given matrix to determine if it forms a square of 1s. This can be done by treating each cell as a potential top-left corner of a square, and checking all possible squares that extend from that cell. For each of these squares, we'll need to verify that all cells within the square are 1's. Repeating this process for each cell allows us to find the largest square. This process is quite inefficient, so let's explore alternatives.

One important thing to understand is that squares contain smaller squares inside them. This indicates that subproblems might exist in this problem. Let's see if we can find what the subproblems are and how we can use them. Consider the following 6x6 matrix containing a 4×4 square of 1s:

![Image represents a 6x6 matrix, or a two-dimensional array, visually depicted as a grid.  The rows and columns are numbered from 0 to 5. Each cell within the grid contains either a '0' or a '1'. The arrangement shows a pattern where the outer columns and rows (0 and 5) contain only '0's, while the inner columns (1 to 4) contain '1's in rows 1 to 4.  No information flows between the cells; the matrix simply presents a static data structure with a clear visual representation of the data's organization and values.  There are no URLs or parameters present.](/assets/images/dsa/dynamicprogramming/9c03c81f779b1ba1.webp)

Let's say we're at cell (4, 4). We know just by looking at the matrix that a square of length 4 with all 1s ends at this cell, but what information would we need algorithmically to determine that this 4x4 exists? A key observation here is that there are three 3×3 squares around this cell:

- one that ends directly to the left of the current cell (4, 3).
- one that ends at the top-left diagonal of the current cell (3, 3).
- one that ends directly above the current cell (3, 4).

![Image represents a step-by-step visualization of a 2D array processing algorithm, likely demonstrating a pattern related to matrix traversal or manipulation.  Three 6x6 matrices are shown, each representing a stage in the process.  The matrices contain values of '0' and '1', with a subset of '1's highlighted in different colored boxes (light blue, light orange, and light purple) at each stage.  Arrows connect the matrices, indicating the flow of the algorithm. The first matrix shows a 3x3 block of '1's highlighted in light blue, with a single '1' to its right highlighted in light orange. The second matrix shifts the light blue highlighted block one position to the right, with the light orange highlight now showing a different '1' to the right. The third matrix shifts the light blue highlighted block down one position, with the light orange highlight now showing a different '1' below.  The final matrix (to the right) shows the cumulative effect of the process, with a larger rectangular area (4x3) highlighted in magenta, encompassing the areas highlighted in the previous steps.  This suggests an accumulation or aggregation process where the highlighted regions are combined or processed sequentially.](/assets/images/dsa/dynamicprogramming/28b756a295ecf8cb.webp)

This more clearly highlights the existence of subproblems: the length of a square that ends at the current cell depends on the lengths of the squares that end at its left, top, and top-left neighboring cells.

Let's consider a slightly different scenario, where this time, the input matrix contains one less 1, meaning there's no longer a 4×4 square of 1s:

![Image represents a 6x6 matrix, visually depicted as a grid with rows and columns numbered 0 through 5.  Each cell within the grid contains either a '0' or a '1'. The arrangement shows a pattern where the central area (excluding the outermost rows and columns) is filled with '1's, while the outermost rows and columns contain '0's.  A single cell at row 4, column 1, is highlighted with a light gray background, also containing a '0'.  No information flows between cells; the image simply presents a static data structure representing a 2-dimensional array or matrix.](/assets/images/dsa/dynamicprogramming/8d51eb42577ffcfb.webp)

Let's see if our strategy of checking the three neighboring squares around the current cell (4, 4) changes at all here. Keep in mind that this time, the square that ends directly to the left of the current cell only has a length of 2. This means the square that ends at the current cell can, at most, have a length of 3, with 1 unit from the current cell and 2 units from the smallest neighboring square:

![Image represents a step-by-step visualization of a 2D array processing algorithm, likely demonstrating a sliding window or kernel operation.  Three 6x6 matrices are shown, each representing a stage in the process.  The matrices contain only 0s and 1s.  In the first matrix, a 2x2 region (cells [3,2] to [4,3]) is highlighted with a light blue border.  An arrow points from the cell [3,3] to [4,3], suggesting data movement or processing.  The second matrix shows the light blue region shifted one position to the right, now encompassing cells [3,3] to [4,4], with a new light blue region.  A similar arrow points from [3,4] to [4,4]. The third matrix shows a larger, 3x3 region (cells [1,2] to [3,4]) highlighted with a purple border, encompassing the previous light blue regions, suggesting an accumulation or aggregation of results.  Arrows connect the matrices, indicating the sequential nature of the algorithm.  The row and column indices (0-5) are labeled along the top and left side of each matrix, providing spatial context.  The overall diagram illustrates a pattern of iterative processing across a 2D array, possibly for tasks like image filtering or feature extraction.](/assets/images/dsa/dynamicprogramming/62d1d1261afb97a5.webp)

This indicates that the length of the current square is restricted by the smallest of its three neighboring squares. We can express this as a recursive formula where `matrix[i][j]` represents the value of the current cell, (`i`, `j`):

`if matrix[i][j] == 1: max_square(i, j) = 1 + min(max_square(i - 1, j), max_square(i - 1, j - 1), max_square(i, j - 1))`

We now have all the information we need. Given this problem has an **optimal substructure**, we can translate the above recurrence relation directly into a DP formula.

`if matrix[i][j] == 1: dp[i][j] = 1 + min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1])`

Now, let's think about what the base cases should be.

**Base cases** We know `dp[0][0]` should be 1 if `matrix[0][0]` is 1 since the top-left cell can only have a square of length 1.

What other base cases are there? Consider row 0 and column 0 of the matrix. These are special because the length of a square ending at any of these cells is at most 1.

So, for the base cases, we can set all cells in row 0 and column 0 to 1 in our DP table, provided those cells in the original matrix are also 1:

![Image represents a dynamic programming (DP) table, labeled 'DP table:', used to store solutions to subproblems.  The table is a 5x5 grid, with rows and columns indexed from 0 to 4.  The top row and leftmost column represent indices for accessing the table's entries.  The text 'base cases' with an arrow pointing to the top-left cell (0,0) indicates that the initial values are populated from base cases.  The first row and column are partially filled; cell (0,0) contains '1', (0,1) contains '0', (0,2) contains '1', (0,3) contains '1', and (0,4) contains '0'.  Similarly, (1,0) contains '0', (2,0) contains '1', (3,0) contains '1', and (4,0) contains '1'. The remaining cells are empty, implying that these subproblems haven't been solved yet.  The arrows indicate the direction of data flow, showing how base cases populate the table's initial values.](/assets/images/dsa/dynamicprogramming/83d1813b7a0134d8.webp)

**Populating the DP table** We populate the DP table starting from the smallest subproblems (excluding the base cases). Specifically, with row 0 and column 0 populated, we begin by populating cell (1, 1) and work our way down to the last cell (`m - 1`, `n - 1`) row by row, where `m` and `n` are the dimensions of the matrix:

![Image represents a 5x5 grid, visually resembling a matrix or table, with numerical values (0s and 1s) populating its cells.  The rows and columns are numbered 0 through 4.  The grid's first column contains the values 1, 0, 1, 1, 1 from top to bottom.  The remaining columns contain 0, 1, 1, 0 respectively in the first row, and are otherwise empty.  Orange horizontal arrows extend from the second column, labeled 'start' in the second row, to the last column, labeled 'end' in the last row.  These arrows traverse rows 1, 2, 3, and 4, indicating a path or flow through the grid.  The arrangement suggests a representation of a simple algorithm or data structure, possibly illustrating a pathfinding or state transition process where the 1s represent permissible steps and the arrows show the chosen path from a starting point to an ending point.](/assets/images/dsa/dynamicprogramming/13bcb095f9d75dd5.webp)

The largest value in the DP table represents the length of the largest square in our matrix. Therefore, we just need to track the maximum DP value (`max_len`) as we populate the table. Once done, we just return `max_len`^2, which represents the area of the largest square.

## Implementation

In this implementation, it's possible to merge the base case handling with the code which populates the DP table. However, in an interview setting, code is often easier to understand when the base cases are defined separately, which is why they are implemented separately here.

```python
def largest_square_in_a_matrix(matrix: List[List[int]]) -> int:
    if not matrix:
        return 0
    m, n = len(matrix), len(matrix[0])
    dp = [[0] * n for _ in range(m)]
    max_len = 0
    # Base case: If a cell in row 0 is 1, the largest square ending there has a
    # length of 1.
    for j in range(n):
        if matrix[0][j] == 1:
            dp[0][j] = 1
            max_len = 1
    # Base case: If a cell in column 0 is 1, the largest square ending there has
    # a length of 1.
    for i in range(m):
        if matrix[i][0] == 1:
            dp[i][0] = 1
            max_len = 1
    # Populate the rest of the DP table.
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 1:
                # The length of the largest square ending here is determined by
                # the smallest square ending at the neighboring cells (left,
                # top-left, top), plus 1 to include this cell.
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1])
            max_len = max(max_len, dp[i][j])
    return max_len ** 2
```

### Complexity Analysis

**Time complexity:** The time complexity of `largest_square_in_a_matrix` is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) because each cell of the DP table is populated once.

**Space complexity:** The space complexity is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) since we're maintaining a 2D DP table that has m ⋅ n m\cdot n m ⋅ n elements.

## Optimization

We can optimize our solution by realizing that, for each cell in the DP table, we only need to access the cell directly above it, the cell to its left, and the top-left diagonal cell.

- To get the cell above it or the top-left diagonal cell, we only need access to the previous row.
- To get the cell to its left, we just need to look at the cell to the left of the current cell in the same row we're populating.

Therefore, we only need to maintain two rows:

- `prev_row`: the previous row.
- `curr_row`: the current row being populated.

![Image represents a 5x5 matrix illustrating a coding pattern, possibly related to dynamic programming or a similar algorithm.  The matrix is labeled with row and column indices (0-4) along its top and left side.  The matrix cells contain numerical values (0, 1, 2). The bottom two rows are shaded light gray, labeled 'prev_row: 3' and 'curr_row: 4,' respectively.  Gray arrows indicate data flow:  elements from 'prev_row: 3' (1, 2, 2, 0, 1) are used to calculate the elements in 'curr_row: 4' (starting with 1), with each arrow pointing from a 'prev_row' element to its corresponding influence on a 'curr_row' element.  A text annotation to the right explains that to compute 'curr_row: 4,' only 'prev_row: 3' is needed, highlighting a dependency relationship between rows in the matrix, suggesting an iterative or recursive calculation process.](/assets/images/dsa/dynamicprogramming/026c712627a12195.webp)

This effectively reduces the space complexity to O ( m ) O(m) O ( m ). Below is the optimized code:

```python
def largest_square_in_a_matrix_optimized(matrix: List[List[int]]) -> int:
    if not matrix:
        return 0
    m, n = len(matrix), len(matrix[0])
    prev_row = [0] * n
    max_len = 0
    # Iterate through the matrix.
    for i in range(m):
        curr_row = [0] * n
        for j in range(n):
            # Base cases: if we're in row 0 or column 0, the largest square ending
            # here has a length of 1. This can be set by using the value in the
            # input matrix.
            if i == 0 or j == 0:
                curr_row[j] = matrix[i][j]
            else:
                if matrix[i][j] == 1:
                      # curr_row[j] = 1 + min(left, top-left, top)
                    curr_row[j] = 1 + min(curr_row[j - 1], prev_row[j - 1], prev_row[j])
            max_len = max(max_len, curr_row[j])
        # Update 'prev_row' with 'curr_row' values for the next iteration.
        prev_row, curr_row = curr_row, [0] * n
    return max_len ** 2
```
