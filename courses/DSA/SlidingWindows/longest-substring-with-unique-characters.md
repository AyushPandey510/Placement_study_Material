---
title: "Longest Substring With Unique Characters"
course: "DSA"
topic: "SlidingWindows"
source: "/home/ayush/OOD-Design-Principles/DSA/SlidingWindows/Longest Substring With Unique Characters.html"
---
Given a string, determine the length of its longest substring that consists only of **unique characters**.

#### Example:

```python
Input: s = 'abcba'
Output: 3
```

Explanation: Substring "abc" is the longest substring of length 3 that contains unique characters ("cba" also fits this description).

## Intuition

The brute force approach involves examining all possible substrings and checking if any consist of exclusively unique characters. Let’s break down this approach:

- Checking a substring for uniqueness can be done in O ( n ) O(n) O ( n ) time by scanning the substring and using a **hash set** to keep track of each character, where n denotes the length of s. If we encounter a character already in the hash set, we know it’s a duplicate character.
- Iterating through all possible substrings takes O ( n 2 ) O(n^2) O ( n 2 ) time.

This means the brute force approach would take O ( n 3 ) O(n^3) O ( n 3 ) time overall. This is quite slow, largely because we look through every substring. Is there a way to reduce the number of substrings we examine?

**Sliding window** Sliding window approaches can be quite useful for problems that involve substrings. In particular, because we’re looking for the longest substring that satisfies a specific condition (i.e., contains unique characters), a **dynamic sliding window** algorithm might be the way to go, as discussed in the introduction.

We can categorize any window in two ways. A window either:

1. Consists only of unique characters (a window with no duplicate characters).

![Image represents a visual depiction of a data structure or algorithm concept related to character uniqueness.  A light-blue rectangular box contains the characters 'a', 'b', and 'c' arranged horizontally.  A gray line underlines this box, with a downward-pointing arrow extending from the center of the line. Below the arrow, the text 'no duplicate characters' is displayed, indicating a constraint or condition.  The characters 'b' and 'a' appear to the right of the box, suggesting a potential input stream or sequence. The overall arrangement implies a process where the characters within the box are checked against subsequent characters (like 'b' and 'a') to ensure no duplicates exist, possibly as part of a validation or filtering step within a larger algorithm.](/assets/images/dsa/slidingwindows/6c1b00503354c914.webp)

1. Contains at least one character of a frequency greater than 1.

If A is true, we should **expand** the window by advancing the right pointer to find a longer window that also contains no duplicates.

If B is true because we encounter a duplicate character in the window, we should **shrink** the window by advancing the left pointer until it no longer contains a duplicate.

Let’s try this strategy over the following example. We initialize a hash set to keep track of the characters in a window.

![Image represents a sequence of characters 'a', 'b', 'c', 'b', 'a' displayed horizontally, each character having a corresponding numerical index (0, 1, 2, 3, 4) shown below in a lighter gray font.  This sequence is positioned to the left of a rectangular box labeled 'hash set'.  There are no explicit connections drawn between the character sequence and the hash set, implying a conceptual relationship rather than a direct data flow. The image likely illustrates the concept of adding elements from the sequence into a hash set, where the hash set would only contain unique elements ('a', 'b', 'c' in this case), eliminating duplicates.  The indices suggest an ordered input, while the hash set represents an unordered collection of unique elements.](/assets/images/dsa/slidingwindows/584971f87b788da6.webp)

To implement the sliding window technique, we should establish the following:

- Left and right pointers: Initialize both at the start of the string to define the window's boundaries.
- hash_set : Maintain a hash set to record the unique characters within the window, updating it as the window expands. Note, the hash set shown in the diagram displays its state before the character at the right pointer is added to it.

Now, let’s start looking for the longest window. Expand the window from the beginning of the string by advancing the right pointer. Keep expanding until a duplicate character is found:

![Image represents a diagram illustrating a sliding window algorithm.  Two rectangular boxes labeled 'left' and 'right' point downwards to a sequence of characters 'a b c b a' indexed 0 through 4.  A light-blue box highlights the first character 'a' at index 0.  To the right, an empty rectangular box labeled 'hash_set' is shown. A dashed-line rectangle contains the text ''a' not in hash_set → expand window,' indicating that if the character 'a' is not found within the hash_set, the window expands.  The arrows and text describe the conditional logic of the algorithm: the 'left' and 'right' pointers control the window's boundaries, and the 'hash_set' is used to track characters within the current window; the window expands if a character is not present in the hash_set.](/assets/images/dsa/slidingwindows/c02e2589204cf79d.webp)

![Image represents a sliding window algorithm visualization.  Two rectangular boxes labeled 'left' (gray) and 'right' (orange) point downwards with arrows to a light-blue rectangular box containing a sequence of characters: 'a', 'b', 'c', 'b', 'a', indexed from 0 to 4.  A dashed orange arrow curves from index 0 to index 1, indicating a window's movement.  Separately, a rectangular box labeled 'hash_set' contains the character 'a'. A light-gray, dashed-bordered rectangle displays the condition ' 'b' not in hash_set → expand window', illustrating that if the character 'b' is not found within the hash_set, the window expands.  The overall diagram shows the interaction between a sliding window (represented by the light-blue box and the arrows), a hash set (containing elements), and a conditional statement that governs the window's expansion based on the presence or absence of elements in the hash set.](/assets/images/dsa/slidingwindows/0f07c0017b61f572.webp)

![Image represents a sliding window algorithm visualization.  A light-blue rectangular box labeled 'a b c b a' with indices 0 through 4 underneath represents the input array.  A gray box labeled 'left' points down to the beginning of the array, and an orange box labeled 'right' points to the element 'c' at index 2. A dashed arrow from the 'b' at index 1 to the 'c' at index 2 indicates the movement of the right pointer.  Separately, a box labeled 'hash_set' contains the elements 'a' and 'b'. A light-gray, dashed-bordered rectangle displays the condition ' 'c' not in hash_set → expand window,' illustrating that because 'c' is not present in the hash set, the window expands (the right pointer moves).  The overall diagram shows the interaction between a sliding window, a hash set used for tracking elements within the window, and the condition that triggers window expansion.](/assets/images/dsa/slidingwindows/6c8b42d095392301.webp)

![Image represents a sliding window algorithm visualization for finding the longest substring without repeating characters.  A sequence 'abcba' is shown, with a sliding window indicated by a light red background.  A gray box labeled 'left' points down to the leftmost element ('a') of the window, and an orange box labeled 'right' points to the current rightmost element ('b').  The window's indices (0-4) are displayed below the sequence.  A dashed arrow from the second 'b' loops back to itself, highlighting the duplicate.  Separately, a box represents a 'hash_set' containing elements 'a', 'b', and 'c', with 'b' shaded to indicate its presence.  A light gray dashed box to the right explains the algorithm's logic: if 'b' is found in the 'hash_set' (indicating a duplicate), the window shrinks.  The red text 'window contains duplicate' clarifies the current state.](/assets/images/dsa/slidingwindows/1956fadb6e2bde40.webp)

We see above that the ‘b’ at index 3 is a duplicate character in the window because ‘b’ is already in the hash set.

Now that we found a duplicate, we should shrink the window by advancing the left pointer until the window no longer contains a duplicate ‘b’. Once the window is valid again, continue expanding:

![Image represents a sliding window algorithm for finding duplicates within a sequence.  Two rectangular boxes labeled 'left' (orange) and 'right' (gray) point downwards to a sequence 'a b c b a' with indices 0-4 displayed below.  The 'left' pointer indicates the start of the window, currently at index 0. The 'right' pointer indicates the end of the window, currently at index 3.  A dashed orange line connects the 'left' box to the 'b' at index 1, highlighting the window's movement. The sequence portion 'b c b' (indices 1-3) is highlighted in light red, indicating the current window.  Separately, a rectangular box labeled 'hash_set' contains 'b' (highlighted in gray) and 'c', representing a set storing elements within the current window.  A light gray, dashed-bordered rectangle displays the text ''b' still in hash_set → shrink window', indicating that because 'b' is already present in the hash_set, the window needs to shrink from the left to remove the duplicate.  The text 'window contains duplicate' in red below the sequence emphasizes the presence of a duplicate within the current window.](/assets/images/dsa/slidingwindows/c77a2d6b78ab260a.webp)

![Image represents a sliding window algorithm visualization.  At the top, two rectangular boxes labeled 'left' (in orange) and 'right' (in gray) represent pointers indicating the window's boundaries.  Arrows from these boxes point downwards to a sequence of characters 'a b c b a' indexed 0 through 4, indicating the data stream.  A light-blue rectangle highlights the current window encompassing 'c b'. A dashed arrow from 'b' at index 1 points to the 'c' at index 2, suggesting the window's movement. To the right, a rectangular box labeled 'hash_set' contains the character 'c', representing a set storing characters within the current window. Finally, a light-gray, dashed-bordered rectangle describes the algorithm's logic: ' 'b' not in hash_set → expand window', indicating that if a character ('b' in this case) is not found in the hash_set, the window expands.](/assets/images/dsa/slidingwindows/ab69bb0e5da69660.webp)

![Image represents a sliding window algorithm visualization.  A sequence of characters 'a', 'b', 'c', 'b', 'a' is shown, indexed from 0 to 4.  Two rectangular boxes labeled 'left' (gray) and 'right' (orange) point downwards with arrows to the sequence, indicating the boundaries of a sliding window.  The window initially encompasses 'c', 'b', and 'a' (indices 2, 3, and 4). A separate box labeled 'hash_set' contains 'c' and 'b', representing a set of characters encountered within the window. A dashed light-blue rectangle highlights the current window. A light-gray, dashed-bordered box describes the algorithm's logic: if the character 'a' is not found in the `hash_set`, the window expands.  The arrows visually connect the 'right' pointer, the window's expansion, and the update of the `hash_set`.  The indices below the character sequence provide positional context.](/assets/images/dsa/slidingwindows/30813c4db485cb02.webp)

Expanding the window any further will cause the right pointer to exceed the string’s boundary, at which point we end our search. The longest substring we’ve found with no duplicates is of length 3. We can use the variable **max_len** to keep track of this length during our search.

## Implementation

```python
def longest_substring_with_unique_chars(s: str) -> int:
    max_len = 0
    hash_set = set()
    left = right = 0
    while right < len(s):
        # If we encounter a duplicate character in the window, shrink the window until
        # it’s no longer a duplicate.
        while s[right] in hash_set:
            hash_set.remove(s[left])
            left += 1
        # Once there are no more duplicates in the window, update 'max_len' if the
        # current window is larger.
        max_len = max(max_len, right - left + 1)
        hash_set.add(s[right])
        # Expand the window.
        right += 1
    return max_len
```

## Complexity Analysis

**Time complexity:** The time complexity of `longest_substring_with_unique_chars` is O ( n ) O(n) O ( n ) because we traverse the string linearly with two pointers.

**Space complexity:** The space complexity is O ( m ) O(m) O ( m ) because we use a hash set to store unique characters, where m represents the total number of unique characters within the string.

## Optimization

The above approach solves the problem, but we can still optimize it. The optimization has to do with how we shrink the window when encountering a duplicate character. Consider the following example, where the right pointer encounters a duplicate ‘c’:

![Image represents a diagram illustrating a coding pattern, possibly related to array manipulation or string processing.  A light pink rectangle displays a sequence of characters: 'c a b c_ d e c a'.  Above this rectangle, two rectangular boxes labeled 'left' and 'right' are positioned, each with a downward-pointing arrow indicating data flow. The 'left' arrow points to the beginning of the sequence, and the 'right' arrow points to the last 'c' within the sequence.  Below the rectangle, a curved arrow points upward from the last 'c' to the first 'c', labeled 'duplicate c', suggesting a duplication or mirroring operation. The underscore ('_') under the third 'c' might indicate a placeholder or a position where an operation is performed. The overall diagram visually depicts a process where a character ('c') is duplicated or inserted at a specific location within a sequence, potentially based on pointers or indices represented by 'left' and 'right'.](/assets/images/dsa/slidingwindows/00f31eee2f83fd90.webp)

In the previous approach, we respond to encountering a duplicate by continuously advancing the left pointer to shrink the window until the window no longer contains a duplicate:

![Image represents a diagram illustrating a merging operation, possibly within a sorting algorithm or data structure manipulation.  Two labeled boxes, 'left' (in orange) and 'right' (in gray), represent input sequences.  The 'left' box points downwards with an arrow to a light-blue rectangular box containing the elements 'd' and 'e'.  The 'right' box similarly points to the same light-blue box, adding the element 'c' to its right.  Before the light-blue box, three elements 'c', 'a', and 'b' are shown, with dashed orange arrows indicating they are part of the 'left' input sequence, and are to be merged into the light-blue box.  Another element 'c' is shown to the right of the light-blue box, and an element 'a' is shown further to the right, indicating these are part of the 'right' input sequence. The overall arrangement suggests that elements from the 'left' and 'right' sequences are being combined into a single sorted or ordered sequence within the light-blue box, with the final result potentially being 'c', 'a', 'b', 'c', 'd', 'e', 'c', 'a'.](/assets/images/dsa/slidingwindows/f81ae2c423cd9f6a.webp)

The crucial insight here is that we advanced the left pointer until it passed the **previous occurrence** of ‘c’ in the window. This indicates that if we know the index of the previous occurrence of ‘c’, we can move our left pointer immediately past that index to remove it from the window:

![Image represents a diagram illustrating a data manipulation or merging process.  A light-blue rectangular box contains the characters 'd', 'e', 'c', and 'a'.  Above this box, two rectangular boxes are labeled 'left' (in orange) and 'right' (in gray). A solid orange arrow descends from 'left' pointing to the 'd' character in the light-blue box, indicating data insertion or modification at that point. A solid gray arrow descends from 'right', pointing to the 'c' character in the light-blue box, suggesting data insertion or modification at that location.  To the left of the light-blue box, the characters 'c', 'a', 'b', and 'c' (with an underscore) are shown. A dashed orange curved line connects the 'c' and 'b' characters to the 'd' character in the light-blue box, suggesting a potential relationship or data flow from the left side, possibly indicating data being moved or combined. The overall diagram likely depicts a coding pattern involving the merging or manipulation of data streams or arrays, with 'left' and 'right' representing input sources and the light-blue box representing the resulting output.](/assets/images/dsa/slidingwindows/396be83b75cfabdc.webp)

This gives us a new strategy for advancing the left pointer: if the right pointer encounters a character whose previous index (i.e., previous occurrence) is in the window, move the left pointer one index past that previous index.

We can use a hash map (`prev_indexes`) to store the previous index of each character in the string.

Now we just need to ensure the previous index of a character is in the window. To do this, we compare its index to the left pointer:

- If this index is after the left pointer, it’s inside the window.
- If it is before the left pointer, it’s outside the window

Below is a visual of how to check whether a character is inside the window:

![Image represents a comparison of how a sliding window algorithm handles duplicate elements within and outside its current view.  The diagram is split into two sections, each illustrating a scenario.  The left section, titled 'Previous index inside the window:', shows a sequence 'cabcdeca' where a sliding window is highlighted, encompassing 'abcde'.  Above this sequence, 'left' and 'right' boxes indicate the window's boundaries. Arrows point from these boxes to the 'a' at the left and 'c' at the right edge of the highlighted section. Below, a box displays the code `prev_indexes['c'] = 3 ≥ left`, indicating that the previous index of 'c' (3) is greater than or equal to the left boundary of the window (implied as 0), signifying that 'c' is already present within the window.  Two arrows then point to the conclusions: 'inside window' and 'duplicate in the window'. The right section, titled 'Previous index outside the window:', shows a similar setup with the sequence 'cabcdeca', but the highlighted window is 'abc'.  Again, 'left' and 'right' boxes point to the 'd' and 'a' respectively.  The code `prev_indexes['a'] = 1 < left` shows that the previous index of 'a' (1) is less than the left boundary, meaning 'a' is outside the current window.  Consequently, two arrows point to 'outside window' and 'not a duplicate in the window'.  Both sections use color-coding: the highlighted window sections are shaded differently (pink/light blue) to distinguish the current window's contents, and the element being checked for duplication ('c' and 'a') is highlighted in a distinct color (peach/orange).](/assets/images/dsa/slidingwindows/17339946b20063e8.webp)

## Implementation - Optimized Approach

```python
def longest_substring_with_unique_chars_optimized(s: str) -> int:
    max_len = 0
    prev_indexes = {}
    left = right = 0
    while right < len(s):
        # If a previous index of the current character is present in the current
        # window, it's a duplicate character in the window.
        if s[right] in prev_indexes and prev_indexes[s[right]] >= left:
            # Shrink the window to exclude the previous occurrence of this character.
            left = prev_indexes[s[right]] + 1
        # Update 'max_len' if the current window is larger.
        max_len = max(max_len, right - left + 1)
        prev_indexes[s[right]] = right
        # Expand the window.
        right += 1
    return max_len
```

### Complexity Analysis

**Time complexity:** The time complexity of the optimized implementation is O ( n ) O(n) O ( n ) because we traverse the string linearly with two pointers.

**Space complexity:** The space complexity is O ( m ) O(m) O ( m ) because we use a hash map to store unique characters, where m m m represents the total number of unique characters within the string.
