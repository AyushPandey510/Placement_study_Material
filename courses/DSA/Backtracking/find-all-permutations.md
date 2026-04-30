---
title: "Find All Permutations"
course: "DSA"
topic: "Backtracking"
source: "/home/ayush/OOD-Design-Principles/DSA/Backtracking/Find All Permutations.html"
---
Return **all possible permutations** of a given array of unique integers. They can be returned in any order.

#### Example:

```python
Input: nums = [4, 5, 6]
Output: [[4, 5, 6], [4, 6, 5], [5, 4, 6], [5, 6, 4], [6, 4, 5], [6, 5, 4]]
```

## Intuition

Our task in this problem is quite straightforward: find all permutations of a given array. The key word here is "all". To achieve this, we need an algorithm that generates each possible permutation one at a time. The technique that naturally fits this requirement is **backtracking**. As with any backtracking solution, it's useful to first visualize the state space tree.

**State space tree** Let's figure out how to build just one permutation. Consider the array [4, 5, 6]. We can start by picking one number from this array for the first position of this permutation. For the second position, let's pick a different number. We can keep adding numbers like this until all the numbers from the array are used. To avoid reusing numbers, let's also keep track of the used numbers using a hash set.

![Image represents a tree-like diagram illustrating a recursive algorithm, likely for generating permutations.  The top row shows three initial states, each represented as '[], used = {}', indicating an empty permutation list and an empty set of used numbers.  The input `nums = [4 5 6]` is defined at the top.  From each initial state, a number is chosen (indicated by 'choose 4', 'choose 5', 'choose 6' in peach-colored boxes), represented by a downward-pointing arrow.  This chosen number is appended to the permutation list, and added to the `used` set.  The next level shows the updated state, for example '[4], used = {4}'. This process repeats recursively; each node represents a state with a partially built permutation and a set of used numbers.  The arrows depict the flow of the algorithm, branching out as each number is chosen.  The final state, '[4,5,6], used = {4,5,6}', is reached in the bottom-right branch, resulting in the message 'one permutation found!' in green, indicating a successful permutation generation.  The diagram visually demonstrates the backtracking nature of the algorithm, as each branch explores a different permutation possibility.](/assets/images/dsa/backtracking/a0f1faa0cfbb6b15.webp)

Now that we've found one permutation, let's *backtrack* to find others. Start by removing the most recently added number, 6, bringing us back to [4, 5]:

![Image represents a directed acyclic graph illustrating a backtracking algorithm, likely for a problem involving selecting elements from a set.  The graph shows a sequence of states, each represented by a node labeled with a list `[]` indicating the selected elements and a set `{ }` labeled `used` showing the elements already considered.  The top node `[], used = {}` represents the initial state with no elements selected.  An arrow points downwards to `[4], used = {4}`, indicating that element 4 has been selected.  Another downward arrow connects this to `[4,5], used = {4,5}`, showing that element 5 has subsequently been selected.  A final downward arrow leads to `[4,5,6]`, suggesting element 6 was added.  A light-blue box labeled 'backtrack: remove 6' and an upward arrow connects `[4,5,6]` to `[4,5]`, demonstrating a backtracking step where element 6 is removed to explore alternative solutions.  The graph visually depicts the exploration of different combinations by adding and removing elements, a common characteristic of backtracking algorithms.](/assets/images/dsa/backtracking/ae9f5bf892638e9f.webp)

Are there any other numbers we can append to [4, 5]? Well, 6 is the only option at this point, which we already explored. So, let's backtrack again by removing 5, bringing us back to [4]:

![Image represents a state diagram illustrating a backtracking algorithm, likely for a problem involving selecting elements from a set.  The diagram shows a directed acyclic graph with nodes representing states and edges representing transitions. Each node is labeled with a list (representing a subset of elements selected so far) and a set named 'used' indicating which elements are already included in the subset.  The top node, '[ ], used = {}', represents the initial state with no elements selected.  A downward arrow connects this to '[4], used = {4}', indicating the selection of element 4.  Another downward arrow leads to '[4, 5]', showing the subsequent selection of element 5. A further downward arrow connects to '[4, 5, 6]', suggesting the addition of element 6.  Crucially, a light-blue box labeled 'backtrack: remove 5' and an upward arrow connects '[4, 5]' to '[4], used = {4}', demonstrating a backtracking step where element 5 is removed to explore alternative selections.  The arrows indicate the flow of the algorithm, showing how it explores different combinations by adding and removing elements.](/assets/images/dsa/backtracking/7a89ea7c97c7b987.webp)

Are there any numbers other than 5 we can add to [4] at this point? Yes, we can use 6, so let's add it and continue searching:

![Image represents a state-transition diagram illustrating a backtracking algorithm, likely for finding combinations or permutations.  The diagram shows a tree-like structure where each node represents a state defined by a list (in square brackets) representing a partially built combination and a set (within curly braces) labeled 'used' tracking the elements already included. The root node is `[], used = {}`, indicating an empty initial combination and no used elements.  A downward arrow signifies the addition of an element to the combination.  From the root, a black arrow points to `[4], used = {4}`, showing the selection of element 4.  From this node, two downward arrows branch to `[4,5]` and `[4,6], used = {4,6}`, representing the addition of 5 and 6 respectively, updating the 'used' set. A light-blue upward arrow connects `[4,5]` to `[4,5,6]`, suggesting a further addition of 6 (though this branch isn't fully explored).  A rectangular box labeled 'choose 6' highlights the decision point where 6 is considered for addition to the combination. The overall structure demonstrates the exploration of different combinations by adding elements and backtracking when necessary, as indicated by the upward arrows.](/assets/images/dsa/backtracking/ad1ccef20d11a6f6.webp)

The only number we can use at this point is 5, so let’s add it to [4, 6], giving us another permutation:

![Image represents a tree-like diagram illustrating a backtracking algorithm for generating permutations.  The root node is `[], used = {}`, indicating an empty initial set and an empty set of used numbers.  A downward-pointing arrow connects this to the node `[4], used = {4}`, showing the selection of 4 as the first element.  From this node, two branches extend downwards, representing the choices for the second element: `[4,5]` and `[4,6]`, with `used = {4,6}` indicating that 4 and 6 have been used.  A light-blue upward-pointing arrow connects `[4,5]` to `[4,5,6]`, showing the addition of 6 as the third element.  Similarly, a downward-pointing arrow from `[4,6]` leads to `[4,6,5]`.  The text 'choose 5' highlights the selection of 5 in the lower branch.  Finally, `[4,5,6]` and `[4,6,5]` represent complete permutations, with `used = {4,6,5}` indicating all used numbers, and the text 'found another permutation!' confirms the successful generation of a permutation.  The diagram visually demonstrates the recursive exploration of possibilities and the backtracking process when a choice leads to a dead end.](/assets/images/dsa/backtracking/69431c1696be9ccd.webp)

Following this backtracking process until we’ve explored all branches allows us to generate all permutations:

![Image represents a tree-like structure illustrating the permutations of the set {4, 5, 6}. The root node, at the top, is an empty set represented by `[]`.  From this root, three branches descend, each representing a single element from the set: [4], [5], and [6]. Each of these nodes then branches further, adding one more element from the remaining set. For example, [4] branches into [4, 5] and [4, 6], representing the two possible ways to add one element from {5, 6} to the set {4}. This pattern continues until the bottom level, where each leaf node represents a complete permutation of the original set {4, 5, 6}, shown as ordered lists within square brackets: [4, 5, 6], [4, 6, 5], [5, 4, 6], [5, 6, 4], [6, 4, 5], and [6, 5, 4].  Arrows indicate the flow of information, showing how each permutation is built up sequentially from the root node.](/assets/images/dsa/backtracking/2389c449a7b74255.webp)

Every time we reach a permutation (i.e., when the permutation we’re building reaches a size of n, where n denotes the length of the input array), add it to our output.

**Traversing the state space tree** Generating all permutations can be achieved by traversing the state space tree.

Starting from the root node, we can traverse this tree using backtracking:

1. Pick an unused number and add it to the current permutation candidate. Mark this number as used by adding it to the used hash set.
2. Make a recursive call with this updated permutation candidate to explore its branches.
3. Backtrack: remove the last number we added to the current candidate array, and the used hash set.

Whenever a permutation candidate reaches the length of n, add it to our output.

## Implementation

```python
from typing import List, Set
    
def find_all_permutations(nums: List[int]) -> List[List[int]]:
    res = []
    backtrack(nums, [], set(), res)
    return res
    
def backtrack(nums: List[int], candidate: List[int], used: Set[int], res: List[List[int]]) -> None:
    # If the current candidate is a complete permutation, add it to the result.
    if len(candidate) == len(nums):
        res.append(candidate[:])
        return
    for num in nums:
        if num not in used:
            # Add 'num' to the current permutation and mark it as used.
            candidate.append(num)
            used.add(num)
            # Recursively explore all branches using the updated permutation
            # candidate.
            backtrack(nums, candidate, used, res)
            # Backtrack by reversing the changes made.
            candidate.pop()
            used.remove(num)
```

### Complexity Analysis

**Time complexity:** The time complexity of `find_all_permutations` is O ( n ⋅ n ! ) O(n\cdot n!) O ( n ⋅ n !). Here’s why:

- Starting from the root, we recursively explore n n n candidates.
- For each of these n n n candidates, we explore n − 1 n - 1 n − 1 more candidates, then n − 2 n - 2 n − 2 more candidates, etc, until we have explored all permutations. This results in a total of n ⋅ ( n − 1 ) ⋅ ( n − 2 ) … 1 = n ! n\cdot (n-1)\cdot (n-2)…1=n! n ⋅ ( n − 1 ) ⋅ ( n − 2 ) … 1 = n ! permutations.
- For each of the n ! n! n ! permutations, we make a copy of it and add it to the output, which takes O ( n ) O(n) O ( n ) time.

This results in a total time complexity of O ( n ! ) ⋅ O ( n ) = O ( n ⋅ n ! ) O(n!)\cdot O(n)=O(n\cdot n!) O ( n !) ⋅ O ( n ) = O ( n ⋅ n !).

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the maximum depth of the recursion tree is n n n. The algorithm also maintains the `candidate` and `used` data structures, both of which also contribute O ( n ) O(n) O ( n ) space. Note, the `res` array does not contribute to space complexity.
