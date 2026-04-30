---
title: "Sort Array"
course: "DSA"
topic: "Sort And Search"
source: "/home/ayush/OOD-Design-Principles/DSA/Sort And Search/Sort Array.html"
---
Given an integer array, **sort the array** in ascending order.

#### Example:

```python
Input: nums = [6, 8, 4, 2, 7, 3, 1, 5]
Output: [1, 2, 3, 4, 5, 6, 7, 8]
```

## Intuition

This problem is quite open-ended because there are many sorting algorithms we could use to sort an array, each with its own pros and cons. In this explanation, we focus on the quicksort algorithm, which runs in O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) time on average, where n n n denotes the length of the array.

**Quicksort** Conceptually, the goal of quicksort is to sort the array by **placing each number in its sorted position one at a time**. To correctly position a number, we move all numbers smaller than it to its left, and all numbers larger than it to its right. At each step, we call this number the pivot. We discuss how a pivot is selected later in the explanation.

![Image represents a visual depiction of a partitioning step within a sorting algorithm, likely Quicksort.  The top row shows an unsorted array [6, 8, 4, 2, 7, 3, 1, 5], with the element '5' highlighted in an orange box and labeled 'pivot'. A downward arrow indicates the partitioning process. The bottom row displays the array after partitioning.  The numbers less than the pivot (5) are grouped in a light-blue box labeled 'less than 5' as [4, 2, 3, 1]. The pivot (5) is shown in an orange box, positioned between the two groups, and labeled 'in the correct position'. The numbers greater than the pivot are grouped in a light-purple box labeled 'greater than 5' as [6, 8, 7]. This illustrates how the pivot element is placed in its final sorted position, with all smaller elements to its left and all larger elements to its right, a key step in the Quicksort algorithm.](/assets/images/dsa/sort-and-search/674812e8eedd574a.webp)

This process is called **partitioning** because we’re dividing the array into two parts around the pivot:

1. The left part with elements smaller than the pivot.
2. The right part with elements larger than the pivot.

Note that neither the left nor the right part of the pivot value need to be sorted. All that matters is that the pivot is in the correct position.

After partitioning, we just need to **sort the left and right parts**. We can do this by recursively calling quicksort on both of them. This makes quicksort a divide and conquer strategy. The pseudocode for this is provided below:

```python
def quicksort(nums, left, right):
    # Partition the array and obtain the index of the pivot.
    pivot_index = partition(nums, left, right)
    # Sort the left and right parts.
    quicksort(nums, left, pivot_index - 1)
    quicksort(nums, pivot_index + 1, right)
```

Let’s discuss the partitioning process in more detail.

**Partitioning** There are two primary steps to partitioning:

1. Selecting the pivot.
2. Rearranging the elements so elements smaller than the pivot are on its left, and elements larger than the pivot are on its right.

Selecting the pivot We can actually choose any number as the pivot. The method of selecting a pivot can be optimized, which is discussed later, but for simplicity, we can choose the rightmost number as the pivot:

![Image represents a sequence of numbers, [6, 8, 4, 2, 7, 3, 1, 5], displayed horizontally.  Each number is positioned above its index, indicated in grey text below (0 through 7). The number 5, located at index 7, is highlighted within an orange rectangular box, labeled 'pivot' in orange text to its upper right.  The arrangement visually depicts a data array, with the highlighted '5' signifying a pivot element within the context of a sorting algorithm or similar data structure operation.  No URLs or parameters are present; the image solely illustrates the positional relationship between the numbers and the designated pivot.](/assets/images/dsa/sort-and-search/3f1c6fc934ea8221.webp)

Rearranging elements around the pivot Let’s see if we can do this in linear time without using extra space.

If we can ensure all numbers less than the pivot are placed to the left, then numbers greater than or equal to the pivot will consequently be placed to the right. This can be done using two pointers:

- One pointer at the left of the array ( lo ) to position the numbers less than the pivot.
- One pointer to iterate through the array ( i ), looking for numbers less than the pivot.

The main idea here is that whenever we encounter a number less than the pivot, swap it with `nums[lo]`.

Let's look at the example below to understand how this works. First, keep advancing `i` until we find a number less than the pivot:

![Image represents a visual depiction of a portion of a sorting algorithm, likely Quicksort.  The diagram shows an array `[6, 8, 4, 2, 7, 3, 1, 5]` with indices 0 through 7 displayed below each element.  Above the array, two boxes labeled '10' (light gray) and 'i' (black) indicate variables. Arrows point from both '10' and 'i' downwards, suggesting these variables are used to iterate through the array.  To the right, a separate box labeled 'pivot' contains the value '5', indicating the pivot element for this iteration. A dashed-line box depicts a conditional statement: 'nums[i] > pivot'.  An arrow extends from this condition to the word 'continue,' illustrating that if the condition `nums[i] > pivot` is true, the algorithm continues to the next iteration.  The overall diagram illustrates a single step in the partitioning phase of a sorting algorithm, where elements are compared to the pivot to determine their position in the sorted array.](/assets/images/dsa/sort-and-search/d24895d61bd14f8d.webp)

![Image represents a snapshot of a sorting algorithm, likely Quicksort, illustrating a single iteration.  A numerical array `[6, 8, 4, 2, 7, 3, 1, 5]` is shown with indices 0 through 7 displayed below each element.  A grey box labeled 'lo' (likely representing the lower index of a partition) points to the element '6' at index 0, and a black box labeled 'i' (likely representing the current index) points to the element '8' at index 1. A dashed arrow connects 'lo' to 'i', suggesting a comparison or traversal between these indices.  A separate grey box labeled 'pivot' contains the value '5', indicating the pivot element selected for this partition.  A decision box with dashed borders shows a condition: `nums[i] > pivot`.  If this condition is true (as it is for '8'), a solid arrow points to the word 'continue', implying the algorithm proceeds to the next iteration, potentially incrementing 'i' to compare the next element.  The overall diagram visualizes the state of the algorithm during a comparison step within the partitioning phase of a sorting algorithm.](/assets/images/dsa/sort-and-search/b5c8270bc8dc3309.webp)

![Image represents a visual depiction of a step in a sorting algorithm, likely Quicksort.  A numerical array `[6, 8, 4, 2, 7, 3, 1]` is shown, with indices 0 through 6 displayed below each element.  Above the array, two boxes labeled '10' (grey) and 'i' (black) indicate variables. A downward arrow from '10' points to the element '6' at index 0, suggesting '10' might represent the array's length or a related parameter.  A downward arrow from 'i' points to the element '4' at index 2. A dashed curved arrow connects 'i' to '8' at index 1, indicating a comparison or swap operation.  Finally, a separate box labeled 'pivot' contains the value '5', suggesting '5' is the pivot element selected for this partitioning step in the algorithm.  The arrangement visually demonstrates the algorithm's progress in partitioning the array around the pivot.](/assets/images/dsa/sort-and-search/4e6169b3aef6e617.webp)

Once a number less than the pivot is found, move it to the left by swapping it with `nums[lo]`. Then, increment lo so it points to where the next number less than the pivot should be placed:

![Image represents a visual depiction of a step within a sorting algorithm, likely Quicksort.  The left side shows an array `[6, 8, 4, 2, 7, 3, 1, 5]` with indices 0 through 7 displayed below each element.  Arrows point downwards from labeled boxes 'lo' (initially pointing to index 0) and 'i' (initially pointing to index 2) indicating their current positions within the array. The number 5 is labeled as 'pivot'. The right side shows a decision box with dashed borders.  This box contains a condition `nums[i] < pivot`, which checks if the element at index `i` (currently 4) is less than the pivot (5). If true, two actions are performed:  `swap(nums[i], nums[lo])` swaps the element at index `i` with the element at index `lo`, and `lo += 1` increments the `lo` index.  The arrows from the decision box represent the flow of control based on the condition's outcome.  The overall diagram illustrates a single iteration of the partitioning phase in a sorting algorithm, where elements smaller than the pivot are moved to the left side of the array.](/assets/images/dsa/sort-and-search/ad8d0d6872bd308d.webp)

![Image represents a step in a sorting algorithm, likely Quicksort, illustrating a swap operation.  The array `[4, 8, 6, 2, 7, 3, 1]` is shown with indices 0 through 6 displayed below each element in gray.  A light-blue box labeled 'lo' points down to the element at index 0 (value 4), and a black box labeled 'i' points down to the element at index 2 (value 6). A curved light-blue arrow labeled 'swapped' connects the element at index 0 (4) to the element at index 2 (6), indicating these two elements have been exchanged.  To the right, a gray box labeled 'pivot' contains the value 5, which is likely the pivot element around which the partition is being built.  The arrangement visually depicts the state of the array during the partitioning phase of the algorithm, where elements smaller than the pivot are moved to the left and larger elements to the right.](/assets/images/dsa/sort-and-search/ba27c50a8b90ab63.webp)

![Image represents a visual depiction of a step in a sorting algorithm, likely Quicksort.  An array [4, 8, 6, 2, 7, 3, 1] is shown with indices 0 through 6 displayed below each element. A light-blue box labeled 'lo' (likely representing the low index) points to the element '8' at index 1 via a dashed arrow indicating a potential swap or comparison. A black box labeled 'i' (likely representing the iterator or current index) points to the element '6' at index 2 with a solid arrow.  A grey box labeled 'pivot' contains the value '5' at index 7, indicating this element is the pivot around which the partition is being formed. The arrangement shows the algorithm's progress in partitioning the array based on the pivot value.  The dashed arrow from 'lo' suggests a comparison or movement of the '8' element relative to the pivot. The solid arrow from 'i' indicates the iterator's position in the array during the partitioning process.](/assets/images/dsa/sort-and-search/b8948cbeaedd4ae9.webp)

Continue this process until all numbers less than the pivot are on the left of the array:

![The image represents a visual depiction of a pivot element in an array during a sorting algorithm, likely Quicksort.  A numerical array `[4, 2, 3, 1, 8, 6, 7, 5]` is shown, with indices 0 through 7 displayed below each element.  Elements 4, 2, and 3 are colored light blue, indicating they might be processed or sorted already.  The number 1 is also light blue, suggesting it's part of a sorted or processed section. The number 8, 6, and 7 are in black, implying they are yet to be processed.  A light gray box labeled 'pivot' contains the number 5, located at index 7, signifying it's the chosen pivot element for this iteration.  A light blue box above the array contains the number '10,' which might represent the total number of elements or a related parameter. A downward-pointing arrow connects the '10' box to the number 8 in the array, possibly indicating the pivot selection process or the current position of the algorithm's pointer.](/assets/images/dsa/sort-and-search/66df97fba029912a.webp)

The last step is to move the pivot to the correct position by swapping the pivot with `nums[lo]`:

![Image represents a visual depiction of a single step in a sorting algorithm, likely Quicksort.  The image shows an array [4, 2, 3, 1, 5, 6, 7, 8] with indices 0 through 7 displayed below each element. The number 5 is highlighted in a light beige box with an orange border and labeled 'pivot'.  A curved orange arrow connects the element 1 (at index 3) and the element 8 (at index 7), labeled 'swapped,' indicating that these two elements have been exchanged during the partitioning phase of the algorithm.  The arrangement visually demonstrates the in-place swapping of elements relative to the pivot element during the partitioning process of a sorting algorithm.](/assets/images/dsa/sort-and-search/aec1a1ac7cc2fe2f.webp)

## Implementation

```python
from typing import List
    
def sort_array(nums: List[int]) -> List[int]:
    quicksort(nums, 0, len(nums) - 1)
    return nums
    
def quicksort(nums: List[int], left: int, right: int) -> None:
    # Base case: if the subarray has 0 or 1 element, it's already sorted.
    if left >= right:
        return
    # Partition the array and retrieve the pivot index.
    pivot_index = partition(nums, left, right)
    # Call quicksort on the left and right parts to recursively sort them.
    quicksort(nums, left, pivot_index - 1)
    quicksort(nums, pivot_index + 1, right)
    
def partition(nums: List[int], left: int, right: int) -> int:
    pivot = nums[right]
    lo = left
    # Move all numbers less than the pivot to the left, which consequently positions
    # all numbers greater than or equal to the pivot to the right.
    for i in range(left, right):
        if nums[i] < pivot:
            nums[lo], nums[i] = nums[i], nums[lo]
            lo += 1
    # After partitioning, 'lo' will be positioned where the pivot should be. So, swap
    # the pivot number with the number at the 'lo' pointer.
    nums[lo], nums[right] = nums[right], nums[lo]
    return lo
```

### Complexity Analysis

**Time complexity:** The time complexity of `sort_array` can be analyzed in terms of the average and worst cases:

- Average case: O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) . In the average case, quicksort effectively divides the array into two roughly equal parts after each partition, leading to a recursive tree with a depth of approximately log ⁡ 2 ( n ) \log_2(n) lo g 2 ​ ( n ) . For each of these levels, we perform a partition which takes O ( n ) O(n) O ( n ) time, resulting in a total time complexity of O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) .
- Worst case: O ( n 2 ) O(n^2) O ( n 2 ) . The worst-case scenario occurs when the pivot selection consistently results in extremely unbalanced partitions, such as when the smallest or largest element is always chosen as a pivot, which is explained in more detail in the optimization. Uneven partitioning can result in a recursive depth as deep as n n n . For each of these n n n levels of recursion, we perform a partition which takes O ( n ) O(n) O ( n ) time, resulting in a total time complexity of O ( n 2 ) O(n^2) O ( n 2 ) .

**Space complexity:** The space complexity can also be analyzed in terms of the average and worst cases:

- Average case: O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) . In the average case, the depth of the recursive call stack is approximately log ⁡ 2 ( n ) \log_2(n) lo g 2 ​ ( n ) .
- Worst case: O ( n ) O(n) O ( n ) . In the worst case, the depth of the recursive call stack can be as deep as n n n .

## Optimization

As mentioned in the above complexity analysis, it’s possible for a worst-case time complexity of O ( n 2 ) O(n^2) O ( n 2 ) to occur. Let’s dive into when this can happen. Consider the following array, which is already sorted:

![Image represents a simple array or list data structure depicted using square brackets `[]` to enclose five integer elements: 1, 2, 3, 4, and 5.  These elements are arranged sequentially within the brackets, separated by spaces, indicating their order within the data structure. No connections or information flow is explicitly shown beyond the inherent sequential arrangement of the elements within the array.  The image solely illustrates the basic structure of a list containing five integers, with no further metadata, labels, or external connections depicted.](/assets/images/dsa/sort-and-search/d42f5b5ef0244f32.webp)

If we perform quicksort on this array, we choose the rightmost element as the pivot and partition the other elements around this pivot. However, since this pivot is the largest element, there will be `n-1` elements less than the pivot and 0 elements greater than or equal to it:

![Image represents a visual depiction of a partitioning step within a sorting algorithm, likely Quicksort.  The illustration shows an array represented as `[1 2 3 4 5]`. The number 5 is highlighted in an orange box and labeled 'pivot'.  A light-blue rounded rectangle encloses the numbers 1, 2, 3, and 4, labeled 'left part' in light-blue text. A purple arrow originates from the right side of the pivot (5) and points to the right, indicating the absence of a 'right part' in this specific step.  The overall arrangement demonstrates the partitioning process where elements smaller than the pivot are placed to its left, and in this case, no elements are larger than the pivot, resulting in an empty right partition.](/assets/images/dsa/sort-and-search/03675d8be7137c5d.webp)

This creates quite an uneven partition. When we call quicksort on the left part, the same imbalance will occur, but with a left part consisting of `n-2` elements:

![Image represents a visual depiction of a partitioning step in a sorting algorithm, likely Quicksort.  The image shows a numerical array `[1, 2, 3, 4]` enclosed in square brackets. The first three elements, `[1, 2, 3]`, are grouped together in a light-blue rounded rectangle and labeled in light-blue text as 'left part'. The last element, `4`, is separately enclosed in an orange rounded rectangle and labeled above in orange text as 'pivot'. A purple arrow originates from the bottom of the 'pivot' rectangle and points to the right, indicating the direction of data flow, and is labeled in purple text as 'no right part'. This illustrates a scenario where the pivot element is already in its correct sorted position, resulting in an empty right partition after the partitioning step.  The arrangement visually separates the array into a 'left part' and an implicitly empty 'right part' based on the pivot's position.](/assets/images/dsa/sort-and-search/3eb9b03bb1304a81.webp)

Continuing this until the quicksort process is complete results in a recursion depth of n.

An uneven partition occurs when we choose an **extreme pivot**: one that’s larger or smaller than most other elements. Consistently picking an extreme pivot can occur when the array is sorted in increasing or decreasing order, or when there are many duplicates in the array.

To reduce the likelihood of choosing an extreme pivot, we can modify quicksort to choose a **random pivot** instead. There still remains a small chance of consistently picking an extreme pivot, but this outcome is no longer dependent on the order of the input array. A more detailed answer is discussed in the provided reference [[1]](https://cs.stackexchange.com/questions/7582/what-is-the-advantage-of-randomized-quicksort).

We can integrate this change into our current solution by randomly selecting an index and swapping its element with the rightmost element, before performing the partition. This way, we don't have to modify the partition function, as it uses the rightmost element:

```python
def quicksort_optimized(nums: List[int], left: int, right: int) -> None:
    if left >= right:
        return
    # Choose a pivot at a random index.
    random_index = random.randint(left, right)
    # Swap the randomly chosen pivot with the rightmost element to position the pivot
    # at the rightmost index.
    nums[random_index], nums[right] = nums[right], nums[random_index]
    pivot_index = partition(nums, left, right)
    quicksort_optimized(nums, left, pivot_index - 1)
    quicksort_optimized(nums, pivot_index + 1, right)
```

## Interview Follow-Up

Let’s say the interviewer introduces the following constraints to the initial sorting problem:

- The input array does not contain negative values.
- All values in the input array are less than or equal to 10 3 10^3 1 0 3.

Does our approach to the problem change, and should we still use quicksort? Considering that all values in our array now fall within the limited range of [0, 10 3 10^3 1 0 3], a counting sort approach becomes appropriate.

**Counting sort** Counting sort is a non-comparison-based sorting algorithm that works by counting the number of occurrences of each element in the array, then using these counts to place each element in its correct sorted position:

![Image represents a visual explanation of a counting sort algorithm.  At the top, a list named `nums` is shown, containing the integer values [2, 1, 0, 0, 2, 4, 2]. A gray line underlines this list. Below, a list called `counts` is displayed, representing the frequency of each element in `nums`.  `counts` contains [2, 1, 3, 0, 1], indicating two 0s, one 1, three 2s, zero 3s, and one 4.  Small gray numbers (0, 1, 2, 3, 4) are placed above `counts` to clarify the index corresponding to each element's count. Orange curved arrows connect each element in `counts` to the corresponding number of elements in the final `res` list.  `res` is the sorted output list, shown at the bottom as [0, 0, 1, 2, 2, 2, 4], where each element's position reflects its sorted order based on the counts in the `counts` list.  The arrows visually demonstrate how the frequency information in `counts` is used to populate the sorted `res` list.](/assets/images/dsa/sort-and-search/64faa3603b5dcde2.webp)

We can do this in two steps:

1. Count occurrences: create a counts array, where each of its indexes represents an element from the original array. Increment the value at each index based on how many times the corresponding element appears in the original array.
2. Build sorted array ( res ): iterate through each index of the counts array and add that index ( i ) to the sorted array as many times as its value ( counts[i ]) indicates.

Counting sort is efficient here because we know the largest possible number in the array is at most 10 3 10^3 1 0 3, which means our counts array will have a maximum size of 10 3 10^3 1 0 3 + 1. However, if this problem constraint is not specified and the maximum value in the array may be very large, then a counting sort solution might not be appropriate, due to the potentially large size of the counts array.

Note that there’s another common method for implementing counting sort, which is detailed in the reference provided [[2]](https://en.wikipedia.org/wiki/Counting_sort).

```python
from typing import List
    
def sort_array_counting_sort(nums: List[int]) -> List[int]:
    if not nums:
        return []
    res = []
    # Count occurrences of each element in 'nums'.
    counts = [0] * (max(nums) + 1)
    for num in nums:
        counts[num] += 1
    # Build the sorted array by appending each index 'i' to it a total of 'counts[i]'
    # times.
    for i, count in enumerate(counts):
        res.extend([i] * count)
    return res
```

**Time complexity:** The time complexity of `sort_array_counting_sort` is O ( n + k ) O(n+k) O ( n + k ), where k k k denotes the maximum value of `nums`. This is because it takes O ( n ) O(n) O ( n ) time to count the occurrences of each element and O ( k ) O(k) O ( k ) time to build the sorted array.

**Space complexity:** The space complexity is O ( n + k ) O(n+k) O ( n + k ), since the `res` array occupies O ( n ) O(n) O ( n ) space, and the counts array takes up O ( k ) O(k) O ( k ) space. Note that `res` is considered in the space complexity, as counting sort is not an in-place sorting algorithm requiring an additional array to store the sorted result.

## Interview Tip

*Tip: Quicksort is useful for in-place sorting.* While quicksort isn’t a stable sorting algorithm, it is an in-place sorting algorithm, meaning it requires less additional space compared to an algorithm such as merge sort, which takes O ( n ) O(n) O ( n ) space when used to sort an array.
