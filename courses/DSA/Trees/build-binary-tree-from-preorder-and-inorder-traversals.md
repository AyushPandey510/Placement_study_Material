---
title: "Build Binary Tree From Preorder And Inorder Traversals"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Build Binary Tree From Preorder and Inorder Traversals.html"
---
Construct a binary tree using arrays of values obtained after a **preorder** traversal and an **inorder** traversal of the tree.

#### Example:

![Image represents a binary tree data structure.  The tree is rooted at node 5, which branches into two child nodes: 9 on the left and 3 on the right.  Node 9 further branches into a single child node, 2. Node 3 branches into two child nodes: 4 on the left and 7 on the right.  Each node contains a single integer value. The connections between nodes represent parent-child relationships, indicating a hierarchical structure where each node (except the root) has exactly one parent node, and each node can have zero, one, or two child nodes.  There is no information flow explicitly depicted; the diagram solely illustrates the structural organization of the data within the tree.](/assets/images/dsa/trees/f6fcf5eb7abbd2cd.webp)

```python
Input: preorder = [5, 9, 2, 3, 4, 7], inorder = [2, 9, 5, 4, 3, 7]
```

#### Constraints:

- The tree consists of unique values.

## Intuition

The first question that might come to mind is why both the preorder and inorder arrays are needed to solve this problem. Can’t we just use one of them? The reason is that each individual traversal order could represent multiple possible trees. For example, below are some trees that correspond to the following inorder traversal:

![Image represents three different binary trees, each visually depicted with nodes containing numerical values connected by branches, alongside an array labeled 'inorder = [2 9 5 4 3 7]'.  The array represents an inorder traversal of all three trees. The first tree shows a root node '5' with a left subtree containing nodes '9' (parent) and '2' (child) and a right subtree with nodes '3' (parent), '4' (child), and '7' (child). The second tree has a root node '2', with a right subtree containing nodes '4' (parent), '5' (child), and '3' (child), where '3' has a right child '7' and '5' has a left child '9'. The third tree shows a root node '4', with a left subtree containing nodes '5' (parent), '2' (child), and '9' (child) and a right subtree with nodes '7' (parent) and '3' (child).  All three trees contain the same set of nodes (2, 3, 4, 5, 7, 9), but their structures differ, demonstrating that different tree structures can yield the same inorder traversal.](/assets/images/dsa/trees/f6583a4c59bcd879.webp)

If one traversal array isn’t enough, it might be possible to build the tree using an additional traversal array as a reference point, to help identify how each node should be placed.

**The root node** Whatever our approach, we initially need a way to access the root node since the root node is necessary to construct the rest of the tree.

To identify where the root node is, let’s first remind ourselves how nodes are processed during each traversal algorithm.

Notice that during preorder traversal, the current node is processed before its subtrees. From this, we can infer that preorder traversal processes the root node first, meaning **the first value in the preorder array is the value of the root node.**

With this established, let’s find a method to build the rest of the tree.

**Building the tree** Consider the preorder and inorder traversal arrays below and the corresponding binary tree:

![Image represents a binary tree alongside its preorder and inorder traversal sequences.  The right side shows a binary tree with root node '5'.  Node '5' connects to a left child node '9' and a right child node '3'. Node '9' has a left child node '2', and node '3' has a left child node '4' and a right child node '7'. The left side displays two arrays: 'preorder' which lists the nodes in the order they are visited during a preorder traversal ([5, 9, 2, 3, 4, 7]), and 'inorder' which lists the nodes in the order they are visited during an inorder traversal ([2, 9, 5, 4, 3, 7]).  The preorder traversal starts at the root and recursively visits the left subtree before the right subtree, while the inorder traversal recursively visits the left subtree, then the root, and finally the right subtree.  The image demonstrates the relationship between a binary tree's structure and its preorder and inorder traversal sequences.](/assets/images/dsa/trees/a44266ac34fce35d.webp)

As mentioned above, we know the first value of the preorder array, 5, is the value of the root node.

![Image represents a visual depiction of a preorder traversal in a tree structure.  A rectangular box labeled 'root' in orange is positioned above an orange arrow pointing downwards towards a preorder array representation. The array, labeled 'preorder = [ 5  9  2  3  4  7 ]', shows a sequence of numbers.  The number 5, the first element in the array, is highlighted by being enclosed in an orange circle below the array, indicating it's the root node of the tree. The arrow visually connects the 'root' label to the first element (5) of the preorder array, signifying that the value 5 is the root node of the tree whose preorder traversal is represented by the array.  The remaining numbers in the array (9, 2, 3, 4, 7) represent the other nodes in the tree, ordered according to the preorder traversal algorithm (root, left subtree, right subtree).](/assets/images/dsa/trees/126617d76ee9e9ea.webp)

Now the question is, what node should be placed next? The preorder array alone isn’t enough to determine this. So, we should consult the inorder array.

Inorder traversal first visits a node’s left subtree before processing the node itself, so we can deduce that all values in the inorder array to the left of 5 are part of its left subtree. Similarly, all values to the right of 5 in the inorder array belong to its right subtree:

![Image represents a binary search tree with the root node labeled '5', highlighted in peach.  The node '5' has a left subtree, shaded light blue, containing nodes '9' and '2', with '9' as the parent node and '2' as its child.  A light orange arrow points from the inorder traversal array element '5' to the root node '5' in the tree.  Similarly, the node '5' has a right subtree, shaded light purple, consisting of nodes '3', '4', and '7', where '3' is the parent node, and '4' and '7' are its left and right children respectively. A violet arrow points from the inorder traversal array element '3' to the node '3' in the tree.  Above the tree, an inorder traversal array `[2, 9, 5, 4, 3, 7]` is shown, with the elements '2' and '9' representing the inorder traversal of the left subtree, '5' representing the root, and '4', '3', and '7' representing the inorder traversal of the right subtree.  The text 'node 5's left subtree' and 'node 5's right subtree' clearly labels the respective subtrees.  The arrows visually connect the inorder traversal array elements to their corresponding nodes in the tree, illustrating the relationship between the inorder traversal and the tree structure.](/assets/images/dsa/trees/f43eaddda0a65764.webp)

Now what? With the root node placed, we have two subtrees to build: node 5’s left and right subtrees.

If we build the tree starting with the already-created root node, followed by the left subtree and then the right subtree, we’re effectively **building the tree using preorder traversal**. This is useful because we happen to have an array of values from a preorder traversal, which means we know the exact order in which the nodes should be created.

As we’re building the tree using preorder traversal, the next node to be created at any point will be the next value in the preorder array. This means we can iterate through the preorder array to place each new node.

Based on this, we know the next node to be placed will have a value of 9. But how do we know if node 9 is a left child or a right child of 5?

![The image represents two possible binary tree structures derived from a preorder traversal sequence.  At the top, a preorder traversal array is shown as `preorder = [5 9 2 3 4 7]`. A downward-pointing orange arrow highlights the number `9` within this array. Below the array, two small binary trees are presented.  Both trees have a root node labeled `5` (in a black circle).  The left tree shows a dashed line connecting the root node `5` to a child node `9` (in an orange circle), while the right tree shows the same root node `5` connected via a dashed line to a child node `9` (also in an orange circle). The word 'OR' is placed between the two trees, indicating that both structures are valid interpretations of the preorder traversal sequence given the ambiguity inherent in preorder traversals without additional information.  The difference lies in which node is considered the child of the root node `5`.](/assets/images/dsa/trees/3b02d634a857c0e0.webp)

This is where the inorder array comes in, as it helps us determine the structure of the tree. Consider the left subtree:

- When we want to build the left subtree of a node, we look at the part of the inorder array that corresponds to the left subtree. In our example, this is the subarray [2, 9].
- If this subarray is not empty, we proceed to build the left subtree, starting with node 9.
- If this subarray is empty, it means there is no left subtree, so the current node’s left child is null.

![Image represents a diagram illustrating the construction of a binary tree from an inorder traversal array.  The top line shows the inorder traversal array `inorder = [2 9 5 4 3 7]` split into two subarrays: `[2 9 5]` (highlighted in light blue) and `[4 3 7]` (highlighted in light purple). A light blue curved arrow connects the first subarray to the text 'left subarray not empty → left subtree exists,' indicating that the non-empty left subarray implies the existence of a left subtree in the corresponding binary tree. Similarly, a light purple curved arrow connects the second subarray to the text 'right subarray not empty → right subtree exists,' showing that the non-empty right subarray implies the existence of a right subtree.  The diagram visually demonstrates how the presence of non-empty subarrays in an inorder traversal directly relates to the existence of left and right subtrees during binary tree construction.](/assets/images/dsa/trees/36ec505e94522c57.webp)

The same logic applies to the right subtree: we only build it if its corresponding inorder subarray isn’t empty.

Now, let’s devise a strategy for our algorithm. To utilize the two traversal arrays, we can assign a pointer to each:

- A preorder_index points to the value of the current subtree’s root node. Once this node is created, increment preorder_index so it points to the value of the next node to be created.
- An inorder_index is used to determine the position of the same value in the inorder array. We can find the index of this value by searching through the inorder array.

![Image represents a visual explanation of constructing a binary tree from its preorder and inorder traversal sequences.  The top section shows a labeled box 'preorder_index' pointing down to a preorder traversal sequence represented as `preorder = [5 9 2 3 4 7]`. Below this, another labeled box 'inorder_index' points to an inorder traversal sequence `inorder = [2 9 5 4 3 7]`, with the numbers 2 and 9 highlighted in light blue, and 4, 3, and 7 highlighted in light purple.  To the right, a binary tree is depicted with the root node labeled '5'.  The left subtree, represented by `[2,9]` in cyan, and the right subtree, represented by `[4,3,7]` in violet, branch from the root node. The diagram illustrates how the preorder and inorder sequences, along with their indices, are used to reconstruct the structure of the binary tree.](/assets/images/dsa/trees/3756f1bcb9470980.webp)

At each recursive call, once these indexes are obtained, we:

1. Create the current node using the value pointed at by preorder_index .
2. Increment preorder_index so it points to the value of the next node to be created.
3. Make a recursive call to build the current node’s left and right subtrees: Pass in the subarray inorder[0, inorder_index - 1] to build the left subtree. Pass in the subarray inorder[inorder_index + 1, n - 1] to build the right subtree.

**Optimization - left and right pointers** One inefficiency of the above approach is that we extract entire subarrays out of the inorder array whenever we make a recursive call, which takes O ( n ) O(n) O ( n ) time each time we do this, where n n n denotes the length of each input array. A more efficient approach is to **define the range of each inorder subarray using left and right pointers**. Specifically:

- The left subtree contains the values in the range [left, inorder_index - 1] .
- The right subtree contains the values in the range [inorder_index + 1, right] .

![Image represents a diagram illustrating a recursive algorithm for constructing a binary tree from its preorder and inorder traversal sequences.  At the top, a box labeled 'preorder_index' points down to a preorder traversal sequence represented as `preorder = [5 9 2 3 4 7]`. Below this, boxes labeled 'left' and 'right' branch from the preorder sequence.  The 'left' box points to a portion of the inorder traversal sequence, `inorder = [2 9]`, highlighted in light blue, representing the left subtree.  The 'right' box points to `inorder = [4 3 7]`, highlighted in lavender, representing the right subtree.  Gray curved arrows connect the highlighted inorder subsequences to further subdivisions of the inorder sequence, indicated by `inorder = [2 9 5 4 3 7]` and `inorder = [2 9 5 4 3 7]`, respectively, with orange dashed lines showing the recursive partitioning of the inorder sequence to identify left and right subtrees.  The numbers within the inorder sequences are used to locate the root of each subtree based on its position in the preorder sequence, recursively building the binary tree.  The labels 'left' and 'right' consistently indicate the partitioning of the inorder sequence to define the left and right subtrees at each recursive step.](/assets/images/dsa/trees/8aa0c383ca00c64c.webp)

This allows us to define subarrays by just moving pointers, as opposed to creating completely new subarrays.

**Optimization - hash map** At each node, it’s necessary to set `inorder_index` to the position of the same value pointed at by `preorder_index`. Performing a linear search for this value would take O ( n ) O(n) O ( n ) time for each node. Instead, we can use a **hash map** to store the inorder array values and their indexes, allowing us to retrieve any value's index from the inorder array in O ( 1 ) O(1) O ( 1 ) time.

## Implementation

```python
from ds import TreeNode
from typing import List
    
preorder_index = 0
inorder_indexes_map = {}
    
def build_binary_tree(preorder: List[int], inorder: List[int]) -> TreeNode:
    global inorder_indexes_map
    # Populate the hash map with the inorder values and their indexes.
    for i, val in enumerate(inorder):
        inorder_indexes_map[val] = i
    # Build the tree and return its root node.
    return build_subtree(0, len(inorder) - 1, preorder, inorder)
    
def build_subtree(left, right, preorder, inorder):
    global preorder_index, inorder_indexes_map
    # Base case: if no elements are in this range, return None.
    if left > right:
        return None
    val = preorder[preorder_index]
    # Set 'inorder_index' to the index of the same value pointed at by
    # 'preorder_index'.
    inorder_index = inorder_indexes_map[val]
    node = TreeNode(val)
    # Advance 'preorder_index' so it points to the value of the next node to be
    # created.
    preorder_index += 1
    # Build the left and right subtrees and connect them to the current node.
    node.left = build_subtree(left, inorder_index - 1, preorder, inorder)
    node.right = build_subtree(inorder_index + 1, right, preorder, inorder)
    return node
```

### Complexity Analysis

**Time complexity:** The time complexity of `build_binary_tree` is O ( n ) O(n) O ( n ), as it makes one call to the `build_subtree` function, which recursively traverses each element in the `preorder` and `inorder` arrays once, resulting in an O ( n ) O(n) O ( n ) runtime.

**Space complexity:** The space complexity is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is n n n. The hash map `inorder_indexes_map` also takes up O ( n ) O(n) O ( n ) space.
