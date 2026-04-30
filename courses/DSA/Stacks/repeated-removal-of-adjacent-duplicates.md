---
title: "Repeated Removal Of Adjacent Duplicates"
course: "DSA"
topic: "Stacks"
source: "/home/ayush/OOD-Design-Principles/DSA/Stacks/Repeated Removal of Adjacent Duplicates.html"
---
Given a string, continually perform the following operation: **remove a pair of adjacent duplicates** from the string. Continue performing this operation until the string no longer contains pairs of adjacent duplicates. Return the final string.

#### Example 1:

![Image represents a sequence of data transformations or operations.  The sequence begins with two 'a's connected by a red horizontal line, followed by a 'c'. This is then followed by an 'a' and two 'b's connected by a red horizontal line, followed by another 'a'. A grey arrow indicates a transformation from this first segment to a second segment. The second segment starts with a 'c', followed by two 'a's connected by a red horizontal line, and finally another 'c'. A grey arrow indicates the flow from the first segment to the second, suggesting a transformation or mapping from the input (the first segment) to the output (the second segment). The red lines visually highlight groups of elements undergoing a specific operation or transformation, while the grey arrows represent the overall transformation process between the input and output.  The letters 'a', 'b', and 'c' likely represent data elements or variables.](/assets/images/dsa/stacks/f14b10c7965cd241.webp)

```python
Input: s = 'aacabba'
Output: 'c'
```

#### Example 2:

![Image represents a simple data flow diagram illustrating a data transformation or processing step.  The diagram shows two instances of the variable 'a' connected by a thick red horizontal line, suggesting a direct, possibly in-place, modification or operation on 'a'. This is followed by a grey arrow pointing to another instance of 'a', indicating that the modified 'a' (from the red line connection) is then passed on or transformed into a new, potentially different, 'a'. The absence of labels on the connections or the 'a' variables themselves prevents a more precise description of the specific operation or transformation involved, but the visual structure clearly shows a sequential process where data ('a') undergoes a transformation and is then passed along.](/assets/images/dsa/stacks/015957fbd732d135.webp)

```python
Input: s = 'aaa'
Output: 'a'
```

## Intuition

One challenge in solving this problem is how we handle characters which aren’t currently adjacent duplicates but will be in the future.

A solution we can try is to iteratively **build the string character by character** and immediately remove each pair of adjacent duplicates that get formed as we’re building the string.

It’s also possible an adjacent duplicate may be formed after another adjacent duplicate gets removed. For example, with the string “abba”, removing “bb” will result in “aa”. Building the string character by character ensures the formation of “aa” gets noticed and removed. To better understand how this works, let’s dive into an example.

Consider the following string:

![Image represents a sequence of lowercase letters arranged horizontally.  The sequence begins with two instances of the letter 'a', followed by a single 'c', then another 'a', and then two 'b's, concluding with a final 'a'.  There are no connections or arrows depicted between the letters; they are simply presented in a linear, left-to-right order. No URLs, parameters, or other additional information is present beyond the letters themselves.  The letters are spaced evenly apart, suggesting an ordered list or a simple data stream.](/assets/images/dsa/stacks/b77dd3015f57f2c6.webp)

![Image represents a visual depiction of an algorithm, likely for string manipulation.  The top section shows an input string 'a a c a b b a' preceded by a downward-pointing arrow originating from a square box labeled 'i,' suggesting an input indicator.  This input string is then processed, resulting in a 'new string: a' displayed to the right.  The bottom section mirrors the top, again showing the input string 'a a c a b b a' with the same input indicator 'i.'  However, the resulting 'new string' is shown as 'a [a]' with a red line striking through the second 'a', indicating removal.  A dashed-line box to the right of the bottom section labels this action as 'remove adjacent duplicate,' clarifying the algorithmic step performed.  The overall diagram illustrates a process where adjacent duplicate characters are identified and removed from the input string.](/assets/images/dsa/stacks/42cb78efeabf1664.webp)

At the second ‘a’, we notice that adding it would result in an adjacent duplicate forming (i.e., “aa”). So, let’s remove this duplicate before adding any new characters. We’ll do this for all adjacent duplicates we come across as we build the string:

![Image represents a step-by-step illustration of an algorithm to remove adjacent duplicate characters from a string.  The initial string 'a a c a b b a' is displayed at the top.  A downward-pointing arrow labeled 'i' indicates an iterative process.  Each subsequent line shows the string after one iteration, with a new character being added to a 'new string' on the right.  The 'new string' starts empty and progressively accumulates characters from the original string.  Crucially, adjacent duplicate characters in the original string are skipped in the 'new string' construction.  The process continues until the index 'i' reaches the end of the original string.  Two rectangular boxes labeled 'remove adjacent duplicate' are placed to the right, visually associating this action with the iterative removal of adjacent duplicates.  The final 'new string' is 'c a', representing the string with adjacent duplicates removed.  The boxed characters in the 'new string' highlight the character added in each iteration.](/assets/images/dsa/stacks/8a1f134c82d17f59.webp)

Once the smoke clears, the resulting string we were building ends up just being “c”, which is the expected output.

Now that we know how this strategy works, we just need a data structure that'll allow us to:

1. Add letters to one end of it.
2. Remove letters from the same end.

The **stack** data structure is a strong option because it allows for both operations.

As we push characters onto the stack, the top of the stack will represent the previous/most recently added character. Given this, to mimic the process of building the “new string” as shown in the example, we:

- Push the current character onto the stack if it’s different from the character at the top (i.e., not a duplicate character.)
- Pop off the character at the top of the stack if it's the same as the current character (i.e., a duplicate.)

Once all characters have been processed, the last thing to do is return the content of the stack as a string, since the final state of the stack will contain all characters that weren’t removed.

## Implementation

```python
def repeated_removal_of_adjacent_duplicates(s: str) -> str:
    stack = []
    for c in s:
        # If the current character is the same as the top character on the stack,
        # a pair of adjacent duplicates has been formed. So, pop the top character
        # from the stack.
        if stack and c == stack[-1]:
            stack.pop()
        # Otherwise, push the current character onto the stack.
        else:
            stack.append(c)
    # Return the remaining characters as a string.
    return ''.join(stack)
```

### Complexity Analysis

**Time complexity:** The time complexity of the `repeated_removal_of_adjacent_duplicates` function is O ( n ) O(n) O ( n ) where n n n denotes the length of the string. This is because we traverse the entire string, and we perform a join operation of up to n n n characters in the stack. The stack `push` and `pop` operations contribute O ( 1 ) O(1) O ( 1 ) time.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the stack can store at most n n n characters.
