---
title: "Cutting Wood"
course: "DSA"
topic: "BinarySearch"
source: "/home/ayush/OOD-Design-Principles/DSA/BinarySearch/Cutting Wood
.html"
---
You are given an array representing the heights of trees, and an integer `k` representing the total length of wood that needs to be cut.

For this task, a woodcutting machine is set to a certain height, `H`. The machine cuts off the top part of all trees taller than `H`, while trees shorter than `H` remain untouched. **Determine the highest possible setting** of the woodcutter (`H`) so that it cuts **at least k meters** of wood.

Assume the woodcutter cannot be set higher than the height of the tallest tree in the array.

#### Example:

![Image represents a bar chart illustrating a coding pattern, likely related to data structures or algorithms.  The horizontal axis (labeled 'i' at the far right) represents an index or position, while the vertical axis is labeled 'height'. Four bars are shown, with heights varying. The first bar, at index 0, has a height of 2. The second bar, at index 1, has a base height of 3 (light gray) and an additional height of 3 (orange hatched pattern), totaling 6. The third bar, at index 2, has a height of 3. The fourth bar, at index 3, has a base height of 3 (light gray) and an additional height of 5 (orange hatched pattern), totaling 8. A horizontal orange line is drawn at height 3, labeled 'H = 3'.  Braces in light blue indicate the additional height above this line for bars at indices 1 and 3, with the values '3' and '5' respectively written next to them.  The chart visually demonstrates a pattern where a base height is consistently present, with varying additional heights stacked on top.](/assets/images/dsa/binarysearch/996a78e4ac95df36.webp)

```python
Input: heights = [2, 6, 3, 8], k = 7
Output: 3
```

Explanation: The highest possible height setting that yields at least `k = 7` meters of wood is 3, which yields 8 meters of wood. Any height setting higher than this will yield less than 7 meters of wood.

#### Constraints:

- It's always possible to attain at least `k` meters of wood.
- There's at least one tree.

## Intuition

At first, it might strike you as strange that this problem is in the *Binary Search* chapter. The given input array isn't necessarily sorted, so how is binary search applicable here? Well, this is an example of a common application of binary search, where the search space does not encompass the input array.

Let’s consider a visualization of four trees of heights `[2, 6, 3, 8]` and assume k = 7:

![Image represents a bar chart illustrating a data set where the horizontal axis, labeled 'i', represents an index or identifier, and the vertical axis, labeled 'height', represents a corresponding numerical value.  Four bars are displayed, each with a distinct height.  The first bar, at index '0', has a height of approximately 2 units. The second bar, at index '1', reaches approximately 6 units. The third bar, at index '2', has a height of around 3 units. Finally, the fourth bar, at index '3', has the greatest height, approximately 8 units.  The bars are light gray, outlined in black, and are positioned along the horizontal axis with equal spacing between them.  The chart visually depicts the relationship between the index 'i' and its associated 'height' value, showing a non-linear pattern of increasing and decreasing heights across the data points.](/assets/images/dsa/binarysearch/afcab883d273be0d.webp)

The tallest tree above has a height of 8. So the height setting, H, can be set to any height between 0 and 8.

- The most amount of wood is cut at H = 0, where all trees are cut from the bottom.
- The least amount of wood is cut at H = 8, where no wood is cut at all.

![Image represents a comparative visualization of two scenarios involving wood cutting.  The left side depicts a scenario where the height of the axe (H) is 0, resulting in a total wood cut of 19 units. This is shown as a bar chart with four bars of varying heights (2, 6, 3, 8 units respectively) representing the amount of wood cut at each of four positions (i = 0, 1, 2, 3).  Each bar is orange with diagonal stripes.  The y-axis represents the 'height' of the wood cut at each position, and the x-axis represents the position 'i'.  The right side shows a scenario where the axe height (H) is 8.  In this case, the total wood cut is 0, represented by a horizontal orange line at height 8.  The bar chart on this side shows four bars (2, 6, 3, 8 units respectively) representing the initial wood heights at each position, but they are light gray, indicating no wood was cut.  Both charts share the same x-axis scale (i = 0, 1, 2, 3) and a similar y-axis scale ('height').  A small axe icon is drawn next to each chart, with the corresponding axe height (H) value labeled in orange text.  The total wood cut for each scenario is displayed above each chart.](/assets/images/dsa/binarysearch/7d3cc9abd8ececca.webp)

Gradually increasing the height setting of the woodcutter from H = 0 to H = 8 yields less and less wood, and our goal is to find the highest value of H that gives us at least k meters of wood.

**Determining if a height setting yields enough wood** We need a function that determines if any given height setting H yields at least k meters of wood.

Let’s name this function **cuts_enough_wood(H, k)**, which will calculate the total wood obtained by cutting the trees taller than H, and return true if this total meets or exceeds k. Below is a visual representation of how to determine if a height setting of 3 yields enough wood in the example:

![Image represents a bar chart illustrating a function `cuts_enough_wood(H = 3, k = 7)`.  The chart's x-axis is labeled 'i' and represents the index of wood pieces, ranging from 0 to 3. The y-axis is labeled 'height' and represents the height of wood pieces in meters. Three bars are shown; the first has a height of 2 meters, the second has a height of 6 meters with an additional 3 meters highlighted in orange stripes, and the third has a height of 3 meters with an additional 5 meters highlighted in orange stripes.  Arrows point upwards from the top of the orange sections of the second and third bars, labeled '3 meters' and '5 meters' respectively.  These values represent the heights of the additional wood collected from those pieces.  To the right, a box displays the calculation `wood_collected = 3 + 5`, indicating the sum of the additional wood heights.  This sum, 8, is then compared to 'k' (which is 7, as defined in the function's parameters), resulting in the condition `8 ≥ k`, which evaluates to true.  Finally, an arrow points to the text 'return True,' indicating the function's output based on the condition's result.](/assets/images/dsa/binarysearch/9745499eebbba4f1.webp)

Applying this function to all possible values of H (from 0 to 8) gives us the outcome below, where heights 0 to 3 yield at least k meters of wood and heights 4 to 8 are too high and don’t yield enough. Note that here, we visualize which H values make the function `cuts_enough_wood` return true, and which will result in false.

![Image represents a sequence of nine rectangular boxes arranged horizontally.  The first four boxes are colored green and contain the text 'True', while the remaining five boxes are colored red and contain the text 'False'.  Below each box is a label of the form 'H=n', where 'n' is an integer ranging from 0 to 8, sequentially corresponding to each box.  The arrangement visually depicts a boolean array or list, where the value of each element (True or False) is associated with an index (H=n). The color-coding further emphasizes the distinction between the True and False values, suggesting a possible visual representation of a condition or a result of a computation.](/assets/images/dsa/binarysearch/2141cfc69a62a012.webp)

We could call `cuts_enough_wood` on each value of H from 0 to 8 until we reach the highest value that still causes `cuts_enough_wood` to return true. However, a key observation is that the above sequence of boolean outcomes is effectively a **sorted sequence**, since all true outcomes are positioned before false ones.

As this is a sorted sequence, we should try using binary search.

**Binary search** The goal is to find the last value of H that cuts at least k meters of wood. In other words, we’re looking for the upper bound value of H that satisfies this condition.

![The image represents a visual depiction of a boolean array or list, likely illustrating a concept within a binary search or similar algorithm.  Nine rectangular boxes are arranged horizontally. The first four boxes are green, labeled 'True' and indexed H=0 through H=3.  The remaining five boxes are red, labeled 'False' and indexed H=4 through H=8.  Each box displays a boolean value (True or False) and its corresponding index (H=n, where n is an integer from 0 to 8). An orange upward-pointing arrow below the fourth box (H=3) is labeled 'upper bound,' indicating that this index represents the upper boundary of a subset within the larger array.  The arrangement visually separates the 'True' values from the 'False' values, suggesting a potential division point in a search algorithm where the 'True' values represent a successful search condition and the 'False' values represent an unsuccessful one.](/assets/images/dsa/binarysearch/e5cdc7454886d4a8.webp)

As such, we should use **upper-bound binary search**. This means we’ll need to calculate the midpoint using **mid = (left + right) // 2 + 1**, as mentioned in the *First and Last Occurrences of a Number* problem.

Let’s first **define the search space**. Our search space should encompass all values of H between 0 and the height of the tallest tree in the array, as these are all possible answers.

To figure out how to **narrow the search space**, let's use the example below, setting left and right pointers at the ends of the search space:

![Image represents a diagram illustrating a binary search concept or a similar partitioning algorithm.  Two orange rectangular boxes labeled 'left' and 'right' are positioned above a row of nine rectangular boxes.  Arrows descend from 'left' and 'right' pointing to the first and last boxes in the row respectively. The nine boxes represent a sequence of values, each labeled with 'H=n' where 'n' ranges from 0 to 8, indicating an index or position. The first four boxes (H=0 to H=3) are colored green and contain the value 'True,' while the remaining five boxes (H=4 to H=8) are colored red and contain the value 'False.'  The arrangement shows a split between 'True' and 'False' values, suggesting a search or partitioning process where the 'left' pointer initially points to a set of 'True' values and the 'right' pointer points to a set of 'False' values.  The diagram likely visualizes the state of a data structure at a specific point during a search or sorting algorithm.](/assets/images/dsa/binarysearch/48a195356bf6848a.webp)

Initially, the midpoint is set to H = 4. When we call `cuts_enough_wood(4, k)`, it returns false. This means the height setting is not yielding enough wood and is, hence, set too high. To find a lower height setting, we should narrow our search space toward the left:

![Image represents a visual depiction of a binary search algorithm or a similar iterative process.  Three rectangular boxes labeled 'left,' 'mid,' and 'right' at the top represent the initial boundaries and a midpoint of a search space. Arrows descend from 'left' and 'right' to a series of nine rectangular boxes, each displaying either 'True' (in green) or 'False' (in red) and labeled with 'H=0' through 'H=8,' indicating an index or iteration.  An arrow descends from 'mid' to the boxes starting at index 4. The boxes labeled 'True' from H=0 to H=3 are shaded light green, while those labeled 'False' from H=4 to H=8 are shaded light red.  A separate box at the bottom shows the code snippet 'cuts_enough_wood(4) = False,' indicating a function call that returned false at the midpoint (H=4).  Below this, an arrow and the assignment 'right = mid - 1' illustrate the algorithm's adjustment of the search space's right boundary based on the result of the function call, implying a narrowing of the search range in subsequent iterations.  The overall diagram illustrates a step in a search algorithm where the midpoint evaluation leads to a reduction of the search space.](/assets/images/dsa/binarysearch/3c4b6013d47a65b8.webp)

![Image represents a diagram illustrating a coding pattern, possibly related to searching or traversal.  The diagram shows two distinct sections. The left section features a grey box labeled 'left' with a downward arrow pointing to four green boxes, each containing the word 'True' and a label 'H=n' (where n is 0, 1, 2, and 3 respectively) indicating an index or counter.  A similarly styled orange box labeled 'right' sits above a series of grey boxes, each containing 'False' and labeled 'H=n' (where n ranges from 4 to 8). A dashed orange line connects the 'right' box to the last 'True' box on the left, suggesting a connection or data flow between these two points. The arrangement implies a process where a 'left' operation produces a sequence of 'True' values up to a certain point, after which a 'right' operation yields a sequence of 'False' values.  The overall structure suggests a binary search or a similar algorithm where a condition is checked, resulting in either a 'True' or 'False' outcome at each step.](/assets/images/dsa/binarysearch/cd72d749950dcb26.webp)

The next midpoint is set to H = 2. When we call `cuts_enough_wood(2, k)`, it returns true. This means the upper bound is either at the midpoint or to its right, as the upper bound is the rightmost height setting that cuts enough wood.

So, narrow the search space toward the right while including the midpoint:

![The image represents a visual depiction of a binary search algorithm or a similar iterative process.  Three rectangular boxes labeled 'left,' 'mid' (in light blue), and 'right' (in dark gray) are positioned at the top, each pointing downwards with an arrow. Below these, a series of rectangular boxes represent the evaluation of a function, `cuts_enough_wood`, at different index values (H=0 through H=8). The boxes labeled H=0, H=1, H=2, and H=3 contain 'True' in green, indicating that the condition is met for these indices. The remaining boxes (H=4 through H=8) contain 'False' in light gray, showing the condition is not met. A separate gray box at the bottom displays the result of the function call `cuts_enough_wood(2) = True` and the subsequent assignment `left = mid`, indicating that the 'left' variable is updated to the value of 'mid' based on the function's output.  The arrangement shows the flow of information: the initial values of 'left', 'mid', and 'right' trigger the evaluation of the function at different indices, and the results of these evaluations determine the update of the 'left' variable.](/assets/images/dsa/binarysearch/f4c685d4662f6d22.webp)

![Image represents a diagram illustrating a binary search algorithm or a similar traversal process.  A sequence of rectangular boxes, each labeled with 'True' or 'False' and an index 'H=n' (where n represents an integer from 0 to 8), are arranged horizontally.  Two boxes labeled 'True' at indices H=2 and H=3 are highlighted in green, indicating a potential search result or a point of interest.  Above these highlighted boxes, two orange rectangular boxes labeled 'left' and 'right' represent directional pointers or decision points.  A solid downward arrow from 'right' points to the 'True' box at H=3, while a dashed orange curved arrow connects 'left' to the 'True' box at H=2.  The remaining boxes, labeled 'False,' are light gray, suggesting they were not selected during the search. The overall structure suggests a search algorithm that starts at a point and moves left or right based on some condition, ultimately identifying the highlighted 'True' values.](/assets/images/dsa/binarysearch/dcf189cc6c2d3af6.webp)

The next midpoint is set to H = 3. When we call `cuts_enough_wood(3, k)`, it returns true. So, narrow the search space toward the right while including the midpoint:

![Image represents a visual depiction of a binary search or similar algorithm's execution.  At the top, three labeled boxes, 'left,' 'mid' (in light blue), and 'right,' represent index pointers or variables.  Arrows indicate that 'left' points downwards to a 'True' box labeled 'H=2,' and 'mid' and 'right' point downwards to 'True' (H=3) and a series of 'False' boxes (H=4 through H=8) respectively. These boxes, arranged horizontally, represent the evaluation of a condition, 'cuts_enough_wood(3),' at different indices (H values). The green boxes ('True' at H=2 and H=3) signify that the condition is met at those indices. The grey boxes ('False' at H=4 to H=8) indicate the condition is not met.  A separate box at the bottom shows the result of the function call `cuts_enough_wood(3)` as 'True' and the subsequent assignment `left = mid`, indicating an update to the 'left' pointer based on the search result.  The overall diagram illustrates a step in a search process where the search space is narrowed down based on the evaluation of a condition at different indices.](/assets/images/dsa/binarysearch/b87dc6ee2dd820d1.webp)

![Image represents a diagram illustrating a coding pattern, likely related to searching or traversal.  A horizontal sequence of nine rectangular boxes displays boolean values ('True' or 'False'), each labeled with an index 'H=n' (where n ranges from 0 to 8).  Three additional rectangular boxes are positioned above: two labeled 'left' (in orange) and 'right' (in gray).  A solid arrow points from 'right' to the box labeled 'True' at index H=3. A dashed arrow points from 'left' to the same 'True' box at H=3.  The boxes at indices H=0, H=1, and H=2 show 'True,' while those at indices H=4 through H=8 show 'False.' The central 'True' box (H=3) is highlighted in green, suggesting it's the result or focus of the operation. The arrows indicate that the 'left' and 'right' labels represent directional parameters or conditions influencing the selection or identification of the 'True' value at H=3.](/assets/images/dsa/binarysearch/5bd09473082e00e0.webp)

Once the left and right pointers meet, we have located the upper bound height setting that yields at least k meters of wood.

**Summary** Case 1: The midpoint is set at a height that allows us to cut at least k meters of wood, indicating the upper bound is somewhere to the right. Narrow the search space to the right while including the midpoint:

![Image represents a visual depiction of a binary search algorithm, likely within a function called `cuts_enough_wood`.  The top section shows a code snippet: `if not cuts_enough_wood(mid): right = mid - 1`, indicating a conditional statement where if the function `cuts_enough_wood` returns `False` for a given `mid` value, the `right` boundary is adjusted. Below this, two rows of boxes illustrate the algorithm's iterations. Each box represents a value (H=0 to H=6) and displays whether `cuts_enough_wood` returned `True` (green) or `False` (red) for that value.  Arrows labeled 'left' and 'right' show the search space boundaries.  In the first row, the `mid` value is tested, and based on the result (False), the `right` boundary is updated (as per the code snippet). The second row shows the updated search space after the `right` boundary has been moved to the left.  A dashed orange line connects the old and new `right` boundaries, visually representing the adjustment.  The boxes in the second row that are greyed out represent values that are no longer considered in the search after the boundary update.](/assets/images/dsa/binarysearch/1c333e721ca20b0b.webp)

Case 2: The midpoint is at a height that doesn’t allow us to cut enough wood, indicating the upper bound is somewhere to the left. Narrow the search space to the left while excluding the midpoint:

![Image represents a visual depiction of a binary search algorithm, likely within a wood-cutting context.  The top section shows a conditional statement: `if cuts_enough_wood(mid): left = mid;`. This implies a function `cuts_enough_wood` is used to determine if a sufficient amount of wood is cut at a midpoint (`mid`). If true, the `left` boundary is updated to `mid`. Below, two rows of rectangular boxes represent an array, each box showing a boolean value (`True` or `False`) indicating whether a cut at that index (`H=0` to `H=6`) meets the condition.  The top row shows the initial state.  A light-blue box labeled `mid` points down to the middle of the top row, indicating the initial midpoint.  Gray boxes labeled `left` and `right` point to the leftmost and rightmost elements respectively.  The bottom row shows the state after the conditional statement is executed.  A dashed orange line connects the initial `left` section to the updated `left` section in the bottom row, visually demonstrating the shift of the `left` boundary.  The `right` boundary remains unchanged.  The green boxes represent `True` values (enough wood cut), while red boxes represent `False` values (insufficient wood cut).  The overall diagram illustrates how the search space is narrowed down iteratively based on the result of the `cuts_enough_wood` function.](/assets/images/dsa/binarysearch/e4ed4a73ea16ab3a.webp)

## Implementation

```python
from typing import List
    
def cutting_wood(heights: List[int], k: int) -> int:
    left, right = 0, max(heights)
    while left < right:
        # Bias the midpoint to the right during the upper-bound binary search.
        mid = (left + right) // 2 + 1
        if cuts_enough_wood(mid, k, heights):
            left = mid
        else:
            right = mid - 1
    return right
    
# Determine if the current value of 'H' cuts at least 'k' meters of wood.
def cuts_enough_wood(H: int, k: int, heights: List[int]) -> bool:
    wood_collected = 0
    for height in heights:
        if height > H:
            wood_collected += (height - H)
    return wood_collected >= k
```

## Complexity Analysis

**Time complexity:** The time complexity of `cutting_wood` is O ( n log ⁡ ( m ) ) O(n\log(m)) O ( n lo g ( m )), where m m m is the maximum height of the trees. This is because we perform a binary search over the range [0, m m m]. Each iteration of the binary search calls the `cuts_enough_wood` function, which runs in O ( n ) O(n) O ( n ) time, where n n n is the number of trees. This results in an overall time complexity of O ( log ⁡ ( m ) ) O ( n ) = O ( n log ⁡ ( m ) ) O(\log(m))O(n)=O(n\log(m)) O ( lo g ( m )) O ( n ) = O ( n lo g ( m )).

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).
