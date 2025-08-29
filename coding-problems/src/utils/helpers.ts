/**
 * Common utility functions and types for coding problems
 */

/**
 * Tree node definition for binary tree problems
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

/**
 * Linked list node definition
 */
export class ListNode {
  val: number;
  next: ListNode | null;
  
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

/**
 * Helper function to create a binary tree from array representation
 * Uses level-order (breadth-first) construction
 */
export function createBinaryTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  
  const root = new TreeNode(arr[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;
  
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift()!;
    
    // Left child
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]!);
      queue.push(node.left);
    }
    i++;
    
    // Right child
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]!);
      queue.push(node.right);
    }
    i++;
  }
  
  return root;
}

/**
 * Helper function to create a linked list from array
 */
export function createLinkedList(arr: number[]): ListNode | null {
  if (!arr.length) return null;
  
  const dummy = new ListNode(0);
  let current = dummy;
  
  for (const val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  
  return dummy.next;
}

/**
 * Helper function to convert linked list to array (for testing)
 */
export function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  
  return result;
}

/**
 * Helper function to convert binary tree to array representation
 */
export function binaryTreeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  
  // Remove trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  
  return result;
}

/**
 * Timer utility for performance testing
 */
export class Timer {
  private startTime: number = 0;
  
  start(): void {
    this.startTime = Date.now();
  }
  
  end(): number {
    return Date.now() - this.startTime;
  }
  
  measure<T>(fn: () => T): { result: T; time: number } {
    this.start();
    const result = fn();
    const time = this.end();
    return { result, time };
  }
}

/**
 * Common test data generators
 */
export class TestDataGenerator {
  /**
   * Generate array of random integers
   */
  static randomIntArray(size: number, min: number = 0, max: number = 100): number[] {
    return Array.from({ length: size }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  }
  
  /**
   * Generate sorted array
   */
  static sortedArray(size: number, start: number = 1): number[] {
    return Array.from({ length: size }, (_, i) => start + i);
  }
  
  /**
   * Generate array with duplicates
   */
  static arrayWithDuplicates(size: number, maxValue: number = 10): number[] {
    return Array.from({ length: size }, () => 
      Math.floor(Math.random() * maxValue)
    );
  }
}
