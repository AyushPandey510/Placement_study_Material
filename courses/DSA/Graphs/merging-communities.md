---
title: "Merging Communities"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Merging Communities.html"
---
There are `n` people numbered from `0` to `n - 1` , with each person initially belonging to a separate community. When two people from different communities connect, their communities merge into a single community.

Your goal is to write two functions:

- `connect(x: int, y: int) -> None`: Connects person `x` with person `y` and merges their communities.
- `get_community_size(x: int) -> int`: Returns the size of the community which person `x` belongs to.

#### Example:

![Image represents a visualization of a graph's evolution and community size calculations.  The image is divided into five sections. The first two sections show the `connect(x, y)` function calls, visually represented by numbered nodes (0-4) within circles.  Lines connecting the nodes indicate the creation of edges between them.  `connect(0, 1)` shows a line connecting node 0 and node 1. `connect(1, 2)` adds a line connecting node 1 and node 2. The third section displays the result of `get_community_size(3)`, which returns 1, indicating node 3 is in a community of size one. The fourth section shows the result of `get_community_size(0)`, returning 3, indicating node 0 belongs to a community of size three (nodes 0, 1, and 2). The fifth section shows `connect(3, 4)`, adding a connection between node 3 and node 4. Finally, `get_community_size(4)` returns 2, showing that nodes 3 and 4 now form a community of size two.  The arrangement demonstrates how adding connections (`connect`) affects the community sizes (`get_community_size`), illustrating a fundamental concept in graph theory and network analysis.](/assets/images/dsa/graphs/a883e59902325785.webp)

```python
Input: n = 5,
       [
         connect(0, 1),
         connect(1, 2),
         get_community_size(3),
         get_community_size(0),
         connect(3, 4),
         get_community_size(4),
       ]
Output: [1, 3, 2]
```

## Intuition

In this problem, we start with `n` individuals, each in their own separate community. As we connect pairs of individuals, their respective communities merge. The challenge is to efficiently manage these connections and quickly determine the size of the community for any given individual.

This is where the **Union-Find** data structure, also known as the Disjoint Set Union (DSU) data structure, comes in. Union-Find consists of two operations:

- **Union**: takes two elements from different sets and makes them part of the same set.
- **Find**: determines what set an element belongs to.

In the context of this problem, the `union` operation can be used to merge the communities of two people, while the `find` operation can be used to determine which community a person belongs to. To make this work, we need a way to represent each community. For example, let’s say there are 5 people, with persons 0 and 1 in one community, and persons 2, 3, and 4 in another:

![Image represents two distinct graphs.  The left graph is a linear graph, depicted with a light blue background, containing two nodes labeled '0' and '1'.  Node '0' is positioned above node '1', and an implied connection exists between them, suggesting a sequential or directional relationship. The right graph is a triangular graph, filled with a light purple background, consisting of three nodes at the vertices of the triangle labeled '2', '3', and '4'. Node '4' is positioned at the base of the triangle, while nodes '2' and '3' are at the top corners.  Implied connections exist between all three nodes, indicating a mutual or interconnected relationship. The two graphs are presented side-by-side for comparison, highlighting the difference in their structure and the potential implications for data flow or processing within a coding context.](/assets/images/dsa/graphs/6592c7f835dea2db.webp)

One way to distinguish between them is to designate a representative for each community. Let's assign person 0 as the representative of the left community, and person 2 as the representative of the right community. We can represent these communities as a graph, where each community is a connected component, and each person in a community points to their representative:

![Image represents two distinct directed acyclic graphs (DAGs).  The left DAG, highlighted in light blue, is a simple linear graph with two nodes labeled '0' and '1'.  Node '1' has a directed edge pointing towards node '0', indicating a dependency where '0' depends on '1'.  Each node is encircled and numbered with a small circle containing the same number as the node itself. The right DAG, highlighted in light purple, is a triangular graph with three nodes labeled '2', '3', and '4'. Node '2' receives directed edges from both nodes '3' and '4', signifying that '2' depends on both '3' and '4'.  Node '3' has a directed edge pointing to node '2', and node '4' also has a directed edge pointing to node '2'.  Similar to the left DAG, each node is encircled and numbered.  The two DAGs are presented side-by-side for comparison, illustrating different dependency structures within a system.](/assets/images/dsa/graphs/4e8206aa5d595bd5.webp)

This can be reflected using a parent array, where `parent[i]` stores the parent of person `i`. This parent array is discussed later.

Now that we have a way to represent communities, let’s discuss how the `union` and `find` functions would work in more detail.

**Union** Consider the previous example of 5 people. Let’s say we want to connect persons 1 and 4 (i.e., `union(1, 4)`):

![Image represents a directed graph illustrating a union operation within a data structure, likely a disjoint-set data structure or similar.  The graph contains five nodes, each represented by a circle containing a numerical label (0, 1, 2, 3, and 4).  Arrows indicate the direction of connections between nodes. Node 3 points to node 2, and node 1 points to node 0.  Node 4 points to node 2.  Nodes 1 and 4 are enclosed within a dashed orange oval, labeled with the text 'union(1, 4):' in orange, indicating that a union operation is being performed on these two nodes. This operation likely merges the sets containing nodes 1 and 4, resulting in a change to the overall structure of the data structure, potentially affecting the parent-child relationships between nodes.  The resulting structure after the union operation is not explicitly shown, but it would involve a change in the connections between nodes 1, 2, and 4.](/assets/images/dsa/graphs/9bf484630a25cae2.webp)

We first need to identify their representatives so we know which communities these two people belong to. We can use the `find` function for this, which will be discussed later:

![Image represents a diagram illustrating a find operation within a data structure, likely a disjoint-set data structure or similar.  The diagram shows two separate components. The left component features a node labeled '1' connected by an upward-pointing arrow to a node labeled '0' which is highlighted in orange.  Next to this connection, the text 'rep_x = find(1) = 0' indicates that a find operation on element '1' returns the representative element '0'. The right component shows a node labeled '4' connected by an upward-pointing arrow to a node labeled '2', also highlighted in orange.  A rightward arrow connects node '2' to node '3'.  The text 'rep_y = find(4) = 2' indicates that a find operation on element '4' returns the representative element '2'.  The arrows represent the path taken during the find operation, ultimately leading to the representative element for each set.  The orange highlighting suggests that nodes '0' and '2' are the root or representative elements of their respective sets.](/assets/images/dsa/graphs/b7f376eaa780bb7b.webp)

Before merging these communities, we need to pick one of the two current representatives as the representative of the merged community. For now, let’s just pick person 0.

From here, one strategy is to connect everyone in the second community directly to person 0:

![Image represents a directed acyclic graph (DAG) illustrating a data flow or dependency structure.  The graph features a central node labeled 'θ' (theta), depicted as a larger circle with an orange border and a light beige fill, representing a final result or aggregated output. Four smaller, circular nodes labeled '1', '2', '3', and '4' are connected to the central node 'θ' via directed edges (arrows).  These arrows point towards 'θ', indicating that the data or results from nodes '1', '2', '3', and '4' are inputs or contributing factors to the computation or aggregation performed at node 'θ'.  The arrangement suggests that 'θ' depends on the completion or output of '1', '2', '3', and '4', implying a parallel or concurrent processing model where 'θ' is calculated only after all its dependencies are satisfied.](/assets/images/dsa/graphs/2cc0ed002699a232.webp)

This would require individually setting the parent of all these people to person 0, which can be quite expensive if the community has many people. A more efficient strategy is to just connect the representative of this community, person 2, to person 0.

In code, this is done by setting the parent of `rep_y` to be `rep_x` (`parent[rep_y] = rep_x`):

![Image represents a directed acyclic graph (DAG) illustrating a data flow or dependency structure, possibly within a coding pattern context.  The graph consists of five nodes, numbered 0 through 4, represented as circles. Node 0, highlighted with an orange outline and labeled '0', is designated with the text 'rep_x' above it, suggesting it represents a repeated x-value or a replicated data source.  Node 1 points to node 0 via a directed edge (arrow), indicating a data dependency. Node 2 receives data from node 3 via a directed edge and, in turn, sends data to node 0.  Node 4 points to node 2, showing a data dependency. Node 3 has no outgoing edges, suggesting it's a source or terminal node. The overall structure suggests a pipeline or branching process where data flows from nodes 1, 3, and 4, converging at node 2 before potentially being replicated or used in node 0, labeled 'rep_x' to indicate replication or repetition of the x-component.  The label 'rep_y' above node 2 suggests a possible connection to a y-component or a second replication process.](/assets/images/dsa/graphs/c7cb7c14a3cc35c1.webp)

This way, everyone originally in the second community is indirectly connected to person 0, making person 0 the representative of all nodes.

Note that if rep_x and rep_y are the same person, then they belong to the same community, in which case we don’t need to merge anything.

**Find** The `find` function should return the representative of the community a person is in:

![Image represents two disjoint sets of nodes, each representing a disjoint-set data structure, visually illustrating the `find` operation.  The left set, depicted in cyan, shows node 0 pointing to itself (indicated by a self-looping cyan dashed arrow), and node 1 pointing to node 0 (a solid black arrow).  The text `find(0) = 0` and `find(1) = 0` indicates that finding the root of 0 returns 0, and finding the root of 1 returns 0 (because 1 points to 0). The right set, depicted in orange, shows node 2 pointing to itself (self-looping orange dashed arrow), node 4 pointing to node 2 (solid black arrow), and node 3 pointing to node 2 (solid black arrow). The text `find(2) = 2`, `find(3) = 2`, and `find(4) = 2` indicates that the root of 2, 3, and 4 is 2.  The dashed arrows represent the path followed during the find operation, showing how each node eventually leads to its respective root node.  The solid arrows represent the parent-child relationships within each set.](/assets/images/dsa/graphs/caad2f38996070fb.webp)

At this point, it's important to note the difference between a parent and a representative:

- A representative is the person who represents the community. This is effectively the “root” node of the community.
- A parent of a person is the node that person is pointing to.

For example, in the community below, we see that person 0's parent is person 1, whereas person 0’s representative is person 2:

![Image represents a directed graph illustrating a chain of relationships.  Three nodes, numbered 0, 1, and 2, are depicted as circles. Node 0 is connected to node 1 by a solid arrow, indicating a unidirectional relationship.  Above this connection, the text 'parent of person θ' is written in gray, suggesting node 0 is the parent of the person represented by node 1. Node 1 is further connected to node 2 by another solid arrow.  Node 2 is colored orange and labeled 'representative' in orange text, indicating its role.  Dashed arrows form a loop connecting node 0 back to itself and node 1 to node 2, suggesting a cyclical or feedback relationship, though the nature of this feedback is not explicitly defined.  The overall structure shows a linear progression from parent (0) to person (1) to representative (2), with an implied cyclical feedback mechanism.](/assets/images/dsa/graphs/c3467a77aa69a0b6.webp)

We can implement the `find(x)` function by traversing `x`’s parent chain until we reach the representative. **The representative is the person whose parent is themselves**, so we can identify them by checking if the current person is their own parent. The code snippet for this is provided below.

```python
def find(x: int) -> int:
    # If x is equal to its parent, we found the representative.
    if x == parent[x]:
        return x
    # Otherwise, continue traversing through x's parent chain.
    return find(parent[x])
```

Now we’ve discussed both the `union` and the `find` function, let’s discuss what optimizations can be made to them.

**Union by size** Recall that before merging two communities, we need to pick someone to represent the merged community. Our choice is between `rep_x` and `rep_y`. Is one a better choice than the other? Consider the following two communities:

![Image represents two distinct directed acyclic graphs.  The left graph, labeled 'rep_x', depicts a tree structure where a central node labeled '0' receives input from five nodes numbered '1' through '5'.  Arrows indicate the direction of information flow, showing that nodes 1 through 5 send data to node 0.  The right graph, labeled 'rep_y', is simpler, showing a single upward arrow from node '7' to node '6', indicating that node 7 sends data to node 6.  Both graphs illustrate data flow, possibly representing different representations (x and y) of a similar underlying structure or process, with the numbered nodes potentially representing individual data points or features, and the nodes labeled '0' and '6' representing aggregated or processed results.](/assets/images/dsa/graphs/ea9a8d4ce6b640ff.webp)

Let's see what the difference is when we pick `rep_x` to be the representative versus picking `rep_y`:

![Image represents two directed acyclic graphs illustrating a concept likely related to choosing a representative node.  The left graph, labeled 'choose rep_x:', shows nodes numbered 1 through 7, with arrows pointing upwards towards a central node labeled '0' (highlighted in orange), indicating that node 0 is chosen as the representative ('rep_x') for nodes 1-7. Node 6 has an additional incoming arrow from node 7. The right graph, labeled 'choose rep_y:', similarly shows nodes 1 through 7, with arrows pointing upwards towards a central node labeled '0', which in turn points upwards to node 6 (highlighted in orange), indicating that node 6 is chosen as the representative ('rep_y') for nodes 0, 1, 2, 3, 4, 5, and 7.  The arrangement visually demonstrates two different representative selection processes, possibly highlighting different algorithms or strategies for choosing a representative node within a dataset or graph structure.](/assets/images/dsa/graphs/ad91c3fb265cc84a.webp)

As we can see, when we choose a representative from one of two communities, the people in the other community have a longer distance to their new representative, with the distance increased by 1. Therefore, it’s better to **pick the representative from the larger community,** so that only the people from the smaller community are impacted by this adjusted distance.

This optimization requires a way to determine the size of a community. We can do this using a size array, where `size[i]` is the size of the community represented by person `i`. The code for this can be seen below:

```python
def union(x: int, y: int) -> None:
   rep_x, rep_y = find(x), find(y)
   if rep_x != rep_y:
       # If 'rep_x' represents a larger community, connect 'rep_y's community to it.
       if size[rep_x] > size[rep_y]:
           parent[rep_y] = rep_x
           size[rep_x] += size[rep_y]
       # If 'rep_y' represents a larger community, or both communities are of the same
       # size, connect 'rep_x's community to it.
       else:
           parent[rep_x] = rep_y
           size[rep_y] += size[rep_x]
```

A similar optimization to union by size is union by rank, which optimizes the `union` function in a very similar way [[1]](https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Union_by_rank).

Note that the `size` array makes the implementation of **get_community_size**`(x)` quite straightforward: we just return the size of x’s representative (i.e., return `size[find(x)]`).

**Path compression** There’s another major optimization that can be made. Consider the following community, with person 0 as the representative. The further down we go in this diagram, the further away the people are from the representative. We can see this for persons 3 and 6, for example:

![Image represents a tree-like data structure illustrating a 'find' operation within a disjoint-set data structure, likely used for representing sets and their relationships.  The central node, labeled '0' and highlighted in orange, is the representative element ('rep') of the entire set.  Nodes 1 through 6 represent other elements within the set. Solid black arrows indicate the parent-child relationships within the structure; for example, node 2 is a child of node 1, and node 1 is a child of node 0. Dashed gray arrows represent the path a 'find(parent[i])' operation would take to locate the representative element for a given node 'i'.  For instance, `find(parent[3])` would traverse from node 3 to node 2, then to node 1, and finally to node 0 (the representative).  Each leaf node (3 and 6) has a label indicating a `find(i)` operation, suggesting a direct path to find the element itself.  The overall structure shows how the `find` operation navigates the tree to identify the representative element of a given node's set.](/assets/images/dsa/graphs/ffc13329feb9dafb.webp)

What’s important to realize is that performing `find(3)` and `find(6)` will not only return the representative to persons 3 and 6, but it will also cause it to be returned by all the other nodes in their parent chains because this is a recursive function:

![Image represents a directed graph illustrating a coding pattern, possibly related to recursion or a state machine.  The graph features seven nodes (circles) numbered 0 through 6. Node 0, colored orange and labeled 'rep,' sits at the top and represents a potentially recursive function's main call or a central state.  Nodes 1, 2, 4, 5, and 6 are connected to each other and to node 0 with solid black arrows indicating the primary flow of execution or state transitions.  Node 0 has solid black arrows pointing to nodes 1 and 4, representing function calls or state changes. Nodes 1 and 4 are connected to nodes 2 and 5 respectively, with similar solid black arrows. Nodes 2 and 5 are connected to nodes 3 and 6 respectively, again with solid black arrows.  Dashed orange arrows connect nodes 1 and 4 back to node 0, and nodes 2 and 5 back to nodes 1 and 4 respectively, and nodes 3 and 6 back to nodes 2 and 5 respectively, labeled 'return 0,' suggesting return values or state transitions back to previous states.  Dashed gray arrows form loops around nodes 1, 2, 4, 5, and 6, possibly indicating alternative paths or error handling. The overall structure suggests a hierarchical or tree-like pattern with a central node (0) and branching sub-processes or states.](/assets/images/dsa/graphs/9c7114b28da81ce2.webp)

This means every person in their parent chains also knows their representative is person 0. So, if we update the parent of each of these people to person 0 in the `find` function, all the nodes in this chain will connect to the representative. This technique is known as path compression, and it allows us to flatten the graph:

![Image represents a directed graph illustrating a 'rep' pattern, likely within a coding context.  The graph features a central node labeled '0' and colored orange, representing a central repository or aggregation point.  Six other nodes, numbered 1 through 6, are connected to the central node with unidirectional arrows pointing towards node '0'. This indicates that data or information flows from nodes 1 through 6 into the central node '0'.  The arrangement suggests a pattern where multiple sources (1-6) contribute to or update a single representative element (0), possibly representing data aggregation, merging, or a similar process in a software system. The label 'rep' above node 0 reinforces this interpretation, signifying a representative or aggregated data structure.](/assets/images/dsa/graphs/71f8c7434c76bd6f.webp)

The code for this optimization is provided below:

```python
def find(x: int) -> int:
    if x == parent[x]:
        return x
    # Path compression: updates the representative of x, flattening the structure of
    # the community as we go.
    parent[x] = find(parent[x])
    return parent[x]
```

This path compression optimization allows us to restructure the graph at every `find` call, effectively reducing the distance between people and their representative, and making future `find` calls more efficient.

## Implementation

Below is the implementation of the Union-Find data structure.

```python
class UnionFind:
    def __init__(self, size: int):
        self.parent = [i for i in range(size)]
        self.size = [1] * size
   
    def union(self, x: int, y: int) -> None:
        rep_x, rep_y = self.find(x), self.find(y)
        if rep_x != rep_y:
            # If 'rep_x' represents a larger community, connect 'rep_y's community to
            # it.
            if self.size[rep_x] > self.size[rep_y]:
                self.parent[rep_y] = rep_x
                self.size[rep_x] += self.size[rep_y]
            # Otherwise, connect 'rep_x's community to 'rep_y'.
            else:
                self.parent[rep_x] = rep_y
                self.size[rep_y] += self.size[rep_x]
   
    def find(self, x: int) -> int:
        if x == self.parent[x]:
            return x
        self.parent[x] = self.find(self.parent[x]) # Path compression.
        return self.parent[x]
   
    def get_size(self, x: int) -> int:
        return self.size[self.find(x)]
```

Below is the implementation of the main problem using the above Union-Find data structure:

```python
class MergingCommunities:
    def __init__(self, n: int):
        self.uf = UnionFind(n)
   
    def connect(self, x: int, y: int) -> None:
        self.uf.union(x, y)
   
    def get_community_size(self, x: int) -> int:
        return self.uf.get_size(x)
```

### Complexity Analysis

**Time complexity:** Let’s break down the time complexity of the Union-Find functions:

- With the path compression and union by size optimizations, find has a time complexity of amortized O ( 1 ) O(1) O ( 1 ) 1 because the branches of the graph become very short over time, making the function effectively constant-time in most cases.
- Since union just uses the find function twice, it also has a time complexity of amortized O ( 1 ) O(1) O ( 1 ) .
- Since get_size just uses the find function once, it also has a time complexity of amortized O ( 1 ) O(1) O ( 1 ) .

Therefore, the time complexities of connect and `get_community_size` are both amortized O ( 1 ) O(1) O ( 1 ). The time complexity of the constructor is O ( n ) O(n) O ( n ) because we initialize two arrays of size n n n when creating the `UnionFind` object.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the Union-Find data structure has two arrays of size n n n: `parent` and `size`. The space taken up by the recursive call stack is amortized O ( 1 ) O(1) O ( 1 ) since the branches of the graph become very short over time, resulting in fewer recursive calls made to the `find` function.

## Footnotes

1. We can also write the time complexity here as O ( α ( n ) ) O(α(n)) O ( α ( n )) , where α ( n ) α(n) α ( n ) is the inverse Ackermann function, which grows extremely slowly but is not constant. ↩
