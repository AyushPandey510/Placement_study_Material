---
title: "Longest Increasing Path"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Longest Increasing Path.html"
---
Find the **longest strictly increasing path** in a matrix of positive integers. A path is a sequence of cells where each one is 4-directionally adjacent (up, down, left, or right) to the previous one.

#### Example:

![Image represents a 3x3 grid, visually similar to a Sudoku grid, with numerical values (1, 3, 4, 5, 7, 8, 9, 2, 4) placed within its cells.  The grid is labeled with row and column indices (0, 1, 2) along its top and left side, respectively.  A path is highlighted, visually represented by a peach-colored fill encompassing specific cells (containing 1, 3, 4, 5, 8), and orange arrows indicate the direction of movement along this path. The path starts at cell (0,0) with the value 1, moves down to cell (1,0) with the value 3, then right to cell (1,1) with the value 4, then up to cell (0,1) with the value 5, and finally right to cell (0,2) with the value 8. The remaining cells (containing 7, 9, 2, 4) are not part of the highlighted path.](/assets/images/dsa/graphs/ab1213e1ee50a654.webp)

```python
Output: 5
```

## Intuition

In this problem, we’re tasked with finding the longest strictly increasing path. Note, “strictly” means the path cannot include any two cells of equal value.

From any cell, we can move to a neighboring cell if that neighbor has a larger value than the current cell. We can map this relationship between cells as nodes in a graph, with edges representing moves from one cell to a higher-value neighboring cell:

![Image represents a comparison of two data structures representing the same underlying data.  On the left is a 3x3 matrix, indexed from 0 to 2 on both axes.  The matrix cells contain the integers 1, 5, 8, 3, 4, 4, 7, 9, and 2, arranged row-wise from top to bottom and left to right.  On the right is a directed acyclic graph (DAG) where each node is a circle containing one of the integers from the matrix.  Arrows indicate the direction of flow between nodes. The flow follows a pattern mirroring the matrix's row-major order: node 1 connects to 5, then 5 to 8; node 1 also connects to 3, then 3 to 7; node 3 connects to 4, then 4 to 9; and finally, node 4 connects to 2, and node 2 connects to 8.  Essentially, the DAG visually represents the sequential relationships between the numbers as they appear in the matrix, showing a possible traversal path through the data.](/assets/images/dsa/graphs/bb4b8b20fa2f61d3.webp)

Upon closer inspection, we notice this is a **directed acyclic graph** (DAG). Let’s break down what this means:

1. The graph is directed because we can go from a smaller cell to a larger one, but not the other way around.
2. The graph is acyclic because it’s not possible to return to a smaller, previous value in the path because the path only extends to larger cells.

This highlights that finding the longest increasing path in a matrix is effectively the same as **finding the longest path in a DAG**.

![Image represents a comparison of two visualizations of the same data flow.  The left side shows a 3x3 grid containing the numbers 1, 3, 5, 4, 8, 7, 9, 2, and 4 arranged in a matrix.  A highlighted path, colored peach, traces a sequence through the grid: starting at 1, moving down to 3, then right to 4, up to 5, and finally right to 8.  Orange arrows indicate the direction of flow along this path.  The right side displays a directed graph where each node is a circle containing one of the numbers from the grid.  The nodes are interconnected by directed edges (arrows) mirroring the path shown in the grid.  The same peach color highlights the corresponding path in the graph, showing the flow from node 1 to 5 to 8, then down to 3, and then to 4.  The numbers in both representations are identical, and the connections between them are consistent, demonstrating two different ways to visualize a sequential data flow or process.](/assets/images/dsa/graphs/939f3e3d9b60b06f.webp)

With this in mind, let’s figure out how to traverse the matrix.

**Traversing the matrix** One strategy is to find the length of the longest path that starts at each cell and return the maximum of these lengths. To do this, we need a way to explore all paths which extend from each cell, and return the longest one. Many traversal algorithms allow us to do this. In this explanation, we use DFS since it has a slightly simpler implementation for finding the longest path.

Let’s see how this works over an example. Start by performing DFS at the first cell, (0, 0):

![Image represents a 3x3 matrix, labeled as `dfs(0,0):`,  with rows and columns indexed from 0 to 2.  The matrix contains numerical values; specifically, the top-left cell (row 0, column 0) contains the number 1, encircled in a light pink or peach circle.  The remaining cells contain the numbers 5, 8, 3, 4, 4, 7, 9, and 2, arranged sequentially within the grid.  The matrix's structure suggests a data representation, possibly for a graph or a 2D array, with the `dfs(0,0)` label potentially indicating a depth-first search algorithm starting at the coordinates (0,0), which corresponds to the cell containing the circled '1'.  No URLs or parameters are visible. The overall visual presentation is simple and clear, focusing on the numerical data within the grid structure.](/assets/images/dsa/graphs/e534e23f7b9e3e7c.webp)

To determine the longest path starting from this cell, we need to explore its higher-value neighboring cells. By making a DFS call to each of these larger neighbors, we can find the lengths of the paths that start from them:

![Image represents a 3x3 matrix illustrating Depth-First Search (DFS) traversal of a 2D array.  The matrix contains numerical values (1, 5, 8, 3, 4, 4, 7, 9, 2) arranged in rows and columns, with row and column indices labeled 0, 1, and 2 respectively.  Two cells are highlighted in peach: the cell at (0,0) containing the value '1', and the cell at (1,0) containing the value '3'.  An orange arrow originates from the cell (0,0) pointing right to the cell (0,1) containing the value '5', indicating a traversal step. Another orange arrow points downwards from the cell (0,0) to the cell (1,0), showing another traversal step.  The text 'dfs(0,1)' is positioned above the matrix, likely indicating the starting point of the DFS algorithm at row 0, column 1. Similarly, 'dfs(1,0)' is placed to the left, suggesting another potential starting point at row 1, column 0. The overall image demonstrates a visual representation of the DFS algorithm's path through the matrix, highlighting the order of cell visits.](/assets/images/dsa/graphs/ad0ac21054664224.webp)

The largest path starting at cell (0, 0) will be equal to whichever of these DFS calls returns a larger path, plus 1 to include cell (0, 0) itself.

Note that since this matrix resembles a DAG, **we don’t need to mark cells as visited**, since it’s not possible to cycle back to previously visited cells.

The pseudocode for finding the length of the longest path starting at a given cell is provided below:

```python
def dfs(cell):
    max_path = 1
    for each neighbor of the current cell:
        if value of neighbor > value of cell:
            max_path = max(max_path, dfs(neighbor) + 1)
    return max_path
```

To get the final result, we just need to call DFS for every cell in the matrix, ensuring we find the lengths of the longest paths starting from each cell. The maximum of these lengths is equal to the length of the longest increasing path.

An important thing to notice is that it’s possible for DFS to be called on the same cell multiple times. We can see this below, where we call DFS on cell (2, 1) on three different occasions:

![Image represents three 3x3 matrices illustrating a Depth-First Search (DFS) algorithm's traversal. Each matrix is labeled with `dfs(row, column):`, indicating the starting point of the search.  The first matrix, `dfs(2,0)`, shows a 3x3 grid with numbers; the cell at row 2, column 0 (containing '7') is highlighted in peach, and an orange arrow points to the adjacent cell at row 2, column 1 (containing '9'), which is highlighted in light blue. The second matrix, `dfs(1,1)`, shows the same grid, but the highlighted cell is at row 1, column 1 (containing '4'), with an orange arrow pointing down to the light blue cell at row 2, column 1 (containing '9').  Finally, the third matrix, `dfs(2,2)`, shows the same grid with the highlighted cell at row 2, column 2 (containing '2'), and an orange arrow pointing left to the light blue cell at row 2, column 1 (containing '9').  The arrows indicate the direction of traversal during the DFS algorithm, highlighting the path taken from the starting cell.  The light blue cell represents the currently visited cell during the search.](/assets/images/dsa/graphs/db0263af7a344ec7.webp)

After we first calculate the longest path starting at a certain cell, we don’t need to calculate it again for that cell. This suggests we should use **memoization**: by storing the DFS result of each cell, we can just return the saved result whenever a DFS call is made to that cell again.

## Implementation

```python
from typing import List
    
def longest_increasing_path(matrix: List[List[int]]) -> int:
    if not matrix:
        return 0
    res = 0
    m, n = len(matrix), len(matrix[0])
    memo = [[0] * n for _ in range(m)]
    # Find the longest increasing path starting at each cell. The maximum of these is
    # equal to the overall longest increasing path.
    for r in range(m):
        for c in range(n):
            res = max(res, dfs(r, c, matrix, memo))
    return res
    
def dfs(r: int, c: int, matrix: List[List[int]], memo: List[List[int]]):
    if memo[r][c] != 0:
        return memo[r][c]
    max_path = 1
    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    # The longest path starting at the current cell is equal to the longest path of
    # its larger neighboring cells, plus 1.
    for d in dirs:
        next_r, next_c = r + d[0], c + d[1]
        if is_within_bounds(next_r, next_c, matrix) and matrix[next_r][next_c] > matrix[r][c]:
            max_path = max(max_path, 1 + dfs(next_r, next_c, matrix, memo))
    memo[r][c] = max_path
    return max_path
    
def is_within_bounds(r: int, c: int, matrix: List[List[int]]) -> bool:
    return 0 <= r < len(matrix) and 0 <= c < len(matrix[0])
```

### Complexity Analysis

**Time complexity:** The time complexity of `longest_increasing_path` is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) where m m m denotes the number of rows, and n n n denotes the number of columns. This is because each cell of the matrix is visited at most twice: once in the `longest_increasing_path` function, and during DFS where each cell is visited at most once due to memoization.

**Space complexity:** The space complexity is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) primarily due to the recursive call stack during DFS, and the memoization table, both of which can grow to m ⋅ n m\cdot n m ⋅ n in size.
