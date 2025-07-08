/**
 * A Min-Heap implementation for efficiently managing a collection of numbers
 * where the smallest element is always at the root.
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Helper functions to get parent/child indices
    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    // Helper functions to check if children exist
    hasLeftChild(i) { return this.getLeftChildIndex(i) < this.heap.length; }
    hasRightChild(i) { return this.getRightChildIndex(i) < this.heap.length; }

    // Helper functions to get child values
    leftChild(i) { return this.heap[this.getLeftChildIndex(i)]; }
    rightChild(i) { return this.heap[this.getRightChildIndex(i)]; }
    parent(i) { return this.heap[this.getParentIndex(i)]; }

    // Swap two elements in the heap array
    swap(indexOne, indexTwo) {
        [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
    }

    /**
     * Adds an element to the heap, maintaining the min-heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * @param {number} value The value to insert.
     */
    insert(value) {
        this.heap.push(value); // Add to the end
        this.heapifyUp();      // Bubble up to maintain heap property
    }

    /**
     * Restores the min-heap property by moving the last inserted element up
     * to its correct position.
     */
    heapifyUp() {
        let currentIndex = this.heap.length - 1; // Start from the last element

        // While current node has a parent and current node is smaller than its parent
        while (this.getParentIndex(currentIndex) >= 0 &&
               this.parent(currentIndex) > this.heap[currentIndex]) {
            // Swap current node with its parent
            this.swap(this.getParentIndex(currentIndex), currentIndex);
            currentIndex = this.getParentIndex(currentIndex); // Move up
        }
    }

    /**
     * Removes and returns the smallest element (root) from the heap,
     * maintaining the min-heap property.
     * Time Complexity: O(log N), where N is the number of elements in the heap.
     * @returns {number | null} The smallest element, or null if the heap is empty.
     */
    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];             // Smallest element is at the root
        this.heap[0] = this.heap.pop();       // Move last element to root
        this.heapifyDown();                   // Bubble down to maintain heap property
        return min;
    }

    /**
     * Restores the min-heap property by moving the root element down
     * to its correct position after extraction.
     */
    heapifyDown() {
        let currentIndex = 0; // Start from the root

        // While the current node has at least one child
        while (this.hasLeftChild(currentIndex)) {
            let smallerChildIndex = this.getLeftChildIndex(currentIndex);

            // If a right child exists and it's smaller than the left child,
            // then the right child is the true smaller child.
            if (this.hasRightChild(currentIndex) &&
                this.rightChild(currentIndex) < this.leftChild(currentIndex)) {
                smallerChildIndex = this.getRightChildIndex(currentIndex);
            }

            // If the current node is smaller than or equal to its smallest child,
            // then the heap property is satisfied, so break.
            if (this.heap[currentIndex] <= this.heap[smallerChildIndex]) {
                break;
            } else {
                // Otherwise, swap with the smaller child and continue bubbling down.
                this.swap(currentIndex, smallerChildIndex);
                currentIndex = smallerChildIndex;
            }
        }
    }

    /**
     * Returns the smallest element (root) without removing it.
     * Time Complexity: O(1).
     * @returns {number | null} The smallest element, or null if the heap is empty.
     */
    peek() {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    /**
     * Returns the number of elements in the heap.
     * Time Complexity: O(1).
     * @returns {number} The current size of the heap.
     */
    size() {
        return this.heap.length;
    }
}

/**
 * Finds the Kth largest element in an array using a Min-Heap of size K.
 *
 * @param {number[]} nums The input array of numbers.
 * @param {number} k The 'k' value (e.g., 2nd largest, 4th largest).
 * @returns {number | null} The Kth largest element, or null if k is invalid or array is empty.
 * Time Complexity: O(N log K) where N is the length of nums.
 * Space Complexity: O(K) for the min-heap.
 */
const findKthLargest = (nums, k) => {
    console.time('kth_largest_time'); // Start timer

    if (k <= 0 || k > nums.length) {
        console.timeEnd('kth_largest_time');
        return null; // Invalid k or k > array length
    }

    const minHeap = new MinHeap();

    // 1. Insert the first K elements into the min-heap.
    for (let i = 0; i < k; i++) {
        minHeap.insert(nums[i]);
    }

    // 2. Process the remaining elements.
    // If a new element is larger than the smallest element in the heap (the root),
    // then it's one of the current 'K' largest elements seen so far.
    // Remove the old smallest and add the new larger element.
    for (let i = k; i < nums.length; i++) {
        if (nums[i] > minHeap.peek()) {
            minHeap.extractMin(); // Remove the smallest of the K largest
            minHeap.insert(nums[i]); // Add the new larger element
        }
    }

    // 3. After processing all elements, the root of the min-heap
    // will be the Kth largest element.
    const result = minHeap.peek();
    console.timeEnd('kth_largest_time');
    return result;
};

// --- Test Cases ---
const test1 = [3, 2, 1, 5, 6, 4];
const k1 = 2; // Expected: 5 (6 is 1st, 5 is 2nd)

const test2 = [3, 2, 3, 1, 2, 4, 5, 5, 6];
const k2 = 4; // Expected: 4 (6,5,5,4 are the top 4)

const test3 = [7, 6, 5, 4, 3, 2, 1];
const k3 = 5; // Expected: 3

const test4 = [1];
const k4 = 1; // Expected: 1

const test5 = [10, 20, 30, 40, 50];
const k5 = 3; // Expected: 30

console.log(`Array: ${JSON.stringify(test1)}, k=${k1} -> Kth Largest: ${findKthLargest(test1, k1)} (Expected: 5)`);
console.log(`Array: ${JSON.stringify(test2)}, k=${k2} -> Kth Largest: ${findKthLargest(test2, k2)} (Expected: 4)`);
console.log(`Array: ${JSON.stringify(test3)}, k=${k3} -> Kth Largest: ${findKthLargest(test3, k3)} (Expected: 3)`);
console.log(`Array: ${JSON.stringify(test4)}, k=${k4} -> Kth Largest: ${findKthLargest(test4, k4)} (Expected: 1)`);
console.log(`Array: ${JSON.stringify(test5)}, k=${k5} -> Kth Largest: ${findKthLargest(test5, k5)} (Expected: 30)`);
console.log(`Array: [1,2], k=0 -> Kth Largest: ${findKthLargest([1,2], 0)} (Expected: null)`);
console.log(`Array: [1,2], k=3 -> Kth Largest: ${findKthLargest([1,2], 3)} (Expected: null)`);
console.log(`Array: [], k=1 -> Kth Largest: ${findKthLargest([], 1)} (Expected: null)`);
