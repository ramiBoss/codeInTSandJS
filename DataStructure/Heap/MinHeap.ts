// MinHeap imlementation in TypeScript

/*
    how min heap works:
    - A min heap is a complete binary tree where the value of each node is less than or equal to the values of its children.
    - The smallest element is always at the root of the tree.
    - Insertion involves adding the new element at the end and then "bubbling up" to maintain the heap property.
    - Extraction of the minimum element involves removing the root, replacing it with the last element, and then "bubbling down" to restore the heap property.
*/
export class MinHeap<T> {
    private heap: T[] = [];
    private compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
        this.compare = compare;
    }

    public insert(value: T): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    public extractMin(): T | undefined {
        if (this.heap.length === 0) return undefined;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0 && last !== undefined) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return min;
    }

    

    private bubbleUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
                let temp = this.heap[index];
                this.heap[index] = this.heap[parentIndex];
                this.heap[parentIndex] = temp;
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;
        while (index < length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.compare(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.compare(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            let temp = this.heap[index];
            this.heap[index] = this.heap[smallestIndex];
            this.heap[smallestIndex] = temp;
            index = smallestIndex;
        }
    }

    public peek(): T | undefined {
        return this.heap[0];
    }

    public size(): number {
        return this.heap.length;
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }
    public clear(): void {
        this.heap = [];
    }

    public toArray(): T[] {
        return [...this.heap];
    }

    public fromArray(array: T[]): void {
        this.heap = array;
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.bubbleDownFromIndex(i);
        }
    }

    private bubbleDownFromIndex(index: number): void {
        const length = this.heap.length;
        while (index < length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.compare(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.compare(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            let temp = this.heap[index];
            this.heap[index] = this.heap[smallestIndex];
            this.heap[smallestIndex] = temp;
            index = smallestIndex;
        }
    }

}

// Example usage
const minHeap = new MinHeap<number>((a, b) => a - b);
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
console.log(minHeap.extractMin()); // 3
console.log(minHeap.peek()); // 5
console.log(minHeap.size()); // 2
console.log(minHeap.isEmpty()); // false
minHeap.insert(1);
console.log(minHeap.extractMin()); // 1
console.log(minHeap.peek()); // 5
console.log(minHeap.size()); // 2
console.log(minHeap.isEmpty()); // false
minHeap.extractMin(); // 5
console.log(minHeap.peek()); // 8
console.log(minHeap.size()); // 1
minHeap.extractMin(); // 8
console.log(minHeap.isEmpty()); // true
minHeap.extractMin(); // undefined
console.log(minHeap.peek()); // undefined
console.log(minHeap.size()); // 0
console.log(minHeap.isEmpty()); // true


// Note: The MinHeap class can be used with any type T as long as a comparison function is provided that defines the order of the elements.
// The comparison function should return a negative number if the first argument is less than the second, zero if they are equal, and a positive number if the first is greater than the second.

// This implementation is generic and can be used for any type of data as long as a comparison function is provided.
// The MinHeap class can be extended or modified to include additional methods as needed, such as merging heaps, checking for existence of an element, etc.

// The MinHeap class is a versatile data structure that can be used in various algorithms, such as Dijkstra's algorithm for shortest paths, Prim's algorithm for minimum spanning trees, and more.
// It is efficient for priority queue implementations where the smallest element needs to be accessed quickly.
// The time complexity for insertion is O(log n) and for extraction of the minimum element is also O(log n), making it suitable for scenarios where frequent insertions and extractions are required.
// The MinHeap class can be used in various applications such as scheduling tasks, managing resources, and implementing algorithms that require priority queues.

// The MinHeap class can be further optimized or extended based on specific use cases, such as adding methods for merging heaps, checking for the existence of an element, or implementing a decrease-key operation.
// It can also be adapted to support different data types by providing appropriate comparison functions.
// The MinHeap class is a fundamental data structure that can be used in various algorithms and applications, making it a valuable addition to any TypeScript project.
// The MinHeap class can be used in various scenarios where a priority queue is needed, such as scheduling tasks, managing resources, and implementing algorithms that require efficient access to the smallest element.
// It is a versatile data structure that can be adapted to different use cases by providing appropriate comparison functions and methods.

