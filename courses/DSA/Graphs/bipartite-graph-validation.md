---
title: "Bipartite Graph Validation"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Bipartite Graph Validation.html"
---
Given an undirected graph, determine if it's bipartite. A graph is bipartite if the nodes can be colored in one of two colors, so that **no two adjacent nodes are the same color**.

The input is presented as an adjacency list, where `graph[i]` is a list of all nodes adjacent to node `i`.

#### Example:

![Image represents a graph, specifically a cycle graph of five nodes (vertices) arranged in a circular pattern.  Nodes 0, 2, and 3 are depicted with light-blue circles and have a light-blue outline, while nodes 1 and 4 are shown with light-orange circles and an orange outline.  Each node contains a numerical label (0 through 4).  Undirected edges (lines) connect node 0 to node 1, node 1 to node 2, node 2 to node 3, node 3 to node 4, and node 4 back to node 0, forming a closed loop.  No other connections exist between the nodes. The color-coding of the nodes might represent a classification or grouping, with nodes 1 and 4 belonging to one group and nodes 0, 2, and 3 to another, although the specific meaning of this color distinction is not explicitly provided in the image itself.](/assets/images/dsa/graphs/4f4d3f262682c1a0.webp)

```python
Input: graph = [[1, 4], [0, 2], [1], [4], [0, 3]]
Output: True
```

## Intuition

Before diving into a solution, let’s first understand what makes a graph bipartite. If the nodes of a graph can be divided into two distinct sets, with the edges only running between nodes from different sets, then the graph is bipartite. We can visually rearrange the nodes of the following graph to demonstrate this:

![Image represents a graph transformation illustrating a partitioning or grouping of nodes.  The left side shows a single, connected graph with five nodes (0, 1, 2, 3, 4) arranged in a pentagon shape, with each node connected to its adjacent neighbors. A thick arrow points to the right, indicating a transformation. The right side displays the same five nodes partitioned into two sets, labeled 'set 1:' and 'set 2:'.  Nodes 0, 2, and 3 are in 'set 1:' and are depicted with light-blue circles. Nodes 1 and 4 are in 'set 2:' and are shown as light-orange circles.  Connections between nodes are maintained, but now edges connect nodes across the two sets. Specifically, node 0 connects to node 1, node 0 connects to node 4, node 2 connects to node 1, and node 3 connects to node 4.  The transformation demonstrates how a single graph can be divided into subsets while preserving some connectivity between the subsets.](/assets/images/dsa/graphs/5e89580214343ec3.webp)

With a graph that isn’t bipartite, it’s impossible to arrange the nodes this way without an edge existing between two nodes of the same set:

![Image represents a diagram illustrating a graph-partitioning problem.  The leftmost element shows a pentagon-shaped graph with nodes labeled 0 through 4, connected in a cyclical manner.  Two larger sections on the right depict attempts to partition this pentagon's nodes into two sets, labeled 'set 1' and 'set 2'.  Nodes in 'set 1' are light blue, and nodes in 'set 2' are light orange.  Thick black arrows point from the pentagon to these two bipartite graph attempts. The top right bipartite graph shows a connection between nodes 2 (set 1) and 3 (set 1), indicated by a red line, highlighting an edge between two nodes of the same set. The bottom right bipartite graph similarly shows a connection between nodes 4 (set 2) and 3 (set 2), also indicated by a red line, again demonstrating an edge between two nodes of the same set.  A dashed red curve connects these problematic edges, with accompanying red text stating, 'no way to avoid an edge between two nodes of the same set,' indicating the impossibility of perfectly partitioning this specific graph into two sets without violating the constraint of no intra-set edges.](/assets/images/dsa/graphs/9e0698839129a99f.webp)

To determine if a graph is bipartite, we can use graph coloring, where we attempt to color one set of nodes with one color, and the other set of nodes with another color, while ensuring no adjacent nodes share the same color. Let’s explore this idea.

**Graph coloring** Let's use blue and orange in our coloring process. One potential strategy is: **for each node we color blue, color all of its neighbors orange, and vice versa**. Most traversal algorithms allow us to color neighboring nodes in this way. In this explanation, we use **DFS**.

Let’s try applying this coloring process to the example below and see how it works:

![Image represents a graph, specifically a cycle graph or ring graph, consisting of five nodes (vertices) numbered 0 through 4 arranged in a circular pattern.  Each node is represented by a circle containing its numerical label.  Straight lines connect each node to its immediate neighbors, forming a closed loop.  Node 0 is connected to node 1, node 1 is connected to node 2, node 2 is connected to node 3, node 3 is connected to node 4, and node 4 is connected back to node 0, completing the cycle.  There are no other connections or directional arrows present; the connections are undirected, implying a symmetrical relationship between connected nodes.  No additional information, such as URLs or parameters, is included within the image.](/assets/images/dsa/graphs/266373a59e4fbbf6.webp)

Start by coloring node 0 blue:

![Image represents a graph data structure, specifically a simple undirected graph, depicted as a pentagon.  Five nodes, labeled numerically as 0, 1, 2, 3, and 4, are arranged in a circular pattern, connected by straight lines representing edges.  Node 0 is highlighted with a light blue outline, and a small rectangular box labeled 'node' points to it with an arrow, indicating that the circles represent nodes in the graph.  The edges connect node 0 to node 1, node 1 to node 2, node 2 to node 3, node 3 to node 4, and node 4 back to node 0, forming a closed loop. No direction is indicated on the edges, signifying an undirected relationship between the connected nodes.  No additional information, such as weights or labels on the edges, is present.](/assets/images/dsa/graphs/07aa39ba0612154c.webp)

Using DFS, we explore the neighbors of node 0, starting with node 1. All of its neighbors need to be colored orange, so let’s make a DFS call to node 1 to color it orange:

![Image represents a simple graph, specifically a cycle graph with five nodes.  The nodes are represented by circles, each containing a numerical label (0, 1, 2, 3, and 4). Node 0 is highlighted with a light blue border, and node 1 is highlighted with a light orange border.  The nodes are connected by straight lines representing edges, forming a closed loop.  The connections are: node 0 connects to node 1; node 1 connects to node 2; node 2 connects to node 3; node 3 connects to node 4; and node 4 connects to node 0.  A rectangular box labeled 'node' points with an arrow to node 1, indicating that the circles are referred to as nodes within the context of the diagram. No other information, such as URLs or parameters, is present in the image.](/assets/images/dsa/graphs/464728d147a21c86.webp)

Let’s continue doing this for the next few nodes in the DFS process:

![Image represents a step-by-step process demonstrating a graph coloring algorithm.  The initial state shows a pentagon-shaped graph with five nodes (0, 1, 2, 3, 4) connected by edges. Nodes 0 and 2 are colored light blue, node 1 and 3 are colored light orange, and node 4 is uncolored (black). An arrow points from a gray box labeled 'node' to node 2, indicating a selection or assignment. The next stage shows the same graph, but now node 2 is colored light blue, and node 3 is colored light orange, with an arrow pointing from a 'node' box to node 3.  The final stage highlights nodes 0 and 4, both colored light blue, within a dashed gray oval, with a red curved arrow pointing to the oval and labeled 'same color,' indicating that these nodes share the same color.  The overall process illustrates a coloring algorithm iteratively assigning colors to nodes, aiming for nodes connected by edges to have different colors.](/assets/images/dsa/graphs/6db7e6c1955d2497.webp)

Above, we encountered an issue. We needed to color node 4 blue, but one of node 4’s neighbors, node 0, is also colored blue. This means the graph cannot be colored using our graph coloring strategy. In other words, the graph is not bipartite.

We now have a strategy to confirm if a graph is bipartite using the two-coloring technique. But how can we be sure that it always works? We’ve been coloring adjacent nodes in alternating colors from the beginning of the DFS. This means if we encounter a situation where two adjacent nodes are the same color, it means there’s no way to color the graph differently, since we’ve been following the rule of using different colors for neighboring nodes all along.

**Handling multiple components** Keep in mind the input isn't necessarily a graph that's fully connected. It could be a graph with multiple components, such as this:

![Image represents two separate graphs, each composed of nodes and edges. The first graph is a square, with four nodes labeled 0, 1, 2, and 3.  Node 0 is connected to node 1 via a single edge, node 1 is connected to node 3, node 3 is connected to node 2, and node 2 is connected to node 0, forming a closed loop.  The second graph is a simple line graph with two nodes, labeled 4 and 5, connected by a single edge.  Both graphs are visually distinct and unconnected to each other; they are presented side-by-side without any implied relationship or data flow between them.  The nodes are represented as circles containing numerical labels, and the edges are represented as straight lines connecting the nodes.](/assets/images/dsa/graphs/61ebeaf7ff380eeb.webp)

As such, we need to ensure we color all components of the graph by calling DFS on every uncolored node:

![Image represents two separate depictions of Depth-First Search (DFS) traversal on two different graphs.  The left side, labeled 'dfs(0):', shows a graph with four nodes (0, 1, 2, 3) connected to form a square. Node 0 (light blue circle) is connected to node 1 (light orange circle), node 1 is connected to node 3 (light blue circle), node 3 is connected to node 2 (light orange circle), and node 2 is connected to node 0.  The right side, labeled 'dfs(4):', shows a simpler graph with two nodes (4 and 5), both light blue and light orange respectively, connected by a single edge.  The labels 'dfs(0):' and 'dfs(4):' indicate that the DFS algorithm is starting at node 0 in the first graph and node 4 in the second graph.  The color-coding (light blue and light orange) likely represents a distinction in node visitation order or other properties within the DFS algorithm, though the specific meaning isn't explicitly defined in the image itself.](/assets/images/dsa/graphs/87bad44a5ff4e16d.webp)

If we can confirm that all components can be colored using two colors, the graph is bipartite. However, if any of these components cannot be colored this way, the graph is not bipartite.

## Implementation

In this implementation, we color the nodes blue and orange using the numbers 1 and -1 to represent these colors, respectively. To keep track of each node's color, we use an array called colors, initialized with all 0s, where 0 represents an unvisited node. As we explore the graph using DFS, we update the colors array by setting each node to either 1 (blue) or -1 (orange).

```python
def bipartite_graph_validation(graph: List[List[int]]) -> bool:
    colors = [0] * len(graph)
    # Determine if each graph component is bipartite.
    for i in range(len(graph)):
        if colors[i] == 0 and not dfs(i, 1, graph, colors):
           return False
    return True
    
def dfs(node: int, color: int, graph: List[List[int]], colors: List[int]) -> bool:
    colors[node] = color
    for neighbor in graph[node]:
        # If the current neighbor has the same color as the current node, the graph is
        # not bipartite.
        if colors[neighbor] == color:
            return False
        # If the current neighbor is not colored, color it with the other color and
        # continue the DFS.
        if colors[neighbor] == 0 and not dfs(neighbor, -color, graph, colors):
            return False
    return True
```

### Complexity Analysis

**Time complexity:** The time complexity of `bipartite_graph_validation` is O ( n + e ) O(n+e) O ( n + e ) where n n n denotes the number of nodes and e e e denotes the number of edges. This is because we explore all nodes in the graph and traverse across e e e edges during DFS.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as n n n. In addition, the colors array also contributes O ( n ) O(n) O ( n ) space.
