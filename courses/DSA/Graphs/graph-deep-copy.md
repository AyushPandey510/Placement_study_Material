---
title: "Graph Deep Copy"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Graph Deep Copy.html"
---
Given a reference to a node within an undirected graph, create a **deep copy** (clone) of the graph. The copied graph must be completely independent of the original one. This means you need to make new nodes for the copied graph instead of reusing any nodes from the original graph.

#### Example:

![Image represents a comparison between an 'Original Graph' and its 'Cloned Graph.'  The original graph is depicted as a simple undirected graph with four nodes labeled 0, 1, 2, and 3. Node 0 is connected to nodes 1 and 2, node 1 is connected to node 0 and 2, node 2 is connected to nodes 0, 1, and 3, and node 3 is connected to node 2. The cloned graph mirrors this structure, with identical node labels and connections; however, each node in the cloned graph is represented by a dashed orange circle with a pale peach fill, visually distinguishing it from the solid-line, white-filled circles of the original graph.  A textual description to the right clarifies that all nodes in the cloned graph are 'deep copies,' implying that they are independent copies and do not share any references or pointers with the nodes in the original graph.](/assets/images/dsa/graphs/194403685cf61c34.webp)

#### Constraints:

- The value of each node is unique.
- Every node in the graph is reachable from the given node.

## Intuition

Our strategy for this problem is to traverse the original graph and create the deep copy during the traversal, effectively cloning each node while we traverse. Any traversal method will suffice for this strategy. In this explanation, we’ll use **DFS**.

**Traversing the graph** Start by defining exactly what we want our DFS function to do. When we call DFS on the input node, we expect it to create a deep copy of that node and all its neighbors. Let’s break down this process.

The first thing our function will do is create a copy of its input node:

![Image represents a diagram illustrating a Depth-First Search (DFS) algorithm, specifically showcasing node cloning.  The left side depicts a graph with four nodes (0, 1, 2, 3) interconnected. Node 0 is connected to nodes 1 and 2, node 1 is connected to node 2, and node 2 is connected to node 3.  A rectangular box labeled 'node' points a downward arrow to node 0, indicating the starting point of the DFS traversal. The text 'dfs(θ):' above signifies that a depth-first search is being performed starting at node 0 (represented by θ). On the right side, a rectangular box labeled 'cloned_node' points to a dashed-line circle containing θ, representing a cloned version of the starting node. This illustrates the creation of a copy of the starting node during the DFS process, potentially for purposes like maintaining a visited node list or exploring different paths in the graph.  The difference in the style of the node (solid vs. dashed line) highlights the distinction between the original and cloned nodes.](/assets/images/dsa/graphs/8de41bca2ac29095.webp)

Next, we want to ensure this cloned node is connected to a clone of all its neighbors, mirroring the original node’s neighbors. To achieve this, we'll call the DFS function on each of the original node's neighbors:

![Image represents a visual comparison of a graph traversal algorithm, likely Depth-First Search (DFS), on an original graph and its cloned version.  On the left, a simple undirected graph is shown with four nodes labeled 0, 1, 2, and 3.  Node 0 is connected to nodes 1 and 2, node 1 is connected to nodes 0 and 3, and node 2 is connected to nodes 0 and 3.  A rectangular box labeled 'node' points to node 0, indicating a starting point for traversal. On the right, a cloned version of node 0 is depicted within a dashed orange circle, representing a starting point for DFS on the cloned graph.  From this cloned node 0, dashed orange lines indicate recursive calls to the DFS function.  One dashed line connects to node 1, labeled 'dfs((1))', signifying a DFS call on node 1. Another dashed line connects to a circle labeled 'dfs((2))', representing a DFS call on node 2. The arrangement visually demonstrates how a cloned node initiates separate DFS traversals, potentially for parallel processing or independent exploration of the graph's structure.](/assets/images/dsa/graphs/cee9d36e4b5ac349.webp)

Each of these DFS instances will also do the same thing by creating a clone of their input node and returning it when it has been connected to its neighbors:

![Image represents a visual explanation of a Depth-First Search (DFS) algorithm on a graph.  The left side shows a simple undirected graph with four nodes labeled 0, 1, 2, and 3.  Node 0 is connected to nodes 1 and 2, node 1 is connected to node 2, and node 2 is connected to node 3.  A box labeled 'node' points to node 0, indicating the starting point of the DFS. The right side depicts the DFS process. A box labeled 'cloned_node' points to a dashed-line circled node 0, representing a copy of the starting node in the DFS traversal.  A dashed orange line connects this cloned node 0 to a function call `dfs((1))`, indicating a recursive call to DFS on node 1.  The result of `dfs((1))`, which is 1, is shown flowing via a right-angle arrow to a dashed-line circled node labeled '1', representing the return value.  Similarly, a dashed orange line connects the cloned node 0 to `dfs((2))`, representing a recursive call to DFS on node 2. The result of `dfs((2))`, which is 2, is shown flowing via a right-angle arrow to a dashed-line circled node labeled '2', representing the return value of the second recursive call. The dashed-line circles around nodes 0, 1, and 2 on the right side visually distinguish them as nodes visited during the DFS traversal.](/assets/images/dsa/graphs/950c914369111a6f.webp)

In pseudocode, this is what the process looks like:

```python
dfs(node):
    cloned_node = new GraphNode(node)
    for neighbor in node.neighbors:
        cloned_neighbor = dfs(neighbor)
        cloned_node.neighbors.add(cloned_neighbor)
    return cloned_node
```

One more thing we should be mindful of is the possibility of cloning nodes that have already been cloned.

**Handling previously-cloned nodes** Consider node 2 in the following graph and cloned graphs. Its neighbors are nodes 0, 1, and 3. Let’s say nodes 0 and 1 have already been cloned, but not node 3:

![Image represents a graph transformation illustrating a cloning pattern.  The left side shows an initial graph with four nodes labeled 0, 1, 2, and 3.  Node 0 is connected to node 2, node 1 is connected to nodes 0 and 2, and node 2 is connected to node 3.  A rectangular box labeled 'node' points to node 2 with an arrow, indicating that node 2 is the target of a cloning operation. The right side depicts the graph after the cloning operation.  Nodes 0, 1, and 2 are now outlined with a dashed orange border, indicating they are cloned.  The structure of the connections between nodes 0, 1, and 2 remains identical to the original graph, but node 2 is now a cloned node. A rectangular box labeled 'cloned_node' points to the cloned node 2 with an arrow, signifying the result of the cloning process.  The original node 3 and its connection to node 2 are not affected by the cloning.](/assets/images/dsa/graphs/d037758a9f45453b.webp)

To link the cloned node 2 to its neighbors, we perform a DFS call to node 0, node 1, and node 3:

![Image represents a graph traversal algorithm, likely Depth-First Search (DFS), illustrated through two diagrams. The left diagram shows a simple undirected graph with four nodes (0, 1, 2, 3) and edges connecting them: node 0 connects to nodes 1 and 2; node 1 connects to nodes 0 and 2; node 2 connects to nodes 0, 1, and 3; and node 3 connects to node 2.  A rectangular box labeled 'node' points to node 2, indicating a starting point. The right diagram depicts the DFS traversal process.  A rectangular box labeled 'cloned_node' points to a lightly shaded, dashed-line circled node 2, representing a copy of the starting node in the traversal.  From this cloned node 2, dashed orange lines connect to nodes labeled 'dfs(0)', 'dfs(1)', and 'dfs(3)', indicating that the DFS function is recursively called on these nodes.  The arrangement shows the progression of the DFS algorithm, starting from node 2 and exploring its neighbors recursively.](/assets/images/dsa/graphs/564a401ea0ca941f.webp)

Since cloned copies of nodes 0 and 1 already exist, our DFS function should return these previously created nodes, instead of creating new ones:

![Image represents a diagram illustrating a graph traversal algorithm, likely Depth-First Search (DFS), and its cloning mechanism.  The left side shows a simple undirected graph with four nodes (0, 1, 2, 3) where node 0 is connected to node 2, node 1 is connected to nodes 2 and 3, and node 2 is connected to node 3.  A labeled arrow 'node' points to node 2, indicating a starting point. The right side depicts the DFS process.  A rectangular box labeled 'previously created nodes' points to dashed-line circled nodes 0 and 1, representing nodes already visited. A rectangular box labeled 'cloned_node' points to a dashed-line circled node 2, a clone of node 2 from the original graph.  Solid arrows indicate the traversal path within the DFS, with 'dfs(x)' indicating a DFS call on node x. Dashed orange lines connect the cloned node 2 to nodes 0 and 3, showing the exploration of its neighbors.  The 'returns(x)' labels indicate the return of the DFS function after exploring node x. Finally, a curved arrow from a rectangular box labeled 'new node' points to the dashed-line circled node 3, suggesting the creation of a new node during the cloning process.  The overall diagram visualizes how a graph is traversed and cloned using a DFS-like algorithm.](/assets/images/dsa/graphs/de246aa4cda99799.webp)

We can manage this by using a **hash map** where each original node is a key, and the corresponding cloned node is the value. This way, whenever we perform a DFS call on a node, we first check if it already has a clone in our hash map. If it does, we just return the existing clone. If it doesn't, we create a new clone and add it to the hash map.

## Implementation

```python
from ds import GraphNode
    
def graph_deep_copy(node: GraphNode) -> GraphNode:
    if not node:
        return None
    return dfs(node)
    
def dfs(node: GraphNode, clone_map = {}) -> GraphNode:
    # If this node was already cloned, then return this previously cloned node.
    if node in clone_map:
        return clone_map[node]
    # Clone the current node.
    cloned_node = GraphNode(node.val)
    # Store the current clone to ensure it doesn't need to be created again in future
    # DFS calls.
    clone_map[node] = cloned_node
    # Iterate through the neighbors of the current node to connect their clones to the
    # current cloned node.
    for neighbor in node.neighbors:
        cloned_neighbor = dfs(neighbor, clone_map)
        cloned_node.neighbors.append(cloned_neighbor)
    return cloned_node
```

### Complexity Analysis

**Time complexity:** The time complexity of `graph_deep_copy` is O ( n + e ) O(n+e) O ( n + e ), where n n n is the number of nodes and e e e is the number of edges of the graph. This is because we traverse through and create a clone of all n n n nodes of the original graph, and traverse across e e e edges during DFS.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as n n n. In addition, the `clone_map` hash map stores a key-value pair for each of the n n n nodes.
