---
title: "PalindromicLinkedList"
course: "DSA"
topic: "LinkedLists"
source: "/home/ayush/OOD-Design-Principles/DSA/LinkedLists/PalindromicLinkedList___Technical_Interview_Prep.html"
---
Given the head of a singly linked list, determine if it's a palindrome.

#### Example 1:

![Image represents a directed graph illustrating a sequence of states or steps.  Five circular nodes, labeled sequentially from 1 to 5, are arranged horizontally. Each node contains a single digit representing a state.  Directed edges, represented by arrows, connect the nodes, indicating the flow of information or progression through the sequence. The arrows point from node 1 to node 2, from node 2 to node 3, from node 3 to node 4 (which is also labeled 2), and finally from node 4 to node 5 (which is labeled 1).  This suggests a cyclical pattern where the sequence starts with state 1, progresses through states 2 and 3, then returns to state 2 before finally returning to the initial state 1.  The repetition of states 2 and 1 highlights a potential loop or recurring pattern within the overall process.](/assets/images/dsa/linkedlists/c482a6b3f988a7fb.webp)

```python
Output: True
```

#### Example 2:

![Image represents a directed graph illustrating a sequence of operations or states.  The graph consists of four circular nodes, each containing a single digit: '1', '2', '1', and '2'.  These nodes are connected by directed edges, represented by arrows.  The first node, containing '1', is connected to the second node ('2') via a directed edge pointing from '1' to '2'.  Similarly, the second node ('2') connects to the third node ('1'), and the third node ('1') connects to the fourth node ('2'), each connection represented by a directed edge showing the flow from left to right.  The arrangement suggests a pattern of alternating '1' and '2' states or operations, with the information flow unidirectional from left to right.](/assets/images/dsa/linkedlists/7cb2ca913f783a73.webp)

```python
Output: False
```

## Intuition

A linked list would be palindromic if its values read the same forward and backward. A naive way to check this would be to store all the values of the linked list in an array, allowing us to freely traverse these values forward and backward to confirm if it’s palindromic. However, this takes linear space. Instead, it would be better if we had a way to traverse the linked list in reverse order to confirm if it's a palindrome. Is there a way to go about this?

Going off the above definition, we know that if a linked list is a palindrome, reversing it would result in the same sequence of values.

This means we could create a copy of the linked list, reverse it, and compare its values with the original linked list. However, this would still take up linear space. Can we adjust this idea to avoid creating a new linked list?

An important observation is that we only need to **compare the first half of the original linked list with the reverse of the second half** (if there are an odd number of elements, we can just include the middle node in both halves) to check if the linked list is a palindrome:

![Image represents a diagram illustrating a palindrome checking algorithm.  Five circular nodes, numbered sequentially 1, 2, 3, 2, 1, are arranged linearly and connected by unidirectional arrows.  The arrows indicate the flow of data.  Nodes 1 and 2 are connected by an arrow pointing from 1 to 2, representing the processing of the first half of the input. Node 2 is connected to node 3, also with an arrow pointing from 2 to 3, continuing the processing of the first half. A grey line segment above nodes 1, 2, and 3 is labeled 'compare first half'.  Node 3 is connected to node 2 by an arrow pointing from 2 to 3, and node 2 is connected to node 1 by an arrow pointing from 1 to 2, representing the reversed processing of the second half. A grey line segment below nodes 3, 2, and 1 is labeled 'with reverse of second half'. The overall structure shows a comparison between the first half of a sequence and the reversed second half to determine if it's a palindrome.](/assets/images/dsa/linkedlists/26a688d4aa1d9b69.webp)

Before we can perform this comparison, we need to:

1. Find the middle of the linked list to get the head of the second half.
2. Reverse the second half of the linked list from this middle node.

Notice that step 2 involves modifying the input. In this problem, let’s assume this is acceptable. However, **it's always good to check with the interviewer if changing the input is allowed before moving forward with the solution**.

Now, let’s see how these two steps can be applied. Start by obtaining the middle node (`mid`) of the linked list.

![Image represents a linked list data structure with five nodes.  Each node is depicted as a circle containing a numerical value (1, 2, 3, 2, 1).  Arrows indicate the directional links between nodes, showing the sequence of the list.  A gray rectangular box labeled 'head' points to the first node (containing the value 1), representing the starting point of the list.  Separately, an orange rectangular box labeled 'mid' points to the third node (containing the value 3), highlighting a specific node within the list.  The arrangement visually demonstrates the linear progression of elements in a linked list, with the 'head' and 'mid' labels indicating pointers to specific locations within that sequence.](/assets/images/dsa/linkedlists/c66fc1cbaa9327bb.webp)

To learn how to get to the middle of a linked list, read the explanation in the *Linked List Midpoint* problem in the *Fast and Slow Pointers* chapter.

Then, reverse the second half of the linked list starting at `mid`. The last node of the original linked list becomes the head of the second half. This second head is used to traverse the newly reversed second half.

![Image represents a diagram illustrating a linked list data structure with two separate heads.  The first head, labeled 'head' in a gray rectangle, points to a node containing the number '1'. This node is connected via a black arrow to a node containing '2', which is further connected to a node containing '3' by another black arrow. A second head, labeled 'mid' in a gray rectangle, points to the node containing '3'.  Separately, a third head, labeled 'second_head' in an orange rectangle, points to a node containing '1'. This node is connected to a node containing '2' via a light-blue arrow pointing left, indicating a connection in the opposite direction compared to the first sequence.  The overall structure shows two distinct linked lists, one progressing from '1' to '3' and the other starting from '1' and connecting to '2' in reverse order, sharing some nodes but with different starting points and directions of traversal.](/assets/images/dsa/linkedlists/f56cd73846223ede.webp)

To learn how to reverse a linked list in O ( n ) O(n) O ( n ) time, read the explanation in the *Reverse Linked List* problem in this chapter.

The last thing we need to do is check if the first half matches the now-reversed second half. We can do this by simultaneously traversing both halves node by node, and comparing each node from the first half to the corresponding node from the second half. If at any point the node values don't match, it indicates the linked list is not a palindrome.

We can use two pointers (`ptr1` and `ptr2`) to iterate through the first and the reversed second half of the linked list, respectively:

![Image represents a linked list data structure with two pointers, `ptr1` and `ptr2`, manipulating its nodes.  The list consists of five nodes, numbered 1, 2, 3, 2, and 1, sequentially connected by solid arrows indicating the primary list order. A rectangular box labeled 'head' points to the first node (1), establishing the beginning of the list.  Another rectangular box labeled 'second_head' points to the last node (1), suggesting a second entry point.  Dashed orange arrows show additional connections: `ptr1` points to node 3, and `ptr2` points to node 3.  Furthermore, dashed orange arrows illustrate a secondary, non-sequential connection from node 1 to node 2, and from node 2 to node 3, and from node 2 to node 1, indicating a potential circular or rearranged structure within the list, possibly created or modified by the pointers.](/assets/images/dsa/linkedlists/ec0185eb3c846308.webp)

## Implementation

```python
from ds import ListNode
    
def palindromic_linked_list(head: ListNode) -> bool:
    # Find the middle of the linked list and then reverse the second half of the # linked list starting at this midpoint.
    mid = find_middle(head)
    second_head = reverse_list(mid)
    # Compare the first half and the reversed second half of the list
    ptr1, ptr2 = head, second_head
    res = True
    while ptr2:
        if ptr1.val != ptr2.val:
            res = False
        ptr1, ptr2 = ptr1.next, ptr2.next
    return res
    
# From the 'Reverse Linked List' problem.
def reverse_list(head: ListNode) -> ListNode:
    prevNode, currNode = None, head
    while currNode:
        nextNode = currNode.next
        currNode.next = prevNode
        prevNode = currNode
        currNode = nextNode
    return prevNode
    
# From the 'Linked List Midpoint' problem.
def find_middle(head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

### Complexity Analysis

**Time complexity:** The time complexity of `palindromic_linked_list` is O ( n ) O(n) O ( n ), where n n n denotes the length of the linked list. This is because it involves iterating through the linked list three times: once to find the middle node, once to reverse the second half, and once more to compare the two halves.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

## Interview Tip

Tip: Confirm if it’s acceptable to modify the linked list. In our solution, we reversed the second half of the linked list which dismantled the input’s initial structure. Why does this matter? Oftentimes, the input data structure should not be modified, particularly if it's shared or accessed concurrently. As such, it’s important to confirm with your interviewer whether input modification is acceptable and to briefly address the implications of this.
