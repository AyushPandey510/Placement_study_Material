---
title: "Matrix Infection"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Matrix Infection.html"
---
You are given a matrix where each cell is either:

`0`: Empty `1`: Uninfected `2`: Infected

With each passing second, every infected cell (2) infects its uninfected neighboring cells (1) that are 4-directionally adjacent. Determine the number of seconds required **for all uninfected cells to become infected**. If this is impossible, return ‐1.

#### Example:

![Image represents a four-stage visualization of a data transformation process, possibly illustrating a coding pattern like a wave propagation or diffusion algorithm.  Each stage is labeled 'second 0,' 'second 1,' 'second 2,' and 'second 3,' suggesting a time sequence.  Each stage displays a 3x4 grid of cells.  Initially (second 0), a single cell in the center-right contains the value '2', while all other cells contain '0' or '1'.  Subsequent stages show the '2' value propagating to adjacent cells.  Arrows in 'second 1' indicate the direction of this propagation (up and down). In 'second 2' and 'second 3', the '2' value continues to spread horizontally, with '2 ← 2' indicating the merging or interaction of two '2' values.  The color of the cells changes to a light peach color as they acquire the '2' value, visually highlighting the propagation. The overall arrangement demonstrates a step-by-step evolution of the data within the grid over time, illustrating a specific pattern of data movement and transformation.](/assets/images/dsa/graphs/fb75777227aae4b4.webp)

```python
Input: matrix = [[1, 1, 1, 0], [0, 0, 2, 1], [0, 1, 1, 0]]
Output: 3
```

## Intuition

Let’s begin tackling this problem by considering a simple case where the initial matrix contains only one infected cell.

**Matrix with one infected cell** Consider the following matrix, containing just one 2:

![Image represents a 3x4 grid, enclosed by a bold black border, containing numerical values.  The grid is divided into twelve cells, each displaying either a '0' (greyed out) or a '1' (in bold black font), except for one cell in the center-right which contains a '2' (in bold black font) and is highlighted with a light peach/beige background.  The arrangement of the numbers appears somewhat random, with no immediately apparent pattern or sequence.  There are no connections or arrows depicted between the cells, and no additional information such as labels, URLs, or parameters are present within the image itself. The numbers within the grid are simply presented as data points within the cells of the matrix.](/assets/images/dsa/graphs/cb87a26ff80a4d6c.webp)

An observation is that each infected (2) and uninfected (1) cell can be considered as nodes in a graph, where edges exist between cells that are 4-directionally adjacent. Therefore, we can visualize these cells as a connected graph:

![Image represents a visual comparison of two data representations.  On the left, a 3x3 matrix is shown, containing numerical values.  The top row displays '1', '1', and '1', while the second row shows '0', '0', and a highlighted '2' in a peach-colored cell. The bottom row contains '0', '1', and '1'.  The '0' values are displayed in a lighter gray font.  A curly brace connects this matrix to a graph on the right. This graph is composed of several nodes, each represented by a circle containing a numerical value.  Three nodes labeled '1' are connected horizontally in a row at the top.  Below this, a central node labeled '2' is highlighted in orange, connected to the rightmost '1' of the top row, and to a '1' node to its right and two '1' nodes below it, forming a T-shape.  The connections between the nodes are represented by lines, indicating relationships or flows between the data points. The overall image illustrates a possible transformation or mapping between a matrix representation and a graph representation of the same underlying data, with the highlighted '2' in the matrix corresponding to the central highlighted '2' node in the graph.](/assets/images/dsa/graphs/6d731130b3310e62.webp)

This helps us think about this problem as a graph traversal problem. Which traversal algorithm will allow us to simulate the infection process? To find out, let’s observe how cells get infected each second.

After the first second, the adjacent uninfected neighbors of the first infected cell become infected. These cells are a distance of 1 away from the initially infected cell:

![Image represents a visual comparison of a 2D array and a graph.  The left side shows a 3x3 array where cells contain the numbers 1, 2, and 0. A 2x2 sub-array in the rightmost column and middle rows is highlighted in peach, containing the numbers 2. Arrows within this sub-array indicate movement: an upward arrow from the central '2' to the '2' above it, and a downward arrow from the central '2' to the '2' below it, and a rightward arrow from the central '2' to another '2' to its right. The right side depicts a directed graph.  Three nodes labeled '1' are connected to three nodes labeled '2', all of which are colored peach.  The '2' nodes are arranged vertically.  The connections between '1' and '2' nodes are represented by lines, and each connection is labeled 'dist = 1,' indicating a distance of 1 between connected nodes.  The peach-colored '2' nodes are also connected to each other with arrows, mirroring the movement shown in the array's peach sub-array, with the rightmost '2' node highlighted with a thicker orange border.  The graph visually represents the movement pattern shown in the array's highlighted section.](/assets/images/dsa/graphs/41fa125cd4177db7.webp)

One second later, the neighbors of the most recently infected cells get infected. These cells are a distance of 2 from the initial infected cell:

![Image represents a comparison between a matrix representation and a graph representation of a data structure, likely illustrating a concept in graph algorithms or shortest path finding.  The left side shows a 3x4 matrix.  The top-left cell contains '1', while several cells contain '2' and others contain '0'.  The '2' values are shaded a light peach color, and arrows indicate a potential flow or relationship between two adjacent '2' values. The right side displays a graph with nodes representing values and edges representing connections.  The top graph section shows a node labeled '1' connected to a node labeled '2' (highlighted in orange), which is further connected to another node labeled '2' (not highlighted).  The bottom section mirrors this structure, with a node labeled '2' (highlighted in orange) connected to another node labeled '2' (not highlighted).  The text 'dist = 2' appears above and below the graph sections, suggesting that the distance or cost associated with traversing the edges is 2.  The overall image suggests a visualization of how a matrix can be interpreted as a graph, potentially to solve problems involving shortest paths or similar graph-based computations.](/assets/images/dsa/graphs/85f5d62496640076.webp)

As we can see, the outward expansion from the initially infected cell is similar to how level-order traversal works in a tree, where each level represents nodes that are at a specific distance from the initially infected node.

So, let’s perform a level-order traversal to infect cells, starting at the infected cell. **Each level that gets traversed corresponds to 1-second passing in the infection process**.

![Image represents a comparison of two data structures representing the same information.  On the left, a 3x4 matrix is shown, labeled 'second 0' at the top.  The matrix contains numerical values; most cells contain '0' or '1', but one cell in the center is highlighted in a light peach color and contains the value '2'.  On the right, a graph is presented, also labeled 'second 0' near a node. This graph consists of seven circular nodes, each containing the number '1' except for one central node highlighted in orange, which contains the number '2'.  The nodes are connected by lines representing edges. Three nodes form a horizontal line, connected to the central '2' node, which is further connected to another node containing '1' and a pair of nodes at the bottom. The arrangement of the '1's in the graph mirrors the arrangement of '1's in the matrix, with the central '2' in both structures corresponding to the highlighted '2' in the matrix.  The overall image likely illustrates a data transformation or representation of the same data in two different formats, possibly demonstrating a matrix-to-graph conversion or a similar concept within the context of coding patterns.](/assets/images/dsa/graphs/c73aa0f6d0d2ae48.webp)

![Image represents a comparison of two visualizations of data transformation, likely within a coding pattern context.  On the left, a 3x3 matrix displays numerical values (1, 2, and 0). A central 2x2 sub-matrix, highlighted in peach, shows the focus of the transformation. Arrows within this sub-matrix indicate movement of the value '2': upward, then rightward, then downward. The entire matrix is labeled 'second 1' at the top, suggesting a time step or iteration. On the right, a directed graph illustrates the same transformation.  Three nodes labeled '1' are connected linearly, followed by three nodes labeled '2' (highlighted in peach/orange) arranged vertically.  Arrows connect these '2' nodes, mirroring the movement in the matrix.  Horizontal arrows connect the '2' nodes, and the entire graph is annotated with 'second 1' labels next to the vertical and horizontal arrows, again indicating a time step or iteration. The graph visually represents the flow of the value '2' as depicted by the arrows in the matrix, providing an alternative representation of the same data transformation.](/assets/images/dsa/graphs/a46fe1b8c7650b1d.webp)

![Image represents a comparison of two data structure representations, both showing the same data at 'second 2'.  On the left, a 3x4 matrix is displayed.  The matrix contains numerical values; '1' in the top-left corner, '0's in several cells, and '2's concentrated in the central-right area.  Two pairs of '2's are highlighted in a peach color, with left-pointing arrows indicating a potential data flow or transformation within the matrix. The top-right and bottom-right corners contain '0's. Above the matrix, 'second 2' indicates a time step or iteration. On the right, a graph is shown, also labeled 'second 2' at the top and bottom. This graph consists of several interconnected nodes, each containing the number '2', except for one node labeled '1' at the far left.  The '1' node is connected to a peach-colored '2' node, which receives data from another peach-colored '2' node.  A central peach-colored '2' node connects to another peach-colored '2' node at the bottom and a light peach-colored '2' node to the right.  The peach-colored nodes suggest a highlighted or active state, possibly indicating a current processing step or data flow direction within the graph.  The overall image likely illustrates different ways to represent and manipulate the same data, possibly within an algorithm or data structure related to a coding pattern.](/assets/images/dsa/graphs/8fdd191e16e72880.webp)

![Image represents a comparison of two data structure representations at 'second 3'.  On the left, a 3x3 matrix is shown, with some cells containing the number '2' and others containing '0'.  The shading of the cells indicates a gradient, with cells containing '2' having a peach color, the intensity of which varies slightly across the cells.  A left-pointing arrow is present between two '2's in the top row, indicating a data movement or operation. On the right, a graph is displayed, consisting of six nodes, each containing the number '2', connected by lines representing edges.  The nodes are arranged in a roughly square shape with a central node connected to four others.  Similar to the matrix, a left-pointing arrow connects two of the nodes, indicating data flow or a specific operation within the graph structure. Both representations show the same data at a specific time point ('second 3'), illustrating two different ways to visualize and potentially manipulate the same underlying data.](/assets/images/dsa/graphs/e0462cfdde11896d.webp)

Regarding the implementation of this traversal, we know that level-order traversal is a modified version of BFS. So, we use a queue to implement this traversal. If you're unfamiliar with how this works, review the *Rightmost Nodes of a Binary Tree* problem from the *Tree* chapter, which implements a level-order traversal on a binary tree.

Now, let’s consider how we would handle a matrix which initially contains multiple infected cells.

**Matrix with multiple infected cells** Consider the following example and its corresponding graph visualization:

![Image represents a visual comparison of two data structure representations.  On the left, a 3x3 matrix is shown, containing numerical values.  Specifically, the matrix displays the numbers 1, 2, and 0, with the '2' values highlighted in a light peach color. The matrix is enclosed in a bold black border. To the right of the matrix, a large grey curly brace indicates a transformation or mapping.  Following the brace are two graphs, each composed of nodes connected by edges.  The nodes are circles containing the numbers 1 and 2; nodes with the number '2' are highlighted with an orange border. The first graph is a vertical chain of three nodes connected sequentially, with the top and bottom nodes connected to a '2' node each, forming a 'U' shape. The second graph is a 'T' shape, with a central node connected to a node above and two nodes below, one of which is a '2' node.  The graphs visually represent alternative ways to structure or interpret the data presented in the matrix, potentially illustrating a concept like adjacency matrices or graph representations of data.](/assets/images/dsa/graphs/13e5c8a195dea255.webp)

In this example, multiple cells are initially infected, meaning there are multiple cells at level 0 of the traversal.

To handle this, we use a pattern known as **multi-source BFS**. Instead of adding just one cell to the queue before performing level-order traversal, we add every initially infected cell to the queue. This way, the traversal starts with all initially infected cells as level 0, allowing the infection process to begin simultaneously from multiple starting points:

![Image represents a 3x5 matrix where each cell contains a numerical value.  The rows are labeled 0, 1, and 2, and the columns are labeled 0, 1, 2, 3, and 4.  The matrix cells contain the numbers 0, 1, and 2, with some cells highlighted in a light peach color.  These highlighted cells represent elements that are part of a queue, which is defined to the right of the matrix as `queue = [(0, 1) (2, 1) (2, 4)]`.  This queue notation indicates that the coordinates (row, column) of the highlighted cells are (0,1), (2,1), and (2,4).  The numbers within the matrix cells themselves do not appear to directly relate to the queue's structure; rather, the queue identifies specific cell locations within the matrix.](/assets/images/dsa/graphs/577acffc992f41bf.webp)

When we start with multiple cells in the queue, we can see what the level order process looks like:

![Image represents a comparison of two data structure representations.  On the left, a 3x4 matrix is shown, with cells containing numerical values.  The top-left cell contains '1', followed by '2' in the adjacent cell, then '1', and finally '0' in the last cell of the top row. The second row contains '1', '0', '0', and '1'. The bottom row shows '1', '2', '0', and '2'.  Cells containing '2' are highlighted in a light peach color. The entire matrix is labeled 'second 0' at the top. On the right, three separate graphs are depicted, each consisting of interconnected nodes.  The nodes are circles containing the numbers '1' or '2'.  Nodes containing '2' are highlighted in orange. The first graph shows a vertical chain of three '1' nodes, with the bottom '1' node connected to an orange '2' node.  The top '1' node is connected to another '1' node, which is connected to an orange '2' node. The second graph is a simple chain of a '1' node connected to a '1' node, which is connected to an orange '2' node. The third graph is a vertical chain of a '1' node connected to a '1' node, which is connected to an orange '2' node. Each of these graphs is also labeled 'second 0' near the orange '2' node. The image likely illustrates different ways to represent the same underlying data, possibly showcasing a transformation from a matrix representation to a graph representation, potentially highlighting specific elements or patterns within the data.](/assets/images/dsa/graphs/d7c9f536d6cb3a1b.webp)

![Image represents a comparison of data representations.  The leftmost component is a 3x4 grid.  The top row shows the numbers 2, 2, 2, and 0, with arrows indicating left-to-right flow between the first three 2s. The second row contains 1, 0, 0, and 1. The bottom row shows 2, 2, 0, and 0, with an arrow indicating left-to-right flow between the two 2s.  Cells containing 2 are shaded peach. The label 'second 1' appears above the grid. The middle section displays a directed graph with nodes labeled 1 and 2.  Orange-bordered nodes represent the number 2, while unbordered nodes represent 1.  Arrows indicate the direction of flow. The top row shows a 2 pointing to a 2, which points to another 2. The bottom row shows a 2 pointing to a 2. The label 'second 1' appears above and below this graph. The rightmost section shows another directed graph. It consists of three nodes: a top node labeled 1, a middle node labeled 2 (orange-bordered), and a bottom node labeled 2 (orange-bordered). An arrow points from the bottom 2 to the middle 2, and a line connects the middle 2 to the top 1. The label 'second 1' appears to the right of this graph.  The image likely illustrates different ways to represent the same data, possibly showcasing a transition from a tabular representation to a graph representation, emphasizing data flow or relationships.](/assets/images/dsa/graphs/4c0f2a27906313ce.webp)

![Image represents a comparison of data representation and flow using a matrix and graph structures.  The leftmost component is a 3x4 matrix showing numerical data;  peach-colored cells contain the value '2', while white cells contain '0'. Arrows within the matrix indicate data movement: a downward arrow in the leftmost column, an upward arrow in the rightmost column, and a leftward arrow in the central row. The top of the matrix is labeled 'second 2'.  To the right, two graph representations are shown. The first is a 2x2 grid of interconnected nodes, each node containing the value '2'.  The central nodes are highlighted in orange, and arrows indicate data flow between nodes. The text 'second 2' appears next to the central orange node. The second graph is a vertical arrangement of three nodes, with the central node in orange, and the value '2' in each node. Arrows indicate data flow from the bottom node to the central node and from the central node to the top node.  The text 'second 2' appears next to the central and top orange nodes.  The overall image demonstrates different ways to visualize and represent the same data, highlighting the movement or flow of the value '2' within each structure.](/assets/images/dsa/graphs/7f51cce3a4ba9aeb.webp)

**Unreachable uninfected cells** It's important to keep in mind that it's not always possible to infect all uninfected cells. We could encounter situations where it's impossible to reach an uninfected cell, such as in the following example:

![The image represents a visual explanation of a coding pattern, likely related to a 2D array or matrix manipulation.  A 3x3 matrix is shown, with each cell containing a numerical value. The top-middle cell (row 1, column 2) contains the number '2' and is highlighted with a light peach/beige color, suggesting a focus or initial state. The other cells in the first row contain '1' and '1', while the remaining cells contain '0', except for the bottom-left cell (row 3, column 1), which contains '1'. A horizontal arrow points from the text 'this will never be infected' to the bottom-left cell containing '1'. This illustrates that despite the initial state of the matrix, the cell represented by the '1' in the bottom-left corner will remain unchanged, or 'never be infected,' implying a specific algorithm or condition prevents its modification. The overall structure suggests a demonstration of data immutability or a specific algorithm's behavior within a matrix context.](/assets/images/dsa/graphs/0ec0daaee48f411f.webp)

One way to account for this is to search through the matrix after level-order traversal and check if any 1s remain. However, there’s a cleaner way to accomplish this. First, in the loop where we search for all the level 0 infected cells, we can also count how many 1s there are:

![Image represents a 3x3 matrix alongside a queue and a count. The matrix is indexed with row and column numbers from 0 to 2.  The matrix cells contain integers; a '2' is highlighted in a peach/light-orange color at row 0, column 1.  Other cells contain '1's and '0's. To the right of the matrix, a queue is defined as `queue = [(0, 1)]`, representing a coordinate pair (row, column) indicating the position of the highlighted '2'.  Finally, a count `ones = 3` indicates the total number of '1's present within the matrix.  The matrix, queue, and count likely represent an intermediate state in an algorithm, possibly related to searching or processing a 2D array.](/assets/images/dsa/graphs/6415d88612b230d7.webp)

Then, as we perform the level-order traversal, we can decrement this count for each uninfected cell we infect. This way, the value of this count after the traversal will represent the number of cells that remained uninfected. We return -1 if this count is greater than 0:

![Image represents a 3x3 matrix with numerical values and arrows, alongside a decision box.  The matrix is labeled with row and column indices from 0 to 2. The top row (index 0) contains the values 2, 2, and 2, highlighted in a light peach color, with bidirectional arrows indicating movement or comparison between the adjacent '2's. The second row (index 1) contains only zeros (0), and the third row (index 2) contains a '1' in the first column and zeros in the remaining columns.  To the right of the matrix is a dashed-line box containing a condition: 'ones = 1 > 0 → return -1'. This box indicates a decision-making process; if the number of 'ones' in the matrix is greater than 0, the function returns a value of -1.  The matrix likely represents data or a state within a program, and the decision box shows a conditional return statement based on the data within the matrix.](/assets/images/dsa/graphs/fb15e5a66134ce96.webp)

## Implementation

```python
from typing import List
from collections import deque
    
def matrix_infection(matrix: List[List[int]]) -> int:
   dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
   queue = deque()
   ones = seconds = 0
   # Count the total number of uninfected cells and add each infected cell to the
   # queue to represent level 0 of the level-order traversal.
   for r in range(len(matrix)):
       for c in range(len(matrix[0])):
           if matrix[r][c] == 1:
               ones += 1
           elif matrix[r][c] == 2:
               queue.append((r, c))
   # Use level-order traversal to determine how long it takes to infect the
   # uninfected cells.
   while queue and ones > 0:
       # 1 second passes with each level of the matrix that's explored.
       seconds += 1
       for _ in range(len(queue)):
           r, c = queue.popleft()
           # Infect any neighboring 1s and add them to the queue to be processed in
           # the next level.
           for d in dirs:
               next_r, next_c = r + d[0], c + d[1]
               if is_within_bounds(next_r, next_c, matrix) and matrix[next_r][next_c] == 1:
                   matrix[next_r][next_c] = 2
                   ones -= 1
                   queue.append((next_r, next_c))
   # If there are still uninfected cells left, return -1. Otherwise, return the time
   # passed.
   return seconds if ones == 0 else -1
    
def is_within_bounds(r: int, c: int, matrix: List[List[int]]) -> bool:
    return 0 <= r < len(matrix) and 0 <= c < len(matrix[0])
```

### Complexity Analysis

**Time complexity:** The time complexity of `matrix_infection` is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ), where m m m denotes the number of rows, and n n n denotes the number of columns. This is because in the worst case, every cell in the matrix is explored during level-order traversal.

**Space complexity:** The space complexity is O ( m ⋅ n ) O(m\cdot n) O ( m ⋅ n ), primarily due to the queue, which can store up to m ⋅ n m\cdot n m ⋅ n cells.
