---
title: "Maximum Subarray Sum"
course: "DSA"
topic: "DynamicProgramming"
source: "/home/ayush/OOD-Design-Principles/DSA/DynamicProgramming/Maximum Subarray Sum.html"
---
Given an array of integers, return the `sum` of the subarray with the **largest sum**.

#### Example:

```python
Input: nums = [3, 1, -6, 2, -1, 4, -9]
Output: 5
```

Explanation: subarray `[2, -1, 4]` has the largest sum of 5.

#### Constraints:

- The input array contains at least one element.

## Intuition

Brute force approaches to this problem involve calculating the sum of every possible subarray. This would take at least O ( n 2 ) O(n^2) O ( n 2 ) time, where n n n denotes the length of the array. So, let’s consider alternative methods.

The challenge with this problem lies in the presence of negative numbers. If the array consisted entirely of non-negative numbers, the answer would simply be the sum of the entire array.

To find the maximum sum given the presence of negative numbers, let’s try keeping track of the sum of a contiguous subarray, starting at index 0.

As this subarray expands and we add each number to the running sum, we’ll need to decide whether to continue with the current subarray’s sum, or start a new subarray beginning with the current element. To understand how we might make such a decision, let’s dive into an example.

Consider the following input array:

![Image represents a one-dimensional array or list of integers.  The array is enclosed in square brackets `[` and `]`.  The integers within the array are `3`, `1`, `-6`, `2`, `-1`, `4`, and `-9`, each separated by a space.  Below each integer, in a lighter gray font, are the corresponding indices of the array, starting from 0 and incrementing sequentially: `0`, `1`, `2`, `3`, `4`, `5`, and `6`.  There are no visible connections or information flow between the elements other than their sequential arrangement within the array structure, implicitly indicating that each integer is accessible via its index.](/assets/images/dsa/dynamicprogramming/b28c5f675e59f439.webp)

The first two values of the array are positive, so we can continue expanding the current subarray by adding these to our sum (`curr_sum`), initialized at 0:

![Image represents a visual depiction of an array and a variable update.  An array `num` is shown, containing the integer elements [3, 1, -6, 2, -1, 4, -9], with each element's index displayed below it (0 through 6).  A downward-pointing orange arrow labeled 'num' points to the first element of the array, the number 3, which is highlighted in a peach-colored circle.  To the right, a dashed-line box shows the variable `curr_sum` being updated. The expression `curr_sum += 3` indicates that 3 is added to the current value of `curr_sum`, resulting in a new value of 3, as shown by `curr_sum = 3`.  The diagram illustrates the process of accessing and using a specific element (the first element) from an array within a calculation.](/assets/images/dsa/dynamicprogramming/e8946e62ef2e52fd.webp)

![Image represents a visual depiction of an array and an operation performed on it.  A numerical array `[3, 1, -6, 2, -1, 4, -9]` is shown, with each element indexed from 0 to 6 below it.  An orange arrow labeled 'num' points downwards to the element at index 1, which is the number 1, highlighting it as the current element being processed.  To the right, a dashed-line box shows the operation being performed: `curr_sum += 1`, indicating that 1 is being added to a variable named `curr_sum`. Below this, `= 4` shows the resulting value of `curr_sum` after the addition.  The diagram illustrates a step in an iterative process, likely summing the elements of the array, with the highlighted element contributing to the running sum.](/assets/images/dsa/dynamicprogramming/57505b12588d4906.webp)

When we reach index 2, we land on the first negative number (-6). Adding it to the current sum gives us a negative sum of -2.

What should we do now? If we restart the subarray at this point, the new subarray will start with a sum of -6, which is less than the current sum of -2.

![Image represents a visual depiction of a step in an algorithm, likely involving array processing and sum calculation.  A peach-colored highlighted section of an array `[3 1 -6 2 -1 4 -9]` is shown, with the element `-6` at index 2 indicated by an orange downward-pointing arrow labeled 'num'. This suggests that the algorithm is currently processing the element at index 2. To the right, a light gray box represents a variable named `curr_sum`.  Inside this box, the calculation `curr_sum += -6` is shown, indicating that -6 is being added to the current value of `curr_sum`. Below this, `= -2` shows the resulting value of `curr_sum` after the addition. A rightward-pointing arrow labeled 'larger' connects to the `-2`, suggesting that this value is being compared or used to determine a 'larger' value in a subsequent step of the algorithm.  The array indices are displayed below the array elements, ranging from 0 to 6.](/assets/images/dsa/dynamicprogramming/a0a11e0764ae6b3a.webp)

![Image represents a step-by-step illustration of a coding pattern, likely related to finding the minimum value in an array.  The top shows the word 'num' in orange, with a downward arrow pointing to a peach-colored circle containing '-6'. This circle is positioned within a larger array representation: `[3, 1, -6, 2, -1, 4, -9]`, with each element's index (0-6) displayed below it. The '-6' in the circle is highlighted, indicating the current element being processed. To the right, a dashed-line box displays 'curr_sum = -6', representing the current minimum sum found so far. An arrow labeled 'smaller' points from the right to the 'curr_sum' box, indicating that the value '-6' is being compared and potentially updated as the minimum.  The overall diagram visually demonstrates the iterative process of comparing each element of the array to the current minimum, updating the minimum if a smaller value is encountered.](/assets/images/dsa/dynamicprogramming/3f5333b8b3a63b90.webp)

Therefore, it is better to continue with the current subarray for now.

At index 3, we reach another important decision point:

- If we include 2 in the current subarray, its sum increases to 0:

![Image represents a visual depiction of a coding pattern, likely illustrating a step within an algorithm.  A peach-colored rectangular segment highlights a portion of a numerical array: `[3 1 -6 2 -1 4 -9]`, with indices 0 through 6 displayed below each element. An orange arrow labeled 'num' points downwards onto the highlighted segment, indicating that the variable 'num' is referencing or operating on this section of the array (specifically elements at indices 0, 1, 2, and 3).  To the right, a dashed-line box represents a variable named 'curr_sum'. Inside this box, the expression 'curr_sum += 2' indicates that 2 is being added to the current value of 'curr_sum'. Below this, '= 0' shows the current value of 'curr_sum' is 0. A grey arrow points from the right to the 'curr_sum' box, labeled 'smaller', suggesting that the value of 'smaller' (not shown) is influencing or updating 'curr_sum'. The overall diagram suggests a process where a section of an array is being processed, potentially to find a minimum or maximum value, and a running sum ('curr_sum') is being updated based on this processing.](/assets/images/dsa/dynamicprogramming/9dac424d5f2480df.webp)

- If we restart the subarray at this index, we begin a new subarray of sum 2:

![Image represents a snapshot of an algorithm's execution, likely demonstrating a coding pattern related to array traversal and sum calculation.  A numerical array `[3, 1, -6, 2, -1, 4, -9]` is displayed, with each element indexed from 0 to 6.  A light peach-colored circle highlights the element '2' at index 3, with an orange arrow labeled 'num' pointing to it, indicating the current element being processed.  To the right, a dashed-line box displays 'curr_sum = 2', representing the current sum calculated so far.  A rightward arrow connects this box to the word 'larger', suggesting that the algorithm is comparing the current sum with a larger value (not explicitly shown) as part of a larger process, possibly finding the largest contiguous subarray sum.  The overall arrangement visually depicts a step-by-step process where the algorithm iterates through the array, updating the `curr_sum` and comparing it to find a larger value.](/assets/images/dsa/dynamicprogramming/73ec4b666e70e74a.webp)

It’s evident here that the better choice is to start tracking the sum of a new subarray, beginning at index 3.

As observed, for each number in the array during this process, there are two choices:

1. **Continue:** Add the current number to the ongoing subarray sum (`curr_sum + num`).
2. **Restart:** Begin keeping track of a new subarray starting with the current number, with an initial sum of `num`.

The best choice is the larger of the two: **max(curr_sum + num, num)**.

Let’s apply this logic to the rest of the array:

![Image represents a step-by-step illustration of a coding pattern, likely for finding the maximum contiguous subarray sum.  The left side shows an array `[3, 1, -6, 2, -1, 4, -9]` with indices 0 through 6 displayed below each element.  An orange arrow labeled 'num' points to the element '2' at index 3 and '-1' at index 4, indicating the current element being processed. A peach-colored rectangle highlights these two elements. The right side shows a calculation box detailing the algorithm's logic.  A curved arrow points from the text '(previous curr_sum value)' to the calculation box. Inside the box, the equation `curr_sum = max(curr_sum + num, num)` is shown, representing the update of the maximum sum so far.  Below, a substitution with `curr_sum = 2` and `num = -1` is shown, resulting in `max(2 + (-1), -1)`, which simplifies to `max(1, -1) = 1`. This demonstrates how the algorithm updates the maximum sum based on the current element and the previous maximum sum.](/assets/images/dsa/dynamicprogramming/415ded86b26771dd.webp)

![Image represents a visual explanation of a maximum subarray sum calculation.  A numerical array `[3, 1, -6, 2, -1, 4, -9]` is shown, with indices 0 through 6 displayed below each element.  A peach-colored rectangle highlights the element '2', '-1', and '4' within the array. An orange arrow labeled 'num' points downwards, indicating that the value '4' is currently being processed. To the right, a light gray box details the calculation: `curr_sum = max(curr_sum + num, num)`, where `curr_sum` represents the current maximum sum and `num` represents the current element (4). The calculation is broken down in subsequent lines: `= max(1 + 4, 4)` showing the substitution of values, and finally `= 5`, indicating that the current maximum sum is updated to 5.  The diagram illustrates a step in an algorithm that iterates through the array, updating the maximum sum based on the current element and the running sum.](/assets/images/dsa/dynamicprogramming/d72b27b402552cf8.webp)

![Image represents a visual explanation of a maximum subarray sum calculation.  A numerical array `[3, 1, -6, 2, -1, 4, -9]` is shown, with each element indexed from 0 to 6.  A peach-colored rectangle highlights the element at index 3, the number `2`, which is labeled with an orange arrow pointing to it as 'num'.  To the right, a calculation is displayed showing the running maximum sum (`curr_sum`). The formula `curr_sum = max(curr_sum + num, num)` is presented, demonstrating how the current maximum sum is updated by taking the maximum between the current sum plus the current element (`num`) and the current element itself.  The calculation is then shown step-by-step:  `max(5 + (-9), -9)` which simplifies to `-4`, indicating that at this step, the maximum subarray sum is -4.  The indices below the array visually correspond to the array elements.](/assets/images/dsa/dynamicprogramming/59fa4a5e6ea1b5b5.webp)

Now that we have a strategy to linearly track subarray sums, the only other thing to do is keep track of the largest value of curr_sum encountered. To do this, we can update a variable `max_sum` whenever we encounter a larger `curr_sum` value. Then, `max_sum` will be the answer to the problem.

**Kadane’s algorithm** The algorithm described above is formally known as "Kadane's algorithm". Although it may not seem like it, Kadane's algorithm is actually a **DP** algorithm. What’s interesting is that we didn’t explicitly detect and solve subproblems to come up with this algorithm, like we typically do in DP. Instead, we solved it by linearly keeping track of a subarray sum and making decisions along the way.

So, to fully understand why this is a DP problem, let's explore how we would solve it using the traditional DP approach of breaking the problem into smaller subproblems, and solving them step-by-step. This is demonstrated in the next section of this explanation.

## Implementation

```python
from typing import List
    
def maximum_subarray_sum(nums: List[int]) -> int:
    if not nums:
        return 0
    # Set the sum variables to negative infinity to ensure negative sums can be
    # considered.
    max_sum = current_sum = float('-inf')
    # Iterate through the array to find the maximum subarray sum.
    for num in nums:
        # Either add the current number to the existing running sum, or start a new
        # subarray at the current number.
        current_sum = max(current_sum + num, num)
        max_sum = max(max_sum, current_sum)
    return max_sum
```

### Complexity Analysis

**Time complexity:** The time complexity of `maximum_subarray_sum` is O ( n ) O(n) O ( n ) because we iterate through each element of the input array once.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

## Intuition - DP

Let’s discuss how we would approach this problem as we did with other DP problems in this chapter.

An important observation is that every possible subarray ends at a certain index. This inversely means each index signifies the end of several subarrays, one of which will have the maximum subarray sum (shortened to “max subarray” moving forward) ending at that index.

For example, we can see the max subarray that ends at index 3 below by considering all subarrays ending at index 3:

![Image represents a numerical array depicted as `[3 1 -6 2 -1 4 -9]`, enclosed in square brackets.  A peach-colored rectangle highlights the first four elements (3, 1, -6, 2) of this array.  Beneath the array, numbers 0 through 6 are displayed, acting as indices corresponding to each element's position within the array.  To the right of the array, the text 'sum = 0' is shown in orange, indicating that the sum of all elements within the array equals zero.  There are no URLs or parameters present in the image; the image solely illustrates an array and its sum.](/assets/images/dsa/dynamicprogramming/6ca9210bedce7436.webp)

![Image represents a numerical array depicted within square brackets `[]`, showing a sequence of numbers: 3, 1, -6, 2, -1, 4, -9.  A light peach-colored rectangle highlights the sub-array [1, -6, 2].  Beneath the array, numbers 0 through 6 are displayed, acting as indices corresponding to each element's position within the array. To the right of the array, the text 'sum = -3' is shown in orange, indicating the sum of all the numbers in the array is -3.  There is no explicit connection shown between the highlighted sub-array and the sum calculation; the highlighting simply draws attention to a specific portion of the array.](/assets/images/dsa/dynamicprogramming/24a34039122e27b3.webp)

![Image represents a numerical array depicted within square brackets `[]`, containing the elements 3, 1, -6, 2, -1, 4, and -9.  Each element is positioned sequentially, with indices 0 through 6 displayed below them in gray.  A peach-colored oval highlights the elements -6 and 2, suggesting a focus or operation on these specific values. To the right of the array, the text 'Sum = -4' is displayed in orange, indicating the sum of all elements within the array is -4.  The arrangement visually demonstrates the calculation of the sum of the elements in the array, with the highlighted section possibly representing a sub-calculation or a specific part of the summation process.](/assets/images/dsa/dynamicprogramming/afa1ac912b942ed1.webp)

![Image represents a visual depiction of a maximum subarray sum algorithm.  A numerical array `[3, 1, -6, 2, -1, 4, -9]` is shown, with each element's index displayed below it (0 through 6).  The element at index 3, the number '2', is highlighted with a peach-colored circle.  To the right, a green rectangular box displays the result 'sum = 2', indicating that the maximum contiguous subarray sum within the given array is 2. The word 'max' is written in green above the result box, clarifying that the displayed value represents the maximum sum.  The highlighted '2' visually suggests that this element is part of, or possibly the maximum subarray itself, although the algorithm's exact steps aren't explicitly shown. The diagram focuses on presenting the input array and the final result of the maximum subarray sum calculation.](/assets/images/dsa/dynamicprogramming/5667fb8530932996.webp)

So, how can we find the max subarray that ends at each index? Consider the last index of the array:

![Image represents a visual depiction of a subproblem within a dynamic programming approach, likely to find the maximum subarray sum.  A rectangular box contains a numerical array `[3, 1, -6, 2, -1, 4, -9]` with indices 0 through 6 displayed below each element.  A small square labeled 'i' is positioned above the array, with a downward arrow indicating input to the array. To the right of the array, the text 'max_subarray(i) = ?' is displayed, posing a question about the maximum subarray sum up to index 'i'. The overall structure suggests an illustration of a single step in an algorithm where the input 'i' (likely representing an index) determines a subarray, and the question mark indicates the algorithm's goal of finding the maximum sum within that subarray.](/assets/images/dsa/dynamicprogramming/2d0fcb5a5fdecf56.webp)

One thing we know for sure is the max subarray ending at this index will definitely include the value at this index. We just need to determine if there are any elements to the left that also contribute to this max subarray. In other words, we need to find the max subarray that ends right before the last index:

![Image represents a visual depiction of a step in a dynamic programming algorithm, likely for finding the maximum sum subarray.  A rectangular box displays an array of integers: [3, 1, -6, 2, -1, 4, -9], with indices 0 through 6 displayed below each element.  A small square labeled 'i' points down to the element -9 at index 6, indicating the current index being processed. To the right, the expression `max_subarray(i - 1) + (-9)` is shown, illustrating the recursive or iterative step of the algorithm. This formula suggests that the maximum subarray sum ending at index `i` is calculated by adding the maximum subarray sum ending at the previous index (`i - 1`) to the value at the current index (`-9`).  The arrow from 'i' to -9 visually connects the index to the element used in the calculation, demonstrating the flow of information within the algorithm. The peach-colored highlighting of -9 emphasizes its role in the current calculation step.](/assets/images/dsa/dynamicprogramming/5bc0073d3adc9afb.webp)

Another thing to consider is the possibility that `max_subarray(i - 1)` is negative. This would mean the max subarray should only consist of -9, as a further negative contribution will only decrease the sum. Therefore, the formula becomes:

`max_subarray(i) = max(max_subarray(i - 1) + nums[i], nums[i])`

As we see, this is a **recurrence relation** that takes advantage of an **optimal substructure**, where the max subarray at the current index depends on the max subarray at the previous index.

This indicates we can solve this problem using DP. Translating the above recurrence relation to a DP formula gives us:

`dp[i] = max(dp[i - 1] + nums[i], nums[i])`

Now, let’s consider what the base case for this problem is.

**Base case** The simplest subproblem occurs when we consider only the first element of the array (i.e., when `i = 0`). When there’s only one element, there’s only one subarray. Therefore, we can set `dp[0]` to `nums[0]` as our base case.

**Populating the DP array** With the base case established, we can populate the rest of the DP array. Starting from index 1 and going up to index `n - 1`, we calculate the maximum subarray sum ending at each index using the aforementioned recurrence relation.

As we populate the DP array, we need to keep track of the maximum value in the DP array, `max_sum`, representing the largest sum of any subarray within the entire array. By the time we finish populating the DP array, we can just return `max_sum`.

## Implementation - DP

```python
from typing import List
    
def maximum_subarray_sum_dp(nums: List[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0
    dp = [0] * n
    # Base case: the maximum subarray sum of an array with just one element is that
    # element.
    dp[0] = nums[0]
    max_sum = dp[0]
    # Populate the rest of the DP array.
    for i in range(1, n):
        # Determine the maximum subarray sum ending at the current index.
        dp[i] = max(dp[i - 1] + nums[i], nums[i])
        max_sum = max(max_sum, dp[i])
    return max_sum
```

**Time complexity:** The time complexity of `maximum_subarray_sum_dp` is O ( n ) O(n) O ( n ) since we iterate through n n n elements of the DP array.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because we’re maintaining a DP array that contains n n n elements.

## Optimization

An important thing to note is that in the DP solution, we only ever need to access the previous value of the DP array (at `i - 1`) to calculate the current value (at `i`). This means we don’t need to store the entire DP array.

Instead, we can use a single variable to keep track of the current subarray sum and update this value to calculate the next subarray sum.

This approach reduces the space complexity to O ( 1 ) O(1) O ( 1 ). The adjusted implementation of this can be seen below:

```python
from typing import List
    
def maximum_subarray_sum_dp_optimized(nums: List[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0
    current_sum = nums[0]
    max_sum = nums[0]
    for i in range(1, n):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    return max_sum
```

As we can see, we’ve ended up with an optimized DP solution that’s nearly identical to the solution we came up with in the first approach: Kadane’s algorithm.
