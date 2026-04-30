---
title: "Valid Parenthesis Expression"
course: "DSA"
topic: "Stacks"
source: "/home/ayush/OOD-Design-Principles/DSA/Stacks/Valid Parenthesis Expression.html"
---
Given a string representing an expression of parentheses containing the characters `'('`, `')'`, `'['`, `']'`, `'{'`, or `'}'`, determine if the expression forms a **valid sequence of parentheses**.

A sequence of parentheses is valid if every opening parenthesis has a corresponding closing parenthesis, and no closing parenthesis appears before its matching opening parenthesis.

#### Example 1:

```python
Input: s = '([]{})'
Output: True
```

#### Example 2:

```python
Input: s = '([]{)}'
Output: False
```

Explanation: The `'('` parenthesis is closed before its nested `'{'` parenthesis is closed.

## Intuition

An early observation is that for each type of parenthesis, the number of opening and closing parenthesis must be identical. However, to check if an expression is valid, this observation alone isn’t enough. For example, the string "`())(`" has the same number of opening and closing parentheses, but is still invalid. This means we need a way to account for the order of parentheses.

Consider the string “`()`”. The first parenthesis is opening, and we’re waiting for it to be closing. Upon reaching the second parenthesis, the first parenthesis gets closed.

![Image represents a comparison of two scenarios related to parenthesis in code, likely illustrating a coding pattern or concept.  The left side depicts a state where an opening parenthesis '(' is 'waiting to be closed,' indicated by a downward arrow pointing from the text 'waiting to be closed' to a single opening parenthesis `(` below, labeled with '0' and '1' underneath, possibly representing a counter or index. The right side shows the state where a closing parenthesis ')' is introduced, represented by a downward arrow from 'closes '('' to a closing parenthesis `)` below, also labeled with '0' and '1' similarly.  The overall structure highlights the difference between an unclosed opening parenthesis and the subsequent closing of that parenthesis, emphasizing the importance of balanced parentheses in programming syntax.](/assets/images/dsa/stacks/f1e07ac36864436d.webp)

Now, consider the string “`[(])`”. When we reach index 1, we have two opening parentheses waiting to be closed. In particular, we expect ‘`(`‘ to be closed before ‘`[`’. The first closing parenthesis we encounter is ‘`]`’, which does not close ‘`(`’. Therefore, this string is invalid.

![Image represents a comparison of two scenarios illustrating parenthesis matching in a coding context.  The left side depicts a correctly matched sequence, showing the text 'most recent parenthesis waiting to be closed' above a gray downward-pointing arrow. This arrow points to a sequence of parentheses: `[(])`, indexed 0 to 3 from left to right.  The closing parenthesis at index 3 correctly matches the opening parenthesis at index 1, indicating proper nesting.  In contrast, the right side shows an incorrectly matched sequence.  The text 'does not close most recent parenthesis' (in red) is positioned above a red downward-pointing arrow, which points to a similar sequence `[(])`, also indexed 0 to 3. However, here the closing parenthesis at index 3 does *not* match the most recent opening parenthesis (at index 1), highlighting an error in parenthesis matching.  Both sides use the same parenthesis characters and indexing to facilitate a direct comparison of correct versus incorrect parenthesis closure.](/assets/images/dsa/stacks/0df23baa2b3ed62e.webp)

The key observation here is that **the most recent opening parenthesis we encounter should be the first parenthesis that gets closed**. So, opening parentheses are processed from most recent to least recent, which is indicative of a last-in-first-out (LIFO) dynamic. This leads to the idea that a **stack** can be used to solve this problem.

**Stack** Here’s a high-level strategy:

- Add each opening parenthesis we encounter to the stack. This way, the most recent parenthesis is always at the top of the stack.
- When encountering a closing parenthesis, check if it can close the most recent opening parenthesis. If it can, close that pair of parenthesis by popping off the top of the stack. If not, the string is invalid.

- If it can, close that pair of parenthesis by popping off the top of the stack.
- If not, the string is invalid.

Let’s see how this strategy works over an example:

![Image represents a sequence of six distinct symbols, arranged horizontally from left to right with spaces between them.  The symbols are: an opening parenthesis `(`, an opening square bracket `[`, a closing square bracket `]`, an opening curly brace `{`, a closing parenthesis `)`, and a closing curly brace `}`.  There are no connections or information flow depicted between the symbols; they are simply presented as individual, independent elements.  No labels, text, URLs, or parameters are present within the image. The image likely illustrates the different types of grouping symbols used in programming languages or mathematical notation.](/assets/images/dsa/stacks/3f8d9b3c36fc55ac.webp)

For each opening parenthesis we encounter, push it to the top of the stack:

![Image represents a visual explanation of a stack data structure used for parenthesis matching.  On the left, a sequence of opening and closing parentheses, brackets, and braces – `( [ ] { } )` – is shown, with an orange square containing an 'i' and a downward arrow pointing to the sequence, suggesting input.  On the right, a diagram depicts a stack labeled 'stack' with a 'top' indicator.  A light-grey 'top:' label points to the top of the stack, which is currently empty. A light-blue arrow labeled 'push (' indicates that the opening parenthesis '(' is being pushed onto the stack, implying that the algorithm is processing the input sequence from left to right and using the stack to keep track of opening delimiters.  The overall image illustrates the initial step of a parenthesis matching algorithm using a stack.](/assets/images/dsa/stacks/dc450c9c2707a563.webp)

![Image represents a visual explanation of a stack data structure used in coding, specifically demonstrating a push operation.  On the left, a sequence of opening and closing parentheses, brackets, and braces: `( [ ] { ) }` is shown.  An orange square containing an 'i' symbol, suggesting input, points downwards with an arrow towards the '[' bracket, indicating the element being processed. On the right, a diagram depicts a stack labeled 'stack' with a 'top' pointer.  The stack currently contains an opening parenthesis '('. A light-blue arrow labeled 'push [' shows the '[' bracket being added to the top of the stack, illustrating the 'push' operation where a new element is added to the top of the stack.  The arrangement visually explains how an input element is added to the stack, modifying its contents and updating the top pointer.](/assets/images/dsa/stacks/c78187ec0ce21f1c.webp)

Next, we encounter a closing parenthesis. Comparing it to the opening parenthesis at the top of the stack, we see that it correctly closes that opening parenthesis. So, we can pop off the opening parenthesis at the top of the stack:

![Image represents a visual explanation of a stack data structure used for parenthesis matching.  On the left, a sequence of opening and closing parentheses, brackets, and braces — `(`, `[`, `]`, `{`, `)` — is shown. An orange square labeled 'i' points downwards, indicating an input stream of these characters.  To the right, a stack is depicted as a container labeled 'stack' with a 'top' pointer indicating the top element.  Inside the stack, an opening bracket '[' is present. A purple arrow labeled 'pop' extends from the top of the stack to a light gray dashed box containing the text ''[' is closed by ']':', illustrating that the top element '[' is being popped from the stack, implying a matching closing bracket ']' is expected in the input stream to maintain balanced parentheses.  The diagram demonstrates how a stack is used to verify the correct pairing of opening and closing delimiters in a given input string.](/assets/images/dsa/stacks/ab8f7b748d713ae3.webp)

The next character is an opening parenthesis, which we just push to the top of the stack:

![Image represents a visual explanation of a stack data structure and its 'push' operation.  The left side shows a sequence of opening and closing brackets and braces: '(', '[', ']', '{', ')', '}'.  A downward-pointing orange arrow with a small orange square containing an 'i' (likely indicating information or instruction) points to the '{' character. This suggests the '{' is the next element to be processed. The right side depicts a stack labeled 'stack' with its contents shown as '{' and '('; the label 'top:' indicates the top of the stack. A light-blue arrow labeled 'push { ' points from the right to the stack, illustrating the 'push' operation where the '{' character is being added to the top of the stack.  The overall diagram demonstrates how a character ('{') is pushed onto a stack, which is a Last-In, First-Out (LIFO) data structure.](/assets/images/dsa/stacks/253188fe554daf62.webp)

The next character is a closing parenthesis, ‘`)`’, which does not close the opening parenthesis at the top of the stack, ‘`{`’. This means this parenthesis expression is invalid. As such, we return false.

![Image represents a visual explanation of a stack-based approach to validating balanced parentheses in a code snippet.  On the left, a sequence of opening and closing parentheses, brackets, and braces (`(`, `[`, `{`, `)`, `]`, `}`) is shown. An orange arrow with an 'i' icon points downwards towards the curly brace '{' and closing parenthesis ')'. To the right, a diagram depicts a stack data structure labeled 'stack,' with the characters '{' and '(' currently inside it, indicating that these opening brackets have been pushed onto the stack. The label 'top:' points to the top of the stack, which is '{'.  A light gray dashed-line box contains pseudocode: `'{' is not closed by ')': return False`, illustrating a scenario where an opening curly brace '{' is encountered, but its corresponding closing brace '}' is not found before a closing parenthesis ')', resulting in a `False` return value, indicating unbalanced parentheses.  The overall image demonstrates how a stack can be used to track opening brackets and check for proper closing counterparts during code validation.](/assets/images/dsa/stacks/ba30f65a731211c4.webp)

If we’ve iterated over the entire string without returning false, that means we’ve accounted for all closing parentheses in the string.

**Edge case: extra opening parentheses** We only check for invalidity at closing parenthesis, so need to perform a final check to ensure there aren’t any opening parentheses in the string left unclosed. This can be done by checking if the stack is empty after processing the whole input string, as a non-empty stack indicates opening parentheses remain in the stack.

**Managing three types of parentheses** In our algorithm, we need a way to ensure we compare the correct types of opening and closing parentheses. We can use a **hash map** for this, which maps each type of opening parenthesis to its corresponding closing parenthesis:

![Image represents a simple diagram titled 'parenthesis_map' illustrating a mapping between opening and closing parentheses, brackets, and braces.  The diagram is rectangular and divided vertically into two equal sections labeled 'open' and 'closed' respectively.  The 'open' section displays an opening curly brace '{', an opening square bracket '[', and an opening parenthesis '(', stacked vertically.  The 'closed' section mirrors this, showing the corresponding closing curly brace '}', closing square bracket ']', and closing parenthesis ')', also stacked vertically in the same order.  The arrangement visually demonstrates a one-to-one correspondence between each opening symbol on the left and its respective closing symbol on the right, implying a data structure or algorithm that relies on pairing these symbols for validation or processing.](/assets/images/dsa/stacks/fc30085d791c6a31.webp)

This hash map can also be used as a way to check if a parenthesis is an opening or a closing one: if the parenthesis exists in this hash map as a key, it’s an opening parenthesis.

## Implementation

```python
def valid_parenthesis_expression(s: str) -> bool:
    parentheses_map = {'(': ')', '{': '}', '[': ']'}
    stack = []
    for c in s:
        # If the current character is an opening parenthesis, push it onto the stack.
        if c in parentheses_map:
            stack.append(c)
        # If the current character is a closing parenthesis, check if it closes the
        # opening parenthesis at the top of the stack.
        else:
            if stack and parentheses_map[stack[-1]] == c:
                stack.pop()
            else:
                return False
    # If the stack is empty, all opening parentheses were successfully closed.
    return not stack
```

### Complexity Analysis

**Time complexity:** The time complexity of `valid_parenthesis_expression` is O ( n ) O(n) O ( n ) because we traverse the entire string once. For each character, we perform a constant-time operation, either pushing an opening parenthesis onto the stack or popping it off for a matching closing parenthesis.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the stack stores at most n n n characters, and the hash map takes up O ( 1 ) O(1) O ( 1 ) space.
