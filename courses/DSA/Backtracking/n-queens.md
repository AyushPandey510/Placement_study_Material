---
title: "N Queens"
course: "DSA"
topic: "Backtracking"
source: "/home/ayush/OOD-Design-Principles/DSA/Backtracking/N Queens.html"
---
There is a chessboard of size `n x n`. Your goal is to place `n` queens on the board such that **no two queens attack each other**. Return the number of distinct configurations where this is possible.

#### Example:

![Image represents a before-and-after visualization of a simple puzzle or algorithm, likely illustrating a sorting or rearrangement process.  The image consists of two identical 3x3 grids, each cell shaded alternately light and dark gray.  Each grid contains four identical black crown symbols, each with a horizontal line beneath it. The left grid shows the crowns arranged in a seemingly random pattern: one in the top left, one in the bottom left, one in the middle right, and one in the bottom right. The right grid shows the same four crowns, but now they are arranged in a different, more organized pattern: one in the top right, one in the middle left, one in the bottom left, and one in the bottom right. The grids are side-by-side, clearly indicating a transformation from the initial state (left) to a final state (right).  No text, URLs, or parameters are present; the visual representation alone conveys the change in arrangement.](/assets/images/dsa/backtracking/020fa4b3fc05a881.webp)

```python
Input: n = 4
Output: 2
```

## Intuition

Queens can move vertically, horizontally, and diagonally:

![Image represents a central black crown icon surrounded by eight arrows pointing outwards in various directions.  Four arrows point vertically (two up, two down), two arrows point horizontally (one left, one right), and two arrows point diagonally (one up-right, one down-left, one up-left, and one down-right). To the right of the crown and arrows, a list describes the arrow directions as: '- vertically', '- horizontally', and '- diagonally'.  The arrangement visually depicts data flow or connections emanating from a central point in multiple directions, illustrating the concept of multi-directional data access or propagation.](/assets/images/dsa/backtracking/5f0ba3ab826825b7.webp)

So, it's only possible to place a queen on a square of the board when:

- No other queen occupies the same row of that square.
- No other queen occupies the same column of that square.
- No other queen occupies either diagonal of that square.

Based on this, let’s identify a method for placing the queens.

**Placing the queens - backtracking** A straightforward strategy is to place one queen on the board at a time, making sure each new queen is placed on a safe square where it can’t be attacked. If we can no longer safely place a queen, it means one or more of the previously placed queens need to be repositioned. In this case, we backtrack by changing the position of the previous queen and trying again.

To make backtracking more efficient, we can place each queen on a new row. This way, we don’t have to worry about conflicts between queens on the same row, and only need to check for an opposing queen on the same column and along the diagonals of the square where the new queen is placed. If a queen cannot be placed anywhere on this new row, we backtrack, reposition the previous row’s queen, and then try again:

![Image represents a step-by-step illustration of the backtracking algorithm applied to the N-Queens problem.  The process begins with an attempt to place a black queen (represented by ♛) on a row of a chessboard (represented by a grid).  Initially, the algorithm tries placing the queen in the first column of the row, indicated by a red line connecting the queen to a red circle with a minus sign (-) within the grid, signifying an attacked square.  This placement results in all squares on that row being attacked, as shown by the red shading and minus signs.  A blue arrow labeled 'backtrack' then indicates a move to the next step.  The next frame shows the queen removed from its initial position. A dashed arrow then shows the algorithm moving to the next position. The final frame shows the algorithm successfully placing the queen in a different column of the same row, highlighted by a green square, because this position doesn't attack any previously placed queens, as indicated by the green arrow and text 'can place queen here'.  The red lines emanating from the queens represent the squares they attack, both horizontally, vertically, and diagonally. The text 'All squares are attacked. So, backtrack and reposition the previous queen' explains the reason for backtracking.](/assets/images/dsa/backtracking/fdaa8494d0c5d979.webp)

A partial state space tree for this backtracking process is visualized below for n = 4:

![Image represents a tree-like structure illustrating a search algorithm, possibly for solving a puzzle or game involving placing crowns on a grid.  The topmost node shows an empty 4x4 grid.  This root node branches into four child nodes, each representing a possible placement of a single black crown on the grid.  These nodes further branch, with each subsequent level representing additional crown placements.  Grey arrows indicate valid moves, while black arrows show the progression of the algorithm. Red lines connect crowns indicating attacks or conflicts.  Red circles next to some leaf nodes signify invalid configurations (where crowns attack each other).  The algorithm continues until a solution is found, indicated by a green box around a leaf node containing a valid configuration of crowns without any conflicts, marked with a green checkmark.  The algorithm appears to be exploring all possible placements systematically, pruning branches that lead to invalid states.](/assets/images/dsa/backtracking/4f33f424c2b19e34.webp)

We’re still left with some questions. In particular, how can we tell if a square is being attacked, and how exactly do we “place” or “remove” a queen?

**Detecting opposing queens** One challenge in this problem is determining if a square is attacked by another queen. We could do a linear search across the row, column, and diagonals every time we want to place a new queen, but this is quite inefficient. A key observation is that we don't necessarily need to know the exact positions of all the queens. We only need to know if there exists a queen in any given square's row, column, or diagonals. We can use **hash sets** to efficiently check for this.

Note that we don’t need a hash set for rows because we always place each queen on a different row. For columns, whenever we place a new queen on a square (r, c), we can add that square’s column id (c) to a column hash set.

What about diagonals? How can we determine which diagonal we're on? Since there are two types of diagonals, let’s refer to the diagonal that goes from top-left to bottom-right as the "**diagonal**", and the one that goes from top-right to bottom-left as the "**anti-diagonal**". Consider the following diagrams:

![Image represents a comparison of two 4x4 matrices illustrating diagonal and anti-diagonal patterns.  The left matrix, titled 'Diagonals:', displays light-blue shaded diagonals where each element is calculated as `r - c`, with 'r' representing the row number (0-3) and 'c' representing the column number (0-3).  The top row shows column labels (0, 1, 2, 3), and the leftmost column shows row labels (0, 1, 2, 3).  The matrix elements are the result of subtracting the column number from the row number. The right matrix, titled 'Anti-diagonals:', shows lavender-shaded anti-diagonals, where each element is calculated as `r + c`, using the same row and column numbering system.  The elements in this matrix are the sum of the row and column numbers.  Both matrices use bold black outlines and clearly labeled axes for rows ('r') and columns ('c'), with the calculation formula displayed below each matrix in a corresponding color.](/assets/images/dsa/backtracking/a2e98f758f82d31b.webp)

The key observation here is that, for any square (r, c), its diagonal can be identified using the id r - c, and its anti-diagonal is identified using the id r + c. Similarly to how we keep track of column ids, we can use a diagonal and an anti-diagonal hash set to keep track of diagonal and anti-diagonal ids, respectively.

**Placing and removing a queen** Now that we have a way to identify opposing queens, we know the action of "placing" a queen means adding its column, diagonal, and anti-diagonal ids to their respective hash sets. Inversely, to remove a queen, we just remove those exact ids from the hash sets.

## Implementation

Note, this implementation uses a global variable as it leads to a more readable solution. However, it's important to confirm with your interviewer whether global variables are acceptable.

```python
from typing import Set
    
res = 0
    
def n_queens(n: int) -> int:
   dfs(0, set(), set(), set(), n)
   return res
    
def dfs(r: int, diagonals_set: Set[int], anti_diagonals_set: Set[int], cols_set: Set[int], n: int) -> None:
    global res
    # Termination condition: If we have reached the end of the rows, we've placed all
    # 'n' queens.
    if r == n:
        res += 1
        return
    for c in range(n):
        curr_diagonal = r - c
        curr_anti_diagonal = r + c
        # If there are queens on the current column, diagonal or anti-diagonal, skip
        # this square.
        if (c in cols_set or curr_diagonal in diagonals_set or curr_anti_diagonal in anti_diagonals_set):
            continue
        # Place the queen by marking the current column, diagonal, and anti-diagonal
        # as occupied.
        cols_set.add(c)
        diagonals_set.add(curr_diagonal)
        anti_diagonals_set.add(curr_anti_diagonal)
        # Recursively move to the next row to continue placing queens.
        dfs(r + 1, diagonals_set, anti_diagonals_set, cols_set, n)
        # Backtrack by removing the current column, diagonal, and anti-diagonal from
        # the hash sets.
        cols_set.remove(c)
        diagonals_set.remove(curr_diagonal)
        anti_diagonals_set.remove(curr_anti_diagonal)
```

### Complexity Analysis

**Time complexity:** The time complexity of n_queens is O ( n ! ) O(n!) O ( n !). Here’s why:

- For the first queen, there are n n n choices for its position.
- For the second queen, there are n − a n-a n − a choices for its position, where a a a denotes the number of squares on the second row attacked by the first queen.
- The third queen has n − b n-b n − b choices, where b b b denotes the number of squares on the third row attacked by the previous two queens, and b < a b<a b < a.
- This process continues for subsequent queens, resulting in a total of n ⋅ ( n − a ) ⋅ ( n − b ) … 1 n\cdot (n-a)\cdot (n-b)…1 n ⋅ ( n − a ) ⋅ ( n − b ) … 1 choices. Even though this doesn’t exactly equate to n ! n! n ! (n ⋅ ( n − 1 ) ⋅ ( n − 2 ) … 1 n\cdot (n-1)\cdot (n-2)…1 n ⋅ ( n − 1 ) ⋅ ( n − 2 ) … 1 ), this trend approximately results in a factorial growth of the search space.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the maximum depth of the recursion tree is n n n. The hash sets also contribute to this space complexity because they each store up to n n n values.
