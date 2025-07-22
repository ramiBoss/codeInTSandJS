/*
 MaxHeap implementation in TypeScript
    how max heap works:
    - A max heap is a complete binary tree where the value of each node is greater than or equal to the values of its children.
    - The largest element is always at the root of the tree.
    - Insertion involves adding the new element at the end and then "bubbling up" to maintain the heap property.
    - Extraction of the maximum element involves removing the root, replacing it with the last element, and then "bubbling down" to restore the heap property.
*/

export class MaxHeap<T> {
    private heap: T[] = [];
    private compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
        this.compare = compare;
    }

    public insert(value: T): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    public extractMax(): T | undefined {
        if (this.heap.length === 0) return undefined;
        const max = this.heap[0];
        const last = this.heap.pop();
        if(this.heap.length > 0 && last !== undefined) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return max;
    }


    private bubbleUp(): void {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) > 0) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
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
            let largestIndex = index;

            if (leftChildIndex < length && this.compare(this.heap[leftChildIndex], this.heap[largestIndex]) > 0) {
                largestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.compare(this.heap[rightChildIndex], this.heap[largestIndex]) > 0) {
                largestIndex = rightChildIndex;
            }
            if (largestIndex === index) break;

            [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
            index = largestIndex;
        }
    }
}