---
title: "Intuition Max Heap"
course: "DSA"
topic: "Heaps"
source: "/home/ayush/OOD-Design-Principles/DSA/Heaps/K Most Frequent Strings.html"
---
Find the `k` most frequently occurring strings in an array, and return them sorted by frequency in descending order. If two strings have the same frequency, sort them in lexicographical order.

### Example:

```python
Input: strs = ['go', 'coding', 'byte', 'byte', 'go', 'interview', 'go'], k = 2
Output: ['go', 'byte']
```

Explanation: The strings "go" and "byte" appear the most frequently, with frequencies of 3 and 2, respectively.

#### Constraints:

- `k ≤ n`, where `n` denotes the length of the array.

## Intuition - Max-Heap

The two main challenges to this problem are:

1. Identifying the `k` most frequent strings.
2. Sorting those strings first by frequency and then lexicographically.

For now, let's concentrate on identifying the most frequent strings and address lexicographical ordering afterward.

First, we need a way to keep track of the frequencies of each string. We can use a hash map for this, where the keys represent the strings and the values represent frequencies:

![Image represents a data transformation process where a list of strings is converted into a frequency table.  The input is a list `[go coding byte byte go interview go]` containing the strings 'go', 'coding', 'byte', 'byte', 'go', 'interview', and 'go'. This list is shown to the left of a right-pointing arrow. The arrow indicates the flow of data from the input list to the output table. The output is a frequency table labeled 'freqs' with two columns: 'str' representing the unique strings and 'freq' representing their corresponding frequencies. The table lists 'go' with a frequency of 3, 'coding' with 1, 'byte' with 2, and 'interview' with 1.  The table visually summarizes the number of occurrences of each unique string from the input list.](/assets/images/dsa/heaps/00cc240e6bf4cc67.webp)

The most straightforward approach is to obtain an array containing the strings from the hash map, sorted by frequency in descending order. The `k` most frequent strings would be the first `k` strings in this array.

![Image represents a data processing flow demonstrating the selection of the *k* most frequent elements from a dataset.  The process begins with a table labeled 'freqs' containing two columns: 'str' (string) and 'freq' (frequency).  The 'str' column lists strings: 'go', 'coding', 'byte', and 'interview', while the 'freq' column shows their corresponding frequencies: 3, 1, 2, and 1, respectively.  An arrow labeled 'sort' indicates a sorting operation transforming this table into a second 'freqs' table.  In this sorted table, the strings are reordered based on their frequencies in descending order: 'go', 'byte', 'coding', and 'interview' with frequencies 3, 2, 1, and 1.  A rectangular orange box highlights the top two rows ('go' and 'byte') of the sorted table. Finally, an arrow points from this highlighted section to the text 'k most frequent (k = 2)', signifying that the top *k* = 2 most frequent strings ('go' and 'byte') have been successfully extracted.](/assets/images/dsa/heaps/d30914e2baee87f2.webp)

The main inefficiency of this solution is that it involves sorting all n strings, even though we only need the top `k` frequent ones to be sorted.

Something useful to consider: if we remove the most frequent string, the new most frequent string after this removal represents the second-most frequent overall. By repeatedly identifying and removing the most frequent string `k` times, we efficiently obtain our answer.

To implement this idea, we need a data structure that allows efficient access to the most frequent string at any time. A **max-heap** is perfect for this.

**Max-heap** Let's find the `k` most frequent strings from the previous input, this time using a max-heap. First, populate the heap with each string along with their frequencies.

![Image represents a data structure transformation illustrating the 'push all pairs' coding pattern.  The diagram shows two states: an initial state and a final state, both featuring a `max_heap` data structure. The initial state depicts a `max_heap` with an empty top rectangular section labeled `max:` indicating an empty maximum value container. The final state shows the same `max_heap` structure, but its top rectangular section now contains `max:` followed by the pair `(go, 3)`.  Below this, within the trapezoidal `max_heap` section, three additional pairs are listed: `(byte, 2)`, `(coding, 1)`, and `(interview, 1)`. A horizontal arrow labeled 'push all pairs' connects the initial and final states, indicating that all pairs from some unspecified source have been inserted into the `max_heap`, resulting in the final state where the pairs are ordered according to their second element (the numerical value), with the pair having the largest numerical value at the top.  The `max_heap` structure implies that the pairs are ordered such that the pair with the highest numerical value is at the top.](/assets/images/dsa/heaps/d6bc2174951d39b1.webp)

One way to populate the heap is to push all `n` strings into it one by one, which will take O ( n log ⁡ ( n ) ) O(n\log(n)) O ( n lo g ( n )) time. Instead, we can perform the **heapify** operation on an array containing all the string-frequency pairs to create the max-heap in O ( n ) O(n) O ( n ) time.

To collect the `k` most frequent strings, pop off the top element from the heap `k` times and store the corresponding strings in the output array `res`:

![Image represents a step-by-step visualization of a top-k frequent element algorithm with k=2.  The process begins with a max-heap containing three elements: (go, 3), (byte, 2), and (coding, 1).  The top element, (go, 3), is identified by a `max:` label and an arrow indicates it's popped from the heap and added to a result list `res`, which initially is empty.  This results in a new max-heap containing (byte, 2), (coding, 1), and (interview, 1), and `res` now equals `[go]`.  The next iteration identifies (byte, 2) as the maximum, pops it, and adds it to `res`, yielding a max-heap with (coding, 1) and (interview, 1), and `res` becoming `[go, byte]`.  The algorithm stops here because k=2, and the final `res` list `[go, byte]` is returned, as indicated by an arrow labeled 'return'.  Each max-heap is visually represented as a trapezoid, clearly showing its elements.](/assets/images/dsa/heaps/d6a2bd3c1409d29f.webp)

Now, we just need to ensure that when two strings have the same frequency, the one that comes first lexicographically has a higher priority in the heap. To do this, we can define a custom comparator for the heap that prioritizes strings lexicographically when their frequencies match, as demonstrated in the implementation below.

## Implementation - Max-Heap

We create a Pair class for string-frequency pairs, enabling us to customize priority using a custom comparator.

```python
from typing import List
from collections import Counter
import heapq
    
class Pair:
   def __init__(self, str, freq):
       self.str = str
       self.freq = freq
    
   # Define a custom comparator.
   def __lt__(self, other):
       # Prioritize lexicographical order for strings with equal frequencies.
       if self.freq == other.freq:
           return self.str < other.str
       # Otherwise, prioritize strings with higher frequencies.
       return self.freq > other.freq
    
def k_most_frequent_strings_max_heap(strs: List[str], k: int) -> List[str]:
   # We use 'Counter' to create a hash map that counts the frequency of each string.
   freqs = Counter(strs)
   # Create the max heap by performing heapify on all string-frequency pairs.
   max_heap = [Pair(str, freq) for str, freq in freqs.items()]
   heapq.heapify(max_heap)
   # Pop the most frequent string off the heap 'k' times and return these 'k' most
   # frequent strings.
   return [heapq.heappop(max_heap).str for _ in range(k)]
```

### Complexity Analysis

**Time complexity:** The time complexity of `k_most_frequent_strings_max_heap` is O ( n + k log ⁡ ( n ) ) O(n+k\log(n)) O ( n + k lo g ( n )).

- It takes O ( n ) O(n) O ( n ) time to count the frequency of each string using `Counter`, and to build the `max_heap`.
- We also pop off the top of the heap k k k times, with each `pop` operation taking O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )) time.

Therefore, the overall time complexity is O ( n ) + k O ( log ⁡ ( n ) ) = O ( n + k log ⁡ ( n ) ) O(n)+kO(\log(n))=O(n+k\log(n)) O ( n ) + k O ( lo g ( n )) = O ( n + k lo g ( n )).

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the hash map and heap store at most n n n pairs. Note that the output array is not considered in the space complexity.

## Intuition - Min-Heap

As a follow up, your interviewer may ask you to modify your solution to reduce the space used by the heap.

In the previous approach, we ended up storing up to `n` items in the heap. However, since we only need the `k` most frequent characters, is there a way to maintain a heap with a space complexity of O ( k ) O(k) O ( k )?

An important observation is that when our heap exceeds size k, we can **discard the lowest frequency strings until the heap's size is reduced to k again**. We can do this because those discarded strings definitely won't be among the k most frequent strings.

However, we can't implement this strategy with a max-heap because we won't have access to the lowest frequency string. Instead, we need to use a **min-heap**.

Let's observe how this works over an example:

![Image represents a data structure manipulation process.  On the left, a table labeled 'freqs' displays word frequencies.  The table has two columns: 'str' (string) and 'freq' (frequency).  The 'str' column lists words: 'go,' 'coding,' 'byte,' and 'interview,' while the 'freq' column shows their corresponding frequencies: 3, 1, 2, and 1, respectively. The 'go' row is highlighted in peach. An arrow labeled 'push to heap' points from the 'go' row's frequency (3) to the right. On the right, a data structure labeled 'min_heap' is depicted as a truncated triangular shape, representing a min-heap.  Inside the min-heap, a rectangle labeled `min:` contains the tuple `(go, 3)`, indicating that the word 'go' with a frequency of 3 has been pushed into the min-heap.  The overall image illustrates the process of pushing an element (a word and its frequency) from a frequency table into a min-heap data structure.](/assets/images/dsa/heaps/ded70535dea8a3e0.webp)

![Image represents a data structure manipulation process.  On the left, a table labeled 'freqs' displays word frequencies;  'str' denotes the word and 'freq' its count.  The table lists 'go' (frequency 3), 'coding' (frequency 1), 'byte' (frequency 2), and 'interview' (frequency 1).  A horizontal arrow labeled 'push to heap' points from the 'coding' row (highlighted in peach) to the right.  On the right, a min-heap data structure is depicted using a trapezoidal shape labeled 'min_heap'.  Inside the heap, the pair '(go, 3)' is visible, indicating the word 'go' and its frequency.  Above the heap, a rectangular box with a violet border shows '(coding, 1)' and is labeled with `min:` in violet text, suggesting this is the minimum element currently in the heap. The arrow indicates that the (coding, 1) pair is being added to the min-heap, implying that the process involves inserting word-frequency pairs from the table into the min-heap, maintaining the min-heap property.](/assets/images/dsa/heaps/50706a169aee351e.webp)

![Image represents a data structure manipulation process. On the left, a table labeled 'freqs' shows a list of strings ('go', 'coding', 'byte', 'interview') and their corresponding frequencies (3, 1, 2, 1).  A peach-colored row highlights 'byte' and its frequency 2. An arrow labeled 'push to heap' points from this row to the right side. The right side depicts a min-heap data structure, represented by a trapezoidal shape labeled 'min_heap,' containing elements in the format '(string, frequency)'.  Initially, the heap contains '(byte, 2)' and '(go, 3)'. A purple rectangle above the heap shows '(coding, 1)' being pushed into the heap.  An arrow labeled 'heap size > k: pop' indicates that if the heap size exceeds a value 'k' (not specified), elements are popped from the heap.  The entire diagram illustrates the process of pushing string-frequency pairs from a frequency table into a min-heap, potentially followed by popping elements if the heap size exceeds a threshold.](/assets/images/dsa/heaps/d108b7d605b49233.webp)

![Image represents a data structure manipulation process involving a frequency table and a min-heap.  On the left, a table labeled 'freqs' shows the frequency of strings: 'go' (3), 'coding' (1), 'byte' (2), and 'interview' (1).  The table has columns labeled 'str' and 'freq'.  A horizontal arrow labeled 'push to heap' points from the 'interview' row (highlighted in peach) to the right. This arrow indicates that the ('interview', 1) pair is being added to a min-heap data structure shown on the right. The min-heap, labeled 'min_heap', is depicted as a truncated triangular structure containing the pairs ('byte', 2) and ('go', 3).  A smaller rectangle, highlighted in peach and labeled `min: (interview, 1)`, sits above the min-heap, representing the newly added element. A rightward arrow connects this rectangle to the min-heap, indicating the insertion.  Finally, a rightward arrow extends from the min-heap, labeled 'heap size > k: pop', suggesting that if the heap size exceeds a threshold 'k', an element will be removed (popped) from the heap.  The entire diagram illustrates the process of building a min-heap from a frequency table, potentially as part of a frequency-based algorithm.](/assets/images/dsa/heaps/6a1bfe9fa05a2147.webp)

In the end, the strings remaining in the heap are our top `k` frequent strings:

![Image represents a visual depiction of a min-heap data structure.  The diagram shows a trapezoidal shape labeled 'min_heap' at the bottom, representing the heap itself. Inside the trapezoid, the tuple '(go, 3)' is displayed, indicating an element within the heap with a key 'go' and a value of 3.  Above the trapezoid, a rectangular box with rounded corners is positioned; this box is labeled 'min:' in a smaller, separate box to its left. Inside the main rectangular box, the tuple '(byte, 2)' is shown. This represents another element, with key 'byte' and value 2, which is seemingly outside the main heap structure but associated with it, possibly representing a node that could be added or is being considered for addition to the min-heap. The overall arrangement suggests a representation of a min-heap where elements are ordered such that the parent node always has a smaller value than its children, with '(byte, 2)' potentially being the next element to be inserted or the smallest element currently outside the heap. The purple color scheme unifies the visual elements.](/assets/images/dsa/heaps/5bffa816421a98f3.webp)

To retrieve these strings, pop them from the heap until it's empty. Because we're using a min-heap, we're popping off the less frequent strings first. So, we need to reverse the order of the retrieved strings before returning the result:

![Image represents a step-by-step visualization of a coding pattern, likely involving a min-heap data structure.  The diagram shows three stages.  Each stage features a purple, trapezoid-shaped min-heap, labeled 'min_heap,' containing pairs of elements.  Above each min-heap is a purple rectangle labeled 'min:' followed by the minimum element currently at the top of the heap.  In the first stage, the min-heap contains ('byte', 2) and ('go', 3).  A horizontal arrow points from ('byte', 2) to a dashed-line rectangle below labeled 'res = [byte]', indicating that the minimum element ('byte', 2) is popped from the heap and added to a result list 'res'.  The second stage shows the min-heap after this operation, containing only ('go', 3).  The minimum element ('go', 3) is then popped and added to 'res', resulting in 'res = [byte, go]' in the second dashed-line rectangle. The third stage shows an empty min-heap and the final 'res = [byte, go]' list. A green arrow points from this final 'res' list to the text 'return reverse(res)', indicating that the algorithm concludes by returning the reversed version of the 'res' list.](/assets/images/dsa/heaps/fba06da39e5f1d53.webp)

```python
from typing import List
from collections import Counter
import heapq
    
class Pair:
    def __init__(self, str, freq):
        self.str = str
        self.freq = freq
    # Since this is a min-heap comparator, we can use the same comparator as the one
    # used in the max-heap, but reversing the inequality signs to invert the priority.
    def __lt__(self, other):
        if self.freq == other.freq:
            return self.str > other.str
        return self.freq < other.freq
    
def k_most_frequent_strings_min_heap(strs: List[str], k: int) -> List[str]:
    freqs = Counter(strs)
    min_heap = []
    for str, freq in freqs.items():
        heapq.heappush(min_heap, Pair(str, freq))
        # If heap size exceeds 'k', pop the lowest frequency string to ensure the heap
        # only contains the 'k' most frequent words so far.
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    # Return the 'k' most frequent strings by popping the remaining 'k' strings from
    # the heap. Since we're using a min-heap, we need to reverse the result after
    # popping the elements to ensure the most frequent strings are listed first.
    res = [heapq.heappop(min_heap).str for _ in range(k)]
    res.reverse()
    return res
```

**Time complexity:** The time complexity of `k_most_frequent_strings_min_heap` is O ( n log ⁡ ( k ) ) O(n\log(k)) O ( n lo g ( k )).

- It takes O ( n ) O(n) O ( n ) time to count the frequency of each string using `Counter`.
- To populate the heap, we push n n n words onto it, with each `push` and `pop` operation taking O ( log ⁡ ( k ) ) O(\log(k)) O ( lo g ( k )) time. This takes O ( n log ⁡ ( k ) ) O(n\log(k)) O ( n lo g ( k )) time.
- Then, we extract k k k strings from the heap by performing the `pop` operation k k k times. This takes O ( k log ⁡ ( k ) ) O(k\log(k)) O ( k lo g ( k )) time.
- Finally, we reverse the output array, which takes O ( k ) O(k) O ( k ) time.

Therefore, the overall time complexity is O ( n ) + O ( n log ⁡ ( k ) ) + O ( k log ⁡ ( k ) ) + O ( k ) = O ( n log ⁡ ( k ) ) O(n)+O(n\log(k))+O(k\log(k))+O(k)=O(n\log(k)) O ( n ) + O ( n lo g ( k )) + O ( k lo g ( k )) + O ( k ) = O ( n lo g ( k )).

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the hash map stores at most n n n pairs, whereas the heap only takes up O ( k ) O(k) O ( k ) space. The `res` array is not considered in the space complexity.
