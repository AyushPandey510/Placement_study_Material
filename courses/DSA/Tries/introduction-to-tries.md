---
title: "Introduction To Tries"
course: "DSA"
topic: "Tries"
source: "/home/ayush/OOD-Design-Principles/DSA/Tries/Introduction to Tries.html"
---
## Intuition

Tries, also known as prefix trees, are specialized tree-like data structures that efficiently store strings by taking advantage of shared prefixes.

To understand how a trie works, consider the string "internet". We can store this string as a sequence of connected nodes, where each node represents a character in the string:

![Image represents a directed graph illustrating a sequence of data transformations or processing steps.  The graph consists of eight circular nodes, each containing a single lowercase letter: 'i', 'n', 't', 'e', 'r', 'n', 'e', and 't'.  These nodes are connected by directed edges (arrows) indicating the flow of data. The data flows unidirectionally from 'i' to 'n', then to 't', then to 'e', then to 'r', then back to 'n', then to 'e', and finally to 't'.  Each letter likely represents a stage in a process, with the arrows showing the order of execution or data transformation from one stage to the next.  The repetition of 'n' and 'e' suggests potential loops or iterative steps within the overall process. The 'i' likely represents the initial input, and 't' the final output.](/assets/images/dsa/tries/f4fe3c216f38ebd8.webp)

Now, let's say we also want to store the word "interface". Instead of creating a separate sequence of nodes, we take advantage of their common prefix "inter". Both words can share the nodes for "inter", and the remainder of "interface" can branch out from the node 'r':

![Image represents a directed acyclic graph illustrating a sequence of data processing or workflow.  The graph consists of several circular nodes, each containing a single lowercase letter, representing stages or steps in the process.  Arrows indicate the direction of data flow between these stages. The sequence begins with node 'i' which flows into 'n', then 't', and finally 'e'.  From 'e', the flow diverges. One branch connects to node 'r', which then splits into two further branches. The upper branch leads to 'n', then 'e', and finally 't'. The lower branch from 'r' connects to 'f', then 'a', 'c', and finally 'e'.  Therefore, the graph shows two distinct parallel processing paths originating from 'r', both ultimately contributing to the final 'e' node, while the initial sequence 'i', 'n', 't', 'e' acts as a precursor to the branching point at 'r'.](/assets/images/dsa/tries/19d8d705ea71b1f4.webp)

This is, in essence, how a trie works: by allowing words to reuse existing nodes based on shared prefixes, it efficiently stores strings in a way that minimizes redundancy.

**TrieNode** There are two attributes each `TrieNode` should have.

1. Children: Each `TrieNode` has a data structure to store references to its child nodes. A **hash map** is typically used for this, with a character as the key and its corresponding child node as the value.

![Image represents a tree-like data structure visualization alongside a tabular representation of its children.  The left side shows a tree with a central, empty, circular node connected to three child nodes labeled 'a', 'b', and 'c' respectively, each depicted as a filled, orange-toned circle. An arrow points from a rectangular box labeled 'node' to the central node, suggesting that this box represents the parent node. The right side displays a table titled 'node.children,' with two columns: 'char' listing characters 'a', 'b', and 'c', and 'child node' visually mirroring the child nodes from the tree diagram, using the same orange-toned circles containing the corresponding characters.  The table illustrates the relationship between the parent node and its children, showing that the parent node's children are represented by the characters 'a', 'b', and 'c', each associated with a corresponding child node.](/assets/images/dsa/tries/5db03f7157f96110.webp)

Sometimes, an array is used instead of a hash map if the possible characters of words in the trie are limited and known in advance. For example, if they only contain lowercase English letters, an array of size 26 can be used, instead.

2. End of word indicator: Each `TrieNode` needs an attribute to indicate whether it marks the end of a word. This can be done in two ways:

- A boolean attribute (`is_word`) to confirm if the node is the end of a word.
- A string variable (`word`) that stores the word itself at the node. This is usually used if we also want to know the specific word that ends at this node.

**Trie structure** This is an example of a trie that’s been populated by inserting the words "internet", "interface", "byte", "bytes", "dog", and "dig". Every word represented by the trie branches out of a **root TrieNode**, which does not represent any character.

![Image represents a Trie data structure, a tree-like data structure used for storing a dynamic set of strings.  The topmost node is labeled 'root,' and from it branch three main paths. Each path consists of nodes, each node containing a single character.  The paths represent different strings.  For example, one path spells 'inter,' another 'bytes,' and a third contains 'dog' and 'dig.' Dashed lines connect certain leaf nodes (terminal nodes) to labels indicating 'is_word = True,' signifying that the string formed by the path to that node is a valid word in the Trie's vocabulary.  The arrangement shows how the Trie efficiently stores and searches for words by sharing prefixes.  The characters in the nodes are arranged sequentially along each path to form words, and the 'is_word' label indicates whether the word represented by the path is present in the dataset.](/assets/images/dsa/tries/d4da066bacabf412.webp)

Below is the time complexity breakdown for trie operations involving a word of length k k k:

The implementation details of most of these functions are discussed in detail in the *Design a Trie* problem.

**When to use tries** The primary use of a trie is to handle efficient prefix searches. If an interview problem asks you to find all strings that share a common prefix, a trie is likely the ideal data structure. Tries are also useful for word validation, allowing us to quickly verify the existence of words within a set of strings. They also help optimize data storage by reducing redundancy through shared prefixes among strings.

## Real-world Example

**Autocomplete:** When you start typing a word, some systems use a trie to quickly suggest possible completions. Each node in the trie represents a character, and as you type, the system traverses the trie based on the input characters. This allows the system to efficiently retrieve all possible words or phrases that start with the entered prefix, enabling fast autocomplete suggestions.

## Chapter Outline

![Image represents a hierarchical diagram illustrating the concept of Tries in coding patterns.  At the top, a rounded rectangle labeled 'Tries' acts as the parent node.  From this node, two dashed lines descend, each pointing to a separate child node represented by rounded rectangles with a light gray fill. The left child node is labeled 'Implementation' and contains two bullet points: 'Design a Trie' and 'Insert and Search Words with Wildcards'. The right child node is labeled 'Traversal' and contains a single bullet point: 'Find All Words on a Board'.  The diagram visually depicts that the concept of Tries branches into two main aspects:  the implementation details (designing and using a Trie data structure for insertion and search, including handling wildcards) and the traversal aspect (specifically, using Tries to find all words on a board, suggesting a word search application).](/assets/images/dsa/tries/0503461a5f7932b3.webp)
