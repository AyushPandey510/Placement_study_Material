---
title: "Longest Common Subsequence"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/Longest Common Subsequence.html"
---
Given two strings, find the **length of their longest common subsequence** (LCS). A subsequence is a sequence of characters that can be derived from a string by deleting zero or more elements, without changing the order of the remaining elements.

#### Example:

![Image represents three pairs of small, peach-colored, circular nodes, each containing a single letter ('a', 'b', 'c', or 'e'), connected by lines to illustrate different graph structures.  The first pair shows a simple linear connection: a node labeled 'a' connects to another node labeled 'a' below it; to the right, a node labeled 'b' connects to a node labeled 'a' and another labeled 'b'.  The second pair, separated by the word 'OR' in gray text, shows a different connection: a node labeled 'a' connects to nodes labeled 'b' and 'a' below it; to the right, a node labeled 'a' connects to nodes labeled 'a' and 'b' below it. The third pair, also separated by 'OR', mirrors the structure of the first pair, with a linear connection of 'a' to 'a' on the left and 'b' connecting to 'a' and 'b' on the right.  Each node is labeled with a single letter, and the connections between nodes are represented by simple lines.  The overall image seems to illustrate alternative graph structures or data flow patterns, possibly within a coding context.](/assets/images/dsa/dynamicprogramming/37bd5e57f2c69e7d.webp)

```python
Input: s1 = 'acabac', s2 = 'aebab'
Output: 3
```

## Intuition

A naive approach to this problem is to generate every possible subsequence for both strings and identify the LCS among them. This is extremely inefficient, so we need to think of something better.

One way to think about this problem is to realize that for any character from either string, we have a choice to either include it in the LCS, or exclude it. This will help us figure out the next steps in finding the length of the LCS.

Let’s start by considering the first character of each string and whether we should include or exclude them. There are two primary cases to discuss:

- Case 1: the characters are the same.
- Case 2: the characters are different.

**Case 1: equal characters** Consider the following two strings, where we’re trying to find the length of their LCS, starting from index 0 of each string (`LCS(0, 0)`):

![Image represents a diagram illustrating the concept of Longest Common Subsequence (LCS).  The diagram shows two sequences of characters arranged in a rectangular box. The top row contains the sequence 'a c a b a c', and the bottom row contains the sequence 'a e b a b'.  These sequences are presented as input to an LCS function, denoted by 'LCS(θ, θ)' where θ likely represents the empty sequence or null input. The question mark following the function call indicates that the length of the LCS between these two sequences is unknown and needs to be calculated.  The arrangement of the characters in rows implies that the LCS algorithm would compare elements in corresponding positions to find the longest common subsequence.  No explicit connections or information flow are visually depicted beyond the presentation of the two input sequences and the LCS function call.](/assets/images/dsa/dynamicprogramming/8965f9a61faf3ee6.webp)

The first characters of these two strings are equal. What should we do about them? We should include these characters in the LCS as they form the beginning of a common subsequence. Including them also means our LCS will have a length of at least 1. But how do we find the length of the rest of the LCS? We can do this by computing the LCS of the remainder of both strings. That is, the LCS of their substrings starting at index 1 (`LCS(1, 1)`):

![Image represents a visual depiction of a step in the Longest Common Subsequence (LCS) algorithm.  A light-green vertical rectangle on the left contains the sequence 'aa', representing one input sequence.  A horizontal rectangle to its right displays a second input sequence: 'cabcac'. Below the horizontal rectangle, the word 'equal' is written in green, indicating a match.  A right-pointing arrow connects the 'aa' sequence to the word 'equal', signifying that the algorithm is currently comparing the first elements of both sequences. To the far right, the equation 'LCS(0, 0) = 1 + LCS(1, 1)' is shown, representing a recursive step in the LCS calculation.  The 'LCS(0, 0)' term refers to the LCS length of the entire sequences, while 'LCS(1, 1)' represents the LCS length of the subsequences starting from the second element of each input sequence. The equation shows that if the first elements match (as they do here with 'a'), the overall LCS length is incremented by 1, and the calculation recursively continues with the remaining subsequences.](/assets/images/dsa/dynamicprogramming/75315ebf8d51c71f.webp)

We’ve just identified that this case can be solved by solving a subproblem that also computes the LCS of two strings, indicating this problem has an **optimal substructure**.

Therefore, we can generalize a recurrence relation for this case. Below, index `i` and `j` represent the start of the substring of `s1` and `s2`, respectively.

`if s1[i] == s2[j]: LCS(i, j) = 1 + LCS(i + 1, j + 1)`

**Case 2: different characters** Now, let’s say the first characters of the two strings are different:

![Image represents a visual depiction of a Longest Common Subsequence (LCS) problem.  A rectangular box contains two rows of characters. The top row displays the sequence 'a c a b a c,' and the bottom row shows 'k e b a b.'  A red rectangular highlight encloses the first column, containing 'a' and 'k'. A red arrow points downwards from this highlighted column to the word 'different' indicating that the characters 'a' and 'k' are not the same. To the right of the box, the notation 'LCS(θ, θ) = ?' is written, posing the question of finding the longest common subsequence between two sequences (represented by θ, which likely stands for an empty sequence in this context, implying the initial step of the LCS algorithm).  The overall diagram illustrates the initial comparison step in an LCS algorithm, highlighting a difference between the first elements of the two input sequences.](/assets/images/dsa/dynamicprogramming/cf91792371a90f88.webp)

This means the LCS cannot include both of these characters. It could include one of them, but certainly not both. Therefore, we have two choices to find the LCS:

1. Exclude ‘a’ from the first string to find the LCS between the two strings after this exclusion:
2. Exclude ‘k’ from the second string to find the LCS between the two strings after this exclusion:

The length of the LCS will be the larger length between these two options. Again, here we see that we’re dealing with a problem of optimal substructure. The recurrence relation for this case is:

`if s1[i] != s2[j]: LCS(i, j) = max(LCS(i + 1, j), LCS(i, j + 1))` (i.e. max(LCS excluding `s1[i]`, LCS excluding `s2[j]`))

**Dynamic programming** Since we’re dealing with overlapping subproblems, where the solutions to a subproblem can be used multiple times, we can convert our recurrence relation to a DP formula. Let’s say `dp[i][j]` represents `LCS(i, j)`. Based on our previous discussion, we know that:

`if s1[i] == s2[j]: dp[i][j] = 1 + dp[i + 1][j + 1] else: dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])`

Now, we need to think about what the base cases should be.

**Base cases** The simplest version of our problem is when one or both strings are empty. In this case, their LCS has a length of 0. But which values of the DP table should we populate for these base cases?

We know that when `i = len(s1) - 1`, only one character of `s1` is being considered:

![Image represents a diagram illustrating the calculation of an index within a string.  A rectangular box at the top contains the assignment statement `i = len(s1) - 1`, indicating that the variable `i` is being assigned the value of the length of a string `s1` minus 1. A downward arrow connects this box to a sequence of characters 'a c a b a c' displayed below. The arrow points to the last character 'c' in the sequence, visually representing that the calculated index `i` points to the last element of the string `s1`.  The characters 'a c a b a' are shown in a lighter gray, suggesting they are part of the string but not the immediate focus of the calculation. The overall diagram demonstrates how the formula `len(s1) - 1` determines the index of the last element in a string.](/assets/images/dsa/dynamicprogramming/5dad38355879c47f.webp)

This implies that when `i = len(s1)`, the substring of `s1` contains no characters. The equivalent is true for `s2` when `j = len(s2)`. Therefore, we can populate the DP table with the base case values like so:

- `dp[len(s1)][j] = 0` for all `j`
- `dp[i][len(s2)] = 0` for all `i`

Let’s draw the DP table with just these base cases to get a better idea of what this looks like:

![Image represents a 6x6 matrix, labeled as `s1` on the left and `s2` at the top.  The rows of the matrix are indexed 0 through 5, and labeled with characters 'a', 'c', 'a', 'b', 'a', and '''. The columns are indexed 0 through 5, and labeled with characters 'a', 'e', 'b', 'a', 'b', and '''.  The matrix itself is mostly empty, containing only zeros ('0') in the bottom row and the rightmost column.  A right-pointing arrow extends from the bottom-right corner of the matrix, pointing to the text 'base case,' indicating that the bottom row represents a base case in some algorithm or process. The arrangement suggests a tabular representation of data or a state space, possibly related to dynamic programming or a similar computational technique where the matrix entries might represent intermediate results or values.](/assets/images/dsa/dynamicprogramming/811048997bbbfc86.webp)

As we can see, the last row and last column are set to 0 for our base cases.

**Populating the DP table** We populate the DP table starting from the smallest subproblems (excluding the base cases). Specifically, we begin by populating `dp[len(s1) - 1][len(s2) - 1]`, which considers the LCS of only the last character of each string. From there, we iteratively populate the DP table in reverse order, moving backward through the table until we reach cell (0, 0).

![Image represents a table visualizing a string matching algorithm, possibly demonstrating the operation of a finite automaton or similar pattern-matching technique.  The table is organized with rows labeled `s1` (representing a pattern string) and numbered 0-6, and columns labeled `s2` (representing a text string) and numbered 0-5, corresponding to characters 'a', 'e', 'b', 'a', 'b', and '''.  Each row in `s1` contains a character ('a', 'c', 'a', 'b', 'a', 'c', ''') representing the pattern.  Horizontal orange arrows connect cells in `s1` to cells in `s2`. These arrows indicate a match between a character in the pattern (`s1`) and a character in the text (`s2`). The arrows point from right to left, suggesting a left-to-right scan of the text string. The rightmost cell of the top row in `s1` is labeled 'end', indicating the end of a successful match. The rightmost cell of the bottom row in `s1` is labeled 'start', indicating the beginning of the pattern matching process.  The rightmost column contains zeros, possibly representing a state or a flag indicating whether a match has been found at that point.  The numbers in the top row and leftmost column represent indices for the characters in the strings.](/assets/images/dsa/dynamicprogramming/d0d980b29b26a292.webp)

Once the DP table is populated, we return `dp[0][0]`, which stores the length of the LCS between the entire first string and the entire second string.

## Implementation

```python
def longest_common_subsequence(s1: str, s2: str) -> int:
    # Base case: Set the last row and last column to 0 by initializing the entire DP
    # table with 0s.
    dp = [[0] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    # Populate the DP table.
    for i in range(len(s1) - 1, -1, -1):
        for j in range(len(s2) - 1, -1, -1):
            # If the characters match, the length of the LCS at 'dp[i][j]' is
            # 1 + the LCS length of the remaining substrings.
            if s1[i] == s2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            # If the characters don't match, the LCS length at 'dp[i][j]' can be found
            # by either:
            # 1. Excluding the current character of s1.
            # 2. Excluding the current character of s2.
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
    return dp[0][0]
```

### Complexity Analysis

**Time complexity:** The time complexity of `longest_common_subsequence` is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ), where m m m and n n n denote the lengths of `s1` and `s2`, respectively. This is because each cell in the DP table is populated once.

**Space complexity:** The space complexity is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) since we're maintaining a 2D DP table that has ( m + 1 ) ( n + 1 ) (m+1)(n+1) ( m + 1 ) ( n + 1 ) elements.

## Optimization

We can optimize our solution by noticing that for each cell in the DP table, we only need to access the cell below it, the cell to its right, and the bottom-right diagonal cell.

![Image represents a 2x2 grid illustrating a dynamic programming (DP) state transition.  The grid is divided into four cells, each representing a subproblem's solution denoted by `dp[i][j]`, `dp[i][j+1]`, `dp[i+1][j]`, and `dp[i+1][j+1]`, where `i` and `j` are indices.  The shaded cells, `dp[i+1][j]` and `dp[i+1][j+1]`, represent solutions to subproblems with incremented indices.  Grey arrows indicate the flow of information, showing that the solution to the current subproblem `dp[i][j]` is derived from the solutions of the subproblems `dp[i][j+1]` and `dp[i+1][j]`.  Specifically, `dp[i][j]` receives input from `dp[i][j+1]` and `dp[i+1][j]`, suggesting a recursive relationship where the optimal solution for `dp[i][j]` depends on the optimal solutions of its neighboring subproblems to the right (`dp[i][j+1]`) and below (`dp[i+1][j]`).  The arrow from `dp[i+1][j+1]` to `dp[i][j]` is less prominent, suggesting a less direct or conditional dependency.](/assets/images/dsa/dynamicprogramming/a4b9ec8188d3e9b9.webp)

- To get the cell below it, we only need access to the row below.
- To get the cell to its right, we just need to look at the cell to the right of the current cell.
- To get the bottom-right diagonal cell, we also only need access to the row below.

Therefore, we only need to maintain two rows:

- `curr_row`: the current row being populated.
- `prev_row`: the row below the current row.

![Image represents a table illustrating a dynamic programming approach, likely for a sequence alignment or similar problem.  The table, labeled 's2' at the top, is a 6x6 matrix with rows labeled 0 through 6 and columns labeled 'a', 'e', 'b', 'a', 'b', and '''.  The rows 1 through 6 represent previous calculations (s1 is mentioned to the left, suggesting a sequence of calculations).  The leftmost column labels rows as 'curr_row' (row 0) and 'prev_row' (row 1), indicating the current and previous rows used in the calculation.  Numerical values populate the cells, representing intermediate results.  Arrows within the table show the flow of information, with upward arrows pointing from row 1 to row 0, indicating that values in row 1 are used to compute values in row 0.  A horizontal arrow points from the last cell of row 0 to the right, with accompanying text explaining that to calculate row 0, only row 1 is needed.  The overall structure suggests a bottom-up computation where each row depends on the previous row, building up to the final result (likely in row 0).](/assets/images/dsa/dynamicprogramming/af2dd5cb278cde18.webp)

This effectively reduces the space complexity to O ( n ) O(n) O ( n ). Below is the optimized code:

```python
def longest_common_subsequence_optimized(s1: str, s2: str) -> int:
    # Initialize 'prev_row' as the DP values of the last row.
    prev_row = [0] * (len(s2) + 1)
    for i in range(len(s1) - 1, -1, -1):
        # Set the last cell of 'curr_row' to 0 to set the base case for
        # this row. This is done by initializing the entire row to 0.
        curr_row = [0] * (len(s2) + 1)
        for j in range(len(s2) - 1, -1, -1):
            # If the characters match, the length of the LCS at
            # 'curr_row[j]' is 1 + the LCS length of the remaining
            # substrings ('prev_row[j + 1]').
            if s1[i] == s2[j]:
                curr_row[j] = 1 + prev_row[j + 1]
            # If the characters don't match, the LCS length at
            # 'curr_row[j]' can be found by either:
            # 1. Excluding the current character of s1 ('prev_row[j]').
            # 2. Excluding the current character of s2
            # ('curr_row[j + 1]').
            else:
                curr_row[j] = max(prev_row[j], curr_row[j + 1])
            # Update 'prev_row' with 'curr_row' values for the next
            # iteration.
        prev_row = curr_row
    return prev_row[0]
```
