import { MinHeap } from "./MinHeap";

describe("MinHeap", () => {
    const numberCompare = (a: number, b: number) => a - b;
    let minHeap: MinHeap<number>;
  
    beforeEach(() => {
        minHeap = new MinHeap<number>(numberCompare);
    });
  
    it('should insert elements and maintain min-heap property', () => {
        minHeap.insert(20);
        minHeap.insert(10);
        minHeap.insert(30);
        minHeap.insert(5);
  
        expect(minHeap.extractMin()).toBe(5);
        expect(minHeap.extractMin()).toBe(10);
        expect(minHeap.extractMin()).toBe(20);
        expect(minHeap.extractMin()).toBe(30);
        expect(minHeap.extractMin()).toBeUndefined();
    });
  
    it('should handle extracting from an empty heap', () => {
        expect(minHeap.extractMin()).toBeUndefined();
    });
  
    it('should handle duplicate values correctly', () => {
        minHeap.insert(15);
        minHeap.insert(15);
        minHeap.insert(10);
  
        expect(minHeap.extractMin()).toBe(10);
        expect(minHeap.extractMin()).toBe(15);
        expect(minHeap.extractMin()).toBe(15);
        expect(minHeap.extractMin()).toBeUndefined();
    });
  
    it('should handle negative values', () => {
        minHeap.insert(-10);
        minHeap.insert(-20);
        minHeap.insert(-5);
  
        expect(minHeap.extractMin()).toBe(-20);
        expect(minHeap.extractMin()).toBe(-10);
        expect(minHeap.extractMin()).toBe(-5);
        expect(minHeap.extractMin()).toBeUndefined();
    });
  
    // it('should handle a large number of elements', () => {
    //     const elements = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    //     elements.forEach(el => minHeap.insert(el));
  
    //     const sortedElements = [...elements].sort((a, b) => a - b);
    //     sortedElements.forEach(expectedMin => {
    //         expect(minHeap.extractMin()).toBe(expectedMin);
    //     });
    //     expect(minHeap.extractMin()).toBeUndefined();
    // });
});