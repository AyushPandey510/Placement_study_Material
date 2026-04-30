---
title: "Combine Sorted Linked Lists"
course: "DSA"
topic: "Heaps"
source: "/home/ayush/OOD-Design-Principles/DSA/Heaps/Combine Sorted Linked Lists.html"
---
Given `k` singly linked lists, each sorted in ascending order, **combine them** into one sorted linked list.

#### Example:

![Image represents a directed acyclic graph illustrating a coding pattern, possibly related to data flow or function chaining.  The graph consists of several nodes, each represented by a circle containing a single digit (1, 3, 4, 6, 7).  Arrows indicate the direction of data flow or execution sequence between these nodes.  Three separate input sequences are shown above the label 'output:'. The first sequence shows node 1 connecting to node 6. The second shows node 1 connecting to node 4, which then connects to node 6. The third shows node 3 connecting to node 7. Below the label 'output:', a longer sequence is depicted, starting with node 1, proceeding through nodes 1, 3, 4, 6, 6, and finally ending at node 7. This longer sequence represents the combined or resultant output from the three input sequences, suggesting a pattern of data processing or function composition where the individual sequences contribute to a final result.](/assets/images/dsa/heaps/a3632229701f6a96.webp)

## Intuition

A good place to start with this problem is by figuring out how to merge just two sorted linked lists. We can do this by initiating a pointer at the start of both linked lists. Comparing the nodes at these pointers, add the smaller one to the output linked list and advance the corresponding pointer. This results in a combined sorted linked list:

![Image represents a diagram illustrating a data flow or processing pipeline.  Two rectangular boxes labeled 'ptr_1' and 'ptr_2' act as input sources, each pointing downwards with an arrow to a circular node.  'ptr_1' points to an orange-bordered circle containing the number '1', which is then connected via a rightward arrow to a standard black-bordered circle containing the number '3'. Similarly, 'ptr_2' points to a standard black-bordered circle containing the number '2', which is connected via a rightward arrow to another standard black-bordered circle containing the number '4'. Finally, a dashed-line rectangular box labeled 'output:' contains an orange-bordered circle with the number '1', suggesting that the value '1' is the final output of the process.  The diagram visually depicts a data flow where the initial values pointed to by 'ptr_1' and 'ptr_2' are processed, but only the value from 'ptr_1' appears in the output, implying a selective or filtering operation.](/assets/images/dsa/heaps/cc8a4da8e0c9c742.webp)

![Image represents a diagram illustrating data flow and pointers.  The diagram shows two separate data flow paths. The first path begins with a light gray circle labeled '1', which points to a dark gray circle labeled '3'. Above '3', a rectangular box labeled 'ptr_1' indicates a pointer directing the flow to node '3'. The second path starts with an orange circle labeled '2', which points to a dark gray circle labeled '4'.  Above '2', a rectangular box labeled 'ptr_2' shows a pointer directing the flow to node '2'.  These two paths are independent.  To the right, a dashed-line rectangle labeled 'output:' contains a simplified representation of the data flow, showing a dark gray circle labeled '1' pointing to an orange circle labeled '2', mirroring the colors and order of the original paths' destinations, suggesting an output based on the pointer directions.](/assets/images/dsa/heaps/9ac7ee7e6363e188.webp)

![The image represents a data flow diagram illustrating a coding pattern.  Two rectangular boxes labeled 'ptr_1' and 'ptr_2' point downwards, respectively, to orange-outlined circle 3 and a black-outlined circle 4.  A light gray circle numbered '1' has a light gray arrow pointing to circle 3. Similarly, a light gray circle numbered '2' has a light gray arrow pointing to circle 4. A dashed-line rectangle labeled 'output:' contains three circles: a black-outlined circle '1', followed by a black-outlined circle '2', and finally an orange-outlined circle '3'.  Arrows connect these circles within the 'output:' rectangle, indicating a sequential flow from '1' to '2' and then to '3'. The diagram visually demonstrates how pointers ('ptr_1' and 'ptr_2') might direct the flow of data, resulting in a specific output sequence (1, 2, 3) even though the initial data points (1 and 2) are processed independently.  The orange highlighting of circle 3 in both sections suggests a shared or final destination for the data flow.](/assets/images/dsa/heaps/62868fe73b0d780d.webp)

![Image represents a comparison of two linked lists.  On the left, a grey linked list shows nodes numbered 1, 3, and 2, connected sequentially with arrows indicating the flow of data.  Above this list, two rectangular boxes labeled 'ptr_1' and 'ptr_2' represent pointers.  'ptr_1' points down to node 3, while 'ptr_2' points down to a separate, orange-bordered node numbered 4.  This node 4 is also connected to node 2 via an arrow. On the right, a dashed-line box labeled 'output:' contains a second linked list, also showing nodes numbered 1, 2, 3, and 4, sequentially connected with arrows.  Node 4 in this list is also highlighted with an orange border, mirroring the node 4 on the left. The diagram illustrates how pointers can alter the order of elements in a linked list, resulting in a different sequence as shown in the 'output' linked list.](/assets/images/dsa/heaps/8ea4fbabfa84c1d4.webp)

But what if we have more than two linked lists? Combining two linked lists involves comparing two nodes at each iteration, but combining k linked lists would require k comparisons per iteration.

The reason we need to make so many comparisons is that we don't know which node has the smallest value at any point in the iteration, requiring us to search for it. Wouldn't it be nice to have an efficient way to access the smallest-valued node at any given point? A **min-heap** is perfect for this.

We can essentially do the same thing as in our initial approach, but instead of using pointers to determine the smallest node, we use a min-heap. Let’s see how this works over the three sorted linked lists below:

![Image represents a directed acyclic graph illustrating a simplified coding pattern, possibly depicting data flow or function calls.  Three distinct paths are shown, each originating from a numbered node representing an input or starting point.  The first path starts at node '1' and directly connects to node '6'. The second path also begins at node '1', proceeds to node '4', and then finally reaches node '6'. The third path originates from node '3' and leads to node '7'.  Each node is a circle containing a single digit (1, 3, 4, 6, 7), representing a distinct stage or component in the process.  Arrows indicate the unidirectional flow of information or execution sequence between these nodes.  The absence of cycles suggests a linear or branching, but ultimately non-recursive, pattern.  No URLs or parameters are visible within the diagram.](/assets/images/dsa/heaps/9bceece0072ed21c.webp)

To start, populate the heap with the head nodes of all the linked lists, so they're ready for comparison:

![Image represents a visualization of a heapsort algorithm's execution.  A gray-shaded rectangular box labeled 'heap' contains three circles representing the heap's elements: 1, 1, and 3, with 'min:' preceding them to indicate the minimum value.  Arrows emanate from each of these circles, representing the extraction of the minimum element from the heap in each step. The first arrow from the top '1' points to a circle containing '6'. The second arrow from the next '1' points to a circle containing '4', which in turn has an arrow pointing to a circle containing '6'. Finally, the third arrow from the '3' points to a circle containing '7'.  To the right, a section labeled 'output:' shows a light gray circle containing 'D', representing the output sequence which is incomplete in this snapshot of the algorithm's execution. The diagram illustrates the process of repeatedly removing the minimum element from the heap and adding it to the output sequence.](/assets/images/dsa/heaps/f6ecb8ad3fa71ada.webp)

Then, let’s implement our strategy of adding the smallest-valued node to the output linked list, using the heap to identify it. We'll use a dummy node to help build the output linked list (denoted as ‘node D’ in the above diagram).

After a node is popped off, the subsequent node from its linked list is added to the heap.

Now, let’s go through the example. First, we pop off the smallest-valued node from the heap and connect it to the tail of the output list:

![Image represents a visualization of a min-heap data structure and its interaction with a pop operation.  A rectangular box labeled 'heap' contains three circular nodes representing elements within the heap: a top node with '1' (highlighted in orange and crossed out, indicating it's being removed), a middle node with '1', and a bottom node with '3'.  The label 'min:' is placed to the left of the heap, indicating that the top element is the minimum.  An arrow labeled 'pop' points from the top node (1) to a circular node '6' outside the heap, showing the removal of the minimum element.  Further arrows connect the remaining heap elements: the '1' node connects to a '4' node, and the '3' node connects to a '7' node.  The '4' node then connects to a '6' node.  On the right side, a section labeled 'output:' shows a greyed-out circular node 'D' (likely representing a temporary storage or placeholder) connected via an arrow to a final orange-highlighted circular node containing '1', representing the popped minimum value.  The overall diagram illustrates the process of extracting the minimum element from a min-heap, showing the data flow and the resulting output.](/assets/images/dsa/heaps/ab162af14bb347cc.webp)

Then, add the subsequent node from the same linked list to the heap:

![Image represents a visual depiction of a push operation onto a min-heap data structure.  The diagram shows a rectangular box labeled 'heap' containing two nodes with values '1' and '3,'  with 'min:' labeling the left side, indicating it's a minimum heap (smallest element at the top).  A rightward arrow connects '1' to '4' and '3' to '7,' representing the heap's initial structure.  A separate node with the value '6' is shown outside the heap. A curved arrow labeled 'push' points from '6' towards the top of the heap, illustrating the process of adding '6' to the heap.  The arrangement suggests that after the push operation, the heap would need to be re-organized to maintain the min-heap property, although the resulting structure after the re-organization is not shown.  The overall diagram illustrates the concept of adding a new element to a min-heap.](/assets/images/dsa/heaps/d0b24cab00fb02c8.webp)

Continue this until we’ve added each node from all k linked lists to the output linked list:

![Image represents a visualization of a heap data structure and its use in extracting the minimum element.  The left side shows a min-heap represented as a gray rectangle labeled 'heap,' containing three nodes with values 6, 1 (highlighted in orange with a strikethrough), and 3.  The node with value 1 is labeled 'min:' indicating it's the minimum element.  An arrow points from the minimum element (1) to a node with value 4, which is then connected to a node with value 6.  Another arrow connects the node with value 3 to a node with value 7.  The right side shows the 'output:' sequence. It starts with a light gray circle labeled 'D' (likely representing a dummy or default value), followed by an arrow to a node with value 1 (the extracted minimum), and finally an arrow to another orange-highlighted node with value 1 (indicating the minimum element has been extracted and potentially stored elsewhere). The arrows illustrate the flow of data, showing how the minimum element is removed from the heap and added to the output sequence.](/assets/images/dsa/heaps/e714465bb9730f2c.webp)

![Image represents a visualization of a heap data structure and its interaction with an output sequence.  On the left, a heap is depicted as a gray rectangle labeled 'heap,' containing three circular nodes with values 6, 4, and a crossed-out 3 (highlighted in orange), indicating the minimum element.  The label 'min:' precedes the minimum value. Arrows point from the 4 and the crossed-out 3 in the heap to two separate circular nodes with values 6 and 7 respectively, suggesting the removal of the minimum element from the heap. On the right, labeled 'output:', a sequence of circular nodes connected by arrows shows the output: a light gray node labeled 'D' (likely representing a dummy or initial value) is followed by nodes with values 1, 1, and finally 3 (highlighted in orange), indicating the order in which minimum elements are extracted and processed. The overall image illustrates a process where the minimum element is repeatedly removed from a heap, generating an ordered output sequence.](/assets/images/dsa/heaps/a08d36f41741e2c6.webp)

![Image represents a visualization of a heap data structure and its interaction with an output sequence.  On the left, a heap is depicted as a gray rectangle labeled 'heap,' containing three circular nodes with numbers 6, 4 (crossed out and highlighted in orange), and 7, stacked vertically.  A label 'min:' precedes the heap. A directed arrow originates from the crossed-out 4 in the heap and points to a separate circular node containing the number 6. On the right, a sequence labeled 'output:' shows a series of connected circular nodes. The first node is light gray and contains the letter 'D', representing the start of the output. This node is connected by a directed arrow to a node with '1', which is connected to another node with '1', then to a node with '3', and finally to a node with '4' (highlighted in orange). The arrows indicate the flow of data, showing the extraction of the minimum element (4) from the heap and its subsequent placement in the output sequence, followed by other elements.](/assets/images/dsa/heaps/5a2db3e08580a4e5.webp)

![The image represents a visualization of a heap data structure and its use in sorting.  On the left, a 'heap' is depicted as a vertical array with three elements: 6 (highlighted in orange with a diagonal line through it, indicating it's being removed), 6, and 7.  The label 'min:' precedes the heap, suggesting it's a min-heap. To the right, labeled 'output:', is a sequence of circles connected by arrows, representing the sorted output. The sequence begins with a light gray circle containing 'D', likely representing the initial empty output. This is followed by a series of circles containing the numbers 1, 1, 3, 4, and finally 6 (in orange, matching the removed element from the heap). The arrows indicate the flow of data, showing the elements being extracted from the heap (in ascending order) and added to the output sequence.  The overall diagram illustrates the process of extracting the minimum element from a min-heap repeatedly to achieve a sorted sequence.](/assets/images/dsa/heaps/1389b6da10f1dea8.webp)

![Image represents a visualization of a heap data structure and its output sequence. On the left, a rectangular box labeled 'heap' contains two circular nodes; the top node, encircled in orange and marked with a diagonal line, contains the number '6', labeled 'min:'. The bottom node contains the number '7'.  To the right, labeled 'output:', is a sequence of circular nodes connected by arrows, representing the output stream. The sequence begins with a light gray node containing 'D', followed by nodes with '1', '1', '3', '4', '6', and finally, an orange-outlined node containing '6'. The arrows indicate the flow of data from the heap to the output, suggesting a process where the minimum element ('6') is extracted from the heap, then the next minimum, and so on. The orange highlighting on the '6' in the heap and the final output node emphasizes the extracted minimum value.](/assets/images/dsa/heaps/377526e168c9f66a.webp)

![Image represents a data flow diagram illustrating a heap sort algorithm.  On the left, a labeled 'heap' is depicted as a square containing a single, orange-outlined circle with the number '7' inside, struck through with a diagonal line.  The label 'min:' precedes the heap, suggesting this is a min-heap. To the right, labeled 'output:', a sequence of circles connected by rightward-pointing arrows displays the sorted output. The sequence begins with a light gray circle containing 'D', representing the initial state. This is followed by circles containing the numbers '1', '1', '3', '4', '6', '6', and finally, an orange-outlined circle containing '7', mirroring the element from the heap. The arrows indicate the flow of data from the heap to the output, showing the extraction and ordering of elements during the sorting process.  The orange highlighting on the '7' in both the heap and the output suggests it's the currently processed or last processed element.](/assets/images/dsa/heaps/1a746b309716c50d.webp)

Once the heap is empty, we can return `dummy.next`, which is the head of the combined linked list.

## Implementation

Note that in the implementation below, we modify the `ListNode` class globally to simplify the solution. It's important to confirm with your interviewer that global variables are acceptable.

```python
from typing import List
from ds import ListNode
import heapq
    
def combine_sorted_linked_lists(lists: List[ListNode]) -> ListNode:
    # Define a custom comparator for 'ListNode', enabling the min-heap to prioritize
    # nodes with smaller values.
    ListNode.__lt__ = lambda self, other: self.val < other.val
    heap = []
    # Push the head of each linked list into the heap.
    for head in lists:
        if head:
            heapq.heappush(heap, head)
    # Set a dummy node to point to the head of the output linked list.
    dummy = ListNode(-1)
    # Create a pointer to iterate through the combined linked list as we add nodes to
    # it.
    curr = dummy
    while heap:
        # Pop the node with the smallest value from the heap and add it to the output
        # linked list.
        smallest_node = heapq.heappop(heap)
        curr.next = smallest_node
        curr = curr.next
        # Push the popped node's subsequent node to the heap.
        if smallest_node.next:
            heapq.heappush(heap, smallest_node.next)
    return dummy.next
```

### Complexity Analysis

**Time complexity:** The time complexity of `combine_sorted_linked_lists` is O ( n log ⁡ ( k ) ) O(n\log(k)) O ( n lo g ( k )), where n n n denotes the total number of nodes across the linked lists. Here’s why:

- It takes O ( k log ⁡ ( k ) ) O(k\log(k)) O ( k lo g ( k )) time to create the heap initially because we insert k k k nodes into the heap.
- Then, for all n n n nodes, we perform a `push` and `pop` operation on the heap, each taking O ( log ⁡ ( k ) ) O(\log(k)) O ( lo g ( k )) time.

This results in a total time complexity of O ( k log ⁡ ( k ) ) + n ⋅ O ( log ⁡ ( k ) ) = O ( n log ⁡ ( k ) ) O(k\log(k))+n\cdot O(\log(k))=O(n\log(k)) O ( k lo g ( k )) + n ⋅ O ( lo g ( k )) = O ( n lo g ( k )).

**Space complexity:** The space complexity is O ( k ) O(k) O ( k ) because the heap stores up to one node from each of the k k k linked lists at any time.
