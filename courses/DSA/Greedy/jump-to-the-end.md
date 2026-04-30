---
title: "Jump To The End"
course: "DSA"
topic: "Greedy"
source: "/home/ayush/OOD-Design-Principles/DSA/Greedy/Jump to the End.html"
---
You are given an integer array in which you're originally positioned at index 0. Each number in the array represents the **maximum jump distance** from the current index. Determine if it's possible to reach the end of the array.

#### Example 1:

![Image represents a sequence of numbers, [3, 2, 0, 2, 5], depicted within square brackets.  A green curved arrow originates from the number 3 at the beginning of the sequence and points to the number 2 near the middle.  Another smaller green curved arrow originates from the same initial 2 and points to the number 5 at the end of the sequence. These arrows suggest a connection or flow of information, possibly indicating a relationship or operation between the numbers 3 and 2, and separately between the number 2 and 5. The arrangement implies a linear data structure, possibly an array or list, with the arrows highlighting specific elements and their interactions within the context of a coding pattern, likely illustrating a selection or traversal process.](/assets/images/dsa/greedy/053230444feaa8d9.webp)

```python
Input: nums = [3, 2, 0, 2, 5]
Output: True
```

#### Example 2:

![Image represents two diagrams illustrating different scenarios of data flow or program execution. Each diagram shows a sequence of numbers, [2, 1, 0, 3], enclosed in square brackets.  In both diagrams, a grey curved arrow points from the '0' to the text 'dead end,' indicating a termination point or a path that doesn't continue further.  The key difference lies in the red arrows. In the first diagram, a single red curved arrow points from the '2' to the '0', suggesting a direct transition or flow from '2' to '0'. In the second diagram, two red curved arrows originate from the '2', one pointing to the '1' and the other to the '0', illustrating a branching or conditional flow where '2' can lead to either '1' or '0' before potentially reaching the 'dead end'.  The diagrams likely depict different control flows or execution paths within a program, possibly highlighting the concept of a single path versus multiple paths, or a decision point in the algorithm.](/assets/images/dsa/greedy/111941abc0ddb9f7.webp)

```python
Input: nums = [2, 1, 0, 3]
Output: False
```

#### Constraints:

- There is at least one element in `nums`.
- All integers in `nums` are non-negative integers.

## Intuition

From any index `i` in the array, we can jump up to `nums[i]` positions to the right. This means the furthest index we can reach from any given index `i`, is **i + nums[i]**:

![Image represents a visual explanation of array traversal.  A small square labeled 'i' points downwards with an arrow to an array `[3, 2, 0, 2, 5]`.  Beneath the array, indices 0 through 4 are displayed.  A curved orange arrow originates from the element at index 1 (value 2) and points to the element at index 3 (value 2). This arrow illustrates a jump in the array. The text below the array explains that this jump represents the 'furthest index we can jump to from i = i + nums[i]', indicating that the value at index `i` (in this case, 2) is added to `i` to determine the next index to visit.  The formula `i + nums[i]` shows how the jump is calculated.](/assets/images/dsa/greedy/a6abdf5922b09e29.webp)

If the array consisted entirely of positive numbers, jumping from index 0 to the last index would be straightforward, as there would always be a way to progress forward toward the last index. The challenge arises when we encounter a 0 in the array, as a 0 is effectively a dead end, since landing on it disallows any further movement.

Consider the example below:

![Image represents a two-row array of numbers. The top row, enclosed in square brackets `[ ]`, displays the numbers 3, 2, 0, 2, and 5 in bold, black font, representing the main data set.  Below this, a second row shows the indices 0, 1, 2, 3, and 4 in a lighter gray font, indicating the position or index of each corresponding element in the top row.  The arrangement is linear, with each number in the top row directly above its corresponding index in the bottom row. No explicit connections or information flow is depicted beyond the implied positional relationship between the top and bottom rows.](/assets/images/dsa/greedy/5ac2c6a84997f325.webp)

Let’s think about this problem backward. Our destination is the last index, index 4, but let’s say we’ve already made it there. How did we reach this index? In this example, it’s possible to make it to index 4 from index 3:

![The image represents a visual depiction of an array or list data structure.  The main component is a numerical array `[3, 2, 0, 2, 5]` displayed horizontally.  Beneath each element of the array, its index is shown in gray: 0, 1, 2, 3, and 4 respectively.  A small, light peach-colored circle containing the number '4' is positioned below the last element, visually highlighting the array's length or the index of the last element.  A curved orange arrow originates from above the element '2' at index 3 and points to the element '5' at index 4, indicating a potential operation or data flow between these two specific elements within the array.  This arrow likely represents an action or modification performed on the array, possibly involving the element at index 3 affecting the element at index 4.](/assets/images/dsa/greedy/20c4895978d4a6eb.webp)

This means that if we find a way to reach index 3, we know for sure we can make it to index 4. The key observation here is that **if we can reach the last index from any earlier index, this earlier index becomes our new destination**.

With this in mind, let’s go through this example in full, starting with the last index as our initial destination:

![Image represents a visual depiction of accessing an element within an array.  A square box containing an 'i' symbol points downwards to an array represented as `[3 2 0 2 5]`, with indices 0 through 4 displayed below each element.  A small orange circle highlights the element at index 4, labeled 'destination' in orange text below.  A separate, light-grey, dashed-line box to the right displays 'destination = 4', indicating that the value at the designated index (4) within the array is 5.  The arrow from the 'i' symbol suggests an instruction or pointer to locate the element at the specified index, which is then retrieved and displayed as the value of the 'destination' variable.](/assets/images/dsa/greedy/3f9a78c1a118e898.webp)

To find earlier indexes that can reach the destination, let’s move backward through the array, starting at index 3. As we do this for each index, we check if we can reach the current destination from this index. If we can, this index becomes the new destination. We do this by checking if it's possible to jump to the destination from this index:

`if i + nums[i] ≥ destination`, we can jump to destination from index `i`.

![Image represents a visual depiction of an algorithm's step, likely within a larger coding pattern example.  A numerical array `[3, 2, 0, 2, 5]` is shown, with indices 0 through 4 displayed below each element.  A black square labeled 'i' points via a downward arrow to the element '2' at index 3, indicating a current iteration. A dashed orange line then arcs from this '2' to the element '5' at index 4.  A separate orange circle labeled '4' (presumably representing the index) is connected by a solid orange line to the word 'destination' written in orange text.  A light gray box to the right details the calculation: `i + nums[i] = 3 + 2 = 5 ≥ destination`, concluding with `destination = i = 3`. This suggests that the algorithm is comparing the sum of the current index (i=3) and the element at that index (nums[i]=2) to a 'destination' value, and updating the 'destination' variable based on the comparison.  The overall diagram illustrates a step-by-step process of array traversal and conditional logic, possibly part of a search or comparison algorithm.](/assets/images/dsa/greedy/afbd9ea8f31746ca.webp)

![Image represents a visual depiction of an array and an index.  The top row shows an array represented by `[3 2 0 2 5]`, enclosed in square brackets, with each number representing an element.  Below this, a second row displays indices `0 1 2 3 4` in grey, indicating the position of each element in the array.  A circled '3' in orange is positioned below the array, connected by a vertical orange line to the word 'destination' written in orange below it. This visually highlights that the index '3' points to the element at that position within the array, which is the '2' in the top row.  The greyed-out elements and indices suggest a focus on the element at index 3, making it the 'destination' of the visual representation.](/assets/images/dsa/greedy/7cbb71747345b5ba.webp)

With the destination at index 3, let’s continue moving backward through the array.

Now, we’re at index 2. Below, we see we cannot reach the destination from index 2, so the destination is not updated.

![Image represents a visual explanation of a coding scenario, likely involving array traversal.  A square box labeled 'i' points downwards to an array `[3, 2, 0, 2, 5]` with indices 0 through 4 displayed below each element.  A circled '3' highlights the element '2' at index 3, labeled 'destination' in orange text below.  A dashed-line box to the right shows a calculation: `i + nums[i] = 2 + 0`, indicating that `i` is 2 (the index of the current element being examined).  The next line shows `= 2 < destination`, comparing the result of the calculation (2) to the destination value (also 2). The final line, 'cannot reach current destination,' indicates that the condition `2 < destination` is false, implying the algorithm's inability to reach the target index based on the current logic.  The overall diagram illustrates a step in an algorithm where the current index `i` and the value at that index in the `nums` array are used to determine if a destination index can be reached, and in this case, it cannot.](/assets/images/dsa/greedy/c3f48103d7a29854.webp)

Continue with this logic for the remaining numbers in the array:

![Image represents a visual depiction of an iterative process, likely within a loop in a program.  A numbered array `[3, 2, 0, 2, 5]` is shown, with indices 0 through 4 displayed below each element.  A square box labeled 'i' points downwards with a solid arrow to the element '2' at index 1, indicating the current iteration's index. A dashed orange arrow arcs from this '2' to the element '2' at index 3, suggesting a potential search or comparison.  A circled '3' below the second '2' is labeled 'destination', indicating a target value or position. A separate light gray box details the calculation: `i + nums[i] = 1 + 2 = 3 ≥ destination`, implying a comparison between the calculated sum (3) and the 'destination' value. The final line in the gray box, `destination = i = 1`, shows the result of the comparison, assigning the value of 'i' (1) to 'destination'.  The overall diagram illustrates a step in an algorithm where an index 'i' is used to access and process elements in an array, potentially searching for a specific value or condition.](/assets/images/dsa/greedy/706a4d83005d3ade.webp)

![Image represents a visual depiction of a coding pattern, likely illustrating an algorithm's step.  A square box labeled 'i' points downwards with an arrow to a bracketed array `[3, 2, 0, 2, 5]`, indicating an index 'i' is being used to access elements within the array.  A dashed orange arrow curves from the element '3' (at index 0) to the element '2' (at index 1), suggesting a potential iteration or comparison.  Below the array, a circled '1' labeled 'destination' is connected to the array via a solid orange line, implying a variable 'destination' is being assigned a value from the array.  To the right, a grey box details the algorithm's logic: `i + nums[i] = 0 + 3`, `= 3 ≥ destination`, and `destination = i = 0`. This shows a calculation where the value at index 'i' (initially 0) is added to 'i', the result is compared to 'destination', and 'destination' and 'i' are updated based on the comparison.  The overall diagram illustrates a step-by-step process of accessing and manipulating array elements based on a condition involving an index and a destination variable.](/assets/images/dsa/greedy/53f3263e941f2ef3.webp)

![The image represents a visual depiction of a data structure, possibly illustrating a concept within graph theory or routing algorithms.  At the top, a bracketed sequence `[3 2 0 2 5]` is displayed, potentially representing a list of values or weights. Below this, a second row shows a sequence of numbers `1 2 3 4`, seemingly representing indices or positions.  A prominent orange circle containing a '0' is positioned to the left of the second row, labeled 'destination' in orange text below it, suggesting this '0' represents a target node or destination index. A vertical orange line connects this circled '0' to the second row, visually indicating a connection or association between the destination and the row of indices. The numbers in the top row appear to be associated with the numbers in the second row, possibly representing data associated with each index, with some values (0 and 2) appearing in both rows, suggesting a relationship or mapping between the two sequences. The greyed-out numbers in the top and second rows might indicate inactive or irrelevant data points within the context of the illustrated concept.](/assets/images/dsa/greedy/338eac1f4d8de66a.webp)

Finally, we see that once we’ve finished iterating through each index, the destination is set to index 0. This means we've successfully found a way to jump to the end from index 0.

Therefore, we **return true when destination == 0**. Otherwise, we cannot reach the destination from index 0, so we return false.

An interesting aspect of this approach is that as soon as we find an index `i` from where we can reach the destination, we update the destination to that index and assume that this is the correct decision:

![Image represents a visual depiction of a coding pattern, likely illustrating a data manipulation or algorithm.  The image shows two arrays of integers:  `[9 6 7 0 4 2 0 5]` and `[9 6 7 0 4 2 0 5]`.  Each element in the arrays is labeled with its index (0-7) below it in gray.  A small square labeled 'i' is shown above each array, indicating an iterator or index pointer.  A downward arrow from each 'i' points to the element at index 5 in the respective array (the number 2).  A curved, light-blue arrow connects the number 2 in the first array to the number 5 in the same array, suggesting a movement or operation involving these elements.  Below the number 5 in each array, an orange circle labeled 'destination' is connected to the number 5 with a vertical orange line, highlighting the destination of the operation.  A gray arrow points from the first array to the second, implying a transformation or result of the operation. The overall diagram suggests a process where an element at a specific index is identified and potentially moved or modified, resulting in a change in the array's structure.](/assets/images/dsa/greedy/36402573e718d9b1.webp)

The thing is, there can sometimes be multiple indexes which can reach the destination. So, how do we know that choosing the first valid index we encounter from the right is the best choice?

![Image represents a visual depiction of data flowing into a single destination point.  A horizontal array displays the numbers [9, 6, 7, 0, 4, 2, 0, 5], each number positioned above its index (0 through 7).  Curved, light-blue arrows emanate from each of these numbers, converging at a single point labeled 'destination' in orange text, which is also numerically indicated by a circled '7' below the array.  The arrows visually represent the flow of data from each element in the array to the final destination, suggesting a process of aggregation or accumulation where multiple data points contribute to a single result.](/assets/images/dsa/greedy/d53d44392afc53f7.webp)

The key to understanding why is realizing that **all the other indexes which can reach the destination can also reach this first valid index**:

![Image represents a visual depiction of data flow or a transformation process.  The image shows a sequence of numbers [9, 6, 7, 0, 4, 2, 0, 5] arranged horizontally, with each number positioned above an index (0-7).  Four bright cyan curved arrows originate from the numbers 9, 6, 7, and 0, respectively, all converging onto the number 2.  A lighter gray curved arrow connects the number 0 to the number 5.  A small orange circle labeled '5' is positioned below the number 2 and is labeled 'destination' in orange text, suggesting that the number 2 is the target or result of the data flow represented by the cyan arrows. The overall structure suggests a process where multiple data points (9, 6, 7, and 0) contribute to or are processed to produce a final result (2), with an additional, separate process indicated by the gray arrow.](/assets/images/dsa/greedy/6da66c88bfb8e499.webp)

Therefore, by choosing the first valid index, we effectively simplify our problem without missing any potential solutions.

This is indicative of a **greedy solution**; since the greedy choice property is satisfied, we make the best immediate choice at each step as we move backward through the array (local optimums), hoping it leads to the overall solution (global optimum).

## Implementation

```python
from typing import List
    
def jump_to_the_end(nums: List[int]) -> bool:
    # Set the initial destination to the last index in the array.
    destination = len(nums) - 1
    # Traverse the array in reverse to see if the destination can be reached by
    # earlier indexes.
    for i in range(len(nums) - 1, -1, -1):
        # If we can reach the destination from the current index, set this index as
        # the new destination.
        if i + nums[i] >= destination:
            destination = i
    # If the destination is index 0, we can jump to the end from index 0.
    return destination == 0
```

### Complexity Analysis

**Time complexity:** The time complexity of `jump_to_the_end` is O ( n ) O(n) O ( n ), where n n n denotes the length of the array. This is because we iterate through each element of `nums` in reverse order.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
