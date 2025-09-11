import { allSumCombinations } from './AllSumCombinations';

describe('All Sum Combinations', () => {
  describe('Basic functionality', () => {
    it('should find all combinations that sum to target', () => {
      const result = allSumCombinations(7, [2, 3, 4]);
      expect(result).toEqual([[2, 2, 3], [3, 4]]);
    });

    it('should handle target that equals a single number', () => {
      const result = allSumCombinations(4, [2, 3, 4]);
      expect(result).toEqual([[2, 2], [4]]);
    });

    it('should allow reusing numbers multiple times', () => {
      const result = allSumCombinations(6, [2, 3]);
      expect(result).toEqual([[2, 2, 2], [3, 3]]);
    });

    it('should return empty array when no combinations possible', () => {
      const result = allSumCombinations(5, [2, 4, 6]);
      expect(result).toEqual([]);
    });

    it('should handle single element pool', () => {
      const result = allSumCombinations(6, [3]);
      expect(result).toEqual([[3, 3]]);
    });
  });

  describe('Edge cases', () => {
    it('should handle target of 0', () => {
      const result = allSumCombinations(0, [1, 2, 3]);
      expect(result).toEqual([[]]);
    });

    it('should handle empty pool', () => {
      const result = allSumCombinations(5, []);
      expect(result).toEqual([]);
    });

    it('should handle target of 1 with various pools', () => {
      expect(allSumCombinations(1, [1, 2, 3])).toEqual([[1]]);
      expect(allSumCombinations(1, [2, 3, 4])).toEqual([]);
    });

    it('should handle large target with small numbers', () => {
      const result = allSumCombinations(4, [1, 2]);
      expect(result).toEqual([
        [1, 1, 1, 1],
        [1, 1, 2],
        [2, 2]
      ]);
    });
  });

  describe('Complex scenarios', () => {
    it('should handle multiple ways to reach target', () => {
      const result = allSumCombinations(8, [2, 3, 5]);
      expect(result).toContainEqual([2, 2, 2, 2]);
      expect(result).toContainEqual([2, 3, 3]);
      expect(result).toContainEqual([3, 5]);
      expect(result).toHaveLength(3);
    });

    it('should maintain non-decreasing order within combinations when pool is sorted', () => {
      const result = allSumCombinations(10, [2, 3, 5]); // sorted pool
      // Each combination should be in non-decreasing order
      result.forEach(combination => {
        for (let i = 1; i < combination.length; i++) {
          expect(combination[i]!).toBeGreaterThanOrEqual(combination[i - 1]!);
        }
      });
    });

    it('should produce consistent results regardless of input pool order', () => {
      const result1 = allSumCombinations(7, [4, 2, 3]);
      const result2 = allSumCombinations(7, [2, 3, 4]);
      
      // Results should have same number of valid combinations
      expect(result1.length).toBe(result2.length);
      
      // All combinations should sum to target
      [...result1, ...result2].forEach(combo => {
        const sum = combo.reduce((acc, num) => acc + num, 0);
        expect(sum).toBe(7);
      });
      
      // Convert to sets of sorted combinations for comparison
      const normalize = (combinations: number[][]) => 
        combinations.map(combo => [...combo].sort((a, b) => a - b).join(','));
      
      const set1 = new Set(normalize(result1));
      const set2 = new Set(normalize(result2));
      
      expect(set1).toEqual(set2);
    });
  });

  describe('Performance and validation', () => {
    it('should verify all combinations sum to target', () => {
      const target = 12;
      const pool = [2, 3, 5, 7];
      const result = allSumCombinations(target, pool);
      
      result.forEach(combination => {
        const sum = combination.reduce((acc, num) => acc + num, 0);
        expect(sum).toBe(target);
      });
    });

    it('should only use numbers from the pool', () => {
      const pool = [2, 5, 8];
      const result = allSumCombinations(10, pool);
      
      result.forEach(combination => {
        combination.forEach(num => {
          expect(pool).toContain(num);
        });
      });
    });

    it('should not contain duplicate combinations', () => {
      const result = allSumCombinations(6, [1, 2, 3]);
      const stringified = result.map(combo => combo.join(','));
      const unique = [...new Set(stringified)];
      
      expect(stringified.length).toBe(unique.length);
    });

    it('should handle moderate size inputs efficiently', () => {
      const start = Date.now();
      const result = allSumCombinations(15, [1, 2, 3, 4, 5]);
      const end = Date.now();
      
      expect(end - start).toBeLessThan(1000); // Should complete within 1 second
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Specific test cases from documentation', () => {
    it('should match the example in JSDoc', () => {
      const result = allSumCombinations(7, [2, 3, 4]);
      expect(result).toEqual([[2, 2, 3], [3, 4]]);
    });

    it('should handle coin change-like scenarios', () => {
      // Classic coin change: make amount 11 with coins [1,5,10,25]
      const result = allSumCombinations(11, [1, 5, 10]);
      expect(result).toContainEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      expect(result).toContainEqual([1, 5, 5]);
      expect(result).toContainEqual([1, 10]);
    });

    it('should handle fibonacci-like sequences', () => {
      const result = allSumCombinations(8, [1, 2, 3, 5]);
      expect(result).toContainEqual([3, 5]);
      expect(result).toContainEqual([1, 2, 5]);
      expect(result).toContainEqual([1, 1, 3, 3]);
    });
  });
});
