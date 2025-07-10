/**
 * Implements a generic Queue data structure following the First-In, First-Out (FIFO) principle.
 * This implementation uses a standard JavaScript array as its underlying storage.
 *
 * @template T The type of elements stored in the queue.
 */
class Queue<T> {
    private items: T[]; // Private array to store the queue elements.

    /**
     * Creates a new, empty Queue instance.
     * @timeComplexity O(1) - Constant time.
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds an item to the end (rear) of the queue.
     * @param item The item to be added to the queue.
     * @returns The new size of the queue after the item is added.
     * @timeComplexity O(1) - Amortized constant time, as `Array.prototype.push` is efficient.
     */
    enqueue(item: T): number {
        return this.items.push(item);
    }

    /**
     * Removes and returns the item at the front of the queue.
     * Returns `undefined` if the queue is empty.
     *
     * @returns The item removed from the front of the queue, or `undefined` if the queue was empty.
     * @timeComplexity O(n) - Linear time due to `Array.prototype.shift()` re-indexing elements.
     * For very large queues, consider a linked list or optimized array approach
     * for O(1) dequeue performance.
     */
    dequeue(): T | undefined {
        // No explicit error thrown; returning undefined is often more idiomatic in TypeScript
        // for "get and remove" operations on potentially empty collections.
        return this.items.shift();
    }

    /**
     * Returns the item at the front of the queue without removing it.
     * Returns `undefined` if the queue is empty.
     *
     * @returns The item at the front of the queue, or `undefined` if the queue was empty.
     * @timeComplexity O(1) - Constant time.
     */
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined; // Return undefined instead of throwing an error for an empty queue
        }
        return this.items[0];
    }

    /**
     * Checks if the queue is empty.
     *
     * @returns `true` if the queue contains no elements, `false` otherwise.
     * @timeComplexity O(1) - Constant time.
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements currently in the queue.
     *
     * @returns The number of elements in the queue.
     * @timeComplexity O(1) - Constant time.
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Removes all elements from the queue, making it empty.
     *
     * @returns `void`
     * @timeComplexity O(1) - Constant time.
     */
    clear(): void {
        this.items = [];
    }
}

// --- Test Cases ---

console.log("--- Initializing and Enqueuing ---");
const numberQueue = new Queue<number>(); // Create a queue for numbers
console.log("Is queue empty?", numberQueue.isEmpty()); // Expected: true
console.log("Queue size:", numberQueue.size());       // Expected: 0

numberQueue.enqueue(10);
console.log("Enqueued 10. Queue size:", numberQueue.size()); // Expected: 1
console.log("Front element (peek):", numberQueue.peek());   // Expected: 10

numberQueue.enqueue(20);
numberQueue.enqueue(30);
console.log("Enqueued 20, 30. Queue size:", numberQueue.size()); // Expected: 3
console.log("Front element (peek):", numberQueue.peek());      // Expected: 10 (still 10, FIFO)

console.log("\n--- Dequeuing Elements ---");
console.log("Dequeued:", numberQueue.dequeue()); // Expected: 10
console.log("Queue size after dequeue:", numberQueue.size()); // Expected: 2
console.log("New front element (peek):", numberQueue.peek()); // Expected: 20

console.log("Dequeued:", numberQueue.dequeue()); // Expected: 20
console.log("Dequeued:", numberQueue.dequeue()); // Expected: 30

console.log("\n--- Checking Empty State ---");
console.log("Is queue empty?", numberQueue.isEmpty()); // Expected: true
console.log("Queue size:", numberQueue.size());       // Expected: 0

console.log("\n--- Testing Dequeue/Peek on Empty Queue ---");
console.log("Dequeued from empty:", numberQueue.dequeue()); // Expected: undefined
console.log("Peek from empty:", numberQueue.peek());       // Expected: undefined

console.log("\n--- Testing Clear Method ---");
numberQueue.enqueue(100);
numberQueue.enqueue(200);
console.log("Queue size before clear:", numberQueue.size()); // Expected: 2
numberQueue.clear();
console.log("Queue size after clear:", numberQueue.size());  // Expected: 0
console.log("Is queue empty after clear?", numberQueue.isEmpty()); // Expected: true

console.log("\n--- Testing with String Queue ---");
const stringQueue = new Queue<string>();
stringQueue.enqueue("Apple");
stringQueue.enqueue("Banana");
console.log("String queue size:", stringQueue.size());     // Expected: 2
console.log("Dequeued string:", stringQueue.dequeue());    // Expected: "Apple"
console.log("Current front string:", stringQueue.peek()); // Expected: "Banana"