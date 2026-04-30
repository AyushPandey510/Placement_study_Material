---
title: "Introduction To Graphs"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Introduction to Graphs.html"
---
## Intuition

A graph is a data structure composed of nodes (vertices) connected by edges. Graphs are used to model relationships, where the edges define the relationships.

Below is the implementation of the `GraphNode` class:

```python
class GraphNode:
    def __init__(self, val):
        self.val = val
        self.neighbors = []
```

**Terminology:**

- Adjacent node/neighbor: two nodes are adjacent if there’s an edge connecting them.
- Degree: the number of edges connected to a node.
- Path: a sequence of nodes connected by edges.

![Image represents a graph illustrating graph traversal concepts.  The left side shows a graph with nodes labeled 0, 1, 2, 3, and 4. Node 0 is connected to nodes 1, 2, and 3 with solid black lines. Node 2 is connected to node 4 with a grey line.  Dashed blue lines encircle nodes 1, 2, and 3, and are labeled 'neighbors of node 0,' indicating these nodes are directly connected to node 0.  The text 'degree = 3' next to node 0 specifies its degree (number of connections). The right side shows the same graph, but with a peach-colored area highlighting a path from node 3 to node 4, traversing through node 2.  This highlighted path visually emphasizes a specific traversal sequence within the graph.](/assets/images/dsa/graphs/3f8979a65f4dac28.webp)

**Attributes:**

- Directed vs. undirected: in a directed graph, edges have a direction associated with them.
- Weighted vs. unweighted: in a weighted graph, edges have a weight associated with them, such as distance or cost.
- Cyclic vs. acyclic: A cyclic graph contains at least one cycle, which is a path that starts and ends at the same node.

![Image represents three different graph structures illustrating variations in graph properties.  The first graph, labeled 'directed:', shows a directed acyclic graph (DAG) with nodes numbered 0 through 4.  Node 0 has directed edges pointing to nodes 1 and 2. Node 3 has a directed edge to node 2, and node 2 has a directed edge to node 4. The second graph, labeled 'weighted:', depicts a weighted undirected graph with the same nodes (0-4) but with numerical weights (6, 12, 10, 4, 3) assigned to each edge, indicating the connection strength or cost between nodes.  The third graph, labeled 'cyclic:', displays a cyclic undirected graph with nodes 0 through 4.  This graph contains a cycle, highlighted by thicker peach-colored edges, between nodes 0, 2, and 3; the word 'cycle' is written in orange within this cycle.  All three graphs use circles to represent nodes and lines to represent edges, with arrows indicating direction in the first graph and numbers indicating weights in the second.](/assets/images/dsa/graphs/22c9c82f14918c7a.webp)

**Representations** In some problems, you might not be given the graph directly. In these situations, it’s usually necessary to create your own representation of the graph. The two most common representations to choose from are an adjacency list and an adjacency matrix.

In an **adjacency list**, the neighbors of each node are stored as a list. Adjacency lists can be implemented using a hash map, where the key represents the node, and its corresponding value represents the list of that node’s neighbors.

In an **adjacency matrix**, the graph is represented as a 2D matrix where matrix[i][j] indicates an edge between nodes i and j.

![Image represents a graph data structure illustrated in three different ways:  First, a visual representation shows five nodes (0, 1, 2, 3, 4) connected by edges, forming a tree-like structure. Node 0 is the root, connected to nodes 1 and 3. Node 3 is also connected to node 2, and node 2 is connected to node 4. Second, an adjacency list represents the same graph.  It's a table with a 'node' column (0-4) and a 'neighbors' column. Each row shows a node and a list of its directly connected neighbors. For example, node 0's neighbors are 1, 2, and 3. Third, an adjacency matrix is shown, a 5x5 grid representing the graph's connections. Rows and columns are labeled 0-4, corresponding to the nodes. A '1' at position (i, j) indicates a connection between node i and node j; a '0' indicates no direct connection.  For instance, the '1' at (0,1) shows a connection between node 0 and node 1, mirroring the visual and adjacency list representations.  The matrix is symmetric because the graph is undirected.](/assets/images/dsa/graphs/2d546fd17b52ac8c.webp)

Adjacency lists are the most common choice for most implementations. They are preferred when representing sparse graphs and when we need to iterate over all the neighbors of a node efficiently.

Adjacency matrices are preferred when representing dense graphs, and frequent checks are needed for the existence of specific edges.

**Traversals** The primary graph traversal techniques are DFS and BFS, both of which have similar use cases when they’re used on trees.

When traversing a graph, it might also be necessary to **keep track of visited nodes** using a data structure such as a hash set, to ensure each node is only visited once.

DFS is typically implemented recursively, as demonstrated in the code snippet below:

```python
def dfs(node: GraphNode, visited: Set[GraphNode]):
    visited.add(node)
    process(node)
    for neighbor in node.neighbors:
        if neighbor not in visited:
            dfs(neighbor, visited)
```

BFS is typically implemented iteratively, as demonstrated in the code snippet below:

```python
def bfs(node: GraphNode):
    visited = set()
    queue = deque([node])
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            process(node)
            for neighbor in node.neighbors:
                queue.append(neighbor)
```

Both DFS and BFS have a **time complexity** of O ( n + e ) O(n+e) O ( n + e ), where n n n denotes the number of nodes and e e e denotes the number of edges. This is because during traversal, each node is visited once, and each edge is explored once.

They both also share a **space complexity** of O ( n ) O(n) O ( n ). For DFS, this is due to the space taken up by the recursive call stack, and for BFS, it’s due to the space taken up by the queue.

## Real-world Example

**Social networks:** Users of social media sites like LinkedIn are typically represented as nodes, and connections or friendships between users are represented as edges. The graph structure allows platforms to analyze relationships, suggest new connections, and identify groups or communities within their networks.

## Chapter Outline

![Image represents a hierarchical diagram illustrating different coding patterns related to graphs.  A top-level rounded rectangle labeled 'Graphs' points downwards to two main branches: 'DFS' (Depth-First Search) and 'BFS' (Breadth-First Search).  Each of these branches contains a rounded rectangle listing associated graph problems: DFS includes 'Graph Deep Copy,' 'Count Islands,' 'Bipartite Graph Validation,' and 'Longest Increasing Path'; BFS includes 'Matrix Infection' and 'Shortest Transformation Sequence.'  Further down, dashed lines connect these main branches to two additional rounded rectangles: 'Dijkstra's Algorithm' (connected to DFS, listing 'Shortest Path') and 'Topological Sort' (connected to BFS, listing 'Prerequisites'). Finally, a central dashed line from both DFS and BFS converges to a bottom rounded rectangle labeled 'Union-Find,' which lists 'Merging Communities' and 'Connect the Dots' as associated problems.  The overall structure shows how various graph algorithms and problems are categorized under DFS, BFS, and the Union-Find pattern, with Dijkstra's Algorithm and Topological Sort being specific applications within those broader categories.](/assets/images/dsa/graphs/ae37598b8083a86b.webp)
