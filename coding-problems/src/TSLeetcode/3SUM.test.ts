import { threeSum } from './3SUM';
describe('3SUM', () => {
    it('should return all unique triplets that sum to zero', () => {
        const nums = [-1, 0, 1, 2, -1, -4];
        const expected = [
            [-1, -1, 2],
            [-1, 0, 1]
        ];
        const result = threeSum(nums);
        
        // Sort inner arrays for comparison
        const sortTriplet = (triplet: number[]) => triplet.sort((a, b) => a - b);
        const sortedResult = result.map(sortTriplet).sort();
        const sortedExpected = expected.map(sortTriplet).sort();
        
        expect(sortedResult).toEqual(sortedExpected);
    });

    it('should handle cases with no triplets', () => {
        expect(threeSum([1, 2, 3])).toEqual([]);
        expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
    });
});