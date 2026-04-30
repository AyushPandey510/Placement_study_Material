---
title: "Design A Trie"
course: "DSA"
topic: "Tries"
source: "/home/ayush/OOD-Design-Principles/DSA/Tries/Design a Trie.html"
---
Design and implement a **trie** data structure that supports the following operations:

- `insert(word: str) -> None`: Inserts a word into the trie.
- `search(word: str) -> bool`: Returns true if a word exists in the trie, and false if not.
- `has_prefix(prefix: str) -> bool`: Returns true if the trie contains a word with the given prefix, and false if not.

#### Example:

```python
Input: [
  insert('top'),
  insert('bye'),
  has_prefix('to'),
  search('to'),
  insert('to'),
  search('to')
]
Output: [True, False, True]
```

Explanation:

```python
insert("top")    # trie has: "top"
insert("bye")    # trie has: "top" and "bye"
has_prefix("to") # prefix "to" exists in the string "top": return True
search("to")     # trie does not contain the word "to": return False
insert("to")     # trie has: "top", "bye", and "to"
search("to")     # trie contains the word "to": return True
```

### Constraints:

- The words and prefixes consist only of lowercase English letters.
- The length of each word and prefix is at least one character.

## Intuition

Let’s define a `TrieNode` using the same definition introduced in the introduction. In this implementation, the `is_word` attribute will be used to indicate whether a `TrieNode` marks the end of a word.

**Initializing the trie** To initialize the Trie, we define the **root TrieNode** in the constructor. All words inserted into the trie will branch out from this root node.

**Inserting a word into the trie** The insert function builds the trie word by word. What makes a trie useful is that it reduces redundancy by reusing existing nodes when possible. For example, if we insert “byte” when “bye” already exists in the trie, these two words should share the nodes that make up the prefix “by” to save space. This is an important point that will shape our implementation of this function.

To understand the insertion logic, let's walk through an example. Consider inserting the word "byte" into the trie below.

![Image represents a Trie data structure, a tree-like data structure used for storing strings.  The topmost node, colored light gray, is labeled 'root' and serves as the root of the Trie.  From the root, two branches extend downwards. The left branch leads to a node containing the letter 't', connected to a node with 'o', which is further connected to a node with 'p'.  The right branch leads to a node containing the letter 'b', connected to a node with 'y', which is further connected to a node with 'e'.  Each node representing a letter is a black circle. Dashed lines extend from the 'o', 'p', and 'e' nodes, each labeled 'is_word = True,' indicating that 'top' and 'bye' are valid words stored in this Trie. The connections between nodes represent the sequential arrangement of letters within words.  The structure visually demonstrates how the Trie efficiently stores and searches for words by traversing paths from the root.](/assets/images/dsa/tries/062e09913feee60f.webp)

We first check if 'b', the first letter of the string, exists as a child of the root node by querying the hash map containing its children. In this case, it does. So, move to node 'b':

![Image represents a Trie data structure illustrating the insertion of the word 'byte'.  The diagram shows a root node labeled 'root' (light gray) connected to two child nodes: 't' (black) and 'b' (orange).  The 't' node branches down to 'o' and then 'p', each labeled with 'is_word = True', indicating these letter combinations are valid words. The 'b' node connects to 'y' and then 'e', also labeled 'is_word = True'.  A dashed box to the right explains the insertion process:  ' 'b' is a child of the current node' and the code snippet `node = node.children['b']` shows how the current node is updated to point to the 'b' node during insertion.  A rectangular box labeled 'node' points to the root node initially, indicating the starting point of the insertion process.  The lines connecting the nodes represent parent-child relationships within the Trie.](/assets/images/dsa/tries/22d906bf76657dfe.webp)

Now consider the second letter, ‘y’. Similarly, node 'y' exists as a child of node 'b', so let's move to node 'y':

![Image represents a tree-like data structure illustrating a coding pattern.  The topmost node, labeled 'root' in light gray, branches into two nodes: 't' and 'b'.  The 't' node connects downwards to 'o', which further connects to 'p'.  Dashed lines connect 'o' and 'p' to the text 'is_word = True', indicating a property associated with these nodes.  Similarly, the 'b' node connects to a node 'y' highlighted in orange, which then connects to 'e'.  'e' also has a dashed line connecting it to 'is_word = True'. A rectangular box to the right shows the code snippet `'y' is a child of the current node  => node = node.children['y']`, explaining how to access the child node 'y' from a parent node (represented by the variable 'node').  A smaller rectangular box labeled 'node' points to the 'b' node, illustrating the current node in the example.  The overall structure depicts a Trie or prefix tree, commonly used in data structures and algorithms, particularly for efficient string searching.](/assets/images/dsa/tries/3e416c3fa044bf2b.webp)

Now consider the next letter, ‘t’. Since node 't' doesn't exist as a child of node 'y', we need to create it and add it to node 'y’s children hash map. Then, we can move to this newly created node 't':

![Image represents a Trie data structure visualization alongside code snippets illustrating its modification.  The Trie is depicted as a tree with a light-grey root node labeled 'root'.  Two branches extend from the root, leading to nodes labeled 't' and 'b' respectively. The 't' node connects to an 'o' node, which in turn connects to a 'p' node.  Both 'o' and 'p' nodes have dashed lines indicating a boolean attribute 'is_word = True'. The 'b' node connects to a 'y' node, which further connects to an 'e' node. The 'e' node also has a dashed line indicating 'is_word = True'. A dashed line connects the 'y' node to a new, orange-colored 't' node, representing a node being added. A rectangular box to the right displays code comments explaining that 't' is not a child of the current node ('y'), followed by two lines of code: `node.children['t'] = TrieNode()` which creates a new TrieNode for 't', and `node = node.children['t']` which updates the current node pointer to the newly created 't' node.  A separate rectangular box labeled 'node' points to the 'y' node, indicating the current node before the addition of the 't' node.](/assets/images/dsa/tries/f4f3cd87d3d1fd68.webp)

The last letter is ‘e’, which doesn’t exist as a child of node ‘t’. So, let’s create node ‘e’ and add it to node ‘t’s children:

![Image represents a Trie data structure illustrating the insertion of a new node.  The Trie is visualized as a tree with a light gray root node labeled 'root'.  From the root, two branches extend to nodes labeled 't' and 'b'. The 't' node connects to an 'o' node, which in turn connects to a 'p' node.  Both 'o' and 'p' nodes have a dashed line and label 'is_word = True', indicating they represent complete words. The 'b' node connects to a 'y' node, which further branches to 'e' and 't' nodes. The 'e' node has 'is_word = True'. A dashed line connects the 't' node to a new, orange-colored 'e' node, labeled 'node', signifying the addition of this node. A separate box explains the process:  ''e' is not a child of the current node' followed by two lines of code: '→ node.children['e'] = TrieNode()' and '→ <font color='orange'>node</font> = node.children['e']', showing how a new TrieNode is created and assigned to the 'e' child of the current node.  The arrows indicate the flow of information and the creation of a new node within the Trie.](/assets/images/dsa/tries/acb93d790f333dc5.webp)

Now that we've reached the end of the word, we should set the `is_word` attribute of node 'e' to true, indicating that it marks the end of a word.

![Image represents a Trie data structure, a tree-like data structure used for storing strings.  The topmost node is labeled 'root' in gray, and branches down to two nodes, 't' and 'b'.  The 't' node connects to 'o', which connects to 'p'.  Each of 'o' and 'p' has a dashed box next to it indicating `is_word = True`, signifying that 'top' is a valid word in the Trie. Similarly, 'b' connects to 'y', which further branches to 'e' and 't'.  Node 'e' has `is_word = True` indicating 'bye' is a valid word.  Node 't' connects to another 'e' node highlighted in orange, also marked with `is_word = True`, suggesting 'byte' is a valid word. A separate box displays `node.is_word = True`, illustrating a general condition for a node representing a complete word. Finally, a gray box labeled 'node' points to the orange 'e' node, demonstrating a potential traversal or search operation within the Trie.](/assets/images/dsa/tries/3a9517ab086bfa21.webp)

**Searching for a word** Searching for a word involves the same strategy as insertion, where we move node by node down the trie. The two main differences are:

1. If a node corresponding to the current character in the word isn't found at any point, we return false because this would indicate the word doesn't exist in the trie.
2. After traversing all characters of the search term, we return true only if the final node's is_word attribute is true.

![Image represents a Trie data structure illustrating a search operation for the word 'to'.  The Trie is a tree-like structure where each node represents a character.  The root node, labeled 'root', is connected to a 't' node. This 't' node connects to an 'o' node.  Both 'o' and 'p' nodes have a property `is_word = True` indicating they represent complete words.  A dashed orange line highlights the path traversed during the search for 'to'.  An arrow labeled 'node' points to the 'o' node, showing the starting point of the search.  The 'o' node's `is_word` property is also shown as `True`.  A separate branch from the root node leads to 'b', 'y', 'e', and another 't' node, which further connects to an 'e' node; this 'e' node also has `is_word = True`. A gray box with dashed lines displays the code snippet `return node.is_word`, indicating that the search function returns the boolean value of the `is_word` property of the final node reached.](/assets/images/dsa/tries/1e32df5ddf0dc796.webp)

**Searching for a prefix** The logic for finding a prefix is nearly identical to the logic discussed above for the search function. The only difference is after successfully traversing all characters in our search term, we can just return true without checking the final node's `is_word` attribute, as a prefix doesn’t need to end at the end of a word.

![Image represents a Trie data structure illustrating a `has_prefix('by')` function.  The Trie is a tree-like structure where nodes represent characters and edges represent transitions between characters. The root node is labeled 'root' and is enclosed in a dashed orange oval.  A gray line connects the root to a node labeled 't,' which connects to a node labeled 'o,' which in turn connects to a node labeled 'p.'  Dashed lines and the text 'is_word = True' indicate that 'op' and 'p' are valid words in the Trie.  Separately, a gray line connects the root to a node labeled 'b,' which connects to a node labeled 'y.' This 'by' node is also enclosed in a dashed orange oval.  A right-pointing arrow labeled 'node' points to this 'by' node.  From 'y,' two branches extend, one to a node 'e' and another to a node 't,' which further connects to a node 'e.'  The nodes 'e' and 'e' also have dashed lines and 'is_word = True' indicating they are valid words.  A dashed-line box to the upper right displays 'return True,' indicating that the prefix 'by' exists within the Trie.](/assets/images/dsa/tries/0d1afb4323b42fe1.webp)

## Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False
```

```python
class Trie:
   def __init__(self):
       self.root = TrieNode()
    
   def insert(self, word: str) -> None:
       node = self.root
       for c in word:
           # For each character in the word, if it’s not a child of the current node,
           # create a new TrieNode for that character.
           if c not in node.children:
               node.children[c] = TrieNode()
           node = node.children[c]
       # Mark the last node as the end of a word.
       node.is_word = True
    
   def search(self, word: str) -> bool:
       node = self.root
       for c in word:
           # For each character in the word, if it’s not a child of the current node,
           # the word doesn't exist in the Trie.
           if c not in node.children:
               return False
           node = node.children[c]
       # Return whether the current node is marked as the end of the word.
       return node.is_word
    
   def has_prefix(self, prefix: str) -> bool:
       node = self.root
       for c in prefix:
           if c not in node.children:
               return False
           node = node.children[c]
       # Once we’ve traversed the nodes corresponding to each character in the
       # prefix, return True.
       return True
```

### Complexity Analysis

**Time complexity:**

- The time complexity of `insert` is O ( k ) O(k) O ( k ), where k k k is the length of the word being inserted. This is because we traverse through or insert up to k k k nodes into the trie in each iteration.
- The time complexity of `search` and `has_prefix` is O ( k ) O(k) O ( k ) because we search through at most k k k characters in the trie.

**Space complexity:**

- The space complexity of `insert` is O ( k ) O(k) O ( k ) because in the worst case, the inserted word doesn’t share any prefix with words already in the trie. In this case, k k k new nodes are created.
- The space complexity of `search` and `has_prefix` is O ( 1 ) O(1) O ( 1 ) because no additional space is used to traverse the search term in the trie.
