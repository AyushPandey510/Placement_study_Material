---
title: "Implementation Recursive"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Invert Binary Tree.html"
---
**Invert** a binary tree and return its root. When a binary tree is inverted, it becomes the mirror image of itself.

#### Example:

![Image represents a transformation of a binary tree.  The left side shows a tree with a root node labeled '5'. This root node has two children: a left child labeled '1' and a right child labeled '8'. The node labeled '1' has two children: a left child labeled '7' and a right child labeled '6'. The node labeled '8' has a single child labeled '4'. A thick arrow points to the right, indicating a transformation. The right side shows the transformed tree, also with a root node labeled '5'.  Its left child is now '8', and its right child is '1'. The node labeled '8' has a single child labeled '4', and the node labeled '1' has children labeled '6' and '7'.  The transformation essentially swaps the left and right subtrees of the root node, while maintaining the structure and values of the subtrees themselves.](/assets/images/dsa/trees/2600684589809a68.webp)

**Intuition - Recursive**

To invert a binary tree is to essentially "flip" the tree along a vertical axis, as visualized below:

![Image represents a step-by-step illustration of a binary tree's mirroring or flipping operation.  The initial tree (leftmost) is a complete binary tree with nodes numbered 1 through 15, where node 1 is the root, and each node has two children except for the leaf nodes. A dashed vertical line bisects the tree.  The word 'FLIP' with a curved arrow indicates a mirroring operation about this line. The middle tree shows an intermediate stage where the left and right subtrees of the root are being swapped, with nodes 2 and 3 exchanging positions.  The rightmost tree depicts the final result: a mirrored version of the original tree, where the left and right subtrees of each node are swapped, resulting in a tree with the same structure but with nodes 2 and 3, 4 and 5, 6 and 7, etc., reflecting across the original dashed line.  Thick arrows indicate the transformation steps between the three tree structures.  The numbers within parentheses in the middle tree represent the nodes' positions before they are swapped in the final mirrored tree.](/assets/images/dsa/trees/890c21fa3490e652.webp)

To understand how we invert a binary tree algorithmically, let’s focus on how the positions of nodes change after the inversion. For example, pay attention to nodes 8 and 9 in the above tree. After the tree is inverted, we see that they’ve swapped places relative to their parent node:

![Image represents two binary trees before and after a node swap operation.  The left tree shows a root node labeled '1', branching into nodes '2' and '3'. Node '2' further branches into '4' and '5', while '3' branches into '6' and '7'. Node '4' has child nodes '8' (cyan border) and '9' (magenta border). Nodes '5', '6', and '7' each have two child nodes labeled '10' through '15' in ascending order from left to right. A thick black arrow points from the left tree to the right tree. The right tree is identical to the left, except that nodes '8' and '9' (originally children of node '4') have swapped positions.  All nodes are circular, with numbers centrally placed.  The color and thickness of the lines connecting the nodes are consistent within each tree, with the exception of the thicker black lines connecting node '4' to its children in both trees.  The overall transformation highlights a specific node swap within a larger tree structure.](/assets/images/dsa/trees/2f512933d7c9d4aa.webp)

The key observation is that this swap of the left and right child happens to each node in the binary tree during inversion.

It’s also important to note that when a left child node moves to the right, all nodes under it move as well, and the same happens when a right child moves to the left. In other words, we swap the left subtree and the right subtree of each node. This indicates we’re not just swapping the left and right node values, but the nodes themselves.

![The image represents a visual depiction of a node swapping operation within a binary tree structure.  The diagram shows two states of a binary tree.  The initial state displays a root node (represented by a circle) connected to two triangular subtrees labeled 'left subtree' (light blue) and 'right subtree' (light purple).  A rectangular box labeled 'node' points to the root node with an arrow, indicating the node being considered.  The second state shows the result of swapping the left and right subtrees.  The 'left subtree' from the initial state is now the 'right subtree,' and vice-versa.  A horizontal arrow connects the two states, labeled 'swap node.left and node.right,' explicitly describing the operation performed.  Both states maintain the same root node, illustrating the in-place nature of the subtree swap.](/assets/images/dsa/trees/30dfb3b51e198e54.webp)

Therefore, to invert a binary tree, we **swap the left and right children of every node**. Now, let’s explore a tree traversal algorithm that allows us to do this.

**Depth-first search** Our strategy is to visit every node in the binary tree and swap its left and right children. There’s no particular order in which we need to visit the nodes. This means we can employ any tree traversal algorithm, as long as every node is visited.

Let’s tackle this problem recursively using DFS. After swapping the left and right children of the root node, we recursively call our invert function on the left and right children to invert their subtrees as well.

## Implementation - Recursive

```python
from ds import TreeNode
    
def invert_binary_tree_recursive(root: TreeNode) -> TreeNode:
    # Base case: If the node is null, there's nothing to invert.
    if not root:
        return None
    # Swap the left and right subtrees of the current node.
    root.left, root.right = root.right, root.left
    # Recursively invert the left and right subtrees.
    invert_binary_tree_recursive(root.left)
    invert_binary_tree_recursive(root.right)
    return root
```

### Complexity Analysis

**Time complexity:** The time complexity of `invert_binary_tree_recursive` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because the algorithm traverses each node of the binary tree exactly once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.

## Intuition - Iterative

As a starting point, we can try developing an iterative DFS solution by using the recursive DFS solution as a reference. In the recursive solution, each time a call is made to the left or right child, it’s added to a recursive call stack.

Ultimately, the recursive call stack is a **stack**, which means we can use a stack to mimic the recursive approach. Let's try using a stack on the following tree. Start by adding the root node to the stack:

![Image represents a binary tree traversal algorithm visualized using a tree structure and a stack.  The tree's root node, highlighted with an orange border, contains the value '5'. This node branches into two child nodes: a left child node with the value '1' and a right child node with the value '8'. The node with value '1' further branches into two leaf nodes with values '7' and '6'. Similarly, the node with value '8' branches into a leaf node with the value '4'.  To the right of the tree, a stack is depicted as a container labeled 'stack,' currently holding only one element—a node with an orange border containing the value '5'. This suggests a depth-first search (DFS) traversal, likely a pre-order traversal, where the root node ('5') is processed first and then pushed onto the stack. The diagram illustrates a snapshot during the traversal process, showing the current state of the tree and the stack.](/assets/images/dsa/trees/99e13e5a6f48b41a.webp)

The top of the stack contains the root node, node 5. Let’s pop it off so we can swap its left and right subtrees:

![Image represents a binary tree undergoing a swap operation, visualized alongside a stack data structure.  A binary tree with root node 5 (highlighted in orange) has left subtree (1, 7, 6) and right subtree (8, 4). A curved, gray arrow labeled 'swap' indicates an intended exchange between nodes 1 and 8. To the right, a stack is depicted, containing only node 5 (also orange) at this stage. A red arrow points from the stack to the text 'node = stack.pop', indicating that node 5 is popped from the stack.  A gray, dashed-line box below contains the instruction 'swap node.left and node.right', describing the operation to be performed on the popped node (5) within the tree, implying that its left and right subtrees will be exchanged.  A separate orange box labeled 'node' points to the root node 5, showing the initial assignment of the node variable.](/assets/images/dsa/trees/1ace105d0197000a.webp)

After the swap, let’s add node 5’s left and right children to the stack so their subtrees can be inverted in future iterations:

![Image represents a binary tree traversal algorithm using a stack.  The left side shows a binary tree with node '5' (highlighted in orange) as the root.  Node '5' connects to nodes '8' and '1'. Node '8' further connects to nodes '4' and '7', while node '1' connects to nodes '7' and '6'.  All nodes contain numerical values.  The right side depicts a stack labeled 'stack,' initially empty.  Two cyan arrows indicate the flow of information: one labeled 'push node.right' points from the right child of the currently processed node (initially '5') to the stack, pushing the value '1' onto the stack; the other labeled 'push node.left' points from the left child ('8') to the stack, pushing '8' onto the stack.  The stack's top element is '1', and below it is '8', illustrating a depth-first traversal (likely post-order) where right subtrees are processed before left subtrees.  A rectangular box labeled 'node' with an orange border points to the root node '5', indicating the starting point of the traversal.](/assets/images/dsa/trees/4bcaad8940b73ba5.webp)

The node at the top of the stack is now node 1, which we should pop off to swap its left and right subtrees and add its children to the stack:

![Image represents a binary tree undergoing a transformation, likely part of a tree traversal or restructuring algorithm.  The left side shows a binary tree with nodes labeled 5, 8, 1, 4, 7, and 6. Node 1 is highlighted in orange, indicating it's the current focus. A horizontal orange arrow labeled 'node' points from node 8 to node 1, suggesting a data flow or operation involving this node.  The right side depicts a stack, a data structure, with nodes 8 and 1 inside.  A red horizontal line crosses node 1 in the stack, indicating it's being accessed. A red arrow points from the stack's top (node 1) to the text 'node = stack.pop', showing that node 1 is being popped from the stack and assigned to the variable 'node'. A gray dashed box contains the instruction 'swap node.left and node.right', indicating that the left and right children of the node (obtained from the stack) will be swapped.  A small curved arrow under nodes 7 and 6 on the left indicates a swap operation has occurred or will occur between these nodes. The overall diagram illustrates a step-by-step process involving a stack and a binary tree, where nodes are popped from the stack and their children are swapped.](/assets/images/dsa/trees/75de8ac2492f4a72.webp)

![Image represents a visualization of a tree traversal algorithm, likely a depth-first search (DFS) using a stack.  The left side shows a binary tree with nodes labeled 5, 8, 1, 4, 6, and 7.  Node 1 is highlighted in orange, indicating the current node being processed.  A directed orange arrow points from node 8 (labeled 'node') to node 1, showing the traversal direction. Node 5 is the root node, connecting to nodes 8 and 1. Node 8 connects to nodes 4 and 1. Node 1 connects to nodes 6 and 7. The right side depicts a stack labeled 'stack,' containing nodes 7, 6, and 8.  Light blue arrows labeled 'push node.right' and 'push node.left' indicate that the right and left children of the current node (node 1 in this case) are being pushed onto the stack.  The order of nodes in the stack suggests that the algorithm is processing the right subtree before the left subtree, a common characteristic of DFS.](/assets/images/dsa/trees/e52afeab4b96bbd1.webp)

We repeat the above process of iteratively swapping left and right subtrees until the stack is empty, indicating that all nodes have been processed.

```python
from ds import TreeNode
    
def invert_binary_tree_iterative(root: TreeNode) -> TreeNode:
    if not root:
        return None
    stack = [root]
    while stack:
        node = stack.pop()
        # Swap the left and right subtrees of the current node.
        node.left, node.right = node.right, node.left
        # Push the left and right subtrees onto the stack.
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
    return root
```

**Time complexity:** The time complexity of `invert_binary_tree_iterative` is O ( n ) O(n) O ( n ) because it processes each node in the binary tree exactly once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.

## Interview Tip

*Tip: Use a stack to convert a recursive solution to an iterative one.* A common follow-up an interviewer may ask is to solve a problem iteratively rather than recursively. This approach is particularly useful when the tree’s height can be large, and we want to avoid potential stack overflow errors. For example, this could happen in Python, where the maximum recursion depth is set to 1000 by default. It's useful to understand that a stack can often be used to transform recursive solutions into iterative ones.
