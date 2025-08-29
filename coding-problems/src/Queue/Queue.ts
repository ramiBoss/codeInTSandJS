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