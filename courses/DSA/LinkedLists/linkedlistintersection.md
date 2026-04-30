---
title: "LinkedListIntersection"
course: "DSA"
topic: "LinkedLists"
source: "/home/ayush/OOD-Design-Principles/DSA/LinkedLists/LinkedListIntersection___Technical_Interview_Prep.html"
---
Return the node where two singly linked lists **intersect**. If the linked lists don't intersect, return null.

#### Example:

![The image represents a directed acyclic graph (DAG) illustrating two distinct paths, labeled 'A:' and 'B:'.  Path 'A:' starts with a node labeled '1', which connects to a node labeled '3', followed by a node labeled '4'. Node '4' then branches, connecting to a node labeled '8'. Path 'B:' begins with a node labeled '6', connecting to another node labeled '4'. This second '4' node also connects to node '8'. Node '8' subsequently connects to a node labeled '7', which finally connects to a node labeled '2'.  The arrows indicate the direction of flow between the nodes, showing a sequential progression along each path.  The paths 'A' and 'B' represent different sequences or processes, converging at node '8' before diverging again.  The numbers within the nodes likely represent steps or stages in a process, and the overall structure suggests a workflow or dependency diagram.](/assets/images/dsa/linkedlists/fd41ec5404711d7b.webp)

```python
Output: Node 8
```

## Intuition

Let’s first understand what an intersection between two linked lists is.

An intersection occurs when two linked lists converge at a shared node and, from that point onwards, share all subsequent nodes.

Note, this intersection has nothing to do with the values of the nodes.

A naive approach is to use a hash set. We can traverse the first linked list once and store each node in a hash set. Next, we traverse the second linked list until we find the first node that exists in the hash set, signifying the intersection point since it’s the first node shared between the two linked lists. This approach solves the problem linearly, but can we find a solution that uses constant space?

Consider the following example:

Treating these as two separate linked lists can get confusing with the above visualization. Instead, let’s visualize the input as two linked lists to help us think about the problem more clearly. Note that the tail nodes are still shared between the two linked lists, we’re just visualizing them separately:

![The image represents two linked lists merging into a single structure.  Two lists, labeled `head_A` and `head_B`, are depicted using light-blue and light-purple circles respectively, representing nodes, connected by black arrows indicating the direction of traversal.  Each list consists of three nodes.  These lists converge at a point where they share a common set of nodes, represented by three peach-colored circles enclosed within an orange rectangle.  These shared nodes are labeled as 'same tail nodes' via a curved arrow pointing to the rectangle. The arrangement visually demonstrates how two separate linked lists can share a common tail section, a concept relevant to data structure optimization and merging algorithms.](/assets/images/dsa/linkedlists/10e5d3fffd1fb5fb.webp)

Notice that **this problem is easier to solve if the two linked lists are of equal length**. This is because the intersection node can be found at the same position from the heads of both linked lists. In other words, when we iterate through two linked lists of the same length, we’re guaranteed to reach the intersection node at the same time:

![Image represents two linked lists, labeled 'A' and 'B', visually separated by a peach-colored rectangle containing the symbol '||' signifying a parallel structure.  List 'A' uses light-blue nodes, while list 'B' uses light-purple nodes. Each list starts with a labeled head node ('head_A' and 'head_B'), pointed to by a rectangular box labeled 'ptr_A' and 'ptr_B' respectively, indicating pointers to the beginning of each list.  Solid arrows show the sequential connections within each list. Dashed gray arrows indicate additional pointers, possibly for iterative traversal or other operations, connecting nodes within each list.  Both lists converge at a point represented by orange nodes, forming a common section after the initial distinct parts.  The orange nodes continue in a linked list structure, suggesting a merging or concatenation of the two initial lists.](/assets/images/dsa/linkedlists/086656df7376e9fb.webp)

Could we somehow replicate this behavior when dealing with linked lists of varying lengths? The key observation is that, while two linked lists ‘list A’ and ‘list B’ may have different lengths, ‘list A → list B’ has the same length as ‘list B → list A’ (where ‘→’ represents the connection of two lists). Conveniently, these combined linked lists also share the same tail nodes:

![Image represents two linked lists, A and B, initially separate, depicted as horizontal sequences of circles connected by arrows indicating direction.  List A starts with a light-blue circle labeled 'head_A' and continues with several light-blue and orange circles. List B begins with a light-purple circle labeled 'head_B' and proceeds with light-purple and orange circles.  The lists merge; the tail of list A connects to a light-blue circle, which is then followed by several more light-blue circles, and the tail of list B connects to a light-purple circle, followed by several more light-purple circles.  After the merge, a rectangular box encloses a section of the combined lists, containing four orange circles arranged in two rows of two, representing a sub-section of the merged list.  The labels 'A' and 'B' are placed above and below the initial sections of lists A and B respectively, indicating their initial separation, and are reversed below the merged section, indicating the merging point.  Arrows consistently point rightward, showing the direction of traversal through each list.](/assets/images/dsa/linkedlists/3e9f35691a14ced5.webp)

We’ve now set up a scenario where we have two combined linked lists of the same length, which share the same tail nodes. By traversing these combined linked lists, we’ll eventually reach the intersection node simultaneously on both linked lists (if one exists).

To do this, we can traverse both combined linked lists with two pointers, and stop once the nodes at both pointers are the same. This node would be the intersection node:

![Image represents two linked lists, A and B, visualized horizontally.  List A's nodes are light blue, while list B's nodes are light purple.  Both lists also contain orange nodes interspersed.  A rectangular box labeled 'ptr_A' points down to the head of list A, labeled 'head_A,' which is a light blue circle.  Similarly, a box labeled 'ptr_B' points to the head of list B, 'head_B,' a light purple circle.  Solid arrows indicate the forward links within each list. Dashed gray arrows show how the algorithm iterates through both lists simultaneously, comparing nodes.  The lists merge at a point where list A's orange node connects to list B's purple node, and vice-versa.  After the merging point, the lists continue with their respective node colors. A peach-colored rectangle separates the merged portion from the rest of the lists. A solid arrow emerges from this rectangle, pointing to a dashed-line box labeled 'return ptr_A,' indicating that the algorithm returns a pointer to a node within list A after the merging process.](/assets/images/dsa/linkedlists/cda4942d5a080f1e.webp)

If no intersection exists, both pointers will end up stopping at null nodes:

![Image represents two linked lists, A and B, visualized horizontally.  List A's head is labeled 'head_A' and is a light-blue circle; list B's head is labeled 'head_B' and is a purple circle.  Each list consists of several nodes represented by similarly colored circles connected by solid arrows indicating the next node in the sequence.  Above each list's head is a rectangular box labeled 'ptr_A' and 'ptr_B' respectively, representing pointers to the respective list heads.  Dashed arrows from these pointer boxes point to the respective list heads, showing the pointer's initial position.  Both lists terminate with a 'null' node represented by a light-grey rectangle.  After the 'null' nodes, a solid arrow points to a dashed-line rectangle labeled 'return ptr_A', indicating that the function returns a pointer to the head of list A.  The dashed arrows between the nodes in each list suggest the traversal of the list during the execution of the algorithm.  The arrangement shows the lists' structure and the pointer's role in accessing and manipulating the lists.](/assets/images/dsa/linkedlists/cd60e9ef5390e119.webp)

**Traversing combined linked lists** An important observation is that to traverse through 'list A → list B', we don't actually need to connect these two linked lists together. Instead, we can traverse 'list A' and, upon reaching its end, continue by traversing 'list B':

![Image represents a diagram illustrating the traversal of two linked lists, A and B.  The top section, labeled '1. traverse list A,' shows a linked list A depicted as a sequence of four light-blue circles connected by solid black arrows, representing the nodes and their connections.  The first node is labeled 'head_A'.  Dashed grey arrows curve above the solid arrows, indicating the traversal process. The bottom section, labeled '2. traverse list B,' similarly shows a linked list B with three light-purple circles followed by three peach-colored circles, connected by solid black arrows. The first node is labeled 'head_B,' and dashed grey arrows above the solid arrows again show the traversal.  The title 'traverse list A → list B:' indicates that the diagram demonstrates a process involving traversing both lists, possibly for comparison or data transfer between them.  The color change in list B suggests a potential modification or interaction during the traversal.](/assets/images/dsa/linkedlists/0242c91887c09020.webp)

This technique allows us to traverse the entire sequence of both linked lists as if they were connected.

## Implementation

```python
from ds import ListNode
   
def linked_list_intersection(head_A: ListNode, head_B: ListNode) -> ListNode:
    ptr_A, ptr_B = head_A, head_B
    # Traverse through list A with 'ptr_A' and list B with 'ptr_B' until they meet.
    while ptr_A != ptr_B:
        # Traverse list A -> list B by first traversing 'ptr_A' and then, upon
        # reaching the end of list A, continue the traversal from the head of list B.
        ptr_A = ptr_A.next if ptr_A else head_B
        # Simultaneously, traverse list B -> list A.
        ptr_B = ptr_B.next if ptr_B else head_A
    # At this point, 'ptr_A' and 'ptr_B' either point to the intersection node or both
    # are null if the lists do not intersect. Return either pointer.
    return ptr_A
```

### Complexity Analysis

**Time complexity:** The time complexity of `linked_list_intersection` is O ( n + m ) O(n+m) O ( n + m ), where n n n and m m m denote the lengths of list A and B, respectively. This is because pointers linearly traverse both linked lists sequentially.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
