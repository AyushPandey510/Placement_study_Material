---
title: "NextLexicographicalSequence"
course: "DSA"
topic: "DSA"
source: "/home/ayush/OOD-Design-Principles/DSA/NextLexicographicalSequence___Technical_Interview_Prep.html"
---
Given a string of lowercase English letters, rearrange the characters to form a new string representing the **next immediate sequence in lexicographical** (alphabetical) **order**. If the given string is already last in lexicographical order among all possible arrangements, return the arrangement that's first in lexicographical order.

#### Example 1:

```python
Input: s = 'abcd'
Output: 'abdc'
```

Explanation: `"abdc"` is the next sequence in lexicographical order after rearranging `"abcd"`.

#### Example 2:

```python
Input: s = 'dcba'
Output: 'abcd'
```

Explanation: Since `"dcba"` is the last sequence in lexicographical order, we return the first sequence: `"abcd"`.

#### Constraints:

- The string contains at least one character.

## Intuition

Before devising a solution, let’s first make sure we understand what the next lexicographical sequence of a string is.

An important detail is that a string’s next lexicographical sequence is lexicographically *larger* than the original string. Consider the string “abc” and all its permutations in a lexicographically ordered sequence:

![Image represents a table of three columns and six rows containing permutations of the letters 'a', 'b', and 'c'.  Each row presents a unique arrangement of these three letters. A vertical arrow separates the table from the text 'lexicographical order'. This arrow indicates that the rows in the table are ordered lexicographically; that is, they are arranged in ascending order as they would appear in a dictionary.  The ordering starts with 'a' as the smallest element, followed by 'b', and then 'c'.  The first row is 'abc', the second is 'acb', and so on, systematically exhausting all possible permutations of the three letters in lexicographical order.](/assets/images/dsa/dsa/19c6bc8bf69a9e0f.webp)

We can see the increasing order of the strings in the sequence when we translate each letter to its position in the alphabet:

![Image represents a mapping of permutations of the letters 'a', 'b', and 'c' to their corresponding numerical representations.  Six rows display all possible orderings of these three letters.  Each row shows a permutation on the left side, followed by a grey arrow indicating a transformation.  On the right side, each permutation is mapped to a unique set of numbers (1, 2, and 3), representing the rank of each letter within its permutation.  For example, in the first row, 'a', 'b', and 'c' map to 1, 2, and 3 respectively, reflecting their increasing order.  The vertical orange arrow and the word 'increasing' highlight that the numerical mapping consistently assigns 1 to the smallest letter, 2 to the next smallest, and 3 to the largest within each row's permutation.  The arrangement visually demonstrates a one-to-one correspondence between letter permutations and their ranked numerical equivalents.](/assets/images/dsa/dsa/c953035d37633a13.webp)

From this, we also notice the next string in the sequence after “abc” is “acb”, which is the first string larger than the original string:

![Image represents a table illustrating a mapping between character sequences and numerical sequences.  Six rows display different permutations of the characters 'a', 'b', and 'c' in the leftmost column.  Each character sequence is connected via a grey arrow to a corresponding numerical sequence (1, 2, 3) in the rightmost column.  The numerical sequences represent rankings or assignments based on the input character sequence.  For example, the sequence 'abc' maps to '1 2 3', while 'acb' maps to '1 3 2'.  An orange arrow points from the numerical sequence '1 3 2' to the text 'next largest after 'abc'', indicating that this numerical sequence represents the next largest ranking after the sequence 'abc' based on some implied ordering or ranking system.  The image demonstrates a pattern or algorithm that transforms character permutations into ranked numerical sequences.](/assets/images/dsa/dsa/cd1430e88d430b6a.webp)

This gives us some indication of what we need to find. The next lexicographical string:

1. Incurs the **smallest possible lexicographical increase** from the original string.
2. Uses the same letters as the original string.

**Identifying which characters to rearrange** Since our goal is to make the smallest possible increase, we need to somehow rearrange the characters on the right side of the string.

To understand why, imagine trying to “increase” a string’s value. Increasing the rightmost letter causes the resulting string to be closer to the original string lexicographically than increasing the leftmost letter does:

![Image represents two rows of data, each showing a sequence of letters (a, b, c, d, e) with corresponding numerical values (1, 2, 3, 4, 5) beneath them.  The top row displays the sequence 'a b c e d d,' with values '1 2 3 5 4 4' respectively. The bottom row shows a slightly altered sequence: 'b a b c e d d a,' with values '2 1 2 3 5 4 4 1' respectively.  A diagonal strikethrough line connects 'a' (value 1) in the top row to 'b' (value 2) in the top row, and similarly connects 'a' (value 1) in the bottom row to 'b' (value 2) in the bottom row.  The top row is labeled '(small increase)' and the bottom row is labeled '(big increase),' indicating that the changes between the two rows represent different magnitudes of increase in the value associated with 'a'.  The numerical values under each letter represent the magnitude of each element in the sequence. The visual emphasis is on the change in the position and value of 'a' between the two rows, highlighting the concept of a small versus a big increase in a sequence.](/assets/images/dsa/dsa/251fe6b81d60f52f.webp)

Therefore, **we should focus on rearranging characters on the right-hand side of the string first**, if possible.

A key insight is that the last string in a lexicographical sequence (i.e., the largest permutation) will always follow a **non-increasing** order. We can see this with the string “abcc”, for example, with its largest possible permutation being “ccba”:

![Image represents a diagram illustrating a coding pattern transformation.  The diagram shows two sequences of characters, 'a', 'b', 'c', 'c' and 'c', 'c', 'b', 'a', arranged vertically with their corresponding numerical indices (1, 2, 3, 3 and 3, 3, 2, 1 respectively) displayed below. A black arrow connects the first sequence to the second, labeled 'last permutation'.  Above this arrow and connected to the second sequence by an orange arrow is the label 'non-increasing', indicating the transformation's goal. The transformation shows the initial sequence being reordered into a non-increasing sequence, where the elements are arranged in descending order, or if equal, maintain their original order.  The numerical indices also reflect this reordering, demonstrating the change in position of the elements after the transformation.](/assets/images/dsa/dsa/0515ba01234bbfec.webp)

How does this help us? We know we need to rearrange the characters on the right of the string, but we don’t know how many to rearrange. From now on, let’s refer to the rightmost characters that should be rearranged as the **suffix**.

Take the string "abcedda" as an example. We traverse it from right to left with the **goal of finding the shortest suffix that can be rearranged to form a larger permutation.** The last 4 characters form a non-increasing suffix, and cannot be rearranged to make the string larger:

![Image represents three rows of data illustrating a non-increasing subsequence pattern. Each row displays a sequence of characters (a, b, c, e, d, d, a) with corresponding numerical values (1, 2, 3, 5, 4, 4, 1) beneath them.  The arrangement shows the initial sequence followed by progressively identified non-increasing subsequences.  The non-increasing subsequences (d, d, a) are highlighted with a peach-colored background and the label 'non-increasing' is written in orange text above each subsequence. The numerical values remain consistent across all rows, demonstrating how the non-increasing subsequence is identified within the larger sequence.  The visual structure emphasizes the iterative identification of the non-increasing subsequence from the original sequence.](/assets/images/dsa/dsa/6fec0d7b44b70e28.webp)

However, the next character, ‘c’, breaks the non-increasing sequence:

![Image represents a sequence of characters 'a', 'b', 'c', 'e', 'd', 'd', 'a' displayed horizontally, each character having a corresponding numerical value (1, 2, 3, 5, 4, 4, 1) shown below.  The characters 'c', 'e' are highlighted in a peach-colored background, indicating they form a non-increasing subsequence (3, 5). A curved arrow connects the numerical values 3 and 5, pointing downwards to '3 < 5', explicitly showing the non-increasing relationship.  A horizontal arrow connects the entire character sequence to the text 'can rearrange to incur an increase' in orange, indicating that because the sequence is not monotonically non-increasing, it can be rearranged to create an increasing sequence. The text 'not non-increasing!' in orange further emphasizes the initial sequence's non-monotonic nature.](/assets/images/dsa/dsa/0d46fbf9e76ac4f4.webp)

Let’s call this character the **pivot**:

![Image represents a visual depiction of a pivot operation, likely within a sorting algorithm.  The top shows the word 'pivot' in light blue, with a downward-pointing arrow indicating the pivot element. Below, a horizontal sequence of elements is displayed: 'a', 'b', 'c', 'e', 'd', 'd', 'a'. Each element is associated with a numerical value (1, 2, 3, 5, 4, 4, 1) written beneath it in orange.  The element 'c' (with value 3) is highlighted in a peach-colored background, indicating it's the chosen pivot. The arrangement shows the initial state before the pivot operation, with the pivot element visually separated. The numbers likely represent the values being sorted, and the letters are placeholders or keys associated with those values. The image illustrates a single step in a sorting algorithm where the pivot is selected and the data is prepared for partitioning or comparison based on the pivot's value.](/assets/images/dsa/dsa/7f7b5f9f26edf987.webp)

If no pivot is found, it means the string is already the last lexicographical sequence. In this case, we need to obtain its first lexicographical permutation as the problem states. This can be done by reversing the string:

![Image represents a simple illustration of a data reversal operation.  On the left, a sequence of four lowercase letters, 'd', 'c', 'b', and 'a', are arranged from left to right. A thick, black arrow connects this sequence to another sequence on the right. The arrow is labeled 'reverse' indicating the transformation applied. The sequence on the right shows the same letters, but in reversed order: 'a', 'b', 'c', and 'd', arranged from left to right. The diagram visually demonstrates how the 'reverse' operation transforms the input sequence into its reversed counterpart.  No URLs or parameters are present.](/assets/images/dsa/dsa/211d4da6b2dd2f2f.webp)

**Rearranging characters** Having identified the shortest suffix to rearrange, the next objective is to rearrange this suffix to make the **smallest increase possible**. We have to start the rearrangement at the pivot since the rest of the suffix is already arranged in its largest permutation.

To make the character at the pivot position larger, we’d need to **swap the pivot with a character larger than it on the right**.

In our example, which character should our pivot (‘c’) swap with? We want to swap it with a character larger than 'c,' but not *too* much larger because the increase should be as small as possible. Let’s figure out how we find such a character.

Since the substring after the pivot is lexicographically non-increasing, we can find the closest character larger than ‘c’ by **traversing this suffix from right to left and stopping at the first character larger than it.** In other words, we’re finding the rightmost successor to the pivot, which is ‘d’:

![Image represents a diagram illustrating a concept likely related to data structures or algorithms, specifically focusing on finding a pivot and its rightmost successor.  The diagram shows two sequences of characters ('a', 'b', 'c', 'e', 'd', 'a') with associated numerical indices (1, 2, 3, 5, 4, 1, 4, 1) beneath them.  The character 'c' is highlighted in cyan and labeled 'pivot,' indicating it's a selected element. A downward-pointing arrow connects 'pivot' to 'c', showing its selection.  Separately, the text 'rightmost_successor' is shown above a downward-pointing arrow pointing to the second instance of 'd' in the sequence. This suggests that 'd' is identified as the rightmost successor of the pivot 'c' within the context of the algorithm or data structure being depicted. The arrangement implies a process where a pivot is chosen, and then a specific successor element is identified based on some criteria (in this case, the rightmost occurrence).](/assets/images/dsa/dsa/fca6ca88b4ee118b.webp)

Now, we swap the pivot and the rightmost successor:

![Image represents a visual depiction of a data transformation or rearrangement process.  The left side shows a sequence of characters ('a', 'b', 'c', 'e', 'd', 'a') each with a numerical subscript (1, 2, 3, 5, 4, 1 respectively).  The characters 'c' and 'a' are highlighted in cyan and black respectively.  These characters are connected by a curved arrow forming a loop, indicating a cyclical or iterative relationship. The arrow points from 'a' to 'c' and then back to 'a'. A straight arrow points from this looped sequence to a second sequence on the right. The right-side sequence is a rearrangement of the left-side sequence ('a', 'b', 'd', 'e', 'd', 'c', 'a'), maintaining the same numerical subscripts (1, 2, 4, 5, 4, 3, 1) but with a changed order.  The character 'c' remains highlighted in cyan, and 'a' in black, indicating that these elements retain their identity despite the shift in position within the sequence. The overall diagram illustrates a transformation where the order of elements changes, but the elements themselves and their associated numerical values remain consistent.](/assets/images/dsa/dsa/e9862158242661ab.webp)

The character at the pivot has increased, so to get the next permutation, **we should make the substring after the pivot as small as possible**. After the swap shown above, we see that substring “edca” is not at its smallest permutation. So, we need to minimize the permutation of this substring.

An important observation is that after the previous swap, the substring after the pivot is still lexicographically non-increasing.

![Image represents a sequence of elements ('a', 'b', 'd', 'e', 'd', 'c', 'a') each associated with a numerical value (1, 2, 4, 5, 4, 4, 1 respectively) displayed below.  A downward-pointing arrow labeled 'pivot' in orange text points to the element 'd' (with value 4), indicating this element as a pivot point.  A horizontal arrow in orange text connects the elements 'e', 'd', 'c', 'a' (with values 5, 4, 4, 1 respectively), which are highlighted in a peach-colored background.  The text 'still non-increasing' describes the relationship between these highlighted elements, indicating their values are not increasing.  Another orange text phrase, 'make this as small as possible,' suggests an optimization goal: to minimize the range or size of this highlighted subsequence.  The overall diagram illustrates a concept related to finding a pivot point within a sequence and optimizing a subsequence based on a non-increasing condition.](/assets/images/dsa/dsa/70e61698faa35348.webp)

This means we can minimize this substring’s permutation by reversing it:

![Image represents a sequence transformation process.  The input is a sequence 'a b d e d c a' with corresponding numerical values '1 2 3 5 4 3 1' displayed below. This input sequence is highlighted in a peach-colored rectangle. An arrow labeled 'reverse' indicates the transformation applied to the input. The output sequence is 'a c d e' with values '1 3 4 5' shown below, highlighted in a light green rectangle. The transformation 'reverse' implies that the input sequence within the peach rectangle is reversed, resulting in the output sequence within the green rectangle.  The numerical values associated with each element remain consistent before and after the reversal, indicating that the transformation only affects the order of the elements, not their associated numerical values.](/assets/images/dsa/dsa/79ff5b325a01fc76.webp)

And just like that, we found the next lexicographical sequence! The two-pointer strategy used in this problem is staged traversal, where we first identify the pivot, and then identify the rightmost successor relative to it.

Many steps are involved in identifying the next lexicographical sequence. So, here’s a summary:

1. Locate the pivot.

- The pivot is the first character that breaks the non-increasing sequence from the right of the string.
- If no pivot is found, the string is already at its last lexicographical sequence, and the result is just the reverse of the string.

1. Find the rightmost successor to the pivot.
2. Swap the rightmost successor with the pivot to increase the lexicographical order of the suffix.
3. Reverse the suffix after the pivot to minimize its permutation.

## Implementation

```python
def next_lexicographical_sequence(s: str) -> str:
    letters = list(s)
    # Locate the pivot, which is the first character from the right that breaks
    # non-increasing order. Start searching from the second-to-last position.
    pivot = len(letters) - 2
    while pivot >= 0 and letters[pivot] >= letters[pivot + 1]:
        pivot -= 1
    # If pivot is not found, the string is already in its largest permutation. In
    # this case, reverse the string to obtain the smallest permutation.
    if pivot == -1:
        return ''.join(reversed(letters))
    # Find the rightmost successor to the pivot.
    rightmost_successor = len(letters) - 1
    while letters[rightmost_successor] <= letters[pivot]:
        rightmost_successor -= 1
    # Swap the rightmost successor with the pivot to increase the lexicographical
    # order of the suffix.
    letters[pivot], letters[rightmost_successor] = (letters[rightmost_successor], letters[pivot])
    # Reverse the suffix after the pivot to minimize its permutation.
    letters[pivot + 1:] = reversed(letters[pivot + 1:])
    return ''.join(letters)
```

### Complexity Analysis

**Time complexity:** The time complexity of `next_lexicographical_sequence` is O ( n ) O(n) O ( n ), where n n n denotes the length of the input string. This is because we perform a maximum of two iterations across the string: one to find the pivot and another to find the rightmost character in the suffix that’s greater in value than the pivot. We also perform one reversal, which takes O ( n ) O(n) O ( n ) time.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the letters list. In Python, this additional space is used because strings are immutable, which necessitates storing the input string as a list.

### Test Cases

In addition to the examples discussed, below are more examples to consider when testing your code.

## Interview Tip

Tip: Be precise with your language. It’s crucial to be precise with your choice of words during an interview, especially for technical descriptions. For instance, in this problem, we use “non-increasing” instead of “decreasing,” as “decreasing” implies each term is strictly smaller than the previous one, which isn’t true in this case since adjacent characters can be equal.
