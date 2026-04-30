---
title: "Sort A K Sorted Array"
course: "DSA"
topic: "Heaps"
source: "/home/ayush/OOD-Design-Principles/DSA/Heaps/Sort a K-Sorted Array.html"
---
Given an integer array where each element is at most `k` positions away from its sorted position, **sort the array** in a non-decreasing order.

#### Example:

```python
Input: nums = [5, 1, 9, 4, 7, 10], k = 2
Output: [1, 4, 5, 7, 9, 10]
```

## Intuition

In a k-sorted array, each element is at most k indexes away from where it would be in a fully sorted array. We can visualize this with the following example where k = 2, and no number is more than k indexes away from its sorted position:

![Image represents a visual depiction of sorting a k-sorted array where k=2.  The top row shows the unsorted input array `[5, 1, 9, 4, 7, 10]` with indices 0 through 5 displayed below each element.  The bottom row displays the sorted array `[1, 4, 5, 7, 9, 10]` with corresponding indices.  Curved arrows connect elements from the unsorted array to their final positions in the sorted array.  The arrows illustrate the movement of elements during the sorting process.  Specifically, element 5 at index 0 moves to index 2, element 1 at index 1 moves to index 0, element 9 at index 2 moves to index 4, element 4 at index 3 moves to index 1, element 7 at index 4 moves to index 3, and element 10 at index 5 remains at index 5. The gray arrows indicate that the elements are not necessarily directly adjacent in the sorted array, reflecting the k-sorted property (elements are at most k positions away from their sorted position).  The text 'k-sorted array:' and 'sorted:' labels the input and output arrays respectively.  The value `k = 2` indicates that each element is at most 2 positions away from its correct sorted position in the input array.](/assets/images/dsa/heaps/44dee65bfb2ac65e.webp)

A trivial solution to this problem is to sort the array using a standard sorting algorithm. However, since the input is partially sorted (k-sorted), we should assume there's a faster way to sort the array.

We can think about this problem backward. For any index `i`, **the element that belongs at index i in the sorted array is located within the range [ i - k , i + k ]**. Below, we visualize how number 7, which is meant to be at index 3 when sorted, correctly falls within the range [3 - `k`, 3 + `k`] in the k-sorted array:

![Image represents a visual explanation of a sorting algorithm, likely illustrating a concept related to k-sorted arrays.  The diagram shows a k-sorted array `[5, 1, 9, 4, 7, 10]` represented as a trapezoid with a light-blue fill.  A horizontal cyan line segment spans the top of the trapezoid, labeled `3 - k` on the left and `3 + k` on the right, indicating a window of size 2k+1 centered around the element at index 3 (assuming 0-based indexing). The number 7 is circled within this window, highlighting its position.  The trapezoid's bottom edge connects to a fully sorted array `[1, 4, 5, 7, 9, 10]` below, demonstrating the result of a sorting operation. The number 3 is placed below the sorted array, possibly indicating the index of the middle element in the sorted array or the length of the sorted subarray. The overall structure visually demonstrates how a portion of a k-sorted array (the window) is sorted to obtain a fully sorted array.](/assets/images/dsa/heaps/a4b5dff338ca89ea.webp)

This is a good start, but we can reduce this range even further. Consider index 0 from the above array. We know the number which belongs at index 0 when sorted is somewhere in the range [0, 0 + `k`]:

![Image represents a visual explanation of sorting a k-sorted array.  The top row shows a 'k-sorted array' [5, 1, 9, 4, 7, 10], labeled as such.  A light-blue trapezoid highlights a section of this array, specifically the elements [5, 1, 9].  A horizontal, light-blue arrow above this section points from index θ (zero) to index θ + k, indicating a window of size k elements. The number '1' within the highlighted section is circled, emphasizing its position. The bottom row displays the 'sorted' array [1, 4, 5, 7, 9, 10], resulting from sorting the k-sorted array.  A vertical light-blue line connects the beginning of both arrays (index θ), and a diagonal line connects the end of the highlighted section in the k-sorted array to the end of the corresponding sorted section in the sorted array, visually demonstrating the transformation.  The diagram illustrates how a portion of a k-sorted array (where each element is at most k positions away from its sorted position) can be sorted to obtain a fully sorted array.](/assets/images/dsa/heaps/0296d520ca07a8f4.webp)

Note that the sorted array in the diagrams is purely provided as a reference point. We don't yet know which number in the range [0, 0 + `k`] belongs at index 0. However, one fact remains consistent: in a sorted array, index 0 always holds the smallest number. This means the value needed at index 0 is also the smallest number within the range [0, 0 + `k`] of the k-sorted array, which is 1 in this example.

So, let's swap 1 with the number at index 0 to position 1 as the first value in the sorted array:

![Image represents a step-by-step illustration of a sorting algorithm applied to a k-sorted array.  The top line shows an initial k-sorted array `[5 1 9 4 7 10]`, where a light-blue highlighted sub-array `[5 1 9]` represents a window of size `k` starting at index `0`. A light-blue line extends from index `0` to `0 + k`, indicating the window's boundaries.  An arrow points down from a small box containing 'i', suggesting this is the 'i'th iteration of the algorithm. Below, a second line displays the array after a swap operation: `[1 5 9 4 7 10]`.  The word 'swapped' and curved arrows indicate that elements 1 and 5 have been swapped. To the right, a dashed box describes the operation performed: 'swap nums[i] with min([5 1 9])', highlighting that the element at index `i` (5) was swapped with the minimum element (1) within the k-sized window. The number 1 is highlighted in peach within the `min()` function to emphasize its selection as the minimum value.  The diagram visually demonstrates a single iteration of a sorting algorithm that iteratively swaps elements within a k-sized window to achieve a sorted array.](/assets/images/dsa/heaps/18a4f5a041f5cfb8.webp)

Now let's find the number that belongs at index 1: the second smallest number. Since index 0 currently contains the smallest value in the array, we won't need to consider index 0 in our search. Therefore, we can find the value that belongs at index 1 in the range [1, 1 + k]. The smallest value in this range will be the second smallest value overall, which is 4 in this case.

So, let's swap 4 with the number at index 1 to position 4 as the second value in the sorted array:

![Image represents a step-by-step illustration of a sorting algorithm applied to a k-sorted array.  The top section shows the initial k-sorted array `[1 5 9 4 7 10]`, labeled as 'k-sorted array:'. A light-blue rectangle highlights the sub-array [5 9 4] from index 1 (labeled '1' below it) to index 1+k (labeled '1+k' below it). An arrow points down from a box labeled 'i', indicating the index being processed. A dashed box to the right explains the operation: 'swap nums[i] with min([5 9 4])', highlighting '4' as the minimum value within the highlighted sub-array. The bottom section shows the array after the swap, `[1 4 9 5 7 10]`, labeled 'k-sorted array:', with a curved arrow indicating that the elements at indices 1 and 3 have been swapped.  The entire diagram visually demonstrates a single iteration of a sorting algorithm (likely a variation of selection sort) on a k-sorted array, focusing on the process of finding and swapping the minimum element within a window of size k.](/assets/images/dsa/heaps/90595f9fd795fbbd.webp)

If we continue this process for the rest of the array, we'll successfully sort the k-sorted array.

The main inefficiency with this approach is finding the minimum number in the range [`i`, `i + k`] at each index `i`. Linearly searching for it will take O ( k ) O(k) O ( k ) time at each index.

To improve this approach, we'd need a way to efficiently access the minimum value at each of these ranges. A **min-heap** would be perfect for this.

**Min-heap** For a min-heap to determine the minimum value within each range [`i`, `i + k`], it will always need to be populated with the values in these ranges as we iterate through the array. Let's see how this works over the same example.

Before we can determine which value belongs at index 0, we'll need to populate the heap with all the values in the range [0, `k`], which are the first `k + 1` values (where `k = 2` in this example):

![Image represents a step-by-step illustration of a coding pattern, likely involving a min-heap data structure.  The top-left shows an integer variable `k` initialized to 2 and an index variable `i` represented by a box. A downward arrow from `i` points to an array `nums` containing the elements [5, 1, 9, 4, 7, 10], with indices 0 through 5 displayed below each element.  To the right, a trapezoidal shape labeled 'min_heap' represents a min-heap data structure with a separate box above it labeled 'min:' indicating the minimum element. A light-gray, dashed-bordered box to the right of the min-heap shows the code snippet `min_heap.push(nums[i])` and `i++`, indicating that the element at index `i` of the `nums` array is being pushed onto the min-heap, and then the index `i` is incremented.  The overall diagram visualizes the process of iterating through the `nums` array and adding each element to a min-heap, likely as part of a larger algorithm (e.g., finding the kth smallest element).](/assets/images/dsa/heaps/d745d176ee75b8ab.webp)

![Image represents a step-by-step illustration of building a min-heap from an array.  The array `[5, 1, 9, 4, 7, 10]` is shown at the bottom, with indices 0 through 5 labeled below each element.  A square box labeled 'i' indicates an index pointer, currently pointing via a downward arrow to the element '1' at index 1. A dashed arrow indicates that the element at index 'i' is being processed. To the right, a trapezoidal shape labeled 'min_heap' represents the min-heap data structure under construction.  Currently, it only contains the element '5', labeled with 'min: 5' to its left, indicating it's the minimum value in the heap. A dashed-line box to the right of the min-heap shows the code snippet `min_heap.push(nums[i])` and `i++`, indicating that the element at index `i` (currently 1, the value 1) is being pushed onto the min-heap, and then the index `i` is incremented.  The overall diagram visualizes the iterative process of constructing a min-heap by sequentially adding elements from the input array.](/assets/images/dsa/heaps/dc4033408ba21dd5.webp)

![Image represents a snapshot of a step in an algorithm, likely involving a min-heap data structure.  The bottom left shows an array `nums` = [5, 1, 9, 4, 7, 10] with indices 0 through 5 displayed below each element.  A box labeled 'i' points via a dashed arrow to the element 9 at index 2, indicating the current iteration of a loop.  To the right, a purple trapezoid labeled 'min_heap' visually represents a min-heap containing the value 5 at its root and 1 at the top. A separate purple box labeled 'min:' displays the value 1, representing the minimum element currently in the min-heap. A dashed-line box to the right of the min-heap shows the code snippet `min_heap.push(nums[i])` followed by `i++`, indicating that the algorithm is pushing the element at index `i` (which is 9) onto the min-heap and then incrementing `i` for the next iteration.  The overall diagram illustrates the process of building a min-heap from an array by iteratively pushing elements onto the heap.](/assets/images/dsa/heaps/a04c1c1feebf8cb5.webp)

![Image represents a visual depiction of a step in a sorting algorithm, likely using a min-heap data structure.  The left side shows an array `[5, 1, 9, 4, 7, 10]` indexed from 0 to 5, with a pointer `i` currently at index 3, indicating the element '4'. A dashed arrow points from `i` to '4', suggesting that element '4' is being considered or processed.  Below the array is a labeled axis 'k + 1', implying 'k' represents a variable related to the algorithm's progress. The right side displays a min-heap, a tree-based data structure where the smallest element is at the root. The min-heap contains the elements 1, 5, and 9, with '1' at the top, labeled 'min: 1', indicating it's the minimum value in the heap. The overall image suggests that the algorithm is building or updating the min-heap by incorporating elements from the array, with the current focus on element '4' at index 3.](/assets/images/dsa/heaps/26b3802e6c6d5f29.webp)

An alternative way to create a heap of the first `k + 1` elements is to heapify a list of the first `k + 1` elements.

Now, let's begin inserting the smallest elements from the heap into the array, using the `insert_index` pointer. The value that belongs at index 0 in sorted order is the value currently at the top of the heap, which is 1:

![The image represents a step in a sorting algorithm, likely using a min-heap data structure.  On the left, a numbered array `[5, 1, 9, 4, 7, 10]` is shown, with indices 0 through 5 displayed below.  A box labeled 'insert_index' points down to this array, indicating a position where a value will be inserted.  Separately, a box labeled 'i' points to the same array, likely representing an iterator or index variable.  To the right, a min-heap is depicted as a triangular structure containing the values 5 and 9.  Above the min-heap, a purple box labeled 'min:' contains the value '1,' representing the minimum element currently in the heap.  An arrow connects this '1' to a dashed box containing the code snippet `nums[insert_index] = min_heap.pop()`. This code signifies that the minimum value (1) from the `min_heap` is being popped (removed) and assigned to the array element at the index specified by `insert_index`.  The overall diagram illustrates the process of inserting a value into a sorted array using a min-heap to efficiently find the smallest element.](/assets/images/dsa/heaps/3819f0c06ffefade.webp)

Once we insert 1 at index 0, push the value at index `i` to the heap before incrementing both pointers:

![Image represents a step-by-step illustration of building a min-heap from an array.  The top half shows the initial state: an array `[1, 1, 9, 4, 7, 10]` is depicted with indices 0-5 below each element.  A variable `insert_index` points to the first element (index 0), and a variable `i` points to the element at index 3 (value 4). A partially-filled min-heap is shown to the right, containing only the value 9, with a label `min: 5` indicating the minimum value (5) which is not yet in the heap. A dashed box next to the min-heap displays the code snippet `min_heap.push(nums[i])`, `insert_index++`, `i++`, indicating that the element at index `i` (4) is being pushed onto the min-heap, `insert_index` is incremented, and `i` is incremented. The bottom half shows the next step: `insert_index` now points to the element at index 3 (value 4), and `i` points to the element at index 4 (value 7). The min-heap now contains 4, 5, and 9, with `min: 4` indicating the current minimum.  Dashed arrows indicate the movement of `insert_index` and `i` through the array.  The overall diagram visualizes the iterative process of constructing a min-heap by sequentially adding elements from an array.](/assets/images/dsa/heaps/1337e51539215fbc.webp)

Let's continue this process for the remaining numbers:

![Image represents a step-by-step illustration of a sorting algorithm, likely using a min-heap data structure.  The top half shows an initial state: an array `nums` containing `[1, 1, 9, 4, 7, 10]` is indexed by `insert_index` (initially pointing to the first element, highlighted in green) and `i` (pointing to the second element). A min-heap, labeled `min_heap`, contains the values `5` and `9`.  An arrow indicates that the minimum value from the min-heap (4, highlighted in purple) is assigned to `nums[insert_index]`, replacing the initial value. The bottom half depicts the next step:  `insert_index` has advanced to the next position. The value at `nums[i]` (4) is pushed onto the `min_heap`, updating it to contain `5` and `9`.  A separate box describes the actions performed:  popping the minimum element from the min-heap and assigning it to the array element at `insert_index`, then pushing the next array element onto the min-heap, incrementing both `insert_index` and `i`.  The array and min-heap are visually represented, showing the changes in their contents after each step.](/assets/images/dsa/heaps/816ba762b99509d8.webp)

![Image represents a visual explanation of a coding pattern, likely involving a min-heap data structure and an array.  The top half shows an array `nums` represented as `[1, 4, 9, 4, 7, 10]` with indices 0-5, and a min-heap `min_heap` containing the values 7 and 9.  A box labeled 'insert_index' points to the element '9' in the array.  A purple box labeled 'min: 5' indicates the minimum value (5) is being extracted from the min-heap. An arrow connects this to a dashed box showing the operation `nums[insert_index] = min_heap.pop()`, which replaces the element at `insert_index` (9) with the minimum value from the heap (5).  The bottom half shows the result of this operation: the array is now `[1, 4, 5, 4, 7, 10]`, and the min-heap contains only 9.  A box labeled 'i' points to the next element (7) in the array. A dashed box shows the operation `min_heap.push(nums[i])`, `insert_index++`, `i++`, indicating that the next element (7) is pushed onto the min-heap, and the `insert_index` and `i` are incremented.  The overall diagram illustrates a step-by-step process of replacing array elements with values from a min-heap, likely part of a sorting or selection algorithm.](/assets/images/dsa/heaps/ad9c624b5e450b67.webp)

![Image represents a visual depiction of inserting an element into a min-heap data structure.  The left side shows an array `[1, 4, 5, 4, 7, 10]` with indices 0 through 5 displayed below.  A box labeled 'insert_index' points via a dashed arrow to the element '4' at index 3, indicating where a new element is to be inserted. On the right, a min-heap is shown, represented as a trapezoidal structure with elements 7 (labeled 'min: 7' in a box), 9, and 10. A box labeled 'i' points via a dashed arrow to the element '10' in the array, suggesting the index from which the element is being inserted into the heap. The array and the min-heap are visually separate but conceptually linked, illustrating the process of adding an element to the heap, which would involve comparing and potentially swapping elements to maintain the min-heap property.](/assets/images/dsa/heaps/1f63002e003276fb.webp)

Once there are no more elements to push into the heap, the rest of the array can be sorted by inserting the remaining values from the heap:

![Image represents a step in a sorting algorithm, likely using a min-heap data structure.  The algorithm involves an array `nums` represented by `[1, 4, 5, 4, 7, 10]` with indices shown below. A separate min-heap, `min_heap`, is depicted as a trapezoidal structure containing the values 9 and 10. A variable `insert_index` points to the next available position in `nums` (index 3 in this case). A purple box labeled `min: 7` represents the minimum value currently in the `min_heap`. A rightward arrow connects this box to a dashed box containing the code snippet `nums[insert_index] = min_heap.pop(); insert_index++;`. This code indicates that the minimum element (7) from the `min_heap` is being popped and assigned to the element at `nums[insert_index]`, after which `insert_index` is incremented.  The overall process illustrates how the algorithm uses the min-heap to efficiently find and place the next smallest element into its correct sorted position within the `nums` array.](/assets/images/dsa/heaps/a96a2791d34887e4.webp)

![Image represents a step in a sorting algorithm, likely heapsort, illustrating the process of inserting elements from a list into a min-heap.  A numbered list `[1, 4, 5, 7, 7, 10]` is shown, with indices 0-5 displayed below.  A variable `insert_index` points to the next available position (index 3) in the list. A purple min-heap is depicted, currently containing only the value 10.  A separate purple box labeled `min: 9` represents the minimum value extracted from the min-heap. A dashed-line box contains the code snippet `nums[insert_index] = min_heap.pop(); insert_index++;`, indicating that the minimum element (9) from the `min_heap` is being assigned to the element at `insert_index` in the `nums` array, and then `insert_index` is incremented.  An arrow connects the `min: 9` box to the code snippet, showing the data flow.  The algorithm appears to be iteratively removing the minimum element from the min-heap and placing it into its correct sorted position within the `nums` array.](/assets/images/dsa/heaps/35e9ef60394e4d36.webp)

![Image represents a step in a sorting algorithm, likely using a min-heap data structure.  The left side shows an array `nums` with elements [1, 4, 5, 7, 9, 10] indexed from 0 to 5.  A box labeled 'insert_index' points to the element '10' at index 5, indicating the current position for insertion.  A purple box labeled 'min: 10' represents the minimum element (10) extracted from a min-heap data structure depicted as a purple trapezoid labeled 'min_heap'. A right-pointing arrow connects the 'min: 10' box to a grey box containing the code snippet `nums[insert_index] = min_heap.pop(); insert_index++;`. This code signifies that the minimum value (10) from the min_heap is assigned to the array element at `insert_index`, and then `insert_index` is incremented, preparing for the next element insertion.  The overall process illustrates how a sorted array is constructed by repeatedly extracting the minimum element from a min-heap and placing it into its correct position in the array.](/assets/images/dsa/heaps/f944ce3f65498a4d.webp)

![Image represents a visual depiction of a min-heap data structure.  On the left, a green array `[1, 4, 5, 7, 9, 10]` is shown, with indices 0 through 5 displayed below each element. To the right, a trapezoidal shape labeled 'min_heap' represents the heap structure itself. Above the heap, a small purple rectangle labeled 'min:' suggests this area displays the minimum value within the heap (which would be 1 in this case, based on the array).  There's no explicit connection drawn between the array and the heap, but the implication is that the array's elements are stored in the min-heap according to the min-heap property (where the parent node is always less than or equal to its children).](/assets/images/dsa/heaps/7be7cf96fc59e4c9.webp)

Once the heap is empty, the array is sorted.

## Implementation

```python
from typing import List
import heapq
        
def sort_a_k_sorted_array(nums: List[int], k: int) -> List[int]:
    # Populate a min-heap with the first k + 1 values in 'nums'.
    min_heap = nums[:k+1]
    heapq.heapify(min_heap)
    # Replace elements in the array with the minimum from the heap at each
    # iteration.
    insert_index = 0
    for i in range(k + 1, len(nums)):
        nums[insert_index] = heapq.heappop(min_heap)
        insert_index += 1
        heapq.heappush(min_heap, nums[i])
    # Pop the remaining elements from the heap to finish sorting the array.
    while min_heap:
        nums[insert_index] = heapq.heappop(min_heap)
        insert_index += 1
    return nums
```

### Complexity Analysis

**Time complexity:** The time complexity of `sort_a_k_sorted_array` is O ( n log ⁡ ( k ) ) O(n\log(k)) O ( n lo g ( k )), where n n n denotes the length of the array. Here's why:

- We perform heapify on a min_heap of size k + 1 k+1 k + 1 which takes O ( k ) O(k) O ( k ) time. Note that k k k is upper-bounded by n n n in this operation since the heap won't have more than n n n values.
- Then, we perform push and pop operations on approximately n − k n-k n − k values using the heap. Since the heap can grow up to a size of k + 1 k+1 k + 1 , each push and pop operations takes O ( log ⁡ ( k ) ) O(\log(k)) O ( lo g ( k )) time. Therefore, this loop takes O ( n log ⁡ ( k ) ) O(n\log(k)) O ( n lo g ( k )) time in the worst case.
- The final while-loop runs in O ( k log ⁡ ( k ) ) O(k\log(k)) O ( k lo g ( k )) time since we pop k + 1 k+1 k + 1 values from the heap. Note that k k k here is also upper-bounded by n n n .

Therefore, the overall time complexity is O ( k ) + O ( n log ⁡ ( k ) ) + O ( k log ⁡ ( k ) ) = O ( n log ⁡ ( k ) ) O(k)+O(n\log(k))+O(k\log(k))=O(n\log(k)) O ( k ) + O ( n lo g ( k )) + O ( k lo g ( k )) = O ( n lo g ( k )).

**Space complexity:** The space complexity is O ( k ) O(k) O ( k ) since the heap can grow up to k + 1 k+1 k + 1 in size.
