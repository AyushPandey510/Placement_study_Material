---
title: "LinkedListLoop"
course: "DSA"
topic: "FastAndSlowPointers"
source: "/home/ayush/OOD-Design-Principles/DSA/FastAndSlowPointers/LinkedListLoop___Technical_Interview_Prep.html"
---
Given a singly linked list, determine if it contains a **cycle**. A cycle occurs if a node's next pointer references an earlier node in the linked list, causing a loop.

#### Example:

![Image represents a state diagram illustrating a coding pattern.  The diagram shows a linear sequence followed by a cyclical sequence. The linear sequence consists of three nodes labeled '0', '1', and '2', connected by unidirectional arrows indicating a flow from '0' to '1' and then from '1' to '2'.  The cyclical sequence, labeled 'cycle', is composed of four nodes numbered '3', '4', '5', and '2' (note that '2' is shared between the linear and cyclical sequences). These nodes form a closed loop with unidirectional arrows indicating a flow from '3' to '4', '4' to '5', '5' to '2', and '2' to '3'. The cyclical sequence is enclosed by a dashed rectangle to visually distinguish it from the linear sequence.  The overall diagram depicts a system where a linear process leads into a repeating cyclical process, potentially representing a common pattern in program execution or data flow.](/assets/images/dsa/fastandslowpointers/64e1feded359b4cb.webp)

```python
Output: True
```

## Intuition

A straightforward approach is to iterate through the linked list while keeping track of the nodes that were already visited in a hash set. Encountering a previously-visited node during the traversal indicates the presence of a cycle. Below is the code snippet for this approach:

```python
from ds import ListNode
    
def linked_list_loop_naive(head: ListNode) -> bool:
    visited = set()
    curr = head
    while curr:
        # Cycle detected if the current node has already been visited.
        if curr in visited:
            return True
        visited.add(curr)
        curr = curr.next
    return False
```

This solution takes O ( n ) O(n) O ( n ) time, where n n n is the number of nodes in the linked list, since each node is visited once. However, this comes at the cost of O ( n ) O(n) O ( n ) extra space due to the hash set. Is there a way to achieve a linear time complexity while using constant space?

Imagine a race track represented as a circular linked list (i.e., a linked list with a perfect cycle) where two runners start at the same node.

![Image represents a circular flowchart depicting a four-step process, numbered 1 through 4, with each step represented by a numbered circle.  Arrows indicate the sequential flow, starting from step 1, proceeding to step 2, then 3, then 4, and finally looping back to step 1, creating a continuous cycle.  A central circle labeled 'θ' (theta) is positioned outside the main cycle and connected to it with arrows indicating interaction or data flow between the central element and the cyclical process.  To the left of the central circle, two stick figures are shown; one orange labeled 'FF' and one light blue labeled 'S', suggesting two distinct entities or inputs interacting with the central element 'θ' and influencing the cyclical process. The arrangement suggests a feedback loop where the four steps continuously repeat, influenced by the interaction between 'FF', 'S', and the central component 'θ'.](/assets/images/dsa/fastandslowpointers/355ae03cdb4b5793.webp)

If both runners move at the same speed, they will always be together at each node. However, consider what happens when one runner (the slow runner) moves one step at a time, while the other runner (the fast runner) moves two steps at a time. In this scenario, the fast runner will overtake the slow runner at some point since the track is cyclic. But how can we use this information to detect a cycle?

In a linked list, detecting whether the fast runner has overtaken the slow runner is difficult due to the lack of positional indicators (like indexes in an array). A better way to find a cycle is to see if the fast runner reunites with the slow runner by both landing on the same node at some point. This would be a clear sign the linked list has a cycle.

The question now is, will the fast runner reunite with the slow runner, or is there a chance for the fast runner to consistently bypass the slow runner without ever converging on the same node? To answer this, let’s start by looking at some examples.

**Perfect cycle** First, let’s check whether the two runners, represented as a slow pointer and a fast pointer, will reunite in a linked list that forms a perfect cycle. As we can see from the figure below, the pointers will eventually meet.

![Image represents a visual depiction of a coding pattern, likely illustrating a cycle detection algorithm.  The diagram shows three stages. The first stage depicts a circular linked list with nodes numbered 0 through 4, where node 0 has incoming arrows labeled 'fast' (orange) and 'slow' (light blue), indicating two pointers moving at different speeds.  The second stage shows the same circular list, but now the 'fast' pointer has advanced further than the 'slow' pointer, with dashed orange and light blue arrows indicating their movement. The third stage shows the pointers converging at a point, with the 'fast' pointer now moving faster than the 'slow' pointer, indicated by dashed orange arrows from node 2 to node 3 and from node 3 to node 4. A solid black arrow points downwards from the third stage, suggesting the algorithm's completion or a subsequent step.  The overall structure demonstrates the concept of two pointers traversing a circular data structure at different speeds to detect cycles.](/assets/images/dsa/fastandslowpointers/f7cc7e27cbd6e8e4.webp)

![Image represents a state transition diagram illustrating a coding pattern, likely related to cycle detection or pointer manipulation.  The diagram shows three stages. The first stage depicts a circular linked list with nodes numbered 0 through 4. Node 0 is distinct, enclosed in a green box with incoming arrows labeled 'fast' (orange) and 'slow' (light blue), representing two pointers moving at different speeds.  Nodes 1 through 4 form a cycle with solid black arrows indicating the direction of traversal. The second stage shows the same structure but with dashed arrows (orange and light blue) indicating the movement of the 'fast' and 'slow' pointers, respectively, starting from node 0 and progressing through the cycle.  The third stage shows the final state where the 'fast' pointer has caught up to the 'slow' pointer, indicated by the convergence of the dashed orange and light blue arrows at node 1.  The 'fast' pointer is labeled with an orange rectangle, and the 'slow' pointer is labeled with a light blue rectangle in the final stage.  The arrows between stages indicate a progression of time or steps in the algorithm.](/assets/images/dsa/fastandslowpointers/84ccd8ecd70285e6.webp)

**Delayed cycle** What about when the cycle doesn’t start immediately in the linked list? Consider simulating the fast and slow pointer technique over the following example:

![Image represents a step-by-step visualization of a coding pattern, possibly related to linked lists or circular buffers, demonstrating the movement of data elements labeled with 'slow' and 'fast' pointers.  The diagram begins with a linear sequence of nodes (0, 1, 2) connected by solid arrows, followed by a circular linked list (3, 4, 5).  A 'fast' pointer (orange dashed arrows) moves twice as quickly as a 'slow' pointer (light blue dashed arrows). The subsequent stages show the pointers traversing the circular list.  The 'fast' pointer initially overtakes the 'slow' pointer, and then the process repeats in a smaller circular list.  Finally, the 'fast' and 'slow' pointers converge at node 4, which is highlighted in a green box, indicating a potential detection of a cycle or loop within the data structure.  Each node is numbered (0-5), and the speed of each pointer ('slow' or 'fast') is indicated by a colored box next to the pointer's arrow.  The arrows illustrate the direction and speed of pointer movement.](/assets/images/dsa/fastandslowpointers/e568241dee020b74.webp)

Again, the pointers eventually met in the cycle despite the fact that fast and slow entered the cycle at different times.

**Will fast always catch up with slow?** In both cases, it might seem like the fast pointer could keep overtaking the slow pointer without ever meeting it, but this isn’t true. Here’s an easier way to understand why they will meet.

The fast pointer moves 2 steps at a time, and the slow pointer moves 1 step at a time, so the fast pointer will gain a distance of 1 node over the slow pointer at each iteration. This can be observed below, where the distance between the fast and slow pointers reduces by one in each iteration until they inevitably meet.

![Image represents a step-by-step visualization of a cyclical process, possibly illustrating a coding pattern like a pointer chase algorithm.  The core element is a circular arrangement of five nodes labeled 0 through 4.  Initially (leftmost diagram), node 0 is unfilled, while nodes 1 and 3 are shaded grey, indicating a state change.  A dashed line connects node 1 to node 3, labeled 'distance = 2'.  Solid arrows show the directional flow around the circle.  A rectangular box labeled 'fast' points to node 1, and a box labeled 'slow' points to node 3. The middle diagram shows the process evolving; node 4 is now shaded grey, the distance between the pointers (represented by the dashed line) is reduced to 'distance = 1', and the 'slow' pointer has moved to node 4.  The rightmost diagram depicts the final state where the distance between the pointers is 'distance = 0', both pointers are at node 0, and node 0 is now shaded grey.  The 'fast' and 'slow' pointers are now both directed towards node 0.  The arrows between the diagrams indicate the progression of the process.](/assets/images/dsa/fastandslowpointers/640eb4b5a5e6301d.webp)

Therefore, the maximal number of steps required for the fast pointer to catch up with the slower pointer is k steps (once both are in the cycle), where k is the length of the cycle. In the worst case, the cycle will contain all the linked list’s nodes, and the pointers will eventually meet in n steps.

**No cycle** The final case is when there is no cycle. In this case, the fast pointer will eventually reach the end of the list and exit the while-loop:

![Image represents a state diagram or flowchart illustrating a process with four states, numbered 0, 1, 2, and 3, represented as circles.  State 0 is the starting point, receiving input from two sources labeled 'slow' (in light blue) and 'fast' (in orange), indicated by arrows pointing to state 0.  These labels likely represent different pathways or speeds of entry into the process.  The states are sequentially connected by unidirectional arrows, indicating a linear progression from state 0 to 1, then 1 to 2, and finally 2 to 3.  The arrows represent transitions between states, suggesting a step-by-step process where each state completes before moving to the next.  There are no loops or branches shown, implying a simple, linear workflow.](/assets/images/dsa/fastandslowpointers/5b1f4b3e7d389165.webp)

![The image represents a data flow diagram illustrating two parallel processing paths.  Four numbered circles (0, 1, 2, and 3) represent processing stages.  A solid arrow from circle 0 to circle 1 indicates a sequential flow of data.  Another solid arrow connects circle 1 to circle 2, and a final solid arrow connects circle 2 to circle 3, showing a linear progression through these stages.  Above the diagram, two rectangular boxes are labeled 'slow' (in light blue) and 'fast' (in orange).  A downward-pointing blue arrow connects the 'slow' box to circle 1, indicating that data enters stage 1 via a slower path.  Similarly, an orange downward-pointing arrow connects the 'fast' box to circle 2, showing data entering stage 2 through a faster route.  Dashed orange arrows connect circle 0 to circle 1 and circle 1 to circle 2, representing a feedback loop or alternative data path within the 'fast' processing stream.  A dashed blue arrow connects circle 0 to circle 1, suggesting a secondary, slower feedback loop.  The overall diagram depicts a system where data can follow either a fast or slow path, with potential feedback mechanisms within each path.](/assets/images/dsa/fastandslowpointers/732061e4e8e6f192.webp)

![Image represents a linked list with nodes numbered 0, 1, 2, and 3, sequentially connected by solid arrows.  A light-blue rectangular box labeled 'slow' points downwards to node 2, indicating a pointer.  Similarly, an orange rectangular box labeled 'fast' points downwards to node 3.  A dashed light-blue arrow connects node 1 to node 2, representing a slow pointer's movement. A dashed orange arrow connects node 3 back to node 2, representing a fast pointer's movement.  The sequence continues with a solid arrow from node 3 to 'null', signifying the end of the list.  To the right, a grey, dashed-line box displays the condition 'fast == null → no cycle', indicating that if the fast pointer reaches the end (null), there is no cycle detected in the linked list.](/assets/images/dsa/fastandslowpointers/0671f66273261db4.webp)

## Implementation

This algorithm is formally known as ‘Floyd's Cycle Detection’ algorithm [[1]](https://en.wikipedia.org/wiki/Cycle_detection).

```python
from ds import ListNode
    
def linked_list_loop(head: ListNode) -> bool:
    slow = fast = head
    # Check both 'fast' and 'fast.next' to avoid null pointer exceptions when we
    # perform 'fast.next' and 'fast.next.next'.
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if fast == slow:
            return True
    return False
```

### Complexity Analysis

**Time complexity:** The time complexity of `linked_list_loop` is O ( n ) O(n) O ( n ) because the fast pointer will meet the slow pointer in a linear number of steps, as described.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
