---
title: "Introduction To Trees"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Introduction to Trees.html"
---
## Intuition

A tree is a hierarchical data structure composed of nodes, where each node connects to one or more child nodes. Each node in a tree contains the data it stores (`val`) and references to its child nodes. The most common type of tree is a **binary tree**, in which each node connects to up to two children: a left child and a right child.

![Image represents a simple binary tree data structure, showing a single parent node labeled 'node' containing a value 'val,' and two child nodes, also labeled 'val,' connected to the parent.  The parent node is connected to its left child node, labeled 'node.left,' and its right child node, labeled 'node.right,' via downward-pointing arrows indicating a hierarchical relationship.  Each node contains a value, represented by 'val,' suggesting that the tree stores data within its nodes. The structure visually demonstrates the fundamental concept of a binary tree where each node can have at most two children, a left child and a right child.](/assets/images/dsa/trees/4ba349123328cdaa.webp)

Below is the implementation of the TreeNode class:

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
```

**Terminology:**

- Parent: a node with one or more children.
- Child: a node that has a parent.
- Subtree: a tree formed by a node and its descendants.
- Path: a single, continuous sequence of nodes connected by edges.
- Depth: the number of edges from the root to a given node.

**Attributes of a tree:**

- Root: the topmost node of the tree and the only node without a parent.
- Intermediate node: a node with a parent node and at least one child.
- Leaf: a node with no children.
- Edge: the connection between two nodes. Trees usually have directed edges, meaning the edges only point from parent to child.
- Height: the length of the longest path from the root to a leaf.1

![Image represents a diagram illustrating tree data structures and their properties.  The left side shows a tree with root node 4,  a peach-colored fill highlighting the path from node 2 to node 6.  Dashed light-blue lines indicate the depth of each level (depth 0 for node 4, depth 1 for nodes 2 and 5, and depth 2 for nodes 1, 6, and 7).  The text 'height = 3' indicates the tree's height. The right side displays a similar tree with root node 4, but this time, the focus is on identifying the root node's left and right subtrees.  The left subtree, rooted at node 2, and the right subtree, rooted at node 5, are highlighted with peach-colored fills.  Nodes 1, 6, and 7 are labeled as 'leaf nodes' with a dashed light-blue line encompassing them.  A small tree at the top shows a parent node (1) connected to two child nodes (2 and 3) with a solid line representing the 'edge' between them.  The 'parent' and 'edge' labels are in light-blue, while 'child nodes', 'root', 'intermediate nodes', 'root node's left subtree', and 'root node's right subtree' are in orange.  The node numbers are all within circles, with the root nodes (4) in gray and leaf nodes (1, 6, 7) in peach.](/assets/images/dsa/trees/c275405a87a49cd3.webp)

In the following discussions, we primarily focus on binary trees.

## Tree Traversals

**Depth-first search (DFS)** DFS is a method for exploring all nodes of a tree by starting at the root and moving as far down a branch as possible, before backtracking to explore other branches.

![Image represents a diagram illustrating Depth-First Search (DFS) traversal of a binary tree.  The tree consists of a root node labeled '4', with two child nodes labeled '2' and '5'. Node '2' further branches into nodes '1' and '3', while node '5' branches into nodes '6' and '7'.  The arrows depict the traversal order:  orange arrows indicate the forward progression of the DFS algorithm, showing the path taken down the tree, while grey arrows represent the backtracking steps when a branch is fully explored.  The algorithm starts at node '4', proceeds down the left subtree to '2', then to '1', backtracks to '2', proceeds to '3', backtracks to '2', then backtracks to '4', proceeds to the right subtree to '5', then to '6', backtracks to '5', proceeds to '7', and finally backtracks to '5' and then to '4', completing the traversal.  The label 'DFS:' precedes the diagram, clearly indicating the algorithm being visualized.](/assets/images/dsa/trees/492082ad950c139e.webp)

DFS is typically implemented recursively, following a structure similar to the code snippet below:

```python
def dfs(node: TreeNode):
    if node is None:
        return
    process(node)       # Process the current node.
    dfs(node.left)      # Traverse the left subtree.
    dfs(node.right)     # Traverse the right subtree.
```

The above recursive implementation follows the order of preorder traversal. Two other common DFS traversal techniques include inorder traversal and postorder traversal. Here’s how they differ:

DFS has many use cases and is the most common choice for tree traversal.

- Preorder traversal is the most common type of DFS traversal. It’s also used when we need to process the root node of each subtree before its children.
- Inorder traversal is used when we want to process the nodes of a tree from left to right.
- Postorder traversal is the least frequently used traversal method, but is important when each node’s subtrees must be processed before their root.

The problems in this chapter explore the use cases of DFS in more detail, providing practical examples of when and how to apply these traversal methods.

**Breadth-first search (BFS)** BFS traverses the nodes of a tree level by level. It processes the nodes at the present level before moving on to nodes at the next depth level.

![Image represents a Breadth-First Search (BFS) traversal of a tree-like graph.  The graph consists of seven nodes, numbered 1 through 7, connected by edges. Node 4 sits at the top, acting as the root.  Node 4 connects to nodes 2 and 5. Node 2 connects to nodes 1 and 3, while node 5 connects to nodes 6 and 7.  The orange arrows indicate the order of traversal in a BFS algorithm, starting from node 4 and proceeding level by level.  The traversal sequence is 4, then 2 and 5, followed by 1, 3, 6, and finally 7.  Each node is represented by a circle containing its numerical label. The text 'BFS:' precedes the graph, clearly indicating the algorithm being illustrated.](/assets/images/dsa/trees/bf3de6b01e59ee54.webp)

BFS is typically implemented iteratively using a queue, and the reason for this will become clear as we explore the problems in this chapter. The basic structure of BFS is reflected in the following code snippet:

```python
def bfs(root: TreeNode):
    if root is None:
        return
    queue = deque([root])
    while queue:
        node = queue.popleft()
        process(node)  # Process the current node.
        if node.left:
            queue.append(node.left)  # Add the left child to the queue.
        if node.right:
            queue.append(node.right)  # Add the right child to the queue.
```

BFS is commonly used to find the shortest path to a specific destination in a tree, or to process the tree level by level. When it’s important to know the specific level of each node during traversal, we use a variant of BFS called level-order traversal, which is discussed in detail in this chapter.

**Complexity breakdown** Below, n n n denotes the number of nodes in the tree, and h h h denotes the height of the tree.

## Real-world Example

**File systems:** In many operating systems, the file system is organized as a hierarchical tree structure. The root directory is the root of the tree, and every file or folder in the system is a node. Folders can have subfolders or files as child nodes, and this structure allows for efficient organization, navigation, and retrieval of files. When you browse through folders on a computer, you're essentially navigating a tree structure.

## Chapter Outline

![Image represents a hierarchical diagram illustrating coding patterns related to trees.  A rounded rectangle at the top labeled 'Trees' acts as the root, branching down via dotted lines to two child rectangles. The left child rectangle is labeled 'DFS' (Depth-First Search) and lists several tree-related problems solvable using DFS: 'Invert Binary Tree,' 'Balanced Binary Tree Validation,' 'Binary Search Tree Validation,' 'Lowest Common Ancestor,' 'Build Binary Tree From Preorder and Inorder Traversals,' 'Maximum Sum of a Continuous Path in a Binary Tree,' 'Binary Tree Symmetry,' and 'Kth Smallest Number in a Binary Search Tree,' and 'Serialize and Deserialize a Binary Tree.' The right child rectangle is labeled 'BFS' (Breadth-First Search) and contains problems suitable for BFS: 'Rightmost Nodes of a Binary Tree,' 'Widest Binary Tree Level,' and 'Binary Tree Columns.'  Each problem within the DFS and BFS rectangles is presented as a bulleted list item, indicating a collection of tasks associated with each search strategy.  The overall structure shows how different tree traversal algorithms (DFS and BFS) can be applied to solve various coding problems involving trees.](/assets/images/dsa/trees/2ffb11eb97b4a8b9.webp)

Note that some of the problems listed under DFS can be solved using BFS or other traversal algorithms, too. The same applies to the problems under BFS.

## Footnotes

1. Some sources may define the height of a tree differently. In this book, we use a definition that makes designing recursive algorithms more intuitive. Here, the height of a tree with just one node is considered 1. ↩
