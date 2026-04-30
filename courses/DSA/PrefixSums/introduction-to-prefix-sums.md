---
title: "Introduction To Prefix Sums"
course: "DSA"
topic: "PrefixSums"
source: "/home/ayush/OOD-Design-Principles/DSA/PrefixSums/Introduction to Prefix Sums.html"
---
## Intuition

Imagine keeping track of how much money you spend on takeout meals each day over a period of days.

![Image represents a Python-like list assignment.  The variable `spendings` is assigned a list containing five integer values: `10`, `15`, `20`, `10`, and `5`. These values are enclosed within square brackets `[]`, indicating a list data structure. Below the list, the days of the week—Monday (Mon), Tuesday (Tue), Wednesday (Wed), Thursday (Thu), and Friday (Fri)—are aligned with the corresponding numerical values in the list, implying that each number represents the spending for that particular day.  The overall structure shows a simple data representation where daily spending is stored in a list, with the list's index implicitly representing the day of the week.](/assets/images/dsa/prefixsums/93567dcd8cfc156f.webp)

Let's say you want to know the total spent on takeout food up until a particular day. For example, you might like to know that the total you've spent up until Wednesday is $45 ($10 + $15 + $20). This is information which a prefix sum array can store. For an array of integers, **a prefix sum array maintains the running sum of values up to each index in the array**.

![Image represents a comparison of two arrays:  'spendings' and 'prefix_sums'. The 'spendings' array, shown as `spendings = [10 15 20 10 5]`, lists daily spending amounts for Monday through Friday, respectively.  Each spending value is aligned vertically with its corresponding day label (Mon, Tue, Wed, Thu, Fri) in a lighter gray font. Below this, the 'prefix_sums' array, displayed as `prefix_sums = [10 25 45 55 60]`, shows the cumulative sum of spending up to and including each day.  For example, the first element (10) is the spending for Monday, the second element (25) is the sum of Monday's and Tuesday's spending (10 + 15), the third (45) is the sum of Monday, Tuesday, and Wednesday's spending (10 + 15 + 20), and so on.  The arrangement clearly demonstrates the relationship between daily spending and its running total, illustrating the concept of prefix sums.](/assets/images/dsa/prefixsums/4c7f62e8271e4840.webp)

To obtain the prefix sum at each index, we just add the current number from the input array to the prefix sum from the previous index.

![Image represents a step-by-step calculation of prefix sums for an array.  The top row shows the input array `[10, 15, 20, 10, 5]`.  Each element in this array is represented by a vertical orange line pointing downwards.  The label 'prefix_sums = [10' indicates the initialization of a new array to store the prefix sums.  Subsequent rows show the iterative calculation.  Each orange line represents the addition of the current element to the running sum.  Curved peach arrows indicate the addition operation (+), connecting the previous prefix sum to the current element.  The resulting prefix sums are shown in each row within square brackets: `[10]`, `[10, 25]`, `[10, 25, 45]`, `[10, 25, 45, 55]`, and finally `[10, 25, 45, 55, 60]`.  The process demonstrates how each element in the prefix sums array is the cumulative sum of all preceding elements in the input array.](/assets/images/dsa/prefixsums/285fdb88d7c29ae0.webp)

In code, the above process looks like this:

```python
def compute_prefix_sums(nums):
    # Start by adding the first number to the prefix sums array.
    prefix_sum = [nums[0]]
    # For all remaining indexes, add 'nums[i]' to the cumulative sum from the previous
    # index.
    for i in range(1, len(nums)):
        prefix_sum.append(prefix_sum[-1] + nums[i])
```

As you can see, building a prefix sum array takes O ( n ) O(n) O ( n ) time and O ( n ) O(n) O ( n ) space, where n n n denotes the length of the array.

**Applications of prefix sums** Aside from allowing us to have constant-time access to running sums at any index within an array, prefix sums are commonly used to efficiently **determine the sum of subarrays**. This application is examined in depth in the problems in this chapter.

Another interesting variant of prefix sums is prefix products, which populates an array with a running product instead of a running sum. Similar to prefix sums, prefix products provide an efficient way to determine the product of subarrays.

## Real-world Example

**Financial analysis:** As hinted at earlier, a real-world use of prefix sums is for financial analysis, particularly in calculating cumulative earnings or expenses over time.

For instance, consider a company's daily revenue over a month. A prefix sum array can be used to quickly calculate the total revenue for any given period within that month. By precomputing the prefix sums, the company can instantly determine the revenue from day 5 to day 20 without having to sum each day's revenue individually. This is especially useful for generating financial reports, where quick calculations over various periods are necessary to analyze trends.

## Chapter Outline

![Image represents a hierarchical diagram illustrating applications of the 'Prefix Sums' coding pattern.  A central, rounded-rectangle box labeled 'Prefix Sums' is connected via dashed lines to two subordinate, rounded-rectangle boxes. The left subordinate box is labeled 'Subarray Sums' and contains two bullet points: '- Sum Between Range' and '- K-Sum Subarrays,' indicating that prefix sums are used to efficiently calculate sums within specified ranges of an array and to find subarrays that sum to a target value (K). The right subordinate box is labeled 'Product Sums' and contains one bullet point: '- Product Array Without Current Element,' showing that prefix sums can also be adapted to compute the product of array elements excluding the current element.  The arrows indicate a top-down relationship, showing how the general 'Prefix Sums' technique branches into these specific applications.](/assets/images/dsa/prefixsums/263736779895c960.webp)
