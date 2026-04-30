---
title: "Weighted Random Selection"
course: "DSA"
topic: "BinarySearch"
source: "/home/ayush/OOD-Design-Principles/DSA/BinarySearch/Weighted Random Selection.html"
---
Given an array of items, each with a corresponding weight, implement a function that **randomly selects an item from the array**, where the probability of selecting any item is proportional to its weight.

In other words, the probability of picking the item at index `i` is: `weights[i] / sum(weights)`.

Return the index of the selected item.

#### Example:

```python
Input: weights = [3, 1, 2, 4]
```

Explanation: `sum(weights) = 10` 3 has a 3/10 probability of being selected. 1 has a 1/10 probability of being selected. 2 has a 2/10 probability of being selected. 4 has a 4/10 probability of being selected. For example, we expect index 0 to be returned 30% of the time.

#### Constraints:

- The `weights` array contains at least one element.

## Intuition

A completely uniform random selection implies every index has an equal chance of being selected. A *weighted* random selection means some items are more likely to be picked than others. If we repeatedly perform a random selection many times, the frequency of each index being picked will match their expected probabilities.

The challenge with this problem is determining a method to randomly select an index based on its probability.

Let’s say we had weights 1 and 4 for indexes 0 and 1, respectively:

![Image represents a Python code snippet assigning a list of weights.  The snippet shows the variable `weights` being assigned a list containing two numerical values: 1 and 4.  The assignment is represented using the equals sign (`=`). The list is denoted by square brackets (`[` and `]`).  The numbers 0 and 1 are faintly visible below the numbers 1 and 4 respectively, possibly indicating indices or positions within the list.  There is no other information, such as URLs or parameters, present in the image. The overall structure is a simple variable assignment statement common in programming languages.](/assets/images/dsa/binarysearch/6dc44c06ff427a2a.webp)

Here, index 1 should be selected with a probability of 4/5, significantly higher than index 0’s probability of 1/5:

![Image represents a simple illustration of weight normalization in a context likely related to machine learning or weighted averaging.  The top line shows a Python-like variable assignment, `weights = [1 4]`, defining a weight vector with two elements: 1 and 4.  Below, these weights are individually depicted with small downward arrows pointing to their normalized counterparts.  The normalization appears to be a simple division by the sum of the weights (1+4=5).  Therefore, the weight 1 is transformed into 1/5 (displayed in cyan), and the weight 4 is transformed into 4/5 (displayed in orange).  The small numbers '0' and '1' above the arrows likely represent indices indicating the position of each weight within the original vector. The overall diagram visually demonstrates the process of converting a set of weights into their normalized probability distribution.](/assets/images/dsa/binarysearch/2b14978da96fc239.webp)

A useful observation is that all probabilities have the same denominator (which is 5 in this case). Now, imagine we had a line with the same length as this denominator, and we divided this line into two segments of size 1 and 4, respectively:

![Image represents a horizontal bar chart or diagram illustrating a concept likely related to data partitioning or resource allocation.  The chart is composed of five rectangular sections arranged contiguously from left to right, each numbered sequentially from 1 to 5 below. The first section is colored light blue, while the remaining four sections are a light peach or beige color.  The sections are all of equal width and enclosed within a single, thick black border. The color difference between the first section and the others suggests a distinction, possibly representing a different category, status, or allocation of a resource. The numbers beneath each section likely represent identifiers or indices for each part, indicating their position or order within the whole.  The overall visual suggests a simple representation of a dataset or resource divided into five parts, with the first part differentiated from the rest.](/assets/images/dsa/binarysearch/fdfe7bef53fc7832.webp)

If we were to randomly pick a number on this line, we’d pick the first segment with a probability of 1/5 and the second segment 4/5 times. Now, imagine index 0 represents the first segment, and index 1 represents the second segment:

![Image represents a visual depiction of an array or list data structure.  The top section shows a horizontal rectangular block divided into five smaller, equal-width sections. The leftmost section is light blue and labeled 'index 0'. The remaining four sections are peach-colored and labeled 'index 1' (the second section), with the third, fourth, and fifth sections implicitly representing indices 2, 3, and 4 respectively, though not explicitly labeled. Below this top section, a second row displays the numbers 1, 2, 3, 4, and 5, each aligned vertically beneath its corresponding index in the top row. This arrangement visually maps each index to its associated value, illustrating how data is stored and accessed using indices in an array.  The overall structure suggests a simple, one-dimensional array with five elements.](/assets/images/dsa/binarysearch/57cdfd03fcf1de91.webp)

If we **randomly select a number on this line**, we’ll select index 0 with a probability of 1/5, and index 1 with a probability of 4/5. This reflects their expected probabilities.

What we need now is a way to identify which numbers on the number line correspond to which index so that when we pick a random number on this line, we know which index to return.

Before we continue, let’s establish the definitions of terms used in this explanation:

- “Weights” refers to the values of the elements in the weights array.
- “Indexes” refers to the indexes of the weights array.
- “Numbers” or “numbers on the number line” refers to the numbers from 1 to sum(weights).

**Determining which numbers on the number line correspond to which indexes** As mentioned before, to know which index to return, we need a way to tell which index our random number line number corresponds to. Consider a larger distribution of weights:

![Image represents a visual depiction of weighted indexing.  At the top, a list named 'weights' is defined as an array containing the integers [3, 1, 2, 4]. Below this, a horizontal bar is segmented into four color-coded sections, each labeled 'index 0,' 'index 1,' 'index 2,' and 'index 3,' respectively.  The bar is further divided into numbered units from 1 to 10.  Colored arrows connect the weights to the bar; a cyan arrow from the weight '3' points to the end of the 'index 0' section (at position 3), a green arrow from the weight '1' points to the end of the 'index 1' section (at position 4), an orange arrow from the weight '2' points to the end of the 'index 2' section (at position 6), and a magenta arrow from the weight '4' points to the end of the 'index 3' section (at position 8).  Each arrow's length visually represents the corresponding weight value, indicating how many units each index occupies within the bar.  The numbers above the arrows (0, 1, 2, 3) correspond to the index of the weight in the `weights` array.](/assets/images/dsa/binarysearch/a7aa06cb6b8ba732.webp)

One strategy is to use a hash map. In this hash map, each number on the line is a key, and its corresponding index is the value:

![Image represents a hash map, visualized as a table with two columns.  The left column, labeled 'number,' lists integers sequentially from 1 to 10. The right column, labeled 'index,' shows the corresponding index or bucket assigned to each number after a hashing operation.  The indices are color-coded for clarity: 0 is light blue, 1 is green, 2 is orange, and 3 is magenta.  Numbers 1, 2, and 3 hash to index 0; number 4 hashes to index 1; numbers 5 and 6 hash to index 2; and numbers 7, 8, 9, and 10 hash to index 3.  The table demonstrates how a hash function maps input numbers (keys) to different indices (values) in the hash map, potentially leading to collisions (multiple numbers mapping to the same index) as seen with indices 0, 2, and 3.](/assets/images/dsa/binarysearch/bb79489efb3fc85b.webp)

This method uses a lot of space because we need to store a key-value pair for each number on the number line. Let's consider some other more space-efficient methods.

A more efficient strategy is to store only the **endpoints of each segment** instead.

![Image represents a diagram illustrating a data structure, possibly an array or list.  The top section shows four color-coded blocks representing elements of the data structure. Each block is labeled with 'index' followed by a number (0, 1, 2, and 3), indicating its position within the structure.  The blocks are light blue, light green, light peach, and light pink respectively. Below this, a sequence of numbers (1 through 10) is displayed.  Numbers 3, 4, 6, and 10 are circled, suggesting a possible selection or highlighting of specific elements or indices.  There's an implied relationship between the top and bottom sections; the numbers below likely represent some form of access or operation on the elements, with the circled numbers potentially indicating specific actions or data points of interest within the data structure.  The overall arrangement suggests a visual representation of data access or manipulation using indices.](/assets/images/dsa/binarysearch/729be6bf1506c010.webp)

Naturally, the endpoint of a segment marks where that segment ends. It also helps us know where the next segment begins, as each new segment starts right after the previous one ends. This way, we can determine the start and end of each index’s segment.

By storing only the endpoints, we need to keep just `n` values, one for each endpoint. When storing these endpoints in an array, the array index of each endpoint is the same as its index value on the number line:

![Image represents a visual depiction of an array, specifically a one-dimensional array or list.  The array is enclosed in square brackets `[` and `]`.  The array contains four elements: 3, 4, 6, and 10. These elements are displayed horizontally, separated by spaces. Below each element, in a lighter gray font, is an index indicating its position within the array. The indices start from 0 and increment sequentially: 0 for the element 3, 1 for the element 4, 2 for the element 6, and 3 for the element 10.  The arrangement clearly shows the mapping between each element's value and its corresponding index within the array's structure.](/assets/images/dsa/binarysearch/b21824ef4ea5d80c.webp)

The question now is, how do we find these endpoints?

**Obtaining the endpoints of each index’s segment on the line** A key observation is that the endpoint of a segment is equal to the length of all previous segments, plus the length of the current segment. We can see how this works below:

![Image represents a diagram illustrating a cumulative sum pattern.  The top section shows a horizontally divided rectangle representing an array or list, segmented into four color-coded sections labeled 'index 0,' 'index 1,' 'index 2,' and 'index 3.' Below this, a sequence of numbers 1 through 10 is presented.  Arrows descend from numbers 3, 4, 6, and 10, pointing to expressions representing a cumulative sum.  Specifically, the arrow from 3 points to '3,' the arrow from 4 points to '3+1,' the arrow from 6 points to '3+1+2,' and the arrow from 10 points to '3+1+2+4.'  This visually demonstrates how each subsequent cumulative sum incorporates the preceding values, suggesting a pattern of iteratively adding elements from the sequence (potentially an array) to a running total.  The color-coding of the top section might indicate different segments or partitions within the data structure.](/assets/images/dsa/binarysearch/f6d10547713d891b.webp)

This demonstrates that each endpoint is a cumulative sum, suggesting we can obtain the endpoint of each segment by obtaining the **prefix sums** of the array of weights:

![Image represents a simple illustration of prefix sums.  The top line shows a list labeled 'weights' containing four integer values: 3, 1, 2, and 4, enclosed in square brackets, indicating an array or list data structure.  Below this, another list labeled 'prefix_sums' is shown, also enclosed in square brackets. This list contains the cumulative sums of the 'weights' list.  Specifically, the first element of 'prefix_sums' (3) is the same as the first element of 'weights'. The second element of 'prefix_sums' (4) is the sum of the first two elements of 'weights' (3 + 1). The third element (6) is the sum of the first three elements of 'weights' (3 + 1 + 2), and the final element (10) is the sum of all elements in 'weights' (3 + 1 + 2 + 4).  The arrangement visually demonstrates the direct relationship and calculation between the original 'weights' and their resulting 'prefix_sums'.](/assets/images/dsa/binarysearch/13008b182c269f4e.webp)

As we can see, the prefix sums array stores the endpoint of each segment.

Now, let's see how the prefix sums array helps us. When we pick a random number from 1 to 10, we need to determine which index it corresponds to using the prefix sum array. Let's see how we can do this.

**Using the prefix sums to determine which numbers correspond to which indexes** Let’s say we pick a random number from 1 to 10 and get 5. How can we use the prefix sum array to determine which index that 5 corresponds to? To determine the segment, we’ll need to find its corresponding endpoint. We know that:

- Either 5 itself is the endpoint, since 5 could be the endpoint of its own segment, or:
- The endpoint is somewhere to the right of 5 since its endpoint cannot be to the left.

Among all the endpoints to the right of 5, the closest one to 5 will be the endpoint of its segment. Endpoints farther away belong to different segments:

![Image represents a visual explanation of finding the closest endpoint to the right of a target value within a data structure.  A horizontal rectangular bar is divided into segments, each representing an element in a sequence.  The segments are color-coded: light blue for the first two elements (labeled 'index 0' and 'index 1'), light green for the next element ('index 2'), and light pink for the remaining elements ('index 3').  Below the bar, numerical values (1, 2, 3, 4, 5, 6, 7, 8, 9, 10) are aligned with the corresponding segments.  The target value, 'target = 5,' is specified above the bar.  The number 5 is highlighted within the bar in a peach color.  A circled number (6) is positioned below the segment containing the value 6, with an upward arrow pointing to it and the text 'closest endpoint to the right of 5' indicating that index 2 (containing the value 6) is the closest endpoint to the right of the target value 5.  The circled numbers (3, 4, 6, 10) seem to highlight specific indices or elements for illustrative purposes within the context of the algorithm being explained.](/assets/images/dsa/binarysearch/f83518bb9d726e8c.webp)

This means for any target, we’re looking for the **first prefix sum (endpoint) greater than or equal to the target**. Below, we can see which prefix sum first meets this condition for a target of 5:

![Image represents a depiction of prefix sums, showing an array `prefix_sums` initialized with values [3, 4, 6, 10].  The array is presented horizontally. Each element's value is displayed numerically. Below each element, a colored vertical line indicates its status:  'F' (in red) represents 'False', and 'T' (in green) represents 'True'. The first two elements (3 and 4) are marked with 'F', while the last two elements (6 and 10) are marked with 'T'. This suggests a visual representation of a boolean condition applied to the prefix sums, where the last two elements satisfy the condition and the first two do not.  The arrangement visually links the numerical value of each element with its corresponding boolean status.](/assets/images/dsa/binarysearch/9e76712b364afdfe.webp)

As we can see, the first prefix sum that satisfies this condition is the same as the lower-bound prefix sum that satisfies this condition. Therefore, we can perform a **lower-bound binary search** to find it.

Let’s see how this works over our example with a random target of 5. The **search space** should encompass all prefix sum values:

![Image represents a visual depiction of a two-pointer approach to finding a subarray with a target sum.  Two orange rectangular boxes labeled 'left' and 'right' point downwards towards an array represented by `prefix_sums = [3, 4, 6, 10]`.  Beneath each element of the `prefix_sums` array, its index (0, 1, 2, 3) is shown in gray. The number 6 in the `prefix_sums` array is highlighted in light green. A separate line indicates `target = 5`. The arrows from 'left' and 'right' visually suggest the movement of pointers across the `prefix_sums` array during the algorithm's execution, aiming to find a subarray whose sum equals the `target` value.  The highlighted '6' likely represents a point where the algorithm might find a solution (or a relevant intermediate state), given that the difference between consecutive prefix sums could be used to determine the sum of subarrays.](/assets/images/dsa/binarysearch/4b43a74cf4f0f2e7.webp)

Let’s begin narrowing the search space. Remember that we’re looking for the lower-bound prefix sum which satisfies the condition **prefix_sums[mid] ≥ target**.

The initial midpoint value is 4, which is less than the target of 5. This means the lower bound is somewhere to the right of the midpoint, so let’s narrow the search space toward the right:

![Image represents a visual depiction of a binary search algorithm's step within the context of prefix sums.  The diagram shows four labeled boxes: 'left,' 'mid,' and 'right' representing index pointers, and a dashed box containing a conditional statement.  'left' and 'mid' point downwards to an array [3, 4, 6, 10] with indices 0, 1, 2, and 3 respectively displayed below each element.  'right' also points downwards to the same array. Below the array, 'target = 5' is specified. The dashed box displays the condition 'prefix_sums[mid] < target,' which evaluates whether the prefix sum at the 'mid' index is less than the target value (5).  If true, as indicated by the arrow, the 'left' pointer is updated to 'mid + 1,' effectively narrowing the search space in a binary search fashion.  The light blue box around 'mid' and the blue arrow visually emphasize the current 'mid' index and its role in the conditional statement.](/assets/images/dsa/binarysearch/e0cafc2f8184ac88.webp)

![Image represents a visual depiction of a binary search algorithm's step.  A sorted array `[3, 4, 6, 10]` is shown with indices 0, 1, 2, and 3 labeled below each element.  A light gray rectangle labeled 'mid' points to the element '4' at index 1. An orange rectangle labeled 'left' points to the element '6' at index 2. A dark gray rectangle labeled 'right' points to the element '10' at index 3.  A dashed orange line connects the 'mid' label to the element '3' at index 0, indicating a comparison. A solid orange arrow points from 'left' to '6', showing the selection of the left subarray. A solid dark gray arrow points from 'right' to '10', showing the selection of the right subarray. The arrangement visually demonstrates the partitioning of the array during a binary search iteration, with the 'mid' element acting as the pivot for comparison and subsequent subarray selection.](/assets/images/dsa/binarysearch/5a6e7720b59341dc.webp)

The midpoint value is now 6, which is greater than the target. This midpoint satisfies our condition, so it could be the lower bound. If it isn’t, then the lower bound is somewhere further to the left. So, let’s narrow the search space toward the left while including the midpoint:

![Image represents a visual depiction of a binary search algorithm step within a coding pattern context.  The top shows three labeled boxes: 'left,' 'mid' (highlighted in cyan), and 'right.' Arrows point downwards from 'left' and 'right' to the array [3, 4, 6, 10], indicating index positions 0, 2, and 3 respectively.  The 'mid' box points to the element '6' at index 2. Below the array, 'target = 5' is specified. A dashed box to the right shows a conditional statement: 'prefix_sums[mid] ≥ target,' which evaluates whether the prefix sum at the midpoint (6 in this case) is greater than or equal to the target (5).  A right-pointing arrow from this condition leads to the assignment 'right = mid,' indicating that if the condition is true, the right boundary of the search space is updated to the midpoint.  The overall diagram illustrates a single iteration of a binary search, where the algorithm checks if the prefix sum at the midpoint meets or exceeds the target value to refine the search range.](/assets/images/dsa/binarysearch/9debd00ad9e9b24f.webp)

![The image represents a visual depiction of a data structure, possibly an array or list, undergoing a partitioning process, likely as part of a sorting algorithm like Quicksort.  A gray horizontal line shows an array segment with elements '3' and '4' at indices 0 and 1 respectively, enclosed in square brackets.  Below this, the indices 0 and 1 are labeled. Separately, the number '6' is shown, representing a pivot element.  Two rectangular boxes labeled 'left' (gray) and 'right' (orange) indicate pointers or indices. A solid gray arrow from 'left' points to '6', and an orange arrow from 'right' also points to '6'.  A dashed orange curved line connects '6' to an element '10' at index 3 (labeled below), which is also part of the array segment, enclosed in square brackets.  The arrangement suggests that the 'left' and 'right' pointers are converging towards the pivot '6' during the partitioning phase, with '10' being an element greater than the pivot that needs to be moved.](/assets/images/dsa/binarysearch/2fd51785f5ef6827.webp)

Now, the left and right pointers have met with the search space consisting of a single value which represents the lower bound. So, we can exit the binary search and return the index that corresponds to this prefix sum: left:

![Image represents a diagram illustrating a coding pattern, possibly related to binary search or a similar algorithm.  At the top, two orange rectangular boxes labeled 'left' and 'right' are shown, with downward-pointing arrows indicating data flow. Below, a horizontally oriented array or list is depicted, showing the elements [3, 4, 6, 10] with their indices [0, 1, 2, 3] displayed underneath.  The 'left' and 'right' labels appear to represent pointers or indices into this array.  The arrows from 'left' and 'right' point to the element '6' in the array, suggesting that these pointers are converging on a specific element. To the right, a light gray, dashed-line rectangle contains the conditional statement 'left == right' followed by a right-pointing arrow and the action 'return left'. This indicates that if the left and right pointers are equal, the algorithm returns the value at the left pointer's index. The overall diagram visualizes a search or comparison process where two pointers move towards each other until they meet, at which point a result is returned.](/assets/images/dsa/binarysearch/0960d3dd7e0803af.webp)

## Implementation

```python
from typing import List
import random
    
class WeightedRandomSelection:
    def __init__(self, weights: List[int]):
        self.prefix_sums = [weights[0]]
        for i in range(1, len(weights)):
            self.prefix_sums.append(self.prefix_sums[-1] + weights[i])
      
    def select(self) -> int:
        # Pick a random target between 1 and the largest endpoint on the number
        # line.
        target = random.randint(1, self.prefix_sums[-1])
        left, right = 0, len(self.prefix_sums) - 1
        # Perform lower-bound binary search to find which endpoint (i.e., prefix
        # sum value) corresponds to the target.
        while left < right:
            mid = (left + right) // 2
            if self.prefix_sums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left
```

### Complexity Analysis

**Time complexity:** The time complexity of the constructor is O ( n ) O(n) O ( n ) because we iterate through each weight in the weights array once. The time complexity of select is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) since we perform binary search over the `prefix_sums` array.

**Space complexity:** The space complexity of the constructor is O ( n ) O(n) O ( n ) due to the `prefix_sums` array. The space complexity of select is O ( 1 ) O(1) O ( 1 ).
