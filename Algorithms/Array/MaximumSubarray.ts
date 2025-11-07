/**
 * Maximum Subarray - Divide and Conquer Approach
 * 
 * Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
 * 
 * Example:
 *  Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 *  Output: 6
 *  Explanation: [4,-1,2,1] has the largest sum = 6.
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n) - due to recursion stack
 */

function maxSubArray(nums: number[]): number {
    if (nums.length === 0) return 0;
    return maxSubArrayDivideConquer(nums, 0, nums.length - 1);
}

/**
 * Divide and Conquer helper function
 * The maximum subarray can be in one of three places:
 * 1. Entirely in the left half
 * 2. Entirely in the right half  
 * 3. Crossing the middle (spanning both halves)
 */
function maxSubArrayDivideConquer(nums: number[], left: number, right: number): number {
    // Base case: single element
    if (left === right) {
        return nums[left]!;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    // Recursively find max in left and right halves
    const leftMax = maxSubArrayDivideConquer(nums, left, mid);
    const rightMax = maxSubArrayDivideConquer(nums, mid + 1, right);
    
    // Find max crossing subarray that spans the middle
    const crossMax = maxCrossingSubarray(nums, left, mid, right);
    
    // Return the maximum of the three possibilities
    return Math.max(leftMax, rightMax, crossMax);
}

/**
 * Find the maximum subarray that crosses the midpoint
 * This subarray must include nums[mid] and nums[mid + 1]
 */
function maxCrossingSubarray(nums: number[], left: number, mid: number, right: number): number {
    // Find max sum for left side (including mid)
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= left; i--) {
        sum += nums[i]!;
        leftSum = Math.max(leftSum, sum);
    }
    
    // Find max sum for right side (including mid + 1)
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i]!;
        rightSum = Math.max(rightSum, sum);
    }
    
    // Return combined sum
    return leftSum + rightSum;
}

// Kadane's Algorithm (O(n) solution for comparison)
function maxSubArrayKadane(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    let maxSoFar = nums[0]!;
    let maxEndingHere = nums[0]!;

    for (let i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i]!, maxEndingHere + nums[i]!);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

export { maxSubArray, maxSubArrayKadane };