---
title: "FlattenaMulti LevelLinkedList"
course: "DSA"
topic: "LinkedLists"
source: "/home/ayush/OOD-Design-Principles/DSA/LinkedLists/FlattenaMulti-LevelLinkedList___Technical_Interview_Prep.html"
---
In a multi-level linked list, each node has a `next` pointer and `child` pointer. The next pointer connects to the subsequent node in the same linked list, while the child pointer points to the head of a new linked list under it. This creates multiple levels of linked lists. If a node does not have a child list, its `child` attribute is set to null.

**Flatten** the multi-level linked list into a single-level linked list by linking the end of each level to the start of the next one.

#### Example:

![Image represents a tree-like data structure visualized through numbered nodes and directed edges, illustrating a 'flattening' operation.  The structure is organized into three levels labeled 'Level 1,' 'Level 2,' and 'Level 3.' Level 1 contains nodes 1 through 5, connected sequentially by 'next' labeled arrows.  Nodes 2 and 4 have downward-pointing arrows labeled 'child,' connecting them to Level 2 nodes 6 and 8, respectively. Level 2 consists of nodes 6 through 9, with nodes 6 and 8 connected sequentially by 'next' arrows.  Nodes 7 and 9 have downward-pointing 'child' arrows connecting to Level 3 nodes 10 and 11, respectively.  A thick downward arrow labeled 'FLATTEN' indicates a transformation. Below this arrow is a flattened, single-level linked list comprising all nodes (1 through 11) connected sequentially by 'next' arrows, demonstrating the result of the flattening operation where the hierarchical structure is removed, resulting in a linear sequence.  The nodes' colors vary across levels, with Level 1 nodes in light orange, Level 2 in darker reddish-orange, and Level 3 in a yellowish-orange.](/assets/images/dsa/linkedlists/c977fd4446cfb8a0.webp)

## Intuition

Consider the two main conditions required to form the flattened linked list:

1. The order of the nodes on each level needs to be preserved.
2. All the nodes in one level must connect before appending nodes from the next level.

The challenge with this problem is figuring out how we process linked lists in lower levels. One strategy that might come to mind is level-order traversal using breadth-first search. However, breadth-first search usually involves the use of a queue, which would result in at least a linear space complexity. Is there a way we could merge the levels of the linked lists in place?

A key observation is that **for any level of the multi-level linked list, we have direct access to all the nodes on the next level**. This is because each node’s child node at any given level ‘L’ has direct access to nodes on the next level ‘L + 1’:

![Image represents a diagram illustrating a tree-like data structure, specifically showing the relationship between nodes at two levels, labeled 'Level L' and 'Level L + 1'.  At Level L, four black circles representing nodes are arranged horizontally, connected by arrows labeled 'next', indicating a sequential relationship.  Each of the second and fourth nodes in Level L has a downward-pointing arrow labeled 'child' connecting it to a light-blue circle in Level L + 1. These light-blue circles, also representing nodes, are arranged horizontally and connected by arrows labeled 'next', mirroring the structure of Level L. A gray horizontal line with tick marks underneath Level L + 1 visually groups the nodes at that level, and the text 'Level L + 1 nodes are accessible from level L' clarifies that the lower-level nodes are children of, and therefore accessible from, the upper-level nodes.  The overall structure demonstrates a hierarchical relationship where nodes at Level L can access nodes at Level L + 1 through the 'child' connections.](/assets/images/dsa/linkedlists/2d1e91e1f12432f8.webp)

How can we connect the nodes on level ‘L + 1’ to the end of level ‘L’? Since we have access to the nodes at the next level from the current level’s child pointers, we can append each child linked list to the end of the current level, which effectively merges these two levels into one.

![Image represents a diagram illustrating a linked list data structure with nested lists.  The diagram shows a sequence of five solid-line circles connected by solid-line arrows labeled 'next,' representing nodes in a primary linked list. The third and fourth nodes have downward-pointing arrows labeled 'child,' connecting them to separate light-blue rectangular boxes. Each box contains a smaller linked list of two nodes (solid-line circles) connected by a 'next' arrow.  The primary list then continues with two additional nodes represented by dashed-line circles within a light-blue rectangle, also connected by 'next' arrows.  Finally, a light-blue upward-pointing arrow connects the bottom of each of the child linked lists to the dashed-line nodes in the primary list, indicating a hierarchical relationship where the child lists are appended to the main list.  The overall structure depicts a tree-like organization where the main list acts as the parent, and the child lists are sub-lists branching from specific nodes.](/assets/images/dsa/linkedlists/6ec5d355bf64cbf5.webp)

So, with all the nodes on level ‘L + 1’ appended to level ‘L’, we can continue this process by appending nodes from level ‘L + 2’ to level ‘L + 1’, and so on.

Now that we have a high-level idea about what we should do, let’s try this strategy on the following example:

![Image represents a directed acyclic graph illustrating a coding pattern, possibly a tree-like data structure.  The graph is composed of ten nodes, numbered 1 through 10, represented as circles with varying shades of orange and brown.  Nodes 1, 2, 3, and 4 are lighter orange, while nodes 5, 6, 7, and 8 are darker brown. Nodes 9 and 10 are a lighter orange than nodes 1-4.  Arrows connect the nodes, indicating direction.  Nodes 1, 2, 3, and 4 are linked horizontally by arrows labeled 'next,' forming a sequence. Node 1 has a downward arrow labeled 'child' connecting it to node 5, and node 4 has a downward arrow labeled 'child' connecting it to node 7. Similarly, nodes 5 and 6 are linked horizontally by an arrow labeled 'next,' with node 6 having a downward arrow labeled 'child' connecting it to node 9.  Nodes 7 and 8 are linked horizontally by an arrow labeled 'next,' with node 7 having a downward arrow labeled 'child' connecting it to node 10. The label 'head: 1' indicates node 1 as the starting point or root of the structure.  The overall structure suggests a combination of linked lists (horizontal 'next' connections) and a tree-like hierarchy (vertical 'child' connections).](/assets/images/dsa/linkedlists/944e578c8c416f33.webp)

We’ll start by appending level 2’s nodes to the end of level 1. Before we can do this, we would need a reference to level 1’s tail node so we can easily add nodes to the end of the linked list. To set this reference, we'll create a tail pointer and advance it through level 1's linked list until it reaches the last node, which happens when tail.next is equal to null:

![Image represents a singly linked list data structure.  The list is labeled 'head:' and consists of four nodes, each represented by an orange circle containing a numerical value (1, 2, 3, and 4). Each node, except the last, has a solid black arrow labeled 'next' pointing to the subsequent node, indicating the directional flow of data within the list.  Dashed light-blue curved arrows connect each node to the `tail` which is represented by a light-blue rectangular box containing the text 'tail'. These dashed arrows visually represent the connection to the tail, but don't imply a direct data flow in the same way as the 'next' arrows. The overall structure shows a linear sequence of nodes, where each node points to the next, and all nodes are indirectly connected to the tail.](/assets/images/dsa/linkedlists/ac4a73cbc500f05d.webp)

Now, let’s add the child linked lists (5 → 6 and 7 → 8) to the tail node. We must keep the tail pointer fixed at the end of the linked list, so let’s introduce a separate pointer, `curr`, to traverse the linked list. Whenever `curr` encounters a node with a child node that isn’t null, we know we’ve found a child linked list. In the example, the first node (node 1) has a child linked list, which we want to add to the tail node:

![Image represents a linked list data structure illustrating a coding pattern.  The main list is composed of orange-filled nodes (1, 2, 3, 4) connected by arrows labeled 'next,' indicating the directional flow of data.  A gray box labeled 'curr' points to node 1, signifying a current pointer. A light-blue box labeled 'tail' points to node 4, indicating the tail of the main list. Node 1 has a downward-pointing arrow labeled 'child' connecting it to a sub-list enclosed in a green box. This sub-list contains brown-filled nodes (5, 6) also linked by 'next' arrows.  Node 4 similarly has a downward-pointing arrow labeled 'child' connecting it to another sub-list with brown-filled nodes (7, 8) linked by 'next' arrows. The text 'add to tail' is written below the first sub-list, suggesting a potential operation.  The overall structure shows a main list with child lists branching from specific nodes, demonstrating a hierarchical or tree-like structure within a linked list context.](/assets/images/dsa/linkedlists/d68597d0ec247336.webp)

To add this child linked list to the end of the tail node, set tail.next to the head of the child list:

![Image represents a linked list data structure illustrating a coding pattern.  The main list, labeled 'head:', consists of orange nodes numbered 1 through 4, connected sequentially by 'next' pointers.  A gray box labeled 'curr' points to node 1, indicating a current pointer. Node 1 has a downward-pointing 'child' pointer to a sub-list enclosed in a green box, containing maroon nodes 5 and 6 linked by a 'next' pointer.  Similarly, node 4 has a downward-pointing 'child' pointer to a maroon node 7, which is linked to node 8 via a 'next' pointer. A light-blue box labeled 'tail' points to node 4, indicating the tail of the main list.  A dashed-line box displays the code snippet 'tail.next = curr.child', representing an operation to append the child list to the main list, connecting the tail of the main list to the head of the child list.](/assets/images/dsa/linkedlists/45c9c72ec833d855.webp)

![Image represents a linked list data structure with additional child pointers illustrating a tree-like structure.  The main list is composed of nodes numbered 1 through 6, each node (except the last) connected to the next by a 'next' pointer represented by an arrow.  Node 1 is labeled 'head,' indicating the start of the list.  A light blue box labeled 'tail' points to node 4.  Nodes 5 and 6 are enclosed in a green box, suggesting a sub-section or a different level in the structure.  Each of nodes 1, 4, and 6 has a downward-pointing 'child' pointer connecting it to another node: node 1 points to node 5, node 4 points to node 7, and node 6 points to node 9.  Nodes 5 and 6 are also linked together via a 'next' pointer.  Nodes 7, 8, and 9 form a secondary linked list, with node 7 connected to node 8 via a 'next' pointer.  Nodes 5 and 6 are lighter gray than the main list, suggesting a different level or type of data.  The overall structure shows a combination of a singly linked list and a tree structure, where the main list has nodes with child pointers creating branches.](/assets/images/dsa/linkedlists/1094c3dd7d7956e1.webp)

Before incrementing `curr` to find the next node with a child linked list, we need to readjust the position of the tail pointer so it’s pointing at the last node of the newly extended linked list (node 6 in this case). Again, we can do this by iterating the tail pointer until its next node is null:

![Image represents a linked list data structure with nested lists.  The main list, labeled 'head:', consists of nodes numbered 1 through 6, each represented by an orange circle containing its value.  Solid black arrows labeled 'next' connect these nodes sequentially, indicating the order of elements. Node 1 has a downward-pointing arrow labeled 'child' connecting it to a smaller, gray node labeled 5, which is linked to another gray node labeled 6 via a 'next' arrow. Similarly, node 4 has a 'child' arrow pointing to a darker-red node labeled 7, which connects to node 8 via a 'next' arrow. Finally, node 6 has a 'child' arrow pointing to an orange node labeled 9.  A light-blue dashed arrow points from node 4 to node 5, and another from node 5 to node 6, suggesting a secondary connection or traversal path.  Rectangular boxes labeled 'curr' and 'tail' indicate pointers to the beginning and end of the main list, respectively, with arrows showing their positions.  The overall structure depicts a linked list where some nodes have child lists branching off, demonstrating a tree-like structure within the main linear list.](/assets/images/dsa/linkedlists/2456c0d9c472fa39.webp)

With the tail pointer now repositioned, we can continue this process of:

- Finding the next node with a child linked list using the `curr` pointer.
- Adding the child linked list to the tail node.
- Advancing the tail pointer to the last node of the flattened linked list.

![Image represents a linked list data structure illustrating the process of adding a node to the tail.  The main list is composed of orange-filled nodes (1-6) labeled sequentially, each connected to the next by a directed arrow labeled 'next'.  A gray-filled sub-list (5, 6) branches down from node 1, indicating a 'child' relationship.  A dark-red filled sub-list (7, 8) branches down from node 4, also labeled 'child' and enclosed in a green box with the text 'add to tail' below.  A light-orange node (9) hangs off node 6, also labeled 'child'.  A gray box labeled 'curr' points to node 4, and a light-blue box labeled 'tail' points to node 6, indicating the current and tail pointers respectively.  Finally, a green box contains two dashed-line circles representing empty nodes, connected by a 'next' arrow, showing the space where new nodes would be added to the tail of the main list.  The arrows indicate the direction of the 'next' pointers in the list.](/assets/images/dsa/linkedlists/4d893f17cc4131ec.webp)

![Image represents a linked list data structure illustrating an operation.  The main list is composed of nodes numbered 1 through 8, each node (except the last) containing an integer value and a 'next' pointer connecting it to the subsequent node.  Nodes 1 through 4 are colored light orange, while nodes 5 through 8 are dark red.  The 'head' label points to node 1, indicating the beginning of the list.  A light gray linked list, labeled 'child', branches off from nodes 1 and 4, containing nodes 5-6 and 7-8 respectively.  A blue box labeled 'tail' points to node 8, indicating the current end of the main list. A gray dashed-line box represents a new node to be added. A green box labeled '9' is shown below node 6, representing a new node being added to the list.  A dark orange node labeled '10' is shown below node 8, representing the new tail of the list after the addition.  A black box labeled 'curr' points to node 6, indicating the current node being processed. The text 'add to tail' in green indicates the operation being performed.  The arrows represent the 'next' pointers, showing the directional flow of data within the linked list.](/assets/images/dsa/linkedlists/ad556fc0addba5a5.webp)

![Image represents a linked list data structure illustrating the process of adding a node to the tail.  The list begins with a 'head' node labeled '1', colored orange, connected via 'next' pointers to subsequent nodes (2, 3, 4, 5, 6, 7, 8, and 9) with colors transitioning from orange to dark-red and then orange again.  Nodes 2, 3, 4, 6, and 7 are also colored orange, while 5 is dark-red.  Each node, except the last, points to the next node in the sequence.  Nodes 1, 2, 3, 4, 6, and 7 have downward-pointing arrows labeled 'child' connecting them to secondary linked lists (5-6, 7-8, and 9 respectively), represented by lighter gray nodes.  A 'curr' pointer points to node 8, and a 'tail' pointer points to node 9.  A new node, '10', colored orange and enclosed in a green box, is being added to the tail, indicated by the text 'add to tail' and an arrow from node 8 to node 10.  The final node in the main list is represented by a dashed-line box, indicating that it is the current end of the list before the addition of node 10.](/assets/images/dsa/linkedlists/6973591a3840bcd9.webp)

![Image represents a linked list data structure with nodes numbered 1 through 10.  The nodes are connected by directed edges labeled 'next,' indicating the sequential order. Nodes 1 through 4 are colored light orange, nodes 5 through 7 are dark red, and nodes 8 through 10 are light orange.  The list starts with a 'head' pointer pointing to node 1.  Each node (except the last) points to the next node in the sequence via its 'next' pointer.  Additionally, nodes 4, 6, and 8 have downward-pointing edges labeled 'child,' each connecting to a separate, smaller linked list containing nodes 5-6, 7-8, and 9-10 respectively. These child lists also use 'next' pointers to link their nodes. A 'curr' pointer points to node 8, and a 'tail' pointer points to node 10, indicating current position and the end of the main list.](/assets/images/dsa/linkedlists/42003222a12e9c02.webp)

After the process is complete, we can return head, which is the head of the flattened linked list.

One last important detail to mention is that after appending any child linked list to the tail, we should nullify the `child` attribute to ensure the linked list is fully flattened.

## Implementation

The definition of the `MultiLevelListNode` class is provided below:

```python
class MultiLevelListNode:
    def __init__(self, val, next, child):
        self.val = val
        self.next = next
        self.child = child
```

```python
from ds import MultiLevelListNode
   
def flatten_multi_level_list(head: MultiLevelListNode) -> MultiLevelListNode:
    if not head:
        return None
    tail = head
    # Find the tail of the linked list at the first level.
    while tail.next:
        tail = tail.next
    curr = head
    # Process each node at the current level. If a node has a child linked list,
    # append it to the tail and then update the tail to the end of the extended linked
    # list. Continue until all nodes at the current level are processed.
    while curr:
        if curr.child:
            tail.next = curr.child
            curr.child = None
            while tail.next:
                tail = tail.next
        curr = curr.next
    return head
```

### Complexity Analysis

**Time complexity:** The time complexity of `flatten_multi_level_list` is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the multi-level linked list. This is because we iterate through each node in the multi-level linked list at most twice: once to iterate tail and once to iterate `curr`.

**Space complexity:** We only allocated a constant number of variables, so the space complexity is O ( 1 ) O(1) O ( 1 ).
