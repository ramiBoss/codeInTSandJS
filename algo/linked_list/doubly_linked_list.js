/**
 * Represents a Node in a Doubly Linked List.
 * Each node holds a value and references to the previous and next nodes.
 */
class Node {
    value; // The data stored in the node.
    prev;  // Reference to the previous node in the list.
    next;  // Reference to the next node in the list.

    /**
     * Creates a new Node.
     * @param {*} value - The value to be stored in the node.
     */
    constructor(value){
        this.value = value;
        this.prev = null; // Initially, no previous node.
        this.next = null; // Initially, no next node.
    }
}

/**
 * Represents a Doubly Linked List.
 * It maintains references to the head (first node) and tail (last node) of the list.
 */
class DoublyLinkedList {
    head; // The first node in the list.
    tail; // The last node in the list.
    length; // The number of nodes in the list.

    /**
     * Creates a new DoublyLinkedList.
     * If a value is provided, it initializes the list with a single node.
     * @param {*} [value] - The initial value for the first node in the list.
     */
    constructor(value){
        if (value === undefined) {
            this.head = null;
            this.tail = null;
            this.length = 0;
        } else {
            const newNode = new Node(value);
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
        }
    }

    /**
     * Adds a new node with the given value to the end of the list.
     * This is an O(1) operation.
     * @param {*} value - The value to be added to the list.
     * @returns {DoublyLinkedList} The current DoublyLinkedList instance.
     */
    push(value){
        const newNode = new Node(value);
        if(!this.head){ // If the list is empty
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode; // Link current tail's next to new node
            newNode.prev = this.tail; // Link new node's prev to current tail
            this.tail = newNode;       // Update tail to new node
        }
        this.length++; // Increment the length of the list
        return this; // Return the list for chaining
    }

    /**
     * Removes the last node from the list.
     * This is an O(1) operation.
     * @returns {Node | undefined} The removed node, or undefined if the list was empty.
     */
    pop(){
        if(!this.head){ // If the list is empty
            return undefined; // Nothing to pop
        }

        const poppedNode = this.tail; // Store the node to be removed
        if (this.length === 1) { // If there's only one node in the list
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev; // Move tail to the previous node
            this.tail.next = null;      // Disconnect the old tail from the list
            poppedNode.prev = null;     // Disconnect the popped node's prev reference
        }
        this.length--; // Decrement the length of the list
        return poppedNode; // Return the removed node
    }

    /**
     * Inserts a new node with the given value at a specific index in the list.
     * @param {*} value - The value to be inserted.
     * @param {number} index - The index at which to insert the new node (0-based).
     * @returns {boolean} True if the insertion was successful, false otherwise.
     */
    insert(value, index){
        // Handle invalid index
        if (index < 0 || index > this.length) {
            console.error("Error: Index out of bounds.");
            return false;
        }

        // If inserting at the end, use push method
        if (index === this.length) {
            this.push(value);
            return true;
        }

        // If inserting at the beginning (index 0)
        if (index === 0) {
            const newNode = new Node(value);
            if (!this.head) { // If the list is empty
                this.head = newNode;
                this.tail = newNode;
            } else {
                newNode.next = this.head; // Link new node's next to current head
                this.head.prev = newNode; // Link current head's prev to new node
                this.head = newNode;      // Update head to new node
            }
            this.length++;
            return true;
        }

        // For insertion in the middle
        const newNode = new Node(value);
        let currentNode = this.head;
        // Traverse to the node *before* the insertion point
        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }

        // Link the new node
        newNode.next = currentNode.next;     // New node points to the node after current
        newNode.prev = currentNode;          // New node points back to current
        currentNode.next.prev = newNode;     // Node after current points back to new node
        currentNode.next = newNode;          // Current node points to new node

        this.length++; // Increment the length
        return true;   // Indicate successful insertion
    }

    /**
     * Traverses the list from head to tail and prints the values.
     */
    printList() {
        if (!this.head) {
            console.log("List is empty.");
            return;
        }
        let current = this.head;
        let result = [];
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        console.log("List: ", result.join(" <-> "));
    }

    /**
     * Retrieves the node at a specified index.
     * @param {number} index - The index of the node to retrieve.
     * @returns {Node | undefined} The node at the specified index, or undefined if not found.
     */
    get(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        let current;
        // Optimize traversal by starting from head or tail depending on index proximity
        if (index < this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }

    /**
     * Sets the value of a node at a specific index.
     * @param {number} index - The index of the node to update.
     * @param {*} value - The new value for the node.
     * @returns {boolean} True if the node was updated, false otherwise.
     */
    set(index, value) {
        let nodeToUpdate = this.get(index);
        if (nodeToUpdate) {
            nodeToUpdate.value = value;
            return true;
        }
        return false;
    }

    /**
     * Removes a node at a specific index from the list.
     * @param {number} index - The index of the node to remove (0-based).
     * @returns {Node | undefined} The removed node, or undefined if the index is invalid.
     */
    remove(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        if (index === 0) { // Removing head
            let removedNode = this.head;
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
                removedNode.next = null; // Disconnect the removed node
            }
            this.length--;
            return removedNode;
        }
        if (index === this.length - 1) { // Removing tail
            return this.pop(); // Use pop for consistency and correctness
        }

        let removedNode = this.get(index);
        removedNode.prev.next = removedNode.next;
        removedNode.next.prev = removedNode.prev;
        removedNode.next = null;
        removedNode.prev = null;
        this.length--;
        return removedNode;
    }
}
