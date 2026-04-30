---
title: "IntroductiontoFastandSlowPointers"
course: "DSA"
topic: "FastAndSlowPointers"
source: "/home/ayush/OOD-Design-Principles/DSA/FastAndSlowPointers/IntroductiontoFastandSlowPointers___Technical_Interview_Prep.html"
---
## Intuition

The fast and slow pointer technique is a specialized variant of the two-pointer pattern, characterized by the differing speeds at which two pointers traverse a data structure. In this technique, we designate a fast pointer and a slow pointer:

- Usually, the slow pointer moves one step in each iteration.
- Usually, the fast pointer moves two steps in each iteration.

This creates a dynamic in which the fast pointer moves at twice the speed of the slow pointer:

![Image represents a visual depiction of the 'slow and fast pointer' algorithm often used in linked list traversal.  The diagram shows two parallel linked lists, each composed of several circular nodes connected by solid arrows representing the `next` pointer in each node.  The top list illustrates the initial state, with a 'slow' pointer (indicated by a light blue box labeled 'slow') and a 'fast' pointer (indicated by an orange box labeled 'fast') both initially pointing to the first node.  Arrows from the boxes point to their respective nodes.  The bottom list shows the pointers after one iteration. The 'slow' pointer has moved one node to the right, and the 'fast' pointer has moved two nodes to the right.  Both lists continue with ellipses (...) indicating that they extend beyond the visible portion.  Dashed arrows on the bottom list show the movement of the pointers.  To the right, a gray box with dashed borders contains pseudocode: `slow = slow.next` and `fast = fast.next.next`, illustrating how the pointers are updated in each iteration.  This code snippet explains the algorithm's core logic: the slow pointer advances one node at a time, while the fast pointer advances two nodes at a time.](/assets/images/dsa/fastandslowpointers/1b853f97d194709e.webp)

Keep in mind these pointers aren't limited to just one and two steps. As long as the fast pointer advances more steps than the slow pointer does, the logic of the fast and slow pointer technique still applies.

## Real-world Example

**Detecting cycles in symlinks**: Symlinks are shortcuts that point to files or directories in a file system. A real-world example of using the fast and slow pointer technique is detecting cycles in symlinks.

In this process, the slow pointer follows each symlink one step at a time, while the fast pointer moves two steps at a time. If the fast pointer catches up to the slow pointer, it indicates a loop in the symlinks, which can cause infinite loops or errors when accessing files. To understand how fast and slow pointers detect cycles in this way, study the *Linked List Loop* problem.

## Chapter Outline

Fast and slow pointers are particularly beneficial in data structures like linked lists, where index-based access isn't available. They allow us to gather crucial information about the data structure's elements through the relative positions of the two pointers, rather than with indexing. This will become clearer as we explore some common use cases in this chapter.

![Image represents a hierarchical diagram illustrating the applications of 'Fast and Slow Pointers' coding pattern.  The top-level node, a rounded rectangle, is labeled 'Fast and Slow Pointers'.  From this node, three dashed lines descend to three lower-level nodes, each representing a specific application.  The leftmost node is a rounded rectangle labeled 'Cycle Detection - `Linked List Loop`', indicating its use in detecting cycles within linked lists. The rightmost node is a similarly styled rounded rectangle labeled 'Sequence Analysis - `Happy Number`', showing its application in analyzing number sequences, specifically the 'Happy Number' problem.  Finally, a central lower-level node, also a rounded rectangle, is labeled 'Fractional Point Identification - `Linked List Midpoint`', demonstrating its use in finding the midpoint of a linked list.  The connections between the top node and the three lower nodes represent the different ways the 'Fast and Slow Pointers' pattern can be utilized, with each lower node detailing a specific problem solved using this pattern.](/assets/images/dsa/fastandslowpointers/feeb9f9eba98e4fb.webp)
