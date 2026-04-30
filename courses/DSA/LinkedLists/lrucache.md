---
title: "LRUCache"
course: "DSA"
topic: "LinkedLists"
source: "/home/ayush/OOD-Design-Principles/DSA/LinkedLists/LRUCache___Technical_Interview_Prep.html"
---
Design and implement a data structure for the Least Recently Used (LRU) cache that supports the following operations:

- `LRUCache(capacity: int)`: Initialize an LRU cache with the specified capacity.
- `get(key: int) -> int`: Return the value associated with a key. Return -1 if the key doesn't exist.
- `put(key: int, value: int) -> None`: Add a key and its value to the cache. If adding the key would result in the cache exceeding its size capacity, **evict the least recently used element**. If the key already exists in the cache, update its value.

#### Example:

```python
Input: [
  put(1, 100),
  put(2, 250),
  get(2),
  put(4, 300),
  put(3, 200),
  get(4),
  get(1),
],
  capacity = 3
Output: [250, 300, -1]
```

Explanation:

```python
put(1, 100)  # cache is[1: 100]
put(2, 250)  # cache is[1: 100, 2: 250]
get(2)       # return 250
put(4, 300)  # cache is[1: 100, 2: 250, 4: 300]t
put(3, 200)  # cache is[2: 250, 4: 300, 3: 200]
get(4)       # return 300
get(1)       # key 1 was evicted when adding key 3 due to the capacity
             # limit: return -1
```

#### Constraints:

- All keys and values are positive integers.
- The cache capacity is positive.

## Intuition

When presented with a design problem, the first steps usually involve understanding the problem and deciding which data structures to use. Let's start by understanding how an LRU cache works at a high level.

Consider the LRU cache described below. It currently holds 3 elements and has reached full capacity. Assume that in this representation, the key-value pairs are ordered from the least recently used (left) to the most recently used (right):

![Image represents a visual depiction of a Least Recently Used (LRU) cache with a capacity of 3.  The main component is a rectangular box representing the cache, divided into three smaller rectangular cells. Each cell contains a pair of numbers; the first represents a key (1, 2, or 4), and the second represents an associated value (100, 250, or 300).  The cells are arranged horizontally within the larger cache box, with the cell containing '1 | 100' on the left, representing the least recently used item, and the cell containing '4 | 300' on the right, representing the most recently used item.  An arrow extends from the left edge of the cache box to the right, labeled 'least recently used' on the left and 'most recently used' on the right, explicitly indicating the order of usage within the cache.  The text 'capacity = 3' above the cache box specifies the maximum number of key-value pairs the cache can hold.](/assets/images/dsa/linkedlists/7e087a843983ba29.webp)

Let's try putting a new key-value pair into the cache:

![The image represents a data structure, likely a fixed-size array or buffer, with a capacity of 3.  On the left, an input element, depicted as an orange rectangle labeled 'put (3 | 200)', shows a key-value pair where '3' is the key and '200' is the value. A rightward arrow indicates the insertion of this key-value pair into the data structure. The data structure itself is represented by a light gray rectangle labeled 'capacity = 3' at the top. Inside this rectangle are three smaller, similarly styled rectangles, each representing an element within the structure. These elements contain key-value pairs: the first is '1 | 100', the second is '2 | 250', and the third is '4 | 300'.  A horizontal arrow beneath the data structure suggests the possibility of further operations or data flow from the structure. The overall diagram illustrates the process of adding a new key-value pair to a pre-existing data structure with a limited capacity.](/assets/images/dsa/linkedlists/3be9260b90ec4b04.webp)

This new pair would effectively be the most recent in the cache, so we know it should be added at the most-recently-used end of the cache. Since the cache is currently at maximum capacity, we need to make room for the new pair by first evicting the least recently used pair:

![Image represents a visual depiction of a cache eviction and insertion process.  A light gray rectangular box, representing a cache, contains three key-value pairs: '2 | 250', '4 | 300', and '3 | 200', each enclosed in a smaller rectangle.  The pair '3 | 200' is highlighted with an orange border, indicating it's a newly added element. To the left, a gray rectangle containing '1 | 100' is marked with a large red 'X', signifying its removal from the cache. A curved gray arrow connects the text '1. evict the least recently used pair' to the '1 | 100' pair, illustrating the eviction process.  A similar curved gray arrow connects the text '2. add new pair' to the '3 | 200' pair, showing the addition of a new element. A horizontal arrow beneath the cache box indicates the potential for further operations or a continuous cycle of eviction and insertion.](/assets/images/dsa/linkedlists/0f0587b95137da0f.webp)

From this high-level overview, we can summarize operations we need to implement the `put` function:

1. Remove a key-value pair from the least recently used end of the cache.
2. Add a key-value pair to the most recently used end of the cache.

Now, let's try retrieving a value from this example cache. If we perform `get(2)`, we expect it to return 250. Accessing this pair would effectively make it the most recently used pair. So, we should move it to the most recently used end of the cache:

![Image represents a data structure, likely a Least Recently Used (LRU) cache, illustrating a `get(2)` operation.  A light gray rectangular box encloses three smaller boxes, each representing a cache entry.  These entries contain key-value pairs; the first box, highlighted in orange, shows '2 | 250,' indicating key '2' and value '250'. The other boxes show '4 | 300' and '3 | 200'. An arrow labeled 'get(2)' points to the cache.  A downward arrow from the right side of the container indicates retrieval.  A line connects the top of the orange box to a label above reading 'move to most recently used end,' illustrating that after retrieving the entry with key '2', it's moved to the end of the cache, maintaining the LRU order. A horizontal arrow at the bottom of the container shows the data structure after the operation, with the '2 | 250' entry now at the right end.](/assets/images/dsa/linkedlists/f37c4ff7b77bd2ef.webp)

![Image represents a data structure, possibly an array or list, containing three key-value pairs.  Each pair is depicted as a rectangular box with a number (key) separated by a vertical line from a larger number (value). The boxes are arranged horizontally within a larger, light-grey container, indicated by a dashed border.  The first box shows '4 | 300', the second '3 | 200', and the third, highlighted with an orange border, shows '2 | 250'. A solid arrow extends from the right side of the container to a dashed-bordered box labeled 'return 250', indicating that the value associated with the key '2' (250) is being returned as the output of some operation or function.  The visual suggests a process of selecting or accessing a specific element (the one with key '2') from the data structure.](/assets/images/dsa/linkedlists/348f9a5a04b05dce.webp)

From this example, we identified two key operations for the `get` function:

1. Move a key-value pair to the most recent end of the cache.
2. Access a value using its key.

We’ve now narrowed the design down to the four main operations listed above. These will help us identify which data structures we can employ to design the LRU cache.

**Choosing data structures** Operations 1 and 2 ‾ \underline{\text{Operations 1 and 2}} Operations 1 and 2 ​

The first two operations involve adding and removing key-value pairs. Specifically, we need the ability to remove a key-value pair from one end of a data structure (representing the least recently used end) and add a key-value pair to the other.

Which data structure allows us to efficiently add or remove an element from it? A suitable data structure for these operations is a linked list, particularly because we can add and remove a node in constant time if we have a reference to that node. But should we use a singly or doubly linked list?

Singly vs. doubly linked list ‾ \underline{\text{Singly vs. doubly linked list}} Singly vs. doubly linked list ​

Adding or removing a node from the head of a linked list takes O ( 1 ) O(1) O ( 1 ) time, whether it’s a singly or doubly linked list. However, removing the tail node from a singly linked list takes O ( n ) O(n) O ( n ) time, even with a reference to the tail, because we need to traverse the list to access the node before the tail. In contrast, a doubly linked list allows O ( 1 ) O(1) O ( 1 ) removal of the tail because each node has a reference to its previous node, enabling direct access without traversal. So, let’s choose the **doubly linked list**.

An important feature we need is the ability to access both ends of the doubly linked list when adding or removing nodes. With this in mind, let's establish some definitions:

- The tail of the linked list signifies the most frequently used node.
- The head of the linked list signifies the least recently used node.

To reference the ends of the linked list, we can establish head and tail nodes, where head points to the least recently used node, and tail points to the most recently used node:

![The image represents a circular buffer data structure with a capacity of 3.  The structure is depicted as a sequence of three rectangular boxes connected by curved arrows, representing the buffer's elements. Each box contains two numbers separated by a vertical bar; the first number represents the index of the element within the buffer (starting from 1), and the second number represents the data value stored at that index.  Specifically, the boxes show elements at indices 1 (containing data value 100), 2 (containing data value 250), and 4 (containing data value 300).  To the leftmost box is a rectangular box labeled 'head', indicating the beginning of the buffer, and to the rightmost box is a rectangular box labeled 'tail', indicating the end of the buffer.  Gray curved arrows connect the 'head' to the first element, each element to the next, and the last element to the 'tail', illustrating the circular nature of the buffer; data would wrap around from the 'tail' back to the 'head' if the buffer were full.  Above the structure, the text 'capacity = 3' explicitly states the buffer's maximum size.](/assets/images/dsa/linkedlists/4e9ee1d5a6b5c430.webp)

Operations 3 and 4 ‾ \underline{\text{Operations 3 and 4}} Operations 3 and 4 ​

Operation 3 indicates that we’ll need to be able to move a node to the most recently-used end of the cache, and that this node doesn’t necessarily need to be at the head or tail of the linked list. If this node was somewhere in the middle, we’d need to traverse the linked list to find it. Is there a way we could access this node in O ( 1 ) O(1) O ( 1 ) time? Since this node is associated with a key, we could use a **hash map** to store key-node pairs. This allows us to access a node by its key in constant time. The diagram below illustrates how the hash map's values are references to nodes in the linked list:

![Image represents a doubly linked list visualized alongside a hashmap.  The linked list consists of rectangular nodes connected by bidirectional arrows.  The nodes are labeled sequentially: 'head', then three data nodes containing key-value pairs (1|100, 2|250, 4|300), and finally 'tail'.  Each data node shows a key and a value separated by a vertical bar.  The 'head' and 'tail' nodes represent the beginning and end of the list, respectively.  Below the linked list, a hashmap is depicted, showing three key-value pairs: (key: 4, value: ●), (key: 1, value: ○), and (key: 2, value: ●).  The values are represented by colored dots (magenta, cyan, and magenta respectively). Dotted lines connect each node in the linked list to its corresponding key-value pair in the hashmap, illustrating a potential mapping between the list's data and the hashmap's entries.  The lines are colored to match the values in the hashmap.  The magenta dashed lines connect the nodes with magenta dots, and the cyan dotted line connects the node with the cyan dot.](/assets/images/dsa/linkedlists/af678a92195e67f4.webp)

Using a hash map also addresses operation 4 regarding efficient access to values from their keys.

Now we’ve decided on using a doubly linked list and a hash map to represent the LRU cache, let’s examine how the `put` and `get` functions would be implemented.

**put(key: int, val: int) -> None:** Below is the flow for adding a new key-value pair to the cache. This involves correctly updating the linked list and the hash map, while ensuring the cache does not exceed its capacity:

![Image represents a flowchart depicting the logic for adding a key-value pair to a cache implemented using a hash map and a linked list (likely an LRU cache).  The process begins by checking if the key already exists in the cache via a hash map query. If 'yes,' the existing node is removed from the linked list and then re-added as the most recently used node at the head of the linked list.  If 'no,' the flowchart checks if adding a new node would exceed the cache's capacity. If 'yes,' the least recently used node is removed from both the linked list and the hash map. If 'no,' the new node is added as the most recently used node to the linked list and also added to the hash map.  The flowchart uses orange arrows to indicate the flow of control based on the 'yes' or 'no' answers to the conditional checks.  Each box contains a description of the action to be performed at that step.](/assets/images/dsa/linkedlists/05a191a56f1c2486.webp)

To better understand how to add a new node to a doubly linked list that’s at maximum capacity, check out the following example:

![Image represents a visualization of a cache replacement algorithm, specifically illustrating a Least Recently Used (LRU) strategy.  The top section shows an initial state where a doubly linked list represents the cache.  Nodes labeled `1 | 00`, `2 | 250`, and `4 | 300` are linked together, with `head` pointing to the beginning and `tail` pointing to the end.  The input `put (3 | 200)` is given, and since the cache is full, the `remove_node(head.next)` function is called, removing node `1 | 00` (indicated by a red cross).  A dotted line shows the connection between `remove_node` and the removed node. The middle section shows the cache after the removal, with only `2 | 250` and `4 | 300` remaining. The bottom section depicts the `add_to_tail(3 | 200)` function adding the new node `3 | 200` to the end of the list, updating the `tail` pointer.  The entire process demonstrates how the LRU algorithm maintains a fixed-size cache by removing the least recently used element when a new element needs to be added.  The numbers within the nodes likely represent keys and values, respectively.](/assets/images/dsa/linkedlists/cd4f625af32f8ee8.webp)

As you can see, we’ll need a function to remove a node (`remove_node`), as well as a function to add a node to the tail of the linked list (`add_to_tail`). We discuss these functions in more detail in the implementation section.

**get(key: int) -> int:** Below is the process for retrieving a key's value from the cache:

![Image represents a flowchart depicting a cache lookup algorithm.  The process begins with a decision box asking 'Is the key in the cache? Check by querying the hash map.'  An orange arrow branches from this box, leading to two rectangular boxes representing the possible outcomes: 'yes' and 'no'. If the key is found ('yes'), the algorithm proceeds to a larger rectangular box detailing the steps to update the cache:  1. Remove the node associated with the key; 2. Add the node back as the most recently used node in a linked list.  From this box, another orange arrow points to a final rectangular box that states 'Return the value associated with this node.'  If the key is not found ('no'), an orange arrow leads to a smaller rectangular box that simply states 'Return -1', indicating a cache miss.  The overall structure illustrates a Least Recently Used (LRU) cache implementation, using a hash map for efficient key lookups and a linked list to maintain the order of recently used items.](/assets/images/dsa/linkedlists/dfba5404031cac98.webp)

Now let’s take a look at an example of how the doubly linked list is updated during a `get` function call:

![Image represents a visual depiction of a `get(2)` operation on a doubly linked list, implemented using a hashmap for efficient node access.  The top section shows the initial state: a doubly linked list with nodes labeled '2 | 250', '4 | 300', and '3 | 200', connected by bidirectional arrows indicating `next` and `prev` pointers.  'head' and 'tail' labels point to the beginning and end of the list, respectively.  A dashed arrow points from `remove_node(hashmap[2])` to node '2 | 250', which is marked with a red 'X', signifying its removal. The middle section illustrates the removal of node '2 | 250'. The bottom section shows the node '2 | 250' re-added to the tail of the list via `add_to_tail(2 | 250)`, indicated by a dashed arrow. Finally, a thick black arrow at the bottom points to 'return 250', indicating the value returned by the `get(2)` operation after the node has been temporarily removed and then re-added to the tail.  Each node displays a key-value pair (e.g., '2 | 250'), representing the key used in the hashmap and the associated value. The overall diagram demonstrates the process of retrieving a node's value, removing it, and then re-inserting it at the tail to maintain the list's structure.](/assets/images/dsa/linkedlists/83e4180f27d1ead1.webp)

Now that we understand how the doubly linked list and hash map are used to design the LRU cache, let's dive into its implementation details, including the details of the helper methods `remove_node` and `add_to_tail`.

## Implementation

We can use the custom class below to represent a node in a doubly linked list:

```python
class DoublyLinkedListNode:
   def __init__(self, key: int, val: int):
       self.key = key
       self.val = val
       self.next = self.prev = None
```

The example below illustrates how to add a node to the tail of the linked list. Let's refer to the node before the tail as `prev_node`.

The new node should appear after `prev_node` and before the tail node. Let’s set the new node’s `prev` and `next` pointers to reflect this:

![Image represents a doubly linked list data structure.  The list is composed of rectangular nodes, each containing two values separated by a vertical bar '|'.  The first value represents a node's identifier (an integer), and the second represents its data (also an integer).  The nodes are labeled sequentially: 'head' (a light gray node with no identifier or data), '2 | 250', '4 | 300', and 'tail' (a light gray node with no identifier or data).  Node '3 | 200' is highlighted with an orange border, suggesting a special status or selection.  Curved bidirectional arrows connect adjacent nodes, indicating that each node points to both its predecessor and successor.  The arrow below node '4 | 300' is labeled 'prev_node', explicitly showing the backward pointer.  The overall structure demonstrates the interconnectedness of nodes in a doubly linked list, allowing traversal in both directions.](/assets/images/dsa/linkedlists/d0f9b2ee35e15c69.webp)

Now connect prev_node and tail to the new node:

![Image represents a doubly linked list data structure.  The list is composed of rectangular nodes, each containing two values separated by a vertical bar '|'.  The first value represents a node's identifier (e.g., '2', '3', '4'), and the second represents data associated with that node (e.g., '250', '200', '300').  The nodes are connected by bidirectional arrows indicating the `prev_node` and `next_node` relationships.  The leftmost node is labeled 'head', representing the beginning of the list, and the rightmost node is labeled 'tail', representing the end.  A node with identifier '3' and data '200' is highlighted with an orange border, suggesting it might be a currently focused or selected node.  The arrows show that node '2' points to node '3' and node '4' points to node '3', while node '3' points to node '4' and node '2'.  The 'head' node points to node '2', and the 'tail' node points to node '3', completing the doubly linked structure.](/assets/images/dsa/linkedlists/122e7a019a5d505a.webp)

Below is the implementation of this function:

```python
def add_to_tail(self, node: DoublyLinkedListNode) -> None:
    prev_node = self.tail.prev
    node.prev = prev_node
    node.next = self.tail
    prev_node.next = node
    self.tail.prev = node
```

The example below illustrates how to remove a node from the doubly linked list:

![The image represents a doubly linked list data structure before and after a node removal operation.  The list is visualized horizontally, with rectangular nodes representing data elements. Each node contains two values separated by a vertical bar: a key (integer) and a value (integer).  The nodes are connected by bidirectional arrows indicating the links between them.  The leftmost node is labeled 'head,' and the rightmost node is labeled 'tail,' representing the beginning and end of the list.  Initially, the list contains nodes with values (2 | 250), (4 | 300), and (3 | 200). A separate, unattached node (4 | 300) is shown above the list, labeled 'remove_node('. A dashed arrow points from this node to the node (4 | 300) within the list, indicating the node to be removed. The diagram illustrates the `remove_node` operation, implying that after the operation, the node (4 | 300) will be deleted from the linked list, leaving only the nodes (2 | 250) and (3 | 200) connected.](/assets/images/dsa/linkedlists/c689082015c6c19b.webp)

To remove a node, we make its two adjacent nodes point at each other, effectively excluding the node to be removed from the linked list:

![Image represents a doubly linked list data structure with three nodes.  The leftmost node is labeled 'head,' indicating the beginning of the list.  Next is a node containing '2 | 250,' where '2' likely represents a key or identifier and '250' represents data associated with that key. This node is connected to the 'head' node via a bidirectional grey arrow, signifying that traversal is possible in both directions.  A central node, '4 | 00,' is crossed out in red, indicating it's been removed or is invalid.  This node is connected to the previous node with a light grey arrow pointing to the left and to the next node with a light grey arrow pointing to the right. The rightmost node is labeled 'tail,' marking the end of the list and is connected to the previous node via a bidirectional grey arrow.  The 'head' and 'tail' nodes are represented as rounded rectangles, while the data nodes are represented as rectangular boxes.  The central node's removal is highlighted by a large red 'X' over it, suggesting a deletion operation within the linked list.  The overall structure illustrates the connections and flow of information within a doubly linked list, emphasizing the removal of a node.](/assets/images/dsa/linkedlists/a15692969a312336.webp)

```python
def remove_node(self, node: DoublyLinkedListNode) -> None:
    node.prev.next = node.next
    node.next.prev = node.prev
```

With the help of the above two functions, we can complete the full implementation of the LRU cache.

**LRU Cache**

```python
class DoublyLinkedListNode:
    def __init__(self, key: int, val: int):
        self.key = key
        self.val = val
        self.next = self.prev = None
    
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # A hash map that maps keys to nodes.
        self.hashmap = {}
        # Initialize the head and tail dummy nodes and connect them to
        # each other to establish a basic two-node doubly linked list.
        self.head = DoublyLinkedListNode(-1, -1)
        self.tail = DoublyLinkedListNode(-1, -1)
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def get(self, key: int) -> int:
        if key not in self.hashmap:
            return -1
        # To make this key the most recently used, remove its node and
        # re-add it to the tail of the linked list.
        self.remove_node(self.hashmap[key])
        self.add_to_tail(self.hashmap[key])
        return self.hashmap[key].val
    
    def put(self, key: int, value: int) -> None:
        # If a node with this key already exists, remove it from the
        # linked list.
        if key in self.hashmap:
            self.remove_node(self.hashmap[key])
        node = DoublyLinkedListNode(key, value)
        self.hashmap[key] = node
        # Remove the least recently used node from the cache if adding
        # this new node will result in an overflow.
        if len(self.hashmap) > self.capacity:
            del self.hashmap[self.head.next.key]
            self.remove_node(self.head.next)
        self.add_to_tail(node)
    
    def add_to_tail(self, node: DoublyLinkedListNode) -> None:
        prev_node = self.tail.prev
        node.prev = prev_node
        node.next = self.tail
        prev_node.next = node
        self.tail.prev = node
    
    def remove_node(self, node: DoublyLinkedListNode) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev
```

### Complexity Analysis

**Time complexity:** The time complexity for the helper functions `remove_node` and `add_tail_node` is O ( 1 ) O(1) O ( 1 ) because they perform constant-time operations on a doubly linked list. The `put` and `get` functions utilize these helper functions, while also performing constant-time hash map operations. Consequently, they also have an O ( 1 ) O(1) O ( 1 ) time complexity.

**Space complexity:** The overall space complexity of this solution is O ( n ) O(n) O ( n ), where n n n is the capacity of the cache. This is because both the doubly linked list and hash map can each occupy O ( n ) O(n) O ( n ) space.

### Interview Tip

*Tip: Explore how combining data structures can help achieve certain functionality.* It’s possible to encounter situations where no single data structure provides the functionality required for your solution. In such cases, try to work out if this functionality can be achieved using a combination of data structures. For instance, in this problem we combined a doubly-linked list and a hash map to achieve the functionality required for the LRU cache.
