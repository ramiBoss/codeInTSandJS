import { MaxHeap } from './MaxHeap';
describe('MaxHeap', () => {
    const numberCompare = (a: number, b: number) => a - b;
    let maxHeap: MaxHeap<number>;

    beforeEach(() => {
        maxHeap = new MaxHeap<number>(numberCompare);
    });

    it('should insert elements and maintain max-heap property', () => {
        maxHeap.insert(10);
        maxHeap.insert(20);
        maxHeap.insert(5);
        maxHeap.insert(30);

        expect(maxHeap.extractMax()).toBe(30);
        expect(maxHeap.extractMax()).toBe(20);
        expect(maxHeap.extractMax()).toBe(10);
        expect(maxHeap.extractMax()).toBe(5);
        expect(maxHeap.extractMax()).toBeUndefined();
    });

    it('should handle extracting from an empty heap', () => {
        expect(maxHeap.extractMax()).toBeUndefined();
    });

    it('should handle duplicate values correctly', () => {
        maxHeap.insert(15);
        maxHeap.insert(15);
        maxHeap.insert(10);

        expect(maxHeap.extractMax()).toBe(15);
        expect(maxHeap.extractMax()).toBe(15);
        expect(maxHeap.extractMax()).toBe(10);
        expect(maxHeap.extractMax()).toBeUndefined();
    });

    it('should handle negative values', () => {
        maxHeap.insert(-10);
        maxHeap.insert(-20);
        maxHeap.insert(-5);

        expect(maxHeap.extractMax()).toBe(-5);
        expect(maxHeap.extractMax()).toBe(-10);
        expect(maxHeap.extractMax()).toBe(-20);
        expect(maxHeap.extractMax()).toBeUndefined();
    });

    // it('should handle a large number of elements', () => {
    //     const elements = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    //     elements.forEach(el => maxHeap.insert(el));

    //     const sortedElements = [...elements].sort((a, b) => b - a);
    //     sortedElements.forEach(expectedMax => {
    //         expect(maxHeap.extractMax()).toBe(expectedMax);
    //     });
    //     expect(maxHeap.extractMax()).toBeUndefined();
    // });
});