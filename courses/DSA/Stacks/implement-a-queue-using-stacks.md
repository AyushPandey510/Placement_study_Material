---
title: "Implement A Queue Using Stacks"
course: "DSA"
topic: "Stacks"
source: "/home/ayush/OOD-Design-Principles/DSA/Stacks/Implement a Queue using Stacks.html"
---
Implement a **queue** using the stack data structure. Include the following functions:

- `enqueue(x: int) -> None`: adds `x` to the end of the queue.
- `dequeue() -> int`: removes and returns the element from the front of the queue.
- `peek() -> int`: returns the front element of the queue.

You may not use any other data structures to implement the queue.

#### Example

```python
Input: [enqueue(1), enqueue(2), dequeue(), enqueue(3), peek()]
Output: [1, 2]
```

#### Constraints:

- The `dequeue` and `peek` operations will only be called on a non-empty queue.

## Intuition

A queue is a first-in-first-out (FIFO) data structure, whereas stacks are a first-in-last-out (FILO) data structure:

![Image represents a comparison of queue and stack data structures.  On the left, a queue is depicted as a vertically stacked series of light-grey boxes, each containing a number (4, 3, 2, 1) from top to bottom.  The bottom box is labeled 'front:' and the top box is labeled 'end:'. A curved cyan arrow labeled 'enqueue' points from the left to the top box, indicating the addition of elements. A curved magenta arrow labeled 'dequeue' points from the bottom box to the right, showing the removal of elements.  The text 'first-in-first-out' describes the queue's behavior.  A label ': peek' is present next to the bottom box, indicating the ability to view the front element without removal. On the right, a stack is shown similarly, with identical numbered boxes but arranged identically.  The top box is labeled 'top:', and a curved cyan arrow labeled 'push' points from the left to the top box, showing element addition. A curved magenta arrow labeled 'pop' points from the top box to the right, illustrating element removal. The text 'first-in-last-out' describes the stack's behavior. A label ': peek' is also present next to the top box, indicating the ability to view the top element without removal.  Both diagrams visually demonstrate the difference in how elements are added and removed in queues (FIFO) and stacks (LIFO).](/assets/images/dsa/stacks/4d0cba8da5116f4f.webp)

The main difference between these data structures is how items are evicted from them. In a queue, the first value to enter is the first to leave, whereas it would be the last to leave in a stack.

Now that we understand how they work, let’s dive into the problem. Let’s start by seeing if it’s possible to replicate the functionality of a queue with just one stack.

Consider the following stack where we push values 1, 2, and 3 to it after receiving enqueue(1), enqueue(2), and enqueue(3):

![Image represents a visual demonstration of implementing a queue data structure using a stack.  The image is divided into three sections, each labeled 'enqueue(n):' where 'n' represents the enqueue operation number (1, 2, and 3). Each section shows a stack represented as a vertical rectangle with a rounded bottom, labeled 'stack' at the bottom.  The top element of each stack is indicated by 'top:'.  A light gray 'top:' label precedes the top element's value.  In each section, a light blue arrow labeled 'push(n)' shows the element 'n' being pushed onto the stack.  The first section shows an empty stack initially, then the number 1 is pushed onto the stack after the enqueue(1) operation. The second section shows the stack after enqueue(2), with 1 at the bottom and 2 at the top.  The third section shows the stack after enqueue(3), with 1 at the bottom, 2 in the middle, and 3 at the top.  The arrangement demonstrates how elements are added to the stack (using push operations) to simulate the enqueue operation of a queue, where elements are added at the rear and removed from the front.](/assets/images/dsa/stacks/157f9eb975ed37f4.webp)

We now encounter a problem with attempting a `dequeue` operation since popping off the top of the stack would return 3. The value we actually want popped off is 1, since it was the first value that entered the data structure. However, 1 is all the way at the bottom of the stack.

To get to the bottom, we need to pop off all the values from the top of the stack and temporarily store these values in a separate data structure (temp) so we can add them back to the stack later:

![Image represents a step-by-step visualization of a stack data structure's pop operation.  Three diagrams show the stack's state at different points.  Each diagram features a stack represented as a container with numbered elements (1, 2, 3) stacked vertically, with the top element indicated by 'top:'.  A 'temp' array below each stack shows the elements popped so far.  In the first diagram, a purple arrow labeled 'pop' shows the top element (3) being removed from the stack and added to the 'temp' array, which now contains [3]. The second diagram shows the next pop operation, with the top element (2) being removed and added to 'temp', resulting in [3, 2]. The third diagram shows the final pop operation, where the top element (1) is removed and the operation is labeled 'pop and return' in green, indicating the value is returned from the function. The 'temp' array remains [3, 2] as the stack is now empty.](/assets/images/dsa/stacks/8aeb28da9eb255f8.webp)

Once we've popped and returned the bottom value (1), push the values stored in temp back onto the stack in reverse order to ensure they're added back correctly:

![Image represents a step-by-step visualization of a stack data structure's behavior during a `push` operation.  The image shows two stages.  The leftmost stage depicts a stack labeled 'stack' containing the element '2', with 'top' indicating its position. A light-blue arrow labeled `push(2)` points to the stack, illustrating the addition of '2'. Below the stack, a dashed-line box displays a temporary variable `temp` holding the array `[3, 2]`. The next stage shows the stack after pushing the element '3' onto it. The element '3' is now at the top, with '2' below it. A light-blue arrow labeled `push(3)` shows the addition of '3'. The `temp` variable now holds `[3]`, reflecting the removal of '2' from the temporary storage.  The overall image demonstrates how the `push` operation adds elements to the top of the stack and how a temporary variable might be used to manage data during this process.](/assets/images/dsa/stacks/441d2af53b67dc91.webp)

We know that if we were to use a data structure such as temp, **it’d have to be a stack**, since the problem specifies only stacks can be used. In this temporary data structure, we remove values in the opposite order in which we added them. In other words, it follows the LIFO principle, which is conveniently how a stack works. This means we can use a stack for our temporary storage.

Now, even though we have a solution that works, having to pop off every single value from the top of the stack whenever we want to access the bottom value is quite time-consuming. To find a way around this, let’s have a closer look at the state of our two stacks right after we’ve moved the stack values to temp:

![Image represents a step-by-step illustration of a stack manipulation process.  Initially, a stack labeled 'stack' contains elements 1, 2, and 3, with 3 at the top (indicated by 'top:').  Two purple arrows labeled 'pop' show the top two elements (3 and 2) being removed from the stack and transferred to a second stack labeled 'temp'.  The element 3 is moved to the bottom of the 'temp' stack, and the element 2 is moved to the top. A large black arrow indicates a transition to the next step. In this next step, the 'stack' now only contains element 1, labeled 'top:'. A green arrow labeled 'pop and ruturn' shows element 1 being popped from the stack. Finally, the 'temp' stack now contains elements 2 and 3, with 2 at the top (indicated by 'top:').  The entire process demonstrates a sequence of pop operations from one stack to another, reversing the order of the elements.](/assets/images/dsa/stacks/00eb19de347c8898.webp)

In our original solution, we would now move the values from temp back to the main stack. However, notice the top of the temp stack now contains the next value we expect to return. This is because it’s the second value to have entered the data structure, and according to the FIFO eviction policy, it should be the next one to be removed.

So, instead of adding these values back to the main stack, we could just leave them in temp and return the stack’s top value at the next dequeue call.

In the above logic, we ended up using two stacks which each serve a unique purpose. In particular, we used:

1. A stack to push values onto during each enqueue call (`enqueue_stack`).
2. A stack to pop values from during each dequeue call (`dequeue_stack`).

An important thing to realize here is that the dequeue stack won’t always be populated with values. So, what should we do when it’s empty? We can just populate it by moving all the values from the enqueue stack to the dequeue stack, just like we did in the example. To understand this more clearly, let’s dive into a full example.

Let’s start with two enqueue calls and push each number onto the enqueue stack.

![Image represents a visual depiction of enqueue operation using two stacks.  The left side shows an 'enqueue_stack' represented as a simple container with the number '1' inside, labeled 'top: 1'. A light-blue arrow labeled 'push(1)' points to the '1', indicating that the value '1' is being pushed onto the enqueue_stack. Above this stack, the text 'enqueue(1):' indicates that this is the visual representation of an enqueue operation with the value 1. The right side shows an empty 'dequeue_stack', also represented as a similar container, illustrating the state of the dequeue stack before any operation. The overall image demonstrates the step of adding an element (1) to the enqueue stack during a queue implementation using two stacks.](/assets/images/dsa/stacks/652c982c41d7638c.webp)

![Image represents a visual depiction of an enqueue operation using two stacks.  The left side shows an 'enqueue_stack' containing the elements '1' and '2', with '2' at the top, indicated by the label 'top:'. A light-blue arrow labeled 'push(2)' points from the right to the left, illustrating the addition of the element '2' to the top of the `enqueue_stack`. The right side displays an empty 'dequeue_stack'. The overall image demonstrates a step in implementing a queue data structure using two stacks, where the `enqueue` operation involves pushing the new element onto the `enqueue_stack`.  The text 'enqueue(2):' above the left stack clarifies that this diagram shows the result of enqueuing the value 2.](/assets/images/dsa/stacks/0c95b7a62a00f593.webp)

Now, let's try processing a dequeue call. The first step is to pop off each element from the enqueue stack and push them onto the dequeue stack:

![Image represents a visualization of a dequeue operation implemented using two stacks, labeled 'enqueue_stack' and 'dequeue_stack'.  The top-left diagram shows 'enqueue_stack' containing elements '1' and '2', with '2' at the top. A purple arrow labeled 'pop' indicates the removal of '2' from the top of 'enqueue_stack'. The bottom-left diagram shows the resulting 'enqueue_stack' after the pop operation, now containing only '1'. The top-right diagram shows 'dequeue_stack' initially empty, with a light-blue arrow labeled 'push(2)' illustrating the addition of '2' to the top of 'dequeue_stack'. Finally, the bottom-right diagram shows 'dequeue_stack' after a 'push(1)' operation (indicated by a light-blue arrow), resulting in a stack with '2' at the bottom and '1' at the top.  The overall image demonstrates the process of dequeuing an element using two stacks: elements are added to the 'enqueue_stack' and then transferred to the 'dequeue_stack' to simulate the FIFO (First-In, First-Out) behavior of a queue.  The 'top:' label consistently indicates the top element of each stack.](/assets/images/dsa/stacks/a655455d37b2f2fb.webp)

Then, we just return the top value from the dequeue stack:

![The image represents a visual depiction of a dequeue operation on a stack data structure.  The left side shows an empty 'enqueue_stack,' represented as a simple, empty rectangular container with rounded bottom corners and labeled accordingly. The right side depicts a 'dequeue_stack' containing two elements, '1' and '2', with '1' highlighted in a light green circle and labeled as 'top:'. A green arrow originates from the highlighted '1' and points to the text 'pop and return,' indicating that the top element ('1') is being removed (popped) from the stack and returned as the result of the dequeue operation.  The arrangement clearly shows the before and after states of the stack, illustrating the Last-In, First-Out (LIFO) nature of the stack data structure during a dequeue operation.](/assets/images/dsa/stacks/bda381e10b243068.webp)

Let’s enqueue one more value:

![Image represents a visual depiction of a queue implementation using two stacks, labeled 'enqueue_stack' and 'dequeue_stack'.  The left stack, 'enqueue_stack,' is initially empty. The operation `enqueue(3)` is shown, indicating the addition of the element '3' to the queue. This is visually represented by the number '3' appearing at the bottom of the 'enqueue_stack' with a label 'top:' indicating its position. A cyan-colored arrow labeled `push(3)` points from the right side of the 'enqueue_stack' to the number '3', illustrating that the element '3' is pushed onto the 'enqueue_stack' using a `push()` operation. The right stack, 'dequeue_stack,' contains the element '2' at its bottom, labeled with 'top:', showing the current top element of this stack.  The two stacks are distinct and independent, illustrating a common technique for implementing a queue data structure using stacks.](/assets/images/dsa/stacks/43160199440909e5.webp)

If we call dequeue again, we return the value from the top of the dequeue stack:

![Image represents a visual depiction of the `dequeue()` operation on a stack data structure.  The image shows two diagrams side-by-side. The left diagram, labeled 'enqueue_stack,' depicts a stack containing the integer value '3' at its top.  The right diagram, labeled 'dequeue_stack,' shows the same stack after the `dequeue()` operation has been performed.  In the 'dequeue_stack' diagram, the value '2' is highlighted with a light green circle at the top of the stack. A green arrow originates from this highlighted '2' and points to the right, with the text 'pop and return' indicating that the top element ('2') is popped from the stack and returned as the result of the `dequeue()` function call.  The label 'top:' is present in both diagrams, indicating the top element of the stack.  The overall image illustrates the process of removing and returning the top element from a stack, a fundamental operation in stack-based data structures.](/assets/images/dsa/stacks/62778d440ff90a01.webp)

Now, what happens when we call dequeue and the dequeue stack is empty? We need to repopulate it by popping all the values from the enqueue stack and pushing them into the dequeue stack. Once this is done, we return the top of the dequeue stack as usual:

![Image represents a visualization of a dequeue operation using two stacks, labeled 'enqueue_stack' and 'dequeue_stack'.  The top-left shows an 'enqueue_stack' with the value '3' at its top, indicated by a 'top:' label. A purple arrow labeled 'pop' shows the value '3' being moved from the 'enqueue_stack' to the 'dequeue_stack' in the top-right. The top-right shows the 'dequeue_stack' receiving the value '3' via a cyan arrow labeled 'push(3)', with 'top:' indicating its position. The bottom-left shows the 'enqueue_stack' after the pop operation, now empty. Finally, the bottom-right depicts the 'dequeue_stack' with '3' at its top (indicated by 'top:'), and a green arrow labeled 'pop and return' shows this value being popped and returned as the result of the dequeue operation.  The overall diagram illustrates the process of dequeuing an element using two stacks: first, elements are pushed onto the 'enqueue_stack', and then, when a dequeue is requested, elements are moved from the 'enqueue_stack' to the 'dequeue_stack' one by one, and finally popped from the 'dequeue_stack' to be returned.](/assets/images/dsa/stacks/96a5f4bd2861430b.webp)

Regarding the `peek` function, we follow the same logic as the `dequeue` function, but instead, we return the top element of the dequeue stack without popping it.

## Implementation

As mentioned before, the `dequeue` and `peek` functions have mostly the same behavior, with the only difference being that `dequeue` pops the top value while `peek` does not. To avoid duplicate code, the common logic between these functions for transferring values from the enqueue stack to the dequeue stack has been extracted into a separate function, `transfer_enqueue_to_dequeue`.

```python
class Queue:
    def __init__(self):
        self.enqueue_stack = []
        self.dequeue_stack = []

    def enqueue(self, x: int) -> None:
        self.enqueue_stack.append(x)

    def transfer_enqueue_to_dequeue(self) -> None:
        # If the dequeue stack is empty, push all elements from the enqueue stack
        # onto the dequeue stack. This ensures the top of the dequeue stack
        # contains the most recent value.
        if not self.dequeue_stack:
            while self.enqueue_stack:
                self.dequeue_stack.append(self.enqueue_stack.pop())

    def dequeue(self) -> int:
        self.transfer_enqueue_to_dequeue()
        # Pop and return the value at the top of the dequeue stack.
        return self.dequeue_stack.pop() if self.dequeue_stack else None

    def peek(self) -> int:
        self.transfer_enqueue_to_dequeue()
        return self.dequeue_stack[-1] if self.dequeue_stack else None
```

### Complexity Analysis

**Time complexity:** The time complexity of:

- enqueue is O ( 1 ) O(1) O ( 1 ) because we add one element to the enqueue stack in constant time.
- dequeue is amortized O ( 1 ) O(1) O ( 1 ) . In the worst case, all elements from the enqueue stack are moved to the dequeue stack. This takes O ( n ) O(n) O ( n ) time, where n n n denotes the number of elements in the enqueue queue. However, each element is only ever moved once during its lifetime. So, over n n n dequeue calls, at most n n n elements are moved between stacks, averaging the cost to O ( 1 ) O(1) O ( 1 ) time per dequeue operation.
- peek is amortized O ( 1 ) O(1) O ( 1 ) for the same reasons as dequeue .

- In the worst case, all elements from the enqueue stack are moved to the dequeue stack. This takes O ( n ) O(n) O ( n ) time, where n n n denotes the number of elements in the enqueue queue.
- However, each element is only ever moved once during its lifetime. So, over n n n `dequeue` calls, at most n n n elements are moved between stacks, averaging the cost to O ( 1 ) O(1) O ( 1 ) time per `dequeue` operation.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) since we maintain two stacks that collectively store all elements of the queue at any given time.
