---
title: "Evaluate Expression"
course: "DSA"
topic: "Stacks"
source: "/home/ayush/OOD-Design-Principles/DSA/Stacks/Evaluate Expression.html"
---
Given a string representing a mathematical expression containing integers, parentheses, addition, and subtraction operators, evaluate and return the result of the expression.

#### Example:

```python
Input: s = '18-(7+(2-4))'
Output: 13
```

## Intuition

At first, it might seem overwhelming to deal with expressions that include a variety of elements like negative numbers, nested expressions inside parentheses, and numbers with multiple digits. The key to managing this complexity is to break down the problem into smaller, more manageable parts. Let's first focus on evaluating simple expressions that contain no parentheses.

**Handling positive and negative signs** Consider the following expression:

![Image represents a simple arithmetic expression displayed linearly.  The expression consists of the number 28, a minus sign (-), the number 10, a plus sign (+), and the number 7. These elements are arranged sequentially from left to right, indicating the order of operations.  No explicit connections or information flow are depicted beyond the implied mathematical relationship between the numbers and operators. The expression suggests a calculation where 28 is subtracted by 10 and then added to 7.  There are no URLs or parameters present.](/assets/images/dsa/stacks/b7a1f96815cd7ed5.webp)

There's already some complexity in this expression with there being two signs to consider: plus and minus. An immediate simplification we can make is to **treat all expressions as ones of pure addition**. This is possible when we assign signs to each number (1 representing + and -1 representing -). This sign can be multiplied by the number to attain its correct value. This allows us to just focus on performing additions:

![Image represents three separate instances demonstrating a concept likely related to signed numbers or data. Each instance consists of a pair of numbers and a sign indicator.  The first instance shows a plus sign `(+)` followed by the numbers `2` and `8`, with a grey curved arrow pointing upwards to the text 'sign = 1' above it, indicating a positive sign. The second instance displays a minus sign `(-)` followed by the numbers `1` and `0`, similarly linked by a grey curved arrow to 'sign = -1' above, representing a negative sign. The third instance mirrors the first, with a plus sign `(+)` followed by the number `7`, and an upward-pointing grey curved arrow connected to 'sign = 1', again indicating a positive sign.  The arrangement suggests a pattern where the sign value (`1` or `-1`) is associated with a pair of numbers, possibly representing a magnitude and an additional data point, or a single number with a sign.](/assets/images/dsa/stacks/5fb18ff59cdbb264.webp)

**Processing numbers with multiple digits** Another complexity in this expression is that some numbers have multiple digits. We’ll need a way to build numbers digit by digit until we reach the end of the number. We can build a number using the variable `curr_num`, which is initially set to 0. Every time we encounter a new digit, we multiply `curr_num` by 10 and add the new digit to it, effectively shifting all digits to the left and appending the new digit.

We can see this process play out for the string “123” in the following illustration:

![Image represents a diagram illustrating a digit-by-digit number conversion process.  A rectangular box labeled 'digit' points downwards with an arrow to a sequence of digits '1 2 3'. Below this, a dashed-line rectangle contains a formula: `curr_num = 10 * curr_num + digit`.  This formula shows how a running number (`curr_num`) is updated iteratively.  Below the formula, a step-by-step calculation is shown for the first digit (1): `curr_num = 0 + 1`, and the result `curr_num = 1`. This implies that the process starts with `curr_num` initialized to 0, and each digit is incorporated into `curr_num` by multiplying the current value of `curr_num` by 10 and adding the new digit.  The diagram visually demonstrates how the algorithm converts a sequence of digits into a numerical value.](/assets/images/dsa/stacks/4bdaa57dfc3ddbbd.webp)

![Image represents a step-by-step calculation of converting a sequence of digits into a numerical value.  A rectangular box labeled 'digit' points downwards with an arrow towards the digits '1', '2', and '3' arranged horizontally. Below, a dashed-line rectangle shows the calculation process.  The formula 'curr_num = 10 * curr_num + digit' is displayed, illustrating how each digit is incorporated into a running total (curr_num).  The calculation is demonstrated with an example: initially, curr_num is implicitly 1 (from the first digit), then it becomes 10 * 1 + 2 = 12 after processing the second digit '2'. The final result, '12', is shown as the outcome of the calculation.  The diagram visually depicts a common algorithm for converting a string representation of a number into its integer equivalent.](/assets/images/dsa/stacks/86614da6a6c4c757.webp)

![Image represents a diagram illustrating a numerical processing algorithm.  A rectangular box labeled 'digit' sits above a sequence of digits '1 2 3'. A downward-pointing arrow connects 'digit' to the digit '3', indicating the input of a single digit into the process. Below, a dashed-line rectangle contains a series of equations demonstrating the algorithm's operation. The first equation, 'curr_num = 10 * curr_num + digit,' shows the core calculation: the current number (`curr_num`) is updated by multiplying it by 10 and adding the incoming digit.  The subsequent lines show the step-by-step calculation:  assuming an initial `curr_num` of 12 (implied but not explicitly shown), the equation becomes '120 + 3,' resulting in a final `curr_num` of 123. This demonstrates how the algorithm constructs a number digit by digit, effectively converting a sequence of digits into a single numerical value.](/assets/images/dsa/stacks/b40ace0e2aded18b.webp)

We can stop building this number once we encounter a non-digit character, indicating the end of the number.

**Evaluating an expression without parentheses** With the information from the section above, let's evaluate the following expression, which contains no parentheses. We’ll start off with a sign of 1:

![Image represents a snapshot of a program's state during execution, likely illustrating a coding pattern related to numerical processing or string manipulation.  The image shows a sequence of numbers '2 8 - 1 0 + 7,' suggesting a numerical expression being processed.  This is followed by two variable assignments: 'sign = 1,' indicating a positive sign, and 'curr_num = 0,' representing a current numerical value initialized to zero. The arrangement suggests that the numerical sequence is input data, and the variables 'sign' and 'curr_num' are internal program variables storing intermediate results.  There's no explicit connection shown between the numerical sequence and the variables, implying an implicit processing step where the program iterates through the sequence, updating 'sign' and 'curr_num' based on the operators (+, -, etc.) encountered.  The comma after '7' might indicate the end of the input sequence or a delimiter.  The overall structure suggests a step-by-step processing of a numerical expression, possibly part of a larger algorithm.](/assets/images/dsa/stacks/745919170ede452c.webp)

Upon reaching the ‘-’ operator, we’ve reached the end of the first number (28). So, let’s:

1. Multiply the current number (28) by its sign (1).
2. Add the resulting product (28) to the result.
3. Update the sign to -1 since the current operator is a minus sign.
4. Reset `curr_num` to 0 before building the next number.

![Image represents a visual explanation of a coding pattern, likely related to parsing or processing numerical strings.  The left side shows a sequence of numbers (28) with operators (+, -, +, etc.) interspersed.  A dashed box encloses '28', indicating it's treated as a single unit. An orange downward-pointing arrow from a box labeled 'i' points to the '28', suggesting an iterator or index.  Above the '28' is a plus sign within a dashed circle, connected by an upward-pointing arrow to 'sign = 1', indicating a positive sign. Below the '28' is 'curr_num = 28', showing the current numerical value. The right side shows a code snippet illustrating the calculation: `res += sign * curr_num`, where `res` is a result variable, `sign` holds the sign (+1 or -1), and `curr_num` holds the current number.  The calculation steps show `+= 28` (adding 28 to `res`), resulting in `= 28`. Below, it shows the updated values: `sign = -1, curr_num = 0`, indicating the sign has changed and the current number is reset to 0 after processing '28'. The overall diagram demonstrates how a numerical string is processed iteratively, updating the sign and current number in each step.](/assets/images/dsa/stacks/0b04a35aa99d3913.webp)

Once we reach the second operator, we multiply the current number (10) by its sign of -1 before adding the resulting product (-10) to the result. This effectively subtracts 10 from the result:

![Image represents a step-by-step illustration of a coding pattern, likely related to number processing or parsing.  The left side shows a sequence of numbers (+2, 8, -1, 0, +7) with arrows indicating data flow.  A dashed orange box encloses '-1' and '0', representing a current number ('curr_num') which is initially 10. An orange downward-pointing arrow labeled 'i' points from above to the '0', suggesting an iterator or index.  The variable 'sign' is initialized to -1 and is connected to the '-1' in the sequence via an upward-pointing arrow. The right side displays a calculation box showing the update of a result variable ('res'). The calculation `res += sign * curr_num` is shown, with the initial values resulting in `res += -1 * 10 = -10`.  The final value of 'res' is shown as 18, implying a previous value of 28.  Below the calculation, the updated values of 'sign' (now 1) and 'curr_num' (now 0) are displayed, indicating a change in state after processing the current number.  The overall diagram visualizes the iterative processing of a number sequence, updating a result and internal variables in each step.](/assets/images/dsa/stacks/bf9dc4307ff2ba94.webp)

Finally, once we’ve reached the end of the string, we just add the final number (7) to the result after multiplying it by its sign of 1:

![Image represents a diagram illustrating a coding pattern, possibly related to arithmetic operations or string manipulation.  The left side shows a sequence of arithmetic operators (+, -, etc.) followed by numbers (2, 8, 1, 0).  To the right of these, a central component displays variables `sign` (initialized to 1) and `curr_num` (initialized to 7), connected by a plus symbol (+) indicating an addition operation.  A downward-pointing orange arrow, originating from a small orange square labeled 'i', points to the '7' within the central component, suggesting an input or update to `curr_num`.  A dashed orange circle surrounds the '7' and the '+', highlighting their role in the calculation.  The rightmost section is a light gray box with dashed borders, showing a calculation: `res += sign * curr_num`, which is then broken down into steps: `+= 7` (representing the addition of 7 to a variable `res`), and finally `= 25` (the result). Below this, the final values of `sign` (1) and `curr_num` (0) are displayed, indicating that the operation has updated these variables. The overall diagram visually depicts a step-by-step calculation, likely part of a larger algorithm or function.](/assets/images/dsa/stacks/c32d6d50bedcc199.webp)

**Evaluating expressions containing parentheses** Now that we can solve simple expressions, it's time to bring parentheses into the discussion. Moving forward, we define a nested expression as one that’s inside a pair of parentheses.

One challenge is that we need to evaluate the results of nested expressions before we can calculate the original expression. Once all nested expressions are evaluated, we can evaluate the original expression.

![Image represents a mathematical expression structured to illustrate order of operations. The expression is '18 - (7 + (2 - 4))'.  The numbers 1 and 8 are positioned to the left, followed by a minus sign.  Then, an opening parenthesis introduces a nested expression: 7 plus an inner parenthesized expression (highlighted in peach) containing '2 - 4'. This inner expression is underlined with an orange line, indicating it's a sub-problem to be solved first. A downward-pointing orange arrow extends from this underline to the word 'solve' written in orange below, explicitly showing the flow of computation. The entire expression is closed with a closing parenthesis. The arrangement visually emphasizes the nested structure and the sequential solving of the inner expression before the outer subtraction.](/assets/images/dsa/stacks/79e3d1ca66651d00.webp)

![Image represents a simple arithmetic expression depicted as a data flow diagram.  The expression is '18 - (7 - 2)'.  The numbers '1' and '8' are displayed to the left, followed by a minus sign.  To the right of the minus sign is a light peach-colored, rounded rectangle containing the subexpression '(7 - 2)'.  A thick orange line underlines the subexpression, from which a downward-pointing orange arrow extends, labeled 'solve' in orange text. This arrow visually indicates that the subexpression '(7 - 2)' is evaluated first. The overall structure suggests a hierarchical approach to solving the expression, prioritizing the inner parentheses before performing the main subtraction.](/assets/images/dsa/stacks/a4448f6a0fc0d09c.webp)

![Image represents a simple arithmetic expression depicted as a data flow diagram.  A peach-colored, horizontally-oriented rectangle contains the numbers '1', '8', a hyphen ('-'), and '5', representing the mathematical expression '18 - 5'.  A horizontal, orange line extends beneath this rectangle, acting as a connector.  From the midpoint of this line, a downward-pointing orange arrow points to the word 'solve' written in orange text, indicating that the expression '18 - 5' is to be processed or solved.  The overall structure suggests a data input ('18 - 5') flowing into a processing step ('solve'), implying a computational process where the input is used to generate an output (the result of the subtraction).](/assets/images/dsa/stacks/87543aca84f49d34.webp)

Consider another problem in this chapter that also contains parentheses: *Valid Parenthesis Expression*. In that problem, we used a **stack** to process nested parentheses in the right order. This suggests a stack might also help us evaluate nested expressions in the right order. Let’s explore this idea further.

Similar to *Valid Parenthesis Expression*, an opening parenthesis ‘`(`‘ indicates the start of a new nested expression, whereas a closing parenthesis ‘`)`’ indicates the end of one. Understanding this, let’s try to use a stack to solve the following expression.

![Image represents a visual explanation of arithmetic expression evaluation using a stack data structure.  The left side shows the arithmetic expression '1 8 - ( 7 + ( 2 - 4 ) )', composed of numbers (1, 8, 7, 2, 4), operators (-, +, -), and parentheses. The right side depicts a stack, labeled 'stack,' which is a last-in, first-out (LIFO) data structure.  The expression is evaluated from left to right, with operands and operators being pushed onto the stack according to operator precedence and parentheses.  Innermost parentheses are evaluated first, with results being pushed back onto the stack.  The stack's role is to temporarily store operands and operators until they are needed for calculation, enabling the correct order of operations to be maintained.  No information flows explicitly between the expression and the stack in the image; the image is a conceptual illustration of how the stack would be used during the evaluation process, not a step-by-step trace of the evaluation.](/assets/images/dsa/stacks/76daaf46c3128793.webp)

We already know how to evaluate expressions without parentheses, so let’s just focus on what to do when we encounter a parenthesis.

At the first opening parenthesis, we know a nested expression has started. Before we evaluate the nested expression, we’ll need to save the running result (`res`) of the current expression, as well as the sign of this upcoming nested expression. This way, once we’re done evaluating the nested expression, we can resume where we were in the current expression.

Here are the steps for when we encounter an opening parenthesis:

1. stack.push(res) : Save the running result on the stack.
2. stack.push(sign) : Save the sign of the upcoming nested expression on the stack.
3. res = 0 , sign = 1 : Reset these variables because we’re about to begin calculating a new expression.

![Image represents a diagram illustrating a coding pattern, likely for evaluating arithmetic expressions using a stack.  The left side shows an arithmetic expression `(7 + (2 - 4))` being processed.  Variables `res` (initially 18) and `sign` (initially -1) are shown, with an arrow indicating that `res` is updated.  A dashed box encloses the numbers 1 and 8, suggesting these are processed first.  An orange arrow points from a small orange square labeled 'i' to the expression, indicating an input or starting point. The middle section depicts a stack data structure, visually represented as an empty container labeled 'stack'. The right side shows a gray box with dashed borders outlining the actions performed on the stack: `stack.push(res)` pushes the value of `res` onto the stack, `stack.push(sign)` pushes the value of `sign`, and finally, 'reset res and sign' indicates that these variables are reset after the stack operations.  The overall flow suggests that the expression is evaluated by pushing intermediate results and signs onto the stack, then processing the stack to obtain the final result, with the `res` and `sign` variables tracking the current result and sign during the evaluation.](/assets/images/dsa/stacks/097edcdbbb290066.webp)

![Image represents a blank, light gray square.  There are no visible components, shapes, lines, text, URLs, or any other elements present within the square.  No information is flowing or being represented. The image is entirely uniform in color and lacks any discernible structure or pattern.](/assets/images/dsa/stacks/c6378f31bf6f71ad.webp)

![Image represents a visual explanation of postfix notation evaluation using a stack.  The left side shows the arithmetic expression '1 8 - ( 7 + ( 2 - 4 ) )' with a small orange square containing an 'i' pointing down to the expression, suggesting an input or instruction. The expression is written in postfix (reverse Polish) notation, where operators follow their operands.  The right side depicts a stack data structure labeled 'stack' at the bottom.  Two horizontal, light-blue arrows labeled 'push' indicate the process of pushing values onto the stack. The top arrow shows -1 being pushed onto the stack, and the bottom arrow shows 18 being pushed onto the stack.  The numbers on the stack represent intermediate results during the evaluation of the postfix expression. The overall diagram illustrates how the postfix expression is processed step-by-step, with values and operators pushed onto and popped from the stack to compute the final result.](/assets/images/dsa/stacks/2c9e777b77d5d73f.webp)

The next parenthesis we encounter is an opening parenthesis. Again, this indicates the start of a new nested expression. Let’s save the current result and sign on the stack, before resetting them to evaluate the upcoming nested expression:

![Image represents a step-by-step illustration of evaluating an arithmetic expression using a stack.  The left side shows the expression '1 8 - ( 2 - 4 )' being processed.  The number 7, enclosed in a dashed circle, represents an intermediate result, with an upward arrow indicating it's assigned to the variable 'res = 7'. A plus sign, also in a dashed circle, shows the current operation. A downward arrow from the plus sign points to 'sign = 1', indicating the sign of the result.  A small orange square labeled 'i' points downward to the expression, suggesting an iterative process. The middle section depicts a stack, initially empty, with -1 and 18 shown as values pushed onto it. The right side displays a gray box outlining the stack operations: 'stack.push(res)' pushes the value of 'res' onto the stack, 'stack.push(sign)' pushes the sign onto the stack, and 'reset res and sign' indicates that the 'res' and 'sign' variables are reset for the next iteration. The overall diagram illustrates how an arithmetic expression is evaluated using a stack, pushing intermediate results and signs onto the stack before processing the next part of the expression.](/assets/images/dsa/stacks/f34cddcc17e4e89b.webp)

![Image represents a visual explanation of postfix notation evaluation using a stack.  The left side shows the arithmetic expression '1 8 - ( 7 + ( 2 - 4 ) )' in postfix notation (reverse Polish notation). A downward-pointing orange arrow labeled 'i' indicates the current processing point within the expression. On the right, a stack is depicted, labeled 'stack' at its base.  The stack initially contains the numbers 18 and -1.  Two horizontal, light-blue arrows labeled 'push' show the numbers 7 and 1 being pushed onto the stack from the expression, with the arrowheads pointing towards the stack indicating the direction of data flow. The numbers in the stack are arranged vertically, with the topmost element being the most recently added.  The overall diagram illustrates a step in the process of evaluating the postfix expression using a stack, where operands are pushed onto the stack and operators pop operands for calculation.](/assets/images/dsa/stacks/55abd25a6704b718.webp)

The next parenthesis we encounter is a closing parenthesis. This means the current nested expression just ended, and we need to merge its result with the outer expression. Here’s how we do this:

1. res *= stack.pop() : Apply the sign of the current nested expression to its result.
2. res += stack.pop() : Add the result of the outer expression to the result of the current nested expression.

![Image represents a visual explanation of postfix expression evaluation using a stack.  The left side shows the postfix expression '1 8 - ( 7 + ( 2 - 4 ) )', with the subexpression '( 2 - 4 )' highlighted in orange dashed lines and its result, -2, indicated with an orange upward-pointing arrow.  A small orange box labeled 'i' points downward to this -2, suggesting an intermediate calculation.  The middle section depicts a stack data structure, initially containing the numbers 18, -1, 7, and 1.  Purple arrows labeled 'pop' show the elements being popped from the stack.  The rightmost section demonstrates the calculation steps:  first, `res *= stack.pop()` calculates `res` (initially 0, implied) as 1 * 1 = 1, then `res` becomes -2 after `*= 1`.  Next, `res += stack.pop()` adds 7 to `res`, resulting in 5.  The overall process illustrates how the stack is used to evaluate the postfix expression, with operands pushed onto the stack and operators popping operands to perform calculations, ultimately yielding the final result.](/assets/images/dsa/stacks/321dd25575a5c69c.webp)

After applying those operations, the value of `res` will be 5, representing the result of the highlighted part of the expression below:

![The image represents a visual depiction of postfix expression evaluation using a stack.  The expression '1 8 - ( 7 + ( 2 - 4 ) )' is shown, with the numbers and operators arranged in postfix notation (reverse Polish notation).  A dashed orange rectangle highlights the subexpression '( 7 + ( 2 - 4 ) )' which is being evaluated first.  An orange arrow labeled 'i' points to this subexpression, indicating the current point of evaluation.  The innermost parentheses '( 2 - 4 )' are evaluated first, resulting in -2. This result is then added to 7, yielding 5.  An upward orange arrow points from the subexpression to 'res = 5', showing the result of the subexpression evaluation.  To the right, a rectangular box labeled 'stack' shows the stack's contents during evaluation: -1 and 18 are currently on the stack, representing intermediate results or operands.  The overall process illustrates how the stack is used to store intermediate results and operands while evaluating the postfix expression from left to right.](/assets/images/dsa/stacks/31d2f2f30f2ccc4f.webp)

At the final closing parenthesis, we can apply the same steps:

![Image represents a visual explanation of evaluating an arithmetic expression using a stack.  The expression '1 8 - (7 + (2 - 4))' is shown, with the innermost parentheses ' (2 - 4)' highlighted in an orange dashed box. An orange arrow points to a closing parenthesis, indicating the current processing point.  A stack is depicted as a container, initially empty.  The numbers from the expression are pushed onto the stack as they are encountered.  A purple arrow shows the value '1' being popped from the stack, followed by '18' also being popped.  A separate box on the right details the calculation steps: first, the top of the stack (-1) is multiplied by the result (initially 0), resulting in -5. Then, 18 is added to the result, yielding a final result of 13.  The entire process demonstrates how a stack can be used to evaluate expressions with nested parentheses, following a post-fix evaluation approach.](/assets/images/dsa/stacks/f104864a7d3b72a4.webp)

Finally, the value of `res` will be 13, representing the result of the entire expression:

![Image represents a visual depiction of expression evaluation using a stack.  A mathematical expression '1 8 - ( 7 + ( 2 - 4 ) )' is shown enclosed within a dashed orange rectangle. An upward orange arrow points from the expression to 'res = 13,' indicating the final result of the calculation.  A separate orange box labeled 'i' points downward towards the expression, suggesting an input or instruction pointer. To the right, a simple representation of a stack is drawn, labeled 'stack,' implying that the expression is being evaluated using a stack-based approach. The arrangement shows the expression as the input, the stack as the processing mechanism, and the final result 'res = 13' as the output.  The image illustrates a step in the process of evaluating the arithmetic expression using a stack data structure.](/assets/images/dsa/stacks/7ea6ecbef5ffa0ba.webp)

Now that we’ve reached the end of the string, we can return `res`.

## Implementation

```python
def evaluate_expression(s: str) -> int:
    stack = []
    curr_num, sign, res = 0, 1, 0
    for c in s:
        if c.isdigit():
            curr_num = curr_num * 10 + int(c)
        # If the current character is an operator, add 'curr_num' to the result
        # after multiplying it by its sign.
        elif c == '+' or c == '-':
            res += curr_num * sign
            # Update the sign and reset 'curr_num'.
            sign = -1 if c == '-' else 1
            curr_num = 0
        # If the current character is an opening parenthesis, a new nested expression
        # is starting.
        elif c == '(':
            # Save the current 'res' and 'sign' values by pushing them onto
            # the stack, then reset their values to start calculating the new nested
            # expression.
            stack.append(res)
            stack.append(sign)
            res, sign = 0, 1
        # If the current character is a closing parenthesis, a nested expression has
        # ended.
        elif c == ')':
            # Finalize the result of the current nested expression.
            res += sign * curr_num
            # Apply the sign of the current nested expression’s result before adding
            # this result to the result of the outer expression.
            res *= stack.pop()
            res += stack.pop()
            curr_num = 0
    # Finalize the result of the overall expression.
    return res + curr_num * sign
```

### Complexity Analysis

**Time complexity:** The time complexity of `evaluate_expression` is O ( n ) O(n) O ( n ) because we traverse each character of the expression once, processing nested expressions using the stack, where each stack push or pop operation takes O ( 1 ) O(1) O ( 1 ) time.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) because the stack can grow proportionally to the length of the expression.
