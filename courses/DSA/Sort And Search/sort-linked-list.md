---
title: "Sort Linked List"
course: "DSA"
topic: "Sort And Search"
source: "/home/ayush/OOD-Design-Principles/DSA/Sort And Search/Sort Linked List.html"
---
Given the head of a singly linked list, **sort the linked list** in ascending order.

#### Example:

![Image represents two linear sequences of numbered nodes (3, 2, 4, 5, 1) and (1, 2, 3, 4, 5) connected by unidirectional arrows indicating a flow from left to right.  The top sequence uses black-bordered circles containing numbers 3, 2, 4, 5, and 1 respectively, linked sequentially by black arrows.  The bottom sequence uses orange-bordered circles with the same numbers (1, 2, 3, 4, 5) arranged sequentially and connected by black arrows. A downward-pointing grey arrow connects the node '4' in the top sequence to the node '3' in the bottom sequence, suggesting a transformation or transition between the two sequences.  The overall arrangement visually depicts a before-and-after scenario, or a process that reorders the sequence of nodes.](/assets/images/dsa/sort-and-search/e847e2412c1cbd38.webp)

## Intuition

Let’s start by finding a sorting algorithm that allows us to sort a linked list.

**Choosing a sorting algorithm** We're tasked with sorting a linked list, not an array. This distinction is crucial because algorithms like quicksort rely on random access through indexing, which linked lists don't support. Merge sort is a great O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) time option, where n n n denotes the length of the linked list, because it does not require random access and works well with linked lists, as we’ll see in this explanation.

**Merge sort** The merge sort algorithm uses a divide and conquer strategy. At a high level, it can be broken down into three steps:

1. Split the linked list into two halves:

![Image represents a directed graph illustrating a coding pattern, possibly related to state transitions or workflow.  The upper path shows a sequence of nodes (circles) numbered 3, 2, 4, 5, and 1, connected by solid black arrows indicating a directional flow from one node to the next.  A lower path mirrors part of the upper path, starting with nodes 3, 2, and 4, also connected by solid black arrows.  The key difference is that node 4 in the upper path has two gray curved arrows emanating from it, one pointing downwards to node 2 in the lower path, and another pointing downwards to node 5 in the lower path, which is then followed by node 1. This suggests a branching or conditional logic where node 4's processing can lead to two different subsequent sequences, both ultimately ending at node 1, but via different intermediate nodes (2 and 4 versus 5).  The numbers within the nodes likely represent states or steps in a process.](/assets/images/dsa/sort-and-search/0a804febc78be66c.webp)

1. Recursively sort both halves:

![Image represents a visual depiction of the merge sort algorithm's operation on two input arrays.  The top half shows the initial input array `(3, 2, 4)` represented as three interconnected circles, each containing a number, with arrows indicating the flow of data.  The numbers are connected sequentially from left to right. Below this, a second row shows the result of an intermediate step in the merge sort, `(2, 3, 4)`, also represented by interconnected circles with arrows showing data flow.  A grey arrow connects the initial input to the intermediate result, suggesting a transformation.  The right side mirrors this structure, showing the initial input array `(5, 1)` in the top row and the intermediate result `(1, 5)` in the bottom row, again with arrows indicating data flow and a grey arrow connecting the input to the intermediate result.  The text 'merge_sort(' precedes each input array, indicating the function being applied.  The parentheses enclose the input arrays, and the closing parenthesis follows the last element of each array.](/assets/images/dsa/sort-and-search/5ddc09c5ed6b3f2b.webp)

1. Merge the halves back together in a sorted manner to form a single sorted list:

![Image represents a diagram illustrating a merge operation in a coding pattern.  The upper portion shows two separate sequences: one sequence (in black circles) progresses from node '2' to '3' and then to '4'; the other sequence (also in black circles) goes from node '1' to '5'.  The lower portion depicts a merged sequence (in orange circles) resulting from the combination of the upper sequences.  A curved grey arrow labeled 'merge' connects nodes '3' and '5' from the upper sequences to node '3' in the lower sequence, indicating the merging point. The merged sequence in the lower portion flows from node '1' to '2', then to '3', '4', and finally '5'.  The numbers within the circles represent data elements or nodes in the sequences, and the arrows indicate the flow or order of processing.](/assets/images/dsa/sort-and-search/671a7caa9e199470.webp)

We can see what the entire process looks like in the diagram below:

![Image represents a directed graph illustrating a coding pattern, possibly related to state transitions or workflow.  The graph consists of nodes, represented by circles containing numbers (1 through 5), and directed edges, represented by grey arrows connecting the nodes.  Several distinct paths are visible, with some nodes appearing multiple times in different paths.  The numbers within the nodes likely represent different states or stages in a process.  Some nodes are colored light blue, others are colored orange, suggesting a possible distinction between different types of states or stages.  The paths show the sequence of transitions between these states.  For example, one path shows a sequence of 3 → 2 → 4 → 5 → 1, while another shows 3 → 2 → 4, and yet another shows a loop involving nodes 2 and 3. The overall structure suggests a complex system with multiple possible state transitions and potentially parallel or branching workflows.](/assets/images/dsa/sort-and-search/9ccde2bf6ff3850f.webp)

This is what this process looks like as pseudocode:

```python
def merge_sort(head):
    # Split the linked list into two halves.
    second_head = split_list(head)
    # Recursively sort both halves.
    first_half_sorted = merge_sort(head)
    second_half_sorted = merge_sort(second_head)
    # Merge the sorted sublists.
    return merge(first_half_sorted, second_half_sorted)
```

Let’s discuss in more detail how to split a linked list, and how to merge two sorted linked lists.

**Splitting the linked list in half** To split a linked list in half, we need access to its middle node because the node next to the middle node can represent the head of the second linked list:

![The image represents a linked list divided into two halves.  The linked list consists of nodes containing the numbers 3, 2, 4, 5, and 1, connected sequentially by arrows indicating the next element in the sequence.  A gray box labeled 'mid' points down to node 4, indicating this node as the midpoint of the list.  The nodes 3, 2, and 4 are enclosed under a gray line labeled 'first half,' while nodes 5 and 1 are enclosed under an orange line labeled 'second half.'  An orange box labeled 'mid.next' points down to node 5, highlighting the node immediately following the midpoint.  The arrows visually represent the flow of data through the linked list, showing the connections between consecutive nodes.](/assets/images/dsa/sort-and-search/0abc59597e18b08b.webp)

We can retrieve the middle node using the **fast and slow pointer** technique, as described in the *Linked List Midpoint* problem:

![Image represents a linked list traversal visualization illustrating a 'fast' and 'slow' pointer technique.  The linked list is depicted as a sequence of numbered nodes (3, 2, 4, 5, 1) connected by solid arrows indicating the direction of traversal. A light-blue rectangular box labeled 'slow' points to node 4, and an orange rectangular box labeled 'fast' points to node 1.  Dashed arrows show the movement of the pointers; the slow pointer moves one node at a time (3→2→4), while the fast pointer moves two nodes at a time (1→5→1). A grey dashed-line box to the right displays the condition 'fast.next == null → break,' indicating that the algorithm terminates when the fast pointer reaches the end of the list (where the next node is null).  The overall diagram demonstrates a common pattern used in algorithms like cycle detection in linked lists, where the fast pointer's faster traversal allows for efficient detection of loops or the end of the list.](/assets/images/dsa/sort-and-search/ed7ba5684b5d1012.webp)

![Image represents a linked list data structure illustrating a pointer manipulation technique.  The diagram shows a singly linked list with nodes numbered 3, 2, 4, 5, and 1.  Arrows indicate the direction of the `next` pointers connecting each node. A rectangular box labeled 'head' points to node 3, indicating it's the head of the list. Another rectangular box labeled 'slow' points to node 4. A third rectangular box, 'second_head', points to node 5.  A dashed-line rectangle to the right displays the assignment statement 'second_head = slow.next', showing that the `second_head` pointer is being assigned the value of the `next` pointer of the `slow` pointer (which points to node 5).  The overall diagram depicts a step in an algorithm, likely involving two pointers traversing the list at different speeds, where `second_head` is being updated based on the position of the `slow` pointer.](/assets/images/dsa/sort-and-search/f92bd4409ce88452.webp)

Then, we just need to disconnect the two halves by setting slow.next to null:

![Image represents a linked list data structure with two pointers, 'slow' and 'second_head', traversing it.  A grey rectangular box labeled 'head' points to a circular node containing the number '3'. This node is connected via a right-pointing arrow to a node containing '2', which in turn connects to a node containing '4'. A light-blue rectangular box labeled 'slow' points to the node containing '4'.  Another circular node containing '5' is connected to a node containing '1' via a right-pointing arrow. A rectangular box labeled 'second_head' points to the node containing '5'. Finally, a dashed-line grey rectangle displays the condition 'slow.next = null', indicating that the next pointer of the node pointed to by 'slow' is null, signifying the end of a linked list segment.  The arrows represent the connections between nodes, showing the flow of traversal through the list.](/assets/images/dsa/sort-and-search/a6370837eda62ca6.webp)

Note that when the linked list is of even length, there are two middle nodes. We want the slow pointer to stop at the first middle node so we can get the head of the second half more easily. As mentioned in *Linked List Midpoint*, we can achieve this by stopping the fast pointer when `fast.next.next` is null:

![Image represents a linked list traversal visualization illustrating a fast and slow pointer approach.  The diagram shows a singly linked list with nodes numbered 3, 2, 4, and 5.  A rectangular box labeled 'slow' in light blue points to node 2 with a downward-pointing arrow, indicating the slow pointer's initial position.  Similarly, a rectangular box labeled 'fast' in orange points to node 4, showing the fast pointer's starting position. Solid arrows indicate the forward traversal of the list: node 3 points to node 2, node 2 to node 4, and node 4 to node 5.  Dashed orange and light blue curved arrows from node 3 to node 2 and from node 4 to node 2 represent the iterative movement of the fast and slow pointers, respectively.  A separate light gray box with dashed borders displays a conditional statement: 'fast.next.next == null → break,' indicating that the traversal terminates when the pointer two steps ahead of the fast pointer (fast.next.next) reaches the end of the list (null).](/assets/images/dsa/sort-and-search/9bdad68b09530f78.webp)

![Image represents a linked list data structure illustrating a pointer manipulation technique.  Three rectangular boxes labeled 'head', 'slow', and 'second_head' point to nodes within the linked list.  The linked list consists of four circular nodes containing the numerical values 3, 2, 4, and 5 respectively.  Arrows indicate the connections between nodes, showing the sequence of the list.  'head' points to node 3, 'slow' points to node 2, and 'second_head' points to node 4. A dashed rectangular box to the right displays the assignment statement 'second_head = slow.next', indicating that the pointer 'second_head' is being assigned the value of the 'next' pointer of the node pointed to by 'slow'. This demonstrates how 'second_head' is advanced one step ahead of 'slow' in the linked list.](/assets/images/dsa/sort-and-search/2e445a335638f90f.webp)

**Merging two sorted linked lists** First, let's consider merging two linked lists, each containing a single node, meaning they’re both inherently sorted. We merge them by placing the smaller node first, followed by the other node:

![Image represents a diagram illustrating a data flow or transformation process.  Two circles labeled '5' and '1' are positioned at the top, representing input data points or sources.  These are connected via curved, grey arrows to a lower level containing two orange-bordered circles labeled '1' and '5'. The grey arrows indicate a merging or combining of the initial data.  A solid, black arrow connects the lower-left orange circle ('1') to the lower-right orange circle ('5'), suggesting a unidirectional transformation or processing step where data from '1' is processed to produce '5'. The arrangement visually depicts a scenario where two distinct inputs ('5' and '1') are combined and then undergo a transformation resulting in a new output ('5'), potentially implying a pattern of data aggregation and subsequent modification.](/assets/images/dsa/sort-and-search/6c3ba595a275b27c.webp)

With that established, how would we merge two longer linked lists? To do this, we can set two pointers, one at the start of each linked list, then perform the following steps:

1. Compare the nodes at each pointer and add the node with the smaller value to the merged linked list.
2. Advance the pointer at that node with the smaller value to the next node in its linked list.
3. Repeat the above two steps until we can no longer advance either pointer.

Before discussing the final step, observe how these steps are applied to the following two sorted linked lists. We can use a dummy node to point to the head of the merged linked list:

![Image represents two linked lists being merged.  The top list consists of nodes labeled 2, 3, and 4, with a node labeled 11 pointing to node 2. The bottom list consists of nodes labeled 1 and 5, with a node labeled 12 pointing to node 1.  Arrows indicate the direction of links between nodes. A rectangular box describes the merging process:  if the value of node 11 is greater than the value of node 12, a new node (12) is added to the merged list, and the 'next' pointer of node 12 is set to point to the next node in the merged list (which is node 1 in this case).  To the right of the lists, a visual representation of this step shows a grey node labeled 'D' (likely representing a dummy node or pointer) pointing to an orange node labeled '1', illustrating the insertion of node 12 (implied, not explicitly shown) before node 1 in the merged list.](/assets/images/dsa/sort-and-search/7c8c947b82b1bc41.webp)

![Image represents a visual explanation of a merging operation in a linked list data structure.  The top section shows two linked lists. The first list, in black, consists of nodes containing the values 2, 3, and 4, with a node labeled '11' pointing to the node with value 2. The second list, in gray, contains nodes with values 1 and 5, with a node labeled '12' pointing to the node with value 5.  Arrows indicate the direction of links between nodes. A rectangular box explains the logic:  '11.val < 12.val → add node 11 to the merged list' and '11 = 11.next,' indicating that because the value of node 11 is less than the value of node 12, node 11 is added to the merged list, and its 'next' pointer is updated. The bottom section depicts the resulting merged list, where a new gray node 'D' points to an orange node '1', which points to an orange node '2'.  The orange nodes represent the merged list, showing the integration of node 11 (implicitly) into the sorted structure.](/assets/images/dsa/sort-and-search/4a3fdeb8529decda.webp)

![Image represents a visual explanation of a merging operation in linked lists.  The left side shows two linked lists: one with nodes containing values '2', '3', and '4', and another with nodes containing '1' and '5'.  Above each list, a square box indicates a node with value '11' and '12' respectively, representing nodes to be merged. Arrows depict the connections between nodes within each list.  The right side displays the result of merging the '11' node into a new list, which starts with a 'D' node (likely representing a dummy head node).  A rectangular box explains the merging logic: '11.val < 12.val → add node 11 to the merged list — 11 = 11.next', indicating that the node with value '11' is added to the merged list because its value is less than the value of the next node ('12'), and its 'next' pointer is set to point to the next node in the merged list. The merged list visually shows nodes '1', '2', and '3' in orange, indicating that node '11' has been successfully integrated into the sorted merged list.](/assets/images/dsa/sort-and-search/15a9d03c1e2d22b8.webp)

![Image represents a visual explanation of a merging operation in a linked list data structure.  The top-left shows two linked lists; one in light gray with nodes containing values '2', '3', and a node '4' (in black, indicating it's a focus point), and another below it, also in light gray, with nodes '1' and '5' (also in black).  Above the node '4' is a gray box labeled '11', representing a node with value 11 to be inserted. Above the node '5' is a gray box labeled '12', representing a node with value 12. A downward arrow connects '11' to '4' and '12' to '5', indicating the insertion point. A large light-gray box in the center explains the logic: '11.val < 12.val → add node 11 to the merged list — 11 = 11.next'. This describes the condition for merging (value 11 is less than value 12) and the action (inserting node 11) along with the pointer update (11.next will point to the next node). The bottom-right shows the resulting merged linked list, with nodes 'D', '1', '2', '3', and '4' (all in orange to highlight the merged list), connected by arrows indicating the sequence.  The 'D' node likely represents a dummy head node. The overall diagram illustrates the step-by-step process of merging two sorted linked lists.](/assets/images/dsa/sort-and-search/93b610f39b71c2b1.webp)

If one of the linked lists has been entirely added to the merged list, we can just add the rest of the other linked list to the merged list:

![Image represents a visual explanation of a merging algorithm, likely for linked lists.  The top section shows two linked lists; one light gray list with nodes labeled '2', '3', and '4', and another light gray list with a single node labeled '1' connected to a node labeled '5' (in bold, indicating a potential end point). A gray box labeled '12' points down to node '5'.  A gray box labeled '11' points down to node '4'.  A dashed-line box contains the condition '11 == null → add the rest of the second list to the merged list.'  The bottom section depicts the result of the merge.  A light gray node labeled 'D' (possibly representing a dummy node or the beginning of the merged list) connects to a linked list with nodes labeled '1', '2', '3', '4', and '5', all highlighted in orange, indicating they are part of the merged list. The arrows show the direction of connections within each list and the flow of data during the merge operation.  The condition in the dashed box suggests that if the pointer '11' reaches the end of the first list (null), the remaining elements of the second list are appended to the merged list.](/assets/images/dsa/sort-and-search/5d2e471dc5ca55c4.webp)

## Implementation

```python
from typing import List
    
def sort_linked_list(head: ListNode) -> ListNode:
    # If the linked list is empty or has only one element, it's already sorted.
    if not head or not head.next:
        return head
    # Split the linked list into halves using the fast and slow pointer technique.
    second_head = split_list(head)
    # Recursively sort both halves.
    first_half_sorted = sort_linked_list(head)
    second_half_sorted = sort_linked_list(second_head)
    # Merge the sorted sublists.
    return merge(first_half_sorted, second_half_sorted)
    
def split_list(head: ListNode) -> ListNode:
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    second_head = slow.next
    slow.next = None
    return second_head
    
def merge(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0)
    # This pointer will be used to append nodes to the tail of the merged linked list.
    tail = dummy
    # Continually append the node with the smaller value from each linked list to the
    # merged linked list until one of the linked lists has no more nodes to merge.
    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    # One of the two linked lists could still have nodes remaining. Attach those nodes
    # to the end of the merged linked list.
    tail.next = l1 or l2
    return dummy.next
```

### Complexity Analysis

**Time complexity:** The time complexity of `sort_linked_list` is O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) because it uses merge sort. Here’s the breakdown:

- The linked list is recursively split until each sublist contains only one node. This splitting process happens about log ⁡ 2 ( n ) \log_2(n) lo g 2 ​ ( n ) times because each split reduces the size of the linked list by half.
- At each level, we merge the split linked lists. Merging all elements at one level takes about n n n operations.
- Since there are log ⁡ 2 ( n ) \log_2(n) lo g 2 ​ ( n ) levels of splitting and merging, and there are n n n operations at each level, the time complexity is O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) .

**Space complexity:** The space complexity is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) due to the recursive call stack, which can grow up to log ⁡ 2 ( n ) \log_2(n) lo g 2 ​ ( n ) in height.

## Stable Sorting

Merge sort is a stable sorting algorithm. This is important in scenarios where the original order of equal elements must be preserved. For example, if we are sorting a list of nodes that share the same value, but have an additional attribute storing the time they were created, then it’s important for the relative order of these nodes to stay the same. Stability can be important for database systems; for instance, where stable sorting is required to maintain data integrity and consistency across multiple operations.
