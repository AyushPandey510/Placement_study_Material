---
title: "Shortest Path"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Shortest Path.html"
---
Given an integer `n` representing nodes labeled from `0` to `n - 1` in an undirected graph, and an array of non-negative weighted edges, return an array where each index `i` contains the **shortest path length** from a specified start node to node `i`. If a node is unreachable, set its distance to -1.

Each edge is represented by a triplet of positive integers: the start node, the end node, and the weight of the edge.

#### Example:

![Image represents a weighted directed graph, possibly illustrating a shortest path problem or a similar graph traversal algorithm.  The graph consists of six nodes, numbered 0 through 5. Node 0, labeled 'start' in orange, is the designated starting node and is highlighted with an orange border.  The remaining nodes (1, 2, 3, 4, and 5) are represented as simple circles containing their respective numerical labels.  Edges connect the nodes, with each edge labeled with a numerical weight representing the cost or distance between the connected nodes.  Specifically, node 0 connects to node 1 (weight 5) and node 2 (weight 3). Node 1 connects to node 2 (weight 1) and node 3 (weight 4). Node 2 connects to node 4 (weight 5) and node 3 (weight 4). Node 3 connects to node 1 (weight 4). Node 5 is an isolated node, not connected to any other node in the graph.  The arrangement suggests a flow of information or traversal from the starting node (0) towards the other nodes, with the edge weights influencing the path selection in an algorithm.](/assets/images/dsa/graphs/388d4ad53f82ac2c.webp)

```python
Input: n = 6,
       edges = [
         [0, 1, 5],
         [0, 2, 3],
         [1, 2, 1],
         [1, 3, 4],
         [2, 3, 4],
         [2, 4, 5],
       ],
       start = 0
Output: [0, 4, 3, 7, 8, -1]
```

## Intuition

There are a few algorithms that can be employed to find the shortest path in a graph. Let’s consider some of our options:

- BFS works well for finding the shortest path when the graph has edges with no weight, or uniform weight across the edges, as BFS doesn’t take weight into account in its traversal strategy.
- Dijkstra’s algorithm works well for graphs with non-negative weights, as it efficiently finds the shortest path from a single source to all other nodes.
- The Bellman-Ford algorithm works well for graphs with edges that may have negative weights [1] .
- The Floyd-Warshall algorithm works well when we need to find the shortest paths between all pairs of nodes in a graph [2] .

Among these options, **Dijkstra’s algorithm** suits this problem the most since we’re dealing with a graph with non-negative weighted edges, and we need to find the shortest path from a start node to all other nodes. This algorithm uses a greedy strategy, which we’ll explore during this explanation.

Consider the undirected weighted graph below, with node 0 as the starting node.

![Image represents a weighted graph, a network of nodes (circles) connected by edges (lines).  The nodes are labeled with numbers 0 through 5. Node 0 is connected to node 1 with an edge labeled '5' and to node 2 with an edge labeled '3'. Node 1 is connected to node 2 with an edge labeled '1' and to node 3 with an edge labeled '4'. Node 2 is connected to node 3 with an edge labeled '4' and to node 4 with an edge labeled '5'. Node 3 is connected to node 4 with an edge labeled '4'. Node 5 is an isolated node, not connected to any other node in the graph.  The numbers on the edges represent weights or costs associated with traversing that connection.  The arrangement shows a somewhat clustered structure with nodes 0, 1, 2, 3, and 4 forming a connected subgraph, while node 5 remains isolated.](/assets/images/dsa/graphs/669a357b6209cd36.webp)

Initially, since we don't know any of the distances between node 0 and the other nodes, we'll set them to infinity. The only distance we do know is from the start node to itself, which is just 0:

![Image represents a weighted, undirected graph with six nodes (labeled 0 through 5) and several edges connecting them.  The edges are labeled with their corresponding weights. Node 0 connects to node 1 (weight 5) and node 2 (weight 3). Node 1 connects to node 2 (weight 1), node 3 (weight 4), and node 0 (weight 5). Node 2 connects to node 4 (weight 5) and node 3 (weight 4). Node 3 connects to node 1 (weight 4). Node 4 and node 5 are isolated nodes, not connected to any other nodes in the graph. To the right of the graph, a list named 'distances' is shown, initialized as `[0, ∞, ∞, ∞, ∞, ∞]`.  The numbers below the list (0, 1, 2, 3, 4, 5) correspond to the indices of the nodes in the graph, indicating that the list represents the distances from a starting node (likely node 0, given the initial 0 in the list) to each of the other nodes in the graph.  The symbol ∞ represents infinity, signifying that initially, the distances to nodes other than the starting node are considered unreachable.](/assets/images/dsa/graphs/46ef3dd9606b34f6.webp)

Let’s begin with the start node. Consider its immediate neighbors, nodes 1 and 2. The distances from node 0 to these nodes are 5 and 3, respectively. We don't know if these are the shortest distances from 0 to them, but they’re definitely shorter than infinity. So, let's update the distances to those nodes from node 0:

![Image represents a weighted graph illustrating a shortest path algorithm, possibly Dijkstra's algorithm.  The graph consists of six nodes (0-5), with node 0 labeled 'curr' and colored orange, indicating a starting node.  Nodes 1 and 2 are light blue, suggesting they've been visited.  The remaining nodes (3, 4, 5) are unvisited.  Edges connecting the nodes are labeled with their respective weights (1, 3, 4, 5). For instance, node 0 connects to node 1 with a weight of 5 and to node 2 with a weight of 3. Node 1 connects to node 2 with a weight of 1 and to node 3 with a weight of 4. Node 2 connects to node 4 with a weight of 5. Node 3 connects to node 1 with a weight of 4.  To the right, a distances array `[∞ ∞ ∞ ∞ ∞ ∞]` is shown, representing the initial distances from the source node (0) to all other nodes, where ∞ denotes infinity.  The array is partially updated, showing distances 5 and 3, calculated from the source node to nodes 1 and 2 respectively, indicated by light blue lines connecting the array to the corresponding nodes in the graph.  The array's index corresponds to the node number.](/assets/images/dsa/graphs/c649ec50d50518f2.webp)

Right now, the closest node to the start node is node 2, with a distance of 3. This confirms that the shortest distance to node 2 from node 0 is 3, as the alternative route through node 1 has a longer distance. Thus, we can be certain that node 2 is reached through the shortest possible path, so let’s move to it:

![Image represents a graph illustrating a shortest path algorithm, possibly Dijkstra's algorithm.  The left side shows a weighted, undirected graph with five nodes (numbered 0-4). Node 0 is greyed out, suggesting it's the starting node.  Edges connecting the nodes are labeled with their weights (e.g., the edge between nodes 1 and 2 has a weight of 1). Node 2 is highlighted in orange and labeled 'curr,' indicating it's the currently processed node. The right side displays a distances array `distances = [∞, 5, 3, ∞, ∞, ∞]`, representing the shortest distances from the starting node (0) to each node.  The array element corresponding to node 2 (index 2) shows a value of 3, highlighted in peach, indicating the shortest distance from node 0 to node 2 is 3. An upward-pointing arrow next to the array points to this value, explicitly labeling it as the 'shortest distance from start'.  The infinity symbols (∞) represent initially unknown distances, which are updated during the algorithm's execution.](/assets/images/dsa/graphs/20e5bc714a0051ce.webp)

The current node is now node 2. Keep in mind that, so far, we’ve traversed a distance of `distance[2] = 3` from node 0 to reach node 2.

The immediate unvisited neighbors of the current node are nodes 1, 3, and 4. The distances to them from the start node are 1 + 3, 4 + 3, and 5 + 3 (where the +3 accounts for the distance traveled so far). Let’s update the distance array with these distances since they are smaller than the distances currently set for them:

Right now, among the unvisited nodes, the node with the shortest distance from the start node is node 1, with a distance of 4. This means the shortest distance to node 1 from the start node is 4, since all other paths to node 1 involve traversing through distances larger than 4. So, let’s move to node 4:

![Image represents a graph traversal algorithm visualization, likely Dijkstra's algorithm.  A weighted graph is shown with nodes numbered 0 through 5, where node 1 is highlighted in orange and labeled 'curr,' indicating the current node being processed.  Edges connecting nodes represent weighted paths; for example, node 1 connects to node 3 with a weight of 4.  The weights are displayed on the edges.  Nodes 0, 2, 3, and 4 are connected, forming a subgraph, while node 5 is isolated.  To the right, an array named 'distances' is shown, representing the shortest distances from the starting node (likely node 0, though not explicitly stated).  The array initially contains values, with the second element (index 1) highlighted in peach, showing the shortest distance from the start node to node 1 (value 1). An upward arrow points to this element, labeled 'shortest distance from start,' indicating that the algorithm is updating the shortest distance to the current node (node 1).  The infinity symbol (∞) represents unreachable nodes.](/assets/images/dsa/graphs/eeb7643033fe4303.webp)

The greedy choice made is now becoming clearer:

At each step, we move to the unvisited node with the shortest known distance from the start node.

Applying this greedy choice for the rest of the graph completes Dijkstra’s algorithm, giving us an array populated with the shortest path lengths from the start node to each node:

![Image represents a weighted graph displayed alongside a distance array. The graph consists of six nodes, numbered 0 through 5, connected by weighted edges.  Node 0 connects to node 1 (weight 5) and node 2 (weight 3). Node 1 connects to node 2 (weight 1), node 3 (weight 4), and node 0 (weight 5). Node 2 connects to node 4 (weight 5) and node 3 (weight 4). Node 3 connects to node 1 (weight 4). Node 4 and node 5 are not connected to any other nodes in the graph.  To the right of the graph, a Python-style array named `distances` is shown, containing values [0, 4, 3, 7, 8, ∞].  The numbers below the array (0, 1, 2, 3, 4, 5) correspond to the node indices, indicating that the distance from node 0 to node 0 is 0, to node 1 is 4, to node 2 is 3, to node 3 is 7, to node 4 is 8, and to node 5 is infinity (∞).  The array represents the shortest path distances from node 0 to all other nodes in the graph.](/assets/images/dsa/graphs/8a80562fef94dec0.webp)

The final step is to convert all infinity values in this array to -1, indicating we weren’t able to reach that node:

![Image represents a Python list assignment. The variable `distances` is assigned a list containing six numerical values: `[0, 4, 3, 7, 8, -1]`.  These values are enclosed within square brackets `[]`, indicating a list data structure.  Below the list, smaller numbers `0, 1, 2, 3, 4, 5` are displayed, acting as indices representing the position of each element within the `distances` list.  The index 0 corresponds to the value 0, index 1 to the value 4, and so on, with index 5 corresponding to the value -1.  There is no explicit flow of information depicted; the image simply shows the assignment of values to the list variable.](/assets/images/dsa/graphs/929d8ca6eb5468d3.webp)

To implement the above strategy, we’d like an efficient way to access the unvisited node with the shortest known distance at any point in the process. We can use a **min-heap** for this, allowing us logarithmic access to the node with the minimum distance.

**Using the min-heap** To understand how we use the min-heap in Dijkstra’s algorithm, consider the following example with the start node, node 0, initially in the min-heap with its corresponding distance of 0:

![Image represents a visualization of Dijkstra's algorithm's initial state.  On the left, a weighted directed graph is shown with three nodes labeled 0, 1, and 2. Node 0 is marked as 'start'.  Edges connect node 0 to node 1 with weight 6, and node 0 to node 2 with weight 3. Node 1 connects to node 2 with weight 1. Below the graph, a distances array is shown, initialized as [0, ∞, ∞], representing the initial distances from the start node (0) to each node (0, 1, and 2 respectively, where ∞ signifies infinity). On the right, a min-heap data structure is depicted, currently containing only node 0 with a value of 0, indicated by 'min: 0:0'.  The min-heap is used to efficiently select the node with the smallest distance from the start node during the algorithm's execution.  The overall image illustrates the setup before the algorithm begins iterating and updating distances.](/assets/images/dsa/graphs/dcf78d085e2176de.webp)

Begin by popping the start node from the top of the heap and setting it to the current node. Then, add the current node’s neighbors to the min-heap with their corresponding distances from the start node, and update the distances of these neighbors:

![Image represents a step-by-step illustration of Dijkstra's algorithm using a min-heap.  The left side shows the initial state: a graph with three nodes (0, 1, 2), where node 0 (labeled 'curr' and colored orange) is the current node with a distance of 0.  Edges are weighted (6, 1, 3).  A min-heap is shown alongside, containing the initial distances: node 0 at distance 0, and nodes 1 and 2 at infinity (∞).  An arrow indicates that node 0 (with distance 0) is extracted from the min-heap, updating `curr_dist` to 0 and `curr_node` to 0. The right side depicts the state after updating the distances of node 0's neighbors. Node 1 and 2 are now colored cyan, reflecting their updated status. The distances to nodes 1 and 2 are updated to 6 and 3 respectively, reflected in the updated min-heap (6:1 and 3:2) and the `distances` array [0, 6, 3].  The arrow between the left and right sides signifies the transition between these states.](/assets/images/dsa/graphs/a360f00f58d7fc11.webp)

Repeat these two steps for each node at the top of the heap until the heap is empty:

![Image represents a step-by-step illustration of Dijkstra's algorithm, focusing on updating distances in a graph.  The left side shows the initial state: a graph with nodes 0, 1, and 2, where node 2 (colored orange and labeled 'curr') is the current node being processed.  Edges are labeled with their weights (6, 1, 3).  A min-heap data structure is shown, containing node 1 with a distance of 6 and node 2 with a distance of 3 (indicated as 'min: 3:2').  The current distance to node 2 ('curr_dist') is 3, and an array 'distances' = [0, 6, 3] represents the shortest distances from node 0 to nodes 0, 1, and 2 respectively. An arrow points from the min-heap's '3:2' element to 'curr_dist = 3' and 'curr_node = 2', indicating the extraction of the current node and its distance from the heap. The right side depicts the state after updating the distances of node 2's neighbors. Node 1 is now colored light blue, reflecting its updated status. The min-heap now contains node 1 with a distance of 4 (1+3, shown as 'min: 1+3:1') and node 2 with a distance of 6. The 'distances' array is updated to [0, 4, 3], showing the new shortest distance to node 1.  A large arrow separates the before and after states, illustrating the transition.](/assets/images/dsa/graphs/b140f1e41d1007de.webp)

![Image represents a step-by-step illustration of Dijkstra's algorithm.  The left side shows the initial state: a graph with three nodes (0, 1, 2) connected by weighted edges (6, 1, 3), with node 1 highlighted as 'curr' (current node) in orange.  Node 1 has a 'curr_dist' of 4.  A min-heap data structure is shown, containing the element '6:1', indicating a distance of 6 to node 1.  Below, a 'distances' array [0, 4, 3] represents the shortest distances found so far from a source node (not shown) to nodes 0, 1, and 2 respectively. A large arrow points to the right, indicating a transition. The right side depicts the state after processing node 1: the min-heap now contains '6:1', reflecting the updated distances. The 'distances' array is updated to [0, 4, 3], showing that the distances to nodes 0, 1, and 2 have been updated.  The text ' (no unvisited neighbors)' indicates that all neighbors of the current node have been processed.  The overall image demonstrates how Dijkstra's algorithm iteratively selects the node with the minimum distance from the min-heap, updates the distances of its neighbors, and repeats until all nodes are processed.](/assets/images/dsa/graphs/48cf790bc91bb9e0.webp)

![Image represents a step in a graph traversal algorithm, likely Dijkstra's algorithm.  The left side shows a weighted graph with three nodes (0, 1, and 2) and their connecting edges labeled with weights (6, 1, and 3). Node 1 is highlighted in orange and labeled 'curr,' indicating it's the currently selected node. A red curved arrow points to node 1, labeled 'previously visited,' suggesting a process of iteratively visiting nodes.  Below the graph, 'curr_dist = 6' shows the current distance from the source node to node 1, and 'distances = [0 4 3]' represents an array storing the shortest distances from the source to each node (0, 1, and 2 respectively). The right side depicts a min-heap data structure labeled 'min_heap,' containing the element '6:1' (distance:node), signifying that node 1 with a distance of 6 is the element with the minimum distance currently in the heap. An orange arrow points from this element in the min-heap to 'curr_dist = 6' and 'curr_node = 1,' indicating that the node and its distance are extracted from the min-heap for processing.  The overall image illustrates the process of selecting the node with the minimum distance from a min-heap and updating relevant variables.](/assets/images/dsa/graphs/50dd8b60331a8c86.webp)

As we can see, we encounter an issue: **we’re revisiting node 1**. The only difference is that this time, we’re visiting it at a larger distance (`curr_dist = 6`) from the start than the recorded distance (4). We can avoid this situation with the following if-statement:

`if curr_dist > distances[curr_node]: continue`

This check allows us to avoid using an additional data structure to keep track of visited nodes.

**Why does the greedy approach work?** Before reading this section, it’s worth reviewing the *Greedy* chapter if you aren’t familiar with greedy algorithms.

Dijkstra's algorithm is considered greedy because, at each step, it selects the unvisited node with the shortest known distance from the start node, based on the assumption that this distance is the shortest possible path to that node. This choice is made as a local optimum, with the belief that it will lead to the global optima: the shortest path to all nodes. Can we always guarantee that this assumption is true? Consider the following graph, where the current node is node 0:

![Image represents a weighted graph illustrating a shortest path algorithm.  The graph consists of five nodes, numbered 0 through 4. Node 0, highlighted in orange and labeled 'curr,' represents the current node being processed. Nodes 1, 2, 3, and 4 are connected to node 0 with weighted edges; the weight of each edge is indicated by a number next to the connecting line (10, 3, 6, and 7 respectively). Dashed lines connect nodes 1, 2, 3, and 4 to points above them, suggesting further connections not explicitly shown.  To the right, a list labeled 'dist' shows a partial array, likely representing the shortest distances from node 0 to other nodes in the graph. The array starts with 0 (the distance from 0 to itself), followed by 10, 3, 6, and 7, corresponding to the weights of the edges connecting node 0 to nodes 1, 2, 3, and 4 respectively.  The ellipsis (...) indicates that the array continues beyond the displayed elements.  The numbers below the 'dist' array (0, 1, 2, 3, 4) likely represent the indices of the distances within the array, corresponding to the node numbers.](/assets/images/dsa/graphs/b695db5d3aa981be.webp)

The node with the shortest known distance from the start node is node 2, with a distance of 3. We assume this is the shortest distance to node 2, and choose node 2 as the local optimum. Here’s a question we could ask here regarding the validity of this choice: is it possible to find a path with a distance less than 3 to another neighboring node, making node 2 no longer the neighbor with the shortest distance from the start node?

The answer is no. This is because we have to pass through one of these neighboring nodes to find any other paths, which would require us to add a distance of at least 3 to our total distance traversed from the start node. To reduce this traversed distance, we would need to encounter negatively weighted edges in the graph, which we know isn’t possible in this graph.

This analysis also demonstrates that **Dijkstra’s algorithm is only applicable when the graph has no edges with negative weights**.

## Implementation

```python
from typing import List
from collections import defaultdict
import heapq
    
def shortest_path(n: int, edges: List[int], start: int) -> List[int]:
    graph = defaultdict(list)
    distances = [float('inf')] * n
    distances[start] = 0
    # Represent the graph as an adjacency list.
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))
    min_heap = [(0, start)]  # (distance, node)
    # Use Dijkstra's algorithm to find the shortest path between the start node
    # and all other nodes.
    while min_heap:
        curr_dist, curr_node = heapq.heappop(min_heap)
        # If the current distance to this node is greater than the recorded
        # distance, we've already found the shortest distance to this node.
        if curr_dist > distances[curr_node]:
            continue
        # Update the distances of the neighboring nodes.
        for neighbor, weight in graph[curr_node]:
            neighbor_dist = curr_dist + weight
            # Only update the distance if we find a shorter path to this
            # neighbor.
            if neighbor_dist < distances[neighbor]:
                distances[neighbor] = neighbor_dist
                heapq.heappush(min_heap, (neighbor_dist, neighbor))
    # Convert all infinity values to -1, representing unreachable nodes.
    return [-1 if dist == float('inf') else dist for dist in distances]
```

### Complexity Analysis

**Time complexity:** The time complexity of the `shortest_path` is O ( ( n + e ) log ⁡ ( n ) ) O((n+e)\log(n)) O (( n + e ) lo g ( n )), where e e e represents the number of edges. Here’s why:

- Creating the adjacency list takes O ( e ) O(e) O ( e ) time.
- Dijkstra's algorithm traverses up to all n n n nodes and explores each edge of the graph. To access each node, we pop it from the heap, and for each edge, up to one node is pushed to the heap (when we process each node’s neighbors). Since each push and pop operation takes O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) time, the time complexity of Dijkstra’s algorithm is O ( ( n + e ) log ⁡ ( n ) ) O((n+e)\log(n)) O (( n + e ) lo g ( n )) .

Therefore, the overall time complexity is O ( e ) + O ( ( n + e ) log ⁡ ( n ) ) = O ( ( n + e ) log ⁡ ( n ) ) O(e)+O((n+e)\log(n))=O((n+e)\log(n)) O ( e ) + O (( n + e ) lo g ( n )) = O (( n + e ) lo g ( n )).

**Space complexity:** The space complexity is O ( n + e ) O(n+e) O ( n + e ), since the adjacency list takes up O ( n + e ) O(n+e) O ( n + e ) space, whereas the `distances` array and `min_heap` take up O ( n ) O(n) O ( n ) space.
