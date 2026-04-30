---
title: "IntroductiontoLinkedLists"
course: "DSA"
topic: "LinkedLists"
source: "/home/ayush/OOD-Design-Principles/DSA/LinkedLists/IntroductiontoLinkedLists___Technical_Interview_Prep.html"
---
## Intuition

A linked list is a data structure consisting of a sequence of nodes, where each node is linked to the next. A node in a linked list has two main components: the data it stores (`val`) and a reference to the next node (`next`) in the sequence:

![The image represents a single node in a linked list data structure.  A circular node, outlined in black, contains the label 'val' indicating it holds a value. A light-blue arrow extends from this node, labeled 'next,' pointing to the right. This arrow signifies a pointer or reference to the next node in the sequence.  The 'next' label indicates the direction of traversal through the linked list, implying that the node's data ('val') is followed by another node accessible via the 'next' pointer. The absence of a node at the arrow's end suggests this is either the last node in a list or a partially depicted structure.](/assets/images/dsa/linkedlists/000b9a1fa99367d3.webp)

We define a node using the `ListNode` class, as below:

```python
class ListNode:
   def __init__(self, val: int, next: ListNode):
       self.val = val
       self.next = next
```

**Singly linked list**

The simplest form of a linked list is a singly linked list, where each node points to the next node in the linked list, and the last node points to nothing (null), indicating the end of the linked list. The start of the linked list is called the ‘head,’ which is generally the only node we initially have immediate access to:

![Image represents a singly linked list data structure.  A rectangular box labeled 'head' points downwards to a circle containing the number '1'. This circle represents the first node in the list. Each subsequent node (circles numbered 2, 3, 4, and 5) is connected to the previous node by a light-blue arrow labeled 'next'. This 'next' label indicates a pointer that stores the memory address of the following node in the sequence. The arrows illustrate the unidirectional flow of information, showing how each node points to the next one in the list. The final node (5) has no outgoing arrow, signifying the end of the list.  The entire structure visually demonstrates the sequential arrangement of nodes and the use of pointers to navigate through the linked list.](/assets/images/dsa/linkedlists/698bcc5462f3d337.webp)

To access the other nodes in a linked list, we would need to traverse it starting at the head.

![Image represents a singly linked list data structure.  Five circular nodes, numbered 1 through 5, are depicted, each containing a single integer value.  Solid, light-blue arrows labeled 'next' connect each node sequentially, indicating the directional flow of the list.  These arrows represent pointers in the linked list, showing the connection from one node to the next.  Dashed, orange arrows also arc above the solid arrows, visually representing the traversal of the list.  A separate orange rectangle labeled 'ptr' points down to node 5, indicating a pointer variable named 'ptr' currently referencing the last node in the list.  The overall diagram illustrates the structure and traversal of a singly linked list, with the 'ptr' highlighting a specific point of access within the list.](/assets/images/dsa/linkedlists/f8e3ea6294dc9085.webp)

Singly linked lists can be used to store a collection of data. One of their main benefits lies in their **dynamic sizing** capability, since they can grow or shrink in size flexibly, unlike arrays which are fixed in size. Additionally, singly linked lists excel in scenarios requiring **frequent insertions and deletions**, as these operations can be performed more efficiently than in arrays, which need to shift elements to perform insertion or deletion.

![Image represents a visual explanation of inserting a node into a linked list.  The top section shows an initial linked list with five nodes (numbered 1 through 5), connected sequentially by light-blue arrows labeled 'next'.  A separate node '3' is shown above this list. A thick black downward-pointing arrow indicates a transformation. The bottom section depicts the linked list after the insertion of node 3 between nodes 2 and 4.  Node 3 is now connected to node 2 and node 4 via light-blue 'next' arrows. The original connection between nodes 2 and 4 is shown crossed out with a red 'X', illustrating the modification of the list's structure. The title 'example - insert node 3 between nodes 2 and 4:' clarifies the operation being demonstrated.](/assets/images/dsa/linkedlists/517d5a5abb22f344.webp)

The efficiency of these operations comes at the cost of the **inability to perform random access,** as nodes can’t be accessed by indexes like in an array. This trade-off may be acceptable in many use cases where the benefits of dynamic sizing and the efficiency of insertion/deletion outweigh the main performance benefits of random access.

**Doubly linked list** A doubly linked list is an extended version of the linked list where each node contains two references: one to the next node (`next`), and one to the previous node (`prev`). In most implementations, doubly linked lists have immediate access to both the head node and the tail node.

![Image represents a doubly linked list data structure.  Five nodes, numbered 1 through 5, are depicted as circles, each containing its respective numerical value.  A rectangular box labeled 'head' points to node 1, indicating the beginning of the list, and another rectangular box labeled 'tail' points to node 5, indicating the end.  Between each pair of adjacent nodes are two curved arrows: a light-blue arrow labeled 'next' pointing from the lower-numbered node to the higher-numbered node, representing the forward link in the list; and a purple arrow labeled 'prev' pointing in the opposite direction, representing the backward link. This bidirectional linking allows traversal in both directions within the list.](/assets/images/dsa/linkedlists/05a29949c21da516.webp)

A big advantage of doubly linked list is that it allows for **bidirectional traversal**. Additionally, deleting nodes in a doubly linked list is generally more straightforward because we have references to both the next and previous nodes:

![Image represents a doubly linked list before and after the deletion of a node.  The top half shows the initial state: a doubly linked list with five nodes (numbered 1 through 5). Each node is represented by a circle containing its numerical value.  Light-blue curved arrows labeled 'next' indicate the forward links between nodes, while purple curved arrows labeled 'prev' show the backward links.  Rectangular boxes labeled 'head' and 'tail' point to the first and last nodes respectively, indicating the list's boundaries. The bottom half depicts the list after node 3 has been removed. Node 3 is replaced by a large red 'X' signifying its deletion. The 'next' and 'prev' pointers of nodes 2 and 4 are now connected directly, bypassing the deleted node, maintaining the doubly linked structure.  A thick black arrow points downwards from node 3 in the top half to the 'X' in the bottom half, clearly showing the node removal operation.](/assets/images/dsa/linkedlists/c52df40b0275769f.webp)

## Pointer Manipulation

Many linked list interview problems require traversing or restructuring a linked list. Understanding and being proficient at pointer manipulation is essential to solving these problems. A useful tip is to visualize pointers as arrows that point from one node to another, and observe how these arrows should be moved to reflect the structural change. For example, this is how we would visualize a node insertion:

![Image represents a visual depiction of inserting a new node into a linked list.  The top shows a labeled orange rectangle 'new_node' pointing down to a circled '3', representing the new node to be inserted. Below, a linked list is shown with nodes numbered 1, 2, 4, and 5, connected by light-blue arrows labeled 'next'. A thick black arrow points downwards indicating a transformation. The bottom section shows the result of the insertion. Node 3 is now inserted between nodes 2 and 4.  Dashed gray arrows and text indicate the changes: a dashed gray arrow labeled 'add arrow' points from node 2 to node 3, another from node 3 to node 4, and a dashed gray arrow labeled 'remove this arrow' shows the original connection between nodes 2 and 4 being replaced, with a red 'X' marking the removed connection.  All new connections use light-blue arrows labeled 'next', maintaining the linked list structure.](/assets/images/dsa/linkedlists/453b4fc48befd712.webp)

## Real-world Example

**Music Playlist**: Music player applications often use linked lists to implement playlists, particularly doubly linked lists, where each song node links to the next and previous songs. This structure enables efficient addition, removal, and reordering of songs because only the pointers between nodes need to be updated, rather than moving the song data in memory.

## Chapter Outline

In this chapter, we explore problems involving both singly and doubly linked lists. We also explore the unique challenge of restructuring a multi-level linked list.

![Image represents a hierarchical diagram illustrating different coding patterns related to linked lists.  A rounded rectangle at the top, labeled 'Linked Lists,' serves as the root node, branching down with dashed lines to three subordinate categories.  The leftmost branch leads to a dashed-line rectangle labeled 'Traversal,' which further lists two sub-patterns: 'Linked List Intersection' and 'Palindrome Linked List.' The central branch connects to another dashed-line rectangle labeled 'Restructuring,' containing three sub-patterns: 'Linked List Reversal,' 'Remove the Kth Last Node From a Linked List,' and 'Flatten a Multi-Level Linked List.' Finally, the rightmost branch points to a dashed-line rectangle labeled 'Doubly Linked List,' which includes a single sub-pattern: 'LRU Cache.'  The diagram visually organizes various linked list coding problems based on their approach (traversal or restructuring) and the type of linked list (singly or doubly linked).](/assets/images/dsa/linkedlists/2dbbd42bf02e6746.webp)
