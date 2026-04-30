---
title: "Serialize And Deserialize A Binary Tree"
course: "DSA"
topic: "Trees"
source: "/home/ayush/OOD-Design-Principles/DSA/Trees/Serialize and Deserialize a Binary Tree.html"
---
Write a function to **serialize** a binary tree into a string, and another function to **deserialize** that string back into the original binary tree structure.

![Image represents a serialization and deserialization process of a tree data structure.  The image shows two identical binary trees, each with a root node labeled '5'.  The left subtree of the root contains nodes '9', '2', and '11', where '2' is a child of '9', and '11' is a child of '2'. The right subtree contains nodes '3', '4', '7', and '6', where '4' and '7' are children of '3', and '6' is a child of '4'.  An arrow labeled `serialize` points from the first tree to the string `serialized_string`, representing the process of converting the tree into a string representation. Another arrow labeled `deserialize` points from `serialized_string` to the second tree, illustrating the reconstruction of the tree from its string representation.  Both trees are structurally identical, demonstrating the successful serialization and deserialization of the tree data.](/assets/images/dsa/trees/4b09f6e35a4bfa7e.webp)

## Intuition

The primary challenge of this problem lies in how we serialize the tree into a string since this will determine if it’s possible to reconstruct the tree using this string alone.

Let's first decide on a traversal strategy because the method we use to serialize the tree will impact how we deserialize the string. Two options:

- Use BFS to serialize the tree level by level.
- Use DFS. In this case, we’d need to choose between inorder, preorder, and postorder traversal.

There’s flexibility in choosing the traversal algorithm because serializing with a specific traversal method allows us to rebuild (deserialize) the tree using the same traversal algorithm.

**Serialization** An important piece of information needed in our serialized string is the node values. In addition, we’ll need to **ensure we can identify the root node's value**, since this is the first node to create when we deserialize the string.

As such, a traversal algorithm like preorder traversal is a good choice because it processes the root node first, then the left subtree, and finally the right subtree. This ensures the first value in our serialized string is the root node's value.

So, let’s try serializing the following binary tree using preorder traversal, separating each node with a comma:

![Image represents a binary tree on the left, undergoing a preorder serialization process, resulting in a serialized string on the right. The tree's root node, labeled '5', connects to two child nodes: '9' on the left and '3' on the right. Node '9' further connects to '2', which in turn connects to '11'. Node '3' connects to '4' and '7'. Node '4' connects to '6'.  A horizontal arrow labeled 'preorder serialization' points from the tree to a string '5,9,2,11,3,4,6,7', representing the preorder traversal of the tree (root, left subtree, right subtree).  Each comma-separated number in the string corresponds to a node visited in the preorder traversal sequence.](/assets/images/dsa/trees/c4c3ccb189231ecd.webp)

The issue with this serialization is that it doesn't guarantee we can reconstruct the exact original tree from its serialized string representation. This is because the string could represent multiple different trees, which means preorder deserialization could result in the creation of an invalid tree:

![Image represents three different binary search trees, each rooted at the number 5, generated from the input sequence '5,9,2,11,3,4,6,7'.  A curved gray arrow points from the input sequence to each of the three root nodes (5), each marked with a red 'X'. Each tree visually depicts a different possible structure resulting from variations in the order of insertion of the numbers into the tree.  The numbers in the sequence are arranged as nodes in the trees, with each node having at most two children (left and right).  The left child is always smaller than the parent node, and the right child is always larger.  The differences between the three trees illustrate the non-uniqueness of binary search trees constructed from the same input sequence, depending on the insertion order.](/assets/images/dsa/trees/62e427fa31078b56.webp)

This is because the string is missing crucial information: **null child nodes**. For instance, after placing the root node with a value of 5 in the above example, we don't yet know where to place the node of value 9, which is the next value in the string. That is, we can't determine whether node 9 should be the left or right child of node 5:

![Image represents two simple tree structures separated by the word 'OR'.  Both trees have a root node containing the number '5'. The left tree has a single child node connected to the root with a solid black line; this child node contains the number '9'. The right tree also has a single child node containing '9', connected to the root with a solid black line.  Between the two trees, and below the root nodes, are two dashed-line circles, each containing the text 'null' in light gray.  The left tree's root node is connected to one of the 'null' nodes with a light gray line, and the right tree's root node is connected to the other 'null' node with a light gray line. The overall image likely illustrates a concept of optional or alternative branches in a data structure, where the 'null' nodes represent the absence of a connection or a specific value.](/assets/images/dsa/trees/4832db07d2599c91.webp)

If the string indicates where the null child nodes are, we can correctly deserialize the tree because we have a complete representation of the tree’s structure. Let's use the character '#' to represent a null node:

![Image represents a binary tree undergoing preorder serialization.  The tree's root node, labeled '5', connects to two child nodes: '9' on the left and '3' on the right. Node '9' further connects to '2' (left) and a null node (right), while '2' connects to '11' (left) and another null node (right).  '11' has two null children. Node '3' connects to '4' (left) and '7' (right). Node '4' connects to '6' (right) and a null node (left), and '6' has two null children. Node '7' has two null children. All null nodes are represented by circles with the text 'null' inside, displayed in light gray. A solid arrow labeled 'preorder serialization' points from the tree to a string representation: '5,9,2,11,#,#,#,#,3,4,#,6,#,#,7,#,#'. This string represents the tree's preorder traversal, where each node's value is followed by '#' representing null children.  The order reflects the preorder traversal algorithm: root, left subtree, right subtree, recursively.](/assets/images/dsa/trees/a040a22caa2c548f.webp)

**Deserialization** To deserialize a string created with preorder traversal, we also need to use preorder traversal to reconstruct the tree.

The first step is to split the string using the comma delimiter, so each node value and ‘#’ is in a list:

![Image represents a data transformation process illustrating the 'split' operation.  At the top, a string '5,9,2,11,#,#,#,#,3,4,#,6,#,#,7,#,#' is shown.  A downward-pointing arrow labeled 'split' connects this string to a list-like structure below. This list contains the same elements as the string, but arranged in a vertical array within square brackets `[]`. Each element from the original string is now on a separate line within the list.  The '#' characters, representing null or placeholder values, maintain their positions relative to the numbers.  The process visually demonstrates how a string of comma-separated values is split into individual elements, effectively transforming the string into a list or array data structure.](/assets/images/dsa/trees/3dd259d5c564acf9.webp)

The first value in the list is the root node of the tree:

![Image represents a simple diagram illustrating a data structure, possibly an array or list.  The word 'root' in orange text is positioned above a downward-pointing arrow, indicating the origin or starting point of the data structure. The arrow points to a bracketed sequence of numbers and hash symbols. The sequence begins with the numbers 5, 9, 2, and 11, followed by several hash symbols (#) representing null or placeholder values, then the numbers 3, 4, 6, and 7, with more hash symbols filling the remaining spaces within the brackets.  The numbers are presented in a linear fashion, suggesting a sequential arrangement.  There are no explicit connections between individual elements beyond their sequential order within the brackets.  The overall structure suggests a root node pointing to a linear data structure with some empty or unused slots.](/assets/images/dsa/trees/6e2dd624cc986ed8.webp)

Starting from this root value, recursively construct the tree node by node using preorder traversal. Each new node will be created with the next value in the list of preorder values. Whenever we encounter a ‘#’, we return null. The code snippet for this:

```python
# Helper function to construct the tree using preorder traversal.
def build_tree(values: List[str]) -> TreeNode:
    val = next(values)
    # Base case: '#' indicates a null node.
    if val == '#':
        return None
    # Use preorder traversal to create the current node first, then the left and
    # right subtrees.
    node = TreeNode(int(val))
    node.left = build_tree(values)
    node.right = build_tree(values)
    return node
```

**Follow-up: what if you must use a different traversal algorithm?** It’s possible to serialize and deserialize a binary tree using other traversal algorithms than preorder traversal. Let’s explore some alternatives.

Postorder Traversal: ‾ \underline{\text{Postorder Traversal:}} Postorder Traversal: ​

When we serialize the tree using postorder traversal, we get the following string (ignoring the null nodes in this discussion to focus on the node values and their order):

![Image represents a binary tree on the left, undergoing a postorder serialization process, resulting in a serialized string on the right. The tree's root node, labeled '5', connects to two child nodes: '9' on the left and '3' on the right. Node '9' further branches into '2' and '11', while node '3' connects to '4' and '7'. Node '4' has a child node '6', and node '7' has no children.  A horizontal arrow labeled 'postorder serialization' points from the tree to the resulting string '11,2,9,4,6,7,3,5'.  The string represents the postorder traversal of the tree (left subtree, right subtree, root), with each node's value separated by commas. An orange arrow points to the '5' in the string, labeled 'root', indicating its position as the root node in the original tree.](/assets/images/dsa/trees/610c188833cdbc4f.webp)

As we see, one big difference is that the root node will be the final value in the string, since postorder traversal processes the left subtree, then the right subtree, and finally the root node.

During deserialization, we’d build the tree by iterating through the node values from right to left instead of left to right, since the root value is at the right. In addition, we’d need to create each node’s right subtree before we create its left subtree, as we go through the string in reverse.

Inorder traversal: ‾ \underline{\text{Inorder traversal:}} Inorder traversal: ​

A lot more care needs to be taken when serializing a tree using inorder traversal. The main reason is that it’s unclear where the root node of the tree is in the string, and where the root node of each subtree is, as we can see below:

![Image represents a binary tree on the left undergoing inorder serialization, resulting in a string representation on the right. The tree's root node, labeled '5', connects to two child nodes: '9' on the left and '3' on the right.  Node '9' further branches into '2' and '11', while node '3' connects to '4' and '7'. Node '4' has a child node '6'.  A horizontal arrow labeled 'inorder serialization' points from the tree to a string '11,2,9,5,3,4,6,7'. This string represents the inorder traversal of the tree, meaning it lists the nodes in the order: left subtree, root, right subtree recursively.  A curved orange arrow points to the '5' within the string, labeled 'root', indicating its position as the root node in the original tree structure.](/assets/images/dsa/trees/e012c67a3069f5f2.webp)

This doesn’t make it impossible to use inorder traversal. It just means significantly more information needs to be provided in the serialized string to make deserialization possible. In particular, we need to include details about which value serves as the root node for each subtree as we iterate through them.

Breadth-first search (BFS): ‾ \underline{\text{Breadth-first search (BFS):}} Breadth-first search (BFS): ​

BFS starts processing each node from the root of the tree, and traverses through it level by level, and from left to right. Serializing the tree using BFS gives the following order of values:

![Image represents a tree data structure undergoing Breadth-First Search (BFS) serialization.  The left side shows a tree with node 5 as the root. Node 5 connects to nodes 9 and 3. Node 9 connects to node 2, which further connects to node 11. Node 3 connects to nodes 4 and 7, with node 4 connecting to node 6.  A horizontal arrow labeled 'BFS serialization' points from the tree to a string '5,9,3,2,4,7,11,6'. This string represents the serialized form of the tree, generated by traversing the tree level by level from left to right using BFS.  The number 5, highlighted in a peach-colored box, is explicitly labeled as the 'root' with an orange arrow pointing to it within the serialized string.  The entire process demonstrates how a tree structure can be converted into a linear representation using BFS.](/assets/images/dsa/trees/bc74334bc66bc1e9.webp)

Similarly to preorder traversal, we just need to follow the exact traversal order for reconstructing the tree when deserializing the string.

## Implementation

In the following implementation, we opt for preorder traversal for serialization and deserialization.

```python
from ds import TreeNode
    
def serialize(root: TreeNode) -> str:
    # Perform a preorder traversal to add node values to a list, then convert the
    # list to a string.
    serialized_list = []
    preorder_serialize(root, serialized_list)
    # Convert the list to a string and separate each value using a comma
    # delimiter.
    return ','.join(serialized_list)
    
# Helper function to perform serialization through preorder traversal.
def preorder_serialize(node, serialized_list) -> None:
    # Base case: mark null nodes as '#'.
    if node is None:
        serialized_list.append('#')
        return
    # Preorder traversal processes the current node first, then the left and right
    # children.
    serialized_list.append(str(node.val))
    preorder_serialize(node.left, serialized_list)
    preorder_serialize(node.right, serialized_list)
    
def deserialize(data: str) -> TreeNode:
    # Obtain the node values by splitting the string using the comma delimiter.
    node_values = iter(data.split(','))
    return build_tree(node_values)
    
# Helper function to construct the tree using preorder traversal.
def build_tree(values: List[str]) -> TreeNode:
    val = next(values)
    # Base case: '#' indicates a null node.
    if val == '#':
        return None
    # Use preorder traversal processes the current node first, then the left and
    # right children.
    node = TreeNode(int(val))
    node.left = build_tree(values)
    node.right = build_tree(values)
    return node
```

### Complexity Analysis

**Time complexity:** The time complexity of both serialize and deserialize is O ( n ) O(n) O ( n ), where n n n denotes the number of nodes in the tree. This is because we visit each of the n n n nodes in the binary tree exactly once during preorder traversal. The serialize function additionally converts the serialized list to a string, which also takes O ( n ) O(n) O ( n ) time.

**Space complexity:** The space complexity of both serialize and deserialize is O ( n ) O(n) O ( n ) due to the space taken up by the recursive call stack, which can grow as large as the height of the binary tree. The largest possible height of a binary tree is 𝑛.
