---
title: "Prerequisites"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Prerequisites.html"
---
Given an integer `n` representing the number of courses labeled from `0` to `n - 1`, and an array of prerequisite pairs, determine if it's possible to enroll in all courses.

Each prerequisite is represented as a pair `[a, b]`, indicating that course `a` must be taken before course `b`.

#### Example:

![Image represents a directed graph illustrating a simple coding pattern, possibly related to data flow or state transitions.  The graph contains three nodes represented as circles.  One node is labeled 'θ' (theta), suggesting an initial state or input. Another node is labeled '1', and the third is labeled '2'.  A directed edge (arrow) connects the 'θ' node to the '1' node, indicating a unidirectional flow of information or a transition from 'θ' to '1'.  Two curved, bidirectional edges connect nodes '1' and '2', showing a reciprocal relationship or iterative interaction between these two states; information or control flows in both directions between '1' and '2'.  The overall structure suggests a sequence where an initial input ('θ') triggers a process ('1') that interacts iteratively with another component ('2') before potentially completing or transitioning to another state (not shown).](/assets/images/dsa/graphs/b1eab865cf2f03d2.webp)

```python
Input: n = 3, prerequisites = [[0, 1], [1, 2], [2, 1]]
Output: False
```

Explanation: Course 1 cannot be taken without first completing course 2 and, and vice versa.

#### Constraints:

- For any prerequisite `[a, b]`, `a` will not equal `b`.

## Intuition

Our goal is to check if enrollment into all courses is possible. Let’s start by identifying which situations make enrollment impossible.

Consider a simple case where there are just two courses. A scenario where enrollment into all courses is impossible occurs when each course is a prerequisite to the other, as graphically represented below:

![Image represents a directed graph illustrating prerequisites, where `prerequisites = [[0, 1], [1, 0]]` defines the dependencies.  The graph consists of two nodes, represented by circles labeled '0' and '1'.  A directed edge, indicated by an arrow, connects node '0' to node '1', signifying that node '1' requires node '0' as a prerequisite.  Conversely, another directed edge connects node '1' to node '0', indicating a reciprocal dependency; node '0' also requires node '1'. The `prerequisites` array is a matrix where each inner array represents a dependency; `[0, 1]` means 1 depends on 0, and `[1, 0]` means 0 depends on 1.  This visual representation shows a cyclical dependency between the two nodes.](/assets/images/dsa/graphs/023299a7ab3cd03f.webp)

Here are a couple of impossible enrollment scenarios that could occur with prerequisites for three courses:

![Image represents two directed graphs illustrating different prerequisite relationships.  Each graph contains three nodes labeled '0', '1', and '2', representing tasks or modules.  Arrows indicate dependencies; an arrow from node A to node B signifies that B requires A as a prerequisite. The left graph shows node 0 pointing to node 1, node 1 pointing to node 2, and node 2 pointing back to node 1, representing a cyclical dependency.  Above this graph, the text 'prerequisites = [[0,1] [1,2] [2,1]]' lists these dependencies as ordered pairs within a list of lists. The right graph shows node 0 pointing to node 1, node 1 pointing to node 2, and node 2 pointing to node 0, forming a different cyclical dependency.  Above this graph, the text 'prerequisites = [[2,0] [0,1] [1,2]]' similarly lists the dependencies as ordered pairs in a list of lists, reflecting the connections in the graph.  Both graphs visually represent different sets of prerequisites, highlighting how different dependency structures can be represented using directed graphs and their corresponding list representations.](/assets/images/dsa/graphs/d77f946a6a297051.webp)

What do we notice about these cases and their graphical representations? They both have a circular relationship: a cycle. This highlights that it’s impossible to enroll in all courses if there exists a circular dependency between courses. In other words, **there must not be a cycle in the graphical representation of the courses** for complete enrollment to be possible.

In the example below, each node's in-degree is displayed at the top right:

![Image represents a directed graph illustrating prerequisites.  The graph consists of six nodes, numbered 0 through 5, represented as circles containing their respective numbers.  Arrows indicate directed edges showing dependencies; a directed edge from node *x* to node *y* means *y* depends on *x*.  The edges are labeled with small orange numbers, possibly representing weights or costs associated with the dependencies.  Specifically, node 0 has outgoing edges to nodes 1 and 2; node 1 has an outgoing edge to node 4; node 3 has an outgoing edge to node 2; node 2 has an outgoing edge to node 4; and node 4 has an outgoing edge to node 5. Above the graph, a Python list named `prerequisites` is defined, containing nested lists. Each nested list represents a dependency pair; for example, `[0,1]` indicates that node 1 depends on node 0.  The list explicitly defines all the dependencies shown in the graph.](/assets/images/dsa/graphs/f6fc83cf819661b1.webp)

Courses 0 and 3 have an in-degree of 0. So, let’s complete them first and remove them from the graph. By doing this, we reduce the number of prerequisites for courses 1 and 2. Course 1's indegree then decreases by 1, and course 2's indegree decreases by 2:

![Image represents a directed graph illustrating a coding pattern transformation.  The left side shows an initial graph with two source nodes, labeled '0' (crossed out in red, indicating inactivity or removal) and '3' (also crossed out in red), each connected via grey, directed edges with weights (small orange numbers) to nodes '1' (weight 1) and '2' (weight 2) respectively. Node '1' and '2' are then connected to node '4' (weights 1 and 2 respectively), which in turn connects to node '5' (weight 1).  A dashed grey arrow separates the left and right graphs, indicating a transformation. The right side shows the transformed graph where nodes '0' and '3' are removed. Nodes '1' and '2' now directly connect to node '4' (weights 1 and 0 respectively), and node '4' still connects to node '5' (weight 1).  The weights on the edges represent some form of cost or value associated with the connection between nodes. The overall diagram depicts a simplification or optimization of the graph structure, potentially representing a refactoring step in a coding pattern.](/assets/images/dsa/graphs/622245d20b5114ce.webp)

Now, courses 1 and 2 have an in-degree of 0, which means we can enroll in them and remove them from the graph. Observe what happens when we continue the process of removing courses with an in-degree of 0 from the graph:

By the end of this process, no courses remain, indicating it’s possible to enroll in all courses.

Now, consider an example with a cyclic dependency:

![Image represents a directed graph illustrating prerequisites.  At the top, a Python list named `prerequisites` is defined, containing pairs of numbers representing dependencies: `[[0,1] [0,2] [3,2] [1,4] [2,4] [4,5] [5,2]]`.  The graph visually depicts these dependencies.  The graph consists of six nodes, numbered 0 through 5, represented as circles containing their respective numbers.  Directed edges, represented by arrows, connect the nodes, indicating the flow of dependencies.  For example, the edge from node 0 to node 1 (labeled with an orange '1' above the arrow) signifies that node 1 requires node 0 as a prerequisite. Similarly, node 2 requires node 0 (labeled '0'), node 2 requires node 3 (labeled '3'), node 4 requires node 1 (labeled '2'), node 4 requires node 2 (labeled '1'), node 5 requires node 4 (labeled '1'), and node 2 requires node 5 (a curved edge).  The numbers on the arrows correspond to the order of dependencies as listed in the `prerequisites` list.](/assets/images/dsa/graphs/6a9c66b16618655f.webp)

Let's follow the same steps of removing courses with an in-degree of 0:

![Image represents a directed graph illustrating a coding pattern, possibly related to graph transformations or optimization.  The initial graph shows nodes labeled 0 (greyed out and crossed with a red line, indicating it's inactive or removed), 1, 2, 3 (also greyed out and crossed), 4, and 5.  Orange numbers next to the edges represent weights or costs associated with each connection. Node 0 connects to node 1 with weight 1, and to node 2 with weight 0. Node 1 connects to node 4 with weight 2, and node 3 connects to node 2 with weight 3 and to node 4 with weight 1. Node 4 connects to node 5 with weight 1, and node 5 connects back to node 2 with weight 1.  The graph then undergoes a transformation, indicated by a dashed arrow.  In the transformed graph, nodes 0 and 3 are absent. The connections and weights between nodes 1, 2, 4, and 5 are rearranged. Node 1 is removed, and node 2 now connects to node 4 with weight 1. Node 4 connects to node 5 with weight 1, and node 5 connects back to node 2 with weight 1. A further transformation is shown, resulting in a final graph with the same nodes (1,2,4,5) but with slightly different connections and weights.  The transformations suggest a process of simplifying or optimizing the graph by removing nodes and adjusting edge weights.](/assets/images/dsa/graphs/fee08d02b5b2db06.webp)

Now, let’s identify a way to simulate the above process algorithmically.

**Topological sort** The process we described above is essentially topological sorting, where vertices of a graph are sorted in such a way that for every directed edge u → v, node u comes before node v in the ordering of the topological sort.

An algorithm designed to perform topological sort is **Kahn’s algorithm**. Let’s see how we can use it to solve this problem.

The first step of Kahn's algorithm is to determine the in-degree of each course. This can be achieved by counting the number of times each course appears as a dependent in the prerequisite pairs: for a pair [a, b], course b depends on course a, so course b’s in-degree is incremented by one:

![Image represents a directed acyclic graph (DAG) illustrating a topological sort problem, along with its prerequisites and in-degrees.  The upper part shows the DAG with six nodes (0, 1, 2, 3, 4, 5) represented as circles, connected by directed edges indicated by arrows.  The numbers on the arrows represent edge weights (not explicitly defined but implied). Node 0 points to node 1 and node 2; node 3 points to node 2; node 1 points to node 4; and node 4 points to node 5.  Below the DAG, a list named 'prerequisites' shows the dependencies as pairs of node indices: `[[0,1] [0,2] [3,2] [1,4] [2,4] [4,5]]`, indicating that node 1 requires node 0, node 2 requires node 0, node 2 requires node 3, node 4 requires node 1, node 4 requires node 2, and node 5 requires node 4.  Finally, a list named 'in_degrees' shows the number of incoming edges for each node: `[0 1 2 0 2 1]`, indicating that node 0 has 0 incoming edges, node 1 has 1, node 2 has 2, and so on.  Orange curved arrows connect the prerequisites pairs to their corresponding in-degree values in the `in_degrees` list, visually linking the dependencies to the count of incoming edges for each node.  The numbers below the `in_degrees` list (0, 1, 2, 3, 4, 5) correspond to the node indices.](/assets/images/dsa/graphs/d4e5c8d19900d3d7.webp)

Now, we want to process all the courses with an in-degree of 0 first. We can add these courses to a queue to be processed:

![Image represents a directed acyclic graph (DAG) with five nodes (0, 1, 2, 3, 4) and edges connecting them, along with an accompanying illustration of a topological sort algorithm's execution.  The nodes are numbered 0 through 4 and are depicted as circles containing their respective numbers.  Edges are represented by arrows indicating direction; for example, node 0 points to node 1, and node 3 points to node 2.  Small orange numbers next to each edge indicate a weight or some associated value. The algorithm uses an `in_degrees` array, shown as `[0 1 2 0 2 1]`, representing the number of incoming edges for each node (node 0 has 0 incoming edges, node 1 has 1, and so on).  A `queue` array, initialized as `[0 3]`, stores nodes with zero incoming edges.  A light green highlight visually emphasizes the current state of the `in_degrees` array, showing that nodes 0 and 3 are initially in the queue because they have no incoming edges.  The graph's structure and the `in_degrees` and `queue` arrays together illustrate the data structures used in a topological sorting algorithm.](/assets/images/dsa/graphs/0d39a82dbe964dd6.webp)

To begin processing, pop the first course from the queue: course 0. Then, for each course that has course 0 as a prerequisite (i.e., courses pointed to by course 0), reduce their in-degree by one:

![Image represents a directed acyclic graph (DAG) illustrating a topological sort algorithm.  The DAG consists of five nodes (circles) numbered 1 through 5, with directed edges (arrows) indicating dependencies. Node 0 is shown in gray and crossed out, indicating it's a source node that has been processed.  A directed edge from node *i* to node *j* implies that node *j* depends on node *i*.  The edges are labeled with small numbers representing weights or counts (e.g., 1→0, 2→1).  To the right, an array named `in_degrees` is shown, representing the in-degree of each node (number of incoming edges).  Initially, `in_degrees` is [0, 1, 2, 0, 2, 1], with node 0's in-degree crossed out because it's processed.  Another array, `queue`, is shown as [0, 3], indicating nodes with an in-degree of 0 (ready to be processed).  The orange numbers on the nodes and edges likely represent the order of processing during the topological sort.  The graph visually demonstrates the flow of information and dependencies, with the arrays tracking the algorithm's progress.](/assets/images/dsa/graphs/d11848dd3e2cafa6.webp)

If any of the courses have an in-degree of 0 after being decremented, add them to the queue. Course 1 now has an in-degree of 0, so we add it to the queue:

![Image represents a directed acyclic graph (DAG) illustrating a topological sorting algorithm.  The DAG consists of five nodes (1, 2, 3, 4, 5) represented as circles containing their respective node numbers.  Directed edges, represented by arrows, connect nodes indicating the flow of information; the numbers next to the arrows represent edge weights. Node 3 points to node 2 (weight 1), node 1 points to node 4 (weight 2), and node 2 points to node 4 (weight 2). Finally, node 4 points to node 5 (weight 1). To the right, an array labeled 'in_degrees' shows the in-degree of each node (number of incoming edges): node 1 has 0, node 2 has 1, node 3 has 0, node 4 has 2, and node 5 has 1.  A highlighted element '0' in the 'in_degrees' array indicates a node with an in-degree of 0, ready for processing.  Below, an array labeled 'queue' shows the queue of nodes ready for processing, initially containing nodes 3 and 1.  The arrangement visually demonstrates the algorithm's steps: identifying nodes with zero in-degrees, adding them to a queue, processing them, and updating in-degrees accordingly.](/assets/images/dsa/graphs/0f88bcec54f22f0a.webp)

We can continue the above process until the queue is empty, indicating that there aren't any more courses with an in-degree of 0.

- If we've processed all n courses, enrollment to all courses is possible.
- If we couldn’t process all n courses, a cycle was found, indicating enrollment to all courses is impossible.

## Implementation

```python
from typing import List
from collections import defaultdict, deque
    
def prerequisites(n: int, prerequisites: List[List[int]]) -> bool:
    graph = defaultdict(list)
    in_degrees = [0] * n
    # Represent the graph as an adjacency list and record the in-degree of each
    # course.
    for prerequisite, course in prerequisites:
        graph[prerequisite].append(course)
        in_degrees[course] += 1
    queue = deque()
    # Add all courses with an in-degree of 0 to the queue.
    for i in range(n):
        if in_degrees[i] == 0:
            queue.append(i)
    enrolled_courses = 0
    # Perform topological sort.
    while queue:
        node = queue.popleft()
        enrolled_courses += 1
        for neighbor in graph[node]:
            in_degrees[neighbor] -= 1
            # If the in-degree of a neighboring course becomes 0, add it to the queue.
            if in_degrees[neighbor] == 0:
                queue.append(neighbor)
    # Return true if we've successfully enrolled in all courses.
    return enrolled_courses == n
```

### Complexity Analysis

**Time complexity:** The time complexity of prerequisites is O ( n + e ) O(n+e) O ( n + e ) where e e e denotes the number of edges derived from the prerequisites array. Here’s why:

- Creating the adjacency list and recording the in-degrees takes O ( e ) O(e) O ( e ) time because we iterate through each prerequisite once.
- Adding all courses with in-degree 0 to the queue takes O ( n ) O(n) O ( n ) time because we check the in-degree of each course once.
- Performing Kahn’s algorithm takes O ( n + e ) O(n+e) O ( n + e ) time because each course and prerequisite is processed at most once during the traversal.

**Space complexity:** The space complexity is O ( n + e ) O(n+e) O ( n + e ), since the adjacency list takes up O ( n + e ) O(n+e) O ( n + e ) space, while the `in_degrees` array and queue each take up O ( n ) O(n) O ( n ) space.
