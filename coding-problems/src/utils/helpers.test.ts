import { TreeNode, ListNode, createBinaryTree, createLinkedList, linkedListToArray, binaryTreeToArray, Timer, TestDataGenerator } from './helpers';

describe('Utility Helpers', () => {
  describe('TreeNode', () => {
    it('should create a tree node with default values', () => {
      const node = new TreeNode();
      expect(node.val).toBe(0);
      expect(node.left).toBeNull();
      expect(node.right).toBeNull();
    });

    it('should create a tree node with specified values', () => {
      const left = new TreeNode(2);
      const right = new TreeNode(3);
      const root = new TreeNode(1, left, right);
      
      expect(root.val).toBe(1);
      expect(root.left).toBe(left);
      expect(root.right).toBe(right);
    });
  });

  describe('ListNode', () => {
    it('should create a list node with default values', () => {
      const node = new ListNode();
      expect(node.val).toBe(0);
      expect(node.next).toBeNull();
    });

    it('should create a linked list structure', () => {
      const node2 = new ListNode(2);
      const node1 = new ListNode(1, node2);
      
      expect(node1.val).toBe(1);
      expect(node1.next).toBe(node2);
      expect(node2.next).toBeNull();
    });
  });

  describe('createBinaryTree', () => {
    it('should create tree from array representation', () => {
      const tree = createBinaryTree([1, 2, 3, 4, 5]);
      
      expect(tree?.val).toBe(1);
      expect(tree?.left?.val).toBe(2);
      expect(tree?.right?.val).toBe(3);
      expect(tree?.left?.left?.val).toBe(4);
      expect(tree?.left?.right?.val).toBe(5);
    });

    it('should handle null values in array', () => {
      const tree = createBinaryTree([1, null, 2, 3]);
      
      expect(tree?.val).toBe(1);
      expect(tree?.left).toBeNull();
      expect(tree?.right?.val).toBe(2);
      expect(tree?.right?.left?.val).toBe(3);
    });

    it('should return null for empty array', () => {
      expect(createBinaryTree([])).toBeNull();
      expect(createBinaryTree([null])).toBeNull();
    });
  });

  describe('createLinkedList', () => {
    it('should create linked list from array', () => {
      const list = createLinkedList([1, 2, 3]);
      
      expect(list?.val).toBe(1);
      expect(list?.next?.val).toBe(2);
      expect(list?.next?.next?.val).toBe(3);
      expect(list?.next?.next?.next).toBeNull();
    });

    it('should return null for empty array', () => {
      expect(createLinkedList([])).toBeNull();
    });
  });

  describe('linkedListToArray', () => {
    it('should convert linked list to array', () => {
      const list = createLinkedList([1, 2, 3, 4]);
      const array = linkedListToArray(list);
      
      expect(array).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty list', () => {
      expect(linkedListToArray(null)).toEqual([]);
    });
  });

  describe('binaryTreeToArray', () => {
    it('should convert tree to array representation', () => {
      const tree = createBinaryTree([1, 2, 3, 4, 5]);
      const array = binaryTreeToArray(tree);
      
      expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle empty tree', () => {
      expect(binaryTreeToArray(null)).toEqual([]);
    });
  });

  describe('Timer', () => {
    it('should measure execution time', async () => {
      const timer = new Timer();
      
      timer.start();
      await new Promise(resolve => setTimeout(resolve, 10));
      const elapsed = timer.end();
      
      expect(elapsed).toBeGreaterThan(0);
    });

    it('should measure function execution', () => {
      const timer = new Timer();
      
      const { result, time } = timer.measure(() => {
        return 2 + 2;
      });
      
      expect(result).toBe(4);
      expect(time).toBeGreaterThanOrEqual(0);
    });
  });

  describe('TestDataGenerator', () => {
    it('should generate random int array', () => {
      const arr = TestDataGenerator.randomIntArray(10, 1, 100);
      
      expect(arr).toHaveLength(10);
      arr.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(100);
      });
    });

    it('should generate sorted array', () => {
      const arr = TestDataGenerator.sortedArray(5, 10);
      
      expect(arr).toEqual([10, 11, 12, 13, 14]);
    });

    it('should generate array with duplicates', () => {
      const arr = TestDataGenerator.arrayWithDuplicates(20, 5);
      
      expect(arr).toHaveLength(20);
      arr.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(5);
      });
    });
  });
});
