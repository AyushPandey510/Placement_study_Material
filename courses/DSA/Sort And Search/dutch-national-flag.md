---
title: "Dutch National Flag"
course: "DSA"
topic: "Sort And Search"
source: "/home/ayush/OOD-Design-Principles/DSA/Sort And Search/Dutch National Flag.html"
---
Given an array of 0s, 1s, and 2s representing red, white, and blue, respectively, sort the array in place so that it resembles the Dutch national flag, with all **reds** (0s) coming first, followed by **whites** (1s), and finally **blues** (2s).

#### Example:

```python
Input: nums = [0, 1, 2, 0, 1, 2, 0]
Output: [0, 0, 0, 1, 1, 2, 2]
```

## Intuition

This problem is just asking us to sort three numbers in ascending order. A straightforward solution would be to use an in-built sorting function. However, this is an O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) approach, where n n n denotes the length of the array. However, this isn’t taking advantage of an important problem constraint: there are only three types of elements in the array.

To sort these numbers, we essentially want to position all 0s to the left, all 2s to the right, and any 1s in between. A key observation is that if we place the 0s and the 2s in their correct positions, the 1s will automatically be positioned correctly:

![Image represents a visual explanation of a sorting algorithm, specifically illustrating how elements naturally group during the process.  The diagram shows an unsorted array `[2 0 1 2 0 0 1]` where numbers 0 are colored red, 1s are black, and 2s are cyan. A thick black arrow points to a sorted array `[0 0 0 1 1 2 2]`.  Underneath the sorted array, red and cyan horizontal brackets highlight the groups of 0s and 2s respectively, labeled 'sort 0s' and 'sort 2s' in their respective colors. Above the sorted array, a black bracket highlights the group of 1s, with the text '1s will naturally get sorted' explaining their position. The overall arrangement demonstrates how, without explicit sorting of 1s, the algorithm implicitly places them in their correct sorted position between the 0s and 2s.](/assets/images/dsa/sort-and-search/e15ce304cc4c0aa8.webp)

This allows us to focus on only positioning two numbers.

One strategy we could use is to iterate through the array and move any 0s we encounter to the left, and any 2s we encounter to the right.

We can set a left pointer to move any 0s we encounter to the left, and a right pointer to move any 2s to the right. To iterate through the array, we can use a separate pointer, `i`:

- When we encounter a 0 at index i , swap it with nums[left] .
- When we encounter a 2 at index i , swap it with nums[right] .

To understand how we should adjust these pointers after each swap, let’s use the following example:

![Image represents a one-dimensional array or list depicted using square brackets `[]`.  The array contains seven integer elements: 2, 0, 1, 2, 0, 0, and 1. These elements are displayed in bold, black font and are arranged sequentially within the brackets. Below the array, a sequence of numbers from 0 to 6 is shown in a lighter gray font; these numbers represent the indices of the corresponding elements in the array, starting from index 0 for the first element (2) and ending at index 6 for the last element (1).  There is no explicit information flow or connections between the elements other than their sequential arrangement within the array structure indicated by the brackets and the implicit index mapping provided by the numbers below.](/assets/images/dsa/sort-and-search/f6ac591df49b3aae.webp)

The first element is 2, so let’s swap it with `nums[right]`. Then, let’s move the right pointer inward so it points to where the next 2 should be placed:

![Image represents a visual depiction of a sorting algorithm's step, likely part of a quicksort or similar algorithm.  Two labeled boxes, 'left' and 'i' (likely representing an index), point downward with arrows to an array `[2 0 1 2 0 0 1]`, indicating that the algorithm is focusing on the element at index `i` (which is 2 in this case).  A separate box labeled 'right' points to the last element of the array (1). A dashed-bordered box to the right details the algorithm's logic:  `nums[i] == 2` shows the value at index `i`; `→ swap(nums[i], nums[right])` indicates that the algorithm will swap the element at index `i` (value 2) with the element at the 'right' index (value 1); and `→ right--` shows that the 'right' index will be decremented after the swap.  The numbered indices beneath the array clarify the positions of each element within the array.  The overall diagram illustrates a single iteration of a sorting algorithm's partitioning step, focusing on the comparison and potential swap of elements based on their values relative to a pivot (implicitly defined by the 'right' index).](/assets/images/dsa/sort-and-search/8946e8e8af5c206c.webp)

![Image represents a visual depiction of a sorting algorithm, likely a variation of quicksort or similar, showing a single swap operation.  A numerical array `[1 0 1 2 0 0 2]` is displayed, with indices 0 through 6 shown below each element.  Two rectangular boxes labeled 'left' (in gray) and 'right' (in light blue) point downwards with arrows to the array's first and last elements, respectively.  A smaller gray box labeled 'i' is positioned near the 'left' box, suggesting an index or pointer.  A curved, light-blue arrow labeled 'swapped' connects the first and last elements (1 and 2), indicating that these elements have been exchanged during the sorting process.  The arrows from 'left' and 'right' highlight the elements selected for comparison and subsequent swapping.](/assets/images/dsa/sort-and-search/b43417babc96906b.webp)

![Image represents a visual depiction of a two-pointer approach to array manipulation.  Two labeled boxes, 'left' (gray) and 'right' (light blue), point downwards towards an array `[1 0 1 2 0 0 2]`.  The array's indices are displayed below it, ranging from 0 to 6. The 'left' pointer initially targets the first element (index 0), while the 'right' pointer points to the last element (index 6).  A small, dark gray box labeled 'i' is positioned next to the 'left' box, suggesting an index variable.  A dashed, light blue arrow from the 'right' pointer indicates that it might move leftward during the algorithm's execution.  The downward arrows from 'left' and 'right' visually represent the pointers' initial positions within the array. The overall diagram illustrates the starting configuration of a common algorithm that likely involves processing the array from both ends, possibly for sorting, searching, or other operations requiring bidirectional traversal.](/assets/images/dsa/sort-and-search/d47df737ed25db35.webp)

Notice that after this swap, there’s now a new element at index `i`. So, we should not yet advance `i`, as we still need to decide whether this new element needs to be positioned elsewhere.

The pointer `i` is now pointing at a 1. We don’t need to handle any 1s we encounter, so let’s just advance the `i` pointer:

![Image represents a visual depiction of a code snippet likely involving array traversal and conditional logic.  The diagram shows a numerical array `[1 0 1 2 0 0 2]` with indices displayed below each element (0 through 6).  A rectangular box labeled 'left' points to the array's first element (at index 0), and another box labeled 'i' (likely representing an index variable) points to the same element.  A downward-pointing arrow from 'i' indicates that the variable `i` is currently pointing to the first element of the array.  A separate box labeled 'right' points to the array's element at index 5. A dashed-line box to the right describes a conditional statement: `nums[i] == 1`, which checks if the element at the index `i` is equal to 1.  If this condition is true, an action `i++` (incrementing the index `i`) is performed, implying that the code iterates through the array, checking each element for the value 1 and moving to the next element if found.](/assets/images/dsa/sort-and-search/906936cfbab18f06.webp)

![Image represents a visual depiction of a two-pointer approach to array traversal.  A numerical array `[1, 0, 1, 2, 0, 0, 2]` is shown, with each element's index displayed below it (0 through 6).  Two rectangular boxes labeled 'left' and 'right' point downwards, indicating pointers to the array's beginning and end, respectively. A square box labeled 'i' points downwards to the second element (value 0) of the array. A dashed arrow connects the 'left' pointer (pointing to the first element, value 1) to the 'i' pointer, suggesting an interaction or comparison between these two elements. The 'right' pointer points to the second-to-last element (value 0). The arrangement visually demonstrates the concept of using two pointers, 'left' and 'right,' to traverse and potentially manipulate an array, with the 'i' pointer possibly representing an intermediate index or a point of comparison within the array.  The grayscale variation in the array's element indices suggests a possible focus on a specific sub-section of the array during the traversal.](/assets/images/dsa/sort-and-search/756349cb91b0aad2.webp)

Now, pointer `i` is pointing at a 0, so let’s swap it with `nums[left]`:

![Image represents a visual depiction of a step within a sorting algorithm, likely a variation of quicksort.  The top shows two labeled boxes, 'left' (in red) and 'i' (in black), pointing down with arrows to the array `[1 0 1 2 0 0 2]`.  The 'left' arrow points to the element '1' at index 0, and the 'i' arrow points to the element '0' at index 1.  A third box labeled 'right' (in grey) points to the element '0' at index 4.  A dashed-line box to the right contains a conditional statement 'nums[i] == 0' followed by an action '→ swap(nums[i], nums[left])'. This indicates that if the element at index `i` (which is 0) is equal to 0, then the algorithm swaps the values at indices `i` and `left`.  The indices are shown below the array elements for reference.  The diagram illustrates a single iteration where the algorithm checks a specific element and performs a swap based on a condition.](/assets/images/dsa/sort-and-search/c4904b69eff3af51.webp)

![Image represents a visual depiction of a sorting algorithm, likely a variation of quicksort or similar, showing a single swap operation.  A red box labeled 'left' points down to the first element (0) of an array [0, 1, 1, 2, 0, 0, 2]. A gray box labeled 'i' points down to the second element (1) of the same array.  Below the array, index numbers (0, 1, 2, 3, 4, 5, 6) are shown for reference. A red curved arrow labeled 'swapped' indicates that the elements at indices 0 and 1 have been exchanged. A gray box labeled 'right' points down to the array's element at index 4 (the first 0 after the initial elements).  The visual emphasizes the interaction between the 'left' and 'i' pointers during a single swap step within a larger sorting process, highlighting the movement and exchange of elements based on their values and the pointers' positions.](/assets/images/dsa/sort-and-search/1f20865b3395b73c.webp)

After this swap, there’s a new element at index `i`. Since `i` is positioned after the left pointer, this element can only be a 1 for the following reasons:

- Before the swap, all 0s originally to the left of i would have already been positioned to the left of the left index.
- Before the swap, all 2s originally to the left of i would have already been positioned to the right of the right index.

Therefore, we can also advance the `i` pointer while advancing the `left` pointer.

![Image represents a visual depiction of a coding pattern, likely illustrating array manipulation.  The diagram shows a numerical array `[0 1 1 2 0 0 2]` with indices displayed below (0 to 6).  Above the array, two labeled boxes, 'left' (in red) and 'i' (in gray), point downwards with arrows to the array's elements at indices 0 and 1 respectively.  Another labeled box, 'right' (in gray), points to the element at index 5.  To the right, a dashed-line box indicates the resulting actions:  two arrows point to 'left++' and 'i++', suggesting that the variables 'left' and 'i' are incremented after accessing their respective array elements.  The overall pattern suggests an iterative process involving two pointers ('left' and 'i') moving through the array, potentially for comparison or manipulation, with the 'right' pointer possibly indicating a boundary or target.](/assets/images/dsa/sort-and-search/7bce0835cb138a76.webp)

![Image represents a visual depiction of a data structure manipulation, possibly within an algorithm.  A numerical array `[0, 1, 1, 2, 0, 0, 2]` is shown, with each element indexed below (0-6).  Two labeled boxes, 'left' (red) and 'right' (gray), indicate operations on the array. A solid black arrow descends from 'left' to the element '1' at index 1, signifying a direct modification or access. A solid black arrow descends from 'i' (a gray box likely representing an index or iterator) to the element '1' at index 2, indicating another direct modification or access.  A dashed red arrow connects 'left' to the element '0' at index 0, suggesting a potential indirect influence or conditional operation. A solid gray arrow descends from 'right' to the element '0' at index 5, showing a direct modification or access at that location. The overall image illustrates how different parts of an array are accessed and potentially modified from different points of reference ('left' and 'right'), possibly within a sorting or merging algorithm.](/assets/images/dsa/sort-and-search/f3fc9f76457e8e37.webp)

We now know what to do whenever we encounter a 0, 1, or 2. We can continue applying this logic until the pointer `i` surpasses the `right` pointer, indicating all elements have been positioned correctly:

![Image represents a diagram illustrating a coding pattern, possibly related to array traversal or searching.  Three rectangular boxes labeled 'left,' 'right,' and 'i' are positioned above a numerical array represented as `[0 0 0 1 1 2 2]`, with indices 0 through 6 displayed below the array elements.  Arrows descend from 'left,' 'right,' and 'i' pointing to specific elements within the array: 'left' points to '1' at index 3, 'right' points to '1' at index 4, and 'i' points to '2' at index 5.  The array elements at indices 0, 1, and 2 are colored red, suggesting they might be excluded or processed differently. The element at index 4 is colored light blue, suggesting a different state. A separate, dashed-line box to the right displays the condition 'i > right → stop,' indicating that the algorithm terminates when the value of 'i' exceeds the value of 'right'.  The overall diagram depicts a process where two pointers ('left' and 'right') and an index ('i') traverse an array, potentially searching or manipulating its elements based on the condition specified in the final box.](/assets/images/dsa/sort-and-search/da448cb8425bfbd3.webp)

Note that we don’t stop the process when `i == right` because the `i` pointer could still be pointing at a 0, which would need to be swapped.

**Why do we advance both i and left pointers when we encounter a 0?** A question we might have regarding the above process is why we advance the `i` pointer along with the `left` pointer when `nums[i] == 0`.

The reason becomes clear when we consider the following example:

![The image represents a visual depiction of a merge operation, likely within a merge sort algorithm.  Two labeled sources, 'left' (in red) and 'right' (in gray), each point downwards via arrows to an array-like structure.  The 'left' source points to the first element, '0', of the array [0, 1, 2], with the index '0' shown below it.  The 'i' box, in black and white, also points to the same array's first element, suggesting an index or iterator. The 'right' source points to the element '1' in the array [1], with the index '3' shown below it.  The arrays are presented side-by-side, implying that the merge operation combines elements from two sorted sub-arrays ('left' and 'right') into a single sorted array. The arrows visually represent the flow of data from the source arrays into the merged array, illustrating the merging process.](/assets/images/dsa/sort-and-search/4a67d17f85609756.webp)

Here, `nums[i] == 0`, so the first thing we do is swap `nums[i]` and `nums[left]`, which doesn’t change anything in this case since `left` and `i` point to the same element. Now, observe what happens if we only advance the left pointer:

![Image represents a visual depiction of a step in a sorting algorithm, likely a partitioning step within quicksort.  The left side shows an array `[0, 1, 2, 1]` with indices 0, 1, 2, and 3 displayed below.  A red box labeled 'left' points to the element at index 0 (value 0), and a gray box labeled 'i' points to the element at index 1 (value 1).  A red arrow indicates a connection from 'left' to the element at index 0, suggesting a pointer or index variable. A black arrow from 'i' also points to the element at index 1. A gray box labeled 'right' points to the element at index 3 (value 1). The right side shows a pseudocode block describing the algorithm's logic.  It checks if `nums[i]` (the element pointed to by 'i') is equal to 0. If true, it executes `swap(nums[i], nums[left])`, swapping the elements at indices `i` and `left`. Finally, it increments `left` using `left++`, moving the 'left' pointer one position to the right.  The overall diagram illustrates the process of partitioning an array based on a pivot value (likely 0 in this case) by comparing elements and swapping them to place elements smaller than the pivot to the left.](/assets/images/dsa/sort-and-search/3e814c1ebcb39e6a.webp)

![Image represents a visual depiction of an iterative process, likely within a loop in a program.  A gray box labeled 'i' represents a loop counter variable.  A red box labeled 'left' and a gray box labeled 'right' represent index pointers or variables.  Arrows indicate the flow of control.  A downward arrow from 'i' points to the element at index 0 in the array `[0, 1, 2, 1]`. A downward red arrow from 'left' points to the element at index 1. A dashed red arrow connects the element at index 0 to the element at index 1, suggesting a comparison or operation between these elements. A downward gray arrow from 'right' points to the element at index 3.  The array `[0, 1, 2, 1]` is indexed from 0 to 3, shown below the array.  The condition `(i < left)` is displayed, indicating a loop continuation condition where the loop continues as long as the value of `i` is less than the value of `left`.  The overall diagram illustrates a step in an algorithm, possibly a search or sorting algorithm, that involves comparing and manipulating elements within an array using index pointers.](/assets/images/dsa/sort-and-search/e3dbfd38b53d6301.webp)

As we can see, the left pointer will surpass the `i` pointer, which shouldn’t happen since `i` needs to stay between `left` and `right` throughout the algorithm. To avoid this, we advance both the `i` and `left` pointers:

![Image represents a visual depiction of a step in a sorting algorithm, likely a variation of quicksort or similar.  The left side shows an array `[0, 1, 2, 1]` with indices 0, 1, 2, and 3 displayed below.  A red box labeled 'left' points to the element at index 0 (value 0), and a gray box labeled 'i' points to the element at index 0 (value 0) as well. A gray box labeled 'right' points to the element at index 3 (value 1). The right side shows a pseudocode block describing the algorithm's actions.  The first line checks if `nums[i]` (the element at index `i`) is equal to 0. If true, the next line executes `swap(nums[i], nums[left])`, swapping the element at index `i` with the element at index `left`. The following lines increment `left` (`left++`) and `i` (`i++`), moving to the next elements in the array.  The arrows visually connect the code block to the array, illustrating the flow of data and control during the algorithm's execution.  The red arrow from 'left' to the array element 0 highlights the current position of the 'left' pointer.](/assets/images/dsa/sort-and-search/3b77e3f752b18f35.webp)

![Image represents a visual depiction of an array manipulation process, likely within a sorting or searching algorithm.  A numerical array `[0, 1, 2, 1]` is shown, with indices 0, 1, 2, and 3 displayed below each element.  A red box labeled 'left' points with a solid red arrow to the element '1' at index 1, indicating a selection or operation on this element.  A dashed red arrow from 'left' curves to the element '0' at index 0, suggesting a comparison or potential swap. A gray box labeled 'i' points with a solid black arrow to the same element '1' at index 1, possibly representing an iterator or index variable. Finally, a gray box labeled 'right' points with a solid gray arrow to the element '1' at index 3, potentially indicating another element involved in the comparison or operation. The overall diagram illustrates the interaction between different parts of an algorithm, focusing on the element at index 1 and its relationship to other elements within the array, possibly during a left-to-right traversal or comparison.](/assets/images/dsa/sort-and-search/c1c4e08bdb59b624.webp)

## Implementation

```python
from typing import List
    
def dutch_national_flag(nums: List[int]) -> None:
    i, left, right = 0, 0, len(nums) - 1
    while i <= right:
        # Swap 0s with the element at the left pointer.
        if nums[i] == 0:
            nums[i], nums[left] = nums[left], nums[i]
            left += 1
            i += 1
        # Swap 2s with the element at the right pointer.
        elif nums[i] == 2:
            nums[i], nums[right] = nums[right], nums[i]
            right -= 1
        else:
            i += 1
```

### Complexity Analysis

**Time complexity:** The time complexity of `dutch_national_flag` is O ( n ) O(n) O ( n ) because we iterate through each element of `nums` once.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
