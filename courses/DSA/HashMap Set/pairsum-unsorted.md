---
title: "PairSUm Unsorted"
course: "DSA"
topic: "HashMap Set"
source: "/home/ayush/OOD-Design-Principles/DSA/HashMap-Set/PairSUm-Unsorted___Technical_Interview_Prep.html"
---
Given an array of integers, return the indexes of **any two numbers that add up to a target**. The order of the indexes in the result doesn't matter. If no pair is found, return an empty array.

#### Example:

```python
Input: nums = [-1, 3, 4, 2], target = 3
Output: [0, 2]
```

Explanation: `nums[0] + nums[2] = -1 + 4 = 3`

#### Constraints:

- The same index cannot be used twice in the result.

## Intuition

A brute force approach is to iterate through every possible pair in the array to see if their sum is equal to the target. This is the same as the brute force solution described in the *Pair Sum - Sorted* problem, which has a time complexity of O ( n 2 ) O(n^2) O ( n 2 ), where n n n is the length of the array. We could also sort the array and then perform the two-pointer algorithm used in *Pair Sum - Sorted*, which would take O ( n l o g ( n ) ) O(nlog(n)) O ( n l o g ( n )) time due to sorting. Let’s see if we can find an even faster solution.

**Complement** We're asked to find a pair (`x`, `y`) such that `x + y == target`. In this equation, there are two unknowns: `x` and `y`. An important observation is that if we know one of these numbers, we can easily calculate what the other number should be.

For each number x in nums, we need to find another number `y` such that `x + y = target`, or in other words, `y = target - x`. We can call this number the complement of `x`.

Keep in mind, we need to return the indexes of the pair of numbers, not the pair itself. So, we’ll need a way to find a number's complement as well as its index.

One way we could do this is to loop through the array to find each number’s complement and corresponding index. But this takes O ( n 2 ) O(n^2) O ( n 2 ) time since we’d need to do a linear traversal to search for each number’s complement. Instead, we’d like an efficient way to determine the index of any number in the array without needing to search the array. Is there a data structure that can help with this?

**Hash map** A hash map works great because we can store and look up values in O ( 1 ) O(1) O ( 1 ) time. Each number and its index can be stored in the hash map as key-value pairs:

![Image represents a transformation of a numerical array into a hashmap.  The input is an array `[-1, 3, 4, 2]` with indices `[0, 1, 2, 3]` displayed beneath each element. A rightward arrow indicates the transformation process. The output is a hashmap labeled 'hashmap' which is represented as a table with two columns: 'num' and 'index'. The 'num' column lists the numbers from the input array: -1, 3, 4, and 2. The corresponding 'index' column shows the original index of each number in the input array: 0, 1, 2, and 3 respectively.  The diagram illustrates how the original array's elements and their indices are reorganized into a key-value pair structure within the hashmap, where the number acts as the key and its original index acts as the value.](/assets/images/dsa/hashmap-set/f0e925c0ae9a37ed.webp)

This allows us to retrieve the index of any number’s complement efficiently. Notice that duplicate numbers don’t need to be considered here since only one valid pair needs to be found.

The most intuitive way to incorporate a hash map is to:

1. In the first pass, populate the hash map with each number and its corresponding index.
2. In the second pass, scan through the array to check if each number's complement exists in the hash map. If it does, we can return the indexes of that number and its complement.

Below is the code snippet for this two-pass approach:

```python
from typing import List

def pair_sum_unsorted_two_pass(nums: List[int], target: int) -> List[int]:
    num_map = {}
    # First pass: Populate the hash map with each number and its index.
    for i, num in enumerate(nums):
        num_map[num] = i
    # Second pass: Check for each number's complement in the hash map.
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map and num_map[complement] != i:
            return [i, num_map[complement]]
    return []
```

This algorithm requires two passes. Is it possible to do this in only one? A one-pass solution implies that we would need to populate the hash map while searching for complements. Is this possible? Consider the example below:

![Image represents a sample input for a search algorithm, likely a target-sum problem.  The input consists of a numerical array [-1, 3, 4, 2] enclosed in square brackets, with each element implicitly indexed from 0 to 3 shown in grey below the array.  This array is separated by a comma from the target value, which is explicitly stated as 'target = 3'. The arrangement suggests the algorithm's task is to find a subset of numbers within the array that sums up to the target value of 3.  There is no explicit flow of information depicted; the image simply presents the input data for the algorithm to process.](/assets/images/dsa/hashmap-set/f4b88a3f9035de70.webp)

Start at index 0. Its complement would be 3 - (-1) = 4. Does our hash map have 4 in it? No, it's empty at the moment. So, let's add -1 and its index to the hash map:

![Image represents a data flow diagram illustrating a step in a coding pattern, likely involving hashmaps.  An input array `[-1, 3, 4, 2]` with indices [0, 1, 2, 3] is shown. An orange arrow labeled 'x' points to the first element, -1. This array flows into a rectangular box labeled 'hashmap' with internal labels 'num' and 'index' suggesting it stores key-value pairs.  To the right of the hashmap is a dashed-line box detailing the processing steps:  first, it checks if the hashmap contains -1 (it doesn't); second, it calculates the complement of 4 (presumably within the context of the algorithm); and third, it adds the key-value pair (-1, 0) to the hashmap.  The diagram visually depicts the input array, its processing through a hashmap, and the specific operations performed on the hashmap based on the input.](/assets/images/dsa/hashmap-set/bd5e2a6c52707869.webp)

Next, let’s look at index 1. Its complement (0) does not exist in the hash map. So, just add 3 and its index to the hash map:

![Image represents a step-by-step illustration of a coding pattern involving a hashmap.  An input array `[-1, 3, 4, 2]` is shown, with a small orange arrow pointing downwards to the element '3' at index 1, indicating the current element being processed. This array is then processed, resulting in a hashmap represented as a table with two columns labeled 'num' and 'index'.  Currently, the hashmap contains only one entry: -1 at index 0. To the right of the hashmap is a dashed-line box containing three bullet points describing the processing logic:  '- hashmap doesn't contain 3's', indicating that the current element (3) is not yet in the hashmap; 'complement (0)', suggesting a calculation of the complement (likely 0 in this context); and '- add (3, 1) to hashmap', indicating that the pair (3, 1) – the element and its index – will be added to the hashmap as the next step.  The arrow between the array and the hashmap shows the data flow from the input array to the hashmap during processing.](/assets/images/dsa/hashmap-set/1947ff4be68d6143.webp)

At index 2, we notice 4's complement (-1) exists in the hash map. This means we found a pair that sums to the target:

![Image represents a data transformation process.  An input array `[-1, 3, 4, 2]` with indices [0, 1, 2, 3] is shown.  A downward-pointing orange arrow labeled 'x' highlights the element '4' at index 2. This array is then transformed into a hashmap labeled 'hashmap' which has two key-value pairs. The key 'num' stores the number -1, and its corresponding value under the 'index' key is 3.  The second key-value pair has 'num' as 0 and 'index' as 1. A separate dashed-line box describes the hashmap's content, stating that it 'contains 4's complement (-1)'.  The arrow indicates the input array is processed to generate the hashmap, implying a mapping or counting operation where the complement of a number (in this case, 4's complement -1) and its index are stored.](/assets/images/dsa/hashmap-set/754c5357b914cdd5.webp)

Now, we can return the indexes of the two values. Fetch the index of 4 from the input array and the index of its complement from the hash map:

![Image represents a visual depiction of a coding pattern, likely for finding pairs in an array that sum to a target value (here, implicitly zero).  The input is an array `[-1, 3, 4, 2]` with indices `0, 1, 2, 3` respectively, shown above a downward-pointing orange arrow labeled 'x', suggesting a target value or operation.  This array is processed, with the element '4' (at index 2) highlighted in light green.  A rightward arrow indicates the transformation of this array into a hashmap. The hashmap is represented as a box divided into two columns labeled 'num' and 'index'.  The 'num' column contains the unique numbers from the input array (-1 and 3), while the 'index' column shows their corresponding indices (0 and 1 respectively).  A curved grey arrow connects the highlighted '4' in the input array to the hashmap, implying that the algorithm uses the hashmap to store and retrieve information.  Finally, another curved grey arrow originates from the hashmap's 'index' column and points to `[0, 2]` labeled 'return', indicating that the algorithm returns the indices 0 and 2 as the solution, likely because -1 + 4 = 3 (or a similar logic involving the target value).  The overall diagram illustrates the use of a hashmap to efficiently find pairs with a specific sum within an array.](/assets/images/dsa/hashmap-set/3d68ca4857756100.webp)

## Implementation

```python
from typing import List
   
def pair_sum_unsorted(nums: List[int], target: int) -> List[int]:
    hashmap = {}
    for i, x in enumerate(nums):
        if target - x in hashmap:
            return [hashmap[target - x], i]
        hashmap[x] = i
    return []
```

### Complexity Analysis

**Time complexity:** The time complexity of `pair_sum_unsorted` is O ( n ) O(n) O ( n ) because we iterate through each element in the `nums` array once and perform constant-time hash map operations during each iteration.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) since the hash map can grow up to n n n in size.

## Interview Tip

*Tip: Iterate through solutions.* Don’t always jump straight to the most optimal or clever solution, as this won't give the interviewer much insight into your problem-solving process. Consider multiple approaches, starting with the more straightforward ones, and gradually refine them. This way, you demonstrate your thought process and how you arrive at a more optimal solution.
