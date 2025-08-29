import { twoSum, twoSumBruteForce } from './two-sum';

describe('Two Sum', () => {
  describe('twoSum (Hash Map approach)', () => {
    it('should return indices of two numbers that add up to target', () => {
      expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });

    it('should return indices for negative numbers', () => {
      expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
    });

    it('should handle duplicate numbers', () => {
      expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });

    it('should return empty array when no solution exists', () => {
      expect(twoSum([1, 2, 3], 7)).toEqual([]);
    });

    it('should handle single element array', () => {
      expect(twoSum([1], 1)).toEqual([]);
    });

    it('should handle empty array', () => {
      expect(twoSum([], 5)).toEqual([]);
    });

    it('should work with zero as target', () => {
      expect(twoSum([-1, 0, 1, 2], 0)).toEqual([0, 2]);
    });

    it('should work with larger arrays', () => {
      const nums = [1, 5, 3, 7, 9, 2, 4, 6, 8];
      expect(twoSum(nums, 10)).toEqual([1, 6]); // 5 + 4 = 9, indices 1 and 6
    });
  });

  describe('twoSumBruteForce', () => {
    it('should return same results as optimized version', () => {
      const testCases = [
        { nums: [2, 7, 11, 15], target: 9 },
        { nums: [3, 2, 4], target: 6 },
        { nums: [3, 3], target: 6 },
        { nums: [-1, -2, -3, -4, -5], target: -8 },
      ];

      testCases.forEach(({ nums, target }) => {
        const optimized = twoSum(nums, target);
        const bruteForce = twoSumBruteForce(nums, target);
        
        // Both should find valid solution or both should return empty
        if (optimized.length === 0) {
          expect(bruteForce).toEqual([]);
        } else {
          expect(bruteForce.length).toBe(2);
          // Verify the indices point to numbers that sum to target
          expect(nums[bruteForce[0]! ] + nums[bruteForce[1]!]).toBe(target);
        }
      });
    });
  });

  // Performance comparison test (optional)
  describe('Performance comparison', () => {
    it('should demonstrate time complexity difference', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const target = 1500;
      
      const start1 = performance.now();
      const result1 = twoSum(largeArray, target);
      const end1 = performance.now();
      
      const start2 = performance.now();
      const result2 = twoSumBruteForce(largeArray, target);
      const end2 = performance.now();
      
      console.log(`Hash map approach: ${end1 - start1}ms`);
      console.log(`Brute force approach: ${end2 - start2}ms`);
      
      // Both should find the same solution
      expect(result1).toEqual(result2);
    });
  });
});
