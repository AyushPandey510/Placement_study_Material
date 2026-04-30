---
title: "Shortest Transformation Sequence"
course: "DSA"
topic: "Graphs"
source: "/home/ayush/OOD-Design-Principles/DSA/Graphs/Shortest Transformation Sequence.html"
---
Given two words, `start` and `end`, and a dictionary containing an array of words, return the **length of the shortest transformation sequence** to transform start to end. A transformation sequence is a series of words in which:

- Each word differs from the preceding word by exactly one letter.
- Each word in the sequence exists in the dictionary.

If no such transformation sequence exists, return 0.

#### Example:

```python
Input: start = 'red', end = 'hit',
       dictionary = [
            'red', 'bed', 'hat', 'rod', 'rad', 'rat', 'hit', 'bad', 'bat'
       ]
Output: 5
```

### Constraints:

- All words are the same length.
- All words contain only lowercase English letters.
- The dictionary contains no duplicate words.

## Intuition

In a transformation sequence, each transformation involves changing one letter of a word to get another word. Consider the following example:

![Image represents a simple data structure used in a coding pattern, likely related to string manipulation or search algorithms.  The image displays two lines of code-like text. The top line defines two variables: `start` which is assigned the string value 'red', and `end` which is assigned the string value 'hit'. The bottom line declares a variable named `dictionary` and assigns it a list or array containing a series of strings: 'red', 'bed', 'hat', 'rod', 'rad', 'rat', 'hit', 'bad', and 'bat'.  There are no visible connections or information flow between the variables; they are simply defined and initialized with their respective values. The arrangement suggests that the `start` and `end` variables might represent the beginning and ending points of a search within the `dictionary`, although this is not explicitly shown.](/assets/images/dsa/graphs/ae4aaee864baad4b.webp)

We know our transformation sequence should start with the word “red”, but how can we identify subsequent words in the sequence? The words that could immediately follow “red” are “bed”, “rad”, or “rod”, since each differs from “red” by one letter:

![Image represents a tree-like data structure, likely illustrating a concept in graph theory or a specific coding pattern.  The structure consists of four circular nodes connected by lines. A central node labeled 'red' is connected to three subordinate nodes: 'bed' on the left, 'rad' below, and 'rod' on the right.  The lines represent connections or relationships between the nodes, suggesting a hierarchical or parent-child relationship where 'red' is the parent node and 'bed,' 'rad,' and 'rod' are its children. No other information, such as URLs or parameters, is present within the image. The arrangement visually demonstrates a simple tree structure with a single root node ('red') and three leaf nodes ('bed,' 'rad,' and 'rod').](/assets/images/dsa/graphs/be8ecf610e53e0af.webp)

Similarly, we can make a direct connection between each word and its one-letter-off neighbors:

![Image represents a directed acyclic graph (DAG) where nodes represent words and edges represent relationships between them.  The topmost node is labeled 'red,' connected to three nodes below: 'bed,' 'rad,' and 'rod.'  'Bed' connects to 'bad,' which in turn connects to 'bat.' 'Rad' connects to both 'bad' and 'rat.' 'Rod' has no outgoing connections. 'Rat' connects to both 'bat' and 'hat,' and 'hat' connects to 'hit.'  The graph visually depicts a hierarchical or tree-like structure, although not strictly a tree due to the connection between 'rad' and 'rat.'  No URLs or parameters are present; the only information conveyed is the textual labels on the nodes and the connections between them, suggesting a potential relationship between the words, perhaps based on phonetic similarity or other linguistic criteria.](/assets/images/dsa/graphs/dd091032b2010a19.webp)

This structure resembles a graph, indicating that finding the shortest transformation sequence involves finding the shortest path in this graph from the start node (“red”) to the end node (“hit”):

![The image represents a directed graph illustrating a word transformation problem.  The graph consists of nodes representing words ('red,' 'bed,' 'bad,' 'bat,' 'rad,' 'rod,' 'rat,' 'hat,' 'hit') and edges representing single-letter changes between words.  Nodes are depicted as circles, with 'red' and 'hit' in light blue, 'rad,' 'rat,' and 'hat' in orange, and the rest in black.  Edges are shown as arrows; grey arrows connect words with one letter difference, while orange arrows highlight the shortest transformation path from 'red' to 'hit'. The path follows the sequence: 'red' → 'rad' → 'rat' → 'hat' → 'hit'.  To the right of the graph, the text 'shortest path → shortest transformation sequence' explains that finding the shortest path in the graph corresponds to finding the shortest sequence of word transformations.](/assets/images/dsa/graphs/ab405667b704633f.webp)

**Finding the shortest path** When tasked with a graph problem that involves finding the shortest path between two nodes, BFS should come to mind. From the start node, BFS works by exploring all neighbors at a distance of 1 from the start node, followed by exploring nodes at a distance of 2, and so on. This means that once we find the end node, we’ve reached it via the shortest possible distance.

So, let’s use **level-order traversal**, a variant of BFS, to find the shortest path in this graph, where each level we traverse represents nodes that are a specific distance from the start node:

![Image represents a three-stage visualization of a breadth-first search (BFS) algorithm on a graph.  The graph consists of nodes representing words ('red,' 'bed,' 'rad,' 'rod,' 'bad,' 'rat,' 'bat,' 'hat,' 'hit') connected by edges. Stage 1 shows the initial state with the node 'red' (highlighted in orange) at distance 0 from itself.  Stages 2 and 3 depict subsequent iterations of the BFS.  In each stage, nodes are colored orange as they are visited, with an associated 'dist' value indicating their distance from the starting node 'red'.  Grey edges represent existing connections in the graph, while orange arrows show the traversal path during the BFS algorithm.  Stage 2 shows nodes 'bed' and 'rad' (orange) at distance 1 from 'red,' connected by orange arrows labeled 'dist=1'. Stage 3 shows nodes 'bad' and 'rat' (orange) at distance 2 from 'red,' connected by orange arrows labeled 'dist=2'.  The algorithm progresses layer by layer, exploring nodes at increasing distances from the source node 'red'.](/assets/images/dsa/graphs/fc8b724cea5151e9.webp)

![Image represents two directed acyclic graphs illustrating a shortest path algorithm.  Both graphs share a common upper structure consisting of three levels. The top level contains a single node labeled 'red,' connected to three nodes ('bed,' 'rad,' 'rod') on the second level. The second level nodes are connected to nodes on the third level ('bad,' 'rat').  The difference lies in the lower structure. In graph 4, 'bad' connects to an orange-highlighted node 'bat,' and 'rat' connects to an orange-highlighted node 'hat.'  'bat' and 'hat' are connected to a black-highlighted node 'hit.'  The edges connecting 'bad' to 'bat' and 'rat' to 'hat' are labeled 'dist=3,' indicating a distance of 3. In graph 5, the upper structure remains identical, but the lower structure shows 'bad' and 'rat' connecting to 'bat' and 'hat' respectively, with additional connections between 'bad' and 'bat,' and 'bat' and 'hat.'  'hat' connects to 'hit,' and the edge is labeled 'dist=4,' indicating a distance of 4.  The orange highlighting suggests a path, and the black highlighting indicates a target node. The numbers '4' and '5' above each graph likely represent steps or iterations in the algorithm.](/assets/images/dsa/graphs/047d83a697e7619e.webp)

As we can see, we managed to find the end node via the shortest path. To return the length of this path, we return dist, plus 1, to include the start node. If you’re unfamiliar with how level-order traversal works, review the *Matrix Infection* problem in this chapter.

Note that during traversal, we need to ensure we don’t revisit previously traversed strings. By storing the visited strings in a **hash set**, we can quickly check if a string was already visited.

Now, let’s figure out how to build the above graph.

**Building the graph** We can represent the graph as an adjacency list, where each word has a list of all of its neighboring words:

![Image represents a graph data structure depicted in a textual format.  The text is labeled 'graph:' and presents a series of key-value pairs. Each key is a string enclosed in double quotes (e.g., 'red'), representing a node in the graph.  The value associated with each key is a list of strings, also enclosed in square brackets, representing the nodes directly connected to the key node (its neighbors). For instance, 'red': [ 'bed', 'rad', 'rod'] indicates that the node 'red' is connected to nodes 'bed', 'rad', and 'rod'.  Similarly, 'bed' connects to 'red' and 'bad', 'hat' connects to 'rat', 'bat', and 'hit', and 'hit' connects only to 'hat'.  The ellipsis (...) suggests that there might be more key-value pairs not shown in the image, implying a larger graph.  The overall structure represents an adjacency list representation of a directed or undirected graph, depending on whether the connections are considered bidirectional.](/assets/images/dsa/graphs/415740d85eb2cbb6.webp)

The challenge here is finding each word’s neighbors. Consider the word “red”. One way we can identify all words that are one letter different from “red” is to generate all possible words by changing each letter in “red” to every other letter in the alphabet. For each of these generated words, we check if it exists in the dictionary. If it does, it’s a neighbor of “red”:

![Image represents a tree-like data structure, possibly illustrating a coding pattern related to string manipulation or data partitioning.  The root node is labeled 'red'.  Three branches emanate from the root, labeled '_ed', 'r_d', and 're_'. Each branch further subdivides into a series of nodes, indicated by right-pointing arrows.  The '_ed' branch contains nodes 'aed', 'bed', 'ced', and 'zed', suggesting an alphabetical sequence. Similarly, 'r_d' branch shows 'rad', 'rod', and 'rzd', and the 're_' branch displays 'rea', 'reb', 'rec', and 'rez'.  The ellipses (...) indicate potential continuation of the sequence in each branch, implying scalability.  The color coding (orange for some labels) might highlight specific elements or operations within the pattern, though the exact meaning is not explicitly defined in the image. The overall structure suggests a hierarchical breakdown of the root string 'red' into substrings based on a defined pattern.](/assets/images/dsa/graphs/2ad9738648c19e47.webp)

To make checking the dictionary more efficient, we can store the words from the dictionary in a hash set, enabling us to verify the existence of a word in constant time.

Note that before we build the graph, it’s important to check if start or end exists in the dictionary. If either is missing, we can immediately return 0, since each word in the sequence needs to be in the dictionary.

**Space optimization** The purpose of the above adjacency list is to facilitate graph traversal. However, we can avoid building it altogether by leveraging the fact that each word in the dictionary is only visited once during the BFS traversal, indicating we only ever need access to the neighbors of each word once.

If we had a way to generate each word’s neighbors when needed during BFS traversal, we could avoid creating the adjacency list, and save some space that would otherwise be taken up by it.

## Implementation

```python
def shortest_transformation_sequence(start: str, end: str, dictionary: List[str]) -> int:
    dictionary_set = set(dictionary)
    if start not in dictionary_set or end not in dictionary_set:
        return 0
    if start == end:
        return 1
    lower_case_alphabet = 'abcdefghijklmnopqrstuvwxyz'
    queue = deque([start])
    visited = set([start])
    dist = 0
    # Use level-order traversal to find the shortest path from the start word to the
    # end word.
    while queue:
        for _ in range(len(queue)):
            curr_word = queue.popleft()
            # If we found the end word, we've reached it via the shortest path.
            if curr_word == end:
                return dist + 1
            # Generate all possible words that have a one-letter difference to the
            # current word.
            for i in range(len(curr_word)):
                for c in lower_case_alphabet:
                    next_word = curr_word[:i] + c + curr_word[i+1:]
                    # If 'next_word' exists in the dictionary, it's a neighbor of the
                    # current word. If it's unvisited, add it to the queue to be
                    # processed in the next level.
                    if next_word in dictionary_set and next_word not in visited:
                        visited.add(next_word)
                        queue.append(next_word)
        dist += 1
    # If there is no way to reach the end node, then no path exists.
    return 0
```

### Complexity Analysis

**Time complexity:** The time complexity of shortest_transformation_sequence is O ( n ⋅ L 2 ) O(n\cdot L^2) O ( n ⋅ L 2 ), where n n n denotes the number of words in the dictionary, and L L L denotes the length of a word. Here’s why:

- Creating a hash set containing all the words in the dictionary takes O ( n ⋅ L ) O(n\cdot L) O ( n ⋅ L ) time, because hashing each of the n n n words takes O ( L ) O(L) O ( L ) time.
- Level-order traversal processes at most n n n words from the dictionary. At each of these words, we generate up to 26 L 26L 26 L transformations, and it takes O ( L ) O(L) O ( L ) time to check if a transformation exists in the visited and dictionary_set hash sets, and to enqueue it. This means level-order traversal takes approximately O ( n ⋅ 26 L ⋅ L ) = O ( n ⋅ L 2 ) O(n\cdot 26L\cdot L)=O(n\cdot L^2) O ( n ⋅ 26 L ⋅ L ) = O ( n ⋅ L 2 ) time.

Therefore, the overall time complexity is O ( n ⋅ L ) + O ( n ⋅ L 2 ) = O ( n ⋅ L 2 ) O(n\cdot L)+O(n\cdot L^2)=O(n\cdot L^2) O ( n ⋅ L ) + O ( n ⋅ L 2 ) = O ( n ⋅ L 2 ).

**Space complexity:** The space complexity is O ( n ⋅ L ) O(n\cdot L) O ( n ⋅ L ), taken up by the `dictionary_set` hash set, the `visited` hash set, and the `queue`.

## Optimization - Bidirectional Traversal

An important observation is that we don’t necessarily need to begin level-order traversal at the start word: we can also start a search at the end word. In fact, we can combine these by performing them simultaneously to find the shortest path. This is known as bidirectional BFS, or in this case, bidirectional level-order traversal.

When we perform two searches, one from start and one from end, the idea is that they will meet in the middle if a path between these two words exists. If a path doesn’t exist, the searches will never meet, indicating that a transformation sequence does not exist.

This optimization allows us to identify the shortest distance more quickly. We can see in the example below that regular level-order traversal ends up traversing through more nodes than in the bidirectional traversal, while also requiring 4 iterations instead of 2.

![Image represents a comparison of two graph traversal methods: level-order traversal and bidirectional level-order traversal.  The left side depicts a level-order traversal, showing a graph structured in levels (1 through 4), with nodes connected by black lines.  An orange curved line highlights the path taken during the traversal, starting from a node labeled 'start' (orange fill) and ending at a node labeled 'end' (light gray fill).  Level numbers are indicated in orange text next to the corresponding level's nodes. The right side illustrates a bidirectional level-order traversal, using the same graph structure but with two traversal paths highlighted: one orange, starting from a 'start' node (light gray fill), and another light blue, starting from the 'end' node (light blue fill). Both paths progress through the levels, with level numbers (in black text) indicating the level of each node.  The traversal paths converge in the middle of the graph, suggesting a meeting point during the bidirectional search.  Both sides include additional gray nodes extending beyond the main graph structure, representing potential further levels or branches not included in the primary traversal paths.](/assets/images/dsa/graphs/5802335e87bb0474.webp)

We alternate between these two steps until a node visited in one search has already been visited in the other search, indicating that the traversals have met. Here’s what this alternating process looks like:

![Image represents two diagrams illustrating traversal methods across a layered graph structure.  The left diagram, titled 'start traversal,' shows a graph with a designated 'start' node (orange) and an 'end' node (light blue).  Nodes are arranged in layers, connected by lines. A thick orange curved line visually separates the nodes, indicating a traversal path. Above the diagram, a box displays 'level_start += 1,' indicating an incrementing level counter during traversal.  Below, 'level_start = 1' shows the initial value of this counter. The right diagram, titled 'end traversal,' mirrors the structure but uses a light gray 'start' node and a light blue 'end' node. A thick light blue curved line represents the traversal path in this case.  Similarly, a box above displays 'level_end += 1,' and 'level_end = 1' is shown below, indicating a level counter incrementing from 1 during this traversal. Both diagrams use the same underlying graph structure, but the traversal paths and associated counters differ, highlighting different approaches to traversing the graph.](/assets/images/dsa/graphs/bc6c3bf2bbeb857d.webp)

![Image represents a visual explanation of a graph traversal algorithm.  The image is divided into two parts, 'start traversal' and 'end traversal,' each showing a directed acyclic graph.  Both graphs have a 'start' node (colored orange in the left graph, gray in the right) and an 'end' node (colored cyan).  The 'start traversal' section depicts a traversal from the start node, indicated by an orange curved line incrementing `level_start` from 1 to 2.  Simultaneously, a light-gray line shows a traversal from the end node, incrementing `level_end` from an implied 0 to 1.  The 'end traversal' section shows the continuation of these traversals, with the orange line representing `level_start` (now equal to 2) and the cyan line representing `level_end` (now equal to 2).  These lines intersect, signifying the meeting of the traversals.  A box in the 'end traversal' section states that when traversals meet, the algorithm returns `level_start + level_end + 1`.  Both graphs are structured similarly, with nodes connected to form a hexagonal pattern, and the traversals are visually represented by colored curved lines that pass through multiple nodes.](/assets/images/dsa/graphs/6f22ec0b455eb3cf.webp)

To check if a node has already been visited by the other traversal, we can query the visited hash set used by the other traversal. If a word exists in the visited hash set of the other traversal, we know the searches have met.

## Implementation - Bidirectional Traversal

```python
from typing import List
from collections import deque
    
def shortest_transformation_sequence_optimized(start: str, end: str, dictionary: List[str]) -> int:
    dictionary_set = set(dictionary)
    if start not in dictionary_set or end not in dictionary_set:
        return 0
    if start == end:
        return 1
    start_queue = deque([start])
    start_visited = {start}
    end_queue = deque([end])
    end_visited = {end}
    level_start = level_end = 0
    # Perform a level-order traversal from the start word and another from the end
    # word.
    while start_queue and end_queue:
        # Explore the next level of the traversal that starts from the start word. If
        # it meets the other traversal, the shortest path between 'start' and 'end'
        # has been found.
        level_start += 1
        if explore_level(start_queue, start_visited, end_visited, dictionary_set):
            return level_start + level_end + 1
        # Explore the next level of the traversal that starts from the end word.
        level_end += 1
        if explore_level(end_queue, end_visited, start_visited, dictionary_set):
            return level_start + level_end + 1
    # If the traversals never met, then no path exists.
    return 0
    
# This function explores the next level in the level-order traversal and checks if
# two searches meet.
def explore_level(queue, visited, other_visited, dictionary_set) -> bool:
    lower_case_alphabet = 'abcdefghijklmnopqrstuvwxyz'
    for _ in range(len(queue)):
        current_word = queue.popleft()
        for i in range(len(current_word)):
            for c in lower_case_alphabet:
                next_word = current_word[:i] + c + current_word[i+1:]
                # If 'next_word' has been visited during the other traversal, it means
                # both searches have met.
                if next_word in other_visited:
                    return True
                if next_word in dictionary_set and next_word not in visited:
                    visited.add(next_word)
                    queue.append(next_word)
    # If no word has been visited by the other traversal, the searches have not met
    # yet.
    return False
```

**Time complexity:** The time complexity of `shortest_transformation_sequence_optimized` is O ( n ⋅ L 2 ) O(n\cdot L^2) O ( n ⋅ L 2 ), since we’re performing two level-order traversals. Note that this is more efficient in practice since there are potentially fewer nodes to traverse when using bidirectional traversal.

**Space complexity:** The space complexity is O ( n ⋅ L ) O(n\cdot L) O ( n ⋅ L ), taken up by the `dictionary_set` hash set, the visited hash sets, and both queues.
