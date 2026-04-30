---
title: "HappyNumber"
course: "DSA"
topic: "FastAndSlowPointers"
source: "/home/ayush/OOD-Design-Principles/DSA/FastAndSlowPointers/HappyNumber___Technical_Interview_Prep.html"
---
In number theory, a happy number is defined as a number that, when repeatedly subjected to the process of **squaring its digits and summing those squares**, eventually leads to 1. An unhappy number will never reach 1 during this process, and will get stuck in an infinite loop [[1]](https://en.wikipedia.org/wiki/Happy_number).

Given an integer, determine if it's a happy number.

#### Example:

```python
Input: n = 23
Output: True
```

Explanation: 2 2 2^2 2 2 + 3 2 3^2 3 2 = 13 ⇒ 1 2 1^2 1 2 + 3 2 3^2 3 2 = 10 ⇒ 1 2 1^2 1 2 + 0 2 0^2 0 2 = 1

## Intuition

We can simulate the process of identifying a happy number by repeatedly summing the squares of each digit of a number, and then applying the same process to the resulting sum.

According to the problem statement, this process could conclude in one of two ways:

- Case 1: the process continues until the final number is 1.
- Case 2: the process gets stuck in an infinite loop.

If we diagram both scenarios, we observe something interesting:

![Image represents two distinct cases illustrating data flow, possibly representing different coding patterns or algorithms.  Case 1 shows a linear sequence of four circular nodes labeled 23, 13, 10, and 1, respectively.  Each node is connected to the next by a unidirectional arrow, indicating a sequential flow of information from 23 to 1. Case 2 depicts a circular flow of data. Eight circular nodes, labeled 116, 38, 73, 58, 37, 16, 4, and 20, are arranged in a circle.  Unidirectional arrows connect each node to the next in a clockwise direction, forming a closed loop.  Additionally, a separate circular sequence of three nodes (89, 145, and 42) is connected to the main circular sequence via arrows from node 58 to 89 and from node 42 to node 20.  The numbers within each node likely represent data values or states, and the arrows signify the direction of data processing or transformation.](/assets/images/dsa/fastandslowpointers/e95832e44700a827.webp)

This looks quite similar to a linked list problem. In particular, the problem of determining if a linked list has a cycle (case 2) or doesn’t (case 1).

We can reduce this problem to the same **cycle** **detection** challenge as the *Linked List Loop* problem. By applying the fast and slow pointer technique (i.e., Floyd's Cycle Detection algorithm), we can efficiently determine if a cycle exists.

However, in this problem, we don't have an actual linked list to perform the fast and slow pointer algorithm on. Therefore, we need to find a way to traverse the sequence of numbers generated in the happy number process.

Conveniently, we already know what the “next” number in the sequence is for any number `x`. As described in the problem statement, the next number can be calculated by summing the square of each digit of `x`. So, if each number were a node in a linked list, we could get the “next” node by calculating the next number in the sequence.

**Getting the next number in the sequence** To calculate the next number of `x`, we need a way to access each digit of `x`. This can be done in two steps:

1. The modulo operation ( x % 10 ) is used to extract the last digit of a number x .
2. Divide x by 10 ( x = x / 10 ) to truncate the last digit, positioning the next digit as the new last digit.

We can see this unfold in full below for `x = 123`:

![Image represents a flowchart illustrating the `get_next_num(x)` function, which takes an integer `x` (initially 123) as input and calculates a new number (`next_num`). The process involves iteratively extracting digits from `x` using the modulo operator (`%`) and integer division (`/`).  First, the rightmost digit (3) is obtained via `x % 10`, then `x` is updated to `x / 10` (12). This process repeats, extracting the next digit (2) and then (1). Each extracted digit is circled in orange.  These digits are then used to calculate `next_num` by summing their squares (3² + 2² + 1² = 14). The iteration stops when `x` becomes 0.  Arrows indicate the flow of data, showing how the extracted digits (`digit`) are derived and subsequently used in the final calculation of `next_num`. The function's output, `next_num`, is explicitly calculated as 14 at the bottom.](/assets/images/dsa/fastandslowpointers/f20af2ad655a604c.webp)

Now that we have a way to traverse the sequence, we can implement Floyd’s Cycle Detection algorithm. To start, set the fast and slow pointers at the start of this sequence. Then move the pointers as follows:

- Advance the slow pointer one number at a time ( slow = get_next_num(slow) ).
- Advance the fast pointer two numbers at a time ( fast = get_next_num(get_next_num(fast)) ).

If the fast and slow pointers meet during the process, it indicates the presence of a cycle, meaning the number is not a happy number. Otherwise, the algorithm will end when we reach 1, in which case the number is a happy number.

## Implementation

```python
def happy_number(n: int) -> bool:
    slow = fast = n
    while True:
        slow = get_next_num(slow)
        fast = get_next_num(get_next_num(fast))
        if fast == 1:
            return True
        # If the fast and slow pointers meet, a cycle is detected. Hence, 'n' is not
        # a happy number.
        elif fast == slow:
            return False
    
def get_next_num(x: int) -> int:
    next_num = 0
    while x > 0:
        # Extract the last digit of 'x'.
        digit = x % 10
        # Truncate (remove) the last digit from 'x' using floor division.
        x //= 10
        # Add the square of the extracted digit to the sum.
        next_num += digit ** 2
    return next_num
```

### Complexity Analysis

**Time complexity:** The time complexity of `happy_number` is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )). The full analysis of this time complexity is quite complicated and beyond the scope of interviews. For interested readers, please see the detailed analysis below.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

## Interview Tip

*Tip: Visualize the problem.* At first glance, this problem seems like it requires mathematical reasoning to solve. However, when we visualized the problem, we were able to formulate a solution using an algorithm we already know (Floyd’s Cycle Detection). Visualizing a problem can help uncover hidden patterns or data structures that can lead to the solution.

## Happy Number Time Complexity Analysis

The following time complexity analysis establishes an upper bound on the steps required to determine a happy number. In this analysis, we define the "next number" of a number n n n as the result obtained by summing the squares of the digits of n n n.

**1) Upper limit for the next number** For any number n n n with a fixed number of digits, the maximum value for its successor is achieved when all its digits are 9. For instance, the maximum next number from a 3-digit number happens when this 3-digit number is 999.

**2) Size of the next number relative to the number of digits**

- If a number n n n has 1 or 2 digits, it’s possible for the next number to be larger than n n n (e.g., the next number of 99 is 162, which is one digit longer).
- If a number n n n has 3 or more digits, the next number is always smaller than the original value of n n n . The table below highlights how the largest number with 3 or more digits has a smaller next number.

**3) Implications for cycles** Since the next number is always smaller for numbers with three or more digits, it means a cycle can only commence in the happy number process once the number falls below 243 (the next number of 999). This is because we’ve observed that any number n n n larger than 243 will have the next number smaller than n n n. However, once we fall below 243, the next number can potentially be larger, potentially cycling back to a previous number.

**4) Time complexity for numbers less than 243** Once a number falls below 243, the algorithm will take less than 243 steps to either converge to 1 or to cycle back to a previous number in the sequence. Therefore, since the length of the cycle or the number of steps to reach 1 is bounded by 243, the time complexity of Floyd’s cycle detection algorithm for numbers less than 243 is O ( 1 ) O(1) O ( 1 ).

**5) Time complexity for numbers greater than 243** The number of digits in a number is approximately equal to log ⁡ ( n ) \log(n) lo g ( n ) (base 10). So, the calculation of the next number of n n n will take approximately log ⁡ ( n ) \log(n) lo g ( n ) steps (i.e., `get_next_num` will take log ⁡ ( n ) \log(n) lo g ( n ) steps to execute).

Let's call n n n’s next number n 2 n^2 n 2. The next number after n 2 n^2 n 2 (n 3 n^3 n 3) will take approximately log ⁡ ( n 2 ) \log(n^2) lo g ( n 2 ) steps to calculate. The next number after n 3 n^3 n 3 (n 4 n^4 n 4) will take approximately log ⁡ ( n 3 ) \log(n^3) lo g ( n 3 ) steps to calculate, and so on. From this, we can summarize the time complexity of this process as O ( log ⁡ ( n ) + log ⁡ ( n 2 ) + log ⁡ ( n 3 ) + … ) O(\log(n)+\log(n^2)+\log(n^3)+…) O ( lo g ( n ) + lo g ( n 2 ) + lo g ( n 3 ) + … ). Since we've established that n > n 2 > … > n k n>n^2>…>n^k n > n 2 > … > n k where n k n^k n k is the last number greater than 243, the dominant component of this time complexity is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )). So, the time complexity for numbers greater than 243 is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )).

**Conclusion** When n n n is less than 243, the time complexity is O(1), and when n n n is greater than 243, the time complexity is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )). Therefore, the overall time complexity of the algorithm is O ( log ⁡ ( n ) ) O(\log(n)) O ( lo g ( n )).

*Tip: Don’t waste time on complex proofs if it isn’t an important part of the interview.*

During an interview, correctly deciphering the exact time of an algorithm like the one used to solve this problem isn't usually expected. In situations like this, you can instead make an educated guess about how the algorithm's runtime would grow with larger inputs based on the behavior of the algorithm. Mention any assumptions you make when discussing your estimates. It might also be helpful to mention what parts of the problem or the solution make it difficult to analyze the time complexity. In this problem, it’s initially unclear how many steps the happy number process would take before reaching 1 or revealing a cycle.
