---
title: "LongestChainofConsecutiveNumbers"
course: "DSA"
topic: "HashMap Set"
source: "/home/ayush/OOD-Design-Principles/DSA/HashMap-Set/LongestChainofConsecutiveNumbers___Technical_Interview_Prep.html"
---
Find the **longest chain of consecutive numbers** in an array. Two numbers are consecutive if they have a difference of 1.

#### Example:

```python
Input: nums = [1, 6, 2, 5, 8, 7, 10, 3]
Output: 4
```

Explanation: The longest chain of consecutive numbers is 5, 6, 7, 8.

## Intuition

A naive approach to this problem is to sort the array. When all numbers are arranged in ascending order, consecutive numbers will be placed next to each other. This allows us to iterate through the array to identify the longest sequence of consecutive numbers.

![Image represents a visual depiction of a sorting algorithm's effect on an array of numbers.  The diagram begins with an unsorted array `[1 6 2 5 8 7 10 3]` enclosed in square brackets.  A right-pointing arrow labeled 'sort' indicates a transformation.  The result of the sorting operation is shown as two sub-arrays. The first, a peach-colored sub-array `[1 2 3]`, contains the smallest three numbers from the original array. The second, a light-green sub-array `[5 6 7 8 10]`, contains the remaining numbers, which are larger than those in the first sub-array. The label 'longest' is placed above the second sub-array, indicating that this sub-array represents the longest increasing subsequence within the original unsorted array.  The entire output is presented as a sequence of numbers within square brackets.](/assets/images/dsa/hashmap-set/e0c8d78b6d5f6eb9.webp)

This approach requires sorting, which takes O ( n log ⁡ ( n ) ) O(n\log (n)) O ( n lo g ( n )) time, where n n n denotes the length of the array. Let’s see how we could do better.

It’s important to understand that every number in the array can represent the start of some consecutive chain. One approach is to treat each number as the start of a chain and search through the array to identify the rest of its chain.

To do this, we can leverage the fact that for any number `num`, its next consecutive number will be `num + 1`. This means we’ll always know which number to look for when trying to find the next number in a sequence. The code snippet for this approach is provided below:

```python
from typing import List
     
def longest_chain_of_consecutive_numbers_brute_force(nums: List[int]) -> int:
    if not nums:
        return 0
    longest_chain = 0
    # Look for chains of consecutive numbers that start from each number.
    for num in nums:
        current_num = num
        current_chain = 1
        # Continue to find the next consecutive numbers in the chain.
        while (current_num + 1) in nums:
            current_num += 1
            current_chain += 1
        longest_chain = max(longest_chain, current_chain)
    return longest_chain
```

This brute force approach takes O ( n 3 ) O(n^3) O ( n 3 ) time because of the nested operations involved:

- The outer for-loop iterates through each element, which takes O ( n ) O(n) O ( n ) time.
- For each element, the inner while-loop can potentially run up to n iterations if there is a long consecutive sequence starting from the current number.
- For each, while-loop iteration, an O ( n ) O(n) O ( n ) check is performed to see if the next consecutive number exists in the array.

This is slower than the sorting approach, but we can make a couple of optimizations to improve the time complexity. Let’s discuss these.

**Optimization - hash set** To find the next number in a sequence, we perform a linear search through the array. However, by storing all the numbers in a hash set, we can instead query this hash set in constant time to check if a number exists.

This reduces the time complexity from O ( n 3 ) O(n^3) O ( n 3 ) to O ( n 2 ) O(n^2) O ( n 2 ).

**Optimization - identifying the start of each chain** In the brute force approach, we treat each number as the start of a chain. This becomes quite expensive because we perform a linear search for every number to find the rest of its chain:

![Image represents a diagram illustrating a search for a consecutive chain of numbers.  The top of the diagram contains the text 'find the rest of a consecutive chain starting at:'.  From this text, eight orange arrows point downwards to a set of single-digit numbers enclosed in square brackets: [1, 6, 2, 5, 8, 7, 10, 3].  The arrows visually represent the exploration of potential consecutive chains starting from an unspecified initial number (implied by the phrase 'starting at:').  The numbers at the bottom are potential candidates or elements within the search space for completing the consecutive chain.  The diagram suggests a branching or fan-out search strategy, where multiple possibilities are explored simultaneously to find the rest of the consecutive chain.](/assets/images/dsa/hashmap-set/a1267258615efa71.webp)

The key observation here is that we don’t need to perform this search for every number in a chain. Instead, we only need to perform it for the smallest number in each chain since this number identifies the start of its chain:

![Image represents a diagram illustrating the concept of finding a consecutive chain within a sequence of numbers.  The top of the diagram displays the text 'find the rest of a consecutive chain starting at:'.  Three orange arrows emanate downwards from this text, pointing to three distinct subsequences of numbers: '[1 6 2]', '[5 8 7]', and '[10 3]'. Below each subsequence, grey arrows indicate potential consecutive chains.  Specifically, under '[1 6 2]', a grey arrow points to '1 2 3', suggesting a possible consecutive chain starting with 1. Similarly, under '[5 8 7]', a grey arrow points to '5 6 7 8', indicating a potential consecutive chain starting with 5. Finally, under '[10 3]', a grey arrow points to '10', showing a single-element consecutive chain starting at 10. The diagram visually represents the challenge of identifying consecutive number sequences from a larger, unordered set.](/assets/images/dsa/hashmap-set/12cd7bf02dca31ea.webp)

We can determine if a number is the smallest number in its chain by **checking the array doesn’t contain the number that precedes it ( curr_num - 1 )**. We can also use the hash set for this check.

![Image represents a step-by-step illustration of an algorithm, likely searching within an array.  The top section shows an array `[1, 6, 2, 5, 8, 7, 10, 3]`.  The number 5 is highlighted in a grey circle. Above it, text states 'not the smallest in its chain: 6 - 1 = 5 exists,' indicating a check for whether 5 is the smallest element in a sub-array derived by subtracting 1 from a larger element (in this case, 6). A downward-pointing arrow connects this text to the array, visually indicating the element being processed. The bottom section shows the same array, but now the number 5 is no longer highlighted. Above it, the text reads 'smallest in its chain: 5 - 1 = 4 doesn't exist,' implying that a search for 4 (5-1) within the array failed.  A downward-pointing arrow again connects the text to the array, showing that the algorithm continues its search after finding that 5 is not the smallest in its chain. The overall image demonstrates a process of iterating through an array and checking for the existence of specific values derived from calculations on other array elements.](/assets/images/dsa/hashmap-set/92b6759b60ec865a.webp)

This reduces the time complexity from O ( n 2 ) O(n^2) O ( n 2 ) to O ( n ) O(n) O ( n ), as now every chain is searched through only once. This is explained in more detail in the complexity analysis.

## Implementation

```python
from typing import List

def longest_chain_of_consecutive_numbers(nums: List[int]) -> int:
    if not nums:
        return 0
    num_set = set(nums)
    longest_chain = 0
    for num in num_set:
        # If the current number is the smallest number in its chain, search for
        # the length of its chain.
        if num - 1 not in num_set:
            current_num = num
            current_chain = 1
            # Continue to find the next consecutive numbers in the chain.
            while current_num + 1 in num_set:
                current_num += 1
                current_chain += 1
            longest_chain = max(longest_chain, current_chain)
    return longest_chain
```

### Complexity Analysis

**Time complexity:** The time complexity of `longest_chain_of_consecutive_numbers` is O ( n ) O(n) O ( n ) because, although there are two loops, the inner loop is only executed when the current number is the start of a chain. This ensures that each chain is iterated through only once in the inner while-loop. Thus, the total number of iterations for both loops combined is O ( n ) O(n) O ( n ): the outer for-loop runs n n n times, and the inner while-loop runs a total of n n n times across all iterations, resulting in a combined time complexity of O ( n + n ) = O ( n ) O(n+n)=O(n) O ( n + n ) = O ( n ).

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) since the hash set stores each unique number from the array.
