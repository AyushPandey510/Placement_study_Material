---
title: "Balanced Binary Tree Validation"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Balanced Binary Tree Validation.html"
---
Determine if a binary tree is **height-balanced**, meaning no node's left subtree and right subtree have a height difference greater than 1.

#### Example:

![Image represents a binary tree structure illustrating an imbalance condition. The main tree consists of nodes labeled 5, 2, 7, 1, 4, 9, 3, and 6, connected by branches to represent parent-child relationships. Node 5 is the root, with node 2 as its left child and node 7 as its right child. Node 2 has children 1 (left) and 4 (right), while node 4 has a child 3. Node 7 has children 9 (right) and 6 (left).  A shaded rectangular area highlights the subtree rooted at node 7. A horizontal arrow points from this highlighted subtree to the text 'imbalanced:', followed by descriptions of the subtree's height imbalance: 'left subtree height = 0' and 'right subtree height = 2', indicating a height difference of 2 between the left and right subtrees of node 7, thus signifying an imbalance in the tree.](/assets/images/dsa/trees/594ec303cf6c87e0.webp)

```python
Output: False
```

## Intuition

For a binary tree to be balanced, all its subtrees would need to be balanced too. This implies that the height difference between the left and right subtrees of each node should be at most 1. A difference greater than 1 indicates a height imbalance.

This suggests we need a way to determine the heights of the left and right subtrees at each node in order to evaluate if the subtree rooting from that node is balanced or not.

A key insight is that **the height of a tree is equal to the depth of its deepest subtree, plus 1,** to include the tree’s root node.

![Image represents a binary tree structure with a root node and three levels.  A rectangular box labeled 'node' points down to the root node, which is a circle connected to two child nodes. One of these child nodes is further connected to two leaf nodes.  Orange brackets labeled '1' and '2' indicate the height of the right and left subtrees respectively.  To the right, a light gray box with dashed borders shows a calculation of the tree's height. The calculation uses the formula `height = 1 + max(left_height, right_height)`, substituting `left_height` as 2 and `right_height` as 1, resulting in a final height of 3.  The formula demonstrates how the height of a binary tree is determined recursively based on the maximum height of its subtrees plus one for the current node.](/assets/images/dsa/trees/91e9bbecf431c6fb.webp)

The above formula reveals a recursive relationship, where we can recursively determine the heights of the left and right subtrees to calculate the height of the current subtree. The **base case** of the recursion would be returning 0 upon encountering a null node, since they have a height of 0.

The diagram below displays the heights returned from the left and right children of each node, and shows how we determine if a subtree is imbalanced. This highlights the recursive process, where values bubble up from the bottom and make their way up to the root node. At each node, we also evaluate whether that node represents a height-balanced subtree. This reveals an imbalance at node 7:

![Image represents a binary tree where nodes are labeled with numbers.  The root node is '5'.  Node '5' has a left child '2' and a right child '7'. Node '2' has a left child '1' and a right child '4'. Node '4' has a left child '3'. Node '7' has a right child '9', which in turn has a right child '6'.  Orange dashed lines and numbers indicate the height of each subtree, with the numbers representing the height.  For example, the subtree rooted at node '2' has a height of 2, and the subtree rooted at node '7' has a height of 2. Node '7' is highlighted in red.  To the right of the tree, the text 'left_height = 0, right_height = 2' indicates the heights of the left and right subtrees of node '5'.  The text 'height difference = 2 > 1 → imbalanced' shows the calculation of the height difference (2 - 0 = 2) and concludes that the tree is imbalanced because the difference is greater than 1. A red arrow points from the height difference calculation to the word 'imbalanced', emphasizing the conclusion.](/assets/images/dsa/trees/79fcd007434d7012.webp)

However, there's a flaw in only returning the subtree’s height at each node: upon detecting node 7 is imbalanced, all we did about this was return its height to its parent node. This consequently means its parent node (node 5) could be mistakenly considered balanced.

An important thing to remember is that **if one subtree is imbalanced, the entire tree is considered imbalanced**. This means node 5 should also be marked as imbalanced. We can fix this by returning -1 upon encountering an imbalanced node, essentially informing parent nodes of this imbalance:

![Image represents a binary tree illustrating an imbalance.  The tree's nodes contain numerical values (1, 2, 3, 4, 5, 6, 7, 9). Nodes 5 and 7 are highlighted in pink, indicating they are key nodes in the imbalance analysis.  Solid lines represent the parent-child relationships within the tree's structure. Dashed orange lines with orange numerical values (1, 2, 3) represent the balance factor of each node, showing the difference in height between the left and right subtrees.  A red arrow points from the node 7 to the word 'imbalanced' (in red text), explicitly labeling the imbalance. The balance factors indicate that the right subtree rooted at node 5 is significantly deeper than its left subtree, causing the imbalance.  Specifically, node 5 has a balance factor of -1 (right subtree is one level deeper), node 2 has a balance factor of 2 (left subtree is two levels deeper), and node 7 has a balance factor of -2 (right subtree is two levels deeper), contributing to the overall imbalance highlighted by the diagram.](/assets/images/dsa/trees/f1e3f2736ee68b2c.webp)

To finalize our answer, we return false if the root node of the binary tree returns -1, and true otherwise.

## Implementation

```python
from ds import TreeNode
    
def balanced_binary_tree_validation(root: TreeNode) -> bool:
    return get_height_imbalance(root) != -1
    
def get_height_imbalance(node: TreeNode) -> int:
    # Base case: if the node is null, its height is 0.
    if not node:
        return 0
    # Recursively get the height of the left and right subtrees. If either subtree
    # is imbalanced, propagate -1 up the tree.
    left_height = get_height_imbalance(node.left)
    right_height = get_height_imbalance(node.right)
    if left_height == -1 or right_height == -1:
        return -1
    # If the current node's subtree is imbalanced (height difference > 1), return -1.
    if abs(left_height - right_height) > 1:
        return -1
    # Return the height of the current subtree.
    return 1 + max(left_height, right_height)
```

### Complexity Analysis

**Time complexity:** The time complexity of `balanced_binary_tree_validation` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because it recursively traverses each node of the tree once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.
