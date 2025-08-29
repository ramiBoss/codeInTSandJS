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
            if(this.compare(this.heap[index] as T, this.heap[parentIndex] as T) < 0) {
                let temp = this.heap[index] as T;
                this.heap[index] = this.heap[parentIndex] as T;
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

            if (leftChildIndex < length && this.compare(this.heap[leftChildIndex] as T, this.heap[smallestIndex] as T) < 0) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.compare(this.heap[rightChildIndex] as T, this.heap[smallestIndex] as T) < 0) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            let temp = this.heap[index] as T;
            this.heap[index] = this.heap[smallestIndex] as T;
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

            if (leftChildIndex < length && this.compare(this.heap[leftChildIndex] as T, this.heap[smallestIndex] as T) < 0) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.compare(this.heap[rightChildIndex] as T, this.heap[smallestIndex] as T) < 0) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            let temp = this.heap[index] as T;
            this.heap[index] = this.heap[smallestIndex] as T;
            this.heap[smallestIndex] = temp;
            index = smallestIndex;
        }
    }
}

