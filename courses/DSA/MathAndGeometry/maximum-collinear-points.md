---
title: "Maximum Collinear Points"
course: "DSA"
topic: "MathAndGeometry"
source: "/home/ayush/OOD-Design-Principles/DSA/MathAndGeometry/Maximum Collinear Points.html"
---
Given a set of points in a two-dimensional plane, determine the **maximum number of points** that lie along the same straight line.

#### Example:

![Image represents a Cartesian coordinate system with a labeled x-axis and y-axis ranging from 0 to 4.  The graph displays several black points plotted at coordinates (1,1), (1,3), (2,2), (3,1), (3,3), and (4,4).  A prominent orange line connects the points (1,1), (2,2), (3,3), and (4,4), representing a linear relationship with a positive slope. The other points are not on this line, suggesting they are outliers or data points not fitting the linear trend shown by the orange line.  The axes are clearly marked with numerical values, indicating the scale of the graph. The overall image suggests a visualization of data points and a best-fit line, possibly illustrating a concept related to linear regression or data fitting within the context of a coding patterns course.](/assets/images/dsa/mathandgeometry/dcbe08457213a9e7.webp)

```python
Input: points = [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3], [4, 4]]
Output: 4
```

#### Constraints:

- The input won't contain duplicate points.

## Intuition

Two or more points are collinear if they lie on the same straight line. In other words, the **slope** between any pair of points among them will be equal:

![Image represents a Cartesian coordinate system with x and y axes ranging from 0 to 4.  Several black dots are plotted on the graph representing data points: approximately (1,1), (2,2), (3,3), (4,4), (1,3), and (3,1). A dark gray line connects the points (1,1), (2,2), (3,3), and (4,4). This line is highlighted by a light peach-colored band. A curved gray arrow points from the band to the text 'all pairs of points have a slope of 1,' indicating that the slope between any two points on the highlighted line is 1.  The remaining points (1,3) and (3,1) lie outside this highlighted band, illustrating that they do not share the same slope relationship with the points on the line.](/assets/images/dsa/mathandgeometry/326952a38519ac21.webp)

Let’s remind ourselves how the slope of a line is calculated given two points (x a x_a x a ​, y a y_a y a ​) and (x b x_b x b ​, y b y_b y b ​):

s l o p e = r i s e / r u n = ( y b − y a ) / ( x b − x a ) slope = rise / run = (y_b-y_a) / (x_b-x_a) s l o p e = r i se / r u n = ( y b ​ − y a ​ ) / ( x b ​ − x a ​ )

Using this formula, we can calculate the slope between all pairs of points from the input, and determine the largest number of pairs that share the same slope. However, this approach is flawed because two pairs of points with the same slope value may not be collinear:

![Image represents a Cartesian coordinate system with x and y axes ranging from 0 to 4.  Two lines are plotted on this system.  The first line, colored orange, connects the points (1, 3) and (2, 4).  Next to this line, the text 'slope = 1' is written in orange. The second line, colored cyan, connects the points (2, 2) and (3, 3).  Similarly, the text 'slope = 1' is written next to this line in cyan. Both lines visually demonstrate a slope of 1, indicating a positive linear relationship where for every unit increase in x, there is a corresponding unit increase in y.  The points on both lines are represented by solid black dots.](/assets/images/dsa/mathandgeometry/1feeb73b9de3049d.webp)

Let's think of a different way to find the answer. What if we try to find the maximum number of points collinear with a specific point? Let’s call this point a **focal point**.

We can calculate the slope between the focal point and every other point in the input, using a hash map to count how many points correspond with each slope value. Note that the frequencies of points stored in the hash map do not include the focal point.

![Image represents a Cartesian coordinate system with x and y axes ranging from 0 to 4.  Two lines are plotted: an orange line with a positive slope passing through points (1,1), (2,2), and (3,3), and a cyan line with a negative slope intersecting the orange line at (2,2) and passing through points (1,3) and (3,1).  Numerical values representing the slopes (1 and -1) are labeled along each line. A downward-pointing arrow labeled 'focal_point' indicates the intersection point (2,2) of the two lines.  To the right, a table labeled 'slope_map' is shown, containing two columns: 'slope' and 'freq'. The 'slope' column lists the slopes 1 and -1, while the 'freq' column shows their corresponding frequencies, 3 and 2 respectively.  This suggests the diagram illustrates a concept where lines with different slopes are analyzed, with the intersection point highlighted as a focal point, and the frequency of each slope recorded in the table.](/assets/images/dsa/mathandgeometry/63a8631a8dd1997d.webp)

This allows us to find the maximum number of points collinear with this focal point:

![Image represents a Cartesian coordinate system with a line passing through several points.  The x-axis and y-axis are labeled 'x' and 'y' respectively, ranging from 0 to 4. A gray line connects points (1,1), (2,2), and (4,4), with the value '1' indicated as the vertical and horizontal distance between consecutive points. A larger, lighter-shaded area highlights this line segment.  The point (2,2) is specifically labeled 'focal_point' with a downward-pointing arrow indicating its significance.  Several other black dots are plotted at coordinates (1.5, 3), (3,1), and are not directly connected to the main line. Separately, a table labeled 'slope_map' is shown, containing two columns titled 'slope' and 'freq'.  The 'slope' column lists values '1' and '-1', while the 'freq' column lists '3' and '2', suggesting a frequency count associated with each slope.  The overall image likely illustrates a concept related to line fitting, slope analysis, or data distribution within a coding pattern context.](/assets/images/dsa/mathandgeometry/74cf05321ebe284f.webp)

Here, the slope with the highest frequency is 3, which means the number of points on the line defined by that slope is 3 + 1 = 4, where +1 is used to account for the focal point itself.

By repeating the process for every point, we can determine the maximum number of points that are collinear with each focal point. Our final answer is equal to the largest of these maximums.

**Edge case: two points on the same x-axis** When two collinear points share the same x-axis, the denominator of the slope equation will equal 0 (i.e., r u n = x b − x a = 0 run = x_b - x_a = 0 r u n = x b ​ − x a ​ = 0). This is problematic because dividing by 0 is undefined:

![Image represents a Cartesian coordinate system with a vertical line segment plotted on it. The x-axis is labeled 'x' and ranges from 0 to 4, while the y-axis is labeled 'y' and ranges from 0 to 4.  Two points, (2, 1) and (2, 4), are marked on the graph with black dots. A vertical orange line segment connects these two points. To the right of the line segment, the calculation of the slope is shown:  `slope = (4 - 1) / (2 - 2) = 3/0`. This demonstrates that the slope of a vertical line is undefined because division by zero is not possible.](/assets/images/dsa/mathandgeometry/7bf9906e8781393a.webp)

To handle this issue, we can check if our run value is equal to 0. If so, we can just use infinity (`float('inf')`) to represent the value of this slope.

**Avoiding precision issues** A crucial thing to be mindful of is the precision of slopes when storing them as floats or doubles. Consider the following slopes:

![Image represents two calculations of slopes, `slope1` and `slope2`, each defined as the ratio of `rise` to `run`.  `slope1` is calculated as 499999999/500000000, which, due to floating-point precision limitations, results in 0.999999998.  `slope2` is calculated as 499999998/499999999, also resulting in 0.999999998 after floating-point precision is applied.  The diagram visually shows these calculations with rectangular boxes representing the fraction calculations (e.g., 499999999/500000000 and 499999998/499999999) and rounded rectangles representing the final floating-point results (0.999999998). Arrows connect the fraction calculations to their respective floating-point results, labeled 'float precision'.  A vertical arrow and the label 'not equal' connect the two fraction calculations, indicating that despite their near-identical results after floating-point conversion, the original fractions are not mathematically equal.  Similarly, a vertical arrow and the label 'equal' connect the two floating-point results, highlighting that the final results are considered equal due to the limitations of floating-point precision.](/assets/images/dsa/mathandgeometry/3ff5435b9424390f.webp)

As we can see, despite the fractions themselves representing different slopes, presenting them as a float or double doesn’t provide enough decimal-point precision to distinguish between them accurately. This can result in incorrectly identifying distinct slopes as the same.

To avoid this, we can represent a slope as a pair of integers, stored as a tuple: (rise, run). For example, the slope with a rise of 1 and a run of 2 can be represented as (1, 2) instead of 1 / 2 = 0.5.

**Ensuring consistent representation of slopes** There’s just one more challenge to address: ensuring the representation of a slope is consistent for all equivalent slope fractions:

![Image represents three fractions, ¹⁄₂, ²⁄₄, and ¹³/₂₆, each positioned at the top and slightly separated from each other.  Curved grey lines connect each fraction individually to a single point below. This point is labeled 'same value, different fractional representations,' indicating that despite their different numerators and denominators, all three fractions are equivalent and represent the same numerical value (0.5). The arrangement visually demonstrates the concept of equivalent fractions, showcasing how a single value can have multiple fractional representations.](/assets/images/dsa/mathandgeometry/70b891d6a0d48da9.webp)

If we reduce fractions to their simplest forms, we can consistently represent equal fractions that have different initial representations.

![Image represents a diagram illustrating a pattern in fraction simplification.  The diagram shows three columns, each representing a separate fraction simplification example.  The top of each column displays an initial fraction:  ¹⁄₂ in the first column, ²⁄₄ in the second, and ¹³/₂₆ in the third.  A downward-pointing grey arrow connects each initial fraction to a simplified equivalent fraction at the bottom of the column: ¹⁄₂ in the first column, ¹⁄₂ in the second, and ¹⁄₂ in the third.  The arrangement visually demonstrates that despite starting with different numerical representations, each fraction simplifies to the same result, ¹⁄₂, highlighting a pattern of fraction reduction.](/assets/images/dsa/mathandgeometry/56752410e6ae6970.webp)

But how can we do this? We can reduce fractions by dividing both the rise and run by their greatest common divisor (GCD).

**Greatest common divisor** The GCD of two numbers is the largest number that divides both of them exactly. By dividing the rise and run by their GCD, we reduce the slope to its simplest form:

![Image represents a step-by-step calculation demonstrating the simplification of a ratio using the greatest common divisor (GCD).  It begins with an ordered pair (rise, run) = (13, 26), representing a slope or ratio.  A grey arrow indicates a transformation where both 'rise' and 'run' are divided by 13 (highlighted in orange), resulting in a simplified ratio (rise/13, run/13) = (1, 2).  Below, a separate calculation shows that the greatest common divisor of 13 and 26 is 13 (also highlighted in orange).  The arrangement visually connects the initial ratio, its simplification, and the GCD calculation, illustrating how finding the GCD allows for the simplification of the ratio.  The arrows show the flow of information, indicating the dependency of the simplified ratio on the GCD calculation.](/assets/images/dsa/mathandgeometry/93a84918b29c0a0e.webp)

This ensures all equal fractions are represented in the same way.

## Implementation

```python
from typing import List, Tuple
from collections import defaultdict
    
def maximum_collinear_points(points: List[List[int]]) -> int:
    res = 0
    # Treat each point as a focal point, and determine the maximum number of points
    # that are collinear with each focal point. The largest of these maximums is the
    # answer.
    for i in range(len(points)):
        res = max(res, max_points_from_focal_point(i, points))
    return res
    
def max_points_from_focal_point(focal_point_index: int, points: List[List[int]]) -> int:
    slopes_map = defaultdict(int)
    max_points = 0
    # For the current focal point, calculate the slope between it and every other
    # point. This allows us to group points that share the same slope.
    for j in range(len(points)):
        if j != focal_point_index:
            curr_slope = get_slope(points[focal_point_index], points[j])
            slopes_map[curr_slope] += 1
            # Update the maximum count of collinear points for the current focal
            # point.
            max_points = max(max_points, slopes_map[curr_slope])
    # Add 1 to the maximum count to include the focal point itself.
    return max_points + 1
    
def get_slope(p1: List[int], p2: List[int]) -> Tuple[int, int]:
    rise = p2[1] - p1[1]
    run = p2[0] - p1[0]
    # Handle vertical lines separately to avoid dividing by 0.
    if run == 0:
        return (1, 0)
    # Simplify the slope to its reduced form.
    gcd_val = gcd(rise, run)
    return (rise // gcd_val, run // gcd_val)
```

While some programming languages, Python included, have their own internal implementation of the GCD function, its implementation is provided below for your information. This implementation is commonly known as the Euclidean algorithm:

```python
# The Euclidean algorithm.
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

### Complexity Analysis

**Time complexity:** The time complexity of `maximum_collinear_points` is O ( n 2 log ⁡ ( m ) ) O(n^2\log(m)) O ( n 2 lo g ( m )), where n n n denotes the number of points, and m m m denotes the largest value among the coordinates. Here’s why:

- The time complexity of the gcd(rise, run) function is O ( log ⁡ ( m i n ( r i s e , r u n ) ) ) O(\log(min(rise, run))) O ( lo g ( min ( r i se , r u n ))) , which is approximately equal to O ( log ⁡ ( m ) ) O(\log(m)) O ( lo g ( m )) in the worst case.
- The helper function max_points_from_focal_point , calls the gcd function a total of n-1 times: one for each point excluding the focal point, giving a time complexity of O ( n log ⁡ ( m ) ) O(n\log(m)) O ( n lo g ( m )) .
- The max_points_from_focal_point function is called a total of n n n times, resulting in an overall time complexity of O ( n 2 log ⁡ ( m ) ) O(n^2\log(m)) O ( n 2 lo g ( m )) .

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the hash map, which in the worst case, stores n − 1 n-1 n − 1 key-value pairs: one for each point excluding the focal point.
