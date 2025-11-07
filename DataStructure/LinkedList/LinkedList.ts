/**
 * Represents a Node in a Singly Linked List.
 * Each node holds a value and a reference to the next node.
 */
export class Node {
    value: any; // The data stored in the node.
    next: Node | null;  // Reference to the next node in the list.

    /**
     * Creates a new Node.
     * @param {*} value - The value to be stored in the node.
     */
    constructor(value: number){
        this.value = value;
        this.next = null; // Initially, no next node.
    }
}

/**
 * Represents a Singly Linked List.
 * It manages operations like adding, removing, inserting, and reversing nodes.
 */
export class LinkedList {
    head: Node | null = null; // The first node in the list.
    tail: Node | null = null; // The last node in the list.
    length = 0;  // The number of nodes in the list.

    /**
     * Creates a new LinkedList instance.
     * If an initial value is provided, the list starts with one node.
     * @param {*} [value] - The initial value for the head node.
     */
    constructor(value: number){
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;   
    }

    /**
     * Traverses the list from head to tail and prints the values of each node.
     * @returns {void}
     */
    /**
     * Traverses the list from head to tail and prints the values of each node.
     * 
     * Pseudo code:
     * 1. If list is empty (head is null)
     *    - Print "List is empty" and return
     * 2. Create temp pointer starting at head
     * 3. Create empty array for values
     * 4. While temp is not null
     *    - Add temp's value to array
     *    - Move temp to next node
     * 5. Join array with " -> " and print result
     * 
     * @returns {void}
     */
    printList(){
        if (!this.head) { // Handle empty list case
            console.log("List is empty.");
            return;
        }
        let temp: Node | null = this.head; // Start from the head
        const result = [];    // Array to store values for printing
        while(temp){ // Loop until the end of the list
            result.push(temp.value);
            temp = temp.next; // Move to the next node
        }
        console.log("Linked List: ", result.join(" -> ")); // Print the formatted list
    }

    /**
     * Adds a new node with the given value to the end of the list.
     * This is an O(1) operation.
     * @param {*} value - The value to be added.
     * @returns {LinkedList} The current LinkedList instance for chaining.
     */
    push(value: number): LinkedList {
        const newNode = new Node(value);
        if(!this.head){ // If the list is empty
            this.head = newNode;
            this.tail = newNode;
        } else if(this.tail) {
            this.tail.next = newNode; // Link current tail's next to new node
            this.tail = newNode;       // Update tail to new node
        }
        this.length++; // Increment the length
        return this;   // Return the list for method chaining
    }

    /**
     * Removes the last node from the list.
     * This is an O(n) operation as it requires traversing to the second-to-last node.
     * @returns {Node | undefined} The removed node, or undefined if the list was empty.
     */
    pop(){
        if(!this.head){ // If the list is empty
            return undefined; // Nothing to pop
        }
        
        // If there's only one node
        if(this.head === this.tail){
            const poppedNode = this.head;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return poppedNode;
        }

        let temp = this.head; // Start from head
        let prev = this.head; // Keep track of the node before 'temp'
        while(temp.next){ // Traverse until 'temp' is the last node
            prev = temp;
            temp = temp.next;
        }
        this.tail = prev;       // Set the new tail to 'prev'
        this.tail.next = null;  // Disconnect the old tail
        this.length--;          // Decrement the length
        return temp;            // Return the removed node
    }

    /**
     * Inserts a new node with the given value at a specific index.
     * @param {*} value - The value to be inserted.
     * @param {number} index - The 0-based index at which to insert.
     * @returns {boolean} True if insertion was successful, false otherwise.
     */
    insert(value: number, index: number): boolean {
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
            if (!this.head) { // If the list was empty
                this.head = newNode;
                this.tail = newNode;
            } else {
                newNode.next = this.head; // New node points to current head
                this.head = newNode;      // Update head to new node
            }
            this.length++;
            return true;
        }

        // For insertion in the middle
        const newNode = new Node(value);
        if (!this.head) return false;
        let temp: Node | null = this.head;
        // Traverse to the node *before* the insertion point
        for (let i = 0; i < index - 1; i++) {
            if (temp) temp = temp.next;
        }
        if (!temp) return false;  // Safety check in case temp became null
        newNode.next = temp.next; // New node points to the node 'temp' was pointing to
        temp.next = newNode;      // 'temp' now points to the new node
        this.length++;            // Increment the length
        return true;              // Indicate successful insertion
    }

    /**
     * Removes the first occurrence of a node with the given value.
     * @param {*} value - The value of the node to remove.
     * @returns {Node | string} The removed node, or a string if the node is not found or list is empty.
     */
    remove(value: number): Node | string {
        if(!this.head){ // If the list is empty
            return 'underflow';
        }

        // Case 1: Removing the head node
        if(this.head.value === value){
            const removedNode = this.head;
            this.head = this.head.next; // Move head to the next node
            removedNode.next = null; // Disconnect the removed node
            if (!this.head) { // If head became null, list is now empty, so tail is also null
                this.tail = null;
            }
            this.length--; // Decrement length
            return removedNode;
        }
        
        let temp = this.head; // Start from head
        // Traverse until 'temp.next' is the node to be removed, or end of list
        while(temp.next){ 
            if(temp.next.value === value){
                const removedNode = temp.next;
                temp.next = temp.next.next; // Skip over the node to be removed
                removedNode.next = null;    // Disconnect the removed node
                if (!temp.next) { // If the removed node was the tail, update tail
                    this.tail = temp;
                }
                this.length--; // Decrement length
                return removedNode;
            }
            temp = temp.next; // Move to the next node
        }
        return 'Node not found'; // Value not found in the list
    }

    /**
     * Reverses the linked list iteratively.
     * This method changes the actual list structure.
     * @returns {LinkedList} The current LinkedList instance (with reversed order).
     */
    reverse(){
        if(!this.head || !this.head.next){ // No need to reverse if 0 or 1 node
            return this;
        }

        let prev: Node | null = null;      // Will store the previous node
        let current: Node | null = this.head; // Start with the head
        this.tail = this.head; // The original head will become the new tail

        while(current){
            const nextNode: Node | null = current.next; // Store the next node before modifying current.next
            current.next = prev;           // Reverse the current node's pointer
            prev = current;                // Move 'prev' to current node
            current = nextNode;            // Move 'current' to the next node
        }
        this.head = prev; // 'prev' will be the new head (original tail)
        return this;
    }

    /**
     * Finds and returns the middle node of the linked list.
     * Uses the fast and slow pointer approach.
     * @returns {Node | null} The middle node, or null if the list is empty.
     */
    findMiddle(){
        if(!this.head){ // Handle empty list
            return null;
        }
        let slow: Node | null = this.head; // Slow pointer moves one step at a time
        let fast: Node | null = this.head; // Fast pointer moves two steps at a time

        while(fast !== null && fast.next !== null){ // Loop until fast reaches end
            slow = slow?.next ??  null;      // Move slow pointer one step
            fast = fast.next.next; // Move fast pointer two steps
        }
        return slow; // When fast reaches the end, slow is at the middle
    }

    /**
     * Finds the Nth node from the end of the list.
     * Uses two pointers, moving one ahead by N positions.
     * @param {number} n - The position from the end (1-based).
     * @returns {Node | string | null} The Nth node from the end, an error string, or null if the list is empty.
     */
    nToTheLast(n: number): Node | string | null {
        if(!this.head){ // Handle empty list
            return null;
        }
        if (n <= 0) { // N must be a positive integer
            return 'Invalid value for n: must be greater than 0';
        }

        let p1: Node | null = this.head; // First pointer
        let p2: Node | null = this.head; // Second pointer

        // Move p2 'n' steps ahead
        for(let i = 0; i < n; i++){
            if(p2 === null){ // If n is greater than list length
                return 'n is greater than the list length';
            }
            p2 = p2.next;
        }

        // Now move both pointers until p2 reaches the end
        while(p2 !== null){
            p1 = p1?.next ?? null;
            p2 = p2?.next ?? null;
        }
        return p1; // p1 will be at the Nth node from the end
    }

    // Detect cycles in the linked list using Floyd's Cycle Detection Algorithm
    hasCycle() {
        if (!this.head) return false; // Empty list has no cycle

        let slow: Node | null = this.head; // Slow pointer
        let fast: Node | null = this.head; // Fast pointer

        while (fast && fast.next) {
            slow = slow?.next ?? null;          // Move slow by 1 step
            fast = fast?.next?.next ?? null;    // Move fast by 2 steps

            if (slow === fast) {      // If they meet, there's a cycle
                return true;
            }
        }
        return false; // No cycle found
    }

    // Find the start of the cycle if it exists
    findCycleStart() {
        if (!this.hasCycle()) return null; // No cycle, so no start

        let slow: Node | null = this.head; // Start from head
        let fast: Node | null = this.head; // Start from head

        // Move fast pointer to meet slow pointer
        do {
            slow = slow?.next ?? null;
            fast = fast?.next?.next ?? null;
        } while (slow !== fast);

        // Reset one pointer to head and move both pointers one step at a time
        slow = this.head;
        while (slow !== fast) {
            slow = slow?.next ?? null;
            fast = fast?.next ?? null;
        }
        return slow; // The node where the cycle starts
    }
    
    // Remove duplicates from a sorted linked list
    removeDuplicates() {
        if (!this.head) return; // Empty list has no duplicates 
        let current = this.head; // Start from head
        while (current && current.next) {
            if (current.value === current.next.value) { // If current and next are the same
                current.next = current.next.next; // Skip the next node
                this.length--; // Decrement length
            } else {
                current = current.next; // Move to the next node
            }
        }
        this.tail = current; // Update tail to the last unique node
    }

    // Merge two sorted linked lists
    static mergeSortedLists(list1: LinkedList, list2: LinkedList): LinkedList {
        let dummy = new Node(0); // Dummy node to simplify merging
        let tail = dummy; // Pointer to the last node in the merged list
        
        let p1 = list1.head;
        let p2 = list2.head;
        while (p1 && p2) {
            if (p1.value < p2.value) {
                tail.next = p1; // Link to the smaller node
                p1 = p1.next;   // Move p1 to the next node
            } else {
                tail.next = p2; // Link to the smaller node
                p2 = p2.next;   // Move p2 to the next node
            }
            tail = tail.next; // Move tail to the last node in merged list
        }
        
        // If any nodes left in either list, link them
        if (p1) {
            tail.next = p1;
        } else if (p2) {
            tail.next = p2;
        }
        
        return new LinkedList(dummy.next?.value); // Return new list starting from dummy's next
    }

    // Convert the linked list to an array for easier testing and visualization
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result; // Return the array representation of the list
    }

    // Clone a linked list with arbitrary/random pointers.
    clone() {
        if (!this.head) return null; // Handle empty list

        const map = new Map(); // Map to hold original nodes and their clones
        let current: Node | null= this.head;

        // First pass: create all nodes and store them in the map
        while (current) {
            map.set(current, new Node(current.value));
            current = current.next;
        }

        // Second pass: set next pointers for cloned nodes
        current = this.head;
        while (current) {
            const cloneNode = map.get(current);
            cloneNode.next = map.get(current.next) || null; // Set next pointer
            current = current.next;
        }

        return new LinkedList(map.get(this.head).value); // Return new list with cloned head
    }

    // Merge k sorted linked lists
    /**
     * Merges k sorted linked lists into a single sorted linked list.
     * Uses a min-heap approach for efficient merging.
     * 
     * Pseudo code:
     * 1. If input is empty or null, return null
     * 2. Initialize empty min-heap
     * 3. Add head nodes of all non-empty lists to min-heap
     * 4. Create dummy node for result list
     * 5. While min-heap is not empty:
     *    a. Extract min node from heap
     *    b. Add node to result list
     *    c. If extracted node has next node
     *       - Add next node to heap
     *    d. Maintain heap property
     * 6. Return new linked list starting from dummy's next
     * 
     * Time complexity: O(N * log k) where N is total nodes, k is number of lists
     * Space complexity: O(k) for the heap
     * 
     * @param {LinkedList[]} lists - Array of sorted linked lists to merge
     * @returns {LinkedList} Merged sorted linked list
     */
    static mergeKLists(lists: LinkedList[]): LinkedList | null {
        if (!lists || lists.length === 0) return null; // Handle empty input

        const minHeap = []; // Min-heap to store the head nodes of each list

        // Initialize the heap with the head of each list
        for (const list of lists) {
            if (list.head) {
                minHeap.push(list.head);
            }
        }

        // Create a dummy node to simplify merging
        const dummy = new Node(0);
        let tail = dummy;

        // Function to maintain the min-heap property
        const heapify = (arr: Node[], index: number): void => {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < arr.length && arr[left] !== undefined && arr[smallest] !== undefined && arr[left]!.value < arr[smallest]!.value) {
                smallest = left;
            }
            if (right < arr.length && arr[right] && arr[smallest] && arr[right].value < arr[smallest]!.value) {
                smallest = right;
            }
            if (smallest !== index) {
                const temp = arr[index]!;
                arr[index] = arr[smallest]!;
                arr[smallest] = temp;
                heapify(arr, smallest); // Recursively heapify the affected subtree
            }
        };

        // Build the initial min-heap
        for (let i = Math.floor(minHeap.length / 2) - 1; i >= 0; i--) {
            heapify(minHeap, i);
        }

        // Merge the lists
        while (minHeap.length > 0) {
            // @ts-ignore
            const minNode = minHeap[0]!; // Get the smallest node with non-null assertion
            tail.next = minNode; // Link it to the merged list
            // @ts-ignore
            tail = tail.next; // Move tail to the last node

            // If there's a next node, add it to the heap
            if (minNode.next) {
                minHeap[0] = minNode.next; // Replace the root with the next node
            } else {
                const lastElement = minHeap.pop();
                if (minHeap.length > 0 && lastElement) {
                    minHeap[0] = lastElement; // Replace root with last element
                }
            }
            if(minHeap.length > 0) {
                heapify(minHeap as Node[], 0); // Type assertion to Node[]
            }
        }

        return new LinkedList(dummy.next ? dummy.next.value : null); // Return new list starting from dummy's next
    }
}