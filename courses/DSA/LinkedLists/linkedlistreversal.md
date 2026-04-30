---
title: "Intuition Iterative"
course: "DSA"
topic: "LinkedLists"
source: "/home/ayush/OOD-Design-Principles/DSA/LinkedLists/LinkedListReversal___Technical_Interview_Prep.html"
---
Reverse a singly linked list.

#### Example:

![Image represents two directed acyclic graphs (DAGs) arranged vertically.  The top DAG consists of five nodes labeled 1, 2, 4, 7, and 3, connected sequentially by directed edges (arrows) in that order.  The bottom DAG also has five nodes, labeled 3, 7, 4, 2, and 1, connected sequentially by directed edges in that order. A thick, downward-pointing arrow connects the node labeled '4' in the top DAG to the node labeled '4' in the bottom DAG, indicating a transition or transformation between the two graphs.  The overall structure suggests a before-and-after representation, possibly illustrating a process or algorithm that rearranges the sequence of nodes.](/assets/images/dsa/linkedlists/8a64e634a3ca15e4.webp)

## Intuition - Iterative

A naive strategy is to store the values of the linked list in an array and reconstruct the linked list by traversing the array in reverse order. However, this solution does not reverse the original linked list; it just creates a new one. Could we try performing the reversal in place?

Let’s think about the problem in terms of pointer manipulation. The key observation here is that if we "flip" the direction of the pointers, we're effectively reversing the linked list:

![Image represents a visual illustration of a sequence reversal. The top row, labeled 'original:', shows a directed acyclic graph (DAG) with nodes numbered 1, 2, 4, 7, and 3, connected by black arrows indicating a unidirectional flow from 1 to 2, 2 to 4, 4 to 7, and 7 to 3.  The second row, labeled 'reversed:', displays the same nodes but with orange arrows reversing the direction of flow, pointing from 3 to 7, 7 to 4, 4 to 2, and 2 to 1. The third row shows an equals sign followed by a sequence of nodes (3, 7, 4, 2, 1) connected by orange arrows, representing the reversed sequence in a forward direction, effectively demonstrating the reversed order of the original sequence.](/assets/images/dsa/linkedlists/dcb6ada31e18585c.webp)

Now, we just need to figure out how to perform this pointer manipulation. Consider the example below:

![Image represents a simple directed acyclic graph (DAG) illustrating a sequential process or workflow.  The graph consists of three circular nodes, labeled '1,' '2,' and '3,' respectively, arranged linearly from left to right.  Each node likely represents a stage or step in a process.  Thick, unidirectional arrows connect the nodes, indicating the flow of information or execution.  Specifically, an arrow points from node '1' to node '2,' signifying that stage '2' follows stage '1,' and another arrow points from node '2' to node '3,' indicating that stage '3' follows stage '2.'  The overall structure depicts a linear progression where the output of one stage becomes the input for the subsequent stage.](/assets/images/dsa/linkedlists/f39b565d033616fc.webp)

To reverse the direction of all pointers, we iterate through the nodes one by one. In this process, we need access to the current node (`curr_node`) and the previous node (`prev_node`) to adjust the current node's next pointer to the previous node. Note that `prev_node` will initially point at null since the first node has no previous node:

![Image represents a diagram illustrating a coding pattern, possibly related to linked lists or similar data structures.  Two rectangular boxes labeled 'prev_node' (in orange) and 'curr_node' (also in orange) are positioned above a sequence of three circles representing nodes numbered 1, 2, and 3.  Arrows descend from 'prev_node' and 'curr_node' pointing to 'null' and node 1 respectively.  Nodes 1, 2, and 3 are connected by unidirectional arrows indicating the next node in the sequence.  To the right, a dashed-line rectangle contains the code snippet 'curr_node.next = prev_node', suggesting an operation to modify the linked list structure by changing the 'next' pointer of the current node to point to the previous node.  The overall diagram depicts a step in an algorithm that manipulates a linked list, possibly involving reversing a portion of the list or inserting a node.](/assets/images/dsa/linkedlists/42f2ac1a834aa435.webp)

![Image represents a linked list data structure illustrating a node deletion operation.  Two rectangular boxes labeled 'prev_node' and 'curr_node' are positioned above a sequence of circular nodes representing the list's elements. A downward arrow from 'prev_node' points to 'null1', indicating that the previous node is currently pointing to null.  A downward arrow from 'curr_node' points to a circular node containing the number '1'. This node '1' is connected to a node containing '2' by a light gray arrow crossed out with a large red 'X', signifying the deletion of the link between nodes 1 and 2. A solid black arrow connects node '2' to node '3', showing the remaining connection in the list. A light blue arrow points from node '1' to 'null1', indicating that the node '1' is now being removed from the list and its previous pointer is being updated to point to null.  The overall diagram visually depicts the steps involved in removing a node from a linked list, specifically updating the pointers to bypass the deleted node.](/assets/images/dsa/linkedlists/faa87b559b41d9f0.webp)

To reverse the next pointer, we'll need a way to shift the `curr_node` and `prev_node` pointers one node over. To shift `prev_node`, we can set it to the position of `curr_node`. However, we can't move `curr_node` to node 2 because we lost our reference to node 2:

![Image represents a linked list data structure undergoing a deletion operation.  At the top, two orange rectangular boxes labeled `prev_node` and `curr_node` represent pointers.  A dashed orange line connects them, indicating a relationship between these pointers. A red 'X' is positioned to the right of `curr_node`, signifying the node to be deleted. Below, a linked list is depicted with three circular nodes containing the numbers 1, 2, and 3, respectively.  A solid black arrow points from node 1 to `null`, indicating the beginning of the list.  Another solid black arrow connects node 2 to node 3.  A red curved arrow points from node 1 to node 2, labeled 'no reference to node 2,' illustrating that after the deletion, node 1 no longer points to node 2, effectively removing node 2 from the list. The orange arrow from `prev_node` points to `null`, and the orange arrow from `curr_node` points to node 1, showing the pointers' positions before the deletion of node 2.](/assets/images/dsa/linkedlists/fe6498381840445a.webp)

This suggests we should have preserved a reference to node 2 **before** reversing the `curr_node`. This can be done by creating a variable `next_node` and setting it to `curr_node.next`. Let’s assume we did this. Now, we can advance `prev_node` and `curr_node` forward by one:

![Image represents a linked list data structure illustration.  Three orange rectangular boxes labeled 'prev_node', 'curr_node', and 'next_node' point downwards with arrows to three circular nodes numbered 1, 2, and 3 respectively.  Node 1 is connected to a 'null1' label on its left, indicating the beginning of the list.  Nodes 1, 2, and 3 are sequentially connected with arrows, showing the flow of the list.  A dashed-line rectangle to the right displays assignment statements: 'prev_node = curr_node' and 'curr_node = next_node', representing the iterative process of traversing the linked list, where the previous node becomes the current node, and the current node becomes the next node in each step.  The overall diagram visually depicts the concept of iterating through a linked list using pointers (prev_node, curr_node, next_node) and updating them during traversal.](/assets/images/dsa/linkedlists/a56478e58762c462.webp)

![Image represents a linked list data structure illustrating a traversal process.  Three circular nodes, labeled '1', '2', and '3', represent data elements within the list.  A solid arrow points from node '1' to node '2', and another from node '2' to node '3', indicating the sequential linking of elements.  The label 'null' precedes node '1', signifying the beginning of the list. Two rectangular boxes, labeled 'prev_node' and 'curr_node' in orange, are positioned above the nodes.  Dashed orange arrows connect 'prev_node' to node '1' and 'curr_node' to node '2', showing that 'prev_node' currently points to node '1' and 'curr_node' points to node '2', representing the current state during list traversal.  The dashed arrows illustrate the movement of these pointers during iteration through the list.](/assets/images/dsa/linkedlists/569b19ed4e67a9b7.webp)

Note, we don't need to shift `next_node`, as it can be set by `curr_node.next` in the next iteration.

We can summarize this logic in three steps. At each node in the linked list:

1. Save a reference to the next node ( next_node = curr_node.next ).
2. Change the current node’s next pointer to link to the previous node ( curr_node.next = prev_node ).
3. Move both prev_node and curr_node forward by one ( prev_node = curr_node , curr_node = next_node ).

Let's repeat these steps for the rest of the linked list:

![Image represents a diagram illustrating a linked list reversal algorithm.  The left side shows a linked list with three nodes numbered 1, 2, and 3, connected by arrows indicating the direction of traversal.  Node 1 is pointed to by a label 'null', signifying the beginning of the list.  Above the nodes are two rectangular boxes labeled 'prev_node' and 'curr_node', with arrows pointing downwards to nodes 1 and 2 respectively. This indicates that these variables are currently referencing nodes 1 and 2 during the reversal process. Node 2 points to node 3. The right side contains a dashed-line box outlining two lines of pseudocode: '1) next_node = curr_node.next' and '2) curr_node.next = prev_node'. These lines describe the steps involved in reversing the links: the first line assigns the next node in the sequence to a temporary variable, and the second line reverses the link from the current node to point to the previous node, effectively reversing the list's direction.](/assets/images/dsa/linkedlists/14e38cd61bb15166.webp)

![Image represents a singly linked list data structure, illustrating the concept of traversing it in reverse. Three circular nodes, numbered 1, 2, and 3, represent data elements within the list.  A black arrow points from node 1 to `null`, indicating the beginning of the list. A light-blue arrow points from node 2 to node 1, showing the reverse traversal direction.  Black arrows descend from rectangular boxes labeled 'prev_node' (grey), 'curr_node' (grey), and 'next_node' (orange) to nodes 1, 2, and 3 respectively. These boxes represent pointers, indicating the current position and the previous and next nodes during the reverse traversal. The arrangement visually demonstrates how the pointers are updated to move backward through the list.](/assets/images/dsa/linkedlists/c8820b4ef9aa3f64.webp)

![Image represents a linked list data structure illustrating a traversal algorithm.  Three circular nodes labeled '1', '2', and '3' are connected sequentially by arrows, representing the links between nodes in the list.  A left-pointing arrow connects the first node ('1') to 'null', indicating the beginning of the list. Above the nodes are three rectangular boxes labeled 'prev_node', 'curr_node', and 'next_node', respectively.  Arrows point downwards from these boxes to nodes '1', '2', and '3', respectively, showing how these variables might point to different nodes during traversal.  To the right, a dashed-line box contains pseudocode: '3) prev_node = curr_node; curr_node = next_node;', representing a step in an iterative algorithm that updates the 'prev_node' and 'curr_node' pointers to move through the list.  The numbered '3)' suggests this is the third step of a multi-step process.](/assets/images/dsa/linkedlists/4e576971a00fa539.webp)

![Image represents a singly linked list data structure with three nodes labeled 1, 2, and 3.  The nodes are connected by solid arrows indicating the direction of the links, with node 1 pointing to node 2, and node 2 pointing to node 3.  A solid arrow points from node 1 to the left, labeled 'null', signifying the beginning of the list.  Above the nodes, two orange rectangular boxes are labeled 'prev_node' and 'curr_node'.  Dashed orange arrows connect these boxes to nodes 2 and 3 respectively, illustrating the pointers 'prev_node' and 'curr_node' that might be used in an algorithm iterating through the list.  The dashed arrow from 'prev_node' to node 2 shows that 'prev_node' currently points to node 2, and the dashed arrow from 'curr_node' to node 3 indicates that 'curr_node' points to node 3.  This visualization likely depicts a step in an algorithm, such as reversing a linked list or performing an insertion/deletion operation, where 'prev_node' and 'curr_node' track the current and previous nodes being processed.](/assets/images/dsa/linkedlists/536513afa6105149.webp)

![Image represents a diagram illustrating a linked list reversal algorithm.  Three circular nodes labeled '1,' '2,' and '3' are depicted, connected sequentially by arrows representing links.  The first node ('1') is connected to the left by an arrow pointing to 'null,' indicating the beginning of the list.  Arrows from rectangular boxes labeled 'prev_node' and 'curr_node' point downwards to nodes '2' and '3' respectively, highlighting these nodes' roles in the algorithm. A dashed-line box to the right contains two numbered steps describing the algorithm: '1) next_node = curr_node.next' and '2) curr_node.next = prev_node,' which represent the core logic for reversing the links in the list.  The diagram visually shows the state of the list during a step in the reversal process, with 'prev_node' and 'curr_node' pointing to the nodes being manipulated to reverse the links.](/assets/images/dsa/linkedlists/6a6a2890c6f5724d.webp)

![The image represents a singly linked list data structure with three nodes, labeled 1, 2, and 3, visually depicted as circles containing their respective values.  Node 1 is connected to node 2 by a solid black arrow pointing from 1 to 2, indicating the direction of traversal. Node 2 is connected to node 3 by a light blue arrow pointing from 3 to 2, suggesting a reverse traversal or manipulation. Node 3 is connected to 'null' by a downward-pointing orange arrow, signifying the end of the list. Above the nodes, three rectangular boxes represent pointers: 'prev_node' (gray) points to node 2, 'curr_node' (gray) points to node 3, and 'next_node' (orange) points to 'null'.  The 'null' label appears at both the beginning and end of the list, indicating the absence of a node before the first and after the last. The arrangement shows the structure and potential manipulation of a linked list, highlighting the pointers used to navigate and modify the list.](/assets/images/dsa/linkedlists/de3b6e3e4e01faff.webp)

![Image represents a singly linked list with three nodes labeled 1, 2, and 3, respectively.  The list is depicted visually with circles representing nodes and arrows indicating the direction of links.  The first node (1) is pointed to by 'null', signifying the beginning of the list.  Each node points to the next node in the sequence; node 1 points to node 2, and node 2 points to node 3.  Node 3 points to 'null', indicating the end of the list. Above the list, three rectangular boxes labeled 'prev_node', 'curr_node', and 'next_node' are shown.  Arrows descend from these boxes to nodes 2, 3, and the 'null' after node 3, respectively, suggesting these labels represent pointers to nodes within the list during an iterative process. To the right, a dashed-line box contains pseudocode:  '3) prev_node = curr_node; curr_node = next_node', illustrating an algorithm step likely involved in traversing or manipulating the linked list, where the pointers are updated to move through the list.](/assets/images/dsa/linkedlists/fe52b663fbd070dd.webp)

![Image represents a singly linked list with three nodes containing the values 1, 2, and 3, respectively.  The list is depicted visually with circles representing nodes and arrows indicating the direction of links.  The leftmost node (1) points to `null`, signifying the beginning of the list.  Each subsequent node points to the next node in the sequence, with node 2 pointing to node 3, and node 3 pointing to `null`, indicating the end of the list. Above the list, two orange rectangular boxes labeled 'prev_node' and 'curr_node' are shown.  Dashed orange arrows point from 'prev_node' to node 2 and from 'curr_node' to node 3, suggesting these variables are pointing to specific nodes within the list during some operation, likely a traversal or reversal.  The solid arrows represent the actual links within the linked list structure itself, while the dashed arrows represent pointers to nodes within the list from variables outside the list structure.](/assets/images/dsa/linkedlists/592375f612d7a178.webp)

We can stop the reversal when `curr_node` becomes null, indicating there are no more nodes to reverse.

The final step is to return the head of the reversed linked list, which is pointed to by `prev_node` once `curr_node` becomes null.

## Implementation - Iterative

```python
from ds import ListNode
   
def linked_list_reversal(head: ListNode) -> ListNode:
    curr_node, prev_node = head, None
    # Reverse the direction of each node's pointer until 'curr_node' is null.
    while curr_node:
        next_node = curr_node.next
        curr_node.next = prev_node
        prev_node = curr_node
curr_node = next_node # 'prev_node' will be pointing at the head of the reversed linked list.
return prev_node
```

### Complexity Analysis

**Time complexity:** The time complexity of `linked_list_reversal` is O ( n ) O(n) O ( n ), where n n n denotes the length of the linked list. This is because we perform constant-time pointer manipulation at each node of the linked list.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

## Intuition - Recursive

Sometimes, the interviewer may want the problem solved using recursion. Let’s see what a recursive solution to this problem would look like.

In a recursive solution, the problem is solved by **solving smaller instances of the same problem**. To solve these smaller subproblems, we would need to use the linked list reversal function (`linked_list_reversal`) in its own implementation. The process of solving smaller problems using recursive calls continues until the smallest version of the problem is solved.

The smallest version of this problem involves reversing a linked list of size 0 or 1. These are linked lists which are inherently the same as their reverse. So, these can be our **base cases**.

With this in mind, let's try crafting the logic of the recursive function using the example below:

![Image represents a linked list data structure.  A rectangular box labeled 'head' points downwards to a circle containing the number '1,' representing the first node in the list.  This node is connected by a unidirectional arrow to a circle containing '2,' which is similarly connected to a circle containing '3,' and finally '3' is connected to a circle containing '4,' the last node.  The arrows indicate the direction of traversal through the list, starting from the head node and progressing sequentially through each node to the end.  Each circle represents a node in the list, and the numbers within the circles could represent data stored within each node.  The structure visually demonstrates the linear, sequential nature of a singly linked list.](/assets/images/dsa/linkedlists/dbfa764f6b254d90.webp)

Think about which subproblem we should solve. To reverse the entire linked list, we can use our `linked_list_reversal` function to **reverse the sublist after the current node**. This way, we only need to focus on reversing the pointer of the current node. Let’s see how this works.

As mentioned, let’s first recursively call `linked_list_reversal` on the sublist starting at `head.next`. Let’s assume this recursive call reverses this sublist and returns its head as intended.

When designing a recursive function, assume any recursive call to that function will behave as intended, even if the function hasn’t been fully implemented.

![Image represents a singly linked list data structure undergoing reversal.  A rectangular box encloses nodes numbered 2, 3, and 4, representing the linked list's initial state.  Arrows indicate the direction of links between these nodes, starting from node 2 and proceeding sequentially to node 4.  A separate node, labeled '1', is positioned to the left of the box, connected to node 2 via an arrow, indicating it's the head of the list.  Above node 1, a rectangular box labeled 'head' points downwards with an arrow towards node 1, showing the initial head pointer. Below the rectangular box containing nodes 2, 3, and 4, a dashed-line box contains the code snippet `new_head = linked_list_reversal(head.next)`. This line suggests that a function called `linked_list_reversal` is being called with the `next` pointer of the initial `head` (node 1) as an argument, and the result is assigned to `new_head`, implying the reversal operation is performed on the sublist starting from node 2.](/assets/images/dsa/linkedlists/74051c8f850a56f8.webp)

![Image represents a linked list data structure before and after an insertion operation.  A gray rectangular box labeled 'head' points to a circular node containing the number '1'. This node is connected via a black arrow to a node containing '2', which in turn is connected to a node containing '3' via a black arrow. Node '3' is connected to node '4' via a light-blue arrow, indicating the direction of the connection.  An orange rectangular box labeled 'new_head' points to node '4', showing that node '4' has become the new head of the linked list after an insertion operation. The light-blue arrow from node '4' to node '3' represents the newly created link, effectively inserting node '4' at the beginning of the list. The original list's head pointer has been updated to point to the newly inserted node '4'.](/assets/images/dsa/linkedlists/aef95b28c7cbc084.webp)

Next, we need the tail of the reversed sublist (node 2) to point to node 1. We can reference node 2 using `head.next`. So, all we need to do is set `head.next.next` to head as illustrated below:

![Image represents a linked list data structure before and after inserting a new node.  Initially, a linked list is shown with nodes numbered 1, 2, and 3, where a rectangular box labeled 'head' points to node 1, indicating the beginning of the list.  Each node is a circle containing its numerical value, and arrows represent the `next` pointers connecting them sequentially. A new node, labeled '4', is introduced with a rectangular box labeled 'new_head' pointing to it.  An arrow connects 'new_head' to node 4.  Node 4 is then linked to node 3, reversing the previous order. A dashed rectangular box displays the code snippet 'head.next.next = head', illustrating the operation performed to insert node 4 at the head of the list by updating the `next` pointer of the second node (originally pointing to node 3) to now point to the original head (node 1).  This effectively inserts node 4 as the new head of the linked list.](/assets/images/dsa/linkedlists/0d6b8312159fcd5d.webp)

![Image represents a linked list data structure illustrating an insertion operation.  Two rectangular boxes labeled 'head' and 'new_head' represent pointers to the beginning of the list.  A downward arrow from 'head' points to a circular node labeled '1,' indicating it's the current head of the list.  Nodes '1,' '2,' and '3' are sequentially connected by unidirectional arrows, showing the order of elements. A black arrow from node '1' points to node '2', indicating the next element in the sequence. A light-blue curved arrow points from node '2' back to node '1', suggesting a potential back-link or additional connection. Node '3' is connected to node '4' by a unidirectional arrow. A downward arrow from 'new_head' points to node '4,' indicating that node '4' is about to be inserted. The overall structure depicts the state of the linked list before the insertion of node '4' at the end, with the light-blue arrow possibly representing a modification or pointer update during the insertion process.](/assets/images/dsa/linkedlists/7ef8205d7fdfb9fa.webp)

The linked list is almost fully reversed now, but node 1 is still pointing to node 2. To remove this link, just set `head.next` to null. Then, we can return `new_head`, which is the head of the reversed linked list:

![Image represents a linked list data structure before and after inserting a new node at the head.  Initially, a linked list is shown with nodes numbered 1, 2, and 3, connected sequentially. A rectangular box labeled 'head' points to node 1, indicating it's the head of the list.  A new node, labeled '4', is introduced, and a rectangular box labeled 'new_head' points to it.  An arrow from 'new_head' points to node 4, showing its insertion point. Node 4 is then connected to node 3 via a unidirectional arrow.  A dashed rectangular box displays the code snippet 'head.next = null', illustrating that the next pointer of the original head (node 1) is set to null after the insertion, implying that node 1 is no longer the head of the list.  Node 1 now has a bidirectional connection with node 2, suggesting a possible circular linked list structure within the original list.  The overall diagram depicts the process of prepending a new node to an existing linked list, modifying the head pointer to reflect the change.](/assets/images/dsa/linkedlists/04edb7b7bb46cddd.webp)

![Image represents a linked list data structure before and after insertion of a new node.  On the left, a linked list is shown with a `head` pointer pointing to a node containing the value `1`. This node is connected to a node with value `2`, which is connected to a node with value `3`.  A light-blue arrow indicates that the beginning of the list is `null`. On the right, a `new_head` pointer points to a new node containing the value `4`, which is inserted at the beginning of the list.  This new node is now connected to the previous head node (containing `1`). The previous head node (`1`) is now the second node in the list. A dashed-line box labeled 'return new_head' indicates that the function or operation returns the new head of the modified linked list, which is the node with value `4`.  The arrows represent the pointers connecting the nodes, showing the direction of the links within the list.](/assets/images/dsa/linkedlists/6e06b922e7dba900.webp)

## Implementation - Recursive

```python
from ds import ListNode
   
def linked_list_reversal_recursive(head: ListNode) -> ListNode:
    # Base cases.
    if (not head) or (not head.next):
        return head
    # Recursively reverse the sublist starting at the next node.
    new_head = linked_list_reversal_recursive(head.next)
    # Connect the reversed sublist to the head node to fully reverse the entire linked list.
    head.next.next = head
    head.next = None
    return new_head
```

**Time complexity:** The time complexity of `linked_list_reversal_recursive` is O ( n ) O(n) O ( n ) because it involves a single recursive traversal through the linked list, visiting each node exactly once.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the stack space taken up by the recursive call stack, which grows up to n n n levels deep because n n n recursive calls are made.

## Interview Tip

*Tip: Visualize pointer manipulations.* Often, it can be tricky to figure out exactly what to do when dealing with linked list manipulation. Drawing pointers as arrows between nodes can be quite helpful. By observing how these arrows should be reoriented to represent changes in the linked list's structure, we can deduce the necessary pointer manipulation logic. This approach also helps identify which nodes we need references to when making these changes.
