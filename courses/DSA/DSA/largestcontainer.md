---
title: "LargestContainer"
course: "DSA"
topic: "DSA"
source: "/home/ayush/OOD-Design-Principles/DSA/LargestContainer___Technical_Interview_Prep.html"
---
You are given an array of numbers, each representing the height of a vertical line on a graph. A container can be formed with any pair of these lines, along with the x-axis of the graph. Return the amount of water which the **largest container** can hold.

#### Example:

![Image represents a bar chart or histogram with a horizontal x-axis ranging from 0 to 5 and a vertical y-axis ranging from 0 to 8.  The y-axis represents frequency or count, while the x-axis likely represents categories or data points.  The chart displays several vertical bars of varying heights. A bar at x=0 has a height of 2.  Bars at x=1, x=2, x=4, and x=5 all reach a height of 6, forming a plateau of light-blue filled area.  A shorter bar at x=3 reaches a height of 3.  The bars are represented by vertical black lines extending from the x-axis to their respective heights on the y-axis.  The area under the bars from y=0 to y=6 between x=1 and x=5 is filled with light blue, visually highlighting the consistent frequency across those data points.](/assets/images/dsa/dsa/0f5598963b6f0fe4.webp)

```python
Input: heights = [2, 7, 8, 3, 7, 6]
Output: 24
```

## Intuition

If we have two vertical lines, `heights[i]` and `heights[j]`, the amount of water that can be contained between these two lines is `min(heights[i], heights[j]) * (j - i)`, where `j - i` represents the width of the container. We take the minimum height because filling water above this height would result in overflow.

![Image represents a graphical illustration of a calculation alongside its formula and result.  The left side shows a 2D Cartesian coordinate system with a light-blue rectangle representing a volume of water. The rectangle's base extends from x=0 to x=2 on the x-axis and its height is 3 units along the y-axis, reaching from y=0 to y=3.  A vertical line segment at x=1 is also present within the rectangle.  A curved grey arrow originates from the top-right corner of the rectangle and points to the right, indicating the direction of the calculation's result. To the right of the graph, the formula 'water = min(4, 3) ⋅ (2 - 0)' is displayed, calculating the volume of water.  'min(4, 3)' finds the minimum value between 4 and 3 (which is 3), and this is multiplied by the base length (2 - 0 = 2). The subsequent lines show the calculation steps: '3 ⋅ 2' and the final result '6', representing the total volume of water (likely in some arbitrary units).](/assets/images/dsa/dsa/25ecd9e208ab8907.webp)

In other words, the area of the container depends on two things:

- The **width** of the rectangle.
- The **height** of the rectangle, as dictated by the shorter of the two lines.

The brute force approach to this problem involves checking all pairs of lines, and returning the largest area found between each pair:

```python
from typing import List
    
def largest_container_brute_force(heights: List[int]) -> int:
   n = len(heights)
   max_water = 0
   # Find the maximum amount of water stored between all pairs of lines.
   for i in range(n):
       for j in range(i + 1, n):
           water = min(heights[i], heights[j]) * (j - i)
           max_water = max(max_water, water)
   return max_water
```

Searching through all possible pairs of values takes O ( n 2 ) O(n^2) O ( n 2 ) time, where n n n denotes the length of the array. Let's look for a more efficient solution.

We would like both the height and width to be as large as possible to have the largest container.

It’s not immediately obvious how to find the container with the largest height, as the heights of the lines in the array don’t follow a clear pattern. However, we do know the container with the maximum width: the one starting at index 0 and ending at index `n - 1`.

So, we could start by maximizing the width by setting a pointer at each end of the array. Then, we can gradually reduce the width by moving these two pointers inward, hoping to find a container with a larger height that potentially yields a larger area. This suggests we can use the **two-pointer** pattern to solve the problem.

Moving a pointer inward means shifting either the left pointer to the right, or the right pointer to the left, effectively narrowing the gap between them.

Consider the following example:

![Image represents a bar chart visualizing the data contained within the Python list `heights = [2, 7, 8, 3, 7, 6]`.  The horizontal axis represents the index of each element in the list (0 through 5), while the vertical axis represents the value of each element, ranging from 0 to 8.  Each vertical bar corresponds to an element in the list; its height corresponds to the element's value. For example, the first bar at index 0 has a height of 2, the second bar at index 1 has a height of 7, and so on. The vertical axis is marked with numerical labels (0 through 8) indicating the height of the bars, and the horizontal axis is implicitly marked by the position of the bars, corresponding to the list indices.  The arrowheads on the axes indicate the direction of increasing values.](/assets/images/dsa/dsa/d616b8f6db46cc99.webp)

The widest container can store an area of water equal to 10. Since this is the largest container we’ve found so far, let’s set `max_water` to 10.

![Image represents a diagram illustrating a calculation of maximum trapped water.  The left side shows a bar chart with a horizontal axis labeled from 0 to 5 and a vertical axis representing height from 0 to 8.  Vertical bars of varying heights (2, 7, 8, 3, 6) are plotted at each integer position on the horizontal axis. A light-blue area represents the trapped water, extending horizontally between the bars and reaching a height of 2 units.  Arrows point upwards from the labels 'left' and 'right' below the horizontal axis, indicating the direction of calculation. On the right, a light-grey box displays a calculation: 'water = min(2, 6) . (5 - 0) = 10' and 'max_water = 10', showing the minimum height between the leftmost (height 2) and rightmost (height 6) bars multiplied by the width (5-0) to determine the total trapped water, which is 10 units.](/assets/images/dsa/dsa/af13f7529a184852.webp)

How should we proceed? Moving either pointer inward yields a container with a shorter width. This leaves height as the determining factor. In this case, the left line is shorter than the right line, which means that the left line limits the water's height. Therefore, to find a larger container, let's move the left pointer inward:

![Image represents a visual explanation of a coding pattern, likely related to algorithms operating on arrays or lists.  The left side shows a bar chart with a horizontal axis labeled from 0 to 5 and a vertical axis representing height from 0 to 8.  Several bars of varying heights are displayed; the heights are implicitly represented by the vertical extent of the bars. A light-blue rectangle fills the area below the height of the bars, representing a water level.  An orange box labeled 'left' points to the leftmost bar, and another orange box labeled 'right' points to the rightmost bar.  These labels 'left' and 'right' likely represent index pointers within an array. On the right side, a light-grey dashed-bordered box contains a conditional statement in code-like notation:  `heights[left] < heights[right] → left += 1`. This indicates that if the height at the index `left` is less than the height at the index `right`, then the `left` index is incremented by 1.  The arrow implies a flow of information or control; the condition's evaluation dictates the update of the `left` pointer. The overall diagram illustrates a step within an algorithm, possibly for finding the largest rectangular area in a histogram or a similar problem involving array traversal and comparison.](/assets/images/dsa/dsa/609048d74346a4aa.webp)

The current container can hold 24 units of water, the largest amount so far. So, let’s update `max_water` to 24. Here, the right line is shorter, limiting the water's height. To find a larger container, move the right pointer inward:

![Image represents a bar chart illustrating a coding pattern, likely related to finding the maximum area of water trapped between vertical bars.  The horizontal axis shows indices (0 to 5), and the vertical axis represents heights.  Vertical bars of varying heights are drawn at each index; their heights are 2, 6, 6, 3, 6, and 0 respectively. A light-blue area is filled between the bars at indices 1, 2, 3, and 4, representing the trapped water.  Arrows labeled 'left' and 'right' point towards the x-axis, indicating the direction of traversal in an algorithm. A separate box contains code snippets: `water = min(7, 6) * (5 - 1) = 24` calculates the water trapped between specific bars (likely using the minimum height as the limiting factor and the distance between them), `max_water = 24` stores the maximum water found so far, and `heights[left] > heights[right] → right -= 1` shows a conditional statement, suggesting an algorithm iterates from left and right, moving the right pointer inwards if the left bar is taller.  The overall diagram visually explains a two-pointer approach to solving a 'trapping rain water' problem.](/assets/images/dsa/dsa/deeeb3aba2685a72.webp)

After this, we encounter a situation where **the height of the left and right lines are equal**. In this situation, which pointer should we move inward? Well, regardless of which one, the next container is guaranteed to store less water than the current one. Let’s try to understand why.

Moving either pointer inward yields a container of shorter width, leaving height as the determining factor. However, regardless of which pointer we move inward, the other pointer remains at the same line. So, even if a pointer is moved to a taller line, the other pointer will restrict the height of the water, as we take the minimum of the two lines.

Therefore, since we can’t increase height by moving just one pointer, we can just move both pointers inward:

![Image represents a bar chart illustrating a 'two-pointer' approach to finding the maximum area that can be contained between vertical bars. The horizontal axis shows indices (0 to 5), and the vertical axis represents height.  Several vertical bars of varying heights are depicted; one bar at index 0 has a height of 2, a group of bars from index 1 to 3 have a height of 7, and a bar at index 3 has a height of 6. The area between the bars at indices 1 and 3 is shaded light blue, representing the calculated water trapped between them.  Two orange rectangular boxes labeled 'left' and 'right' point to the indices 1 and 4 respectively, indicating the pointers used in the algorithm. A separate box displays calculation details: `water = min(7, 7) * (4 - 1) = 21`, showing the calculation of the water trapped between the pointers; `max_water = 24` indicates the maximum water trapped found so far; and `heights[left] == heights[right] => left += 1 and right -= 1` describes the algorithm's logic: if the heights at the left and right pointers are equal, both pointers move inwards.](/assets/images/dsa/dsa/850a6d29e8c311ec.webp)

Now, the right line is limiting the height of the water. So, we move the right pointer inward:

![Image represents a diagram illustrating a coding pattern, likely related to finding the maximum trapped rainwater between vertical bars.  The left side shows a bar chart with vertical bars of varying heights (1, 7, 3, 7, 6) at positions 0, 1, 2, 3, 4, 5 respectively on the x-axis and heights on the y-axis. A light-blue rectangle is filled between bars of height 3 and 7 at positions 2 and 3, representing trapped water.  Below the chart, orange rectangular boxes labeled 'left' and 'right' indicate pointers or indices used to iterate through the bars.  An arrow points upwards from 'left' to the bar at position 2 and another from 'right' to the bar at position 3. The right side contains a light-grey box with code-like annotations.  These annotations show a calculation: `water = min(8, 3) * (3 - 2) = 3`, indicating the calculation of water trapped between two bars; `max_water = 24`, representing the maximum trapped water; and `heights[left] > heights[right] => right -= 1`, suggesting a conditional statement controlling the movement of the 'right' pointer based on the heights of the bars at the 'left' and 'right' indices.  The overall diagram visually explains an algorithm for calculating maximum trapped rainwater using two pointers.](/assets/images/dsa/dsa/ea6c7090c58d001b.webp)

Finally, the left and right pointers meet. We can conclude our search here and return `max_water`:

![Image represents a diagram illustrating a coding pattern, likely within a search or sorting algorithm.  The left side shows a bar chart with the x-axis ranging from 0 to 5 and the y-axis representing a value, with bars of varying heights at different x-axis positions (0, 1, 2, 3, 4, and 5).  Below the chart, two rectangular boxes labeled 'left' and 'right' are shown, with arrows pointing upwards towards the x-axis, suggesting these labels represent index pointers or boundaries within a data structure. On the right side, a dashed-line rectangle contains the condition 'left == right' with a solid arrow pointing to the word 'break,' indicating that when the condition 'left' equals 'right' is met, the algorithm terminates or exits the loop using a 'break' statement.  The overall diagram visually depicts the process of a binary search or similar algorithm where two pointers converge until a condition is met, resulting in the termination of the process.](/assets/images/dsa/dsa/8d2d543cd5c6fc4f.webp)

Based on the decisions taken in the example, we can summarize the logic:

1. If the left line is smaller, move the left pointer inward.
2. If the right line is smaller, move the right pointer inward.
3. If both lines have the same height, move both pointers inward.

## Implementation

```python
from typing import List

def largest_container(heights: List[int]) -> int:
    max_water = 0
    left, right = 0, len(heights) - 1
    while (left < right):
        # Calculate the water contained between the current pair of lines.
        water = min(heights[left], heights[right]) * (right - left)
        max_water = max(max_water, water)
        # Move the pointers inward, always moving the pointer at the shorter line. If
        # both lines have the same height, move both pointers inward.
        if (heights[left] < heights[right]):
            left += 1
        elif (heights[left] > heights[right]):
            right -= 1
        else:
            left += 1
            right -= 1
    return max_water
```

### Complexity Analysis

**Time complexity:** The time complexity of `largest_container` is O ( n ) O(n) O ( n ) because we perform approximately n n n iterations using the two-pointer technique.

**Space complexity:** We only allocated a constant number of variables, so the space complexity is O ( 1 ) O(1) O ( 1 ).

### Test Cases

In addition to the examples discussed throughout this explanation, below are some other examples to consider when testing your code.
