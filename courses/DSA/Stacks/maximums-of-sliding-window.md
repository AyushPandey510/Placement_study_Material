---
title: "Maximums Of Sliding Window"
course: "DSA"
topic: "Stacks"
source: "/home/ayush/OOD-Design-Principles/DSA/Stacks/Maximums of Sliding Window.html"
---
There's a sliding window of size `k` that slides through an integer array from left to right. Create a new array that records the **largest number found in each window** as it slides through.

#### Example:

![Image represents a step-by-step illustration of finding the maximum value within an array of integers.  Four rows depict the array `[3, 2, 4, 1, 2, 1, 1]`. In each row, a light-blue rectangular highlight progressively moves across the array, indicating the current element being considered as the potential maximum.  To the right of each array, 'max = ' is followed by the maximum value found so far during that step. The first three rows show the highlight moving from the leftmost element (3) to the element 4, correctly identifying 4 as the maximum. The final row shows the highlight moving to the last element (1) after 4 has already been identified as the maximum, resulting in a final maximum value of 4.  The image visually demonstrates a linear scan algorithm for finding the maximum element in an array.](/assets/images/dsa/stacks/59bb3ced1dabc2a4.webp)

```python
Input: nums = [3, 2, 4, 1, 2, 1, 1], k = 4
Output: [4, 4, 4, 2]
```

## Intuition

A brute-force approach to solving this problem involves iterating through each element within a window to find the maximum value of that window. Repeating this for each window will take O ( n ⋅ k ) O(n\cdot k) O ( n ⋅ k ) time because we traverse k k k elements for up to n n n windows.

The main issue is that as we slide the window, we keep re-examining the same elements we've already looked at in previous windows. This is because two adjacent windows share mostly the same values.

![Image represents two nearly identical arrays of integers, each enclosed in square brackets.  The top array is `[3, 2, 4, 1, 2, 1, 1]` and the bottom array is `[3, 2, 4, 1, 2, 1, 1]`. A light-blue rectangular box highlights the sub-array `[2, 4, 1]` in both arrays, indicating that these elements have the same values in both arrays. The text 'same values' is positioned within the central area of the box, explicitly labeling the highlighted section.  The arrays are horizontally aligned, with the highlighted sections overlapping vertically.  No URLs or parameters are present.](/assets/images/dsa/stacks/0612bf0a1d87286a.webp)

A more efficient solution likely involves keeping track of values we see in any given window so that at the next window, we don't have to iterate over previously seen values again. Specifically, at each window, we should only maintain a record of values that have the potential to become the maximum of a future window. Let's call these values **candidates**, where all the values that aren't candidates can no longer contribute to a maximum. How can we determine which numbers are candidates?

Consider the window of size 4 in the following array. We'll use left and right pointers to define the window:

![Image represents a visual depiction of data partitioning or splitting.  Two rectangular boxes labeled 'left' and 'right' are positioned above a horizontal array of numbers: [3, 2, 4, 1, 2, 1, 1].  Arrows descend from 'left' and 'right' pointing to the number array. The numbers 3, 2, 4, and 1 are highlighted with a light blue background, indicating that this section of the array is associated with the 'left' box. The remaining numbers (2, 1, 1) are not highlighted and are implicitly associated with the 'right' box.  The diagram illustrates how a data set (the array of numbers) is divided into two subsets, 'left' and 'right,' based on some unspecified criteria.](/assets/images/dsa/stacks/0fa8e03610755dd6.webp)

To identify the candidates for the next window, let's look at each number individually.

**3:** Number 3 is a candidate for the current window, but once we move to the next window, we can ignore it since it will no longer be included in the window.

**2:** Could number 2 be a maximum of a future window? The answer is no. This is because of the 4 to its right: all future windows which contain this 2 will also contain 4, and since 4 is larger, it means 2 could never be a maximum of any future windows.

**4:** This is the maximum value in the current window, and it'll be included in some future windows. Therefore, 4 could potentially be a maximum for a future window.

**1:** Could 1 become the maximum of a future window? The answer is yes. While 4 is larger in the current window, it's positioned to the left of 1. As the window shifts to the right, there will eventually be a point where 1 remains in the window while 4 is excluded, making 1 a potential maximum in the future.

Based on the above analysis, we can derive the following strategy whenever the window encounters a new candidate:

1. Remove smaller or equal candidates: Any existing candidates less than or equal to the new candidate should be discarded because they can no longer be maximums of future windows.
2. Adding the new candidate : Once smaller candidates are discarded, the new value can be added as a new candidate.
3. Removing outdated candidates : When the window moves past a value, that value should be discarded to ensure we don't consider values outside the window.

Observe how this strategy is applied to the list of candidates below as the window advances one index to the right:

![Image represents a sliding window algorithm visualization.  The initial state shows a numerical array `nums = [2 5 4 3 2 1 3]` where a light-blue rectangle highlights a window encompassing the elements [2 5 4 3 2 1]. A thick grey arrow labeled 'slide window' indicates a rightward shift of this window.  The resulting state shows a new window [2 5 4 3 2 1 3] where the element '2' is no longer in the window (indicated by text 'no longer in window' and a downward arrow pointing to the new window), and a new element '3' has entered the window (indicated by text 'new candidate' and a downward arrow pointing to the '3' within the new window). The '3' in the new window is highlighted with a light grey circle to emphasize its addition.  The overall diagram illustrates a single iteration of a sliding window technique, showing how the window moves across the array, adding and removing elements.](/assets/images/dsa/stacks/1c1044a0e0087feb.webp)

![Image represents a step-by-step process demonstrating a coding pattern, likely related to candidate selection or filtering.  It begins with an initial list of candidates: `[5 4 3 2 1]`.  Step 1, labeled 'remove values ≤ new candidate (3)', shows the removal of values 3, 2, and 1 from the list, resulting in `[5 4]`.  A red line visually connects the removed elements. Step 2, 'add the new candidate', inserts the value '3' (in orange) into the list, producing `[5 4 3]`. Finally, step 3, 'remove outdated values', removes the value 5 (indicated by a red line), leaving the final list as `[4 3]`.  The process illustrates a sequence of operations involving removing elements based on a condition, adding a new element, and then potentially removing further elements based on another criteria, possibly to maintain a specific list size or order.](/assets/images/dsa/stacks/cd04cf343a37ef0d.webp)

An important observation is that **candidate values always maintain a decreasing order**. This is because each new candidate we encounter removes smaller and equal candidates to its left, ensuring the list of candidates is kept in a decreasing order.

This consequently means **the maximum value for a window is always the first value in the candidate list.**

Therefore, to store the candidates, we need a data structure that can maintain a **monotonic decreasing order** of values.

**Deque** We know that typically, a stack allows us to maintain a monotonic decreasing order of values, but in this case, it has a critical limitation: it doesn't provide a way to remove outdated candidates. A stack is a last-in-first-out (LIFO) data structure, which means we only have access to the last (i.e., most recent) end of the data structure. From the diagram above, we know we need access to both ends of the list of candidates, so a stack won't be sufficient.

Is there a data structure that allows us to add and remove from both ends? A **double-ended queue**, or deque for short, is a great candidate for this. A deque is essentially a doubly linked list under the hood. It allows us to push and pop values from both ends of the data structure in O ( 1 ) O(1) O ( 1 ) time.

Despite its name, it's easier to think of a deque as a double-ended stack:

![Image represents a comparison of stack and deque data structures.  The left side depicts a stack, labeled 'stack:', showing a linear array represented by `[• • • • • •]`.  A cyan-colored arrow labeled 'push' indicates that new elements are added to the right end.  Conversely, a purple arrow labeled 'pop' shows that elements are removed from the right end (LIFO - Last In, First Out). The right side illustrates a deque, labeled 'deque:', also represented by a linear array `[• • • • • •]`.  However, unlike the stack, the deque has two cyan arrows indicating 'push to left' and 'push to right,' signifying that elements can be added to either end.  Similarly, two purple arrows, 'pop from left' and 'pop from right,' demonstrate that elements can be removed from both the left and right ends (FIFO - First In, First Out from one end, and LIFO from the other).  The overall image visually contrasts the unidirectional nature of stack operations with the bidirectional capabilities of deque operations.](/assets/images/dsa/stacks/176bca23f2ead5b7.webp)

Now that we have our data structure, let's see how we can use it over the following example. Note that our deque will store tuples containing both a value and its corresponding index. We keep track of indexes in the deque because they allow us to determine whether a value has moved outside the window. We'll see how this works later in the example.

![Image represents a depiction of a queue data structure, showing its initial state and an empty dequeued queue.  A numerical array `[3, 2, 4, 1, 2, 1, 1]` is presented, representing the elements of the queue.  Beneath each element, a numerical index (0 to 6) indicates its position within the queue.  A comma separates the queue array from the representation of the dequeued queue, denoted as `dq = []`, which is an empty array, signifying that no elements have been removed from the original queue yet.  The arrangement visually displays the queue's contents and its index-based organization, with the `dq` variable clearly showing the absence of dequeued elements.](/assets/images/dsa/stacks/cc7afd8b57b3f492.webp)

Start by expanding the window until it's of length k. For each candidate we encounter, we need to ensure the values in the deque maintain a monotonic decreasing order before pushing it in:

![Image represents a visual explanation of a coding pattern, likely involving a deque (double-ended queue) data structure.  At the top, two rectangular boxes labeled 'left' and 'right' point downwards with arrows towards an array `[3, 2, 4, 1, 2, 1, 1]`.  The number 3 at index 0 is highlighted in light blue, indicating a focus on this element.  To the right, two separate, light-grey, dashed-bordered boxes describe operations: the top box states '1) pop candidates ≤ 3', suggesting elements from the array are popped (removed) until a condition (candidates ≤ 3) is met. The bottom box describes '2) push 3 with its index', indicating that the value 3 (and potentially its index 0) is added to another data structure.  Finally, an equation `dq = [(3, 0)]` is shown, where `dq` likely represents the deque, and `[(3, 0)]` shows the deque's content after the operations, containing the value 3 paired with its original index 0.  The `val` and `index` labels below clarify the tuple's structure within the deque.  The entire diagram illustrates a step-by-step process of manipulating an array and updating a deque based on a specific condition.](/assets/images/dsa/stacks/e30162f786ad2e94.webp)

![Image represents a visual explanation of a coding pattern, likely involving a deque (double-ended queue) data structure.  The top-left shows two labeled boxes, 'left' and 'right,' pointing downwards to an array `[3, 2, 4, 1, 2, 1, 1]`.  The numbers 0 through 6 underneath the array represent their indices.  The numbers 3 and 2 are highlighted in light blue, indicating they are initial candidates. Two rectangular boxes on the right describe a two-step process: 1) 'pop candidates ≤ 2,' suggesting elements with values less than or equal to 2 are removed from the array; and 2) 'push 2 with its index,' indicating that the value 2 and its index (1) are added to a new data structure.  The result of this process is shown as `dq = [(3, 0), (2, 1)]`, where `dq` represents the deque, and each tuple contains a value and its original index from the input array.  An arrow labeled 'decreasing values' points to the right, indicating that the deque is ordered by decreasing values.](/assets/images/dsa/stacks/e2201b263a044531.webp)

When we reach 4, we can't add it to the deque straight away because adding it would violate the decreasing order of the deque. So, let's pop any candidates from the right of the deque that are less than 4 before pushing 4 in.

![Image represents a visual explanation of a coding pattern, likely involving a deque (dq) data structure and a sorting or searching algorithm.  The top left shows an array `[3, 2, 4, 1, 2, 1, 1]` with indices 0-6.  Arrows labeled 'left' and 'right' point to the elements 3 and 4 respectively, suggesting these are initial boundary points.  A dashed box to the right describes a 'pop' operation (step 1) where elements are removed if their value is less than or equal to 4.  To the right of this, the deque `dq` is initialized as `[(3, 0), (2, 1)]`, representing value-index pairs.  Below, another dashed box describes a 'push' operation (step 2) where the element 4 (at index 2) is added to the deque.  The subsequent `dq` becomes `[(4, 2)]`.  Red arrows and inequalities (4 > 2, 4 > 3) illustrate comparisons between the current element being considered (4) and elements already in the deque, indicating a process of maintaining a sorted or prioritized subset within the deque.  The labels 'val' and 'index' clearly denote the components of each pair within the deque.](/assets/images/dsa/stacks/8ef6af9b049384ca.webp)

The next expansion of the window will set it at the expected fixed size of k:

![Image represents a visualization of a coding pattern, likely involving a deque (double-ended queue) data structure.  The top-left shows an array `[3, 2, 4, 1, 2, 1, 1]` with a pointer `k` positioned at index 2, indicating a potential split point.  Above the array, boxes labeled 'left' and 'right' suggest the array is being processed from both ends. A light-blue highlight spans the array from index 0 to index 3, possibly representing a processed section.  The right side displays two labeled boxes describing steps in an algorithm: 1) 'pop candidates ≤ 1' implying elements less than or equal to 1 are removed, and 2) 'push 1 with its index' suggesting that the value 1 and its index are added to a data structure.  The result of this algorithm is shown as `dq = [(4, 2), (1, 3)]`, a deque containing pairs where the first element is the value and the second is its original index, arranged in decreasing order of values, as indicated by the arrow labeled 'decreasing values'.  The `dq` represents the output after processing the array according to the described steps.](/assets/images/dsa/stacks/c3bc880b9c36131a.webp)

Now that the window is of length k, it's time to begin recording the maximum value of each window. As mentioned earlier, the maximum value is the first value in the candidate list (i.e., the leftmost value of the deque.) The maximum value of this window is 4 since it's the leftmost candidate value.

With the window now at a fixed size of k, our approach shifts from expanding the window to sliding it. As we slide, we should remove any values from the deque whose index is before the left pointer, since those values will be outside the window:

![Image represents a visualization of a coding pattern, likely involving a deque (dq) data structure and a sliding window technique.  The top-left shows an array `[3, 2, 4, 1, 2, 1]` with indices 0-6. Arrows labeled 'left' and 'right' point to elements 2 and 2 respectively, indicating a window's boundaries. Three numbered, dashed-bordered boxes describe the algorithm's steps: 1) 'pop candidates ≤ 2' which, alongside the right-hand side, shows an initial deque `dq = [(4, 2), (1, 3)]` where each pair represents (value, index) and the element (1,3) is removed because its value is less than or equal to 2; 2) 'push 2 with its index' resulting in `dq = [(4, 2), (2, 4)]`; and 3) 'remove outdated candidates,' which is not explicitly shown in the deque but implies further processing. The right-hand side illustrates the deque's evolution, with a red arrow highlighting the removal of (1,3) and the final deque showing pairs ordered by decreasing values, indicating the algorithm maintains a sorted deque of candidates within the sliding window.](/assets/images/dsa/stacks/5481b1b8a853a4ff.webp)

The maximum value of the above window after the three operations are performed is revealed to be 4, as it's the leftmost candidate value.

![Image represents a step-by-step illustration of a coding pattern, likely involving a deque (double-ended queue) data structure.  The top shows an array `[3, 2, 4, 1, 2, 1]` with indices 0-6. Arrows labeled 'left' and 'right' point to the element '4' and '1' respectively, indicating a focus on a sub-array. Below, three numbered steps describe operations on a deque (`dq`). Step 1) 'pop candidates ≤ 1' suggests removing elements from the deque with values less than or equal to 1. Step 2) 'push 1 with its index' indicates adding the element '1' along with its index (in this case, index 5) to the deque.  The result of step 2 is shown as `dq = [(4, 2), (2, 4), (1, 5)]`, where each tuple represents (value, index) pairs, ordered by decreasing values as indicated by the arrow. Finally, step 3) 'remove outdated candidates' implies removing elements from the deque that are no longer relevant based on the algorithm's logic. The entire diagram visualizes the process of maintaining a deque of candidates, ordered by decreasing values, within a specific algorithm.](/assets/images/dsa/stacks/5f4e1ee6d0137eff.webp)

The maximum value of the above window after the three operations are performed is also 4, as it's the leftmost candidate value.

![Image represents a step-by-step illustration of a coding pattern, likely involving a deque (dq) data structure and a sliding window or similar algorithm.  The top shows an array `[3, 2, 4, 1, 2, 1, 1]` with indices 0-6, and arrows pointing from labels 'left' and 'right' to the array's element at index 3 and 6 respectively.  Below, three numbered steps are shown, each accompanied by a description and the evolution of the deque `dq`. Step 1, 'pop candidates ≤ 1', shows `dq` initially containing pairs (value, index) representing elements from the array: `[(4, 2), (2, 4), (1, 5)]`.  A red arrow indicates the removal of `(1, 5)` because its value (1) meets the condition. Step 2, 'push 1 with its index', adds `(1, 6)` to `dq`, resulting in `[(4, 2), (2, 4), (1, 6)]`.  The arrow indicates the deque is ordered by decreasing values. Step 3, 'remove outdated candidates', removes `(4,2)` from `dq` because its index (2) is less than the current `left` pointer (indicated by a red arrow pointing to `(4,2)` and the inequality `2 < left`). The final `dq` is `[(4, 2), (2, 4), (1, 6)]` after this step.  The overall process demonstrates how the deque maintains a subset of the array's elements based on value and index, dynamically adapting to the movement of the `left` and `right` pointers.](/assets/images/dsa/stacks/ae983dd5680c2e24.webp)

Before recording the maximum value of this window, we ensured 4 was removed from the deque because its index (index 2) occurs before the left pointer (index 3), indicating it's no longer within the current window. The maximum value for this window after this removal is revealed to be 2.

## Implementation

```python
from typing import List
from collections import deque
    
def maximums_of_sliding_window(nums: List[int], k: int) -> List[int]:
    res = []
    dq = deque()
    left = right = 0
    while right < len(nums):
        # 1) Ensure the values of the deque maintain a monotonic decreasing order
        # by removing candidates <= the current candidate.
        while dq and dq[-1][0] <= nums[right]:
            dq.pop()
        # 2) Add the current candidate.
        dq.append((nums[right], right))
        # If the window is of length 'k', record the maximum of the window.
        if right - left + 1 == k:
            # 3) Remove values whose indexes occur outside the window.
            if dq and dq[0][1] < left:
                dq.popleft()
            # The maximum value of this window is the leftmost value in the
            # deque.
            res.append(dq[0][0])
            # Slide the window by advancing both 'left' and 'right'. The right
            # pointer always gets advanced so we just need to advance 'left'
            left += 1
        right += 1
    return res
```

### Complexity Analysis

**Time complexity:** The time complexity of `maximums_of_sliding_window` is O ( n ) O(n) O ( n ) because we slide over the array in linear time, and we push and pop values of `nums` into the deque at most once for each number.

**Space complexity:** The space complexity is O ( k ) O(k) O ( k ) because the deque can store up to k k k elements.

## Interview Tip

Tip: If you're unsure about what data structure to use for a problem, first identify what attributes or operations you want from the data structure. Use these attributes and operations to pinpoint a data structure that satisfies them and can be used to solve the problem. In this problem, we wanted a data structure that could add and remove elements from both ends of it efficiently, and the best data structure that matched these requirements was a deque.
