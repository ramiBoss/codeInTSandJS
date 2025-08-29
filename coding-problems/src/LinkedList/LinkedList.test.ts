import { expect, describe, it } from '@jest/globals';
import { LinkedList, Node } from './LinkedList';

// @ts-nocheck

describe('LinkedList', () => {
    describe('getNthFromEnd', () => {
        it('should return the Nth node from the end', () => {
            const list = new LinkedList(1);
            [2, 3, 4, 5].forEach(num => list.push(num));

            const result1 = list.nToTheLast(1);
            const result3 = list.nToTheLast(3);
            const result5 = list.nToTheLast(5);
            expect(result1 instanceof Node ? result1.value : result1).toBe(5); // Last node
            expect(result3 instanceof Node ? result3.value : result3).toBe(3); // Middle node
            expect(result5 instanceof Node ? result5.value : result5).toBe(1); // First node
        });

        it('should handle n greater than list length', () => {
            const list = new LinkedList(1);
            [2, 3].forEach(num => list.push(num));

            expect(list.nToTheLast(4)).toBe('n is greater than the list length');
        });

        it('should handle n equal to zero or negative', () => {
            const list = new LinkedList(1);
            [2, 3].forEach(num => list.push(num));

            expect(list.nToTheLast(0)).toBe('Invalid value for n: must be greater than 0');
            expect(list.nToTheLast(-2)).toBe('Invalid value for n: must be greater than 0');
        });

        it('should handle single node list', () => {
            const list = new LinkedList(1);
            expect(list.length).toBe(1);
        });
    });

    // describe('hasCycle', () => {
    //     it('should detect cycle in the linked list', () => {
    //         const list = new LinkedList(1);
    //         [2, 3, 4, 5].forEach(num => list.push(num));

    //         if (list.head && list[0]) {
    //             list.head.next = list[0];
    //         }
    //         // Create a cycle: 5 -> 3
    //         if (list[3] && list[1]) {
    //             list[3].next = list[1];
    //         }

    //         expect(list.hasCycle()).toBe(true);
    //     });

    //     it('should return false for acyclic list', () => {
    //         const list = new LinkedList(1);
    //         [2, 3, 4, 5].forEach(num => list.push(num));

    //         expect(list.hasCycle()).toBe(false);
    //     });

    //     it('should handle single node without cycle', () => {
    //         const list = new LinkedList(1);
    //         expect(list.hasCycle()).toBe(false);
    //     });

    //     it('should handle single node with cycle', () => {
    //         const list = new LinkedList(1);
    //         if (list.head) {
    //             list.head.next = list.head; // Create cycle
    //         }
    //         expect(list.hasCycle()).toBe(true);
    //     });
    // });
});
