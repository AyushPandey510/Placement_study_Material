---
title: "Palindrome"
course: "DSA"
topic: "DSA"
source: "/home/ayush/OOD-Design-Principles/DSA/Palindrome___Technical_Interview_Prep.html"
---
A palindrome is a sequence of characters that **reads the same forward and backward**.

Given a string, **determine if it's a palindrome** after removing all non-alphanumeric characters. A character is alphanumeric if it's either a letter or a number.

#### Example 1:

```python
Input: s = 'a dog! a panic in a pagoda.'
Output: True
```

#### Example 2:

```python
Input: s = 'abc123'
Output: False
```

#### Constraints:

- The string may include a combination of lowercase English letters, numbers, spaces, and punctuations.

## Intuition

**Identifying palindromes** A string is a palindrome if it remains identical when read from left to right or right to left. In other words, if we reverse the string, it should still read the same, disregarding spaces and punctuation:

![Image represents a simple data flow diagram illustrating a string reversal operation.  The diagram shows the input string 'racecar' enclosed in double quotes, positioned on the left.  A rightward-pointing arrow connects this input to the word 'reverse', indicating the operation being performed.  Another rightward-pointing arrow then connects 'reverse' to the output string 'racecar', also enclosed in double quotes, positioned on the right.  The arrangement visually depicts the transformation of the input string 'racecar' into its reversed form, 'racecar,' through the application of the 'reverse' function.  The entire diagram is linear, showing a clear, unidirectional flow of data from input to output via a clearly labeled process.](/assets/images/dsa/dsa/47db3780aa7c6781.webp)

An important observation is that if a string is a palindrome, the first character would be the same as the last, the second character would be the same as the second-to-last, etc:

![Image represents a visual depiction of a nested structure, likely illustrating a coding pattern such as nested loops or recursive function calls.  The image shows the letters 'b y t e e t y b' arranged horizontally.  Each letter is vertically connected to a horizontal line segment extending downwards. These line segments are nested, with the line under 'y t e e t y' being the longest, encompassing shorter lines beneath 't e e t'. The shortest lines are directly under 't' and 'e', and 'e' and 't'. The outermost line segment connects the 'b' at each end, creating a visual representation of a hierarchical or nested structure where the inner segments are contained within the outer ones.  The arrangement suggests a parent-child relationship, where the outer structure contains and encompasses the inner structures.](/assets/images/dsa/dsa/22a30e625d3e55b1.webp)

A palindrome of odd length is different because it has a middle character. In this case, the middle character can be ignored since it has no “mirror” character elsewhere in the string.

![Image represents a visual depiction of a palindrome check using a nested loop approach.  The word 'racecar' is displayed at the top, with each letter positioned above a corresponding vertical bar.  The letter 'e' is highlighted in orange, representing the central character of the palindrome.  A series of nested rectangular boxes are drawn underneath the letters. The outermost box encloses all the letters, representing the entire string.  Inner boxes are nested around the 'a', 'c', and 'r' letters on both sides of the central 'e', visually demonstrating the comparison of characters from the beginning and end of the string moving inwards. The structure implies that the algorithm iteratively compares characters from the outer ends, working its way towards the center, to determine if the string is a palindrome.  The nested boxes visually represent the nested loop structure of the algorithm, where the outer loop iterates through the string from both ends, and the inner loop (implied) compares the characters at each iteration.](/assets/images/dsa/dsa/376af45363d834ce.webp)

Palindromes provides an ideal scenario for using **two pointers** (`left` and `right`). By initially setting the pointers at the beginning and end of the string, we can compare the characters at these positions. Ignoring non-alphanumeric characters for the moment, the logic can be summarized as follows:

- If the alphanumeric characters at left and right are the same, move both pointers inward to process the next pair of characters.
- If not, the string is not a palindrome: return false.

If we successfully compare all character pairs without returning false, the string is a palindrome, and we should return true.

**Processing non-alphanumeric characters** Now, let's explore how to find palindromes that include non-alphanumeric characters.

Since non-alphanumeric characters don’t affect whether a string is a palindrome, we should skip them. This can be achieved with the following approach, which ensures the left and right pointers are adjusted to focus only on alphanumeric characters:

- Increment left until the character it points to is alphanumeric.
- Decrement right until the character it points to is alphanumeric.

With this in mind, let’s check if the string below is a palindrome using all the information we know so far:

![Image represents a diagram illustrating a coding pattern, possibly related to array or string manipulation.  Two orange rectangular boxes labeled 'left' and 'right' are positioned above a line of text 'a + 2 c ! 2 a'.  Arrows descend from each box, pointing to the respective ends of this text string. Below, a light-grey, dashed-bordered rectangle contains the conditional statement 's[left] == s[right]', which checks for equality between elements at indices 'left' and 'right' of an array or string 's'. A right-pointing arrow follows this condition, leading to the consequent action 'left += 1, right -= 1', indicating that the 'left' index is incremented and the 'right' index is decremented.  The overall diagram suggests an algorithm that iterates through a sequence from both ends, comparing elements until a mismatch is found or the indices cross.](/assets/images/dsa/dsa/9cc29ced6afe8d41.webp)

![Image represents a diagram illustrating a coding pattern, possibly related to string manipulation or array processing.  At the top, two orange rectangular boxes labeled 'left' and 'right' are shown.  Arrows descend from each box pointing to a string 'a + 2 c ! 2 a'. This string appears to be the input data, with 'left' pointing to the 'a + 2' segment and 'right' pointing to the '2 a' segment. Below the input string, a light gray, dashed-bordered rectangle contains the core logic: 's[left] == s[right] → left += 1, right -= 1'. This expression signifies a comparison: if the element at index 'left' in string 's' is equal to the element at index 'right', then the 'left' index is incremented by 1, and the 'right' index is decremented by 1.  This suggests an algorithm that iterates from both ends of the string, comparing elements until a mismatch is found or the indices cross. The arrow ('→') indicates the conditional action taken upon successful comparison.](/assets/images/dsa/dsa/afeb039ccade5d18.webp)

![Image represents a diagram illustrating a coding pattern, specifically a conditional assignment.  At the top, two rectangular boxes labeled 'left' and 'right' (in orange) are shown.  Downward arrows from these boxes point to a string 'a + 2 c ! 2 a'. This string appears to represent an input, with 'left' pointing to 'a + 2 c' and 'right' pointing to '! 2 a'. Below this, a light gray, dashed-bordered rectangle contains the conditional statement: 's[right] is not alphanumeric → right -= 1'. This statement indicates that if the substring referenced by `s[right]` (which is '! 2 a' in this example) is not alphanumeric, then the value of the variable `right` is decremented by 1.  The arrow ('→') signifies the conditional flow, showing the consequence of the condition being met.  The diagram visually demonstrates how the 'right' variable's value might change based on the content of the input string.](/assets/images/dsa/dsa/c5377d87fdbf40f2.webp)

![Image represents a diagram illustrating a coding pattern.  Two orange rectangular boxes labeled 'left' and 'right' are positioned above a sequence of characters: 'a + 2 c ! 2 a'.  Arrows descend from each box, pointing to the characters 'a', '2', 'c', '!', '2', and 'a' respectively, suggesting a mapping or association between the labels and the character sequence.  To the right, a light gray, dashed-bordered rectangle contains the expression 'left == right → break'. This indicates a conditional statement: if the value of 'left' is equal to the value of 'right', then the program will 'break' (likely exiting a loop or conditional block). The arrow signifies the flow of control based on the comparison's outcome.  The overall diagram likely depicts a scenario where the equality of 'left' and 'right' (potentially variables or values) determines the execution path, influencing the processing of the character sequence below.](/assets/images/dsa/dsa/115389ef1b8755b1.webp)

As shown above, when the left and right pointers meet, it signals our exit condition. When these pointers meet, we've reached the middle character of the palindrome, at which point we can exit the loop since the middle character doesn’t need to be evaluated. However, we need to keep in mind that exiting when `left` equals `right` won't always be sufficient as an exit condition. For example, if the number of alphanumeric characters is even, the pointers won’t meet. This can be observed below:

![Image represents a diagram illustrating a coding pattern, possibly related to string manipulation or palindrome checking.  At the top, two orange rectangular boxes labeled 'left' and 'right' are shown.  Arrows point downwards from these boxes to a sequence of characters 'a b b a' below.  This sequence appears to be a string being processed. A light gray, dashed-bordered rectangle contains the core logic: 's[left] == s[right] → left += 1, right -= 1'. This expression indicates a comparison:  the character at index `left` in string `s` is compared to the character at index `right`. If they are equal (indicated by '=='), then the `left` index is incremented by 1 ('left += 1') and the `right` index is decremented by 1 ('right -= 1'). This suggests an iterative approach, moving inwards from both ends of the string, likely to check for palindromic properties. The arrow ('→') signifies the conditional execution of the index updates based on the comparison result.](/assets/images/dsa/dsa/4771c1df4128f93e.webp)

![Image represents a simple diagram illustrating a coding pattern, likely related to data manipulation or sorting.  Two orange rectangular boxes, labeled 'right' and 'left' respectively, are positioned side-by-side.  A downward-pointing arrow extends from each box.  The 'right' box's arrow points to a vertically stacked 'a' and 'b', while the 'left' box's arrow points to a vertically stacked 'b' and 'a'. This arrangement visually depicts a swapping or inversion operation where the data elements 'a' and 'b' are exchanged depending on their position relative to the 'right' and 'left' labels, suggesting a potential algorithm involving comparison and rearrangement of data based on a defined criteria.](/assets/images/dsa/dsa/85d85894cd764533.webp)

Therefore, we need to ensure we exit the loop when `left` equals `right`, or when `left` passes `right`. In other words, the algorithm continues while `left` is less than `right`:

```python
while left < right:
```

## Implementation

In Python, we can use the inbuilt `isalnum` method to check if a character is alphanumeric.

```python
def is_palindrome_valid(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        # Skip non-alphanumeric characters from the left.
        while left < right and not s[left].isalnum():
            left += 1
        # Skip non-alphanumeric characters from the right.
        while left < right and not s[right].isalnum():
            right -= 1
        # If the characters at the left and right pointers don’t match, the string is
        # not a palindrome.
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
```

### Complexity Analysis

**Time complexity:** The time complexity of `is_palindrome_valid` is O ( n ) O(n) O ( n ), where n n n denotes the length of the string. This is because we perform approximately n n n iterations using the two-pointer technique.

**Space complexity:** We only allocated a constant number of variables, so the space complexity is O ( 1 ) O(1) O ( 1 ).

### Test Cases

In addition to the examples discussed, below are more examples to consider when testing your code.

## Interview Tips

*Tip 1: Clarify problem constraints.* It's common to not receive all the details of a problem from an interviewer. For example, you might only be asked to "check if a string is a palindrome." But before diving into a solution, it's important to clarify details with the interviewer, such as the presence of non-alphanumeric characters, their treatment, the role of numbers, the case sensitivity of letters, and other relevant details.

*Tip 2: Confirm before using significant in-built functions.* This problem is made easier by using in-built functions such as `.isalnum` (or equivalent). Before using an in-built function that simplifies the implementation, ask the interviewer if it's okay to use it, or if they would prefer you implement it yourself.

The interviewer will most likely allow the use of an in-built function, or ask you to implement it as an exercise for later in the interview. If you use an in-built function, make sure you understand its time and space complexity.

Remember that interviewers are looking for team players, and this shows them you're considerate of their preferences and can adapt your approach based on the requirements.
