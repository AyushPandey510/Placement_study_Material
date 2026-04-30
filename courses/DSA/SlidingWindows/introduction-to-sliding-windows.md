---
title: "Introduction To Sliding Windows"
course: "DSA"
topic: "SlidingWindows"
source: "/home/ayush/OOD-Design-Principles/DSA/SlidingWindows/Introduction to Sliding Windows.html"
---
## Intuition

The sliding window technique is a subset of the two-pointer pattern, as it uses two pointers (generally left and right) to define the bounds of a "window" in iterable data structures like arrays. The window defines a subcomponent of the data structure (e.g., a subarray or substring), and it *slides* across the data structure unidirectionally, typically searching for a subcomponent that meets a certain requirement.

![The image represents a sliding window concept often used in algorithms.  It shows a sequence of elements represented by dots enclosed in square brackets `[ . . . . . . ]`. A light-blue rectangular area highlights a subset of these elements, labeled 'window'.  Two rectangular boxes, labeled 'left' and 'right,' are positioned above the sequence.  A downward-pointing arrow connects 'left' to the leftmost dot within the window, and a similar arrow connects 'right' to the rightmost dot within the window.  A light-blue upward-pointing arrow labeled 'window' indicates that this window can move along the sequence.  The arrangement visually demonstrates how the window's position is controlled by the 'left' and 'right' pointers, allowing it to slide across the data sequence, processing a fixed-size subset at a time.](/assets/images/dsa/slidingwindows/171049a60020bb40.webp)

Sliding windows are particularly valuable in scenarios where algorithms might otherwise rely on using two nested loops to search through all possible subcomponents to find an answer, resulting in an O ( n 2 ) O(n^2) O ( n 2 ) time complexity, or worse. When using a sliding window, the subcomponent(s) we’re looking for can usually be found in O ( n ) O(n) O ( n ) time, in comparison. But before discussing how they work, let’s establish some terminology:

- To expand the window is to advance the right pointer:
- To shrink the window is to advance the left pointer:
- To slide the window is to advance both the left and right pointers: Note that sliding is equivalent to expanding and shrinking the window at the same time.

Now, let’s break down the two main types of sliding window algorithms:

1. Fixed sliding window.
2. Dynamic sliding window.

### Fixed Sliding Window

A fixed sliding window maintains a specific length as it slides across a data structure.

![Image represents a visual depiction of coding patterns related to window manipulation.  The image shows three sequential stages.  Each stage features a light-blue rectangular 'window' containing several black dots representing data elements, enclosed in square brackets.  Above each window, rectangular boxes labeled 'left' (in gray) and 'right' (in orange) indicate directional operations.  In the first stage, a gray 'left' box points down with a solid arrow to the leftmost dot, while an orange 'right' box points down with a dashed orange arrow to a dot near the right edge.  The text below the first window reads 'expand window to desired size,' indicating that the window expands to accommodate new data.  The second and third stages depict a 'slide' operation.  Here, the 'left' and 'right' boxes point to the leftmost and rightmost dots respectively, using dashed orange arrows.  The text 'slide' appears below the second and third windows.  Solid black arrows connect the stages, showing the transition from expanding the window to sliding it.  The overall diagram illustrates how data is added to (expand) and then moved within (slide) a window, showcasing different data manipulation techniques.](/assets/images/dsa/slidingwindows/0ac00bedfc912168.webp)

We use the fixed sliding window technique when the problem asks us to **find a subcomponent of a certain length**. If we know what this length is, we can fix our window to that length and slide it through the array.

If a fixed window of length k traverses a data structure from start to finish, it’s guaranteed to see every subcomponent of length k in that data structure.

Below is a generic template of how a fixed sliding window traverses a data structure.

```python
left = right = 0
while right < n:
    # If the window has reached the expected fixed length, we slide the window (move
    # both left and right).
    if right - left + 1 == fixed_window_size:
        # Process the current window.
        result = process_current_window()
        left += 1
    right += 1
```

### Dynamic Sliding Window

Unlike fixed sliding windows, dynamic windows can expand or shrink in length as they traverse a data structure.

![Image represents a sequence of three diagrams illustrating a data structure manipulation.  The first diagram shows a light-blue rounded rectangle representing a data structure containing several black dots, enclosed in square brackets.  A grey box labeled 'left' points down with an arrow to the leftmost dot, and an orange box labeled 'right' points down with an arrow to a dot near the right edge.  Orange dashed lines connect the dots, indicating an expansion of the structure. The label 'expand' is below the rectangle.  A solid arrow points to the second diagram, which shows the same structure but with fewer dots, labeled 'shrink,' indicating a reduction in size.  The 'left' and 'right' boxes similarly point to the leftmost and rightmost dots, respectively.  Finally, a solid arrow leads to the third diagram, which is identical in structure to the first, again labeled 'expand,' showing the data structure expanding again.  The 'left' and 'right' boxes maintain their positions and directional arrows.  The overall sequence demonstrates a dynamic data structure that can expand and shrink, with the 'left' and 'right' labels possibly indicating pointers or access points to the structure's boundaries.](/assets/images/dsa/slidingwindows/0782c8ce64a2ad0d.webp)

Generally, dynamic sliding windows can be applied to problems that ask us to **find the longest or shortest subcomponent that satisfies a condition** (for example, a condition could be that the numbers in the window must be greater than 10).

When finding the longest subcomponent, the dynamics of expanding and shrinking are typically as follows:

- If a window satisfies the condition, expand it to see if we can find a longer window that also meets the condition.
- If the condition is violated, shrink the window until the condition is met again.

Below is a generic template demonstrating how this works:

```python
left = right = 0
while right < n:
    # While the condition is violated, the window is invalid, so shrink the window by
    # advancing the left pointer.
    while condition is violated:
        left += 1
    # Once the window is valid, process it and then expand the window by advancing the
    # right pointer.
    result = process_current_window()
    right += 1
```

Note that the provided templates for fixed and dynamic windows primarily emphasize the movement of the left and right pointers rather than the specifics of updating the window itself. If the problem requires updating the window, the logic around it will be highly context-dependent. This is explored in detail through specific problems in this chapter.

## Real-world Example

**Buffering in video streaming**: In video streaming, a dynamic sliding window can be used to manage buffering and ensure smooth playback.

For instance, when streaming a video, the player downloads chunks of the video data and stores them in a buffer. A sliding window controls which part of the video is buffered, with the window "sliding" forward as the video plays. The sliding window ensures the video player can adapt to varying network conditions by dynamically adjusting the buffer size and position, leading to a smoother streaming experience for the viewer.

## Chapter Outline

![Image represents a hierarchical diagram illustrating the concept of 'Sliding Windows' in coding patterns.  At the top, a rounded rectangle labeled 'Sliding Windows' acts as the parent node.  From this node, two dashed lines descend, each pointing to a child node represented by a rounded rectangle with a dashed border. The left child node is labeled 'Fixed Sliding Window' and contains a single bullet point: 'Substring Anagrams'. The right child node is labeled 'Dynamic Sliding Window' and contains two bullet points: 'Longest Substring With Unique Characters' and 'Longest Uniform Substring After Replacements'.  The arrangement shows that 'Sliding Windows' is a broader category encompassing both 'Fixed Sliding Window' and 'Dynamic Sliding Window' approaches, with specific problem examples listed under each subtype.  No URLs or parameters are present.](/assets/images/dsa/slidingwindows/d6e1eb4e13967e97.webp)
