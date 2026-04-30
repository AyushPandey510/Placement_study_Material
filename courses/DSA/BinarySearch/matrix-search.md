---
title: "Matrix Search"
course: "DSA"
topic: "BinarySearch"
source: "/home/ayush/OOD-Design-Principles/DSA/BinarySearch/Matrix Search.html"
---
Determine if a target value exists in a matrix. **Each row of the matrix is sorted** in non-decreasing order, and the first value of each row is greater than or equal to the last value of the previous row.

#### Example:

![Image represents a 3x4 matrix of numerical data, with a target value declared as 'target = 21' above the matrix.  The matrix is indexed by row and column numbers, starting from 0.  Each cell within the matrix contains a single integer value.  The integers are arranged seemingly randomly, ranging from 2 to 33.  One specific cell, located at row index 2 and column index 1, contains the value 21, which is highlighted with a light green background, visually indicating it matches the declared target value.  No other connections or information flow beyond the simple presentation of the numerical data and the target value are depicted.](/assets/images/dsa/binarysearch/1722fc072a48bc3a.webp)

```python
Output: True
```

## Intuition

A naive solution to this problem is to linearly scan the matrix until we encounter the target value. However, this isn’t taking advantage of the sorted properties of the matrix.

A key observation is that all values in a given row are greater than or equal to all values in the previous row. This indicates the entire matrix can be considered as a single, continuous, sorted sequence of values:

![Image represents a data transformation process visualized using a matrix and arrows.  A 3x4 matrix is shown, with rows labeled 0, 1, and 2, and columns labeled 0, 1, 2, and 3.  Each cell in the matrix contains a numerical value (2, 3, 4, 6, 7, 10, 11, 17, 20, 21, 24, 33).  Light orange arrows indicate data flow.  Two arrows originate from the top-left corner of the matrix, one from row 0 and one from row 1, pointing downwards to a horizontal array below the matrix. This array displays the values from the first two rows of the matrix, concatenated horizontally ([2, 3, 4, 6, 7, 10, 11, 17]). A third arrow originates from the right side of the matrix, pointing downwards to another horizontal array, which displays the values from the last row of the matrix, concatenated horizontally ([20, 21, 24, 33]).  The final output is a single horizontal array containing all the values from the matrix, arranged sequentially.](/assets/images/dsa/binarysearch/63a8e95eef424026.webp)

If we were able to flatten this matrix into a single, sorted array, we could perform a **binary search** on the array. Creating a separate array and populating it with the matrix’s values still takes O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) time, and also takes O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) space, where m m m and n n n are the dimensions of the matrix. Is there a way to perform a binary search on the matrix without flattening it?

Let’s map the indexes of the flattened array to their corresponding cells in the matrix:

![Image represents a 3x4 matrix where each cell contains two numbers.  The top row and leftmost column are labeled with indices 0, 1, 2, and 3.  Each cell displays a larger number in black and a smaller number in peach within a circle. The larger number appears to be the result of some calculation involving the row and column indices. For example, the cell at row 0, column 0 contains 2 (larger number) and 0 (smaller number in a circle).  Below the matrix, a peach-colored horizontal bar displays the larger numbers from each cell, arranged sequentially from left to right, starting with 2 and ending with 33.  Beneath this bar, a second horizontal bar displays the smaller numbers from each cell, also arranged sequentially from left to right, starting with 0 and ending with 11.  The arrangement suggests a mapping or transformation between the row and column indices and the resulting larger and smaller numbers within each cell.](/assets/images/dsa/binarysearch/17564ef44f38310b.webp)

This index mapping would give us a way to access the elements of the matrix in a similar way to how we would access them in the flattened array. To figure out how to do this, let’s find a way to map any cell (`r`, `c`) to its corresponding index in the flattened array.

Let’s start by examining the mapped indexes of each row of the matrix:

- Row 0 starts at index 0.
- Row 1 starts at index `n`.
- Row 2 starts at index 2`n`.

From the above observations, we see a pattern: for any row `r`, the first cell of the row corresponds to the index `r⋅n`.

![Image represents a visual depiction of a coding pattern, likely related to a 2D array or matrix manipulation.  A horizontal number line labeled 'n = 4' shows indices 0, 1, 2, and 3. Below, a 3x4 matrix is displayed, with rows labeled 'r = 0', 'r = 1', and 'r = 2', and columns implicitly corresponding to the number line's indices.  The matrix cells contain numerical values; specifically, the first column shows values 0, n (representing the value of n, which is 4), and 2n (representing 2 times the value of n, which is 8).  Other cells contain seemingly calculated values, possibly based on a specific algorithm.  A downward arrow points from the cell containing '2n' to the label 'r . n', suggesting that the matrix's values are somehow related to or result in a calculation involving the row index 'r' and the value 'n'.  The highlighted cells (containing '0', 'n', and '2n') emphasize a pattern or relationship within the matrix's first column.](/assets/images/dsa/binarysearch/d390d5badfeb0a94.webp)

When we also consider the column value `c`, we can conclude that for any cell (`r`, `c`), the corresponding index in the flattened array is `r⋅n + c`.

Now that we understand how the 2D matrix maps to the 1D flattened array, let’s work backward to obtain the row and column indexes from an index in the flattened array. Let `i = r⋅n + c`. The row and column values are:

- **r = i // n**
- **c = i % n**

We can see how these are obtained below:

![Image represents a comparison of two methods for calculating the quotient (r) and remainder (c) when integer 'i' is divided by integer 'n'.  The left side demonstrates a sequential approach:  First, it establishes the relationship `i = rn + c`, then derives `i - c = rn`, followed by `(i - c) // n = r` (integer division to find the quotient), and finally `i // n - c // n = r` (showing an alternative calculation for 'r').  The last line, `i // n = r (c < n → c // n = 0)`, clarifies that `i // n` directly equals 'r' only if 'c' is less than 'n', otherwise, the subtraction of `c // n` is necessary. The right side presents an alternative, more concise method using the modulo operator (`%`). It starts with the same initial equation, `i = rn + c`, then directly calculates the remainder using `i % n = (rn + c) % n`. This simplifies to `i % n = rn % n + c % n`, and finally, if 'c' is less than 'n', it reduces to `i % n = c`.  The two sides illustrate different mathematical approaches to achieve the same result, highlighting the efficiency of the modulo operator for remainder calculation.](/assets/images/dsa/binarysearch/d00b30ac7af597f6.webp)

Now that we have these formulas, let’s use binary search to find the target.

**Binary search** To define the **search space**, we need the first and last indexes of the flattened array. The first index is 0, and the last index is `m⋅n - 1`. So, we set the left and right pointers to 0 and `m⋅n - 1` respectively.

To figure out how to **narrow the search space**, let’s explore an example matrix that contains the target of 21.

We can calculate mid using the formula: `mid = (left + right) // 2`. Then, determine the corresponding row and column values. Here, the value at the midpoint (10) is less than the target, which means the target is to the right of the midpoint. So, let’s narrow the search space toward the right:

![Image represents a visual explanation of a search algorithm within a 4x4 matrix.  The top shows 'target = 21,' indicating the value being searched for. A 4x4 matrix is displayed below, with each cell containing a number and its row and column index shown as subscripts.  The matrix is labeled with 'left', 'mid', and 'right' indicating index pointers.  The 'mid' pointer highlights the value 10 at row 1, column 1. To the right, calculations are shown: 'r = mid // n' (integer division of 'mid' by 4, resulting in 1) and 'c = mid % n' (modulo operation of 'mid' by 4, resulting in 1). This determines the row (r=1) and column (c=1) of the element to check. The condition 'matrix[r][c] < target' (10 < 21) is shown, indicating that the element at row 1, column 1 is less than the target.  Finally, the consequence 'left = mid + 1' is shown, suggesting the algorithm updates the 'left' pointer based on the comparison result.  The highlighted cell (21) shows the target value found in the matrix.](/assets/images/dsa/binarysearch/9ca7b80681dd2ba2.webp)

![Image represents a 4x4 grid, visually resembling a matrix or table, with rows and columns indexed from 0 to 3.  Each cell contains a number and a smaller subscript indicating an associated value.  A dashed orange line connects a highlighted orange circle in the top-left cell (containing the number 2 and subscript 0) to a cell in the second row and third column. This cell contains the number 11 and subscript 6, and is labeled 'left' with an orange rectangle.  Another orange rectangle labeled 'right' is present in the bottom-right cell (containing the number 33 and subscript 11). A light green circle highlights the number 21 (subscript 9) in the bottom-left cell.  A smaller, light gray rectangle labeled 'mid' is located above and slightly to the left of the 'left' labeled cell, suggesting a possible midpoint or intermediary step in the process indicated by the dashed line. The numbers in the subscripts appear to represent additional data associated with each main number in the grid.](/assets/images/dsa/binarysearch/83ca5e043696d3ab.webp)

The new midpoint value is still less than the target, so let’s narrow the search space towards the right:

![Image represents a visual explanation of a search algorithm within a 4x4 matrix.  The top shows 'target = 21,' indicating the value being searched for. A 4x4 matrix is displayed below, with rows labeled 0, 1, 2 and columns labeled 0, 1, 2, 3. Each cell contains a number, and the cell containing 20 is labeled 'mid' (in cyan), the cell containing 11 is labeled 'left' (in orange), and the cell containing 33 is labeled 'right' (in orange).  To the right, a separate box details the calculation process: 'r = mid // n' (integer division of mid by n, where mid is 8 and n is 4, resulting in r=2) and 'c = mid % n' (modulo operation of mid by n, resulting in c=0).  The line 'matrix[r][c] < target' indicates a comparison between the value at matrix position [2][0] (which is 20) and the target value (21). The result of this comparison (20 < 21) leads to the assignment 'left = mid + 1,' implying an adjustment of the search range based on the comparison.  The overall diagram illustrates a step in a binary search or similar algorithm applied to a 2D array.](/assets/images/dsa/binarysearch/d1e9a9c8e668414c.webp)

![Image represents a 3x4 matrix, visually resembling a table or grid, with numerical data organized into cells.  The rows are labeled 0, 1, and 2, and the columns are labeled 0, 1, 2, and 3. Each cell contains two numbers; a larger, prominent number and a smaller, less prominent number below it.  For example, the cell at row 1, column 1 contains '10' and '5' below it.  The cells at row 2, column 1 and row 2, column 3 are highlighted in orange with the labels 'left' and 'right' respectively.  A dashed orange line with a checkmark at its end originates from the cell containing '10' and '5' and points to the cell containing '21' and '9', indicating a possible connection or flow of information between these two cells.  An orange dot is present in the cell at row 1, column 2, containing '11' and '6'.  The numbers in the cells appear to be related, possibly representing some kind of data structure or algorithm, with the smaller numbers potentially representing additional information or indices.](/assets/images/dsa/binarysearch/abbf5acc5190ba46.webp)

The midpoint value is now larger than the target, which means the target is to the left of the midpoint. So, let’s move the search space to the left:

![Image represents a visual explanation of a search algorithm within a 4x4 matrix.  The top shows 'target = 21,' indicating the value being searched for. A 4x4 matrix is displayed below, with each cell containing a number and its row and column indices subtly indicated.  The matrix's rows are indexed 0, 1, and 2, and columns are indexed 0, 1, 2, and 3.  The number 21 is highlighted within the matrix, labeled 'left,' indicating its position in the search.  To its right is the number 24, labeled 'mid,' and to its further right is 33, labeled 'right.' These labels suggest a binary search-like approach. A separate box to the right details the calculation process:  'r = mid // n' and 'c = mid % n' calculate the row (r) and column (c) indices of the 'mid' element (24 in this case), where 'mid' is 10 (its index in a flattened array), 'n' is 4 (the number of columns). The calculations show r = 2 and c = 2.  Finally, 'matrix[r][c] > target → right = mid - 1' indicates that if the value at matrix[2][2] (which is 24) is greater than the target (21), the right boundary of the search is updated to 'mid - 1', effectively narrowing the search space.](/assets/images/dsa/binarysearch/57a97d0a77d5f5a3.webp)

![Image represents a 3x4 matrix, visually resembling a table, with rows and columns indexed from 0 to 2 and 0 to 3 respectively.  Each cell contains a number, with smaller numbers beneath indicating a secondary value.  A dashed orange line with an arrowhead connects cell (1,2) containing '11' to cell (1,3) containing '17', labeled 'mid' near the arrowhead.  Two rectangular orange boxes, labeled 'left' and 'right', are positioned near cell (2,1) containing '21', which is highlighted in a green circle.  The numbers within the matrix appear to be related, possibly representing data or results from a computation, with the orange labels and dashed line suggesting a process or algorithm involving a 'left', 'right', and 'mid' component, potentially indicating a partitioning or traversal strategy within the data structure.](/assets/images/dsa/binarysearch/617ca0e50e66cd12.webp)

Now, the midpoint is equal to the target, so we return true to conclude the search.

![Image represents a visual explanation of a search algorithm within a matrix.  A 3x4 matrix is shown, with each cell containing a number and its index (row, column) subtly displayed below.  The top row displays column indices (0, 1, 2, 3), and the leftmost column displays row indices (0, 1, 2). The number 21 is highlighted within the matrix at index (2,1), indicating a 'mid' value.  To the right, a separate box details the calculation: `r = mid // n` (integer division of `mid` (9) by `n` (4), resulting in `r = 2`) and `c = mid % n` (modulo operation of `mid` (9) by `n` (4), resulting in `c = 1`).  This calculation determines the row (`r`) and column (`c`) indices of the element being checked. Finally, the condition `matrix[r][c] == target` is shown, indicating that if the element at the calculated index (`matrix[2][1]`) equals the `target` value (21), the function returns `True`.  The overall diagram illustrates how a search algorithm might locate a target value within a matrix using integer division and modulo operations to determine the index.](/assets/images/dsa/binarysearch/61750ede9bae9c6b.webp)

Note that our **exit condition** should be `while left ≤ right` in order to also examine the above search space when `left == right`.

## Implementation

```python
from typing import List
    
def matrix_search(matrix: List[List[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    # Perform binary search to find the target.
    while left <= right:
        mid = (left + right) // 2
        r, c = mid // n, mid % n
        if matrix[r][c] == target:
            return True
        elif matrix[r][c] > target:
            right = mid - 1
        else:
            left = mid + 1
    return False
```

### Complexity Analysis

**Time complexity:** The time complexity of `matrix_search` is O ( log ⁡ ( m ⋅ n ) ) O(\log(m\cdot n)) O ( lo g ( m ⋅ n )) because it performs a binary search over a search space of size m ⋅ n m\cdot n m ⋅ n.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
