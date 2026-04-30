---
title: "LinkedListMidpoint"
course: "DSA"
topic: "FastAndSlowPointers"
source: "/home/ayush/OOD-Design-Principles/DSA/FastAndSlowPointers/LinkedListMidpoint___Technical_Interview_Prep.html"
---
Given a singly linked list, find and return its **middle node**. If there are two middle nodes, return the second one.

#### Example 1:

![Image represents a directed graph illustrating a sequence of steps or a process flow.  The graph consists of five nodes, represented as circles, labeled sequentially with the numbers 1, 2, 4, 7, and 3.  Arrows indicate the direction of flow, showing a progression from node 1 to node 2, then to node 4, then to node 7, and finally to node 3. Node 4 is visually distinct, highlighted with a green fill and labeled 'mid' in green text above it, suggesting it represents a midpoint or a crucial step in the overall process. The arrangement of the nodes and arrows clearly depicts a linear sequence with a highlighted central element.](/assets/images/dsa/fastandslowpointers/8c50ef7458f49e9b.webp)

```python
Output: Node 4
```

#### Example 2:

![Image represents a directed acyclic graph (DAG) illustrating a sequence of data flow.  The graph consists of four circular nodes, each containing a numerical value: 1, 2, 4, and 7.  These nodes are connected by directed edges (arrows) indicating the direction of data flow.  The data flows sequentially from node 1 to node 2, then from node 2 to node 4, and finally from node 4 to node 7. Node 4 is highlighted with a light green fill and the word 'mid' is written above it in green, suggesting that node 4 represents a midpoint or intermediate stage in the process.  The absence of cycles and the unidirectional nature of the edges confirm the acyclic nature of the graph.](/assets/images/dsa/fastandslowpointers/787f27adeb1c554e.webp)

#### Constraints:

- The linked list contains at least one node.
- The linked list contains unique values.

## Intuition

The most intuitive approach to solve this problem is to traverse the linked list to find its length (n), and then traverse the linked list a second time to find the middle node (n / 2):

![Image represents two parallel sequences of nodes (circles) connected by directed edges (arrows).  The top sequence, labeled 'n', shows nodes containing the numbers 1, 2, 4, 7, and 3, sequentially connected with solid black arrows indicating the flow of information.  Additionally, grey dashed curved arrows connect the first node to the third, the second to the fourth, and the fourth to the fifth, suggesting a non-sequential, potentially parallel or skip-ahead processing step. The bottom sequence, labeled 'n/2', mirrors the node values and sequential connections of the top sequence using solid black arrows. However, it features orange dashed curved arrows connecting the first node to the third, indicating a different, potentially more efficient or reduced processing path compared to the top sequence.  The difference in the arrows' styles and colors highlights the distinction between the two processing methods, suggesting a comparison of computational complexity or efficiency.  The 'n' and 'n/2' labels likely represent the input size or number of operations involved in each processing path.](/assets/images/dsa/fastandslowpointers/22c60a7a8abdc6e4.webp)

This approach solves the problem in O ( n ) O(n) O ( n ) time, but requires two iterations to find the midpoint. However, there’s a cleaner approach that uses only a single iteration.

When iterating through the linked list, our exact position is unclear. We only know where we are when we reach the final node. Is it possible to create a scenario where, as soon as one pointer reaches the end of the linked list, the other pointer is positioned at the middle node?

If we had one pointer move at half the speed of the other, by the time the faster pointer reaches the end of the list, the slower one will be at the middle of the linked list.

We can achieve this by using the **fast and slow pointer technique**:

- Move a slow pointer one node at a time.
- Move a fast pointer two nodes at a time.

![Image represents a directed acyclic graph illustrating a workflow or process.  The graph consists of five circular nodes labeled sequentially with the numbers 1, 2, 4, 7, and 3.  Arrows indicate the direction of flow between these nodes, starting from node 1 and proceeding through nodes 2, 4, 7, and finally to node 3.  Above the first node (1), two rectangular boxes are positioned; one labeled 'slow' in light blue and the other labeled 'fast' in orange.  Arrows point from these boxes to node 1, indicating that the 'slow' path leads to node 1, and the 'fast' path also leads to node 1. This suggests two different input paths or processes that converge at node 1 before continuing through the rest of the sequence. The overall structure depicts a linear sequence of operations or steps, with two distinct initial inputs merging into a single workflow.](/assets/images/dsa/fastandslowpointers/4586bc4bf2888ee9.webp)

![Image represents a directed graph illustrating a workflow or process.  The graph consists of five numbered nodes (1, 2, 4, 7, 3) connected by solid arrows indicating the sequential flow. Node 1 connects to node 2, node 2 connects to node 4, node 4 connects to node 7, and node 7 connects to node 3.  Additionally, there are two dashed arrows: a light-blue dashed arrow loops from node 1 back to node 2, labeled 'slow' in a light-blue box above it, indicating a feedback or iterative process; and an orange dashed arrow loops from node 1 to node 2 and then to node 4, labeled 'fast' in an orange box above the arrow pointing to node 4, suggesting a faster alternative path or shortcut.  The overall diagram depicts two distinct paths through the process: a slower, iterative path (indicated by the light-blue arrow) and a faster, more direct path (indicated by the orange arrow).](/assets/images/dsa/fastandslowpointers/beb501ab9f862bd3.webp)

![Image represents a diagram illustrating a linked list traversal with two pointers, 'slow' and 'fast.'  The linked list is depicted as a sequence of numbered circles (nodes) 1, 2, 4, 7, and 3, connected by solid arrows indicating the direction of traversal.  A light gray node (4) is visually distinguished. A light blue rectangle labeled 'slow' points down to node 4, and an orange rectangle labeled 'fast' points down to node 3.  Dashed blue arrows show a secondary connection from node 2 to node 4, representing the 'slow' pointer's movement. Dashed orange arrows show a secondary connection from node 7 to node 3, representing the 'fast' pointer's movement. A gray rounded rectangle to the right displays the condition 'fast.next == null → break,' indicating that the traversal stops when the 'fast' pointer reaches the end of the list (null).  The overall diagram visualizes a process where two pointers move through a linked list at different speeds, with the condition checking for the end of the list to terminate the process.](/assets/images/dsa/fastandslowpointers/4305f212bdc68723.webp)

One thing we must be careful about is when we should stop advancing the fast pointer. We need to stop when the slow pointer reaches the middle node. When the list length is odd, this happens when `fast.next` equals null, as we can see above.

What about when the length of the linked list is even? Consider the below example:

![Image represents a directed acyclic graph illustrating a coding pattern, possibly related to task scheduling or pipeline processing.  The graph consists of four circular nodes labeled sequentially as 1, 2, 4, and 7, connected by unidirectional arrows indicating the flow of information or execution order.  Node 1 acts as the starting point, receiving input from two rectangular boxes positioned above it. The top box is light blue and labeled 'slow,' while the other is orange and labeled 'fast,' suggesting two different input streams or processing speeds.  Arrows from these boxes point to node 1, indicating that both 'slow' and 'fast' inputs feed into the initial processing step (node 1).  Subsequently, node 1's output flows to node 2, then to node 4, and finally to node 7, representing a linear progression of tasks or stages. The overall structure suggests a sequential process where the initial step (node 1) combines inputs from different sources before proceeding through subsequent stages.](/assets/images/dsa/fastandslowpointers/3d3d1ce48a1365a9.webp)

![Image represents a directed acyclic graph illustrating a workflow with two distinct paths.  The graph consists of five nodes (circles) numbered 1, 2, 4, and 7, representing sequential steps in a process.  Nodes 1, 2, 4, and 7 are connected by solid arrows indicating the primary flow. Node 1 connects to node 2, node 2 connects to node 4, and node 4 connects to node 7.  Above the graph, two rectangular boxes labeled 'slow' (in light blue) and 'fast' (in orange) indicate alternative paths. A light blue dashed arrow connects node 1 to node 2, representing a 'slow' path, while an orange dashed arrow connects node 1 to node 2 and another connects node 4 to node 2, representing a 'fast' path. The 'slow' path implies a direct progression from node 1 to node 2, while the 'fast' path suggests a faster route potentially skipping some steps or utilizing parallel processing, indicated by the feedback loop from node 4 to node 2.  The overall diagram visualizes a process where data or tasks flow through different stages, with the possibility of choosing between a slower, linear path and a faster, potentially more complex path.](/assets/images/dsa/fastandslowpointers/c54167ea266ad58c.webp)

![Image represents a diagram illustrating a coding pattern, likely related to linked lists or similar data structures.  The diagram shows a sequence of numbered nodes (1, 2, 4, 7) connected by solid arrows representing a forward traversal. Node 4 is shaded gray, suggesting a different state or significance. A light-blue box labeled 'slow' points to node 4 with a downward-pointing arrow, indicating a pointer or iterator moving slowly through the sequence. An orange box labeled 'fast' points to the word 'null' with a downward-pointing arrow, representing a faster pointer. Dashed arrows, blue and orange respectively, show the movement of the slow and fast pointers. The orange dashed arrow loops from node 7 back to node 4, and the blue dashed arrow loops from node 2 back to node 4. A dashed-line box contains the code snippet 'fast == null → break', indicating a conditional statement where the algorithm terminates when the fast pointer reaches a null value.  The overall structure depicts a process where two pointers traverse a data structure at different speeds, with the termination condition based on the fast pointer's position.](/assets/images/dsa/fastandslowpointers/c62a7ced9edb094a.webp)

As you can see, to have slow point at the **second** middle node, we'd need to stop fast when it reaches a null node.

## Implementation

```python
from ds import ListNode
    
def linked_list_midpoint(head: ListNode) -> ListNode:
    slow = fast = head
    # When the fast pointer reaches the end of the list, the slow pointer will be at
    # the midpoint of the linked list.
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

### Complexity Analysis

**Time complexity:** The time complexity of `linked_list_midpoint` is O ( n ) O(n) O ( n ) because we traverse the linked list linearly using two pointers.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

### Stop and Think

What if you were asked to modify your algorithm to return the first middle node when the linked list is of even length?

Answer: Following the same method, we should stop advancing the fast pointer when `fast.next.next` is null. This way, slow will end up pointing to the first middle node:

![Image represents a diagram illustrating a linked list traversal using two pointers, 'slow' and 'fast'.  Four nodes, numbered 1, 2, 4, and 7, are depicted as circles, connected by solid arrows indicating the direction of traversal. Node 2 is shaded gray. A light-blue rectangular box labeled 'slow' points to node 2 with a light-blue arrow, and an orange rectangular box labeled 'fast' points to node 4 with an orange arrow.  Dashed orange and light-blue curved arrows connect node 1 to node 2, suggesting the movement of the 'slow' and 'fast' pointers.  A separate, light-gray, dashed-bordered rectangle contains the code snippet 'fast.next.next == null → break', indicating a conditional check within the algorithm: if the node two steps ahead of the 'fast' pointer is null (end of the list), the loop breaks.](/assets/images/dsa/fastandslowpointers/0e7d9f8b6191e437.webp)

## Interview Tip

*Tip: Be prepared to address potential gaps in the information provided.* During an interview, it’s possible the interviewer won't specify which middle node should be returned for linked lists of even length, leaving it up to you to recognize and address this special scenario. You might be expected to identify ambiguities like this and actively engage with the interviewer to discuss a suitable resolution.
