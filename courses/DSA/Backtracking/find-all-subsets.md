---
title: "Find All Subsets"
course: "DSA"
topic: "Backtracking"
source: "/home/ayush/OOD-Design-Principles/DSA/Backtracking/Find All Subsets.html"
---
Return **all possible subsets** of a given set of unique integers. Each subset can be ordered in any way, and the subsets can be returned in any order.

#### Example:

```python
Input: nums = [4, 5, 6]
Output: [[], [4], [4, 5], [4, 5, 6], [4, 6], [5], [5, 6], [6]]
```

## Intuition

The key intuition for solving this problem lies in understanding that each subset is formed by making a specific decision for every number in the input array: **to include the number, or exclude it**. For example, from the array [4, 5, 6], the subset [4, 6] is created by including 4, excluding 5, and including 6.

Let’s have a look at what the state space tree looks like when making this decision for every element.

**State space tree** Consider the input array [4, 5, 6]. Let’s start with the root node of the tree, which is an empty subset:

To figure out how we branch out from here, let’s consider our decision of whether to include or exclude an element. Let’s make this decision with the first element of the input array, 4:

![Image represents a diagram illustrating an inclusive and exclusive range operation.  A central node, labeled `[]`, represents the input range.  From this central node, two lines extend to the left and right. The left line, labeled `incl. 4` in cyan, points to a node labeled `[4]`, indicating that the number 4 is included in the resulting range.  Conversely, the right line, labeled `excl. 4` in orange, points to a node labeled `[]`, signifying that the number 4 is excluded from the resulting range on that side.  The arrows indicate the direction of the range operation, showing how the input range is processed to produce two distinct output ranges based on inclusion or exclusion of the value 4.](/assets/images/dsa/backtracking/8dfc41b605d5919e.webp)

For each of these subsets, we repeat the process, branching out again based on the same choice for the second element: include or exclude it:

![Image represents a binary tree structure illustrating a coding pattern.  The root node, at the top, is represented by `[]`, indicating an empty array or list. This root node branches into two child nodes, also represented by `[]`. Each of these child nodes further branches into two more nodes. The left branches from the root and its child node are labeled `incl.5` in cyan, signifying the inclusion of the number 5.  The right branches are labeled `excl.5` in orange, indicating the exclusion of 5. The leaf nodes at the bottom represent the resulting arrays after applying these inclusion/exclusion operations.  Specifically, the leftmost leaf node shows `[4, 5]`, resulting from including 5 in the initial array `[4]`. The next leaf node is `[4]`, showing the result of excluding 5 from `[4]`. Similarly, on the right side, `[5]` represents including 5 in an initial empty array `[]`, and the final leaf node `[]` shows the result of excluding 5 from an empty array.  The arrows indicate the flow of data and the operations performed at each node.](/assets/images/dsa/backtracking/b11321ad998fa4f0.webp)

Finally, for the third element, we continue branching out for each existing subset based on whether we include or exclude this element:

![Image represents a binary tree illustrating a recursive algorithm, likely demonstrating subset generation or a similar combinatorial problem.  The root node is an empty array `[]`.  This root branches into two nodes: `[4]` and `[]`. Each subsequent node represents a subset.  Each node with a numerical array splits into two child nodes: one where the number 6 is included (`incl. 6` in cyan), and one where it's excluded (`excl. 6` in orange).  This pattern repeats down the tree.  The leaf nodes show the final subsets generated: `[4,5,6]`, `[4,5]`, `[4,6]`, `[4]`, `[5,6]`, `[5]`, `[6]`, and `[]`. The arrows indicate the flow of the algorithm, showing how each subset is derived from its parent by either including or excluding the number 6.](/assets/images/dsa/backtracking/b0ba1a8204887aa8.webp)

One important thing missing from this state space tree is a way to tell which element of the input array we’re making a decision on at each node of the tree. We can use an index, `i`, for this:

![Image represents a recursive tree structure illustrating a coding pattern, likely for generating subsets of a given array.  The left side shows an iterative process, with boxes labeled 'i = 0', 'i = 1', 'i = 2', and 'i = 3' representing iterations, each accompanied by the array `nums` which is initially `[4, 5, 6]` and shrinks with each iteration.  Arrows indicate the progression through the iterations. The main part of the image is a binary tree. Each node represents a subset of `nums`. The top node is an empty array `[]`. Each subsequent level branches into two nodes: one labeled 'incl nums[i]' (in cyan) representing the inclusion of the current element `nums[i]` in the subset, and the other labeled 'excl nums[i]' (in orange) representing its exclusion.  The branches connect nodes, showing how subsets are built recursively by either including or excluding each element.  The leaf nodes at the bottom show all possible subsets of the original array `[4, 5, 6]`, ranging from the empty set `[]` to the full set `[4, 5, 6]`.](/assets/images/dsa/backtracking/546c9008e94ef6bf.webp)

As shown, the final level of the tree (i.e., when `i == n`, where `n` denotes the length of the input array) contains all the subsets of the input array. We can add each of these subsets to our output. To get to these subsets, we need to traverse the tree, and **backtracking** is great for this.

## Implementation

```python
from typing import List
    
def find_all_subsets(nums: List[int]) -> List[List[int]]:
    res = []
    backtrack(0, [], nums, res)
    return res
    
def backtrack(i: int, curr_subset: List[int], nums: List[int], res: List[List[int]]) -> None:
    # Base case: if all elements have been considered, add the current subset to the
    # output.
    if i == len(nums):
        res.append(curr_subset[:])
        return
    # Include the current element and recursively explore all paths that branch from
    # this subset.
    curr_subset.append(nums[i])
    backtrack(i + 1, curr_subset, nums, res)
    # Exclude the current element and recursively explore all paths that branch from
    # this subset.
    curr_subset.pop()
    backtrack(i + 1, curr_subset, nums, res)
```

### Complexity Analysis

**Time complexity:** The time complexity of `find_all_subsets` is O ( n 2 ⋅ n ) O(n^2\cdot n) O ( n 2 ⋅ n ). This is because the state space tree has a depth of n n n and a branching factor of 2 since there are two decisions we make at each state. For each of the 2 n 2n 2 n subsets created, we make a copy of them and add the copy to the output, which takes O ( n ) O(n) O ( n ) time. This results in a total time complexity of O ( n 2 ⋅ n ) O(n^2\cdot n) O ( n 2 ⋅ n ).

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the maximum depth of the recursion tree is n n n. The algorithm also maintains the `curr_subset` data structure, which also contributes O ( n ) O(n) O ( n ) space. Note, the `res` array does not contribute to space complexity.
