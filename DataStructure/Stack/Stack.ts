/**
 * Implements a generic Stack data structure following the Last-In, First-Out (LIFO) principle.
 * Operations are typically O(1) for push, pop, peek, isEmpty, and size.
 */
class Stack<T> { // Made generic to support any data type with type safety
    private items: T[]; // Private array to store stack elements

    /**
     * Creates a new, empty Stack instance.
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds an item to the top of the stack.
     * @param item The item to be pushed onto the stack.
     * @returns The new size of the stack.
     * @timeComplexity O(1) - Amortized constant time.
     */
    push(item: T): number {
        return this.items.push(item);
    }

    /**
     * Removes and returns the item at the top of the stack.
     * Throws an error if the stack is empty.
     * @returns The item removed from the top of the stack.
     * @throws {Error} If the stack is empty.
     * @timeComplexity O(1) - Constant time.
     */
    pop(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty. Cannot pop from an empty stack.");
        }
        return this.items.pop() as T; // Type assertion as T because we checked isEmpty
    }

    /**
     * Returns the item at the top of the stack without removing it.
     * Throws an error if the stack is empty.
     * @returns The item at the top of the stack.
     * @throws {Error} If the stack is empty.
     * @timeComplexity O(1) - Constant time.
     */
    peek(): T {
        if (this.isEmpty()) {
            throw new Error("Stack is empty. Cannot peek into an empty stack.");
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * @returns True if the stack contains no elements, false otherwise.
     * @timeComplexity O(1) - Constant time.
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements currently in the stack.
     * @returns The number of elements in the stack.
     * @timeComplexity O(1) - Constant time.
     */
    size(): number {
        return this.items.length;
    }

    /**
     * Removes all elements from the stack, making it empty.
     * @returns void
     * @timeComplexity O(1) - Constant time.
     */
    clear(): void {
        this.items = [];
    }
}

// --- Test Cases ---

console.log("--- Initializing and Pushing ---");
const numberStack = new Stack<number>(); // Creating a stack for numbers
console.log("Is stack empty?", numberStack.isEmpty()); // Expected: true
console.log("Stack size:", numberStack.size());       // Expected: 0

numberStack.push(10);
console.log("Pushed 10. Stack size:", numberStack.size()); // Expected: 1
console.log("Top element:", numberStack.peek());          // Expected: 10

numberStack.push(20);
numberStack.push(30);
console.log("Pushed 20, 30. Stack size:", numberStack.size()); // Expected: 3
console.log("Top element:", numberStack.peek());              // Expected: 30

console.log("\n--- Popping Elements ---");
console.log("Popped:", numberStack.pop()); // Expected: 30
console.log("Stack size after pop:", numberStack.size()); // Expected: 2
console.log("New top element:", numberStack.peek());     // Expected: 20

console.log("Popped:", numberStack.pop()); // Expected: 20
console.log("Popped:", numberStack.pop()); // Expected: 10

console.log("\n--- Checking Empty State ---");
console.log("Is stack empty?", numberStack.isEmpty()); // Expected: true
console.log("Stack size:", numberStack.size());       // Expected: 0

console.log("\n--- Testing Underflow Conditions ---");
try {
    numberStack.pop(); // This should throw an error
} catch (e: any) {
    console.error("Caught error:", e.message); // Expected: Stack is empty...
}

try {
    numberStack.peek(); // This should throw an error
} catch (e: any) {
    console.error("Caught error:", e.message); // Expected: Stack is empty...
}

console.log("\n--- Testing with String Stack ---");
const stringStack = new Stack<string>();
stringStack.push("Apple");
stringStack.push("Banana");
console.log("String stack size:", stringStack.size()); // Expected: 2
console.log("Popped string:", stringStack.pop());    // Expected: Banana
console.log("Current top string:", stringStack.peek()); // Expected: Apple