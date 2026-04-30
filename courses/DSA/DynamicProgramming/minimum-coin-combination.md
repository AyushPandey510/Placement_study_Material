---
title: "Intuition Top Down"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/Minimum Coin Combination.html"
---
You are given an array of coin values and a target amount of money. Return the **minimum number of coins** needed to total the target amount. If this isn't possible, return ‐1. You may assume there's an unlimited supply of each coin.

#### Example 1:

```python
Input: coins = [1, 2, 3], target = 5
Output: 2
```

Explanation: Use one 2-dollar coin and one 3-dollar coin to make 5 dollars.

#### Example 2:

```python
Input: coins = [2, 4], target = 5
Output: -1
```

## Intuition - Top-Down

In this problem, there’s no restriction on the number of coins we can use, which makes a brute force approach that tries every possible coin combination impossible, due to the infinite number of possible combinations. This indicates the need for a more efficient method.

Consider the example below:

![Image represents a simple input for a coding problem, likely related to searching or summing within an array.  The input consists of two parts presented linearly. The first part is an integer array represented by `[1 2 3]`, enclosed in square brackets, with the integers 1, 2, and 3 separated by spaces. This array is followed by a comma and a space, separating it from the second part. The second part specifies a target value, denoted by `target = 5`, indicating that the algorithm should search for, or use, the value 5 in relation to the array. There are no URLs or parameters present; the image solely displays the input data.  The arrangement suggests that the array `[1 2 3]` and the target value `5` are independent inputs to a function or algorithm.](/assets/images/dsa/dynamicprogramming/36c0630b66890546.webp)

If we use a 3-dollar coin from the array, then we’ll only need 2 dollars more to make 5. This gives us a new target: find the fewest number of coins needed to make 2 dollars:

![Image represents a simple data flow diagram illustrating a change in a parameter.  The diagram begins with the word 'use' positioned above a downward-pointing arrow, indicating the input or application of a parameter.  The arrow points to the input data: an array `[1 2 3]` and a parameter labeled `target = 5`. A solid arrow then connects this input to a new state, where the array remains the same, `[1 2 3]`, but the `target` parameter has changed to `target = 2`.  The diagram visually depicts a process where the array remains constant, while the `target` parameter is modified from 5 to 2, suggesting a change in the input or a transformation within a system.](/assets/images/dsa/dynamicprogramming/0de3bc9937720585.webp)

This indicates we’ve identified subproblems within the main problem, where **each subproblem requires finding the fewest number of coins needed to make a smaller target**.

Each coin we use creates a new subproblem. For example, using a 1-dollar coin changes our target from 5 to 4 dollars. Let's visualize how these smaller targets, representing new subproblems, are created after using each coin:

![Image represents a tree-like diagram illustrating a decomposition process.  At the top is a central node labeled 'target = 5,' representing an initial target value.  Three downward-pointing lines, labeled 'use 1,' 'use 2,' and 'use 3' in orange text, connect this central node to three leaf nodes at the bottom. Each leaf node represents a sub-target value resulting from the decomposition: 'target = 4' on the left, 'target = 3' in the center (directly below the central node), and 'target = 2' on the right. The arrows indicate the flow of information, showing how the initial target value of 5 is broken down into three smaller target values (4, 3, and 2) through three different uses or processes.](/assets/images/dsa/dynamicprogramming/f2521c41be6cb6a9.webp)

In extension, each of these subproblems can be solved by breaking them down into further subproblems:

![Image represents a decision tree illustrating a recursive algorithm, possibly for finding a solution where a target value is reached by repeatedly subtracting values. The root node displays 'target = 5,' indicating the initial target value.  From this root, three branches descend, labeled 'use 1,' 'use 2,' and 'use 3,' representing three possible subtractions or actions. Each branch leads to a node showing the updated target value after the corresponding action (e.g., 'target = 4' after 'use 1' from the root). This branching pattern continues recursively down to the leaf nodes.  Leaf nodes display either a green checkmark (✓) indicating a successful solution (target value reaches 0), a red cross (✗) indicating failure (target value becomes negative), or dashed upward-pointing arrows (↑↑↑↑) representing further recursive calls that haven't been fully visualized in the diagram.  The numbers next to 'use' likely represent the values subtracted at each step. The overall structure visualizes the exploration of different solution paths in a recursive search.](/assets/images/dsa/dynamicprogramming/f6bf6934f3fac252.webp)

A path that ends with a target of 0 means the coins used in that path add up to 5. If the target becomes negative, it means the path is invalid, so we should stop extending the path.

We’ve observed how new subproblems are created, but haven’t yet addressed how to attain the solutions to them. Remember, each subproblem needs to return the minimum number of coins needed to reach its target.

Consider the main problem with a target of 5. To solve this, we first need to find the minimum number of coins needed to reach each of its three subproblems. The solution to the main problem is the smallest result among these subproblems, plus 1, to account for the coin used to create the subproblem. This highlights an **optimal substructure** in the problem, allowing us to define the following **recurrence relation**:

`min_coin_combination(target) = 1 + min(min_coin_combination(target - coin_i) | coin_i ∈ coins)`

**Base case** Naturally, we need a base case for this formula. The base case occurs when the target equals 0, which is the simplest version of this problem, as no coins are needed to meet the target. In this case, we return 0.

**Memoization** An important thing to notice is that we might end up solving the same subproblem multiple times. For instance, we calculate the subproblem `target = 3` two times in the previous example:

![Image represents a decision tree illustrating a search algorithm, possibly for finding a specific target value.  The root node displays 'target = 5'.  Three branches descend from it, labeled 'use 1,' 'use 2,' and 'use 3,' each leading to a node representing a reduced target value (4, 3, and 2 respectively). This process recursively continues; each node with a target value greater than zero branches into three sub-nodes, each representing a further reduction of the target value using one of the three 'use' options.  The leaf nodes show the final target value reached after applying the 'use' operations.  These leaf nodes are marked with a green checkmark if the target value reaches zero, indicating success, and a red cross if the target value becomes negative, indicating failure.  Dashed lines point upwards from the leaf nodes to their parent nodes, suggesting a backtracking or exploration mechanism.  The light blue background highlights nodes where the target value is 3, possibly indicating a significant step or intermediate result in the algorithm.](/assets/images/dsa/dynamicprogramming/d9115b186b6cc406.webp)

This highlights the existence of **overlapping subproblems**. Memoization improves our solution by storing the solutions to subproblems as they are computed, ensuring each subproblem is solved only once. This eliminates redundant calculations, and can significantly reduce the size of the recursion tree:

## Implementation - Top-Down**

```python
def min_coin_combination_top_down(coins: List[int], target: int) -> int:
    res = top_down_dp(coins, target, {})
    return -1 if res == float('inf') else res
    
def top_down_dp(coins: List[int], target: int, memo: Dict[int, int]) -> int:
    # Base case: if the target is 0, then 0 coins are needed to reach it.
    if target == 0:
        return 0
    if target in memo:
        return memo[target]
    # Initialize 'min_coins' to a large number.
    min_coins = float('inf')
    for coin in coins:
        # Avoid negative targets.
        if coin <= target:
            # Calculate the minimum number of coins needed if we use the current coin.
            min_coins = min(min_coins, 1 + top_down_dp(coins, target - coin, memo))
    memo[target] = min_coins
    return memo[target]
```

### Complexity Analysis

**Time complexity:**

- Without memoization, the time complexity of min_coin_combination_top_down would be O ( n t a r g e t / m ) O(n^{target/m}) O ( n t a r g e t / m ) , where n n n denotes the number of coins, and m m m denotes the smallest coin value. The recursion tree has a branch factor of n n n because we make a recursive call for up to n n n coins. The depth of the tree is t a r g e t / m target/m t a r g e t / m because in the worst case, we continually reduce the target value by the smallest coin.
- With memoization, each subproblem is solved only once. Since there are at most t a r g e t target t a r g e t subproblems, and we iterate through all n n n coins for each subproblem, the time complexity is O ( t a r g e t ⋅ n ) O(target\cdot n) O ( t a r g e t ⋅ n ) .

**Space complexity:** The space complexity is O ( t a r g e t ) O(target) O ( t a r g e t ) because, while the maximum depth of the recursive call stack is only t a r g e t / m target/m t a r g e t / m, the memoization array stores up to t a r g e t target t a r g e t key-value pairs.

## Intuition - Bottom-Up

Using the same technique discussed in the *Climbing Stairs* problem, we can convert our top-down solution to a bottom-up one by translating the memoization array to a DP array.

First, let’s look at the value our memoization array stores, as shown in the following code snippet of the top-down implementation:

```python
for coin in coins:
    if coin <= target:
        min_coins = min(min_coins, 1 + top_down_dp(coins, target - coin, memo))
memo[target] = min_coins
```

Translating this to a DP array provides the following code:

```python
for coin in coins:
    if coin <= target:
        dp[target] = min(dp[target], 1 + dp[target - coin])
```

This code snippet only includes the calculation for one target value. In our top-down solution, this calculation is repeated for every target value from the initial target, down to the base case (`target == 0`).

In the bottom-up solution, we need to reverse this order by starting with the base case and working our way up to the initial target value (hence the name “bottom-up”). This is necessary because our DP array calculation depends on the DP values of smaller targets. So, we need to calculate the answers for smaller targets first. This can be done using a for-loop from 1 to the target (starting at 1 since the base case of 0 is already set):

```python
for t in range(1, target + 1):
    for coin in coins:
        if coin <= t:
            dp[t] = min(dp[t], 1 + dp[t - coin])
```

Once this is done, the answer to the problem will be stored in `dp[target]`.

## Implementation - Bottom-Up**

```python
def min_coin_combination_bottom_up(coins: List[int], target: int) -> int:
    # The DP array will store the minimum number of coins needed for each amount. Set
    # each element to a large number initially.
    dp = [float('inf')] * (target + 1)
    # Base case: if the target is 0, then 0 coins are needed.
    dp[0] = 0
    # Update the DP array for all target amounts greater than 0.
    for t in range(1, target + 1):
        for coin in coins:
            if coin <= t:
                dp[t] = min(dp[t], 1 + dp[t - coin])
    return dp[target] if dp[target] != float('inf') else -1
```

**Time complexity:** The time complexity of `min_coin_combination_bottom_up` is O ( t a r g e t n ) O(targetn) O ( t a r g e t n ) because we loop through all n n n coins for each value between 1 and t a r g e t target t a r g e t.

**Space complexity:** The space complexity is O ( t a r g e t ) O(target) O ( t a r g e t ) due to the space occupied by the DP array, which is of size t a r g e t + 1 target+1 t a r g e t + 1.

## Interview Tip

*Tip: When a problem asks for the minimum or maximum of something, it might be a DP problem.* If you spot keywords like "minimum", "maximum", "longest", or "shortest", in the problem description, consider whether a DP approach might be appropriate, as many DP problems involve optimizing a certain value, such as finding the *minimum* cost, or *longest* sequence.
