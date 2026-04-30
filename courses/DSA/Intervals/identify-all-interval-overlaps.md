---
title: "Identify All Interval Overlaps"
course: "DSA"
topic: "Intervals"
source: "/home/ayush/OOD-Design-Principles/DSA/Intervals/Identify All Interval Overlaps.html"
---
Return an array of **all overlaps** between two arrays of intervals; `intervals1` and `intervals2`. Each individual interval array is sorted by start value, and contains no overlapping intervals within itself.

#### Example:

![Image represents a visualization of interval intersection.  A horizontal number line spans from 1 to 10, marked with integer values. Above the number line, two sets of intervals are shown, labeled 'intervals1:' and 'intervals2:'.  'intervals1:' contains two gray line segments; the first extends from approximately 1.5 to 4.5, and the second from approximately 5.5 to 6.5. 'intervals2:' shows three gray line segments; the first from approximately 2 to 7, the second from approximately 8 to 9.5, and the third from approximately 9 to 9.5. Below the number line, labeled 'intersections:', are three orange line segments representing the intersections of the intervals above. The first orange segment spans from approximately 2 to 4.5, corresponding to the overlap between the first segment of 'intervals1' and the first segment of 'intervals2'. The second orange segment extends from approximately 5.5 to 6.5, showing the overlap between the second segment of 'intervals1' and the first segment of 'intervals2'. The third orange segment is a short line at approximately 9, representing the intersection of the second segment of 'intervals2' and the third segment of 'intervals2'.  Dashed vertical lines connect the endpoints of the intervals to the number line for clarity.](/assets/images/dsa/intervals/711863e311a1981a.webp)

```python
Input: intervals1 = [[1, 4], [5, 6], [9, 10]],
       intervals2 = [[2, 7], [8, 9]]
Output: [[2, 4], [5, 6], [9, 9]]
```

#### Constraints:

- For every index i in intervals1 , intervals1[i].start < intervals1[i].end .
- For every index j in intervals2 , intervals2[j].start < intervals2[j].end .

## Intuition

We’re given two arrays of intervals, each containing non-overlapping intervals. This implies an overlap can only occur between an interval from the first array and an interval from the second array.

Let’s start by learning how to identify an overlap between two overlapping intervals.

**Identifying the overlap between two overlapping intervals** We know from the *Merge Overlapping Intervals* problem that two intervals, A and B, **overlap when A.end ≥ B.start , assuming we know A starts before B**. Let’s have a look at a couple of examples which each contain two overlapping intervals that match this condition:

![Image represents two Gantt chart-like diagrams illustrating the temporal relationship between two processes, A and B.  Both diagrams use a horizontal axis numbered 1 through 7, representing time units.  The first diagram shows process A spanning from approximately time unit 1.5 to 4, labeled 'A.end' at its right endpoint. Process B is represented by a thicker line spanning from approximately time unit 2 to 7, labeled 'B.start' at its left endpoint and 'B' mid-line.  The second diagram shows a similar setup, but with process B (labeled 'B' mid-line and 'B.start' at its left endpoint) now significantly shorter, spanning only from approximately time unit 2.5 to 3.5. Process A (labeled 'A' mid-line and 'A.end' at its right endpoint) remains largely unchanged in its duration and position, spanning from approximately time unit 1.5 to 4.  The diagrams visually compare scenarios where process B's duration changes, while process A's duration and position remain relatively constant.](/assets/images/dsa/intervals/d0f0c396f57b9f34.webp)

To extract the overlap between these two overlapping intervals, we’ll need to identify when it starts and ends.

- The overlap starts at the furthest start point, which is always `B.start`.
- The overlap ends at the earliest end point (`min(A.end, B.end)`).

![Image represents two diagrams illustrating a coding pattern, likely related to scheduling or resource allocation.  Each diagram shows a number line spanning from 1 to 7.  On each, a black line segment labeled 'A' represents a task or resource with a defined start and end point. A second black line segment labeled 'B' overlaps partially with 'A', also indicating a start and end point.  In the left diagram, 'B' extends beyond 'A's end, while in the right diagram, 'B' is entirely contained within 'A'.  In both, an orange line segment labeled 'B.start' marks the beginning of 'B'.  Its end is determined by `min(A.end, B.end)`, calculated separately below each diagram.  This calculation shows that 'B's end is truncated to match 'A's end in the left diagram (`= A.end`), and 'B's end remains unchanged in the right diagram (`= B.end`). The dashed orange lines highlight the boundaries used in the calculation, visually demonstrating how the end of 'B' is adjusted based on the relative positions of 'A' and 'B'.](/assets/images/dsa/intervals/b371e6805001c27f.webp)

Therefore, when two intervals overlap, their overlap is defined by the range **[ B.start , min(A.end, B.end) ]**. Remember that in all these cases, interval A always starts first.

**Identifying all overlaps** Now, let’s return to the two arrays of intervals. Consider this example:

![Image represents a visualization of two sets of intervals, labeled 'intervals1' and 'intervals2,' displayed on a common numerical scale ranging from 1 to 10.  'intervals1' consists of three distinct intervals: the first spans from approximately 2 to 4, the second from approximately 5 to 6, and the third from approximately 9 to 10. Each interval is represented by a thick horizontal line segment with perpendicular short lines at its endpoints indicating the start and end points. 'intervals2' shows two intervals: a longer one extending from approximately 2 to 7, and a shorter one from approximately 8 to 9, also represented by thick horizontal line segments with perpendicular short lines at their endpoints. A light gray horizontal arrow indicates the shared numerical scale beneath both sets of intervals, with numbers 1 through 10 marked along its length.  The arrangement allows for a visual comparison of the overlapping and non-overlapping portions of the intervals in both sets.](/assets/images/dsa/intervals/3b3201c01a6dd2f9.webp)

Let’s start by considering the first interval from each array:

![Image represents a visualization of two sets of intervals, labeled 'intervals1' and 'intervals2,' displayed on a number line ranging from 1 to 10.  'intervals1' shows a thick black line segment extending from approximately 2 to 4, with a smaller orange square labeled 'i' pointing down to its right endpoint (4). 'intervals2' displays a thick black line segment spanning roughly from 2 to 7, with a smaller orange square labeled 'j' pointing down to its right endpoint (7).  Both sets also include shorter, lighter gray line segments representing additional intervals: one in 'intervals1' from approximately 5 to 6, and two in 'intervals2,' one from approximately 7 to 8 and another from approximately 9 to 10. The arrangement suggests a comparison or interaction between the two interval sets, possibly illustrating an algorithm or process involving iterators 'i' and 'j' traversing through these intervals.](/assets/images/dsa/intervals/0aed0ab24ca703ed.webp)

To check if these intervals overlap, we’ll need to identify which interval between `intervals1[i]` and `intervals2[j]` starts first, so we can assign that interval as interval A and the other as interval B. The code snippet for this is provided below:

```python
# Set A to the interval that starts first and B to the other interval.
if intervals1[i].start <= intervals2[j].start:
    A, B = intervals1[i], intervals2[j]
else:
    A, B = intervals2[j], intervals1[i]
```

In this example, `intervals1[i]` starts first:

![Image represents a visualization of two sets of intervals, labeled 'intervals1' and 'intervals2,' displayed on a shared numerical scale ranging from 1 to 10.  'intervals1' shows a thick black line segment, labeled 'A,' extending from approximately 2.5 to 4.  Two thinner, grey line segments are also present in 'intervals1,' one starting around 4.5 and ending around 5.5, and another starting around 8.5 and ending around 9.5. 'intervals2' displays a thick black line segment, labeled 'B,' spanning from approximately 2 to 7.  Two shorter, grey line segments are also shown in 'intervals2,' one starting around 7.5 and ending around 8.5, and another starting around 9 and ending around 10.  The numerical scale at the bottom provides a reference for the positions of these intervals.  The intervals are represented visually as line segments, with their endpoints indicating the start and end points of each interval. The thicker black lines represent the primary intervals of interest, while the thinner grey lines represent secondary or additional intervals.](/assets/images/dsa/intervals/5061d7d714b60500.webp)

A and B overlap when `A.end ≥ B.start`, which is true here. Since they overlap, let’s record their overlap: [`B.start`, `min(A.end, B.end)`]:

![Image represents a visualization of interval intersection.  A horizontal number line spans from 1 to 10. Two intervals, labeled 'intervals1' and 'intervals2,' are depicted above the number line. 'intervals1' is represented by a thick black line segment labeled 'A' extending from approximately 1.5 to 4 on the number line. 'intervals2' is shown as a thick black line segment labeled 'B' extending from approximately 2 to 7.  Both intervals have small perpendicular lines at their start and end points.  Below the number line, in orange, is the 'intersections' section showing the overlapping portion of the two intervals. This intersection is a thick orange line segment starting at 2 (labeled 'B.start') and ending at 4 (labeled as the result of the formula 'min(A.end, B.end) = A.end'). Dashed orange vertical lines connect the start and end points of the intersection to the corresponding points on the intervals above.  Additional short grey line segments are present above the number line, representing other intervals not directly involved in the intersection calculation.](/assets/images/dsa/intervals/f4e3e2cff832f210.webp)

Now that we’ve identified the overlap between those two intervals, let’s move on to the next pair by advancing the pointer at one of the interval arrays. Since `intervals1[i]` ends before `intervals2[j]`, we know that `intervals1[i]` won’t overlap with any more intervals from the `intervals2` array, so let’s increment the `intervals1` pointer (`i`) to move to the next interval in this array:

![Image represents a visualization of two sets of intervals, labeled 'intervals1' and 'intervals2,' displayed on a shared numerical axis ranging from 1 to 10.  'intervals1' shows a dark gray line segment extending from approximately 2 to 4, and another shorter, black segment from 5 to 6. 'intervals2' is represented by a dark gray line segment spanning from approximately 2 to 7, and a lighter gray segment from 8 to 10.  Orange boxes labeled 'i' and 'j' are positioned above the intervals.  A dashed orange line connects 'j' to a point near the end of the first 'intervals1' segment (around 4), and a solid orange arrow points from 'i' down to the beginning of the second 'intervals1' segment (at 5).  Another solid orange arrow points downwards from 'j' to the point where the second 'intervals1' segment begins (at 5). This suggests a relationship or interaction between the intervals, possibly indicating an algorithm comparing or merging them, where 'i' and 'j' represent iterators or pointers within the algorithm.](/assets/images/dsa/intervals/e2c860311bab66ed.webp)

Note, we use `intervals1[i]` and `intervals2[j]` instead of A and B since we don’t know which interval array A or B belongs to.

We’ve now identified a process that allows us to identify and record all overlaps while traversing the arrays of intervals. For the pair of intervals being considered at `i` and `j`:

1. Set A as the interval that starts first, and B as the other interval.
2. Check if A.end ≥ B.start to see if these intervals overlap. If they do, record the overlap as [ B.start , min(A.end, B.end) ].
3. Whichever interval ends first, advance its corresponding pointer to move to the next interval.

Continue to apply these steps until either `i` or `j` have passed the end of their array. Once this happens, we know there won’t be any more overlapping intervals.

## Implementation

```python
from typing import List
from ds import Interval
   
def identify_all_interval_overlaps(intervals1: List[Interval], intervals2: List[Interval]) -> List[Interval]:
   overlaps = []
   i = j = 0
   while i < len(intervals1) and j < len(intervals2):
       # Set A to the interval that starts first and B to the other interval.
       if intervals1[i].start <= intervals2[j].start:
           A, B = intervals1[i], intervals2[j]
       else:
           A, B = intervals2[j], intervals1[i]
       # If there's an overlap, add the overlap.
       if A.end >= B.start:
           overlaps.append(Interval(B.start, min(A.end, B.end)))
       # Advance the pointer associated with the interval that ends first.
       if intervals1[i].end < intervals2[j].end:
           i += 1
       else:
           j += 1
   return overlaps
```

### Complexity Analysis

**Time complexity:** The time complexity of `identify_all_interval_overlaps` is O ( n + m ) O(n+m) O ( n + m ) where n n n and m m m are the lengths of `intervals1` and `intervals2`, respectively. This is because we traverse each interval in both arrays exactly once.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ). Note that the overlaps array is not considered because space complexity is only concerned with extra space used and not space taken up by the output.
