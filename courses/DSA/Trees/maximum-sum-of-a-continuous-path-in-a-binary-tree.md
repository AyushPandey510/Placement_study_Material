---
title: "Maximum Sum Of A Continuous Path In A Binary Tree"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Maximum Sum of a Continuous Path in a Binary Tree.html"
---
Return the **maximum sum of a continuous path** in a binary tree. A path is defined by the following characteristics:

- Consists of a sequence of nodes that can begin and end at any node in the tree.
- Each consecutive pair of nodes in the sequence is connected by an edge.
- The path must be a **single continuous sequence** of nodes that doesn't split into multiple paths.

#### Example:

![Image represents a binary tree structure where nodes contain numerical values.  The root node, at the top, is labeled '5'.  This root node branches into two child nodes: '-10' on the left and '8' on the right. The '-10' node further branches into '1' and '-7', which in turn branch into '11' and '-1' respectively. The '8' node branches into '9' and '7'. The '7' node further branches into '6' and '-3'.  A peach-colored highlight encompasses the nodes '8', '9', '7', '6', and '-3'. To the right of this highlighted section, a calculation is shown: 'sum = 9 + 8 + 7 + 6 = 30', indicating a summation of the values within the highlighted subtree.  The entire diagram illustrates a tree data structure and a specific calculation performed on a subset of its nodes.](/assets/images/dsa/trees/3e6fb5cd0d20d1f5.webp)

```python
Output: 30
```

#### Constraints:

- The tree contains at least one node.

## Intuition

Let’s first understand what a path is in a binary tree. An important thing to note is that all paths have a root node. Consider the following binary tree:

![Image represents a binary tree data structure.  The root node, at the top, contains the value '5'.  This root node connects to two child nodes: a left child node with the value '-10' and a right child node with the value '8'.  The left child node ('-10') further branches into two child nodes: a left child with the value '1' and a right child with the value '-7'. The '1' node has a single left child node with the value '11'. The '-7' node has a single left child node with the value '-1'. The right child node ('8') also branches into two child nodes: a left child with the value '9' and a right child with the value '7'. The '7' node has two child nodes: a left child with the value '6' and a right child with the value '-3'.  All nodes are represented as circles containing their respective integer values. The connections between nodes represent parent-child relationships within the tree structure, indicating hierarchical organization of the data.](/assets/images/dsa/trees/11e250d2040e2f93.webp)

Every path that exists in this tree has a corresponding root node, as shown in the three examples below:

![Image represents four binary trees, each illustrating a different stage in identifying a root-to-leaf path.  The top-left tree is a complete binary tree with root node '5', branching into '-10' and '8'.  '-10' further branches into '1' and '-7', with '1' having a child node '11' and '-7' having '-1'. '8' branches into '9' and '7', with '7' having children '6' and '-3'.  A peach-colored highlight indicates a path from the root to a leaf node, starting at node '8' in this instance, with an orange arrow labeled 'root of path' pointing to it. The bottom-left tree shows the same structure, but the highlighted path originates at '-10'. The top-right and bottom-right trees are identical to the left-side trees, but the highlighted paths are different, illustrating different possible root-to-leaf paths within the same tree structure.  Each highlighted path visually emphasizes a specific sequence of nodes from the root to a leaf node in the binary tree.](/assets/images/dsa/trees/ae9954c0350a538e.webp)

Inversely, this means that every node in the tree is the root of some path(s). For example, node 7 in the tree below is the root of four paths. The largest sum rooting from node 7 is 13:

![Image represents two binary trees illustrating a tree traversal algorithm, likely for finding a subset of nodes that sums to a target value.  Both trees have a root node labeled '5'.  Each root node branches to two child nodes:  the left branch connects to a node labeled '-10', and the right branch connects to a node labeled '8'.  The '-10' node further branches to nodes '1' and '-7', with '1' branching to '11' and '-7' branching to '-1'. The '8' node branches to '9' and '7'.  In the left tree, the '7' node is highlighted in peach and branches to '6' and '-3', with the text 'sum = 7' indicating the sum of these three nodes (7 + 6 + -3).  The right tree is identical to the left, except the '7', '6', and '-3' nodes are highlighted in peach, and a rectangular box labeled 'sum = 13' is placed next to them, indicating the sum of these three nodes (7 + 6 + 0). The difference between the two trees shows a step-by-step process of finding a subset of nodes that sums to a target value, possibly using a recursive approach.](/assets/images/dsa/trees/29679756f3d62818.webp)

![Image represents two binary trees, both rooted at node '5'.  Each tree has three levels. The root node '5' connects to two child nodes: '-10' and '8'.  Node '-10' further branches into '1' and '-7', with '1' connecting to '11' and '-7' connecting to '-1'. Node '8' branches into '9' and '7'. In the left tree, node '7' connects to '6' and '-3', which are highlighted in a peach-colored fill, with the text 'sum = 4' in orange nearby. In the right tree, nodes '6' and '-3' are also connected to '7', and this entire subtree (nodes '7', '6', and '-3') is highlighted in a peach-colored fill, with the text 'sum = 10' in orange nearby.  Both trees are identical except for the subtree rooted at node '7'. The highlighted subtrees illustrate different sums of the nodes within them.](/assets/images/dsa/trees/7462ea211d9bc6af.webp)

So, to find the maximum path sum, we calculate the maximum sum rooting from each node and return the largest of these sums.

**Calculating the maximum path sum at any node** Let’s try adopting a recursive strategy for this. Consider the root node of our example. The maximum sum of a path rooting from node 5 involves the maximum gain we can attain from its left subtree and its right subtree.

![Image represents a binary tree illustrating the concept of finding the maximum path sum starting from a root node (node 5).  The tree is composed of nodes containing integer values. Node 5 is the root, branching to a left subtree (highlighted in light blue) and a right subtree (highlighted in light purple). The left subtree consists of nodes -10, 1, -7, 11, and -1, while the right subtree contains nodes 8, 9, 7, 6, and -3.  Each node is connected to its parent and children nodes via lines.  The formula '5 + (max from left) + (max from right)' is displayed above the tree, indicating that the maximum path sum from node 5 is calculated by adding the value of node 5 to the maximum path sum from its left subtree and the maximum path sum from its right subtree.  The subtrees are labeled 'left' and 'right' for clarity. A small box labeled 'node' points to node 5, indicating that the calculation starts from this node.](/assets/images/dsa/trees/b5258283763f510f.webp)

Which sums do we expect node 5’s left and right subtrees to return? Consider what happens when the maximum path sums of these subtrees are returned to node 5:

![Image represents a binary tree with a root node labeled '5'.  A light-blue shaded area highlights the left subtree, showing a path from node '-10' to node '1' and finally to node '11', with the text 'maximum path of left subtree (sum = 2)' indicating the maximum path sum within this subtree.  Similarly, a light-purple shaded area highlights the right subtree, showing a path from node '8' to node '7', then to nodes '6' and '-3', with the text 'maximum path of right subtree (sum = 30)' indicating its maximum path sum.  A dashed cyan arrow points from a box labeled 'node' to the root node '5', indicating the starting point of the algorithm.  Dashed magenta arrows connect the root node '5' to the maximum paths of both subtrees.  Above the root node, the text 'maximum path at node 5 (sum = 5 + 2 + 30 = 37)' shows the calculation of the maximum path sum through the root node, incorporating the sums from both subtrees and the root node's value. A downward-pointing black arrow at the bottom indicates the final result or output of the algorithm.](/assets/images/dsa/trees/7176f436b675d4f0.webp)

![Image represents a tree-like structure, possibly illustrating a graph data structure or a similar concept.  The topmost node is a pink circle connected to two other pink circles below it.  These two lower pink circles each have further connections to other circles. One pink circle connects to another pink circle and then to a light grey circle. The other pink circle connects to a light grey circle and then to another light grey circle. One of the bottom-most pink circles is shaded a darker pink.  A curved red arrow points to a path formed by several connected pink circles, with the text 'not a path' in red next to the arrow, indicating that this highlighted sequence of nodes does not represent a valid path according to some definition within the context of the course. The lines connecting the circles represent edges or relationships between nodes. The color-coding (pink and light grey) might signify different node types or states, but this is not explicitly labeled.](/assets/images/dsa/trees/920d64452e273e43.webp)

As we can see, when we received the maximum path sum from a recursive call made to node 8, we received the sum of a path with multiple branches. This results in an invalid path formed at node 5.

Below, we can see what we actually want. The sums of the two paths returned here correctly give us the maximum path sum rooting from node 5:

![Image represents a binary tree illustrating the concept of finding the maximum path sum.  The root node, labeled '5', connects to two child nodes: '-10' on the left and '8' on the right.  A light-blue shaded area highlights a path from the root down to the node '11', with a label '(sum = 2)' indicating the sum of the nodes along this path (5 + (-10) + 1 + 11 = 7, but the image shows 2, which is incorrect). A light-purple shaded area highlights a path from the root down to the node '-3', with a label '(sum = 21)' indicating the sum of the nodes along this path (5 + 8 + 7 + (-3) = 17, but the image shows 21, which is also incorrect). Dashed cyan lines show a path from the root to the node '-10', and dashed magenta lines show a path from the root to the node '7'.  A small rectangle labeled 'node' points to the root node '5' with an arrow. Above the tree, text states 'maximum path at node (sum = 5 + 2 + 21 = 28)', indicating the maximum path sum calculated, although the calculation is incorrect based on the values shown in the tree. A downward-pointing arrow at the bottom suggests a further processing step or result.  The numbers within each circle represent the value of that node in the tree.](/assets/images/dsa/trees/88d2e4079b1eb609.webp)

![Image represents a tree-like graph structure illustrating a coding pattern, likely related to pathfinding or traversal algorithms.  The graph consists of nodes represented as circles, connected by edges represented as lines.  The topmost node is connected to two nodes below it, which in turn connect to further nodes, creating a branching structure.  A subset of the nodes and connecting edges are highlighted with a light green fill, forming a path from the topmost node down to a leaf node on the right. This highlighted path is labeled with the text 'valid path' in green, indicating a specific sequence of nodes that satisfies some condition within the algorithm.  The unhighlighted nodes and edges are rendered in light gray, suggesting they are not part of the currently identified valid path. The overall structure resembles a binary tree, although not all nodes have two children.](/assets/images/dsa/trees/14cbc1e2f49aa23b.webp)

The difference between the valid and invalid paths above lies in the type of path returned by the recursive call to node 8. We can see this difference clearly in the diagram below.

- In the left diagram below, an invalid path is formed at node 5 because at node 8, we return node 8’s maximum path sum, which is from a path with two branches.
- In the right diagram, a valid path is formed at node 5 because we return the largest sum of a path with a single branch.

![Image represents two nearly identical binary trees illustrating a coding pattern, likely related to path sums in a tree.  Both trees have a root node labeled '5', connected to a node labeled '8'. Node '8' branches to nodes '9' and '7'. Node '7' further branches to nodes '6' and '-3'.  The left tree highlights a path (nodes 8, 7, 6) with a sum of 30, indicated by a dashed grey arrow pointing back to node 5 and the text 'returning node 8's maximum path sum: return = 30X'. This path is visually emphasized by a peach-colored fill. The right tree shows a different path (nodes 8, 9) summing to 21, represented by a dashed grey arrow to node 5 and the text 'returning the correct path sum with only one branch return = 21✓'.  The title 'at node 8:' indicates that the diagrams illustrate the calculations performed at node 8 to determine the maximum path sum, contrasting a correct single-branch calculation with an incorrect multi-branch calculation.](/assets/images/dsa/trees/1b2cea61dce1b858.webp)

This observation highlights that we can’t just return the maximum path sum of a node. So, let’s have a closer look at which path sum we should return, instead.

**Identifying the value returned during recursion** Consider node 8 from the above example. The maximum path sum rooting from node 8 is 30. We know from the discussion above that we can’t just return this maximum path sum value:

![Image represents a binary tree structure with nodes containing numerical values and a calculation demonstrating a maximum sum computation.  A light-grey node labeled '5' is connected via a dashed line to a peach-colored node labeled '8'. A rectangular box labeled 'node' indicates a data flow from the box to node '8'. Node '8' is connected to a peach-colored node '9' and a peach-colored node '7'. Node '7' is further connected to a peach-colored node '6' and a light-grey node '-3'.  A calculation to the right shows `max_sum = node.val + left_sum + right_sum`, with `node.val` being 8, `left_sum` being 9, and `right_sum` being 13, resulting in a `max_sum` of 30.  However, a red 'X' marks the `return max_sum` statement, suggesting an error or an incorrect approach in the calculation or algorithm. The dashed line from node '5' to node '8' implies a potential recursive call or traversal within a tree-processing algorithm.](/assets/images/dsa/trees/d330fd57edacf068.webp)

We know we need to make sure we **return a single, continuous path** from node 8. This would mean **returning a path with node 8 as an end point**, which leaves us with two main choices for values we could return:

![Image represents a binary tree illustrating a coding pattern, specifically option 1 of a recursive tree traversal algorithm.  The tree consists of nodes containing numerical values (5, 8, 9, 7, 6, -3).  Nodes 8 and 9 are highlighted with a peach-colored background.  A light gray arrow points from a rectangular box labeled 'node' to node 8, indicating the current node being processed.  A thicker black line connects node 8 and node 9, representing a parent-child relationship in the tree.  Light gray lines connect other nodes to represent the tree structure.  A dashed orange line and arrow point from node 8 back to node 5, visually representing a recursive call or data flow.  Above the orange line, the text 'return node.val + left_sum = 17' indicates the calculation being performed at node 8, summing its value (8) with the sum of its left subtree (9), resulting in 17, which is then returned up the tree.  A dashed gray line extends from the left of node 5, suggesting a continuation of the tree beyond the visible portion.](/assets/images/dsa/trees/7ba09c96e0725479.webp)

![Image represents a binary tree illustrating a coding pattern, specifically option 2 of a recursive tree traversal algorithm.  The tree consists of nodes, circles containing numerical values.  A light-grey node labeled '5' is connected to a darker-grey node labeled '9' and a peach-colored node labeled '8'.  The node '8' is further connected to a peach-colored node '7' and a peach-colored node '6'.  A light-grey node labeled '-3' is connected to node '7'. A rectangular box labeled 'node' shows a directional arrow pointing to node '8', indicating the current node being processed.  A dashed curved arrow originates from node '8' and points to node '5', suggesting a return value.  The text 'return node.val + right_sum = 21' indicates the calculation being performed, where 'node.val' refers to the value of the current node (8) and 'right_sum' represents the sum of values in the right subtree (7 + 6 = 13), resulting in a total of 21. The peach-colored nodes and their connections are highlighted to emphasize the part of the tree currently being processed in this recursive step.  A dashed line extends from the left of node '5', suggesting a continuation of the tree beyond the visible portion.](/assets/images/dsa/trees/118575b21d1c980c.webp)

Between the above two paths, we just return whichever of their sums is larger. Therefore, our return statement is:

`return node.val + max(left_sum, right_sum)`

Now that we’re getting single continuous path sums from the left and right subtrees, **the maximum path sum rooting from a node** can be calculated using **node.val + left_sum + right_sum**. This is done separately from the return statement.

The maximum path sum of the entire tree is found by keeping track of the largest path sum formed at every node.

**Handling negative path sums** One final thing to note is that we shouldn’t include the values of `left_sum` or `right_sum` if either is negative, as they wouldn’t contribute to a maximum sum. We can do this by setting their values to 0 if they’re negative, which is the same as excluding the left or right path from the sum.

## Implementation

```python
from ds import TreeNode
    
max_sum = float('-inf')
    
def max_path_sum(root: TreeNode) -> int:
   global max_sum
   max_path_sum_helper(root)
   return max_sum
    
def max_path_sum_helper(node: TreeNode) -> int:
   global max_sum
   # Base case: null nodes have no path sum.
   if not node:
       return 0
   # Collect the maximum gain we can attain from the left and right subtrees, setting
   # them to 0 if they’re negative.
   left_sum = max(max_path_sum_helper(node.left), 0)
   right_sum = max(max_path_sum_helper(node.right), 0)
   # Update the overall maximum path sum if the current path sum is larger.
   max_sum = max(max_sum, node.val + left_sum + right_sum)
   # Return the maximum sum of a single, continuous path with the current node as an
   # endpoint.
   return node.val + max(left_sum, right_sum)
```

### Complexity Analysis

**Time complexity:** The time complexity of `max_path_sum` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because it traverses each node of the tree once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n.
