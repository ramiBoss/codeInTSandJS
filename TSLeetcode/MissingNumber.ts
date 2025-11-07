/**
 * Missing Number
 * Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, 
 * find the one that is missing from the array.
 * 
 * Example 1:
 * Input: [3,0,1]
 * Output: 2
 * 
 * Example 2:
 * Input: [0,1]
 * Output: 2
 */


function missingNumber(nums: number[]): number {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, num) => acc + num, 0); // Sum of elements in the array
    return expectedSum - actualSum;
}

/**
 * 
 * Bit Manipulation Approach
 * The idea is to use XOR operation. XOR of a number with itself is 0 and 
 * XOR of a number with 0 is the number itself. Thus, if we XOR all indices 
 * and all numbers together, the missing number will be the result.
 * @param nums 
 * @returns 
 */
function missingNumberBitManipulation(nums: number[]): number {
    let missing = nums.length; // Start with n
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i]!; // XOR index and value
    }
    return missing;
}


export { missingNumber, missingNumberBitManipulation };