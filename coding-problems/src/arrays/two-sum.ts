/**
 * Two Sum Problem
 * 
 * Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * @param nums - Array of integers
 * @param target - Target sum
 * @returns Array of two indices
 */
export function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    if (currentNum === undefined) continue;
    
    const complement = target - currentNum;
    
    if (numMap.has(complement)) {
      return [numMap.get(complement)!, i];
    }
    
    numMap.set(currentNum, i);
  }
  
  return []; // No solution found
}

/**
 * Two Sum - Brute Force Approach
 * 
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const num1 = nums[i];
      const num2 = nums[j];
      if (num1 !== undefined && num2 !== undefined && num1 + num2 === target) {
        return [i, j];
      }
    }
  }
  return [];
}
