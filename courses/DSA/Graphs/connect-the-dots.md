---
title: "Connect The Dots"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Connect the Dots.html"
---
Given a set of points on a plane, determine the **minimum cost to connect all these points**.

The cost of connecting two points is equal to the **Manhattan distance** between them, which is calculated as `|x1 - x2| + |y1 - y2|` for two points `(x1, y1)` and `(x2, y2)`.

#### Example:

![Image represents a transformation of a set of points in a Cartesian coordinate system.  The left side shows a scatter plot with five points located at approximately (1,1), (3,2), (4,3), (2,6), and (7,1).  These points are unconnected. A large, bold arrow points to the right, indicating a transformation. The right side displays the same five points, but now connected to a central point located at approximately (3,2).  The lengths of the lines connecting the central point to each of the other points are labeled with numerical values: 3, 5, 2, and 5.  The x and y axes are labeled on both sides, ranging from 0 to 7. The transformation visually demonstrates a change from an unorganized set of points to a structured arrangement radiating from a central node, with the connecting lines representing distances or weights between the points.](/assets/images/dsa/graphs/b541ff6416b78d6e.webp)

```python
Input: points = [[1, 1], [2, 6], [3, 2], [4, 3], [7, 1]]
Output: 15
```

#### Constraints:

- There will be at least 2 points on the plane.

## Intuition

Let's treat this problem as a graph problem, imagining each point as a node, and the cost of connecting any two points as the weight of an edge between those nodes.

The goal is to connect all nodes (points) in such a way that the total cost is minimized. This is essentially the **minimum spanning tree** (MST) problem:

The MST of a weighted graph is a way to connect all points in the graph, ensuring each point is reachable from any other point while minimizing the total weight of the connections.

There are two main algorithms that are used to find the MST of a graph:

- Kruskal's algorithm
- Prim's algorithm

In this explanation, we'll break down Kruskal's algorithm since it uses a data structure we've already discussed in this chapter: **Union-Find**.

**Kruskal's algorithm** Kruskal's algorithm is a greedy method for finding the MST. It essentially builds the MST by connecting nodes with the lowest-weighted edges first while skipping any edges that could cause a cycle.

To do this, we first need to identify all the possible edges and sort them by their Manhattan distance:

![Image represents a weighted, undirected graph visualized on a Cartesian coordinate system with x and y axes ranging from 0 to 7.  Four nodes are plotted at coordinates (1,1), (2,6), (3,2), and (7,1).  A fifth node is located at approximately (3.5, 2.5).  Edges connect these nodes, with each edge labeled with a numerical weight representing the distance or cost between the connected nodes. For instance, the edge between (1,1) and (2,6) has a weight of 6.  The edge between (1,1) and (3,2) has a weight of 3. The edge between (3,2) and (7,1) has a weight of 5.  The edge between (1,1) and (7,1) has a weight of 6. The edge between (2,6) and (7,1) has a weight of 10.  To the right of the graph, a list of node pairs is presented, each pair connected by an arrow indicating the direction of traversal, and followed by the weight of the edge connecting those nodes.  This list essentially reiterates the edge weights and connections shown graphically in the main diagram.](/assets/images/dsa/graphs/20baeca252335b05.webp)

Now, let's implement Kruskal's algorithm. Start by including the lowest weighted edge in the MST, which is the edge from (3, 2) to (4, 3):

![Image represents a Cartesian coordinate system with x and y axes ranging from 0 to 7.  Several points are plotted on this plane: (1,1), (1,6), (3,2), (4,3), and (7,1). A green line connects points (3,2) and (4,3).  To the right of the graph, a list of coordinate pairs is presented, each pair representing a starting and ending point.  An arrow points from each pair to a numerical value, seemingly representing a calculated distance or weight between the corresponding points on the graph. For example, the pair (3,2) to (4,3) maps to the value '2', which might correspond to the length of the green line segment.  Other pairs, such as (1,1) to (3,2), map to different numerical values (in this case, '3'), suggesting a different calculation method or metric is used for each pair.  The numerical values appear to be associated with the distances or relationships between the points, possibly representing edge weights in a graph data structure.](/assets/images/dsa/graphs/f83da93089b9874a.webp)

Next, add the next lowest weighted edge, which is the edge from (1, 1) to (3, 2):

![Image represents a Cartesian coordinate system with x and y axes ranging from 0 to 7.  Several points are plotted on this plane: (1,1), (2,6), (3,2), (4,3), and (7,1).  Two line segments are drawn: a green line connecting (1,1) and (3,2), labeled '3', and a grey line connecting (3,2) and (4,3), labeled '2'.  To the right of the graph, a list of point pairs is presented, each pair representing a connection between two points on the graph.  An arrow follows each pair, pointing to a numerical value.  These values seem to represent a calculated distance or weight associated with the connection between the respective points.  For instance, the pair (1,1) to (3,2) is followed by an arrow pointing to '3', corresponding to the green line's label.  The point (1,1) is highlighted with a light green circle.  The numerical values following the arrows appear to be the result of a calculation or function applied to the coordinates of the connected points.](/assets/images/dsa/graphs/5244671b0840ca44.webp)

Notice that adding the next edge from (1, 1) to (4, 3) will cause a cycle. Edges that cause cycles are avoided in an MST because doing so implies we're connecting two points that are already connected. So, let's skip this edge:

![Image represents a Cartesian coordinate system with x and y axes ranging from 0 to 7.  Several points are plotted on this plane: (1,1), (3,2), (4,3), (2,6), and (7,1).  These points are connected by grey lines forming a polygon.  Additionally, a dashed red line connects (1,1) and (4,3), with the value '5' written in red along this line.  To the right of the graph, a list shows pairs of points from the graph, indicating the coordinates of the starting and ending points of each line segment.  An arrow points from each pair to a numerical value representing the distance or weight associated with that segment.  The value '5' is highlighted in pink and labeled as 'forms a cycle,' suggesting a closed loop or cycle is formed by some of the connections.  The numbers next to the points on the graph (1, 2, 3) seem to be labels or annotations, not coordinates.](/assets/images/dsa/graphs/2a62fcec670976c6.webp)

Continuing this process until all points are connected gives us the MST:

![Image represents a graph overlaid on a Cartesian coordinate system with x and y axes ranging from 0 to 7.  Four points are plotted: (1,1), (3,2), (4,3), and (7,1).  Lines connect these points, forming a network.  Each line is labeled with a numerical weight representing the distance or cost between the connected points. For instance, the line between (1,1) and (3,2) is labeled '3'.  To the right of the graph, a list details the connections between the points using coordinate pairs, indicating the 'from' and 'to' points of each connection.  An arrow follows each pair, pointing to the corresponding weight from the graph.  The weights are represented by numbers, with some connections having darker arrows (indicating stronger or more significant connections) and others lighter (suggesting weaker or less significant connections).  The coordinate pairs and their associated weights illustrate a weighted graph, likely representing a distance matrix or a cost function between nodes in a network.](/assets/images/dsa/graphs/2c52e87c016b71ba.webp)

We'll know that all points are connected once we've added a total of n - 1 edges to the MST, because this is the least number of edges needed to connect n points without any cycles. To attain the cost of this MST, we just need to keep track of the Manhattan cost of each edge we add to the MST.

Now that we have a strategy to find the MST of a set of points, we just need a way to determine when connecting two points leads to a cycle.

**Avoiding cycles** A cycle is formed when we add an edge to nodes that are already connected in some way. Consider the following set of points, where the group of points to the left are connected, and the group of points to the right are connected:

![Image represents a Cartesian coordinate system graph displaying two distinct, unconnected line segments.  The x-axis ranges from 0 to approximately 8, and the y-axis ranges from 0 to 6. The first line segment connects the points (1, 5), (2, 2), and (3, 1). The second line segment connects the points (7.5, 1), (8.5, 2), and (9.5, 5). Both segments are composed of straight lines connecting the specified points, represented by solid black dots.  The x and y axes are labeled, indicating the independent and dependent variables, respectively.  No other labels, text, URLs, or parameters are present within the image.](/assets/images/dsa/graphs/02508c6e78cff9fe.webp)

Connecting any two points in the same group causes a cycle, and connecting two points from two separate groups will result in both groups merging into one:

![Image represents two Cartesian coordinate graphs side-by-side.  Both graphs share the same x-axis ranging from 0 to 10 and a y-axis ranging from 0 to 6.  The left graph displays a series of connected black points forming a jagged line, primarily gray, with coordinates approximately (1,5), (2,2), (3,1), (8,1), and (9,2), (10,5). A dashed red line connects (1,5) to (2,2), labeled 'connect (1,5) to (2,2) → cycle' indicating a cyclical connection between these two points. The right graph shows a similar set of black points connected by a gray line with coordinates approximately (1,5), (2,2), (3,1), (8,1), and (9,2), (10,5). However, in this graph, a solid green line connects (3,1) to (8,1), labeled 'connect (3,1) to (8,1),' illustrating a direct connection between these points.  Both graphs visually represent different ways to connect points, highlighting the concepts of cycles and direct connections within a data structure or network.](/assets/images/dsa/graphs/3ea0f02de2dfb53a.webp)

What would be useful here is a way to determine if two points belong to the same group, and a way to merge two groups together. The **Union-Find** data structure is perfect for this.

We can use the `union` function to connect two points together.

- If the two points belong to two separate groups, union should merge those groups and return true.
- Otherwise, if they belong to the same group, union should return false.

This way, we can use this boolean return value as a way to determine if attempting to connect two points causes a cycle.

If you're not familiar with Union-Find, study the solution to the *Merging Communities* problem.

## Implementation

In this implementation, we'll identify each point using their index in the points array. This means that for `n` points, each point is represented by an index from 0 to `n - 1`. By doing this, we can set up a Union-Find data structure with a capacity of `n` so that there are `n` groups initially, with each group containing one of the `n` points.

```python
from typing import List
    
def connect_the_dots(points: List[List[int]]) -> int:
    n = len(points)
    # Create and populate a list of all possible edges.
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            # Manhattan distance.
            cost = (abs(points[i][0] - points[j][0]) +
                    abs(points[i][1] - points[j][1]))
            edges.append((cost, i, j))
    # Sort the edges by their cost in ascending order.
    edges.sort()
    uf = UnionFind(n)
    total_cost = edges_added = 0
    # Use Kruskal's algorithm to create the MST and identify its minimum cost.
    for cost, p1, p2 in edges:
        # If the points are not already connected (i.e. their representatives are
        # not the same), connect them, and add the cost to the total cost.
        if uf.union(p1, p2):
            total_cost += cost
            edges_added += 1
            # If n - 1 edges have been added to the MST, the MST is complete.
            if edges_added == n - 1:
                return total_cost
```

The Union-Find data structure remains the same as the implementation provided in *Merging Communities*, with a slight modification made to the `union` function, adding a boolean return value to it.

```python
class UnionFind:
    def __init__(self, size):
        self.parent = [i for i in range(size)]
        self.size = [1] * size

    def union(self, x, y) -> bool:
        rep_x, rep_y = self.find(x), self.find(y)
        if rep_x != rep_y:
            if self.size[rep_x] > self.size[rep_y]:
                self.parent[rep_y] = rep_x
                self.size[rep_x] += self.size[rep_y]
            else:
                self.parent[rep_x] = rep_y
                self.size[rep_y] += self.size[rep_x]
            # Return True if both groups were merged.
            return True
        # Return False if the points belong to the same group.
        return False

    def find(self, x) -> int:
        if x == self.parent[x]:
            return x
        self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
```

### Complexity Analysis

**Time complexity:** The time complexity of the `connect_the_dots` is O ( n 2 log ⁡ ( n ) ) O(n^2\log(n)) O ( n 2 lo g ( n )), where n n n denotes the length of the points array, and n 2 n^2 n 2 is the number of edges in the `edges` array, since we consider all possible pairs of points to form edges. Here's why:

- Sorting n 2 n^2 n 2 edges takes O ( n 2 log ⁡ ( n 2 ) ) O(n^2\log(n^2)) O ( n 2 lo g ( n 2 )) time, which can be simplified to O ( n 2 log ⁡ ( n ) ) O(n^2\log(n)) O ( n 2 lo g ( n )) .
- We perform up to one union operation for each edge, with each union taking amortized O ( 1 ) O(1) O ( 1 ) time, resulting in the union operations contributing amortized O ( n 2 ) O(n^2) O ( n 2 ) time.

Therefore, the overall time complexity is O ( n 2 + n 2 log ⁡ ( n ) ) = O ( n 2 log ⁡ ( n ) ) O(n^2+n^2\log(n))=O(n^2\log(n)) O ( n 2 + n 2 lo g ( n )) = O ( n 2 lo g ( n )).

**Space complexity:** The space complexity is O ( n 2 ) O(n^2) O ( n 2 ) due to the space taken up by the `edges` list. In addition, the `UnionFind` data structure takes up O ( n ) O(n) O ( n ) space.
