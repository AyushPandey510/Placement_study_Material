---
title: "Introduction To Stacks"
course: "DSA"
topic: "Stacks"
source: "/home/ayush/OOD-Design-Principles/DSA/Stacks/Introduction to Stacks.html"
---
## Intuition

Imagine a stack of plates. You can only add a new plate to the top of the stack, and when you need a plate, you take the one from the top. It’s not possible to take a plate from the bottom or middle without first removing all the plates above it.

![The image represents a visual analogy for adding and removing elements from a stack data structure.  The left side depicts the 'add plate' operation, showing a single rectangular plate (representing a data element) being added to the top of a stack of similar plates already present. A downward-pointing arrow connects the single plate to the stack, indicating the addition process. The text 'add plate' in orange is positioned next to the arrow, clarifying the action. The right side illustrates the 'remove plate' operation. Here, a single plate is being removed from the top of a stack of plates. An upward-pointing, curved arrow indicates the removal of the topmost plate, which is shown slightly separated from the rest of the stack. The text 'remove plate' in orange is placed near the arrow, explaining the operation.  Both sides use bold, black, rectangular shapes to represent the plates, clearly showing the stack's Last-In, First-Out (LIFO) nature.](/assets/images/dsa/stacks/c88d415627d5d30d.webp)

This analogy encapsulates the essence of the stack data structure. Adding a plate to and taking a plate from the top of the stack, physically demonstrates the two main stack operations:

- **Push** (adds an element to the top of the stack).
- **Pop** (removes and returns the element at the top of the stack).

![Image represents a visual depiction of stack data structure operations.  The image is arranged in a 2x4 grid, each cell showing a snapshot of a stack at a different stage.  The top row demonstrates the `push` operation, where elements (1, 4, 2) are added to the stack from right to left.  Each stack is represented as a container, with the numbers inside representing the elements, and the newest element added at the top.  A light-blue arrow labeled 'push(x)' indicates the addition of element 'x' to the stack. The bottom row illustrates the `pop` operation, where elements are removed from the top of the stack from left to right. A purple arrow labeled 'pop' shows the removal of the top element.  The numbers within the stack containers change accordingly to reflect the addition or removal of elements, demonstrating the Last-In, First-Out (LIFO) nature of a stack.  The label 'stack' is present below each container to clearly identify the data structure.](/assets/images/dsa/stacks/a80f07975c49fab8.webp)

**LIFO (Last‐In‐First‐Out)** Stacks follow the LIFO principle, meaning the most recently added item is the first to be removed. This unique characteristic makes stacks particularly useful in various scenarios where the order of processing or removal is critical. Here are a few key applications:

- Handling nested structures: Stacks are a good option for parsing or validating nested structures such as nested parentheses in a string (e.g., "`(())()`"). They allow us to process the innermost nested structures first due to the LIFO principle.
- Reverse order: When elements are added (pushed) onto a stack and then removed (popped), they come out in the reverse order of how they were added. This property is useful for reversing sequences.
- Substitute for recursion: Recursive algorithms use the recursive call stack to manage recursive calls. Ultimately, this recursive call stack is itself a stack. As such, we can often implement recursive functions iteratively using the stack data structure. • Monotonic stacks: These special‐purpose stacks maintain elements in a consistent, increasing or decreasing sorted order. Before adding a new element to the stack, any elements that break this order are removed from the top of the stack, ensuring the stack remains sorted.

Some examples of the above applications are explored in this chapter.

Below is a time complexity breakdown of common stack operations:

## Real-world Example

**Function call management:** As hinted above, a common real‐world example of stacks is in function call management within operating systems or programming languages.

When a function is called, the program pushes the function’s state (including its parameters, local variables, and the return address) onto the call stack. As functions call other functions, their states are also pushed onto the stack. When a function completes, its state is popped off the stack, and the program returns to the calling function. This stack‐based approach ensures that functions return control in the correct order, managing nested or recursive function calls efficiently.

## Chapter Outline

![Image represents a hierarchical diagram illustrating various applications of stacks in coding patterns.  The topmost node is labeled 'Stacks,' from which four downward-pointing dashed lines extend to four rectangular boxes representing different coding concepts.  Two boxes branch from the left side of 'Stacks': 'Nested Structures,' containing the sub-problems 'Valid Parenthesis Expression' and 'Evaluate Expression,' and 'Queue,' which describes the problem of 'Implement a Queue Using Stacks.'  Two boxes branch from the right side of 'Stacks': 'Deque,' which includes the problem 'Maximums of Sliding Window,' and 'Monotonic Stack,' which describes finding the 'Next Largest Number to the Right.'  Finally, a single dashed line connects the bottom of both 'Deque' and 'Monotonic Stack' to a fifth box labeled 'Processing Duplicates,' which details the problem of 'Repeated Removal of Adjacent Duplicates.'  The dashed lines indicate a flow of information or application, showing how stacks are used to solve problems in each of the listed categories.](/assets/images/dsa/stacks/8de7088827b27118.webp)

This chapter explores a variety of problems, offering detailed explanations for how to use stacks in problem solving. Additionally, we briefly introduce queues and deques, which are two data structures that share similarities with stacks, but operate on different principles.
