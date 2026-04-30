---
title: "Widest Binary Tree Level"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Widest Binary Tree Level.html"
---
Return the width of the **widest level** in a binary tree, where the width of a level is defined as the distance between its leftmost and rightmost non-null nodes.

#### Example:

![Image represents a binary tree data structure.  The root node, labeled '1', connects to two child nodes: '2' and '3'. Node '2' further branches into nodes '4' and '5', while node '3' connects to node '7'. Node '4' has children '8' and '9'. Node '5' has a child '11', and node '7' has a child '14'.  Nodes '5', '3', and '7' each have missing children represented by dashed circles labeled '(null)', indicating that these branches are not yet populated or have null values. An orange line at the bottom spans the width of the tree, indicating a level or a specific operation on the tree, and is labeled '7', possibly representing the width or a level of the tree.  The numbers within the circles represent the values stored in each node. The solid lines represent parent-child relationships in the tree, while the dashed lines indicate the absence of a child node.](/assets/images/dsa/trees/65b1738b843ba6d6.webp)

```python
Output: 7
```

## Intuition

Let's first understand how width is defined in a binary tree. An important distinction to make is that the width of a level is not necessarily equivalent to the number of nodes in that level.

![Image represents a tree-like structure illustrating a coding pattern, likely related to tree traversal or breadth-first search.  The diagram shows a complete binary tree with four levels.  The top level contains a single node labeled '1'. The second level has two nodes labeled '2' and '3', connected to node '1'. The third level contains nodes '4', '5', and '7', with '4' and '5' connected to '2' and '7' connected to '3'.  A dashed-line connection from '3' indicates a missing node (represented as '(null)'). The bottom level shows nodes '8', '9', '11', and '14', with '8' and '9' connected to '4', and '14' connected to '7'.  Two additional '(null)' nodes are shown on this level, indicating missing nodes.  Orange horizontal lines connect nodes at each level, labeled with the 'width' (number of nodes in that level) and the total 'number of nodes' at or below that level.  The values for width are 1, 2, 4, and 7, respectively, while the number of nodes are 1, 2, 3, and 4, respectively.  The diagram visually demonstrates how the width of the tree increases exponentially with each level.](/assets/images/dsa/trees/0f4a142793f7383e.webp)

As we can see, the null nodes between the leftmost and rightmost nodes are considered in the width, as well.

Think about a data structure in which determining the width or distance between two elements is simple, such as an array, where the distance of two elements can be obtained by the difference between their indexes. If our binary tree also has indexes, it would similarly be possible to obtain the width between two nodes at a level. Let’s explore a method to assign an index to each node.

**Indexing a binary tree** Below, we see how indexes can be assigned at each node, starting with index 0 for the root node:

![Image represents a binary tree structure visualized across multiple horizontal layers, each representing a level of the tree.  The nodes of the tree are circles containing numbers (1, 2, 3, 4, 5, 7, 8, 9, 11, 14), with orange numbers next to them indicating a sequential node numbering. Solid lines connect parent nodes to their children, illustrating the hierarchical relationships. Dashed lines and circles labeled '[null]' represent missing nodes or branches. To the right of the tree, calculations are shown for 'width' at each level.  The formula used is `width = (largest node index - smallest node index) + 1`, with the result displayed below. For example, at the lowest level, the calculation is `width = (13 - 7) + 1 = 7`, reflecting the number of nodes (including nulls) present at that level.  The top level has a width of 1, the second level has a width of 2, the third level has a width of 4, and the bottom level has a width of 7.](/assets/images/dsa/trees/40ec8b7248b90a64.webp)

These indexes enable us to calculate the width of a level using **rightmost_index - leftmost_index + 1**, as shown in the diagram above. Note, the indexes at the null nodes are added only for visualization.

But how can we set up something like this? The key observation is that each node's index can be determined from its parent's index. We can derive the following relationship for any node at index `i`:

- Its **left child** will be at index **2*i + 1**.
- Its **right child** will be at index **2*i + 2**.

Now, we just need a way to traverse each level of the tree to determine the width at individual levels, allowing us to obtain the width of the widest level in the tree. We can use level-order traversal for this.

**Level-order traversal** If you're unfamiliar with the level-order traversal algorithm, study the *Rightmost Nodes of a Binary Tree* problem before continuing.

Remember, level-order traversal utilizes a queue to process the binary tree nodes. In this problem, whenever we push a node into this queue, we also push its respective index along with it, to know which index it’s associated with.

The width of a level can be calculated using `rightmost_index - leftmost_index + 1`. To perform this calculation, we need the index of the first (leftmost) and last (rightmost) nodes of that level. Here’s how we obtain these indexes:

- Set leftmost_index to the index at the first node of the level.
- Start rightmost_index at the same point as leftmost_index and update it as we traverse the level. This way, it will eventually be set to the last index after traversing the level.

![Image represents a binary tree structure illustrating the concept of `leftmost_index` and `rightmost_index`.  The tree's root node is labeled '1'.  Node '1' connects to nodes '2' and '3' with solid lines. Node '2' further connects to nodes '4' and '5' with solid lines, while node '3' connects to node '7' with a solid line and has dashed lines indicating null children. Node '4' connects to nodes '8' and '9' with solid lines. Node '5' connects to node '11' with a solid line and has a dashed line indicating a null child. Node '7' connects to node '14' with a solid line.  Nodes '8', '9', '11', and '14' are leaf nodes.  A peach-colored rectangular background highlights nodes '4', '5', ' (null) ', and '7', representing a level in the tree.  Orange rectangular boxes labeled `leftmost_index` and `rightmost_index` point downwards with arrows to nodes '4' and '7' respectively, indicating these nodes as the leftmost and rightmost nodes at that specific level of the tree.  Dashed lines and '(null)' labels represent null or missing child nodes.](/assets/images/dsa/trees/0a40d7b413d91b48.webp)

As we calculate the width at each level, we keep track of the largest width using `max_width`, representing the width of the widest level in the binary tree.

## Implementation

```python
from ds import TreeNode
    
def widest_binary_tree_level(root: TreeNode) -> int:
    if not root:
        return 0
    max_width = 0
    queue = deque([(root, 0)])  # Stores (node, index) pairs.
    while queue:
        level_size = len(queue)
        # Set the 'leftmost_index' to the index of the first node in this level. Start
        # 'rightmost_index' at the same point as 'leftmost_index' and update it as we
        # traverse the level, eventually positioning it at the last node.
        leftmost_index = queue[0][1]
        rightmost_index = leftmost_index
        # Process all nodes at the current level.
        for _ in range(level_size):
            node, i = queue.popleft()
            if node.left:
                queue.append((node.left, 2*i + 1))
            if node.right:
                queue.append((node.right, 2*i + 2))
            rightmost_index = i
        max_width = max(max_width, rightmost_index - leftmost_index + 1)
    return max_width
```

### Complexity Analysis

**Time complexity:** The time complexity of `widest_binary_tree_level` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because we process each node once during level-order traversal.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the queue. The queue’s size will grow as large as the level with the most nodes. In the worst case, this occurs at the last level when all the last-level nodes are non-null, totaling approximately n / 2 n/2 n /2 nodes.
