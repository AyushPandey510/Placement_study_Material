---
title: "Binary Tree Symmetry"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Binary Tree Symmetry.html"
---
Determine if a binary tree is **vertically symmetric**. That is, the left subtree of the root node is a mirror of the right subtree.

#### Example:

![Image represents a binary tree data structure.  The tree is composed of nodes, represented by circles, each containing a numerical value. The root node, at the top, contains the value '5'.  This root node connects to two child nodes, each containing the value '2'. Each of these '2' nodes further branches into two child nodes: one with the value '1' and another with the value '4'. The '4' nodes then connect to a child node with the value '3'.  The entire structure is mirrored across a dashed vertical line, creating a symmetrical tree.  No URLs or parameters are present. The numbers within the nodes do not appear to represent any specific data other than their position within the tree structure. The dashed line serves as a visual aid to highlight the symmetry of the tree.](/assets/images/dsa/trees/23c2caa8655888fd.webp)

```python
Output: True
```

## Intuition

To check a binary tree's symmetry, we need to assess its left and right subtrees. The first thing to note is that the root node itself doesn’t affect the symmetry of the tree. Therefore, we don't need to consider the root node. We now have the task of comparing two subtrees to check if one vertically mirrors the other.

Consider the root node’s left and right subtrees in the following example:

![Image represents a binary tree data structure.  The topmost node, colored light gray, contains the value '5' and serves as the root of the tree.  From the root, two branches extend downwards, each connecting to a node with the value '2'.  Each of these '2' nodes further branches into two child nodes.  The left '2' node connects to a node with the value '1' and another with the value '4'. The '4' node then connects to a child node with the value '3'.  Similarly, the right '2' node connects to a node with the value '4' and another with the value '1'. The '4' node on the right also connects to a child node with the value '3'. All connections between nodes are represented by lines, with the lines connecting the root node to its children being light gray and the remaining connections being black.  The numbers within each circle represent the data stored in each node of the tree. The structure visually demonstrates a hierarchical relationship between the data elements.](/assets/images/dsa/trees/fe9ecf62b995a6ff.webp)

The key observation here is that **the right subtree is an inverted version of the left subtree**.

We’ve learned from the problem *Invert Binary Tree* that an inversion is performed by swapping the left and right child of every node. This suggests the value of each node's left child in the left subtree should match the value of the right child of the corresponding node in the right subtree, and vice versa.

We can start by using DFS to traverse both subtrees. During this traversal, we compare the left and right children of each node in the left subtree with the right and left children of its corresponding node in the right subtree, respectively.

- If the values of any two nodes being compared are not the same, the tree is not symmetric.
- If, at any point, one of the child nodes being compared is null while the other isn’t, the tree is also not symmetric.

Initially, we see the values of the root nodes of the left and right subtrees are equal:

![Image represents a comparison of two tree structures labeled 'node1' and 'node2', each rooted at a node with value '2'.  'node1' branches into a left child with value '1' and a right child with value '4', which further branches into a child with value '3'. Similarly, 'node2' branches into a left child with value '4' (which further branches into a child with value '3') and a right child with value '1'.  Arrows point from the labels 'node1' and 'node2' to their respective root nodes, indicating the input to a function 'dfs(node1, node2)'.  A separate, light-grey, dashed-bordered box to the right describes the function's first step: '1. check that node1.val == node2.val', indicating a comparison of the root node values of the two input trees.](/assets/images/dsa/trees/b3d8038ef88bad86.webp)

Since they’re equal, proceed by comparing their children through recursive DFS calls. Specifically, make two recursive DFS calls to compare the left child of one node with the right child of the other. This checks that node2’s children contain the same values as node1’s children, but inverted.

![Image represents two binary trees labeled 'node1' and 'node2', each rooted at a node with value '2'.  In 'node1', the left child of the root is '1' and the right child is '4'.  Node '4' has a child '3'. In 'node2', the left child of the root is '4' and the right child is '1'. Node '4' has a child '3'.  Cyan arrows indicate the 'left' and 'right' branches in both trees. Magenta arrows highlight the comparison between the left subtree of 'node1' and the right subtree of 'node2', and vice-versa. Dashed cyan lines connect nodes '1' and '3' from 'node1' to nodes '1' and '3' from 'node2', respectively, labeled 'compare'.  To the right, a gray box describes a check:  '2. check that dfs(node1.left, node2.right) and dfs(node1.right, node2.left) are True,' indicating a depth-first search comparison between the specified subtrees to verify their structural equality.](/assets/images/dsa/trees/e4b4b7d1f9b585c0.webp)

If either DFS call returns false, the subtrees are not symmetric. If both DFS calls return true, the subtrees are symmetric. This process is repeated for the entire tree.

## Implementation

```python
from ds import TreeNode
    
def binary_tree_symmetry(root: TreeNode) -> bool:
    if not root:
        return True
    return compare_trees(root.left, root.right)
    
def compare_trees(node1: TreeNode, node2: TreeNode) -> bool:
    # Base case: if both nodes are null, they're symmetric.
    if not node1 and not node2:
        return True
    # If one node is null and the other isn't, they aren't symmetric.
    if not node1 or not node2:
        return False
    # If the values of the current nodes don't match, trees aren't symmetric.
    if node1.val != node2.val:
        return False
    # Compare the 'node1's left subtree with 'node2's right subtree. If these
    # aren't symmetric, the whole tree is not symmetric.
    if not compare_trees(node1.left, node2.right):
        return False
    # Compare the 'node1's right subtree with 'node2's left subtree.
    return compare_trees(node1.right, node2.left)
```

### Complexity Analysis

**Time complexity:** The time complexity of `binary_tree_symmetry` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because we process each node recursively at most once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.

## Interview Tip

Tip: Cover null cases. Always check for null or empty inputs before using their attributes in a function. In this problem, the main `binary_tree_symmetry` function itself accesses the left and right attributes of the input node, necessitating an initial null check.
