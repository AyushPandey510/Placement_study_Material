---
title: "Lowest Common Ancestor"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Lowest Common Ancestor.html"
---
Return the lowest common ancestor (LCA) of two nodes, `p` and `q`, in a binary tree. The LCA is defined as the **lowest node that has both p and q as descendants**. A node can be considered an ancestor of itself.

#### Example:

![Image represents a binary tree structure where nodes are represented by circles containing numerical labels (1 through 9). Node 1 is the root node, branching into nodes 2 and 3. Node 2 further branches into nodes 4 and 5. Node 3 branches into nodes 6 and 7. Node 6 further branches into nodes 8 and 9.  Node 3 is highlighted in orange and labeled 'LCA' (Least Common Ancestor) in orange text above it, indicating its significance in the context of finding the LCA within the tree.  Additionally, node 8 is labeled with a 'p' in cyan, and node 7 is labeled with a 'q' in cyan, suggesting these nodes ('p' and 'q') are the target nodes for which the LCA (node 3) is being identified.  The lines connecting the nodes represent parent-child relationships within the tree hierarchy.](/assets/images/dsa/trees/90fdf3f2932d8647.webp)

#### Constraints:

- The tree contains at least two nodes.
- All node values are unique.
- p and q represent different nodes in the tree.

## Intuition

One strategy to solve this problem is to traverse each node in the tree and evaluate whether the current node at any point is the LCA of p and q. To make this evaluation, it’s crucial to know the conditions a node needs to meet to be the LCA.

Let’s start by discussing where p or q would need to be for the current node to be at least an ancestor of both.

**Identifying when the current node is an ancestor of p and q** Consider the following binary tree. Let's explore where p and q would need to be for node 3 to be an ancestor.

![Image represents a binary tree structure where nodes are represented by circles containing numerical labels (1 through 9).  Node 1 is the root, branching into node 2 on the left and node 3 (highlighted in orange) on the right. Node 2 further branches into nodes 4 and 5. Node 3 branches into nodes 6 and 7. Node 6 further branches into nodes 8 and 9. A rectangular box labeled 'node' points to node 3 with an arrow, indicating a focus on this node.  The text 'ancestor of p and q?' is positioned near node 3, suggesting a question about finding the common ancestor of two nodes (p and q, not explicitly shown in the diagram) within the tree structure.  The overall structure illustrates a hierarchical relationship between the nodes, with each node (except the leaves) having zero, one, or two child nodes.](/assets/images/dsa/trees/8b3c0f1aeec084ed.webp)

Node 3 is only an ancestor of p and q when both nodes are in node 3’s subtree. If they were anywhere else, they would not be descendants of node 3.

![Image represents a binary tree structure illustrating an ancestor concept. The tree's root node is labeled '1'.  Node '1' branches into node '2' on the left and node '3' on the right. Node '2' further branches into nodes '4' and '5'. Node '3' branches into nodes '6' and '7'. Node '6' further branches into nodes '8' and '9'.  A light peach-colored fill highlights the subtree rooted at node '3'. A rectangular box labeled 'node' points with an arrow to node '3'.  Accompanying text explains that node '3' is considered an ancestor if both nodes 'p' and 'q' (not explicitly shown in the tree but implied to be within the tree) reside within the highlighted subtree (the subtree rooted at node 3).](/assets/images/dsa/trees/d5ef0999a5745434.webp)

Now, let’s examine the conditions in which a node is the *lowest* common ancestor of p and q.

**Identifying when the current node is the LCA of p and q** Let’s identify where in the subtree p and q should be to qualify node 3 as the *lowest* ancestor of them both.

![Image represents three binary tree diagrams illustrating the possible locations of nodes 'p' and 'q' given that node '3' is their lowest common ancestor (LCA).  Each diagram shows a root node '3' labeled 'LCA' in orange text, branching into nodes '6' and '7'. Node '6' further branches into nodes '8' and '9'.  The first diagram highlights nodes '8' and '9' with peach-colored fill, indicating 'p' is in the right subtree of '3' and 'q' is in the left subtree. The second diagram highlights node '8' with peach-colored fill and node '3' with peach-colored fill, showing 'p' in the left subtree of '3' and 'q' at node '3'. The third diagram highlights node '7' with peach-colored fill and node '9' with peach-colored fill, indicating 'p' at node '3' and 'q' in the right subtree of '3'.  Above the diagrams, text describes each scenario:  'If node 3 is the LCA, where are p and q?'.  The text to the right of each diagram specifies the location of 'p' and 'q' for that particular scenario.](/assets/images/dsa/trees/f97447411c1f46df.webp)

As we can see above, there are three possible cases where node 3 is the LCA. This is because in each case, there isn’t a node lower than node 3 that contains both p and q as descendants, making node 3 the LCA.

Note that if both p and q were in just one of node 3’s subtrees (e.g., the left subtree), node 3 would not be the LCA because there would be a node lower in the left subtree that’s an ancestor of both p and q:

![Image represents a binary tree illustrating the concept of the Lowest Common Ancestor (LCA).  The tree shows node 3 as the root, with a left subtree containing nodes 6, 8, and 9, and a right subtree containing node 7.  Nodes 8 and 9 are labeled 'p' and 'q' respectively in cyan, indicating these are the nodes for which the LCA is being sought. The subtree containing nodes 6, 8, and 9 is highlighted with a peach-colored background, explicitly identifying it as the relevant portion for finding the LCA of 'p' and 'q'.  The text 'LCA' in orange is positioned above the highlighted subtree to emphasize its role. A curved arrow points from node 6 to node 3, with the text 'NOT the LCA' indicating that node 6 is not the lowest common ancestor of nodes 8 and 9.  The diagram visually demonstrates that node 6 is a common ancestor, but node 3 is the lowest common ancestor of nodes 8 and 9 in this specific tree structure.](/assets/images/dsa/trees/c6aef82c87483265.webp)

What can we derive from these observations? In the three cases where the current node is the LCA, **p and q were found in exactly two of the following three locations**:

- The current node itself.
- The current node’s left subtree.
- The current node’s right subtree.

This indicates that by traversing the tree and checking if p and q are present in two of these locations for each node, we can effectively identify the LCA.

**Depth-first search** Recursive DFS is well-suited for traversal in this problem, as it enables us to recursively check each node’s left and right subtrees to determine if they contain p or q.

In the implementation, we can assess the existence of p and q in the three locations previously mentioned, by attaining the following three boolean variables at each node:

- `node_is_p_or_q = (node == p or node == q)`
- `left_contains_p_or_q = dfs(node.left)`
- `right_contains_p_or_q = dfs(node.right)`

Again, two of these variables need to be true for the current node to be the LCA.

Return statement Whenever we make a recursive DFS call, such as `dfs(node.left)`, we expect that call to return true if the subtree rooting from `node.left` contains p or q. This means the return statement of our DFS function should return true if either p or q exists anywhere in the current subtree.

To do this, we **return true if any of the above three variables are true**, as this would indicate either p or q is somewhere in the current subtree.

The diagram below shows how the boolean values returned from each node's left and right subtrees help to identify the LCA:

![Image represents a binary tree structure illustrating a coding pattern, possibly related to finding the Lowest Common Ancestor (LCA).  The tree's root node is labeled '1'.  A solid black line connects node '1' to node '2' (left branch) and node '3' (right branch). Node '2' has children '4' and '5', while node '3' has children '6' and '7'. Node '6' further branches into nodes '8' and '9'.  Dashed lines with directional arrows indicate boolean values (True/False) associated with each branch. Red dashed lines represent 'False', and green dashed lines represent 'True'.  The values are positioned to suggest a traversal or comparison process. Node '3' is highlighted in orange, and an orange arrow points to it, labeled 'LCA', suggesting it's identified as the lowest common ancestor. Node '7' is highlighted in red and labeled 'q' in cyan, possibly indicating a specific node of interest.  Node '8' is labeled 'p' in cyan, similarly suggesting a specific node. The overall structure and labeling suggest a process of traversing the tree based on boolean conditions to identify a specific node or relationship between nodes.](/assets/images/dsa/trees/14d9c62bf5bd4d4b.webp)

## Implementation

Note, this implementation uses a global variable because it leads to a more readable solution. However, it's important to confirm with your interviewer that global variables are acceptable. If not, you may need to adjust the solution to avoid using them, such as passing the variable as an argument, or finding an alternative approach.

```python
from ds import TreeNode
    
def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    dfs(root, p, q)
    return lca
    
def dfs(node: TreeNode, p: TreeNode, q: TreeNode) -> bool:
    global lca
    # Base case: a null node is neither p nor q.
    if not node:
        return False
    node_is_p_or_q = node == p or node == q
    # Recursively determine if the left and right subtrees contain 'p' or 'q'.
    left_contains_p_or_q = dfs(node.left, p, q)
    right_contains_p_or_q = dfs(node.right, p, q)
    # If two of the above three variables are true, the current node is the LCA.
    if node_is_p_or_q + left_contains_p_or_q + right_contains_p_or_q == 2:
        lca = node
    # Return true if the current subtree contains 'p' or 'q'.
    return node_is_p_or_q or left_contains_p_or_q or right_contains_p_or_q
```

### Complexity Analysis

**Time complexity:** The time complexity of `lowest_common_ancestor` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because the algorithm traverses each node of the tree once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.
