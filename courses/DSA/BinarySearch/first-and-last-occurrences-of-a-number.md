---
title: "First And Last Occurrences Of A Number"
course: "DSA"
topic: "BinarySearch"
source: "/home/ayush/OOD-Design-Principles/DSA/BinarySearch/First and Last Occurrences of a Number.html"
---
Given an array of integers sorted in non-decreasing order, return the **first and last indexes** of a target number. If the target is not found, return `[-1, -1]` .

#### Example 1:

```python
Input: nums = [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11],
       target = 4
Output: [3, 5]
```

Explanation: The first and last occurrences of number 4 are indexes 3 and 5, respectively.

## Intuition

A brute-force solution to this problem involves a linear search to find the first and last occurrences of the target number. However, since the array is sorted, we can try searching for these two occurrences using **binary search**.

The challenge of using binary search here is that we need to find two separate occurrences of the same number. This means that a standard binary search alone isn’t sufficient.

To help us find a solution, it’s important to understand that the problem is effectively asking us to find the lower and upper bound of a number in the array:

![Image represents a sequence of integers from 1 to 11, displayed in two rows. The top row shows the integers [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11], with the three consecutive '4's highlighted in a light peach/orange rectangle.  The bottom row displays the corresponding indices, ranging from 0 to 12.  Two orange downward-pointing arrows connect the bottom row to labels below. The arrow originating from index 3 points to the label 'lower bound,' and the arrow originating from index 5 points to the label 'upper bound,' indicating that the highlighted sequence of three '4's starts at the lower bound (index 3) and ends at the upper bound (index 5).](/assets/images/dsa/binarysearch/c222826af4b8177c.webp)

This indicates we can solve this problem in two main steps:

1. Perform a binary search to find the lower bound of the target.
2. Perform a binary search to find the upper bound of the target.

**Lower-bound binary search** To find the start position of the target, let’s first **define the** **search space**. The target could be anywhere in the array, so the search space should encompass all the array’s indexes.

Next, let’s figure out how to **narrow the search space**. At each point in the binary search, there are three conditions to consider based on the midpoint value:

- when it's greater than the target
- when it's less than the target
- when it’s equal to the target

In each of these cases, think about where the target is in relation to the midpoint. Note that we’re effectively looking for the **leftmost occurrence** of the target value.

Midpoint value is greater than the target If the midpoint value is greater, it means the target is to the left of this number. So, narrow the search space toward the left.

When we do this, we can exclude the midpoint from the search space (i.e., `right = mid - 1`) because its value is not equal to the target:

![Image represents a visual depiction of a step within a binary search algorithm or a similar search/sorting process operating on a numerical array.  The array `nums` is displayed horizontally, with elements [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11].  Index values are shown below each element (0-12).  Three labeled pointers, 'left', 'mid', and 'right', indicate array boundaries or positions.  'left' points to the beginning of the array (index 0), 'right' points to the end (index 12), and 'mid' points to element 4 at index 3 (highlighted in light green). A dashed box below the array displays a conditional statement: `nums[mid] > 4`.  An arrow indicates that if this condition is true, then the 'right' pointer is updated to `right = mid - 1`, effectively narrowing the search space to the left half of the array.  The visual arrangement clearly shows the pointers' positions and how the condition affects the 'right' pointer's movement, illustrating a key step in a divide-and-conquer approach to searching or sorting.](/assets/images/dsa/binarysearch/057735f669d3bdc9.webp)

![Image represents a visual depiction of a merging or combining operation, possibly within a sorting or merging algorithm.  Two labeled input streams, 'left' and 'right,' each feed into a sequence of numbered elements. The 'left' stream contributes elements 1, 2, and 3, while the 'right' stream contributes elements 4, 4. Element 3 from the left stream is highlighted in light green, suggesting a potential comparison or selection point.  The numbers 5 through 11 are shown in light gray, representing the output sequence. A dashed orange line connects the last element of the 'left' stream (3) to the second element of the 'right' stream (4), and then curves to the last element of the output sequence (11), visually indicating the flow of data and the merging process.  The numbers below the main sequence (0-12) likely represent indices or positions within the arrays.](/assets/images/dsa/binarysearch/c6fb3d91c530a1c6.webp)

Midpoint value is less than the target If the midpoint value is smaller, it means the target is to the right of this number. So, narrow the search space toward the right. Again, we can exclude the midpoint from the search space (i.e., `left = mid + 1`) because its value is not equal to the target:

![Image represents a visual depiction of a binary search algorithm's step.  Three labeled boxes, 'left,' 'mid,' and 'right,' point downwards to respective indices within a numbered array [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11].  The array's indices are shown below the numbers, ranging from 0 to 12.  'left' points to index 0 (value 1), 'mid' points to index 2 (value 3), highlighted in light green, and 'right' points to index 5 (value 4).  A dashed box at the bottom displays the condition `nums[mid] < 4`, which evaluates to true because 3 < 4.  An arrow indicates this condition leads to the assignment `left = mid + 1`, updating the 'left' index to 3 (the next index after 'mid').  The visual emphasizes the iterative process of narrowing down the search space within the array based on the comparison of the middle element with the target value (implicitly 4).](/assets/images/dsa/binarysearch/96de7dbfd8188ccc.webp)

![Image represents a visual depiction of a data structure or algorithm, possibly illustrating array manipulation or pointer movement.  A numbered horizontal line, representing an array or sequence from index 0 to 11, is shown.  Two rectangular boxes labeled 'left' (orange) and 'right' (gray) are positioned above the line.  A light-green circle containing the number '4' sits on the line at index 3.  A dashed orange arrow originates from the 'left' box and points to the circle at index 3, indicating a potential left-side operation or pointer. A solid gray arrow descends from the 'right' box to the number '4' at index 4, suggesting a right-side operation or pointer.  The numbers '4' at indices 3 and 4 are emphasized, possibly highlighting the current focus or manipulation within the array. The remaining numbers on the line (1-3, 5-11) are light gray, suggesting they are not the current focus of the operation.  The bottom row of numbers (0-12) acts as a secondary index for the array, clarifying the position of each element.](/assets/images/dsa/binarysearch/118fb4bbc6476972.webp)

Midpoint value is equal to the target Now is when things get interesting. When the midpoint value is equal to the target, there are two possibilities:

1. This is the lower bound of the target value.
2. This is not the lower bound, so the lower bound is somewhere further to the left.

We don’t know which possibility is true at the moment, so we should narrow the search space toward the left to continue looking for the lower bound, while also including the midpoint itself in the search space (i.e., `right = mid`).

![Image represents a visual depiction of a binary search algorithm step.  At the top, three rectangular boxes labeled 'left,' 'mid' (highlighted in light blue), and 'right' indicate index pointers. Arrows descend from each box, pointing to a numbered sequence [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11] displayed below.  The numbers are positioned above their corresponding indices (0-12) shown in a lighter gray. The 'mid' pointer points to the value '4' at index 4.  A light green circle highlights the '4' at index 3, visually representing the 'left' pointer's position.  The 'right' pointer also points to a '4' at index 5. At the bottom, a dashed-line box displays the code snippet 'nums[mid] == 4 → right = mid,' illustrating the algorithm's logic: if the value at the middle index ('nums[mid]') equals the target value (4), then the 'right' pointer is updated to the 'mid' index. This signifies that the search space has been narrowed down.](/assets/images/dsa/binarysearch/52beafef90fdfe27.webp)

![Image represents a visual depiction of a data structure or algorithm, possibly related to array manipulation or pointer movement.  A numbered horizontal line, representing an array or sequence from index 0 to 11, is shown.  Two rectangular boxes labeled 'left' (in gray) and 'right' (in orange) are positioned above the line. A downward arrow from 'left' points to a light green circle containing the number '4' at index 3 on the horizontal line. A downward arrow from 'right' points to the number '4' at index 4 on the horizontal line. A dashed orange arrow connects the number '4' at index 4 to the number '4' at index 3, suggesting a possible iterative or comparative operation between these two elements.  The numbers below the horizontal line represent the indices of the array, while the numbers above represent the values at those indices. The overall diagram illustrates a concept where two pointers, 'left' and 'right,' are positioned at specific indices within a data structure, potentially for searching, sorting, or other operations.](/assets/images/dsa/binarysearch/8e6358b7bcc768d7.webp)

Continue this reasoning for the next midpoint as it’s also equal to the target:

![Image represents a visual depiction of a binary search algorithm step.  A numbered array [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11] is shown with indices displayed below.  Three labeled boxes, 'left,' 'mid,' and 'right,' represent pointers to array elements.  A light-green circle highlights the element at index 3, which is the value 4, indicating the current 'mid' point.  Arrows point from 'left' and 'right' to the 'mid' element, showing how these pointers converge.  Below the array, a code snippet 'nums[mid] == 4 → right = mid' illustrates the algorithm's logic:  if the value at the midpoint ('nums[mid]') equals the target value (4), the 'right' pointer is updated to the current 'mid' index, effectively narrowing the search space to the left half of the array for the next iteration.](/assets/images/dsa/binarysearch/12cad53275499a90.webp)

![Image represents a number line ranging from 1 to 11, with a light green circle labeled '4' positioned at the index 3 on the number line.  Above the number line, two rectangular boxes are present; one labeled 'left' in dark gray and the other labeled 'right' in orange. A dark gray arrow points from the 'left' box to the circle '4', indicating a leftward movement or association.  Simultaneously, an orange dashed arrow points from the 'right' box to the circle '4', suggesting a rightward movement or association. The number line itself is marked with numbers from 0 to 12 below and 1 to 11 above, providing a visual context for the position of the circle '4'.  The arrows and labels suggest a concept of directional movement or selection relative to a central point ('4') within a larger numerical context.](/assets/images/dsa/binarysearch/c46a238b06da5210.webp)

The final value, once the left and right pointers meet, is the lower bound of the target.

**Upper-bound binary search** There’s a lot of similarity between this and lower-bound binary search. For starters, the search space is identical. Additionally, the cases when the midpoint value is greater than or less than the target are handled the same. This makes sense because, in both binary searches, we’re seeking the same target value. So, when the midpoint value is not equal to the target, the actions we take will be the same as the actions taken in the lower-bound binary search.

The difference in logic occurs when the midpoint is equal to the target, as we’re now looking for the **rightmost value of the target,** instead of the leftmost value. As such, let’s just focus on the logic for when the midpoint value is equal to the target.

Midpoint value is equal to the target Similar to lower-bound binary search, there are two possibilities: either this is the upper bound, or it’s not. Again, we’re not sure which is true. So, let’s narrow the search space toward the right to continue looking for an upper bound while including the midpoint in the search space (i.e., `left = mid`):

![Image represents a visual depiction of a binary search algorithm step.  At the top, three rectangular boxes labeled 'left,' 'mid' (highlighted in light blue), and 'right' are shown.  Arrows descend from each box, pointing to elements within a numbered array represented horizontally below. The array, indexed from 0 to 12, contains the numbers [1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 10, 11]. The 'left' arrow points to the number 4 at index 3, the 'mid' arrow points to the number 4 at index 4, and the 'right' arrow points to the number 4 at index 5 (highlighted in light green).  At the bottom, a gray dashed box displays the code snippet 'nums[mid] == 4 -> left = mid,' indicating that because the value at the middle index ('mid') is equal to 4, the 'left' index is updated to equal the 'mid' index. This illustrates a step in the binary search where the target value (4) has been found at the middle index, resulting in an update of the search space.](/assets/images/dsa/binarysearch/fd91b23ac5a4a041.webp)

![Image represents a numbered line ranging from 1 to 11, with a secondary numbering system below indicating positions 0 through 12.  Two rectangular boxes, one orange labeled 'left' and one gray labeled 'right,' are positioned above the line.  A downward-pointing arrow from the 'left' box points to the number 4 on the main line, while a dashed arrow from the 'left' box also points to the number 4. A downward-pointing arrow from the 'right' box points to a light green circle containing the number 4, positioned at the 5th position on the main line.  The arrangement visually depicts two different approaches or methods ('left' and 'right') affecting the placement of the number 4, with the 'left' method potentially indicating a less precise or approximate placement compared to the 'right' method's more precise placement at position 5.](/assets/images/dsa/binarysearch/6485bf38c5b0dcfa.webp)

When we continue this logic for the next midpoint values, we notice something peculiar happen:

![Image represents a numbered horizontal line segment ranging from 0 to 12, with markers indicating each integer value.  Two rectangular boxes labeled 'left' and 'right' are positioned above the line.  Arrows descend from these boxes, pointing to the number '4' on the line.  The 'left' arrow points to a black '4' at position 4 on the line, while the 'right' arrow points to a light green '4' at position 5 on the line.  The numbers on the line are displayed in a lighter gray except for the two '4's, which are prominently displayed in black and light green, respectively, highlighting their significance in relation to the 'left' and 'right' labels.  The entire diagram visually illustrates a concept related to left and right positioning or indexing within a numerical sequence.](/assets/images/dsa/binarysearch/99ad0c27781b8160.webp)

![Image represents a visual depiction of a binary search algorithm step.  At the top, three rectangular boxes labeled 'left,' 'mid,' and 'right' represent index pointers within a sorted numerical array shown below.  The array, depicted as a number line from 0 to 12, contains the numbers 1 through 11.  A light green circle highlights the element at index 4, which holds the value 4.  Light blue arrows point from 'mid' to this highlighted element, indicating that the midpoint of the search is currently at index 4.  Below the array, a dashed box displays the code snippet 'nums[mid] == 4 -> left = mid,' illustrating that because the value at the midpoint (nums[mid]) equals the target value (4), the 'left' pointer is updated to equal the 'mid' pointer. This signifies that the search has successfully found the target value at the midpoint.](/assets/images/dsa/binarysearch/6d4f8c2dbde3eb9f.webp)

![Image represents a visual depiction of a data structure, possibly an array or list, illustrating a coding pattern.  A numbered horizontal line, ranging from 0 to 12, represents the indices of the data structure.  The numbers 1 through 11 are placed above the line, indicating the elements' positions.  Two rectangular boxes labeled 'left' and 'right' are positioned above the line, each pointing downwards with an arrow towards the number 4 at index 4.  A light green circle highlights the number 4 at index 5.  A series of three dots below the number 4 at index 4 suggests a continuation or further elements not explicitly shown. The overall arrangement shows the selection or highlighting of a specific element (4 at index 5) potentially based on the 'left' and 'right' pointers, suggesting a concept like a window or range selection within the data structure.](/assets/images/dsa/binarysearch/803ab05c4ebee3f9.webp)

It looks like we just got **stuck in an infinite loop**, where the position of the left pointer keeps getting set to `mid` when they’re both at the same index. Why does this happen?

Debugging the infinite loop When the left and right pointers are directly next to each other, `mid` ends up being positioned where the left pointer is:

![Image represents a visual depiction of a midpoint calculation.  On the left, two rectangular boxes labeled 'left' and 'right' are shown, each pointing downwards with an arrow to a separate bracket representing an array or list. A thick black arrow points from these brackets to another set of brackets on the right. Above this arrow, the formula `mid = (left + right) // 2` is displayed in light blue, indicating that the midpoint (`mid`) is calculated by summing the values of 'left' and 'right', then performing integer division by 2. On the right side, three boxes are shown: 'left', a light blue box labeled 'mid', and 'right'. Arrows from 'left', 'mid', and 'right' point downwards to the brackets, illustrating that the midpoint calculation results in the addition of a 'mid' value between the 'left' and 'right' values within the array or list.  The overall diagram illustrates a step in a binary search or similar algorithm where the midpoint is calculated to efficiently search a sorted data structure.](/assets/images/dsa/binarysearch/ae7df42093feab57.webp)

Since one of our operations is `left = mid`, we get stuck in an infinite loop where `left` and `mid` are continuously set to each other’s positions, which means progress cannot be made. The reason this wasn’t a problem during lower-bound binary search was that we never had `left = mid` as an operation in the logic. One way to avoid this issue is by **biasing the midpoint to the right**.

When the midpoint is biased to the right, we avoid an infinite loop during upper-bound binary search.

- We no longer need to worry about the left pointer since mid is now being positioned at the right pointer when the search space has two elements.
- We won’t encounter any infinite loops with the right pointer because it never gets set to the midpoint’s position, as we use right = mid - 1 .

A right bias of the midpoint can be achieved using `mid = (left + right) // 2`**+ 1**:

![Image represents a visual depiction of a midpoint calculation within a coding pattern, likely related to binary search or similar algorithms.  The diagram shows two stages. The initial stage displays two rectangular boxes labeled 'left' and 'right' in grey, each pointing downwards via an arrow to a single dot within square brackets, representing an array or list.  A thick black arrow connects this initial stage to a second stage.  The arrow is labeled with the calculation `mid = (left + right) // 2 + 1` in cyan, indicating that the midpoint (`mid`) is computed by adding the values of 'left' and 'right', performing integer division by 2 (using the `//` operator), and then adding 1. The second stage shows three boxes: 'left' and 'right' (in grey) and a cyan box labeled 'mid'. Arrows point from 'left', 'mid', and 'right' to individual dots within square brackets, suggesting that the midpoint calculation has partitioned the original array or list.  The overall diagram illustrates how the midpoint is calculated and used to divide a data structure into sub-parts.](/assets/images/dsa/binarysearch/7dcd21c2abba84da.webp)

Now, performing `left = mid` allows us to properly narrow the search space.

As a general rule, in upper-bound binary search, we should bias `mid` to the right.

Let’s apply this change to the same example and see what happens:

![Image represents a visual depiction of a step within a binary search algorithm.  At the top, three rectangular boxes labeled 'left,' 'mid' (highlighted in light blue), and 'right' are shown. Arrows descend from each box, pointing to elements within a numbered array visualized horizontally below. The array contains the numbers 1 through 11, with indices displayed below. The 'left' arrow points to the number 4 at index 3, the 'mid' arrow points to the number 4 at index 4, and the 'right' arrow points to the number 4 at index 5 (highlighted in light green).  At the bottom, a dashed-line box displays the code snippet 'nums[mid] == 4 → left = mid,' indicating that because the value at the middle index ('mid') of the array is equal to 4, the 'left' index is updated to be equal to the 'mid' index. This illustrates a key step in the binary search where the search space is narrowed based on the comparison of the middle element with the target value.](/assets/images/dsa/binarysearch/07c04426da7d977a.webp)

![Image represents a visual depiction of a step within a binary search algorithm.  A numbered array, indexed from 0 to 12, is shown with values implicitly represented by their index positions.  The array segment from index 0 to 12 is displayed.  Three labeled boxes, 'left' (orange), 'mid' (cyan), and 'right' (gray), represent index pointers.  Arrows indicate that 'left' and 'right' initially point to indices 3 and 5 respectively, while 'mid' points to index 4.  A light green circle highlights the element at index 4, which has a value of 4. A dashed orange arrow shows a tentative movement of the 'left' pointer. A solid cyan arrow shows the movement of the 'mid' pointer. A separate box displays the condition `nums[mid] == 4 -> left = mid`, indicating that because the element at the midpoint (index 4) equals 4, the 'left' pointer is updated to the value of the 'mid' pointer (index 4).  This illustrates a step where the target value is found at the midpoint, resulting in the update of the 'left' pointer.](/assets/images/dsa/binarysearch/bc390f39deff9292.webp)

![Image represents a number line ranging from 1 to 11, with a lighter gray scale used for the numbers and a darker gray line connecting them.  Below the number line, a fainter gray scale shows the corresponding numerical values from 0 to 12, acting as a reference scale.  A light green circle labeled '4' is positioned at the 4.5 mark on the number line. Two rectangular boxes, one orange labeled 'left' and one gray labeled 'right,' are positioned above the number line.  A dark orange arrow points from the 'left' box to the circle, and a dark gray arrow points from the 'right' box to the circle. A dashed orange line curves from the number '4' on the number line to the green circle, suggesting an association or movement towards the circle from the left.  The overall arrangement visually depicts a concept related to directional movement or selection on a numerical scale, possibly illustrating a binary search or similar algorithm.](/assets/images/dsa/binarysearch/070356afe8c986a4.webp)

As we can see, we’ve avoided an infinite loop, with the left and right pointers meeting at the upper bound of the target.

**If the target doesn’t exist** The last step in both algorithms is to check that the final values located are equal to the target. If the target does not exist in the array, the final values in both binary search algorithms won’t be equal to the target. In this case, we should return -1.

## Implementation

```python
from typing import List
    
def first_and_last_occurrences_of_a_number(nums: List[int], target: int) -> List[int]:
    lower_bound = lower_bound_binary_search(nums, target)
    upper_bound = upper_bound_binary_search(nums, target)
    return [lower_bound, upper_bound]
    
def lower_bound_binary_search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > target:
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left if nums and nums[left] == target else -1
    
def upper_bound_binary_search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left < right:
        # In upper-bound binary search, bias the midpoint to the right.
        mid = (left + right) // 2 + 1
        if nums[mid] > target:
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            left = mid
    # If the target doesn’t exist in the array, then it's possible that
    # 'left = mid + 1' places the left pointer outside the array when `mid == n - 1`.
    # So, we use the right pointer in the return statement instead.
    return right if nums and nums[right] == target else -1
```

## Complexity Analysis

**Time complexity:** The time complexity of both the `lower_bound_binary_search` and `upper_bound_binary_search` helper functions is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )), where n n n is the length of the input array. This is because each function performs a binary search over the entire array. Therefore, `first_and_last_occurrences_of_a_number` is also O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) because it calls each helper function once.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

## Interview Tip

*Tip: Always test your algorithm.* Binary search can be a tricky algorithm to implement. The best way to uncover unexpected errors is to test your code. The infinite loop encountered during the upper-bound binary search problem is quite easy to miss while designing the algorithm. If you're unable to recognize this issue during implementation, manual testing can help reveal it. In binary search, an infinite loop can be uncovered when testing a search space that contains just two elements, similar to what we did in the explanation.
