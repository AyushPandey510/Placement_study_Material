---
title: "Insert And Search Words With Wildcards"
course: "DSA"
topic: "Tries"
source: "/home/ayush/OOD-Design-Principles/DSA/Tries/Insert and Search Words with Wildcards.html"
---
Design and implement a data structure that supports the following operations:

- `insert(word: str) -> None`: Inserts a word into the data structure.
- `search(word: str) -> bool`: Returns true if a word exists in the data structure and false if not. The word may contain **wildcards** (`'.'`) that can represent any letter.

#### Example:

```python
Input: [
  insert('band'),
  insert('rat'),
  search('ra.'),
  search('b..'),
  insert('ran'),
  search('.an')
]
Output: [True, False, True]
```

Explanation:

```python
insert("band") # data structure has: "band"
insert("rat")   # data structure has: "band" and "rat"
search("ra.")   # "ra." matches "rat": return True
search("b..")   # no three-letter word starting with ‘b' in the
               # data structure: return False
insert("ran")  # data structure has: "band", "rat", and "ran"
search(".an")  # ".an" matches "ran": return True
```

#### Constraints:

- Words will only contain lowercase English letters and `'.'` characters.

## Intuition

The requirements of this data structure closely resemble those of a **trie**, as it needs to facilitate the insertion and search of words. What makes this problem unique is the requirement to support wildcards ('.') in searches. Let’s learn how we would need to modify our trie functions to support wildcards.

**Inserting a word into the trie** The requirements for insertion in this problem match the requirements in a traditional trie. So, let’s use the same implementation of insert as in the *Design a Trie* problem.

**Searching with wildcards** What does it mean to encounter a wildcard? Consider the following trie:

![Image represents a Trie data structure, a tree-like data structure used for storing strings.  The topmost node is labeled 'root' in light gray, representing the root of the Trie.  From the root, two branches extend downwards. The left branch connects to a node labeled 'b', which connects to 'a', which further connects to 'n', and finally to 'd'.  A dashed line and the text 'is_word = True' are associated with the 'd' node, indicating that 'band' is a valid word in the Trie. The right branch from the root connects to a node labeled 'r', which connects to 'a'.  From 'a', two branches extend to nodes labeled 't' and 'n'.  Both 't' and 'n' have dashed lines and the text 'is_word = True' associated with them, indicating that 'rant' and 'ran' are valid words.  The connections between nodes represent prefixes of words, with each node representing a character.  The 'is_word' flag indicates whether a path from the root to that node forms a complete valid word.](/assets/images/dsa/tries/b983431478766d92.webp)

If we perform a search for "ra.", we know we can traverse down nodes 'r' and 'a' until we reach the wildcard character. Since the last letter is a wildcard, it could represent any letter. So, as long as there exists a node branching out from 'a' that represents the end of a word (i.e., has `is_word == True`), the word "ra." exists in the trie. In this case, both nodes 't' and 'n' meet the requirements of this wildcard:

![Image represents a Trie data structure illustrating a search operation for the string 'ra.'.  The topmost node is labeled 'root' (in gray) and serves as the starting point.  A gray arrow points from the root to a green node labeled 'r', indicating the search begins with 'r'.  From 'r', a downward gray arrow points to another green node 'a', showing the search progresses to 'a'.  The node 'a' has two children: green nodes 't' and 'n'.  Dashed lines connect 't' and 'n' to labels 'is_word = True', indicating that both 't' and 'n' are valid words in the Trie.  Separately, a branch from the root node leads to a chain of nodes labeled 'b', 'a', 'n', and 'd'.  A dashed line connects 'd' to the label 'is_word = True', signifying 'd' as a valid word. The search for 'ra.' stops at the 'a' node because there is no subsequent '.' node.  The overall structure shows how the Trie efficiently searches for prefixes and words.](/assets/images/dsa/tries/d38fd73caf06c0ca.webp)

Now, let’s say we perform a search for “.an”. Since the first character is a wildcard, we need to cover all branches starting from every node representing the first character in the trie. This means starting a search from each child node of the root. We can do this by recursively calling the search function on these nodes, passing in the substring “an” because this substring contains the remaining characters to be searched for.

![Image represents a Trie data structure visualizing a search for the string '.an'.  A grey circle labeled 'root' sits at the top, branching down with two grey arrows to green circles labeled 'b' and 'r'.  The 'b' branch further descends with a downward arrow to a green 'a', then to a yellow 'n', and finally to a black 'd'.  The 'r' branch leads to a green 'a', which then branches to a red 't' (marked with an 'x' indicating failure) and a green 'n'.  Dashed lines connect the leaf nodes ('d', 't', and 'n') to text indicating whether they represent complete words: 'd' shows 'is_word = True', 't' shows 'is_word = True', and 'n' shows 'is_word = True' for the rightmost 'n' and 'is_word = False' for the 'n' under 'a' and 'b'.  The arrows depict the traversal path during the search for '.an', showing the algorithm's progression through the Trie to find matching words.](/assets/images/dsa/tries/0cfbcdd9fcd55e54.webp)

Notice the nodes forming the string "ban" will not satisfy the search term because node 'n' does not mark the end of a word.

So, at any point in the search, we need to handle two scenarios:

1. When we encounter a letter, we proceed to the child of the current node that corresponds with this letter in the trie.
2. When we encounter a wildcard, we explore all child nodes, as the '.' may match any character. We can perform a recursive call for each child node to search for the remainder of the word.

This strategy for handling wildcards allows us to search every possible branch for a word that matches the search term. As soon as we find one branch that represents a word matching the search term, we return true.

## Implementation

In this implementation, we use a helper function (`search_helper`) for searching because we need to pass in two extra parameters at each recursive call:

1. An index that defines the start of the remaining substring that needs to be searched. We pass in an index instead because passing in the substring itself would necessitate creating that substring, which would take linear time for each recursive call.
2. The TrieNode we’re starting the search from. This ensures we don’t restart each recursive call from the root node.

```python
class InsertAndSearchWordsWithWildcards:
   def __init__(self):
       self.root = TrieNode()
    
   def insert(self, word: str) -> None:
       node = self.root
       for c in word:
           if c not in node.children:
               node.children[c] = TrieNode()
           node = node.children[c]
       node.is_word = True
    
   def search(self, word: str) -> bool:
       # Start searching from the root of the trie.
       return self.search_helper(0, word, self.root)
    
   def search_helper(self, word_index: int, word: str, node: TrieNode) -> bool:
       for i in range(word_index, len(word)):
           c = word[i]
           # If a wildcard character is encountered, recursively search for the rest
           # of the word from each child node.
           if c == '.':
               for child in node.children.values():
                   # If a match is found, return true.
                   if self.search_helper(i + 1, word, child):
                       return True
               return False
           elif c in node.children:
               node = node.children[c]
           else:
               return False
       # After processing the last character, return true if we've reached the end
       # of a word.
       return node.is_word
```

### Complexity Analysis

**Time complexity:**

- The time complexity of `insert` is O ( k ) O(k) O ( k ), where k k k denotes the length of the word being inserted. This is because we traverse through or insert up to k k k nodes into the trie in each iteration.
- The time complexity of `search` is: O ( k ) O(k) O ( k ) when word contains no wildcards because we search through at most k k k characters in the trie. O ( 26 k ) O(26k) O ( 26 k ) in the worst case, when word contains only wildcards. For each wildcard, we potentially need to explore up to 26 different characters (one for each lowercase English letter). With k k k wildcards, approximately 26 k 26k 26 k recursive calls are made.

- O ( k ) O(k) O ( k ) when word contains no wildcards because we search through at most k k k characters in the trie.
- O ( 26 k ) O(26k) O ( 26 k ) in the worst case, when word contains only wildcards. For each wildcard, we potentially need to explore up to 26 different characters (one for each lowercase English letter). With k k k wildcards, approximately 26 k 26k 26 k recursive calls are made.

**Space complexity:**

- The space complexity of `insert` is O ( k ) O(k) O ( k ) because in the worst case, the inserted word doesn’t share a prefix with words already in the trie. In this case, k k k new nodes are created.
- The space complexity of `search` is: O ( 1 ) O(1) O ( 1 ) when word contains no wildcards. O ( k ) O(k) O ( k ) in the worst case when word contains only wildcards due to the space taken up by the recursive call stack, which can grow up to k k k in size.

- O ( 1 ) O(1) O ( 1 ) when word contains no wildcards.
- O ( k ) O(k) O ( k ) in the worst case when word contains only wildcards due to the space taken up by the recursive call stack, which can grow up to k k k in size.
