---
title: "Local Maxima In Array"
course: "DSA"
topic: "BinarySearch"
source: "/home/ayush/OOD-Design-Principles/DSA/BinarySearch/Local Maxima in Array.html"
---
A local maxima is a value **greater than both its immediate neighbors**. Return any local maxima in an array. You may assume that an element is always considered to be strictly greater than a neighbor that is outside the array.

#### Example:

![Image represents a line graph illustrating the concept of local maxima.  The horizontal axis is labeled 'index' and ranges from 0 to 4. The vertical axis represents a numerical value, ranging from 0 to 4. A black line connects several data points: (0, 1), (1, 4), (2, 3), (3, 2), and (4, 3).  The points (1, 4) and (4, 3) are highlighted with larger, peach-colored circles and labeled 'local maxima' in orange text, indicating that these points represent peaks within their immediate neighboring data points. The graph visually demonstrates how local maxima are identified within a dataset by showing points that are higher than their adjacent points on the line.](/assets/images/dsa/binarysearch/00e973cff8bc563c.webp)

```python
Input: nums = [1, 4, 3, 2, 3]
Output: 1 # index 4 is also acceptable
```

#### Constraints:

- No two adjacent elements in the array are equal.

## Intuition

A naive way to solve this problem is to linearly search for a local maxima by iteratively comparing each value to its neighbors and returning the first local maxima we find. A linear solution isn't terrible, but since we can return *any* maxima, there’s likely a more efficient approach.

The first important thing to notice is that since this is an array with no adjacent duplicates, it will always contain at least one local maxima. If it's not at one of the edges of the array, there'll be at least one somewhere in the middle:

![Image represents a pair of line graphs illustrating the concept of 'local maxima' in a numerical sequence.  Each graph displays a sequence of numbers ('nums') plotted against their index. The left graph shows a decreasing line, starting at (0, 4) and ending at (4, 0), with intermediate points at (1, 3), (2, 2), (3, 1).  The right graph shows an increasing line, starting at (0, 0) and ending at (4, 4), with intermediate points at (1, 1), (2, 2), (3, 3). In both graphs, the point (0,4) on the left graph and (4,4) on the right graph are highlighted with a larger, light-orange circle and labeled 'local maxima' in orange text, indicating that these points represent the highest values within their immediate neighborhood in the respective sequences.  Both graphs share the same axes labels: 'nums' for the y-axis representing the numerical values and 'index' for the x-axis representing the position of each number in the sequence.  The graphs visually demonstrate how a local maximum is identified within a data set by comparing a point to its immediate neighbors.](/assets/images/dsa/binarysearch/fac81262b9f2c9c9.webp)

![Image represents two line graphs juxtaposed side-by-side, both sharing the same axes labels: 'nums' on the vertical axis (ranging from 0 to 4) and 'index' on the horizontal axis (ranging from 0 to 4).  Each graph depicts a line connecting several data points. The left graph shows a line that increases from (0,1) to a peak at (2,3), labeled 'local maxima' in orange text, and then decreases to (4,1). The right graph shows a line that decreases from (0,3), labeled 'local maxima' in orange text, to a minimum at (2,1), and then increases to (4,3), also labeled 'local maxima' in orange text.  Both graphs use black lines to connect the data points, with the local maxima points highlighted with larger, peach-colored circles.  The graphs illustrate the concept of local maxima within a dataset, showing how a point can be a local maximum even if it's not the absolute maximum value across the entire dataset.](/assets/images/dsa/binarysearch/83745bce3f1470ee.webp)

Now, let's say we're at some random index in the array, index `i`. An interesting observation is that if the next number (at index `i + 1`) is greater than the current, there’s definitely a local maxima somewhere to the right of `i`. This is because the two points at index `i` and `i + 1` form an **ascending slope**, and this slope would be heading upwards towards some maxima:

![Image represents a diagram illustrating a condition within a coding pattern, likely related to finding local maxima in an array.  Two orange circles represent array indices 'i' and 'i+1', with downward-pointing orange arrows indicating access to the corresponding array elements `nums[i]` and `nums[i+1]`. A thick black line connects the circle representing 'i' to a black dot representing an intermediate state. A dashed line extends from this dot, suggesting a continuation.  An orange arrow points from 'i+1' to this black dot. The text `nums[i] < nums[i+1]` indicates a comparison between the values at these indices.  A rightward arrow follows this comparison, leading to the text 'local maxima somewhere to the right of i,' implying that if the condition `nums[i] < nums[i+1]` is true, a local maximum is expected to exist at some index greater than 'i'. The overall diagram visually represents the logic flow of checking for an increasing trend in the array to potentially identify a local maximum.](/assets/images/dsa/binarysearch/eb51af4184c50dd9.webp)

The opposite applies if points `i` and `i + 1` form a **descending slope**. This would imply a maxima exists somewhere to the left or at `i`. Notice here that the point at index `i` itself could be a maxima too:

![Image represents a diagram illustrating a condition for identifying local maxima within a numerical sequence represented by the array `nums`.  The diagram features two nodes, one colored orange and the other black, connected by a solid black arrow pointing from the orange node to the black node.  Above the orange node, a downward-pointing orange arrow labeled 'i' indicates an index `i` in the `nums` array. Similarly, a downward-pointing orange arrow labeled 'i+1' points to the black node, representing the next index `i+1`. A dashed line extends from a point slightly to the left and above the orange node, suggesting a continuation of the sequence before index `i`.  The core logic is expressed as `nums[i] > nums[i+1]`, indicating that if the value at index `i` is greater than the value at index `i+1`, then either a local maximum exists somewhere to the left of index `i`, or the value at `nums[i]` itself is a local maximum.  The text to the right of the inequality explains these two possible outcomes.](/assets/images/dsa/binarysearch/2100ceef1add125e.webp)

Once we know whether a local maxima exists to the left or to the right, we can continue searching in that direction until we find it. In other words, we narrow our search toward the direction of the maxima. Doesn't this type of reasoning sound similar to how we narrow search space in a binary search? This indicates that it might be possible to find a local maxima using binary search.

**Binary search** First, let’s define the **search space**. A local maxima could exist at any index of the array. So, the search space should encompass the entire array.

To figure out how we **narrow the search space**, let’s use the below example, setting left and right pointers at the boundaries of the array:

![Image represents a line graph illustrating a numerical array.  The horizontal axis is labeled 'index' and ranges from 0 to 6. The vertical axis is labeled 'nums' and ranges from 0 to 4.  A black line connects data points representing the values of an array [0, 1, 4, 2, 1, 2, 3], where each number corresponds to its index.  The array is displayed above the graph. Two orange vertical lines highlight the leftmost (index 0, value 0) and rightmost (index 6, value 3) elements of the array.  Above these lines, orange rectangular boxes labeled 'left' and 'right' respectively, indicate the boundaries. The area under the line graph is filled with a light peach color.](/assets/images/dsa/binarysearch/9958b90b565edcc6.webp)

The midpoint is initially set at index 3, which forms a descending slope with its right neighbor since `nums[mid] > nums[mid + 1]`. This suggests that either a maxima exists to the left of index 3 or that index 3 itself is a maxima). So, we should continue our search to the left, while including the midpoint in the search space:

![Image represents two line graphs illustrating a coding pattern, likely a binary search algorithm.  Both graphs display the same data points: `[0, 1, 4, 2, 1, 2, 3]` plotted against an index from 0 to 6.  The y-axis represents the 'nums' values.  In both graphs, vertical orange lines mark 'left' and 'right' boundaries, and a light-blue arrow indicates 'mid'.  The left graph shows the initial state with 'left' at index 0, 'mid' at index 3, and 'right' at index 6.  A shaded peach area highlights the section between 'left' and 'right'.  The right graph depicts an iteration where a descending slope is detected (nums[mid] > nums[mid + 1]), resulting in 'right' being updated to the 'mid' index (index 3).  A dashed orange line connects the old and new 'right' positions. A grey box in the left graph explains the condition for updating 'right' in the algorithm: `descending slope: nums[mid] > nums[mid + 1] → right = mid`.  A small arrow points from this box to the right graph, indicating the application of this rule.](/assets/images/dsa/binarysearch/d6dcf456e82fd380.webp)

The next midpoint is set at index 1, which forms an ascending slope with its right neighbor since `nums[mid] < nums[mid + 1]`. This suggests that a maxima exists somewhere to the right of the midpoint. So, let’s continue the search to the right, while excluding the midpoint:

![Image represents a visual explanation of a coding pattern, likely within a sorting or searching algorithm.  The image is divided into two nearly identical parts, each showing a line graph with a series of points connected by lines. The x-axis represents an index (0-6), and the y-axis represents numerical values ('nums').  In both parts, orange vertical lines highlight sections of the graph.  Above each graph, rectangular boxes labeled 'left,' 'mid,' and 'right' indicate index values (e.g., [0 1 4 2 1 2 3] in the first part) that are associated with the graph's points.  Arrows point from these boxes down to their corresponding points on the graph.  A dashed gray line connects the 'left' and 'right' indices in the second part, suggesting a range.  A light peach-colored rectangle highlights a section of the graph between the 'left' and 'right' markers. A separate box explains the condition 'ascending slope: nums[mid] < nums[mid + 1] → left = mid + 1,' indicating that if the value at the midpoint is less than the value at the next point, the 'left' index is updated to the midpoint plus one. This suggests an iterative process of narrowing down a search range based on the slope of the line graph.  The two parts likely illustrate different stages of this iterative process.](/assets/images/dsa/binarysearch/0b47afaed97f2b4a.webp)

The next midpoint is set at index 2, which forms a descending slope with its right neighbor. So, we continue by searching to the left, while including the midpoint:

![Image represents a visual explanation of a coding pattern, likely within a binary search algorithm.  The image is divided into two nearly identical halves, each showing a line graph plotting a numerical array `nums` against its index.  The x-axis represents the index (0 to 6), and the y-axis represents the values within the `nums` array.  Both graphs depict the same data, a series of points connected by lines forming a V-shape.  At the top of each half, labeled boxes indicate pointers `left`, `mid`, and `right`, initially pointing to indices 0, 2, and 3 respectively in the left half and 0, 1, and 3 in the right half.  These pointers define a search window within the array.  A shaded orange vertical bar highlights the `mid` index in the left graph.  A gray box in the left half explains a condition: 'descending slope: nums[mid] > nums[mid + 1] → right = mid,' indicating that if the value at `mid` is greater than the value at `mid + 1`, the `right` pointer is updated to `mid`, effectively narrowing the search space.  The right half likely shows the result of applying this condition, with the `right` pointer moved to index 1.  The overall diagram illustrates how the algorithm iteratively refines the search range based on the slope of the data.](/assets/images/dsa/binarysearch/79fd27f06d533401.webp)

Now that the left and right pointers have met, locating index 2 as a local maxima, we return this maxima’s index (`left`).

**Summary** Case 1: The midpoint forms a descending slope with its right neighbor, indicating the midpoint is a local maxima, or that a local maxima exists to the left. Narrow the search space toward the left while including the midpoint:

![Image represents a visual explanation of a step within a binary search algorithm, specifically illustrating a condition where the middle element is greater than the element to its right.  The image is divided into two parts separated by a large right-pointing arrow.  The left part shows an array `[0, 4, 3, 1, 0]` represented graphically as a line graph with the x-axis representing the index (0 to 4) and the y-axis representing the array's values (0 to 4).  Vertical orange lines mark the `left` (index 0), `mid` (index 2), and `right` (index 4) pointers, with corresponding labels above the lines.  A shaded peach area highlights the section of the array between `left` and `right`.  A black line connects the data points, showing the array's values.  The right part shows the updated state after the condition `if nums[mid] > nums[mid + 1]: right = mid;` is executed.  The `right` pointer has moved from index 4 to index 2, indicated by a dashed orange line connecting the old and new positions. The graph is updated to reflect this change, with the new `right` pointer at index 2.  Above both parts, a code snippet displays the condition `if nums[mid] > nums[mid + 1]: right = mid;`, which is the decision-making logic behind the pointer movement.  The overall image demonstrates how the algorithm adjusts its search space based on the comparison of the middle element with its neighbor to the right.](/assets/images/dsa/binarysearch/5cf85daf7c7f6657.webp)

Case 2: The midpoint forms an ascending slope with its right neighbor, indicating a local maxima exists to the right. Narrow the search space toward the right while excluding the midpoint:

![Image represents a visual explanation of a coding pattern, likely within a sorting algorithm.  The top shows a code snippet: `if nums[mid] < nums[mid + 1]: left = mid + 1;`, indicating a conditional statement comparing two elements of an array `nums` at indices `mid` and `mid + 1`.  Below, a line graph displays an array `nums` = [0, 4, 3, 1, 0] with indices 0-4 on the x-axis and values on the y-axis.  Orange vertical lines mark `left` (index 0), `mid` (index 2), and `right` (index 4), initially.  A shaded peach region highlights the section between `left` and `right`. A black line connects the data points. A grey dot marks the `mid` point's value.  A thick black arrow separates this from a second graph showing the array after the conditional statement's execution. In the second graph, `left` has shifted to index 3, indicated by a new orange line, while `right` remains at index 4. The peach shaded region now reflects the updated `left` and `right` boundaries.  The dashed orange line connects the old and new `left` positions, visually demonstrating the shift.  The second graph's line plot remains the same, but the `left` pointer's position has changed, illustrating the algorithm's step in adjusting the search space based on the comparison.](/assets/images/dsa/binarysearch/77c400eb75dc8e51.webp)

## Implementation

```python
from typing import List
    
def local_maxima_in_array(nums: List[int]) -> int:
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            left = mid + 1
    return left
```

### Complexity Analysis

**Time complexity:** The time complexity of `local_maxima_in_array` is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )), where n n n denotes the length of the array. This is because we use binary search to find a local maxima.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
