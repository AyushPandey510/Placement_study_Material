---
title: "Intuition Min Heap"
course: "DSA"
topic: "Sort And Search"
source: "/home/ayush/OOD-Design-Principles/DSA/Sort And Search/Kth Largest Integer.html"
---
Return the **kth largest integer** in an array.

#### Example:

```python
Input: nums = [5, 2, 4, 3, 1, 6], k = 3
Output: 4
```

#### Constraints:

- The array contains no duplicates.
- The array contains at least one element.
- `1 ≤ k ≤ n`, where `n` denotes the length of the array.

## Intuition - Min-Heap

A straightforward solution to this problem is to sort the array in reverse order and return the number at the (`k - 1`)th index:

![Image represents a visual explanation of finding the k<sup>th</sup> largest element in an array.  The diagram begins with an unsorted array `[5 2 4 3 1 6]` where `k` is defined as 3.  The array's elements are indexed from 0 to 5, shown below each element. A rightward arrow labeled 'sort' indicates a sorting operation transforming the initial array into a sorted array `[6 5 4 3 2 1]`, maintaining the same indexing.  Above the sorted array, an orange arrow points down to the element at index 2 (the third largest element), which is 4, highlighting that the 3<sup>rd</sup> largest element (k=3) is 4.  The element '4' is circled in a peach color to emphasize its selection as the k<sup>th</sup> largest element.](/assets/images/dsa/sort-and-search/4125c3f180e9f0a4.webp)

This solution takes O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) time, but as we only need the kth largest integer, sorting all the elements in the input array might not be necessary. Let’s explore some solutions which take this into account.

An interesting thing to realize is that if we know what the top k largest integers are, we’d know that the smallest of these would be the kth largest integer:

![Image represents a visual depiction of finding the top k largest elements from a list.  The input is shown as a list `[5 2 4 3 1 6]` enclosed in square brackets, with each number circled in orange.  Arrows in orange indicate the selection of the three largest numbers (5, 4, and 6). These three numbers are then collected into a new list `[5 4 6]`, labeled 'top k largest:', with the number 4 highlighted in a light green circle. A green downward-pointing arrow from the light green circle points to the word 'min', suggesting a subsequent step might involve finding the minimum element within the top k largest elements.  The overall diagram illustrates a process of selecting the top k elements and potentially further processing them.](/assets/images/dsa/sort-and-search/0be6ae9c441952c2.webp)

This leads to the idea that instead of sorting the entire array, we can keep track of the top k largest integers in the array. Is there a way to maintain the top k largest integers, while having access to the smallest of these integers?

A min-heap seems like it should work well for this purpose because it provides efficient access to the smallest element. Let’s explore how to use it to maintain the top k integers in the array.

Consider the below example with k = 3. Let’s begin by pushing the first k integers to the heap:

![Image represents a visual depiction of a min-heap data structure being populated.  A downward-pointing arrow originates from a small square containing the letter 'i', suggesting an input source. This arrow points to a bracketed array `[5 2 4 3 1 6]`, where each number represents an element, and the subscripts (0, 1, 2, 3, 4, 5) indicate their indices within the array.  To the right, a trapezoidal shape labeled 'min_heap' visually represents the min-heap structure.  The number '5' is shown at the top of the min-heap, indicating that it's the root node (the smallest element). The image illustrates the initial step of building a min-heap, where the first element from the input array (5) is placed at the root of the min-heap.  The remaining elements (2, 4, 3, 1, 6) are implicitly implied to be added subsequently to maintain the min-heap property (where the value of each node is less than or equal to the values of its children).](/assets/images/dsa/sort-and-search/f77b5a65a35f5d3f.webp)

![Image represents a visual depiction of a min-heap data structure being built.  A downward-pointing arrow labeled 'i' points to an array `[5, 2, 4, 3, 1, 6]`, where each element's index (0-5) is shown below it in gray.  This array represents the input data. To the right, a min-heap is shown, visually represented as a trapezoidal structure with a purple border and labeled 'min_heap'. The top node contains the value '2', and the bottom node contains the value '5'.  The diagram illustrates an intermediate step in the process of constructing a min-heap from the input array; the '2' at the top of the min-heap suggests that the algorithm has already processed at least the first few elements of the array, placing the smallest element found so far at the root of the heap.  The remaining elements in the array are yet to be incorporated into the min-heap structure.](/assets/images/dsa/sort-and-search/7d4553b90eb96989.webp)

![Image represents a visual depiction of a data structure transformation.  A small square labeled 'i' points downwards to an array `[5, 2, 4, 3, 1, 6]`, where each element is indexed from 0 to 5 below it.  This array is being transformed into a min-heap data structure, shown as a trapezoidal shape with a purple outline labeled 'min_heap'. The min-heap contains the numbers 2, 4, and 5, arranged such that 2 is at the top, 4 is below and to the left, and 5 is below and to the right.  The arrangement suggests that the value of each node is less than or equal to the values of its children, a defining characteristic of a min-heap.  The arrow from 'i' implies that the array is the input to the process of creating the min-heap.](/assets/images/dsa/sort-and-search/a931d16e1db206ed.webp)

We shouldn’t immediately push the next element, 3, in the heap because the heap already contains k integers. This gives us a choice:

- Skip 3, or:
- Remove an integer from the heap and push 3 in.

The smallest integer in the heap is 2. Integer 3 is more likely to belong in the top k integers than 2 is, so let’s pop 2 from the heap and push 3 in:

![Image represents a step-by-step illustration of a coding pattern involving a min-heap data structure.  The top left shows an array `nums` with elements [5, 2, 4, 3, 1, 6], indexed from 0 to 5, with an arrow pointing to the element at index 3 (value 3).  To the right, a min-heap is depicted, initially containing elements 4 and 5, with a 2 (crossed out in red) at the top, indicating it's about to be removed. A dashed box next to the heap describes the algorithm: if `nums[i]` (the current element being processed from the array) is greater than the top element of the min-heap, then the top element is popped (in this case, 2), and `nums[i]` (which is 3) is pushed onto the min-heap. The bottom part shows the min-heap after this operation, now containing 3, 4, and 5.  The arrow connecting the top and bottom min-heap diagrams visually represents the transformation resulting from the algorithm described in the dashed box.](/assets/images/dsa/sort-and-search/7d39455482635801.webp)

The next integer is 1, which is smaller than the smallest integer in the heap. So, we know it’s not among the top k integers:

![Image represents a step in an algorithm, likely involving a min-heap data structure.  A numbered array `[5 2 4 3 1 6]` is shown, with an index `i` (represented by a box labeled 'i') pointing to the element '1' at index 4.  A min-heap is depicted visually as a tree structure with elements 3 (at the top), 4, and 5. The label 'min_heap' is below the heap. A downward arrow from 'i' points to the array element '1', indicating the current element being processed. A dashed box contains the condition `nums[i] < min_heap.top`, which checks if the current array element (1) is less than the top element of the min-heap (3).  A right-pointing arrow from this condition indicates that if the condition is true, the algorithm continues.  The overall diagram illustrates a comparison between an element from an input array and the top element of a min-heap, a common operation in heap-based algorithms like heapsort or priority queue management.](/assets/images/dsa/sort-and-search/6b423c5f5e1da00b.webp)

The final integer is 6. It’s larger than the smallest integer in the heap. So, let’s pop off the top of the heap and push in 6:

![Image represents a step-by-step illustration of a coding pattern involving a min-heap data structure.  The top section shows an array `nums` with elements [5, 2, 4, 3, 1, 6] indexed from 0 to 5, and a min-heap represented as a purple triangle containing the values 4 and 5.  A downward arrow points from an index `i` (represented by a small square labeled 'i') to the min-heap, indicating that the element at index `i` (which is 1 in this case) is being processed. A separate box describes the condition `nums[i] > min_heap.top` and the actions taken if the condition is true: popping the top element (3) from the min-heap and pushing `nums[i]` (1) onto the min-heap. The bottom section shows the resulting min-heap after these operations, now containing 4, 5, and 6, illustrating the updated state of the min-heap after processing the element at index `i`.  A horizontal arrow connects the before and after states of the min-heap.](/assets/images/dsa/sort-and-search/96b1a901e8a58319.webp)

At this point, the k integers in the heap represent the top k largest integers from the array, with the smallest of these integers located at the top of the heap. This smallest value is the kth largest integer in the entire array, so we can just return this integer from the top of the heap:

![The image represents a data structure visualization illustrating the retrieval of the minimum element from a min-heap.  A rectangular box labeled '4' in light purple, representing the top element of the min-heap, is shown with a green arrow pointing right towards the text 'return min_heap.top' written in green. This arrow indicates the action of returning the top element. Below the top element, a trapezoidal shape labeled 'min_heap' in purple contains the numbers '5' and '6', visually representing the remaining elements of the min-heap. The arrangement shows that the min-heap is structured such that the smallest element (4) is at the top, and the subsequent elements (5 and 6) are arranged below, implicitly suggesting a hierarchical structure where the parent node (4) is smaller than its children (5 and 6). The overall diagram demonstrates the process of accessing the minimum value from a min-heap data structure, where `min_heap.top` refers to accessing the top (minimum) element.](/assets/images/dsa/sort-and-search/ae11a014956ee55a.webp)

## Implementation - Min-Heap

```python
from typing import List
import heapq
    
def kth_largest_integer_min_heap(nums: List[int], k: int) -> int:
    min_heap = []
    heapq.heapify(min_heap)
    for num in nums:
        # Ensure the heap has at least 'k' integers.
        if len(min_heap) < k:
            heapq.heappush(min_heap, num)
        # If 'num' is greater than the smallest integer in the heap, pop off this
        # smallest integer from the heap and push in 'num'.
        elif num > min_heap[0]:
            heapq.heappop(min_heap)
            heapq.heappush(min_heap, num)
    return min_heap[0]
```

### Complexity Analysis

**Time complexity:** The time complexity of `kth_largest_integer_min_heap` is O ( n log ⁡ ( k ) ) O(n\log(k)) O ( n lo g ( k )) because for each integer, we perform at most one `push` and `pop` operation on the min-heap, which has a size no larger than k k k. Each heap operation takes O ( log ⁡ ( k ) ) O(\log(k)) O ( lo g ( k )) time.

**Space complexity:** The space complexity is O ( k ) O(k) O ( k ) because the heap can grow to a size of k k k.

## Intuition - Quickselect

The previous approach involved keeping track of the k largest integers to identify the kth largest integer. This effectively required us to keep these k values partially sorted through the use of a heap. But what if there’s a way to position only the kth largest value in its expected sorted position, without sorting the other numbers?

![Image represents a comparison of three different approaches to sorting an array.  The input array `[5 2 4 3 1 6]` is shown at the left.  Three arrows emanate from this array, each representing a different sorting method. The top arrow leads to a fully sorted array `[1 2 3 4 5 6]`, labeled 'sort the whole array:', with a time complexity of O(nlog(n)). The middle arrow points to a partially sorted array `[... 4 5 6]`, labeled 'sort the k largest integers:', showing only the k largest integers sorted, with a time complexity of O(nlog(k)).  The bottom arrow shows a final array `[... 4 ...]`, labeled 'only position the k<sup>th</sup> largest integer in its sorted index:', where only the k<sup>th</sup> largest integer (in this case, 4) is placed in its correct sorted position. This last method is marked with '(faster?)', suggesting it's potentially more efficient than the previous two.  Each array displays indices below its elements for clarity.  The highlighted '4' in each output array emphasizes the focus on the k<sup>th</sup> largest element.](/assets/images/dsa/sort-and-search/b973d921b777dd6f.webp)

**Quickselect** can be used to achieve this.

Quickselect is an algorithm that **leverages the partition step of quicksort**, which positions a value in its sorted position. Quickselect is generally used to find the kth *smallest* element, whereas, in this problem, we're asked to find the kth *largest* element. To utilize quickselect for this purpose, we can instead **find the (n - k)th smallest integer**, which is equivalent to finding the kth largest element:

![Image represents a visual explanation of finding the kth largest element in an array using the `quickselect` algorithm.  The diagram shows an initial unsorted array `[5 2 4 3 1 6]` with indices 0 through 5 displayed below each element.  Above the array, the equation 'k<sup>th</sup> largest == (n - k)<sup>th</sup> smallest' highlights the relationship between the kth largest and (n-k)th smallest elements, where 'n' is the array's size. A horizontal arrow connects the initial array to a partially sorted array `[2 1 3 4 5 6]`. This arrow is labeled `quickselect(n - k)`, indicating that the `quickselect` function is applied to find the (n-k)th smallest element.  The (n-k)th smallest element (which is also the kth largest) is highlighted in light green within the resulting array, specifically at index `n - k`, which is explicitly labeled with a green upward-pointing arrow.  The diagram visually demonstrates how finding the (n-k)th smallest element using `quickselect` effectively identifies the kth largest element.](/assets/images/dsa/sort-and-search/34fc8f5fd8926fef.webp)

Now, let’s dive into how quickselect works. To understand quickselect, we recommend you study the quicksort solution provided in the *Sort Array* problem.

Quickselect works identically to quicksort in that we:

1. Choose a pivot. 2. Partition the array into two parts by moving elements around the pivot so that:

- Numbers less than the pivot are moved to its left.
- Numbers greater than the pivot are moved to its right.

The primary difference between these two algorithms lies in the recursion step:

- In quicksort, we recursively process both the left and right parts.
- In quickselect, **we only need to recursively process one of these parts**.

Let’s explore why only one part is chosen.

**Deciding which part of a partition to process** Suppose we pick a random number as a pivot. After performing a partition, this pivot will be positioned correctly. From here, there are three possibilities for the position of the (`n - k`)th smallest integer:

- If the pivot is positioned before index n - k , it means the ( n - k )th smallest integer must be somewhere to the right of the pivot. So, perform quickselect on the right part:
- If the pivot is positioned after index n - k , perform quickselect on the left part:
- If the pivot is positioned exactly at index n - k , the pivot itself is the ( n - k )th smallest integer. So, we just return the pivot:

## Implementation - Quickselect

Note that the partition function in this implementation is identical to the partition function in *Sort Array*. Also, this implementation selects a random pivot, as per the optimization discussed in *Sort Array*.

```python
import random
from typing import List
    
def kth_largest_integer_quickselect(nums: List[int], k: int) -> int:
    return quickselect(nums, 0, len(nums) - 1, k)
    
def quickselect(nums: List[int], left: int, right: int, k: int) -> None:
    n = len(nums)
    if left >= right:
        return nums[left]
    random_index = random.randint(left, right)
    nums[random_index], nums[right] = nums[right], nums[random_index]
    pivot_index = partition(nums, left, right)
    # If the pivot comes before 'n - k', the ('n - k')th smallest integer is somewhere
    # to its right. Perform quickselect on the right part.
    if pivot_index < n - k:
        return quickselect(nums, pivot_index + 1, right, k)
    # If the pivot comes after 'n - k', the ('n - k')th smallest integer is somewhere
    # to its left. Perform quickselect on the left part.
    elif pivot_index > n - k:
        return quickselect(nums, left, pivot_index - 1, k)
    # If the pivot is at index 'n - k', it's the ('n - k')th smallest integer.
    else:
        return nums[pivot_index]
    
def partition(nums: List[int], left: int, right: int) -> int:
    pivot = nums[right]
    lo = left
    for i in range(left, right):
        if nums[i] < pivot:
            nums[lo], nums[i] = nums[i], nums[lo]
            lo += 1
    nums[lo], nums[right] = nums[right], nums[lo]
    return lo
```

**Time complexity:** The time complexity of `kth_largest_integer_quickselect` can be analyzed in terms of the average and worst cases:

- Average case: O ( n ) O(n) O ( n ) . In the average case, quickselect partitions the array and reduces the problem size by approximately half each time by performing a recursive call on only one part of each partition. A linear partition is performed during each of these recursive calls. This results in a total time complexity of O ( n ) + O ( n / 2 ) + O ( n / 4 ) + O ( n / 8 ) + … O(n) + O(n/2) + O(n/4) + O(n/8) + \dots O ( n ) + O ( n /2 ) + O ( n /4 ) + O ( n /8 ) + … , which is a geometric series that sums to O ( n ) O(n) O ( n ) .
- Worst case: O ( n 2 ) O(n^2) O ( n 2 ) . The worst-case scenario occurs when the pivot selection consistently results in extremely unbalanced partitions. This can result in the problem size only being reduced by one element after each partition, leading to a total time complexity of O ( n ) + O ( n − 1 ) + O ( n − 2 ) + … O(n)+O(n-1)+O(n-2)+… O ( n ) + O ( n − 1 ) + O ( n − 2 ) + … , which can be simplified to an O ( n 2 ) O(n^2) O ( n 2 ) time complexity.

**Space complexity:** The space complexity can also be analyzed in terms of the average and worst cases:

- Average Case: O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) . In the average case, the depth of the recursive call stack is approximately log ⁡ 2 ( n ) \log_2(n) lo g 2 ​ ( n ) .
- Worst Case: O ( n ) O(n) O ( n ) . In the worst case, the depth of the recursive call stack can be as deep as n n n .
