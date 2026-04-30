---
title: "Gas Stations"
course: "DSA"
topic: "Greedy"
source: "/home/ayush/OOD-Design-Principles/DSA/Greedy/Gas Stations.html"
---
There's a circular route which contains gas stations. At each station, you can fill your car with a certain amount of gas, and moving from that station to the next one consumes some fuel.

Find the **index of the gas station you would need to start at**, in order to complete the circuit **without running out of gas**. Assume your car starts with an empty tank. If it's not possible to complete the circuit, return -1. If it's possible, assume only one solution exists.

#### Example:

```python
Input: gas = [2, 5, 1, 3], cost = [3, 2, 1, 4]
Output: 1
```

Explanation:

Start at station 1: gain 5 gas (tank = 5), costs 2 gas to go to station 2 (tank = 3). At station 2: gain 1 gas (tank = 4), costs 1 gas to go to station 3 (tank = 3). At station 3: gain 3 gas (tank = 6), costs 4 gas to go to station 0 (tank = 2). At station 0: gain 2 gas (tank = 4), costs 3 gas to go to station 1 (tank = 1). We started and finished the circuit at station 1 without running out of gas.

## Intuition

Before deciding which gas station to start with, let's first determine if it's even possible to complete the circuit with the total amount of gas available.

**Total gas vs total cost** Case 1: `sum(gas) < sum(cost)`: The first thing to realize is if the total gas is less than the total cost, **it's impossible to complete the circuit**. No matter where we start, we'll run out of gas before completing the circuit. So, in this situation, we should return -1.

Case 2: `sum(gas) ≥ sum(cost)`: Now, let's consider the more interesting case where the total travel cost is less than or equal to the total amount of gas available.

Here's a potential hypothesis:

Since there's enough total gas to cover the total cost of travel, there must be a start point in the circuit that allows us to complete it without ever running out of gas.

It's tough to confirm this hypothesis without examining an example, so let's dive into one.

**Finding a start point** Consider the following example where `sum(gas) > sum(cost)`:

![Image represents two horizontal, one-dimensional arrays of numerical data.  The top array is labeled 'gas' and contains the integer values [3, 2, 1, 3, 3, 2, 3, 4] enclosed within square brackets.  The bottom array is labeled 'cost' and contains the integer values [2, 1, 4, 1, 2, 6, 0, 3], also enclosed within square brackets. Both arrays have the same length (8 elements).  The arrays are positioned vertically one above the other, implying a potential relationship or correspondence between the elements at the same index in each array.  There are no explicit connections or arrows drawn between the arrays; the relationship is implied by their parallel structure and identical lengths.](/assets/images/dsa/greedy/ae4b2619301de258.webp)

We don't necessarily need to consider the gas and cost separately. At any station `i`, we collect `gas[i]` and consume `cost[i]` to move to the next station. We can consider both at the same time by getting the difference between these values, which provides the net gas gained or lost at each station:

![Image represents a simple calculation demonstrating element-wise subtraction between two arrays.  The top row shows an array labeled 'gas' containing the integer values [3, 2, 1, 3, 3, 2, 3, 4]. The second row displays an array labeled 'cost' with the integer values [2, 1, 4, 1, 2, 6, 0, 3].  Vertical grey arrows connect each corresponding element in the 'gas' and 'cost' arrays, indicating a subtraction operation. The bottom row, labeled 'net gas:', shows the results of this element-wise subtraction.  Each element in this resulting array is the difference between the corresponding elements in the 'gas' and 'cost' arrays; for example, 3-2=1, 2-1=1, 1-4=-3, and so on. The resulting 'net gas' array contains the values [1, 1, -3, 2, 1, -4, 3, 1], with positive values shown in green and negative values in red.](/assets/images/dsa/greedy/3e7efe43b8d35886.webp)

Let's start at station 0 with an empty gas tank and see how far we can go. The net gas at this station is positive (1), which means we have enough gas to reach the next station. Let's add 1 to our tank:

![The image represents a visual depiction of a simple iterative process, possibly illustrating a coding pattern.  A small square containing the letter 'i' (likely indicating information or an instruction) has a downward arrow pointing to a sequence of numbers: 1, 1, -3, 2, 1, -4, 3, 1.  These numbers are indexed from 0 to 7 beneath them, labeled 'start' in orange text to the left, suggesting an initial state or starting point.  To the right, a dashed-line box shows a variable named 'tank' being updated. The expression 'tank += 1' indicates that 1 is added to the current value of 'tank,' and '= 1' shows the resulting value of 'tank' after the addition.  The implication is that each number in the sequence is processed sequentially, and in this specific example, the 'tank' variable is incremented by 1 for each iteration, regardless of the value in the sequence.](/assets/images/dsa/greedy/e60e5403bea06d61.webp)

Note that index `i` refers to the current gas station, whereas start refers to the gas station we started from.

At station 1, we encounter the same situation:

![Image represents a diagram illustrating a coding pattern, possibly related to array processing or accumulation.  The diagram shows a sequence of numbers: 1, 1, -3, 2, 1, -4, 3, 1, each positioned above a corresponding index (0 through 7) indicating its position within the sequence.  The word 'start' is written in orange below the index 0, suggesting the beginning of the process. A downward-pointing arrow originates from a small square containing the letter 'i', likely representing an iterator or index variable, pointing to the first element of the sequence (the number 1). To the right, a dashed-line box displays the operation 'tank += 1' and below it '= 2', indicating a variable named 'tank' is being incremented by 1, resulting in a value of 2.  The overall implication is that the sequence of numbers is being processed sequentially, and each number is potentially contributing to the accumulation within the 'tank' variable.](/assets/images/dsa/greedy/3b8de974253cb8d1.webp)

At station 2, our tank falls below 0, indicating we don't have enough gas to make it to the next station:

![Image represents a flowchart illustrating a coding pattern, possibly related to fuel consumption or resource management.  A square box labeled 'i' at the top points downwards with an arrow to a sequence of numbers: 1, 1, -3, 2, 1, -4, 3, 1.  These numbers are indexed from 0 to 7, with 'start' labeled in orange below index 0.  To the right, a light gray, dashed-line box contains a code snippet: `tank += (-3)`, followed by `= -1 < 0`, and a right-pointing arrow leading to the text 'cannot make it to the next station'.  The diagram shows a process where a variable 'tank' is decremented by 3 in each step, and the condition `-1 < 0` evaluates to true, resulting in the message indicating an inability to proceed to the next stage.  The numbers likely represent changes in the 'tank' value over time or across different stages.](/assets/images/dsa/greedy/25dd905ee7fe8f03.webp)

This means we cannot start our journey at station 0. Should we go back and try station 1? The key observation here is that if we didn't have enough gas to get from station 0 to station 3, we also wouldn't have enough if we started at any other station before station 3:

![Image represents a visual depiction of an iterative process, possibly demonstrating a coding pattern like accumulating values.  A sequence of numbers (1, 1, -3, 2, 1, -4, 3, 1) is displayed, each number positioned above a corresponding index (0, 1, 2, 3, 4, 5, 6, 7) indicating its position.  The word 'start' is written in orange below the index 3, suggesting the starting point of the iteration. To the right, a gray box with a dashed border shows a variable named 'tank' initialized to 0.  The implication is that the numbers in the sequence are sequentially processed, and their values are added to or subtracted from the 'tank' variable.  The arrangement suggests a step-by-step accumulation where the final value of 'tank' would be the sum of all the numbers in the sequence.](/assets/images/dsa/greedy/2180272b69ada7a8.webp)

This is a general rule:

If we cannot make it to station b from station a, we cannot make it to station b from any of the stations in between, either:

![Image represents two analogous illustrations explaining a coding pattern concept.  Both illustrations feature a horizontal orange line representing a journey from point 'a' to point 'b', marked by labels at each end.  A small orange car icon is positioned at the start of the line, at point 'a'.  The line terminates at point 'b' with a red 'X' indicating failure.  The first illustration uses the analogy of driving from 'a' to 'b' without running out of gas, stating 'if we cannot drive from a to b without running out of gas,' above the diagram.  The second illustration expands this, showing that if the journey from 'a' to 'b' fails, then starting anywhere between 'a' and 'b' will also fail, stating 'we cannot start anywhere between a and b without running out of gas.'  Both diagrams include dots along the line to represent intermediate points between 'a' and 'b', visually reinforcing the concept that failure at the end implies failure at any intermediate starting point.](/assets/images/dsa/greedy/13b8b55ec04df897.webp)

Let's try to understand why. If we only just ran out of gas right before reaching station b, this means our tank maintained a non-negative amount of gas until station b:

![The image represents a graphical depiction of fuel consumption.  The upper portion shows a line graph where the vertical axis labeled 'tank' represents the fuel level, ranging from zero at the bottom to a maximum at the top. The horizontal axis represents the distance traveled, labeled 'station' at the far right.  A green line plots the fuel level over distance, starting at point 'a' with a full tank and decreasing gradually, showing fluctuations in fuel consumption.  The line reaches a minimum at point 'b', where it sharply drops to zero, indicated by a red line segment.  The lower portion of the image shows a horizontal orange arrow representing the car's journey from point 'a' to point 'b', marked by a red 'x' indicating the point of fuel depletion.  Small dots along the orange arrow represent intermediate points along the journey.  The labels 'a' and 'b' on both the upper and lower parts of the image correspond to the same locations on the journey and fuel level.  The car icon at the beginning of the orange arrow visually reinforces the representation of the car's travel.](/assets/images/dsa/greedy/ad262dc8dd471054.webp)

Consequently, starting anywhere else before station b will result in us missing a non-negative amount of gas from the previous stations. Therefore, starting at any of these in-between stations doesn't allow us to progress to station b.

Back to our example. Let's now try resetting our tank to 0 and restarting at station 3 (at `i + 1`), since we just discussed how starting at stations 0 to `i` doesn't work:

![Image represents a diagram illustrating a coding pattern, possibly related to array processing or a similar concept.  A small square labeled 'i' with an arrow pointing downwards indicates an input or starting point.  Below this, a sequence of numbers (1, 1, -3, 2, 1, -4, 3, 1) is presented, each number positioned above a greyed-out index (0, 1, 2, 3, 4, 5, 6, 7) indicating their position within a data structure. The word 'start' is written in orange below the index numbers. To the right, a dashed-line box displays 'tank = 0', suggesting an initial value or state of a variable named 'tank'. The arrow from 'i' implies that the sequence of numbers is processed sequentially, potentially accumulating values into the 'tank' variable.  The negative numbers suggest a subtraction operation might be involved in the processing.](/assets/images/dsa/greedy/4bfb9a5656242ae1.webp)

We continue until we reach a point where we cannot proceed to the next station:

![Image represents a diagram illustrating a coding pattern, possibly related to array manipulation or a simple accumulator.  A small square containing the letter 'i' (likely indicating information or input) points downwards with an arrow towards a sequence of numbers: 1, 1, -3, 2, 1, -4, 3, 1. These numbers are indexed from 0 to 7, shown in light gray below the numbers. The word 'start' is written in orange below the numbers, suggesting this is the starting point of the process.  To the right, a dashed-line box shows a variable named 'tank' being updated. The equation 'tank += 2' indicates that 2 is added to the current value of 'tank,' resulting in a new value of '2' (shown as ' = 2').  The overall diagram suggests a process where the numbers in the sequence are processed sequentially, and the 'tank' variable accumulates a value based on this processing, in this case, starting with an initial value of 0 and adding 2.](/assets/images/dsa/greedy/3561e1c930ba6335.webp)

![Image represents a diagram illustrating a coding pattern, possibly related to array processing or iterative summation.  The diagram shows a sequence of numbers: 1, 1, -3, 2, 1, -4, 3, 1, indexed from 0 to 7.  These numbers are displayed horizontally, with indices shown in light gray below each number.  A downward-pointing arrow originates from a small square containing the letter 'i', suggesting an iterator or index variable. This arrow points to the number 1 at index 4, indicating a starting point. The word 'start' is written in orange below the numbers, reinforcing this starting position. To the right, a dashed-line box displays the equation 'tank += 1' and ' = 3', suggesting that a variable named 'tank' is being incremented by 1, resulting in a final value of 3.  The overall structure implies that the numbers are being processed sequentially, and the 'i' likely represents the index used to iterate through the sequence, with the 'tank' variable accumulating values from the sequence.](/assets/images/dsa/greedy/0d06dd008635df37.webp)

![Image represents a sequence of numbers (1, 1, -3, 2, 1, -4, 3, 1) indexed from 0 to 7, with the number at index 3 labeled 'start' in orange.  A downward-pointing arrow from a small square containing the letter 'i' points to the number -4 in the sequence. To the right, a dashed-line box displays the code snippet 'tank += (-4)', indicating that -4 is added to a variable named 'tank'. Below this, ' = -1 < 0' shows the result of the operation, which is less than 0. Finally, an arrow points to the text 'cannot make it to the next station', indicating a conditional outcome based on the value of 'tank' being less than 0.  The overall diagram illustrates a scenario where a process (indicated by the 'i' and arrow) leads to a condition check (tank < 0) resulting in a specific outcome.](/assets/images/dsa/greedy/ed6a625e7e59623a.webp)

As we can see, we ran out of gas at station 5, which means we can't start from stations 3 to 5, either. So, let's try restarting at station 6.

After resetting the tank to 0, let's continue traveling through the stations:

![Image represents a diagram illustrating a simple coding pattern, possibly related to variable assignment and accumulation.  A sequence of numbers (1, 1, -3, 2, 1, -4) is shown in light gray, indexed from 0 to 5, representing an input array or data stream.  A downward-pointing arrow from a small square containing the letter 'i' points to the number '3', indicating an initial value or input trigger.  This '3' is positioned at index 6, suggesting a starting point for processing.  Next to the '3' at index 6 is the number '1', which might represent the next element in the sequence to be processed. To the right, a dashed-line box displays an assignment operation: 'tank += 3', followed by ' = 3', indicating that a variable named 'tank' is initialized to 0 and then incremented by 3, resulting in a final value of 3. The word 'start' is written in orange below the number 3 at index 6, clearly marking the beginning of the operation. The overall diagram suggests a process where an initial value is used, and subsequent operations (not explicitly shown) might involve iterating through the input sequence and updating the 'tank' variable.](/assets/images/dsa/greedy/0f13ceaa59870cd0.webp)

![Image represents a visual depiction of a coding pattern, likely illustrating a cumulative sum or accumulator.  A sequence of numbers (1, 1, -3, 2, 1, -4, 3) is shown, each number indexed from 0 to 6.  These numbers are presented in light gray except for the number 3 at index 6, which is in black and has a downward-pointing arrow originating from a small square containing the letter 'i', suggesting an input or initial value. This '3' at index 6 is then added to a variable named 'tank', which initially holds a value of 1 (as indicated by 'tank += 1'). The result of this addition, 4, is displayed next to an equals sign ('= 4') within a dashed-line box representing the 'tank' variable's updated state. The word 'start' is written in orange below the number sequence, indicating the starting point of the process.  The overall diagram demonstrates how a running total is calculated by iteratively adding each element of the number sequence to an accumulator variable.](/assets/images/dsa/greedy/54818ece3ef1b5a2.webp)

We've reached the end of the array. Should we go back to the start of the array to check if starting from station 6 allows us to complete the circuit? Or is reaching the end from station 6 enough to finish the circuit? Let's look into this.

**Proving we have enough gas to complete the circuit after reaching the end of the array** We can determine this via a proof by contradiction. If the gas we have by the end of the array is not enough, that means no solution exists: no station at which we could start in order to complete the circuit. This implies that no matter where we start, we will hit a deficit (i.e., a point where our tank falls below 0) before completing the circuit.

Consider a segment of the circuit where we run into a deficit:

![Image represents a diagram illustrating a traversal or journey.  A small orange car icon is positioned at the left, labeled implicitly as point 'a' with ellipses suggesting further points preceding it.  An orange arrow originates from a short perpendicular line extending downwards from the car, indicating the starting point of the journey. This arrow stretches horizontally across the diagram, passing over several evenly spaced black dots representing intermediate points along a path. The arrow terminates at a red 'x' mark, implicitly labeled as point 'b' with ellipses suggesting further points following it. The overall visual suggests a linear progression from point 'a' to point 'b', with the 'x' possibly indicating an endpoint or a point of failure or interruption in the journey.](/assets/images/dsa/greedy/deba7d3bbda6c811.webp)

We learned earlier that we cannot start at any station between a and b (inclusive) without running into a deficit. So, we can characterize this entire segment as having less total gas than the total cost required to travel through it.

After concluding that we cannot start anywhere from stations a to b, we decide to restart at the next station after b, which represents the start of the next segment. Keep in mind that since there is no solution in this proof, every segment in the circuit will end with a deficit:

![Image represents a circular diagram illustrating a cyclical process or pattern.  A large, solid black circle forms the central element, representing the core of the cycle.  Surrounding this circle is a smaller, orange circle formed by a series of interconnected orange arrows, indicating a continuous flow or progression.  Four red crosses are positioned equidistantly along the outer orange circle, each connected to a small orange dot.  The arrows point in a clockwise direction, suggesting a sequential process where each red cross represents a stage or step within the cycle. The absence of labels or text within the diagram leaves the specific nature of the cycle undefined, allowing for broad interpretation within the context of coding patterns.](/assets/images/dsa/greedy/4b4d1c42986e304c.webp)

This means each of these segments has less total gas than total cost. Therefore, for there to be no starting point, `sum(gas)` would have to be less than `sum(cost)`.

However, we know that `sum(gas) ≥ sum(cost)`, confirming **there must be a valid start point that allows us to complete the circuit**.

Therefore, in our example, we can confirm that station 6 is the answer for the following reasons.

- sum(gas) ≥ sum(cost) implies that a solution must exist.
- We confirmed that starting anywhere before station 6 will result in us running into a deficit.
- We didn't encounter any deficit from station 6 to the last station in the array.

So, we just need to return start, which is station 6 in our example.

This is considered a **greedy solution** because we assume the first station we encounter that doesn't run into a deficit by the end of our array, is the start point that allows us to complete the circuit without testing every possible station in the array as the start point. The locally optimal choices (moving forward when possible, resetting when encountering a deficit) lead to the globally optimal solution (finding the correct starting point).

## Implementation

```python
from typing import List
    
def gas_stations(gas: List[int], cost: List[int]) -> int:
    # If the total gas is less than the total cost, completing the circuit is
    # impossible.
    if sum(gas) < sum(cost):
        return -1
    start = tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        # If our tank has negative gas, we cannot continue through the circuit from
        # the current start point, nor from any station before or including the
        # current station 'i'.
        if tank < 0:
            # Set the next station as the new start point and reset the tank.
            start, tank = i + 1, 0
    return start
```

### Complexity Analysis

**Time complexity:** The time complexity of `gas_stations` is O ( n ) O(n) O ( n ), where n n n denotes the length of the input arrays. This is because we iterate through each element in the gas and cost arrays.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ).

## Interview Tip

*Tip: Demonstrate your greedy solution with examples if proving it formally is too difficult* In some problems, such as this one, proving that a greedy solution works might be complicated, especially in an interview setting. If you and the interviewer are on the same page about this, a good compromise is to demonstrate the solution's correctness with a few diverse examples. This approach allows both you and the interviewer to have confidence in your solution in the absence of a thorough proof.
