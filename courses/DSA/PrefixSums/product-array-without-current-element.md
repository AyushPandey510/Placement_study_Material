---
title: "Product Array Without Current Element"
course: "DSA"
topic: "PrefixSums"
source: "/home/ayush/OOD-Design-Principles/DSA/PrefixSums/Product Array Without Current Element.html"
---
Given an array of integers, return an array res so that `res[i]` is equal to the product of all the elements of the input array except `nums[i]` itself.

#### Example:

```python
Input: nums = [2, 3, 1, 4, 5]
Output: [60, 40, 120, 30, 24]
```

Explanation: The output value at index 0 is the product of all numbers except `nums[0]` (3⋅1⋅4⋅5 = 60). The same logic applies to the rest of the output.

## Intuition

The straightforward solution to this problem is to find the total product of the array and divide it by each of the values in nums individually to get the output array:

![Image represents a calculation demonstrating a coding pattern.  The left side shows an array `[2, 3, 1, 4, 5]` with each element visually connected via orange curved lines to a central node labeled 'product = 120'. This indicates that the product of all elements in the array is 120. An arrow points to the right, leading to a calculation where 120 is divided by each element of the original array: `res = [120/2, 120/3, 120/1, 120/4, 120/5]`.  Below this, the results of these divisions are shown as a new array: `res = [60, 40, 120, 30, 24]`.  The diagram visually illustrates the process of calculating the result of dividing a product by each of its factors.](/assets/images/dsa/prefixsums/639ae4d71c5c9492.webp)

This approach allows us to solve the problem in linear time and constant space. However, a potential follow-up question by an interviewer is: **what if we can’t use division?** Let’s explore a solution to this.

**Avoiding division** A brute force approach involves calculating the output value for each index one by one. This would take O ( n ) O(n) O ( n ) time per index, leading to an overall time complexity of O ( n 2 ) O(n^2) O ( n 2 ), where n n n denotes the length of the array. This is inefficient, so let's look at other approaches.

An important insight is that the output for any given index can be determined by multiplying two things:

1. The product of all numbers to the left of the index.
2. The product of all numbers to the right of the index.

![Image represents a diagram illustrating a coding pattern, likely related to array processing or a similar data structure.  A top-level element labeled 'i' points downwards to an array-like structure visually divided into two parts. The left part, highlighted in light blue, contains the numbers '2' and '3', with a calculation 'product = 6' indicating their multiplication. The right part, highlighted in light purple, contains '4' and '5', with a corresponding calculation 'product = 20'.  A gray brace connects the results of these sub-calculations ('6' and '20'), leading to a final calculation 'res[i] = 6 * 20 = 120', showing the multiplication of the two sub-products and assigning the result (120) to an array element 'res[i]', where 'i' likely represents an index.  The diagram visually demonstrates a process where sub-arrays are processed independently to produce intermediate results, which are then combined to generate a final result.](/assets/images/dsa/prefixsums/afcc25472a63637e.webp)

Why is this helpful? If we have precomputed the products of all values to the left and right of each index, we can quickly calculate the output for each index. More specifically, we would need two arrays that contain the left and right products of each index, respectively:

- left_products : an array where left_products[i] is the product of all values to the left of i .
- right_products : an array where right_products[i] is the product of all values to the right of i .

To obtain the `left_products` array, we need to keep track of a cumulative product of all elements we encounter as we move from left to right. The value of this product at a specific index should represent the product of all values to its left. The same is true of the `right_products` array, but the cumulative products start from the right. Once we have these arrays, multiplying the left and right product values at each index gives us the output value of that index.

![Image represents a step-by-step calculation of the product of all elements in an array except the element at the current index.  The top row shows an input array `nums` containing the integers [2, 3, 1, 4, 5]. Below this, `left_products` array stores the cumulative product of elements to the left of each index in `nums`, starting with 1 (the product of zero elements).  Each element in `left_products` is calculated by multiplying the previous element by the corresponding element in `nums`. Similarly, `right_products` calculates the cumulative product of elements to the right of each index, starting from the rightmost element and moving left.  Asterisks (*) visually represent the multiplication operations between consecutive elements in `nums` to obtain `left_products`.  Double vertical lines (||) represent the multiplication between corresponding elements of `left_products` and `right_products` to produce the final `res` array, which contains the product of all elements in `nums` except the element at the current index.  For example, `res[0]` (60) is calculated as `left_products[0]` (1) * `right_products[0]` (60).](/assets/images/dsa/prefixsums/05cd2c38532a1814.webp)

Since the left and right product arrays are formed through cumulative multiplication, this leads us to the concept of prefix products.

**Prefix products** Prefix products are created in the same way as a prefix sum array, with two key differences:

1. Instead of cumulative addition, we use cumulative multiplication.
2. We initialize the prefix product array with 1 instead of 0, to avoid multiplying the cumulative products by 0.

Let’s try creating the `left_products` array, initializing it with 1 at index 0:

![Image represents a code snippet showcasing an array named `nums` initialized with the integer values [2, 3, 1, 4, 5].  Below it, another array named `left_products` is partially shown, initialized with the value `[1` suggesting it's an array intended to store the product of numbers to the left of each element in the `nums` array.  The arrangement is vertical, with `nums` above `left_products`, implying a sequential relationship where `left_products` is likely calculated based on the values in `nums`.  No explicit connections or information flow are visually depicted beyond the implied relationship between the two arrays; the image only shows the initial state of the arrays before any computation is performed.  There are no URLs or parameters present.](/assets/images/dsa/prefixsums/d77183fb0c5cd4b7.webp)

For each subsequent index in the `left_products` array, we calculate its value by multiplying the running product by the previous value in the `nums` array:

![Image represents a visual depiction of a calculation step within a coding pattern, likely related to prefix or suffix product calculation.  The top line shows a list named 'nums' containing the integer array [2, 3, 1, 4, 5].  Below, a list named 'left_products' is initialized as an array.  Gray arrows indicate that the initial values of 'nums' (2 and then 3) are being processed.  A central asterisk (*) symbolizes a calculation operation.  An orange arrow shows the result of this operation (2, likely the product of 2 and 1) being appended to 'left_products'.  The diagram suggests an iterative process where elements from 'nums' are sequentially multiplied and accumulated into 'left_products', representing a running product from the left side of the 'nums' array.  The incomplete 'left_products' array and the continuation of 'nums' imply that the calculation is ongoing.](/assets/images/dsa/prefixsums/e88bd440e646c3b8.webp)

![Image represents a calculation step involving two arrays labeled `nums` and `left_products`. The array `nums` is displayed as `[ 2 3 1 4 5 ]`, and the array `left_products` is displayed as `[ 1 2 6 ]`. The diagram illustrates how the value '6' in the `left_products` array is derived. Two grey arrows point towards a red asterisk symbol located between the two arrays. One arrow originates from the number '3' in the `nums` array (specifically the second element, index 1). The other arrow originates from the number '2' in the `left_products` array (the second element, index 1). A curved orange arrow originates from the red asterisk and points towards the number '6' in the `left_products` array (the third element, index 2). The number '6' is highlighted in orange. This visual representation indicates that the value '6' in `left_products` is the result of multiplying the value '3' from `nums` by the value '2' from `left_products`, demonstrating a step in calculating prefix products where `left_products[i] = nums[i-1] * left_products[i-1]`. Specifically, it shows `left_products[2] = nums[1] * left_products[1]`, or 6 = 3 * 2.](/assets/images/dsa/prefixsums/27384b8b58c58977.webp)

![Image represents a visual depiction of a calculation step within a coding pattern, likely related to prefix or suffix product calculation in an array.  The top line shows an array named 'nums' containing the integer values [2, 3, 1, 4, 5]. Below this, another array named 'left_products' is shown, initialized with values [1, 2, 6, 6, 1].  Grey arrows indicate that the values 1, 3, and 1 from the 'nums' array are being multiplied cumulatively to generate the corresponding values in the 'left_products' array (1*1=1, 1*2=2, 1*2*3=6). An orange curved arrow points from the value '4' in the 'nums' array to the value '6' in the 'left_products' array, indicating that the next calculation step involves multiplying the current cumulative product (6) by 4 to update the next element in 'left_products'.  A '*' symbol is placed near the point of calculation to highlight the multiplication operation. The final value in 'left_products' (1) is not explicitly shown to be calculated in the image.](/assets/images/dsa/prefixsums/f9a162431064c49e.webp)

![Image represents a visual depiction of a calculation involving two arrays.  The top array, labeled 'nums = [2 3 1 4 5]', contains five numerical elements: 2, 3, 1, 4, and 5, enclosed within square brackets. The bottom array, labeled 'left_products = [1 2 6 6 24]', also contains five elements: 1, 2, 6, 6, and 24, similarly enclosed in square brackets.  Grey arrows point from the elements 4 and 6 in the 'nums' array to the asterisk (*) symbol, indicating a multiplication operation. An orange curved arrow originates from the asterisk and points to the final element, 24, in the 'left_products' array, signifying that 24 is the result of multiplying 4 and 6.  The arrangement visually demonstrates a cumulative product calculation from left to right within the 'nums' array, resulting in the corresponding values in the 'left_products' array.  The final element in 'left_products' (24) is highlighted in orange to emphasize it as the result of the calculation.](/assets/images/dsa/prefixsums/8f3fb98c67ac7d40.webp)

The same can be done for the `right_products` array, but starting on the right and moving leftward:

![Image represents a snippet of code illustrating a computation.  The top line declares a variable named `nums` and assigns it an array containing the integer values [2, 3, 1, 4, 5]. Below this, a second line declares a variable named `right_products` and initializes it as an array, currently empty except for a single closing bracket `]`.  The arrangement suggests that the `right_products` array will be populated based on calculations involving the `nums` array.  There is no explicit connection shown between the two arrays, only their declaration and initial values.  The image implies a process where the `right_products` array will be filled with values derived from the `nums` array, likely involving a right-to-left product calculation. The number `1` at the end of `right_products` suggests an initial value or a placeholder for the result of the computation.](/assets/images/dsa/prefixsums/d7ce6fb3799306ad.webp)

![Image represents a visual depiction of a coding pattern, likely related to array manipulation.  The top line shows an array named 'nums' initialized with the integer values [2, 3, 1, 4, 5]. Below this, a partially filled array named 'right_products' is shown as an empty array `[]`.  An orange curved arrow points from the number 5 in the 'nums' array to an asterisk (*), indicating a calculation is performed on this element.  Gray arrows point from both the 5 and the 1 (the last two elements of the 'nums' array) to the asterisk, suggesting a multiplication operation. The result of this multiplication (5 * 1 = 5) is then shown as the first element (5) in the 'right_products' array.  The diagram illustrates a step-by-step process of calculating the product of elements to the right of each element in the 'nums' array and storing the results in the 'right_products' array.  The diagram only shows the calculation for the last element, implying a similar process would be repeated for the preceding elements.](/assets/images/dsa/prefixsums/14812feb5551e8a4.webp)

![Image represents a visual depiction of a coding pattern, likely illustrating the calculation of cumulative products from right to left within an array.  The top line shows an array named 'nums' containing the integer values [2, 3, 1, 4, 5]. Below, an array named 'right_products' is initialized as empty.  The core of the diagram shows the calculation process:  grey arrows point from the elements of the 'nums' array (4 and 5) to a multiplication symbol (*), indicating that these elements are being multiplied. The result of 4 * 5 = 20 is shown in orange, and an orange curved arrow points to this result from the multiplication symbol, highlighting the flow of calculation.  This 20 is the first element of the 'right_products' array. The next element of 'right_products' (5) is calculated by multiplying the next element to the left in 'nums' (1) with the previous result (20/5 = 4, which is not explicitly shown but implied). The final element of 'right_products' (1) is simply the last element of 'nums'. The diagram visually demonstrates a right-to-left cumulative product calculation.](/assets/images/dsa/prefixsums/d033572287d31f82.webp)

![Image represents a diagram illustrating a coding pattern, likely related to calculating cumulative products from right to left within an array.  The top line shows an array named 'nums' containing the integer values [2, 3, 1, 4, 5]. Below this, an array named 'right_products' is partially shown, initialized as an empty array.  Gray arrows point from the 'nums' array to the 'right_products' array, indicating a calculation flow.  A multiplication symbol (*) is positioned centrally, suggesting that the calculation involves multiplication.  An orange curved arrow points from the last element (5) of 'nums' to the first element (20) of 'right_products', indicating that the first element of 'right_products' is the cumulative product of the elements in 'nums' from right to left (5 * 4 * 1 * 3 * 2 = 120, but the image shows 20, which is likely a mistake or a simplified example). The subsequent elements in 'right_products' (20, 5, 1) are also derived from this right-to-left cumulative product calculation, with each element representing the product of the remaining elements to its right in the 'nums' array.  The diagram visually demonstrates the process of generating a new array containing cumulative products from the right side of the input array.](/assets/images/dsa/prefixsums/a530d6c4528c293b.webp)

![Image represents a diagram illustrating a calculation of right products.  The top row shows a list labeled 'nums = [2 3 1 4 5]', representing an array named 'nums' containing the integer values 2, 3, 1, 4, and 5.  Below this, labeled 'right_products =', is a second array showing the result of a calculation.  This array contains the values [60 20 20 5 1].  Gray arrows point from the 'nums' array to the 'right_products' array, indicating a dependency.  A prominent orange curved arrow points from the first element of the 'right_products' array (60) to the asterisk (*) symbol, which is positioned between the two arrays, suggesting that the calculation starts from the rightmost element of the 'nums' array and proceeds leftward, accumulating products.  The asterisk likely represents the multiplication operation used in the calculation.](/assets/images/dsa/prefixsums/ab47034028f17f5d.webp)

Once both arrays are populated, we can compute each value of the output array, where `res[i]` is equal to the product of `left_products[i]` and `right_products[i]`, as previously demonstrated.

**Reducing space** We have successfully found a solution that doesn't involve division and runs in linear time. However, this solution takes up linear space due to the left and right product arrays. Can we compute the output array in place without taking up extra space?

An important thing to realize is that we don’t necessarily need to create the left and right product arrays to populate the output array. Instead, we can **directly compute and store the left and right products in the output array as we calculate them**.

This can be done in two steps:

1. First, populate the output array (`res`) the same way we populated `left_products`. This prepares the output array to be multiplied by the right products:

![Image represents a step-by-step calculation of the product of elements to the left of each element in an array.  The top line shows an array named `nums` containing the integer values [2, 3, 1, 4, 5]. Below it, `left_products` is an array initialized with the cumulative product of elements to the left of each corresponding element in `nums`, shown in gray.  The first element is 1 (as there are no elements to its left), the second is 2 (the product of the first element in `nums`), the third is 6 (2*3), the fourth is 6 (2*3*1), and the fifth is 24 (2*3*1*4). Finally, `res` is an array that appears to be a copy of `left_products`, displayed in black, with a gray arrow pointing to the right from the end of `res`, indicating the final result of the calculation.  The values in `res` are identical to those in `left_products`, suggesting that the calculation of the cumulative left products is complete and stored in `res`.](/assets/images/dsa/prefixsums/d6b35d97c4d32ad3.webp)

2. Then, instead of populating a `right_products` array, we directly multiply the running product from the right (`right_product`) into the output array:

![Image represents a step-by-step illustration of a coding pattern, likely for calculating the product of array elements to the right of each element.  Two instances are shown, each depicting an array `nums` = [2, 3, 1, 4, 5] and an array `res` which is being populated.  The `res` array initially contains [1, 2, 6, 6, 24] in the first instance and [1, 2, 6, 30, 24] in the second.  A variable `right_product` is used; it starts at 1.  Each instance shows a dashed box containing calculations.  In the first instance, the calculation `res[i] = res[i] * right_product` updates `res[3]` (initially 6) to 24 by multiplying it with `right_product` (1). Then, `right_product` is updated to 5 (1 * 5).  The second instance shows a similar calculation, but now `res[3]` (initially 6) is updated to 30 (6 * 5), and `right_product` is updated to 20 (5 * 4).  Arrows indicate the flow of information:  the updated `right_product` value from one step feeds into the next step's calculation, and the updated `res[i]` value reflects the result of the calculation.  The `(i)` symbols above the `nums` arrays indicate the iteration index.](/assets/images/dsa/prefixsums/2a00c8e49b9718e9.webp)

![Image represents a step-by-step illustration of an array manipulation algorithm.  The left side shows two arrays: `nums` containing the integer values [2, 3, 1, 4, 5], and `res` initialized to [1, 2,  ,  ,  ]. An arrow points from a small 'i' symbol to the element '1' in `nums`, indicating the current index being processed. The third element of `res` is highlighted in peach and shows the value 120, resulting from a calculation. The right side displays the calculation details: `res[i] = res[i] * right_product`, where `res[i]` represents the current element in `res` (initially 6), and `right_product` is a variable. The calculation shows `6 * 20 = 120`, updating `res[i]`.  Below, the update of `right_product` is shown as `right_product = right_product * nums[i]`, which calculates `20 * 1 = 20`, implying that `right_product` is iteratively updated based on the elements in `nums`.  The overall diagram visualizes a process where an array (`res`) is populated by multiplying its elements with a dynamically updated `right_product`, derived from the `nums` array.](/assets/images/dsa/prefixsums/9fd4a12c2e5162f6.webp)

![Image represents a step-by-step illustration of a coding pattern, likely related to array manipulation.  The left side shows an array named `nums` containing the integer values [2, 3, 1, 4, 5], and another array `res` initialized as [1,  _, _, _, _].  A downward arrow points from a labeled box 'i' to the element '3' in `nums`, indicating an iteration index. The second element of `res` is highlighted with a peach-colored circle containing the value 40. The right side displays a calculation demonstrating how the value 40 is derived: `res[i] = res[i] * right_product`, where `res[i]` (the second element of `res`) is calculated as 2 (the first element of `nums`) multiplied by 20 (the `right_product`).  Further calculations show that `right_product` is updated iteratively: initially it's 20, then it becomes 60 (20 * 3), implying a right-to-left product calculation across the `nums` array.  The overall diagram visualizes a single iteration of an algorithm, likely calculating the product of all elements to the right of each element in `nums` and storing the result in `res`.](/assets/images/dsa/prefixsums/872cd0be689b0f88.webp)

![Image represents a step-by-step illustration of a coding pattern, likely related to array manipulation.  The left side shows an input array `nums` containing the integer values [2, 3, 1, 4, 5], and an output array `res` initialized with [60, 40, 120, 30, 24].  An arrow labeled 'i' points from a small square to the `nums` array, indicating an iterative process. The highlighted value '60' in `res` corresponds to the first element. The right side displays a calculation box detailing the computation for the first element of `res`.  The formula `res[i] = res[i] * right_product` is shown, with `res[i]` initially set to 1.  The `right_product` variable is updated iteratively; in this example, it starts at 60 and is then updated to 120 (60 * 2) for the next iteration, implying a right-to-left calculation involving the product of elements in `nums`.  The calculation shows the intermediate steps: 1 * 60 = 60, and then the update of `right_product` to 120 for the next iteration.  The overall pattern suggests a cumulative product calculation from the right side of the `nums` array, influencing the values in the `res` array.](/assets/images/dsa/prefixsums/f0f625801a70c36b.webp)

## Implementation

```python
from typing import List
    
def product_array_without_current_element(nums: List[int]) -> List[int]:
    n = len(nums)
    res = [1] * n
    # Populate the output with the running left product.
    for i in range(1, n):
        res[i] = res[i - 1] * nums[i - 1]
    # Multiply the output with the running right product, from right to left.
    right_product = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right_product
        right_product *= nums[i]
    return res
```

### Complexity Analysis

**Time complexity:** The time complexity of `product_array_without_current_element` is O ( n ) O(n) O ( n ) because we iterate over the `nums` array twice.

**Space complexity:** The space complexity is O ( 1 ) O(1) O ( 1 ). The `res` array is not included in the space complexity analysis.
