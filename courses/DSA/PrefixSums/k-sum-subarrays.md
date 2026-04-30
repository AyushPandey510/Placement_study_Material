---
title: "K Sum Subarrays"
course: "DSA"
topic: "PrefixSums"
source: "/home/ayush/OOD-Design-Principles/DSA/PrefixSums/K-Sum Subarrays.html"
---
Find the number of subarrays in an integer array that sum to `k`.

#### Example:

![Image represents three identical arrays, each enclosed in square brackets `[]`, containing the integer sequence `[1, 2, -1, 1, 2]`.  Each array is displayed horizontally, with the elements numbered underneath from 0 to 4, representing their indices.  A peach-colored rectangular highlight spans the first three elements (1, 2, -1) in each array. Above each array, the text 'sum = 3' is displayed in orange, indicating that the sum of the highlighted elements (1 + 2 + (-1) = 3) within the peach-colored region equals 3.  The arrangement visually emphasizes the consistent sub-array and its sum across the three repetitions.](/assets/images/dsa/prefixsums/7b2b879679779aff.webp)

```python
Input: nums = [1, 2, -1, 1, 2], k = 3
Output: 3
```

## Intuition

The brute force solution to this problem involves iterating through every possible subarray and checking if their sum equals k. It takes O ( n 2 ) O(n^2) O ( n 2 ) time to iterate over all subarrays, and finding the sum of each subarray takes O ( n ) O(n) O ( n ) time, resulting in an overall time complexity of O ( n 3 ) O(n^3) O ( n 3 ), where n n n denotes the length of the array. This solution is quite inefficient, so let’s think of something better.

Since we’re working with subarray sums, it’s worth considering how **prefix sums** can be used to solve this problem.

**Prefix sums** As described in the *Sum Between Range* problem in this chapter, the sum of a subarray between two indexes, `i` and `j`, can be calculated with the following formula:

![Image represents a visual explanation of calculating a subarray sum using prefix sums.  The image shows three arrays. The first array `[1 2 -1 1 2]` is the input array.  Above it, in orange text, is labeled `sum[i:j]`, representing the sum of a subarray from index `i` to `j`. A peach-colored rectangle highlights the subarray `[-1 1]` which is the sum of elements from index `i` to `j`.  Arrows point from small boxes labeled `i` and `j` upwards to the elements at those indices within the subarray. The second array `[1 2 -1 1 2]` is labeled `prefix_sum[j]` in light blue text, representing the prefix sum array up to index `j`. A light blue rectangle highlights the prefix sum up to `j`, which is `[1 2 -1 1]`. An arrow points from a box labeled `j` to the last element of this prefix sum. The third array `[1 2 -1 1 2]` is labeled `prefix_sum[i - 1]` in red text, representing the prefix sum up to index `i - 1`. A light pink rectangle highlights the prefix sum up to `i-1`, which is `[1 2]`. An arrow points from a box labeled `i - 1` to the last element of this prefix sum. The equation `[1 2 -1 1 2] = [1 2 -1 1 2] - [1 2]` demonstrates that the subarray sum `sum[i:j]` can be calculated by subtracting the prefix sum up to `i - 1` from the prefix sum up to `j`.](/assets/images/dsa/prefixsums/239fb48ab4c703a0.webp)

For subarrays which start at the beginning of the array (i.e., when `i = 0`), the formula is just:

![Image represents a visual explanation of prefix sum calculation.  The image shows two arrays: a peach-colored array labeled `sum[0: j]` containing the elements [1, 2, -1, 1, 2], and a light-blue array labeled `prefix_sum[j]` containing [1, 2, -1, 1, 2].  Both arrays contain the same numerical values.  An upward arrow connects the index `j` (represented by a small gray square) to both arrays, indicating that `j` is the index up to which the sum is calculated. The `sum[0: j]` array represents a sub-array from index 0 up to index `j` of the original array, while the `prefix_sum[j]` array represents the cumulative sum of the elements from index 0 up to index `j`. The equality sign (=) between the arrays visually demonstrates that the `prefix_sum[j]` array is the result of calculating the cumulative sum of the `sum[0: j]` array.  The subscript `0` in `sum[0: j]` indicates that the summation starts from the beginning of the array.](/assets/images/dsa/prefixsums/e2e3a292b23007e4.webp)

In this problem, we already know the sum we’re looking for (k), meaning our goal is to find:

- All pairs of `i` and `j` such that **prefix_sum[j] - prefix_sum[i - 1] == k** when `i > 0`.
- All values of `j` such that **prefix_sum[j] == k** when `i == 0`.

We can unify both cases by recognizing that the formula prefix_sum[j] == k is the same as the formula `prefix_sum[j] - prefix_sum[i - 1] == k` when `prefix_sum[i - 1]` equals 0 (i.e., `prefix_sum[j] - 0 == k`).

One issue with this is **when i == 0 , index i - 1 is invalid**. To make this unification possible while avoiding the out-of-bounds issue, we can **prepend '[0]' to the prefix sums array**, making it possible for `prefix_sum[i - 1]` to equal 0 when `i - 1 == 0`.

![Image represents a visual explanation of prefix sums.  The top line shows an array named `nums` containing the integer values [1, 2, -1, 1, 2]. Below it, an array named `prefix_sums` is shown, containing the cumulative sums of `nums`.  `prefix_sums` starts with 1 (the first element of `nums`), then adds the second element (2) to get 3, then adds the third element (-1) to get 2, and so on, resulting in the array [1, 3, 2, 3, 5].  An orange arrow labeled 'start prefix sums with 0' points downwards from above to the beginning of a third array, visually demonstrating that a prefix sum calculation often begins with 0. This third array is identical to `prefix_sums` except it includes a leading 0, representing the cumulative sum before considering any elements from `nums`.  The indices of each array are shown below the arrays for clarity.](/assets/images/dsa/prefixsums/b4f8d2e73ca972e7.webp)

Keep in mind that we should iterate over the array from index 1 because we added this 0 to the start of the prefix sum array.

Here’s the code snippet for this approach:

```python
from typing import List
    
def k_sum_subarrays(nums: List[int], k: int) -> int:
    n = len(nums)
    count = 0
    # Populate the prefix sum array, setting its first element to 0.
    prefix_sum = [0]
    for i in range(0, n):
        prefix_sum.append(prefix_sum[-1] + nums[i])
    # Loop through all valid pairs of prefix sum values to find all subarrays that sum
    # to 'k'.
    for j in range(1, n + 1):
        for i in range(1, j + 1):
            if prefix_sum[j] - prefix_sum[i - 1] == k:
                count += 1
    return count
```

This is an improvement on the brute force solution, which reduces the time complexity to O ( n 2 ) O(n^2) O ( n 2 ). Can we optimize this solution further?

**Optimization - hash map** An important point is that we don't need to treat both `prefix_sum[j]` and `prefix_sum[i - 1]` as unknowns in the formula. If we know the value of `prefix_sum[j]`, we can find `prefix_sum[i - 1]` using `prefix_sum[i - 1] = prefix_sum[j] - k`.

Therefore, for each prefix sum (`curr_prefix_sum`), we need to find the number of times `curr_prefix_sum - k` previously appeared as a prefix sum before.

This is similar to the problem presented in *Pair Sum - Unsorted* in the *Hash Maps and Sets* chapter, where we learn a **hash map** is useful for implementing the above idea efficiently. In this context, if we store encountered prefix sum values in a hash map, we can check if `curr_prefix_sum - k` was encountered before in constant time.

Note, it's also important to track the frequency of each prefix sum we encounter using the hash map, as the same prefix sum may appear multiple times.

Let’s try using a hash map (`prefix_sum_map`) on the example below with `k = 3`. Initialize `prefix_sum_map` with one zero for the same reason we prepended 0 to the prefix sum array in the O ( n 2 ) O(n^2) O ( n 2 ) solution discussed earlier:

![Image represents a visual depiction of a prefix sum calculation and its mapping.  The image shows an integer array `[1, 2, -1, 1, 2]` labeled with indices 0 through 4 beneath each element.  Above the array, `k = 3` is specified, indicating a parameter likely related to a window or sub-array size. To the right, a table labeled 'prefix_sum_map' is presented. This table has two columns: 'sum' and 'freq'.  The 'sum' column contains the value `0`, representing the initial prefix sum. The 'freq' column contains the value `1`, indicating the frequency of this sum.  The arrangement suggests that the array is processed to calculate prefix sums, and the `prefix_sum_map` stores the unique prefix sums encountered and their frequencies.  The value of `k` likely influences how these prefix sums are calculated or used in a larger algorithm, possibly defining a sliding window of size 3 across the input array.](/assets/images/dsa/prefixsums/58efb5ba086d9b40.webp)

We’re using a hash map to keep track of prefix sums, we no longer need a separate array to store each individual prefix sum.

Initially, the prefix sum (`curr_prefix_sum`) is equal to 1. Its complement, -2, is not in the hash map as illustrated below. So, we continue:

![Image represents a step-by-step illustration of a coding pattern, likely related to prefix sums or subarray sums.  The top left shows `k = 3` indicating a parameter value.  Below, `curr_prefix_sum = 1` represents the current prefix sum, which is an arrow pointing down to an array `[1, 2, -1, 1, 2]` indexed from 0 to 4.  To the right, a `prefix_sum_map` is shown as a table with two columns labeled `sum` and `freq`, currently containing only one row with `sum = 0` and `freq = 1`. A dashed box to the right shows a conditional statement: `curr_prefix_sum - k = -2 (not in hash map) => continue`. This indicates that the difference between the current prefix sum (1) and k (3) is -2, which is not found as a `sum` in the `prefix_sum_map`, resulting in the continuation of the algorithm.  The overall diagram depicts a single iteration of an algorithm that likely involves tracking prefix sums and checking for specific sum values within a hash map (or similar data structure) to solve a problem, possibly related to finding subarrays with a given sum.](/assets/images/dsa/prefixsums/9c19155b81ee7849.webp)

Store the (`curr_prefix_sum`, `freq`) pair (1, 1) in the hash map before moving to the next prefix sum.

The next `curr_prefix_sum` value is 3 (1 + 2). Its complement, 0, exists in the hash map with a frequency of 1. This means we found 1 subarray of sum k. So, we add 1 to our count:

![Image represents a visual explanation of a coding pattern, likely related to prefix sums and hash maps.  The top-left shows 'k = 3' indicating a parameter value. Below, 'curr_prefix_sum = 3' suggests a running prefix sum. An array `[1, 2, -1, 1, 2]` is displayed with indices 0-4 beneath, illustrating the data being processed. A downward arrow connects 'curr_prefix_sum = 3' to the array, implying the sum is derived from the array elements. To the right, a 'prefix_sum_map' is depicted as a table with two columns labeled 'sum' and 'freq'.  This table contains two rows: one with 'sum' = 0 and 'freq' = 1, and another with 'sum' = 1 and 'freq' = 1, representing prefix sums and their frequencies. A light-grey box on the far right details a calculation:  'curr_prefix_sum - k = 0 (in hash map)' which implies checking if a specific prefix sum exists in the map.  The subsequent line 'count += prefix_sum_map[0] += 1' shows an increment to a 'count' variable based on the frequency found in the 'prefix_sum_map' at index 0.  The arrow connecting the 'prefix_sum_map' and the calculation box indicates data flow from the map to the calculation. The entire diagram illustrates a step-by-step process of using prefix sums and a hash map to efficiently solve a problem, likely counting subarray sums equal to a target value (k).](/assets/images/dsa/prefixsums/af5f59206573b8c0.webp)

Store the (`curr_prefix_sum`, `freq`) pair (3, 1) in the hash map before moving on to the next value.

We now have a strategy for processing each value in the array:

1. Update curr_prefix_sum by adding the current value of the array to it
2. If curr_prefix_sum - k exists in the hash map, add its frequency ( prefix_sum_map[curr_prefix_sum - k ]) to count
3. Add ( curr_prefix_sum , freq ) to the hash map. If the key is already present, increase its frequency; if not, set it to 1.

Repeat this process for the rest of the array:

![Image represents a visualization of a coding pattern, likely for finding subarrays with a specific sum.  The top-left shows 'k = 3', indicating a target sum.  Next to it, 'curr_prefix_sum = 2' represents the current prefix sum calculated so far. An array [1, 2, -1, 1, 2] is shown below, with indices 0 to 4 displayed beneath each element. A downward arrow connects 'curr_prefix_sum = 2' to the '-1' element in the array, indicating the current prefix sum calculation stage. To the right is a table labeled 'prefix_sum_map', showing prefix sums (3, 1, 0) in the left column and their frequencies (1, 1, 1) in the right column.  Finally, a light-gray box on the far right displays 'curr_prefix_sum - k = -1 (not in hash map)' and an arrow pointing right labeled 'continue', suggesting that if the difference between the current prefix sum and the target sum (k) is not found in the 'prefix_sum_map', the algorithm continues processing the array.](/assets/images/dsa/prefixsums/577495fcc3328b55.webp)

![Image represents a visual explanation of a coding pattern, likely for finding subarrays with a sum equal to a target value (k=3 in this case).  The left side shows an input array `[1, 2, -1, 1, 2]` with indices displayed below.  Above it, `curr_prefix_sum = 3` indicates a running prefix sum at a particular point. A downward arrow points to the element '1' at index 3, suggesting this is the current prefix sum being considered. To the right, a table labeled `prefix_sum_map` stores prefix sums (in the 'sum' column) and their frequencies (in the 'freq' column).  For example, a prefix sum of 0 has a frequency of 1, a prefix sum of 1 has a frequency of 1, a prefix sum of 2 has a frequency of 1, and a prefix sum of 3 has a frequency of 1. A light peach-colored cell highlights the prefix sum of 0 and its frequency of 1. A dashed-line box on the far right describes the algorithm's logic: if `curr_prefix_sum - k == 0`, meaning the current prefix sum minus the target sum is zero, then increment a `count` variable by the frequency of that prefix sum found in `prefix_sum_map` at index 0 (which is 1 in this case).  The `+= 1` indicates that the count is incremented by 1.  The entire diagram illustrates how a prefix sum map is used to efficiently count subarrays with a specific sum.](/assets/images/dsa/prefixsums/16471105a8cb39cf.webp)

![Image represents a visual explanation of a coding pattern, likely for finding subarrays with a sum equal to a target value (k=3 in this case).  The left side shows an input array `[1, 2, -1, 1, 2]` with indices displayed below. Above it, `curr_prefix_sum = 5` indicates the cumulative sum of the array. A downward arrow points to the array, suggesting this sum is being processed.  The center displays a `prefix_sum_map`, a table with two columns: 'sum' and 'freq' (frequency).  This table stores prefix sums and their counts.  The cell (2,1) is highlighted in peach, indicating a prefix sum of 2 has occurred once. The right side shows a calculation step: `curr_prefix_sum - k = 2` (where k=3), implying a search for subarrays summing to 3.  The result, 2, is used to access the `prefix_sum_map[2]`, which is 1 (the frequency of prefix sum 2). This value (1) is then added to a `count` variable (`count += 1`), suggesting the algorithm is counting occurrences of subarrays with the target sum.  The entire diagram illustrates how a prefix sum map is used to efficiently count subarrays with a given sum.](/assets/images/dsa/prefixsums/b88f4877915434f0.webp)

Once we’ve processed all the prefix sum values, we return count, which stores the number of subarrays that sum to k.

## Implementation

```python
from typing import List
    
def k_sum_subarrays_optimized(nums: List[int], k: int) -> int:
    count = 0
    # Initialize the map with 0 to handle subarrays that sum to 'k' from the start of
    # the array.
    prefix_sum_map = {0: 1}
    curr_prefix_sum = 0
    for num in nums:
        # Update the running prefix sum by adding the current number
        curr_prefix_sum += num
        # If a subarray with sum 'k' exists, increment 'count' by the number of times
        # it has been found.
        if curr_prefix_sum - k in prefix_sum_map:
            count += prefix_sum_map[curr_prefix_sum - k]
        # Store the 'curr_prefix_sum' value in the hash map.
        prefix_sum_map[curr_prefix_sum] = prefix_sum_map.get(curr_prefix_sum, 0) + 1
    return count
```

### Complexity Analysis

**Time complexity:** The time complexity of `k_sum_subarrays_optimized` is O ( n ) O(n) O ( n ) because we iterate through each value in the nums array.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the hash map.
