---
title: "The Josephus Problem"
course: "DSA"
topic: "MathAndGeometry"
source: "/home/ayush/OOD-Design-Principles/DSA/MathAndGeometry/The Josephus Problem.html"
---
There are `n` people standing in a circle, numbered from `0` to `n - 1`. Starting from person 0, count `k` people clockwise and remove the `kth` person. After the removal, begin counting again from the next person still in the circle. Repeat this process until only one person remains, and return that person's position.

#### Example:

![Image represents a step-by-step process demonstrating a coding pattern, possibly related to data structure manipulation or algorithm execution.  The process begins with a set of five nodes (circles) labeled 0, 1, 2, 3, and 4, arranged somewhat arbitrarily.  Small numbers (1 and 2) are positioned near some nodes, potentially representing weights, priorities, or indices.  A node labeled '1' is crossed out with a gray 'X', indicating its removal or inactivation.  A rightward arrow indicates a transition to the next step.  In subsequent steps, the crossed-out node is removed, and other nodes (initially 3 and 2) become grayed out, suggesting they are also processed or removed in later stages.  The process continues with further graying out and removal of nodes, showing a sequence of transformations on the initial node arrangement.  The final state shows only nodes 0 and 2 remaining, with the other nodes grayed out and crossed out, implying a filtering or reduction process.  The numbers near the nodes likely track changes or maintain some form of ordering or identification throughout the process.](/assets/images/dsa/mathandgeometry/537b1e1092b87487.webp)

```python
Input: n = 5, k = 2
Output: 2
```

#### Constraints:

- There will be at least one person in the circle
- `k` will at least be equal to 1.

## Intuition

The naive approach to solving this problem is to simulate the removal of people step by step. We can create a circular linked list with n nodes. Starting from node 0, we iterate through the linked list, removing every kth person. The last node remaining after all removals will represent the last remaining person.

This approach takes O ( n ⋅ k ) O(n\cdot k) O ( n ⋅ k ) time because, to remove a node, we must iterate through k k k nodes in the linked list. Therefore, for each of the n n n nodes, we perform k k k iterations. Let's see if we can find a faster solution.

Consider an example where `n = 12` and `k = 4`. For the first removal, we start counting `k` nodes from node 0 and remove the person we end up on after counting.

![Image represents a circular arrangement of twelve numbered nodes (0 through 11) representing 'n people', with a central text label 'n people'.  An orange arrow labeled 'start' points downwards to node 0. A red curved arrow originates from node 0, passes over nodes 1 and 2, and terminates at node 3, which is marked with a red 'X' indicating its removal.  The red arrow is labeled 'k = 4', suggesting a process where every fourth person (starting from 0) is eliminated.  The numbers within the circles represent the positions of individuals in a circular arrangement, and the process depicted simulates a 'Josephus problem' type elimination.](/assets/images/dsa/mathandgeometry/563e384828f439be.webp)

![Image represents a circular arrangement of twelve numbered circles (0 through 11) representing individuals, positioned around a central area.  The numbers are sequentially placed around the circle, starting with 0 at the top and proceeding clockwise.  The central area contains the text 'n - 1 people', indicating the number of people involved in a process, excluding one. An orange arrow points downwards from the text 'new start' to the circle labeled '4', signifying that the process begins anew with the individual represented by the number 4.  This suggests a cyclical or iterative process where the starting point shifts after each iteration, potentially involving the elimination or selection of individuals in a circular fashion.](/assets/images/dsa/mathandgeometry/fb76a241c5a255d9.webp)

As we can see, after the first removal, there is one less person in the circle. Additionally, after the removal, our new start position is at the kth position (person 4).

Now, we effectively need to find the last person remaining in a circle of `n - 1` people, where we start counting at person `k`. This indicates that solving the **subproblem** `josephus(n - 1, k)` will help us get the answer to the problem `josephus(n, k)`. Note that the answer to subproblem `josephus(i, k)` represents the last person standing in a circle of `i` people, where we start counting at person 0.

To account for the adjusted start position, we need to add `k` to the answer returned by `josephus(n - 1, k)`. This is because, in this subproblem, it won’t know to start counting from position 4: it will, by default, count from position 0. So, adding `k` to this subproblem’s result accounts for this difference in the starting position.

This can be expressed with the following recurrence relation:

`josephus(n, k) = josephus(n - 1, k) + k`

The final consideration is ensuring the value of `josephus(n - 1, k) + k` doesn’t exceed `n - 1`, as this represents the position of the last person. We can achieve this by applying the modulus operator (`% n`) to `josephus(n - 1, k) + k`. This results in the following updated recurrence relation:

`josephus(n, k) = (josephus(n - 1, k) + k) % n`

Now, all we need is a base case.

**Base case** The simplest version of this problem is when the circle contains only one person: `n = 1`. In this case, the last person remaining is person 0, so we just return person 0 for this base case.

## Implementation

```python
def josephus(n: int, k: int) -> int:
    # Base case: If there's only one person, the last person is person 0.
    if n == 1:
        return 0
    # Calculate the position of the last person remaining in the reduced problem
    # with 'n - 1' people. We use modulo 'n' to ensure the answer doesn't exceed
    # 'n - 1'.
    return (josephus(n - 1, k) + k) % n
```

### Complexity Analysis

**Time complexity:** The time complexity of josephus is O ( n ) O(n) O ( n ) because we make a total of n n n recursive calls to this function until we reach the base case.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the recursive call stack, which grows up to a depth of n n n.

## Optimization

We can implement the top-down recursive solution above using a bottom-up iterative approach. Let `res` represent an array that stores the solution to each subproblem, where `res[i]` contains the solution to the subproblem of an `i`-person circle. Using this array, our formula becomes:

`res[i] = (res[i - 1] + k) % i`

The key observation here is that we only ever need access to the previous element of the `res` array (at `i - 1`) to calculate the result of the current subproblem (at `i`). This means we don’t need to store the entire array.

Instead, we can use a single variable to keep track of the solution to the previous subproblem. We can then update this variable to store the solution for the current subproblem:

`res = (res + k) % i`

Note that the 'res' value used on the right-hand side of the equation represents the previous subproblem’s result.

```python
def josephus_optimized(n: int, k: int) -> int:
    res = 0
    for i in range(2, n + 1):
        # res[i] = (res[i - 1] + k) % i.
        res = (res + k) % i
    return res
```

**Time complexity:** The time complexity of `josephus_optimized` is O ( n ) O(n) O ( n ) because we iterate through n n n subproblems.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
