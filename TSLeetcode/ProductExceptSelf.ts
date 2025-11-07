/**
 * Product Except Self
 * https://leetcode.com/problems/product-of-array-except-self/
 * 
 * Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
 */


function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const answer: number[] = new Array(n).fill(1);
    
    // Calculate left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = leftProduct;
        leftProduct *= nums[i]!;
    }
    
    // Calculate right products and multiply with left products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i]! *= rightProduct;
        rightProduct *= nums[i]!;
    }
    
    return answer;
}

export { productExceptSelf };