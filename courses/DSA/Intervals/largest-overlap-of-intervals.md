---
title: "Largest Overlap Of Intervals"
course: "DSA"
topic: "Intervals"
source: "/home/ayush/OOD-Design-Principles/DSA/Intervals/Largest Overlap of Intervals.html"
---
Given an array of intervals, determine the maximum number of intervals that overlap at any point. Each interval is half-open, meaning it includes the start point but excludes the end point.

#### Example:

![Image represents a horizontal number line ranging from 1 to 8, illustrating three overlapping intervals.  Four horizontal line segments, representing the intervals, are drawn above the number line.  The left endpoints of the segments are marked with solid circles, and the right endpoints with open circles. The first segment spans approximately from 1 to 3. The second segment starts around 2 and ends around 6. The third segment begins around 4 and ends around 7. The fourth segment starts at approximately 6 and ends at 7. A dashed orange rectangle highlights the area where three intervals (segments 2, 3, and 4) overlap, located roughly between 5 and 6 on the number line. An orange curved arrow points to this rectangle with the text '3 overlapping intervals' above it.  The number line provides a visual representation of the intervals' positions and their degree of overlap.](/assets/images/dsa/intervals/20f0a9b58666d5d5.webp)

```python
Input: intervals = [[1, 3], [5, 7], [2, 6], [4, 8]]
Output: 3
```

#### Constraints:

- The input will contain at least one interval.
- For every index i in the list, intervals[i].start < intervals[i].end .

## Intuition

Think about what it means when x intervals overlap at a certain point in time. This means at this point, there are x “**active**” intervals, where an interval is active if it has started but not ended.

In the example below, we see three active intervals at time 5 (intervals that started at or before this time, and haven’t yet ended):

![Image represents a horizontal timeline ranging from 1 to 8, depicting four horizontal line segments representing intervals.  Each segment starts with a filled circle and ends with an unfilled circle, indicating a start and end point respectively. Three of these segments overlap within a region highlighted by a dashed orange rectangle around the 5 mark on the timeline. A curved orange arrow points from this overlapping region to a grey box labeled '3 active intervals,' further specifying that these three intervals 'have started' and 'haven't yet ended.' The fourth segment lies entirely to the left of the orange dashed rectangle, indicating it has already ended.  The lengths of the segments vary, representing different durations of the intervals.](/assets/images/dsa/intervals/8a81674f2cebdda4.webp)

To find the number of active intervals at any point in time, we need to identify when an interval has started and when an interval has ended. The start point of an interval indicates the start of a new active interval, whereas an end point represents an active interval finishing. This suggests an approach which looks at start and end points individually could be useful. Let’s explore this idea further.

**Processing start points and end points** Let’s step through each point in the array of intervals in chronological order, and see if we can determine the number of active intervals at each point.

The first point is a start point, indicating the start of the first active interval. So, let’s increment our counter:

![Image represents a diagram illustrating a coding pattern, possibly related to interval management or event tracking.  The diagram features a numbered horizontal axis ranging from 1 to 8.  Above the axis are several horizontal line segments representing intervals; the lowest segment, highlighted in light blue at its left end, starts at point 1 and extends to point 3.  Above this are three more intervals: one starting at point 4 and ending at point 5, another starting at point 2 and ending at point 7, and a final one starting at point 6 and ending at point 7. A square box labeled 'i' is positioned above the axis and a downward arrow connects it to the beginning of the lowest interval, suggesting an input or initialization point. To the right, a dashed-line box contains the code snippet 'start point -> active_intervals += 1 = 1', indicating that when a 'start point' is encountered (presumably the beginning of an interval), a variable named 'active_intervals' is incremented by 1, resulting in a value of 1.  The overall diagram visually depicts how intervals are identified and counted, possibly within a larger algorithm.](/assets/images/dsa/intervals/63d7b8d36590f1ba.webp)

The next point is another start point. This is the start of the second active interval, so let’s increment our counter again. Now, the number of active intervals is 2, which correctly corresponds with the number of overlapping intervals at this point:

![Image represents a visualization of an algorithm, possibly related to interval scheduling or similar.  The diagram shows a number line spanning from 1 to 8, with several horizontal line segments representing intervals. A light-blue circle at point 2 on the number line indicates a starting point, marked by a downward-pointing arrow originating from a square box labeled 'i'.  Three intervals are depicted: one extending from 1 to 3, another from 4 to 7, and a shorter one from 6 to 7.  A separate, dashed-line box to the right displays a code snippet: 'start point → active_intervals += 1 = 2', indicating that upon reaching the start point (2), the variable `active_intervals` is incremented by 1, resulting in a value of 2. This suggests the algorithm counts or tracks active intervals based on the starting point and the overlapping intervals on the number line.](/assets/images/dsa/intervals/29448a03e30b1f11.webp)

The next point is an end point, which means an active interval has just finished. So, let’s decrement our counter. Now, the number of active intervals is 1, which also corresponds with the current number of overlapping intervals:

![Image represents a diagram illustrating a coding pattern, likely related to interval management or event processing.  The diagram's core is a horizontal number line spanning from 1 to 8, representing a time or sequence axis.  On this line, several horizontal line segments are drawn, each representing an interval.  A thicker, peach-colored circle at point 3 marks a specific event or point of interest.  A square labeled 'i' above the number line points downwards with an arrow to this circle, suggesting an input or trigger at this point.  Three distinct intervals are shown: one starting at approximately 1 and ending at 3 (peach circle), another starting at 2 and ending at 7, and a third starting at 6 and ending at 7.  The intervals are represented by thick black lines with endpoints marked by small circles. To the right, a light gray box with dashed borders contains a code snippet showing an operation: 'end point → active_intervals -= 1' followed by '= 1', indicating that when an interval's endpoint is reached, a variable named 'active_intervals' is decremented by 1, and the result is 1.  This suggests the diagram visualizes how the number of active intervals changes over time based on interval endpoints.](/assets/images/dsa/intervals/184f9d0e155fd5ff.webp)

We’ve now rationalized what we need to do whenever we encounter a start point or end point:

- If we encounter a **start point**: **increment active_intervals**.
- If we encounter an **end point**: **decrement active_intervals**.

Processing the remaining points allows us to attain the number of active intervals at each point. **The final answer is obtained by recording the largest value of active_intervals**.

**Edge case: processing concurrent start and end points** An edge case to consider is when a start and end point occur simultaneously:

![Image represents a horizontal line graph illustrating the concept of overlapping intervals.  The x-axis is numbered from 1 to 8, representing a numerical scale. Four horizontal line segments of varying lengths are plotted above the x-axis.  The left endpoint of each segment indicates a start point, and the right endpoint indicates an end point, representing an interval.  The first segment spans from approximately 1 to 3. The second segment extends from approximately 4.2 to 7. The third segment runs from approximately 4.8 to 8. The fourth and shortest segment is positioned from approximately 5 to 5.5.  A dashed box highlights the intersection of the second and fourth segments, specifically around the x-axis value of 6. Within this box, a light peach-colored circle represents the endpoint of the fourth segment, and a light blue circle represents the start point of the second segment, indicating an overlap between these two intervals. The circles at the endpoints of the line segments are open, suggesting that the endpoints are not included in the intervals.](/assets/images/dsa/intervals/8fd32c9e0cde9919.webp)

Which point should we process first? Keep in mind the value of `active_intervals` is 3 right before we reach time = 6 in the above example.

At time 6, if we process the start point first and increment `active_intervals`, we would update it to 4 first, which is incorrect as there are never 4 active intervals at this moment. This is an issue because our final answer is the largest value of `active_intervals` encountered, which means we’ll incorrectly record 4 as the answer.

![Image represents a flowchart illustrating a process where an initial value, `active_intervals = 3`, is processed.  A light-blue arrow labeled 'process start point' indicates the flow from the initial value to an intermediate value of `4`, enclosed in a red box.  An orange arrow labeled 'process end point' shows the flow from the intermediate value of `4` to a final value of `3`. A curved red arrow points from the intermediate value `4` to the text 'wrong: too high,' indicating that the intermediate result is incorrect because it exceeds the expected final value.  The diagram visually demonstrates a process where an input value is transformed, resulting in an output that is evaluated for correctness based on a predefined constraint.](/assets/images/dsa/intervals/ce323e7f18345cdb.webp)

If we process the end point first, we won’t encounter this issue:

![Image represents a diagram illustrating a process with two stages.  The diagram begins with the text 'active_intervals = 3', indicating an initial state where the number of active intervals is 3.  An orange arrow then extends from this initial state, labeled above with 'process' in orange text and below with 'end point' in orange text, pointing to the number '2'. This signifies a process that reduces the number of active intervals from 3 to 2.  Following this, a light-blue arrow starts from '2' and points to '3', labeled above with 'process' in light-blue text and below with 'start point' in light-blue text. This represents a second process that increases the number of active intervals back to 3. The entire diagram visually depicts a cyclical process affecting the number of active intervals, starting and ending with a count of 3, with an intermediate state of 2.](/assets/images/dsa/intervals/f7c6de7ee17b75b8.webp)

Therefore, for start and end points that occur simultaneously, we should **process end points before start points**.

**Iterating over interval points in order** We need a way to iterate through the start and end points in the order they should be processed. To do this, we can combine all start and end points into a single array and sort it. For start and end points of the same value, we ensure end points are prioritized before start points while the points are being sorted.

Let’s use ‘S’ and ‘E’ to differentiate between start and end points, respectively:

![Image represents a coding pattern illustration demonstrating the transformation of a list of intervals into a sorted list of points.  The top line shows a Python-like list called `intervals` containing five sub-lists, each representing an interval with a start and end point: `[1, 3]`, `[2, 6]`, `[4, 8]`, `[6, 7]`, and `[5, 7]`. A right arrow indicates a transformation to the `points` list below, which contains all the start and end points from the `intervals` list: `[1 2 3 4 5 6 6 7 7 8]`. Underneath each point in the `points` list, 'S' (in light blue) denotes a start point of an interval and 'E' (in orange) denotes an end point.  A small downward-pointing arrow underlines the 'E' and 'S' representing an end point appearing before a start point, highlighting a condition where the end point of one interval is sorted before the start point of another. The text 'end point sorted before start point' explains this specific arrangement and the implication of the sorting process.](/assets/images/dsa/intervals/526a6142b1dc3217.webp)

The algorithm we used to solve this problem is known as a ‘sweeping line algorithm.’ It works by processing the start and end points of intervals in order, as if a vertical line was sweeping across them. This method efficiently handles the dynamic nature of interval overlaps by specifically focusing on start and end points, rather than individual intervals.

## Implementation

```python
from typing import List
from ds import Interval
    
def largest_overlap_of_intervals(intervals: List[Interval]) -> int:
   points = []
   for interval in intervals:
       points.append((interval.start, 'S'))
       points.append((interval.end, 'E'))
   # Sort in chronological order. If multiple points occur at the same time, ensure
   # end points are prioritized before start points in the sorting order.
   points.sort(key=lambda x: (x[0], x[1]))
   active_intervals = 0
   max_overlaps = 0
   for time, point_type in points:
       if point_type == 'S':
           active_intervals += 1
       else:
           active_intervals -= 1
       max_overlaps = max(max_overlaps, active_intervals)
   return max_overlaps
```

### Complexity Analysis

**Time complexity:** The time complexity of `largest_overlap_of_intervals` is O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )), where n n n denotes the number of intervals. This is because we sort the points array of size 2 n 2n 2 n before iterating over it in O ( n ) O(n) O ( n ) time.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the `points` array.
