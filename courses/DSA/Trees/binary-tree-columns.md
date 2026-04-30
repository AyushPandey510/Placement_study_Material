---
title: "Binary Tree Columns"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Binary Tree Columns.html"
---
Given the root of a binary tree, return a list of arrays where each array represents a **vertical column of the tree**. Nodes in the same column should be ordered from top to bottom. Nodes in the same row and column should be ordered from left to right.

#### Example:

```python
Output: [[2], [9], [5, 1, 4], [3], [7]]
```

## Intuition

First and foremost, to get the columns of a binary tree, we'll need a way to identify what column each node is in.

**Column ids** One way to distinguish between different columns is to represent each column by a distinct numerical value: an id. Initially, we don't know how many columns there are to the left or to the right of the root node, but we at least know the column which contains the root node itself. Let's give this column an id of 0. This lets us set positive column ids for nodes to the right of the root and negative ids to the left:

![Image represents a binary tree structure visualized across columns representing levels or time steps.  The topmost node, labeled '5', resides in column '0'.  This node connects to two child nodes: '9' in column '-1' and '3' in column '1'. Node '9' further branches into nodes '2' in column '-2' and '1' in column '0'. Node '3' connects to node '4' in column '0' and node '7' in column '2'.  Each column is delineated by a vertically oriented orange bar at the top, with column labels '-2', '-1', '0', '1', and '2' indicating the level or time step. The area between the orange bars is shaded lightly peach, providing visual separation between the columns. The nodes are represented as circles containing numerical values, and the connections between them represent parent-child relationships within the tree structure.](/assets/images/dsa/trees/326d5fe82433500c.webp)

How can we identify what column id a node is associated with? A handy observation is that every time we move to the right, the column id increases by 1, and every time we move to the left, it decreases by 1. This allows us to assign ids as we traverse the tree: for any node, the column ids of `node.left` and `node.right` are `column - 1` and `column + 1`, respectively:

![Image represents a directed acyclic graph illustrating a simple coding pattern, possibly related to tree traversal or a decision-making process within a program.  The graph consists of four nodes, each represented by a circle containing a numerical value (5, 9, 3, and 1) and labeled with a 'column' value (0, -1, 1, and 0 respectively).  Directed edges connect the nodes, indicating the flow of information or execution. Node 5, with column value 0, branches to node 9 (column -1) via an edge labeled 'column - 1' and to node 3 (column 1) via an edge labeled 'column + 1'. Node 9, with column value -1, connects to node 1 (column 0) via an edge labeled 'column + 1'.  The labels on the edges suggest that the value of a 'column' variable is modified as the program traverses the graph, potentially representing an index or counter within a data structure.  The overall structure suggests a recursive or iterative process where the value of the 'column' variable determines the path taken through the graph.](/assets/images/dsa/trees/a30b99d7b14c8141.webp)

**Tracking node values by their column id** Now that we have a way to determine a node’s column, we’ll need a way to keep track of which node values belong to which columns. This can be done using a **hash map** where keys are column ids and the value of each column id is a list of the node values at that column.

![Image represents a visualization of a data structure, likely a tree or graph, alongside a mapping table.  A binary tree is shown with nodes containing numerical values (2, 5, 9, 1, 4, 3, 7).  The nodes are connected by edges, illustrating parent-child relationships.  The tree is positioned above a series of vertically aligned, peach-colored columns labeled -2, -1, 0, 1, and 2 at the top.  Each column visually aligns with a subset of the tree's nodes, suggesting a spatial organization or partitioning. To the right, a table labeled 'column_map' maps column IDs (-2 to 2) to lists of node values.  For example, column 0 contains nodes with values 5, 1, and 4, as reflected in the table's entry for column ID 0.  The table's labels 'id' and 'node values' clearly define the meaning of its columns.  The overall diagram illustrates a relationship between the spatial arrangement of nodes in the tree and their association with specific columns, as defined by the `column_map` table.](/assets/images/dsa/trees/1d1cff8696db1084.webp)

Now, let’s consider what traversal algorithm we should use to populate this hash map.

**Breadth-first search** In general, we can employ any traversal method to assign column ids to each node, as long as we increment the column id whenever we move right and decrement it whenever we move left. However, we need to be cautious about the following two requirements:

1. Nodes in the same column should be ordered from top to bottom.
2. Nodes in the same row and column should be ordered from left to right.

So, we’ll need an algorithm that traverses the tree from top to bottom and then from left to right. This calls for **BFS**.

BFS processes nodes level by level, starting from the root and moving horizontally across the tree at each level. This method ensures nodes are visited from top to bottom, and for nodes in the same row (level), they are visited from left to right.

![Image represents a tree-like data structure, possibly illustrating a coding pattern like a binary tree or a similar hierarchical structure.  The structure consists of nodes containing numerical values (5, 9, 3, 2, 1, 4, 7) connected by branches. Node 5 sits at the top, acting as the root.  It branches down to nodes 9 and 3. Node 9 further branches to nodes 2 and 1, while node 3 branches to nodes 4 and 7.  Horizontal light-blue lines with right-pointing cyan arrows traverse the diagram at three levels, indicating a flow of information or processing from left to right across each level. The leftmost vertical cyan arrow suggests an input or starting point for the process, while the rightmost horizontal arrow at the bottom level suggests an output or final result.  The overall arrangement suggests a layered processing model where data is processed level by level, potentially representing a parallel or pipelined algorithm.](/assets/images/dsa/trees/1dc9aa2fc63ad865.webp)

Traversing the tree this way ensures node values are added to the hash map in the desired order, complying with the two requirements above.

We can see how the hash map is populated level by level below:

![Image represents a visualization of a coding pattern, likely related to tree traversal or data structure manipulation.  The image shows three instances of a binary tree, each with a root node labeled '5'.  Each node in the tree contains a numerical value.  To the right of each tree is a table labeled 'column_map,' which acts as a mapping between a unique identifier ('id') and the values of nodes at a specific level or column within the tree.  Light blue arrows connect nodes horizontally across each tree, indicating a traversal or processing step.  Orange numbers next to the nodes in the trees represent some kind of associated value or index, possibly indicating the order of processing or a relative position.  The first tree shows a single column (id 0) with the root node 5 and its children. The second tree shows a horizontal connection between nodes 9 and 3, with the column_map updated to include ids -1, 0, and 1, reflecting the nodes' positions after this step. The third tree shows a horizontal connection spanning all leaf nodes, with the column_map further updated to include ids -2, -1, 0, 1, and 2, reflecting the final state after processing all nodes.  The overall pattern suggests a process that iteratively traverses the tree horizontally, updating the column_map to track the processed nodes and their values.](/assets/images/dsa/trees/e1c10d0aaf21e08a.webp)

Once BFS concludes, the hash map is populated with lists of values for each column id. However, the hash map itself is not the expected output. So, let’s discuss what to do next.

**Creating the output** This problem expects us to return the column ids from left to right. As we know, a hash map does not inherently maintain the order of its keys (column ids), which means we’ll need to find a way to attain the output in the desired order.

To retrieve the column ids in the desired order, it would be useful to know the **leftmost column id** and the **rightmost column id**. This allows us to increment through all ids in the range [`leftmost_column`, `rightmost_column`], ensuring we can build the output in the desired order.

![Image represents a binary tree structure visualized within a columnar arrangement.  At the top, two rectangular boxes labeled 'leftmost_column' and 'rightmost_column' are positioned above their respective columns.  Arrows descend from these boxes, pointing to horizontal orange bars that span the width of their respective columns.  These bars are segmented into sections labeled with integers -2, -1, 0, 1, and 2, representing column indices. The main body of the image shows a binary tree; node 5 is the root, branching down to nodes 9 and 3. Node 9 further branches to nodes 2 and 1, while node 3 branches to nodes 4 and 7. Each node contains a single integer value. The tree is positioned such that nodes are vertically aligned within their respective columns based on the index labels, with the root node (5) centered in column 0.  The peach-colored background columns visually separate the nodes based on their column index.](/assets/images/dsa/trees/fa14eb185b9814ee.webp)

## Implementation

```python
from ds import TreeNode
from typing import List
from collections import defaultdict, deque
    
def binary_tree_columns(root: TreeNode) -> List[List[int]]:
    if not root:
        return []
    column_map = defaultdict(list)
    leftmost_column = rightmost_column = 0
    queue = deque([(root, 0)])
    while queue:
        node, column = queue.popleft()
        if node:
            # Add the current node's value to its corresponding list in the hash
            # map.
            column_map[column].append(node.val)
            leftmost_column = min(leftmost_column, column)
            rightmost_column = max(rightmost_column, column)
            # Add the current node's children to the queue with their respective
            # column ids.
            queue.append((node.left, column - 1))
            queue.append((node.right, column + 1))
    # Construct the output list by collecting values from each column in the hash
    # map in the correct order.
    return [column_map[i] for i in range(leftmost_column, rightmost_column + 1)]
```

### Complexity Analysis

**Time complexity:** The time complexity of `binary_tree_columns` is O ( n ) O(n) O ( n ) where n n n denotes the number of nodes in the tree. This is because we process each node of the tree once during the level‐order traversal.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the queue. The queue’s size will grow as large as the level with the most nodes. In the worst case, this occurs at the final level when all the last‐level nodes are non‐null, totaling approximately n / 2 n/2 n /2 nodes. Note that the output array created at the return statement does not contribute to the space complexity.
