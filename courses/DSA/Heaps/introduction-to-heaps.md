---
title: "Introduction To Heaps"
course: "DSA"
topic: "Heaps"
source: "/home/ayush/OOD-Design-Principles/DSA/Heaps/Introduction to Heaps.html"
---
## Intuition

A heap is a data structure that organizes elements based on priority, ensuring the highest-priority element is always at the top of the heap. This allows for efficient access to the highest-priority element at any time. There are two main types of heaps:

- **Min-heap**: prioritizes the smallest element by keeping it at the top of the heap.
- **Max-heap**: prioritizes the largest element by keeping it at the top of the heap.

![Image represents a comparison of a min-heap and a max-heap data structures.  The left side depicts a min-heap, visualized as a trapezoidal structure with a purple border, containing the numbers 7, 4, 5, and 12 arranged in a hierarchical manner.  Atop this structure, a separate purple rectangle labeled 'min:' displays the minimum value, 2, which is not part of the main heap structure itself.  The right side shows a max-heap, similarly structured but with a cyan border, containing the numbers 2, 7, 5, and 4.  A separate cyan rectangle labeled 'max:' above this structure displays the maximum value, 12, also separate from the main heap.  Both heaps are labeled at their base with 'min_heap' and 'max_heap' respectively, clearly indicating the type of heap each structure represents.  The arrangement of numbers within each heap demonstrates the property of each heap type: the minimum element (2) is at the top of the min-heap, and the maximum element (12) is at the top of the max-heap.](/assets/images/dsa/heaps/13f41df21fde7fe4.webp)

Efficient prioritization is possible due to how heaps are structured. A heap is essentially a binary tree. In the case of a min-heap, for example, each node’s value is less than or equal to that of its children. This guarantees the root of this tree (the top of the heap) is always the smallest element:

![Image represents a min-heap data structure, labeled as such at the top.  The heap is depicted as a binary tree with nodes encircled in violet. The root node, at the top, contains the value '2'.  This node connects to two child nodes: a left child node with the value '4', and a right child node with the value '12'. The left child node ('4') further branches into two child nodes: a left child with the value '7' and a right child with the value '5'.  All connections between nodes are represented by simple black lines indicating a parent-child relationship within the tree structure. The arrangement of nodes ensures that the value of each node is less than or equal to the values of its children, fulfilling the min-heap property where the smallest element is at the root.](/assets/images/dsa/heaps/33fe3bea12b010f5.webp)

Here’s a time complexity breakdown of common heap operations:

This chapter discusses the practical uses of heaps. For a deeper understanding of how a heap works, we recommend diving into the details behind its internal implementation, and how its binary tree structure is consistently maintained during various operations [[2]](https://en.wikipedia.org/wiki/Binary_heap).

**Priority queue** A priority queue is a special type of heap that follows the structure of min-heaps or max-heaps but allows customization in how elements are prioritized (e.g., prioritizing strings with a higher number of vowels).

## Real-world Example

**Managing tasks in operating systems:** Operating systems often use a priority queue to manage the execution of tasks, and a heap is commonly used to implement this priority queue efficiently.

##

For example, when multiple processes are running on a computer, each process might be assigned a priority level. The operating system needs to schedule the processes so that higher-priority tasks are executed before lower-priority ones. A heap is ideal for this because it allows the system to quickly access the highest-priority task and efficiently re-arrange the priorities as new tasks are added or existing tasks are completed.

## Chapter Outline

![Image represents a hierarchical diagram illustrating the applications of Heaps data structure in coding.  A rounded rectangle at the top labeled 'Heaps' is connected via dotted lines to two rectangular boxes below. The left box is titled 'Sorting' and lists two sub-problems: 'Combine Sorted Linked Lists' and 'Sort a K-Sorted Array'. The right box is titled 'Finding Values in Sorted Order' and lists two further sub-problems: 'K Most Frequent Strings' and 'Median of an Integer Stream'.  The dotted lines indicate that the problems listed under 'Sorting' and 'Finding Values in Sorted Order' are solved using the 'Heaps' data structure, showing how this data structure is applied to different sorting and searching problems.](/assets/images/dsa/heaps/78cbd84d0d5a1d21.webp)
