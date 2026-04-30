---
title: "Find All Words On A Board"
course: "DSA"
topic: "Tries"
source: "/home/ayush/OOD-Design-Principles/DSA/Tries/Find All Words on a Board
.html"
---
Given a 2D board of characters and an array of words, **find all the words in the array** that can be formed by tracing a path through adjacent cells in the board. Adjacent cells are those which horizontally or vertically neighbor each other. We can't use the same cell more than once for a single word.

#### Example:

![Image represents a step-by-step visualization of a pathfinding algorithm, possibly within a 2D array or grid.  Four 3x3 grids are shown, each representing a stage in the algorithm. Each grid contains letters ('b', 'y', 's', 'r', 't', 'e', 'a', 'i', 'n') arranged in a matrix.  A peach-colored background highlights a subset of cells in each grid. A black dot indicates the starting position, and thick black arrows illustrate the path taken by the algorithm. The path progresses through the grids, changing direction (right, up, down, left) in each step, traversing the highlighted cells. The final grid shows the algorithm completing its path, ending on the letter 'n'.  The algorithm appears to be searching for a specific sequence or pattern within the grid, moving cell by cell based on some underlying logic not explicitly shown in the image.](/assets/images/dsa/tries/1b66ed7ef4c3c359.webp)

```python
Input: board = [['b', 'y', 's'], ['r', 't', 'e'], ['a', 'i', 'n']],
       words = ['byte', 'bytes', 'rat', 'rain', 'trait', 'train']
Output: ['byte', 'bytes', 'rain', 'train']
```

## Intuition

There are many layers to this problem, so let's start by considering a simpler version where we’re only required to search for one word on the board.

**Simplified problem: words array contains one word** With only one word to find, a straightforward approach is to iterate through each cell of the board. If any cell contains the first letter of the word, perform a DFS from that cell in all four directions (left, right, up, down) to find the rest of the word. This process involves backtracking from a cell when we cannot find the next letter of the word in any of its adjacent cells. The process continues until the word is found, or we can no longer find any more letters on the board.

![Image represents a 3x4 grid containing the letters 's', 't', 'a', 'r', 'r', 'a', 'v', 'i', 'e', 'm', 'z', and 'f' arranged row-wise.  The top row, 's', 't', 'a', 'r', is highlighted in peach. A thick black arrow originates from a filled black circle on the letter 's' and points to the letter 'r', indicating a horizontal traversal across the highlighted row.  To the right of the grid, a dashed-line box contains the text 'no 'e' in adjacent cells,' suggesting that the algorithm or process represented is searching for the letter 'e' in horizontally or vertically adjacent cells to the highlighted sequence 'stare,' and in this case, it has not found any. The text 'word = 'stare'' above the grid indicates that the word 'stare' is being processed or searched for within the grid.](/assets/images/dsa/tries/e190322aa828c0ce.webp)

![Image represents a visual depiction of a backtracking algorithm.  A 3x4 grid displays letters; 's', 't', 'a', 'r' in the top row, 'r', 'a', 'v', 'i' in the second, and 'e', 'm', 'z', 'f' in the bottom.  A dark filled circle marks the starting point 's' in the top-left cell. A thick black arrow points right from 's' to 't' and then to 'a', highlighting the path taken by the algorithm. The cells containing 's', 't', and 'a' are shaded light peach, indicating the current path.  To the right of the grid, a dashed-line box displays the text 'no 'r' in adjacent cells,' explaining the reason for backtracking; the algorithm has reached 'a' and cannot find an adjacent 'r' to continue the search. The arrow labeled 'backtrack:' points to the grid, indicating the direction of the algorithm's progression and the reason for the backtracking step.](/assets/images/dsa/tries/b4cec7a71db5332f.webp)

![Image represents a visual depiction of a backtracking algorithm.  A 4x4 grid displays characters ('s', 't', 'a', 'r', 'r', 'a', 'v', 'i', 'e', 'm', 'z', 'f'). A peach-colored area highlights the cells 's', 't', 'a', 'e'. A black filled circle marks the starting point ('s') in the top-left corner of the highlighted area. A thick black line traces a path from 's' to the right to 't', then down to 'a', and finally down to 'e'.  An arrow at the end of the path points downwards, indicating the direction of traversal. To the right of the grid, a dashed-line rectangle displays the text 'found it!', suggesting that the backtracking algorithm has successfully found a target sequence or pattern within the grid, likely represented by the highlighted path 'star'. The text 'backtrack:' precedes the grid, indicating the algorithm's name.](/assets/images/dsa/tries/658df36ed9d9f866.webp)

If you're not familiar with backtracking, it might be useful to review the *Backtracking* chapter before continuing with this problem.

**Original problem - words array contains multiple words** The above approach works well for one word, but repeating this process for every word in the array is quite expensive. Let’s devise a way to make our search more efficient. Consider the following board:

![Image represents a 3x3 grid, enclosed by a thick black border.  The grid is composed of nine equally sized cells, each containing a single lowercase letter.  Reading from left to right and top to bottom, the letters are arranged as follows: 'b', 'y', 's'; 'r', 't', 'e'; 'a', 'i', 'n'. There are no connections or arrows depicted between the cells, and no additional information such as URLs or parameters are present. The letters themselves are the only components within the grid, and their arrangement appears arbitrary, without any apparent pattern or relationship between them beyond their spatial positioning within the grid structure.](/assets/images/dsa/tries/39d91baa9e43f53e.webp)

Let’s say the words array contains the words “byte” and “bytes”. Once we've found "byte", we'd ideally like to extend the search by just one more cell to also find the word "bytes":

![Image represents a 3x3 grid, possibly illustrating a pathfinding or state transition algorithm.  The grid is filled with single-letter labels: 'b' in the top-left cell, 'r' below it, 'a' below that; 'y' in the top-middle cell, 't' below it, 'i' below that; and 's' in the top-right cell, 'e' below it, 'n' below that.  The top-right and middle-right cells are shaded light peach. A black filled circle representing a starting point is located at 'b'. A thick black line traces a path from 'b' horizontally to the right, then down two cells, and finally horizontally to the right again, ending just before the 'e' cell.  A thick grey arrow points upwards from 'e' to 's', suggesting a final transition or movement towards 's', which could be a target or end state. The overall structure suggests a visual representation of a sequence of steps or transitions within a defined space, possibly demonstrating a specific coding pattern or algorithm.](/assets/images/dsa/tries/a745ca2b52185b54.webp)

However, with our initial algorithm, we’d need to restart the search entirely to find "bytes." This is quite inefficient. What we want is a data structure that allows us to efficiently search words with shared prefixes, allowing us to find multiple words without restarting the search for each of them. This is where the **trie** data structure comes into play, as it is excellent for managing prefixes.

Let's begin creating the trie by inserting each word from the provided words array:

![Image represents a Trie data structure visualizing the storage of the words ['byte', 'rat', 'rain', 'bytes', 'trait', 'train'].  A root node labeled 'root' branches into three main paths. The leftmost path, using dark-colored nodes, spells out 'bytes,' with each node representing a letter (b, y, t, e, s). Dashed lines connect the end nodes to labels indicating the complete words formed ('byte' and 'bytes'). The central path, also using dark-colored nodes, initially spells 'rat' (r, a, t), with a dashed line and label indicating the complete word. This path further extends to 'rain' (r, a, i, n) using a lighter-colored node for 'i' and 'n', again with a dashed line and label. The rightmost path, using dark-colored nodes, spells 'train' (t, r, a, i, n), with the final 'n' node having a dashed line and label indicating the complete word.  The lighter-colored nodes in the 'rain' and 'train' paths indicate shared prefixes with other words in the Trie.  The top line shows the Python list containing all the words stored in the Trie.](/assets/images/dsa/tries/a2bad96ef8d0f563.webp)

In this chapter's introduction, we discussed two options to mark the end of a word in a `TrieNode`. Here, we use the `word` attribute instead of `is_word` to determine if a `TrieNode` represents the end of a word, and to know which specific word has ended. This will be important later.

Let’s now use this trie to search for words over the board. We do this by seeing if any paths in the trie correspond with any paths on the board:

![Image represents a Trie data structure illustrating the insertion of words.  A 3x3 grid on the left shows a path (indicated by a black arrow) tracing the letters 'b', 'y', 't', and 'e' from a starting point. An orange arrow connects this path to a vertical chain of nodes ('b', 'y', 't', 'e', 's') forming a branch of a larger Trie. This branch is highlighted in peach, and the node 's' is labeled with `word = 'bytes'`. The main Trie, rooted at 'root' (light gray), branches into three main paths: one leading to 'r', 'a', 'i', 'n' (`word = 'rain'`), another to 't' (`word = 'trait'`), and a third to 't', 'r', 'a', 'i', 'n' (`word = 'train'`).  The 'rain' branch has a node 'n' with a dashed line indicating the word 'rain'. Similarly, dashed lines connect the nodes 't' and 'n' in the 'trait' and 'train' branches, respectively, to indicate the corresponding words.  The structure demonstrates how prefixes are shared efficiently in a Trie, with nodes representing common letter sequences.](/assets/images/dsa/tries/0dc068f0fb640cee.webp)

![Image represents a Trie data structure illustrating word completion.  A 3x3 grid on the left shows a path highlighted from 'b' to 'e', representing the prefix of a word.  A vertical arrow connects this grid to a linear Trie branch on the right, where nodes 'b', 'y', 't', 'e', and 's' are sequentially connected, forming the word 'bytes'.  This branch is highlighted in peach, and the label 'word = 'bytes'' is placed below it.  The main Trie is a tree structure rooted at 'root' (grey node), branching into three main sub-trees. One sub-tree contains the sequence 'r', 'a', 'i', 'n', with a dashed line connecting the 'n' node to the label 'word = 'rain''. Another sub-tree is 'r', 'a', 'i', further branching into 't' (labeled 'word = 'trait'') and 'n' (labeled 'word = 'train''). The third sub-tree is a single branch 't'.  The linear 'bytes' branch is shown as a subset of the main Trie, demonstrating how a word is represented within the structure.](/assets/images/dsa/tries/bfc3db633773283c.webp)

Similarly to how we used backtracking to search through the board when looking for a single word, we can also use backtracking here. Let’s have a closer look at how this works.

**Backtracking using a trie** The first step is similar to what was discussed earlier: we go through the board until we find a cell whose character matches any of the root node's children in the trie, representing the first letter of a word.

As soon as we start going through the board, we notice that the top-left of the board, cell (0, 0), contains the character 'b', which is a child of the trie's root node.

![The image represents a visual comparison of a data structure in two different representations. On the left, a 3x3 grid displays the letters 'b', 'y', 's', 'r', 't', 'e', 'a', 'i', 'n'.  The top-left cell containing 'b' is highlighted in a light peach color. To the right, a tree structure is shown.  The root node, labeled 'root' in light gray, connects to three child nodes: 'b' (highlighted in orange), 'r', and 't', all represented as circles.  The 'b' node corresponds to the highlighted 'b' in the grid.  Dashed lines extend downwards from the 'b', 'r', and 't' nodes, suggesting further levels or children that are not explicitly shown. The overall image illustrates how a data set (the grid of letters) can be represented as a tree structure, with the root node potentially representing the starting point or a key element, and the child nodes representing subsequent elements or branches within the data.](/assets/images/dsa/tries/d4b22421c0d862c1.webp)

We can initiate DFS starting from this cell to see if the board contains the words formed by any of the paths branching from node ‘b’.

Checking through the adjacent cells of cell ‘b’, we notice that one contains ‘y’, which corresponds to a child of node ‘b’. So, let’s make a DFS call to this cell to continue looking for the rest of this trie path on the board.

![Image represents a visual explanation of a coding pattern, likely related to tree structures or data traversal.  On the left, a 3x3 matrix is shown, containing the letters 'b', 'r', 'a', 'y', 't', 'i', 's', 'e', 'n'.  A thick arrow points from 'b' to 'y', highlighting these two letters.  To the right, a tree structure is depicted. The top node is labeled 'root', connected to three child nodes: 'b', 'r', and 't'. The 'b' node is further connected to an orange-highlighted node 'y', which is connected to 't', 'e', and finally 's'.  The 'r' and 't' nodes have dashed lines extending downwards, suggesting incomplete branches.  Below the 'e' and 's' nodes, the text 'byte' and 'bytes' respectively are present, possibly indicating data associated with these nodes. The overall diagram illustrates how a sequence of characters (from the matrix) might be represented and traversed within a tree-like data structure.](/assets/images/dsa/tries/c025f231213bd5b4.webp)

We continue this process until no more trie nodes can be found at an adjacent cell on the board. When this happens, we backtrack to the previous cell on the board to explore a different path.

If we ever reach a node that represents the end of the word (i.e., contains a non-null `word` attribute), we can record that word in our output:

![Image represents a visualization of a Trie data structure traversal algorithm.  The image is divided into three sections, each showing a step in the process.  Each section contains a 3x3 grid representing a portion of the input data ('bytes'), with letters 'b', 'y', 's', 'r', 't', 'e', 'a', 'i', 'n' arranged in a matrix.  Below each grid is a tree structure. The top node of the tree is labeled 'root'.  The first section highlights the letter 't' in the grid with a downward arrow, indicating the traversal starts at 't'. The corresponding tree shows a path from the root to 't', with 'b' and 'y' nodes above it, colored black. The second section shows a rightward arrow from 't' to 'e' in the grid, indicating the traversal moves to 'e'. The tree now extends to 'e', which is also colored black. A dashed arrow points from 'e' to a peach-colored box labeled 'add to 'res'', indicating that 'e' is added to a result string.  The third section shows an upward arrow from 't' to 's' in the grid, indicating the traversal moves up to 's'. The tree now extends to 's', which is colored orange. A dashed arrow points from 's' to a peach-colored box labeled 'add to 'res'', indicating that 's' is added to the result string.  In all three sections, the nodes 'r' and 't' are light gray, indicating they are not part of the current traversal path.  The labels 'byte' and 'bytes' are associated with the nodes 'e' and 's' respectively, suggesting these letters represent parts of a byte or bytes.](/assets/images/dsa/tries/6712ef20772e1059.webp)

As shown, we found two words on the board from the DFS call that started at cell (0, 0). Now, we restart this process for any other cells on the board that match the character of one of the root node’s children.

One important aspect of this backtracking approach is keeping track of visited cells as we explore the board. Without this, we might revisit a cell unintentionally. For example, when exploring both children of node ‘i’, we could end up revisiting cell ‘t’:

![Image represents a visualization of a tree traversal algorithm, likely depth-first search (DFS), alongside a matrix representation illustrating the path.  The left side shows a tree with a root node labeled 'root' and child nodes 'b', 'r', and 't'.  The 't' node branches down to 'r', 'a', and finally 'i', which has children 't' ('trait') and 'n' ('train'). Dashed lines indicate potential further traversal paths not explicitly shown.  The central and right sections depict a 4x3 matrix where each cell contains a character.  An orange arrow points to the 'i' node in the tree, indicating the current position in the traversal.  The matrix sections show the traversal path; a red-highlighted area in the matrix represents the currently visited nodes.  A black dot and a black arrow within the matrix highlight the current character being processed ('t' and 'i' respectively in the first matrix).  A red arrow curves from the 't' in the first matrix to the text ' 't' was previously visited,' indicating a backtracking step due to a previously visited node.  The text 'visit 't'' and 'visit 'n'' indicate the next potential traversal steps based on the tree structure.  The final matrix shows the traversal continuing to 'n'.](/assets/images/dsa/tries/157a2afcf8c25026.webp)

The remedy for this is to either keep track of visited cells using a hash set, or keep track of them in place by changing the visited cell to a special character (like '#') as we traverse:

![Image represents a visualization of a Trie data structure and its traversal.  A tree on the left shows nodes labeled 'root', 'b', 'r', 't', 'r', 'a', 'i', 't', and 'n', connected by edges representing hierarchical relationships.  The 'b' and 'r' nodes branching from the 'root' have dashed lines indicating they are leaf nodes. The 't' node from the 'root' connects to 'r', 'a', 'i', which further branches into 't' and 'n'.  These latter two nodes have dashed lines connected to labels 'trait' and 'train' respectively, suggesting these are terminal nodes representing words. An orange arrow points to the 'i' node. To the right, two 3x3 matrices are shown. The first matrix has header labels 'b', 'y', and 's' and contains '#' symbols in the bottom two rows and 'e' and 'n' in the top and bottom right cells respectively. The bottom-middle cell contains '# → i', indicating a transition or pointer to the 'i' node in the Trie. A horizontal arrow labeled 'visit 'n'' points from the first matrix to the second. The second matrix is identical to the first, except the bottom-right cell now shows '# → n', indicating a transition to the 'n' node, signifying a traversal of the Trie based on the input 'n'.  The overall image illustrates how a Trie is traversed, with the matrices representing a possible state transition during a search or pattern matching operation.](/assets/images/dsa/tries/b1d17a800aa24a43.webp)

This shouldn’t be a permanent change to the board. So, we should undo this change at the end of each recursive call, as demonstrated in the following code snippet:

```python
def dfs(r, c, board, node):
    temp = board[r][c]
    board[r][c] = '#'  # Mark as visited.
    for next_r, next_c in adjacent_cells:
        if board[next_r][next_c] in node.children:
            dfs(next_r, next_c, board, node.children[board[next_r][next_c]])
    board[r][c] = temp  # Mark as unvisited.
```

Now, let’s walk through this process in detail.

For each cell on the board that matches a character of one of the root node’s children, make a recursive DFS call to that cell, passing in the corresponding node. At each of these DFS calls:

1. Check if the current node represents the end of a word. If it does, add that word to the output.
2. Mark the current cell as visited by setting the cell to ‘#’.
3. Recursively explore all adjacent cells that correspond with a child of the current TrieNode .
4. Backtrack by reverting the cell back to its original character (i.e., marking it as unvisited).

**Handling multiple occurrences of the same word on the board** We need to be aware of the risk of adding duplicate words to the output, as the board may contain the same word in multiple locations. Remember that we use the word attribute on each `TrieNode` to check if it represents the end of a word. After recording a word in our output, we can set that node’s `word` attribute to null, ensuring we cannot record the same word again.

## Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None
```

```python
from typing import List
    
def find_all_words_on_a_board(board: List[List[str]], words: List[str]) -> List[str]:
    root = TrieNode()
    # Insert every word into the trie.
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word
    res = []
    # Start a DFS call from each cell of the board that contains a child of the root
    # node, which represents the first letter of a word in the trie.
    for r in range(len(board)):
        for c in range(len(board[0])):
            if board[r][c] in root.children:
                dfs(board, r, c, root.children[board[r][c]], res)
    return res
    
def dfs(board: List[List[str]], r: int, c: int, node: TrieNode, res: List[str]) -> None:
    # If the current node represents the end of a word, add the word to the result.
    if node.word:
        res.append(node.word)
        # Ensure the current word is only added once.
        node.word = None
    temp = board[r][c]
    # Mark the current cell as visited.
    board[r][c] = '#'
    # Explore all adjacent cells that correspond with a child of the current TrieNode.
    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    for d in dirs:
        next_r, next_c = r + d[0], c + d[1]
        if is_within_bounds(next_r, next_c, board) and board[next_r][next_c] in node.children:
            dfs(board, next_r, next_c, node.children[board[next_r][next_c]], res)
    # Backtrack by reverting the cell back to its original character.
    board[r][c] = temp
    
def is_within_bounds(r: int, c: int, board: List[str]) -> bool:
    return 0 <= r < len(board) and 0 <= c < len(board[0])
```

### Complexity Analysis

**Time complexity:** The time complexity of `find_all_words_on_a_board` is O ( L + m ⋅ n ⋅ 3 L ) O(L+m\cdot n\cdot 3L) O ( L + m ⋅ n ⋅ 3 L ) where N N N denotes the number of words in the `words` array, L L L denotes the length of the longest word, and m ⋅ n m\cdot n m ⋅ n denotes the size of the board. Here’s why:

- To build the trie, we insert each word from the input array into it, with each word containing a maximum of L L L characters. This takes O ( N ⋅ L ) O(N\cdot L) O ( N ⋅ L ) time.
- Then, in the main search process, we perform a DFS for each of the mn cells on the board. Each DFS call takes O ( 3 L ) O(3L) O ( 3 L ) time because, at each point in the DFS, we make up to 3 recursive calls: one for each of the 3 adjacent cells (this excludes the cell we came from). This is repeated for, at most, the length of the longest word, L L L .

Therefore, the overall time complexity is O ( N ⋅ L ) + m ⋅ n ⋅ O ( 3 ⋅ L ) = O ( N ⋅ L + m ⋅ n ⋅ 3 L ) O(N\cdot L)+m\cdot n\cdot O(3\cdot L)=O(N\cdot L+m\cdot n\cdot 3L) O ( N ⋅ L ) + m ⋅ n ⋅ O ( 3 ⋅ L ) = O ( N ⋅ L + m ⋅ n ⋅ 3 L ).

**Space complexity:** The space complexity is O ( N ⋅ L ) O(N\cdot L) O ( N ⋅ L ). Here’s why:

- The trie has a space complexity of O ( N ⋅ L ) O(N\cdot L) O ( N ⋅ L ) . In the worst case, if all words have unique prefixes, we store every character of every word in the trie. Each word attribute stored at the end of a path in the trie takes O ( L ) O(L) O ( L ) space, and with N N N words. This contributes an additional O ( N ⋅ L ) O(N\cdot L) O ( N ⋅ L ) space.
- The maximum depth of the recursive call stack is L L L .

Therefore, the overall space complexity is O ( N ⋅ L ) + O ( L ) = O ( N ⋅ L ) O(N\cdot L)+O(L)=O(N\cdot L) O ( N ⋅ L ) + O ( L ) = O ( N ⋅ L ).
