---
title: "Count Islands"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Count Islands.html"
---
Given a binary matrix representing 1s as land and 0s as water, **return the number of islands**.

An island is formed by connecting adjacent lands 4-directionally (up, down, left, and right).

#### Example:

![Image represents a 4x4 matrix, visually depicting a concept likely related to identifying 'islands' within a grid.  The matrix cells contain either a '1' or a '0'.  Two distinct groups of adjacent cells containing '1's are highlighted in a peach/light orange color. These groups are labeled 'island' with orange curved arrows pointing to each group.  The '1's within each highlighted group are directly adjacent (horizontally or vertically, not diagonally), forming two distinct, unconnected clusters. The remaining cells contain '0's, representing areas outside the islands. The overall arrangement demonstrates a visual representation of a data structure where connected components (islands of '1's) are identified within a larger matrix.](/assets/images/dsa/graphs/fa2178ab050c8a33.webp)

```python
Output: 2
```

## Intuition

Before determining how to find all the islands in a matrix, let’s consider an input that contains only one island.

**Matrix with just one island** Consider the following matrix containing one island:

![Image represents a 4x4 matrix, visually depicted as a grid with four rows and four columns, each cell capable of holding a numerical value.  The rows and columns are labeled from 0 to 3.  The matrix cells contain either a '0' (represented in light gray) or a '1' (represented in orange). The '1' values are clustered towards the center of the matrix, specifically at positions (1,0), (1,1), (1,2), and (2,1), forming a roughly diagonal pattern.  The remaining cells contain '0' values. The entire matrix is enclosed within a bold black border.  No URLs or parameters are present.](/assets/images/dsa/graphs/5f8dc9ae4b1883e3.webp)

When we iterate through the matrix starting from the top left, the first land cell we encounter is cell (0, 2). From here, we’d like to find the rest of the island.

The key observation is that we should be able to access every land cell on the same island by moving horizontally or vertically through neighboring land cells. This means that all 1s forming an island are connected either directly or indirectly through adjacent 1s. Conceptually, this is similar to a graph, where each cell is a node, and each connection to an adjacent cell is an edge:

![Image represents a visual comparison of two representations of the same data structure.  On the left, a 4x4 adjacency matrix is shown, with rows and columns labeled 0 through 3.  The matrix cells contain either a '0' (light gray) or a '1' (orange).  The '1' values are located at matrix positions (0,2), (1,0), (1,1), (1,2), and (2,1), indicating connections between nodes.  A large, gray curly brace separates the matrix from a graph representation on the right. This graph consists of five nodes, each represented by an orange circle containing the number '1'.  These nodes are connected by black lines, mirroring the connections shown in the adjacency matrix. Specifically, the graph shows a node connected to three other nodes, one of which is connected to a fourth node, and another of which is connected to a fifth node. The arrangement of '1's in the matrix directly corresponds to the connections in the graph; each '1' in the matrix represents an edge connecting two nodes in the graph.](/assets/images/dsa/graphs/c16edb91a974dbf1.webp)

This demonstrates that we can identify the rest of the island by performing a graph traversal algorithm. Most traversal algorithms will suit this purpose. In this explanation, we'll use DFS.

**Depth-first search** For each cell we visit during the traversal, we need to mark that cell as visited to ensure it’s not visited again. There are two ways to do this:

1. Use a separate data structure, such as a hash set, to keep track of the coordinates of visited cells.
2. Modify the matrix by changing the value of a visited cell from 1 to -1 , ensuring it doesn’t get revisited.

We’ll proceed with the second option because it doesn’t require the use of extra space.

Now, let’s begin DFS traversal. Mark the first cell, (0, 2), as visited by modifying its value to -1. Then, continue exploring by calling DFS on any neighboring land cells. Here, the only neighboring land cell is cell (1, 2):

![Image represents a visual comparison of a matrix and a graph.  On the left, a 4x4 matrix is shown with row and column indices labeled 0-3.  Most cells contain '0' (in light gray), but some cells contain '1' (in orange) and one cell contains '-1' (in dark gray). A downward-pointing arrow indicates the '-1' cell as a point of focus.  On the right, a graph is depicted with four nodes, each containing the number '1' (in black text) within an orange circle.  These nodes are connected by black lines forming a T-shape.  A fifth node, colored light gray and containing '-1', is positioned above one of the '1' nodes in the T-shape, with an orange arrow pointing downwards to indicate a connection or flow from the '-1' node to the adjacent '1' node in the graph. The overall image likely illustrates a data structure transformation or a representation of the same underlying data in two different formats, possibly demonstrating a concept in graph theory or matrix operations.](/assets/images/dsa/graphs/b949282d3829c159.webp)

From cell (1, 2), we similarly mark it as visited and explore its neighboring land cells. Again, there's only one neighboring land cell: (1, 1). So, let's make a recursive DFS call to it:

![Image represents a comparison of a matrix representation and a graph representation of the same data.  On the left, a 4x4 matrix is shown with numerical values.  The rows and columns are labeled 0 through 3.  Most cells contain '0' in light gray text.  However, cells (1,0), (1,1), and (2,1) contain '1' in orange text, while cell (1,2) contains '-1' in dark gray text.  A left-pointing arrow is positioned between the '1' at (1,1) and the '-1' at (1,2), suggesting a relationship or flow of information. On the right, a directed graph is depicted.  Three nodes circled in orange contain '1', while two nodes circled in gray contain '-1'.  Lines connect the nodes, representing relationships.  An orange arrow points from a gray '-1' node to an orange '1' node, indicating a directional connection. The graph visually mirrors the matrix, with the orange '1' nodes corresponding to the orange '1's in the matrix, and the gray '-1' nodes corresponding to the '-1' in the matrix. The arrow in the matrix and the arrow in the graph both highlight the same interaction between a '1' and a '-1'.](/assets/images/dsa/graphs/84d16a4d8cfa78df.webp)

From cell (1, 1), mark it as visited and explore both of its neighboring land cells. Let’s continue exploring from cell (1, 0) first:

![Image represents a comparison between a matrix representation and a graph representation of data.  On the left, a 4x4 matrix is shown with numerical values.  Rows and columns are labeled 0-3.  Most cells contain '0' (in light gray), but some contain '1' (in orange) and '-1' (in dark gray). Specifically, a '1' is located at matrix[1][0] and matrix[2][1].  A '-1' is present at matrix[0][2], matrix[1][1], and matrix[1][2]. An arrow points to the '1' at matrix[1][0], indicating a potential focus or starting point. On the right, a directed acyclic graph is displayed.  Nodes represent numerical values; orange circles represent '1', and gray circles represent '-1'.  Edges connect the nodes, showing relationships. An orange arrow points from a '1' node to a '-1' node, indicating a directional flow. The graph visually represents the connections and relationships between the non-zero elements in the matrix, with the orange '1' nodes corresponding to the '1's in the matrix and the gray '-1' nodes corresponding to the '-1's in the matrix. The structure suggests a possible flow or dependency between the data points.](/assets/images/dsa/graphs/3ce0dfd75c95f178.webp)

At (1, 0), there's no neighboring land. So, the recursive process naturally goes back to cell (1, 1) to continue exploring any other neighboring land cells:

![Image represents a visual explanation of a coding pattern, likely related to graph traversal or matrix manipulation.  The image is divided into two main sections. The top section shows a 4x4 matrix with numerical values.  Most cells contain '0', except for a '-1' at position (0,2) and a sequence of '-1's at positions (1,0), (1,1), (1,2).  A highlighted '1' is present at position (2,1). A right-pointing arrow connects the '-1' at (1,0) to the '-1' at (1,1), indicating a possible flow or transition. The bottom section displays a nearly identical 4x4 matrix, but the arrow now points downwards from the '-1' at (1,1) to the highlighted '1' at (2,1). To the right of the matrices is a simple graph. This graph consists of four nodes, three of which are labeled '-1' and are connected linearly. The fourth node, circled in orange, is labeled '1' and is connected to the last node in the linear sequence. An orange downward-pointing arrow connects the second '-1' node in the linear sequence to the '1' node, mirroring the arrow in the bottom matrix.  The overall image suggests a demonstration of how a specific algorithm or pattern processes data within a matrix, potentially identifying or highlighting a specific value ('1') based on the relationships between other values ('-1').](/assets/images/dsa/graphs/ccc57c1c859e3c1a.webp)

We've now finished exploring this island:

![Image represents a comparison between two representations of the same data structure, likely an adjacency matrix and its corresponding graph.  On the left, a 4x4 matrix is shown, with rows and columns indexed from 0 to 3.  The matrix cells contain numerical values; most are 0, while several are -1.  Specifically, the -1 values are located at (0,2), (1,0), (1,1), (1,2), (2,1). The numbers are displayed in a dark gray font within the cells of the matrix. The matrix is enclosed in a bold black border. On the right, a graph is depicted with five nodes, each represented by a light gray circle containing the number -1.  These nodes are connected by edges, forming a structure where one node is connected to three others, and one of those three is connected to a fourth node. The connections between the nodes visually represent the non-zero entries (-1) in the adjacency matrix on the left. The arrangement of the nodes and edges in the graph directly corresponds to the positions of the -1 values in the matrix.  For example, the -1 at matrix position (1,0) corresponds to an edge between node 1 and node 0 in the graph.](/assets/images/dsa/graphs/cbe599b80ab90197.webp)

With this island completely explored, let’s increment a variable count to indicate that one new island has been found. Now, let’s consider the main problem where there could be multiple islands in the matrix.

**Matrix with multiple islands** We can identify all islands using the following steps:

1. Search through the matrix, starting from cell (0, 0), until we find a land cell.
2. Upon encountering a land cell, explore its island using DFS, marking each land cell we encounter as visited (-1) to avoid visiting them again.
3. Increment count by 1, indicating the discovery of the island we just explored.
4. Keep searching the matrix for any unvisited land cells. When we find one, repeat steps 2 to 4.

![Image represents a step-by-step visualization of an algorithm, likely for identifying and counting 'islands' in a 2D grid.  The process begins with a 4x4 grid where cells containing '1' (in orange) represent land and '0' (in gray) represents water.  Above the first grid, text reads 'explore the island, count = 1,' indicating the algorithm's initial state. A dashed orange arrow points to a '1' cell, signifying the starting point of the exploration.  A rightward arrow then transitions to the second grid, where the initial '1' island has been replaced with '-1' (in gray), signifying it's been visited.  Above this grid, 'explore the island, count = 2' appears, along with a dashed orange arrow tracing the path to another '1' island.  Another rightward arrow leads to the final grid, where all '1' cells have been replaced by '-1', indicating all islands have been explored.  The text 'all islands explored' confirms the algorithm's completion.  The algorithm appears to use Depth-First Search or Breadth-First Search to traverse and mark visited cells, effectively counting the number of distinct islands.](/assets/images/dsa/graphs/28f0bcb6e1df8463.webp)

## Implementation

To traverse the matrix 4-directionally, we can use an array of **direction vectors**:

`dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]`

Each pair in the array represents the changes needed to move one step in a specific direction:

![Image represents a visual explanation of how to move in four directions (Up, Down, Left, Right) on a 2D grid using array indexing.  The left side shows four equations, each representing a directional movement.  Each equation takes a coordinate pair (r, c) representing the row and column of a cell and adds it to an element from a `dirs` array.  `dirs[0]` corresponds to moving Up, resulting in (r - 1, c); `dirs[1]` corresponds to moving Down, resulting in (r + 1, c); `dirs[2]` corresponds to moving Left, resulting in (r, c - 1); and `dirs[3]` corresponds to moving Right, resulting in (r, c + 1). The right side displays a 3x3 grid visually illustrating these movements. The central cell is highlighted in light gray and labeled (r, c), representing the starting point. The surrounding cells are labeled with their respective coordinates, showing the result of applying the directional equations.  The grid demonstrates the effect of adding the `dirs` array elements to the initial coordinate (r, c) to obtain the new coordinates after moving in a specific direction.](/assets/images/dsa/graphs/6fe004979d69cc38.webp)

```python
from typing import List
    
def count_islands(matrix: List[List[int]]) -> int:
    if not matrix:
        return 0
    count = 0
    for r in range(len(matrix)):
        for c in range(len(matrix[0])):
            # If a land cell is found, perform DFS to explore the full island, and
            # include this island in our count.
            if matrix[r][c] == 1:
                dfs(r, c, matrix)
                count += 1
    return count
    
def dfs(r: int, c: int, matrix: List[List[int]]) -> None:
    # Mark the current land cell as visited.
    matrix[r][c] = -1
    # Define direction vectors for up, down, left, and right.
    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    # Recursively call DFS on each neighboring land cell to continue exploring this
    # island.
    for d in dirs:
        next_r, next_c = r + d[0], c + d[1]
        if is_within_bounds(next_r, next_c, matrix) and matrix[next_r][next_c] == 1:
            dfs(next_r, next_c, matrix)
    
def is_within_bounds(r: int, c: int, matrix: List[List[int]]) -> bool:
    return 0 <= r < len(matrix) and 0 <= c < len(matrix[0])
```

### Complexity Analysis

**Time complexity:** The time complexity of `count_islands` is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ), where m m m denotes the number of rows and n n n denotes the number of columns. This is because each cell of the matrix is visited at most twice: once when searching for land cells in the `count_islands` function, and up to one more time during DFS.

**Space complexity:** The space complexity is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ) mostly due to the recursive call stack during DFS, which can grow up to m ⋅ n m\cdot n m ⋅ n in size.

## Interview Tip

*Tip: Check with an interviewer if modifications to the input are acceptable.* During DFS, we marked cells as visited by modifying the input directly. However, in some situations, input modification may not be desirable. As such, it’s worth confirming this with the interviewer before making in-place modifications to the input.
