---
title: "Triangle Numbers"
course: "DSA"
topic: "MathAndGeometry"
source: "/home/ayush/OOD-Design-Principles/DSA/MathAndGeometry/Triangle Numbers.html"
---
Consider a triangle composed of numbers where the top of the triangle is 1. Each subsequent number in the triangle is equal to the **sum of three numbers above it**: its top-left number, its top number, and its top-right number. If any of these three numbers don't exist, assume they are equal to 0.

Given a value representing a row of this triangle, **return the position of the first even number in this row**. Assume that the first number in each row is at position 1.

#### Example:

![Image represents a triangular arrangement of numbers, resembling Pascal's triangle.  The triangle is outlined in orange and filled with a light beige color.  Four rows are shown, with each row representing a level in the triangle.  The first row contains only the number '1'. The second row contains '1 1 1'. The third row contains '1 2 3 2 1', and the fourth row contains '1 3 6 7 6 3 1'.  To the left, four horizontal grey arrows point towards the triangle, labeled 'row 1', 'row 2', 'row 3', and 'row 4' respectively, indicating the input or source of each row.  Within the triangle, small grey arrows and '+' symbols show how the numbers in row 3 are added to generate the numbers in row 4. The number '6' in row 4 is highlighted in a peach-colored circle. A curved arrow points from this circled '6' to a caption below the triangle that reads: `1<sup>st</sup> even number in row 4 is at position 3.`, indicating the position of the first even number in the fourth row.](/assets/images/dsa/mathandgeometry/20ae324f62ee471d.webp)

```python
Input: n = 4
Output: 3
```

#### Constraints:

- `n` will be at least 3.

## Intuition

A naive solution to this problem is to generate the entire triangle and all of its values up to the nth row. Then, we can iterate through the nth row until we encounter the first even number. However, this approach is inefficient because it results in an excessive use of time and memory to build the entire triangle. To find a more optimal solution, let’s consider how we can simplify the representation of our triangle.

**Simplifying the triangle** The first key observation is that the triangle is symmetric. This means we can exclude the right half of the triangle because if an even number exists in the right half, it definitely exists in the left half:

![Image represents a numerical triangle, resembling Pascal's triangle but with a modified pattern.  The triangle is arranged with a single '1' at the apex, followed by rows expanding symmetrically. Each number in a row is the sum of the two numbers directly above it (except for the edge '1's).  The numbers increase towards the center of each row and then decrease symmetrically.  Vertically oriented red lines are drawn through the triangle, seemingly highlighting a specific path or subset of numbers within the structure.  These lines do not appear to follow a consistent pattern based on the visible portion of the triangle, suggesting a selection rather than a mathematical relationship.  No URLs or parameters are present.](/assets/images/dsa/mathandgeometry/2c967ac7955c2ee5.webp)

To more easily visualize the positions of the numbers in each row, let’s draw it such that numbers belonging to the same position are aligned:

![Image represents a 5x5 matrix, or a two-dimensional array, visually depicting a pattern.  The top row is labeled 'position' with numbers 1 through 5 representing column indices. The leftmost column is labeled 'row' with numbers 1 through 5 representing row indices.  The matrix itself contains numerical values; the first row contains a single '1', the second row contains '1' and '1', the third row contains '1', '2', and '3', the fourth row contains '1', '3', '6', and '7', and the fifth row contains '1', '4', '10', '16', and '19'.  The arrangement shows a pattern where each number is the sum of the number directly above it and the number to its left (except for the first element in each row and column, which are all '1').  There are no URLs or parameters present.](/assets/images/dsa/mathandgeometry/e2a7faa8a8aeab14.webp)

The next key observation is that we don’t necessarily care about the values themselves: we only care about the parity of each number (i.e., if they’re even or odd). Given this, we can simplify the triangle further by representing it as a binary triangle where 0 represents an even number and 1 represents an odd number:

![Image represents a 5x5 matrix, labeled 'position' at the top, showing the arrangement of data points.  The rows are numbered 1 through 5 on the left-hand side, labeled 'row,' and the columns are numbered 1 through 5 at the top, labeled 'position.' Each cell within the matrix contains either a '1' or a '0.' The arrangement of '1's and '0's is not random; it appears to represent a pattern, possibly related to a specific coding pattern or algorithm.  The '1's are concentrated along the main diagonal and adjacent cells, while the '0's fill the remaining cells.  No other information, such as URLs or parameters, is present in the image. The matrix visually displays the positional relationship between the data points represented by the '1's and '0's.](/assets/images/dsa/mathandgeometry/f3dbfa58d138c404.webp)

Now that we’ve simplified the triangle, it’ll be easier to identify patterns in the positions of the first even number in each row. Let’s explore this further.

**Identifying patterns** Let's ignore rows 1 and 2 since even numbers only begin appearing from row 3 onward. A good place to start looking for a pattern is to highlight the first even number at each row and observe their positions:

![Image represents a 5x5 matrix illustrating a coding pattern.  The top row is labeled 'position' with numbers 1 through 5 representing column indices. The leftmost column is labeled 'row,' with rows 1 and 2 showing only light gray '1's. Rows 3 and 5 are labeled '(odd)' and row 4 is labeled '(even),' indicating a pattern based on row parity.  Each cell within the matrix contains either a '1' or a peach-colored '0'.  The '0's are strategically placed at positions (3,2), (4,3), and (5,2), suggesting a pattern related to the interaction between row parity and column position.  The '1's fill the remaining cells, forming a pattern that could be described algorithmically based on the row number and column position.  No URLs or parameters are present.](/assets/images/dsa/mathandgeometry/de36c7c896e9726e.webp)

From rows 3 to 5, one possible pattern to observe is that odd-numbered rows have the first even number at position 2. We could also hypothesize that even-numbered rows have the first even at position 3.

To confirm if this observation is consistent, let’s look at some more rows:

![Image represents a 7x7 matrix visually depicting a pattern.  The matrix is labeled 'position' along the top row, with numbers 1 through 7 representing column indices. The leftmost column is labeled 'row,' with row indices 1 through 7, with odd-numbered rows additionally labeled '(odd)'.  The matrix cells contain either the number '1' or a peach-colored circle representing '0'. The '0' values are arranged diagonally across the matrix, starting from row 3, column 2 and continuing down and to the right, with one '0' per row. All other cells contain the number '1'.  The arrangement suggests a pattern where the '0' values indicate a specific condition or state within the data structure represented by the matrix.](/assets/images/dsa/mathandgeometry/266d1379665d3cf3.webp)

So far, our hypothesis for odd-numbered rows is still true, but even-numbered rows seem to be following a different pattern. It’s still hard to pinpoint what it could be.

Let's continue by displaying a few more rows to figure out what this pattern is:

![Image represents a 10x10 matrix illustrating a coding pattern, specifically focusing on odd-numbered rows.  The matrix is labeled with 'position' across the top (numbers 1-10) and 'row' down the side (numbers 1-10, with '(odd)' annotations beside odd-numbered rows).  The matrix cells contain either a '0' or a '1'.  Within each odd-numbered row (3, 5, 7, 9), a single cell contains a peach-colored '0', visually highlighted.  This peach-colored '0' is positioned such that it moves one position to the right in each subsequent odd-numbered row.  The remaining cells in the odd-numbered rows contain '1's, while the even-numbered rows are partially filled with '1's, forming a pattern that mirrors the arrangement of '1's in the odd rows, but without the highlighted '0'. The overall pattern suggests a relationship between row number and the position of the highlighted '0', potentially representing an algorithm or data structure where the highlighted '0' indicates a specific index or element within each odd-numbered row.](/assets/images/dsa/mathandgeometry/00d9a81c0b68c370.webp)

Now, we notice that the first four binary values from rows 3 to 6 repeat for rows 7 to 10. If we were to continue for future rows, we would notice that this pattern continues.

Essentially, the following pattern is consistently repeated, starting from row 3:

![Image represents a 4x4 matrix, visually depicted as a table with rows labeled 3, 4, 5, and 6, and implicitly numbered columns.  Each cell contains a binary value (0 or 1).  The matrix is bordered by a light-blue rectangle.  Within the matrix, specific cells contain a light-peach colored circle encompassing the digit '0'. These circled zeros appear at positions (3,2), (4,3), (5,2), and (6,4), indicating a possible selection or highlighting of these specific elements.  The remaining cells contain either a '1' or a '0' without any special formatting.  No URLs or parameters are visible; the image solely presents the matrix data and the visual emphasis on certain '0' values.](/assets/images/dsa/mathandgeometry/8aeff8e759dbb2a7.webp)

To understand why this pattern repeats, it’s important to realize that the first four values of a row are calculated solely from the four values of the previous row. We can see this visualized below, using the initial representation of the triangle to make it clearer:

![Image represents four identical numerical arrays, each consisting of a 7x1 arrangement of numbers.  Each array displays the numbers 1, 2, 1, 2, 1 across the second row, and 1, 3, 6, 7, 6, 3, 1 across the third row.  The top row of each array shows a single '1' in grey, and the fourth row shows a single '1' in grey.  The first and last numbers in the second and third rows are also in grey.  Within each array, orange arrows point downwards from the '1' and '2' values in the second row to the numbers below, indicating a summation operation.  Specifically, the '1' in the second row is added to the '3' below it, and the '2' is added to the '6' below it, resulting in the '3' and '6' in the third row being the sum of the numbers above them.  The '7' in the third row is the sum of the '1' and '2' above it.  This pattern of summation is consistent across all four arrays.](/assets/images/dsa/mathandgeometry/ecb6f8a2a4259de6.webp)

So, whenever a specific sequence of four numbers occurs at the beginning of a row, it will generate a predictable sequence of four numbers in the following row. Extending this observation to the entire pattern, we can conclude that since the pattern repeated once (from rows 3 to 6 to rows 7 to 10), it will continue to repeat indefinitely.

This gives us the below cyclic rationale:

- **If n is odd** (`n % 2 != 0`), return 2.
- **If n is a multiple of 4** (`n % 4 == 0`), return 3.
- **Else**, return 4.

![Image represents three 10x4 matrices, each depicting a different pattern of 0s and 1s.  Above each matrix is a peach-colored annotation describing the pattern's rule. The first matrix, labeled 'all odd rows: position 2,' shows a 0 in the second position of every odd-numbered row (rows 3, 5, 7, and 9). The second matrix, labeled 'all rows that are a multiple of 4: position 3,' shows a 0 in the third position of every fourth row (row 4 and row 8). The third matrix, labeled 'all other rows: position 4,' shows a 0 in the fourth position of all rows not covered by the first two rules (rows 3, 5, 6, 7, 9, and 10).  Each matrix has rows numbered 3 through 10, and each row contains four values (1 or 0).  A downward-pointing arrow connects each annotation to its corresponding matrix, visually indicating the application of the rule.  The highlighted 0s in each matrix clearly show the positions affected by each rule.](/assets/images/dsa/mathandgeometry/d89254fe004383a9.webp)

This problem demonstrates how recognizing patterns and simplifying the problem can turn a time-consuming solution into a quick, constant-time one.

## Implementation

```python
def triangle_numbers(n: int) -> int:
    # If n is an odd-numbered row, the first even number always starts at position
    # 2.
    if n % 2 != 0:
        return 2
    # If n is a multiple of 4, the first even number always starts at position 3.
    elif n % 4 == 0:
        return 3
    # For all other rows, the first even number always starts at position 4.
    return 4
```

### Complexity Analysis

**Time complexity:** The time complexity of `triangle_numbers` is O ( 1 ) O(1) O ( 1 ).

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
