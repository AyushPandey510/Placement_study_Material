---
title: "Binary Search Tree Validation"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Binary Search Tree Validation
.html"
---
Verify whether a binary tree is a **valid binary search tree** (BST). A BST is a binary tree where each node meets the following criteria:

- A node's left subtree contains only nodes of lower values than the node's value.
- A node's right subtree contains only nodes of greater values than the node's value.

#### Example:

![Image represents a binary tree structure where nodes are represented by circles containing numerical values.  The root node, at the top, contains the number '5'.  This root node connects to two child nodes: '2' on the left and '7' on the right. Node '2' further branches into two leaf nodes: '1' on the left and '6' on the right. Similarly, node '7' branches into leaf nodes '7' on the left and '9' on the right.  Crucially, curved red arrows labeled 'invalid' point from node '2' to node '6' and from node '7' to the other node '7', indicating that these connections or the data within these nodes are considered invalid within the context of the tree's structure or the algorithm it represents.  The overall structure visually depicts a hierarchical data organization with highlighted invalid elements.](/assets/images/dsa/trees/5d94ce3cb6065599.webp)

```python
Output: False
```

Explanation: This tree has two violations of the BST criteria:

- Node 5's left subtree contains node 6, and node 6's value is greater than 5.
- Node 7 has a left child with the same value of 7.

## Intuition

A BST maintains a logically sorted order of values by complying with the criteria specified in the problem description. That is, the left subtree of a node with value x must consist of values less than x, and its right subtree must consist of values strictly greater than x.

![Image represents a binary search tree structure illustrating the property of a node's value ('x', enclosed in a circle) in relation to its subtrees.  A central node 'x' is connected by two downward-pointing branches to two triangular shapes representing the left and right subtrees. The left subtree, colored light blue, is labeled 'left subtree' and text outside the triangle states 'all left subtree values'.  The right subtree, colored light purple, is labeled 'right subtree' with accompanying text 'all right subtree values'.  The branches connecting 'x' to the subtrees are labeled with '<', indicating that all values within the left subtree are less than 'x', and all values within the right subtree are greater than 'x'.  The overall arrangement visually demonstrates the ordering principle inherent in a binary search tree.](/assets/images/dsa/trees/feccf0072a162475.webp)

In addition, all nodes in the left and right subtrees of the above diagram must follow these criteria, too.

Since evaluating subtrees is important in determining if a tree is a BST, let’s try a recursive DFS approach to solve this problem.

Consider this example:

![The image represents a binary tree data structure.  A rectangular box labeled 'node' with a light gray fill points to a central circular node containing the number '5'. This node '5' acts as the root of the tree.  From node '5', two branches extend downwards, each connecting to another circular node. The left branch connects to node '2', which further branches into nodes '1' and '6'. The right branch from node '5' connects to node '7', which in turn branches into nodes '7' and '9'.  All nodes are represented by circles containing a single integer value. The lines connecting the nodes represent parent-child relationships within the tree structure, illustrating a hierarchical arrangement of data.  No URLs or parameters are present.](/assets/images/dsa/trees/4efd7117f6bfe7a0.webp)

There’s nothing to assess at the root node because it can contain any value. So, let’s have a look at its children. Here’s how we assess these nodes based on the BST rules:

- All nodes to the left of node 5 should be less than 5. So, when we make a recursive call to its left child, we pass in an upper bound of 5.
- All nodes to the right of node 5 should be greater than 5. So, when we make a recursive call to its right child, we pass in a lower bound of 5.

![Image represents a binary search tree with a root node labeled '5'.  The root node has two child nodes: a left child node labeled '2' and a right child node labeled '7'.  The node labeled '2' further branches into two leaf nodes labeled '1' and '6'. Similarly, the node labeled '7' branches into two leaf nodes labeled '7' and '9'.  Dashed grey arrows connect the root node to its left and right subtrees, indicating a function call `is_within_bounds`.  To the left of the tree, the function call `is_within_bounds(node.left, lower_bound = -∞, upper_bound = 5)` is shown, specifying that the left subtree is checked for values within the range of negative infinity to 5.  Conversely, to the right of the tree, the function call `is_within_bounds(node.right, lower_bound = 5, upper_bound = +∞)` indicates that the right subtree is checked for values within the range of 5 to positive infinity.  The entire diagram illustrates a binary search tree structure and the application of a bounds-checking function on its subtrees.](/assets/images/dsa/trees/519bd3da7515936b.webp)

Let’s now consider node 2. It satisfies its specified lower and upper bounds of - and 5, respectively. So, let’s verify its subtrees. Applying the same logic as before, node 2’s left child should have an upper bound of 2, while its right child should have a lower bound of 2.

![Image represents a binary tree structure illustrating a 'is_within_bounds' function.  The tree has a root node labeled '5' in light gray, connected by light gray lines to two child nodes: '2' (dark gray) and '7' (light gray). Node '2' is further connected by dark gray lines to child nodes '1' and '6'. Node '7' connects to child nodes '7' and '9' (both light gray).  Dashed lines connect node '2' to nodes '1' and '6', suggesting a conditional or iterative process.  Textual descriptions accompany the connections to node '2', specifying the function `is_within_bounds` with parameters `node.left` (for the connection to '1'), `lower_bound = -∞`, and `upper_bound = 2`; and `node.right` (for the connection to '6'), `lower_bound = 2`, and `upper_bound = 5`.  This suggests the function checks if a node's value falls within a specified range, with different ranges applied to the left and right subtrees of node '2'. The light gray nodes and connections likely represent a different part of the algorithm or data structure, possibly a separate branch or a result of the function's execution.](/assets/images/dsa/trees/1cea5c13fc0231e3.webp)

Above, we see that node 6 violates its expected upper bound of 5 (since 6 > 5). This violation indicates we’re dealing with an invalid binary tree. Note, node 6 has an upper bound of 5 because it’s a left descendant of node 5.

We now have a strategy for our DFS function, `is_within_bounds(node, lower_bound, upper_bound)`:

1. Check if the node.val falls between lower_bound and upper_bound . If it does, continue to the next step. If not, the tree is an invalid BST: return false.
2. Call is_within_bounds on the left child with an updated upper bound set to the current node’s value: is_within_bounds(node.left, lower_bound , node.val ) .
3. Call is_within_bounds on the right child with an updated lower bound set to the current node’s value: is_within_bounds(node.right, node.val , upper_bound ) .
4. If both recursive calls return true, then the current node’s subtree is a valid BST: return true.

A minor optimization to make here is to check if the value we get from the recursive call at step 2 is false. If it’s false, we don’t have to perform step 3 and can just return false straight away, as we already know this tree isn’t a BST.

## Implementation

```python
from ds import TreeNode
    
def binary_search_tree_validation(root: TreeNode) -> bool:
    # Start validation at the root node. The root node can contain any value, so set
    # the initial lower and upper bounds to -infinity and +infinity, respectively.
    return is_within_bounds(root, float('-inf'), float('inf'))
    
def is_within_bounds(node: TreeNode, lower_bound: int, upper_bound: int) -> bool:
    # Base case: if the node is null, it satisfies the BST condition.
    if not node:
        return True
    # If the current node's value is not within the valid bounds, this tree is not a
    # valid BST.
    if not lower_bound < node.val < upper_bound:
        return False
    # If the left subtree isn't a BST, this tree isn't a BST.
    if not is_within_bounds(node.left, lower_bound, node.val):
        return False
    # Otherwise, return true if the right subtree is also a BST.
    return is_within_bounds(node.right, node.val, upper_bound)
```

### Complexity Analysis

**Time complexity:** The time complexity of `binary_search_tree_validation` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because we process each node recursively at most once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.

## Detailed Recursive Demonstration

You may be curious why recursion works for problems like this. When we make a recursive DFS call in the middle of the code, how is the program able to return to this code and continue running the rest of it, after this recursive call finishes? This problem provides an excellent opportunity to demonstrate how this is possible.

The answer is that recursion makes use of a **recursive call stack** to manage each instance of a recursive function call. To illustrate this, we'll revisit the binary tree example discussed earlier, stepping through the recursive calls for the first few nodes. We'll also display the recursive call stack to help track the state of each call more clearly.

The first DFS call is made to the root node, which is given a lower and upper bound of -`∞` and +`∞`, respectively:

![Image represents a binary tree on the left and a depiction of a recursive call stack on the right. The tree's root node is labeled '5', with left child '2' and right child '7'. Node '2' has children '1' and '6', while node '7' has children '7' and '9'.  A gray box labeled 'node' points to the root node '5' indicating the starting point of a process. An orange arrow points from the tree to a beige rectangle representing the recursive call stack, which contains the function call `is_within_bounds(5, -∞, +∞)`. This function call takes the value '5' (from the root node) and positive and negative infinity as upper and lower bounds respectively. Below the call stack, a dashed-line box shows the condition `lower_bound < 5 < upper_bound`, with `-∞` and `+∞` representing the lower and upper bounds.  The diagram illustrates how a recursive function might process a tree structure, with each node's value being passed to the `is_within_bounds` function during the recursive calls.](/assets/images/dsa/trees/f41be8d45ed4cd4f.webp)

We see that node 5 satisfies its specified lower and upper bounds.

At each node, after we confirm that its value falls within its expected lower and upper bounds, we make a recursive call to its left child before any right children are processed:

![Image represents a binary tree on the left and a representation of a recursive call stack on the right. The binary tree consists of nodes numbered 1, 2, 5, 6, 7, 7, and 9. Node 5 is the root, with node 2 as its left child and node 7 as its right child. Node 2 has children 1 and 6, while node 7 has children 7 and 9. A dashed grey arrow indicates a traversal from node 5 to node 2. A rectangular box next to node 2 labels it as 'node'.  An orange arrow points from the tree to a rounded-corner rectangle labeled 'recursive call stack,' which contains two lines. The first line shows `is_within_bounds(2, -∞, 5)`, indicating a function call with the node value 2, a lower bound of negative infinity, and an upper bound of 5. The second line shows `is_within_bounds(5, -∞, +∞)`, representing another function call with node value 5, negative infinity as the lower bound, and positive infinity as the upper bound. Below the stack, a dashed-line box displays the condition `lower_bound < 2 < upper_bound`, with (-∞) and (5) representing the lower and upper bounds respectively, illustrating the bounds check within the recursive function.](/assets/images/dsa/trees/9d4e4eaade1833cb.webp)

![Image represents a binary tree on the left and a recursive call stack with a condition on the right. The binary tree has nodes labeled 1, 2, 5, 6, 7, 7, and 9. Node 5 is the root, with node 2 as its left child and node 7 as its right child. Node 2 has children 1 and 6, while node 7 has children 7 and 9. A dashed grey arrow points from a box labeled 'node' to node 1, indicating a potential traversal or selection of this node.  On the right, a rounded rectangle represents the recursive call stack, showing three function calls to `is_within_bounds`. Each call includes a node number (1, 2, and 5 respectively) and lower and upper bounds (-∞, 2), (-∞, 5), and (-∞, +∞) respectively.  A separate dashed rectangle displays the condition `lower_bound < 1 < upper_bound`, with (-∞) and (2) representing the initial lower and upper bounds, suggesting a range check within the function. An orange arrow points from the tree to the call stack, implying that the tree traversal triggers the recursive calls.](/assets/images/dsa/trees/88d18d1657626fe3.webp)

![Image represents a binary tree on the left and a recursive call stack on the right, illustrating a depth-first traversal. The tree's root node is labeled '5', branching into nodes '2' and '7'. Node '2' further branches into nodes '1' and '6'. Node '7' branches into nodes '7' and '9'. A dashed arrow indicates the traversal starts at node '1'. A solid arrow points from a box labeled 'node' to node '2', suggesting data flow.  The right side depicts a recursive call stack showing function calls of `is_within_bounds`. Each call shows the node being processed (circled numbers 1, 2, and 5) and the lower and upper bounds being checked (∞ represents infinity). The stack shows the order of function calls during the traversal, with the most recent call (`is_within_bounds(2, -∞, 5)`) at the top, indicating a depth-first approach.  The topmost call in the stack is greyed out, suggesting it's the next function call to be processed.](/assets/images/dsa/trees/a8d3d0d1a3bbe5aa.webp)

Continuing from where we left off at this instance, it now processes its right child by making a recursive call to it:

![Image represents a binary tree on the left and a recursive call stack with a validation check on the right. The binary tree has a root node labeled '5'.  Node '5' has two children: '2' and '7'. Node '2' has children '1' and '6', with node '6' shaded gray, indicating it's currently being processed. Node '7' has children '7' and '9'. A dashed arrow and a box labeled 'node' point to node '6', highlighting its selection.  An orange arrow points from the tree to a rectangular box labeled 'recursive call stack,' which lists three function calls: `is_within_bounds(6, 2, 5)`, `is_within_bounds(2, -∞, 5)`, and `is_within_bounds(5, -∞, +∞)`.  The numbers in parentheses represent the node value being checked, the lower bound, and the upper bound, respectively. Below the call stack is another box showing a validation check: `lower_bound < 6 < upper_bound`, with '(2)' under `lower_bound`, '6' in the middle, and '(5)' under `upper_bound`. The inequality `6 < 5` is marked as 'invalid' in red, indicating that the value 6 is outside the specified bounds (2 and 5).  The overall diagram illustrates a recursive function (`is_within_bounds`) traversing a binary tree and checking if node values fall within predefined bounds.](/assets/images/dsa/trees/afe31ec8a927221e.webp)

Once we reach node 6, the algorithm notices that its value violates its expected upper bound. As such, it returns false.

In this DFS solution, the recursion starts at the root node, but values start being returned from the leaf nodes and bubble upwards to their parent nodes. Below is a diagram showing how the boolean result at each node moves up from the leaf nodes to the root:

![Image represents a binary decision tree illustrating a search algorithm, likely for a value within a range.  The root node contains the value '5' and the condition '-∞<5<+∞', indicating a check for whether the target value is within the entire range.  From the root, two branches extend. The left branch leads to node '2' with the condition '-∞<2<5', and the right branch leads to node '7' with the condition '5<7<+∞'.  Each node represents a comparison;  green dashed arrows indicate a 'True' outcome (the condition is met), and red dashed arrows indicate a 'False' outcome.  Nodes '1' ('-∞<1<2') and '6' ('2<6|5', labeled 'invalid') are children of node '2', while nodes '7' ('5<7|7', labeled 'invalid') and '9' ('7<9<+∞') are children of node '7.  The 'invalid' labels suggest that the algorithm handles these conditions as errors or out-of-range values.  The final red dashed arrow from node '5' points to the text 'return False', indicating that if neither the left nor right branch yields a 'True' result, the algorithm returns 'False', signifying that the target value was not found within the defined ranges.](/assets/images/dsa/trees/7d8e5a323a116c27.webp)

Note that nodes 5, 2, and 7 return false because, while their values fall within their bounds, at least one node in their subtrees does not.
