---
layout: default
title: "Data Structures"
permalink: /data-structures/
---

# 🏗️ Data Structures

Comprehensive implementations of fundamental data structures.

## Linear Data Structures

### Linked List
**Location:** `DataStructure/LinkedList/`  
**Language:** JavaScript  
**Features:**
- Insert, delete, search operations
- Comprehensive documentation
- Multiple utility methods

### Doubly Linked List
**Location:** `DataStructure/DoublyLinkedList/`  
**Language:** JavaScript  
**Features:**
- Bidirectional traversal
- Efficient insertion/deletion

### Stack
**Location:** `DataStructure/Stack/`  
**Language:** TypeScript  
**Operations:** Push, Pop, Peek, isEmpty

### Queue
**Location:** `DataStructure/Queue/`  
**Language:** TypeScript  
**Operations:** Enqueue, Dequeue, Front, isEmpty

## Tree Data Structures

### Binary Search Tree (BST)
**Location:** `DataStructure/BST/`  
**Language:** TypeScript  
**Features:**
- Insert, delete, search operations
- In-order, pre-order, post-order traversals
- Height and balance calculations

## Array Operations
**Location:** `DataStructure/Arrays/`  
**Description:** Common array manipulation algorithms and operations.

## Usage Examples

```typescript
// Stack Example
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2

// Queue Example  
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
console.log(queue.dequeue()); // "first"
```

---

[← Algorithms](/algorithms/) | [Problems →](/problems/)
