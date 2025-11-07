/**
 *  Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that
 *  i < j < k and nums[i] + nums[j] + nums[k] === 0.
 */

export const threeSum = (nums: number[]): number[][] => {
    const result: number[][] = [];
    nums.sort((a, b) => a - b); // Sort the array to use two-pointer technique

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates for the first number 
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            // @ts-ignore
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++; // Move left pointer to increase sum
            } else if (sum > 0) {
                right--; // Move right pointer to decrease sum
            } else {
                // @ts-ignore
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicates for the second number
                while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicates for the third number
                left++;
                right--;
            }
        }
    }
    return result;
};

