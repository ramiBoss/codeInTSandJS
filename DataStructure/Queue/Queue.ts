class Queue {
    private items: any[];

    constructor(){
        this.items = [];
    }

    // Add an item to the end of the queue
    enqueue(item: any): void {
        this.items.push(item);
    }
    // Remove and return the item at the front of the queue
    dequeue(): any {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items.shift();
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get the item at the front of the queue without removing it
    peek(): any {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }

        return this.items[0];
    }

    size(): number {
        return this.items.length
    }

    // Clear the queue
    clear(): void {
        this.items = [];
    }   


}


const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // Output: 1 (Correct)
console.log(queue.peek());    // Output: 2 (Correct)
console.log(queue.size());    // Output: 2 (Correct, after dequeuing 1)
console.log(queue.isEmpty()); // Output: false (Correct)
queue.clear();                // Clears the queue
console.log(queue.isEmpty()); // Output: true (If you add this line, it would be true)   

