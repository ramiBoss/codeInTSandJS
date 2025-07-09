/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 * this.val = val;
 * this.next = null;
 * }
 */

/**
 * Finds the intersection node of two singly linked lists.
 * This approach calculates lengths, aligns the starting points, and then traverses.
 *
 * @param {ListNode} headA The head of the first linked list.
 * @param {ListNode} headB The head of the second linked list.
 * @returns {ListNode | null} The intersection node, or null if no intersection.
 * Time Complexity: O(M + N) where M and N are lengths of list A and B. (Two passes: one for length, one for traversal)
 * Space Complexity: O(1).
 */
var getIntersectionNode = function(headA, headB) {
    // 1. Handle edge cases where one or both lists are empty.
    if (headA === null || headB === null) {
        return null;
    }

    let currentA = headA;
    let currentB = headB;
    let lenA = 0;
    let lenB = 0;

    // 2. Calculate the length of List A and find its tail.
    while (currentA !== null) {
        lenA++;
        currentA = currentA.next;
    }
    let tailA = currentA; // currentA is now null, so tailA is null here. We need the actual last node.

    // Reset currentA to headA to get the correct tail and re-traverse for lengths.
    // It's better to store tail nodes directly in the length calculation loop.
    currentA = headA;
    while(currentA.next !== null){
        lenA++;
        currentA = currentA.next;
    }
    // Now, currentA points to the actual last node of List A.
    const lastNodeA = currentA; // Store the last node for optimization.

    // Do the same for List B.
    currentB = headB;
    while(currentB.next !== null){
        lenB++;
        currentB = currentB.next;
    }
    const lastNodeB = currentB; // Store the last node for optimization.

    // --- Corrected Length Calculation ---
    // Let's rewrite the length calculation part for clarity and correctness.
    currentA = headA;
    currentB = headB;
    lenA = 0;
    lenB = 0;
    let tail1 = null; // Store the actual tail node
    let tail2 = null; // Store the actual tail node

    while (currentA !== null) {
        lenA++;
        tail1 = currentA; // Keep updating tail1
        currentA = currentA.next;
    }

    while (currentB !== null) {
        lenB++;
        tail2 = currentB; // Keep updating tail2
        currentB = currentB.next;
    }

    // 3. Early Exit Optimization: If tails are different, no intersection.
    if (tail1 !== tail2) {
        return null;
    }

    // 4. Reset pointers to heads
    currentA = headA;
    currentB = headB;

    // 5. Advance the pointer of the longer list by the difference in lengths.
    if (lenA > lenB) {
        let diff = lenA - lenB;
        for (let i = 0; i < diff; i++) {
            currentA = currentA.next;
        }
    } else if (lenB > lenA) {
        let diff = lenB - lenA;
        for (let i = 0; i < diff; i++) {
            currentB = currentB.next;
        }
    }

    // 6. Traverse both lists simultaneously until an intersection is found (or both reach null).
    while (currentA !== currentB) {
        currentA = currentA.next;
        currentB = currentB.next;
    }

    // currentA (or currentB) will be the intersection node or null if no intersection found.
    return currentA;
};




/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 * this.val = val;
 * this.next = null;
 * }
 */

/**
 * Finds the intersection node of two singly linked lists using the two-pointer approach.
 * This is the most elegant and common solution.
 *
 * @param {ListNode} headA The head of the first linked list.
 * @param {ListNode} headB The head of the second linked list.
 * @returns {ListNode | null} The intersection node, or null if no intersection.
 * Time Complexity: O(M + N) where M and N are lengths of list A and B.
 * Space Complexity: O(1).
 */
var getIntersectionNode = function(headA, headB) {
    // Handle edge cases where one or both lists are empty.
    if (headA === null || headB === null) {
        return null;
    }

    let ptrA = headA;
    let ptrB = headB;

    // Loop until they meet. They will meet at the intersection node or at null.
    while (ptrA !== ptrB) {
        // If ptrA reaches the end of list A, re-route it to headB.
        // If ptrA is already at headB (meaning it just switched), and ptrB is at headA,
        // and they are of equal length, they will meet on the first traversal.
        // If they are of different lengths, the longer one will switch first.
        ptrA = (ptrA === null) ? headB : ptrA.next;

        // If ptrB reaches the end of list B, re-route it to headA.
        ptrB = (ptrB === null) ? headA : ptrB.next;
    }

    // When the loop terminates, ptrA (or ptrB) is either the intersection node
    // or null (if no intersection).
    return ptrA;
};

// --- Helper function to create a linked list ---
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// --- Test Cases ---
// Helper to print a list (for debugging)
const printList = (head) => {
    let current = head;
    let s = "";
    while (current) {
        s += current.val + " -> ";
        current = current.next;
    }
    s += "null";
    console.log(s);
};


// Test Case 1: Intersecting lists
// List A: 4 -> 1 -> 8 -> 4 -> 5
// List B: 5 -> 6 -> 1 -> 8 -> 4 -> 5
// Intersection: Node with value 8
const listA1 = new ListNode(4);
const node1 = new ListNode(1);
const node8 = new ListNode(8);
const node4 = new ListNode(4);
const node5 = new ListNode(5);

listA1.next = node1;
node1.next = node8;
node8.next = node4;
node4.next = node5;

const listB1 = new ListNode(5);
const node6 = new ListNode(6);
listB1.next = node6;
node6.next = node8; // Intersection point

console.log("--- Test Case 1: Intersecting Lists ---");
console.log("List A:");
printList(listA1);
console.log("List B:");
printList(listB1);
const intersectionNode1 = getIntersectionNode(listA1, listB1);
console.log("Intersection Node Value:", intersectionNode1 ? intersectionNode1.val : "None"); // Expected: 8


// Test Case 2: No intersection
// List A: 1 -> 2
// List B: 3 -> 4
const listA2 = new ListNode(1);
listA2.next = new ListNode(2);
const listB2 = new ListNode(3);
listB2.next = new ListNode(4);

console.log("\n--- Test Case 2: No Intersection ---");
console.log("List A:");
printList(listA2);
console.log("List B:");
printList(listB2);
const intersectionNode2 = getIntersectionNode(listA2, listB2);
console.log("Intersection Node Value:", intersectionNode2 ? intersectionNode2.val : "None"); // Expected: None


// Test Case 3: Intersection at head
// List A: 1 -> 2
// List B: 1 -> 2 (same list)
const listA3 = new ListNode(1);
listA3.next = new ListNode(2);
const listB3 = listA3; // B points to the same head as A

console.log("\n--- Test Case 3: Intersection at Head ---");
console.log("List A:");
printList(listA3);
console.log("List B:");
printList(listB3);
const intersectionNode3 = getIntersectionNode(listA3, listB3);
console.log("Intersection Node Value:", intersectionNode3 ? intersectionNode3.val : "None"); // Expected: 1


// Test Case 4: One list is null
console.log("\n--- Test Case 4: One List is Null ---");
const intersectionNode4 = getIntersectionNode(null, listB1);
console.log("Intersection Node Value:", intersectionNode4 ? intersectionNode4.val : "None"); // Expected: None


// Test Case 5: Both lists are null
console.log("\n--- Test Case 5: Both Lists are Null ---");
const intersectionNode5 = getIntersectionNode(null, null);
console.log("Intersection Node Value:", intersectionNode5 ? intersectionNode5.val : "None"); // Expected: None


// Test Case 6: Lists with common values but no intersection (different nodes)
// A: 1 -> 2 -> 3
// B: 1 -> 2 -> 3
// (but the nodes are distinct)
const listA6 = new ListNode(1);
listA6.next = new ListNode(2);
listA6.next.next = new ListNode(3);

const listB6 = new ListNode(1);
listB6.next = new ListNode(2);
listB6.next.next = new ListNode(3);

console.log("\n--- Test Case 6: Common values, no intersection ---");
console.log("List A:");
printList(listA6);
console.log("List B:");
printList(listB6);
const intersectionNode6 = getIntersectionNode(listA6, listB6);
console.log("Intersection Node Value:", intersectionNode6 ? intersectionNode6.val : "None"); // Expected: None
