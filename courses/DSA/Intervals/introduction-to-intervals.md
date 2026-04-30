---
title: "Introduction To Intervals"
course: "DSA"
topic: "Intervals"
source: "/home/ayush/OOD-Design-Principles/DSA/Intervals/Introduction to Intervals.html"
---
## Intuition

An interval consists of two values: a start point and an end point. It represents a continuous segment on the number line that includes all values between these two points. It is often used to represent a line, time period, or a continuous range of values.

- An interval’s start point indicates where the interval begins.
- An interval’s end point indicates where the interval ends.

![Image represents a simple horizontal timeline diagram illustrating a process or sequence.  The diagram consists of a thick, black horizontal line extending from left to right.  At the leftmost end of the line is a thick, vertical black bar labeled 'start,' indicating the beginning of the process.  At the rightmost end of the line is a similar thick, vertical black bar labeled 'end,' signifying the completion of the process. The length of the horizontal line visually represents the duration or extent of the process between the start and end points. No other elements, such as intermediate points or annotations, are present on the line itself.](/assets/images/dsa/intervals/d22c6fafd2eec220.webp)

Intervals can be closed, open, or half-open, based on whether their start or end points are included in the interval.

- **Closed intervals:** Both the start and end points are included in the interval.

![Image represents a line segment with thick, black endpoints and a thick, black line connecting them.  The endpoints are labeled with the numbers '3' and '8', vertically aligned below their respective positions on the line.  The line segment visually represents a range or interval from 3 to 8, implying a continuous sequence of values within that range. No other information, such as URLs or parameters, is present in the image. The arrangement is simple and linear, with the numbers clearly indicating the start and end points of the represented range.](/assets/images/dsa/intervals/229b9b1d6ab8725e.webp)

- **Open intervals:** The start and end points are not included in the interval.

![The image represents a simple line graph or diagram illustrating a relationship between two data points.  A thick, horizontal, black line connects two filled circles, which act as markers for the data points.  The leftmost circle is vertically aligned with the number '3', positioned below it, indicating a value of 3 for that data point. Similarly, the rightmost circle is vertically aligned with the number '8', positioned below it, representing a value of 8 for the second data point. The line connecting the circles visually represents the relationship or connection between these two data points (3 and 8), suggesting a direct link or transition between them.  No other labels, text, URLs, or parameters are present in the image.](/assets/images/dsa/intervals/6b215b3e41eab16c.webp)

- **Half-open intervals:** Either the start or the end point is included, while the other is not.

![Image represents two identical line segments, each visually depicting a range.  Both segments are thick, black lines horizontally oriented.  Each line starts with a thick, black vertical bar on the left, labeled '3' vertically below it, and ends with a similar vertical bar on the right, labeled '8' vertically below it. The numbers '3' and '8' likely represent the start and end points of a numerical range, respectively. The two line segments are placed side-by-side with a small gap between them, suggesting a comparison or parallel representation of the same range. No other elements, such as arrows, labels, or text beyond the '3' and '8' markers, are present in the image.](/assets/images/dsa/intervals/1e194483ea1eed57.webp)

When presented with an interval problem in an interview, It’s important to clarify whether the intervals are open, closed, or half-open, as this can change the nature of how intervals overlap.

**Overlapping intervals** Two intervals overlap if they share at least one common value.

![Image represents a visual depiction of an overlap between two intervals on a number line.  A light green rectangle labeled 'overlap' is positioned between points 4 and 6 on the horizontal axis.  A thick black line extends from point 2 to the left edge of the rectangle at point 4, representing the first interval.  Another thick black line extends from the right edge of the rectangle at point 6 to point 7, representing the second interval.  The numbers 2, 4, 6, and 7 are marked on the axis, indicating the start and end points of the intervals. The overlap region, visually represented by the green rectangle, shows the shared portion between the two intervals, highlighting the concept of overlapping ranges.](/assets/images/dsa/intervals/768f384d60cce319.webp)

The central challenge in most interval problems involves managing overlapping intervals effectively. Whether identifying or merging overlapping intervals, it’s important to determine how the overlap between intervals influences the desired outcome of the problem. The problems in this chapter involve handling overlapping intervals in varying situations.

**Sorting intervals** In most interval problems, sorting the intervals before solving the problem is quite helpful since it allows them to be processed in a certain order.

We usually **sort intervals by their start point** so they can be traversed in chronological order. When two or more intervals have the same start point, we might also need to consider each interval’s end points during sorting.

**Separating start and end points** In certain scenarios, it might be beneficial to process the start and end points of intervals separately. This usually involves creating two sorted arrays: one containing all start points and another containing all end points. For example, this is needed in the sweeping line algorithm, which is explored in the *Largest Overlap of Intervals* problem.

![Image represents a data structure illustrating the concept of intervals.  The top line defines a list named `intervals` containing five sub-lists, each representing an interval. These sub-lists are `[1, 6]`, `[2, 4]`, `[5, 9]`, `[8, 10]`, and `[10, 12]`. The second line shows a list called `start points` containing the start values of each interval, extracted from the `intervals` list: `[1, 2, 5, 8, 10]`.  These values are highlighted in cyan. The third line displays a list named `end points`, which contains the corresponding end values of each interval from the `intervals` list: `[4, 6, 9, 10, 12]`. These values are highlighted in orange.  The arrangement visually demonstrates how the `start points` and `end points` lists are derived from the `intervals` list, showing a clear relationship between the intervals and their constituent start and end points.](/assets/images/dsa/intervals/3a57b0fa45f94823.webp)

**Interval class definition** For the problems in this chapter, intervals are represented using the class below.

```python
class Interval:
   def __init__(self, start, end):
       self.start = start
       self.end = end
```

## Real-world Example

**Scheduling systems:** Intervals are widely used in scheduling systems. For instance, in a conference room booking system, each booking is represented as an interval. The interval representation is used if the system requires functionality, such as determining the maximum number of overlapping bookings to ensure sufficient room availability. By analyzing these intervals, the system can efficiently allocate resources and prevent double bookings.

## Chapter Outline

![Image represents a hierarchical diagram illustrating two common coding patterns related to interval management.  A rounded rectangle at the top, labeled 'Intervals,' acts as the parent node, connected via dashed lines to two child nodes represented as rounded rectangles with dashed borders. The left child node is titled 'Managing Overlaps' and lists two sub-tasks: 'Merge Overlapping Intervals' and 'Identify All Interval Overlaps.' The right child node is titled 'Finding Values in Sorted Order' and contains a single sub-task: 'Largest Overlap of Intervals.'  The arrangement shows that 'Intervals' is a broader category encompassing two distinct approaches: one focused on managing overlapping intervals (merging and identifying them), and the other on finding specific values within sorted intervals (identifying the largest overlap).  The dashed lines indicate a hierarchical relationship, showing that the two lower-level nodes are specific applications or sub-problems within the broader context of 'Intervals.'](/assets/images/dsa/intervals/79608645e5c14ce2.webp)
