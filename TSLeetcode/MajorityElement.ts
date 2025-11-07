/**
 * Majority Element
 * 
 * Given an array nums of size n, return the majority element.
 * The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
 * 
 * Example 1:
 * Input: nums = [3,2,3]
 * Output: 3
 *
 * Example 2:
 * Input: nums = [2,2,1,1,1,2,2]
 * Output: 2 
 */


function majorityElement(nums: number[]): number {
    const countMap: Record<number, number> = {};
    const majorityCount = Math.floor(nums.length / 2);

    for (const num of nums) {
        countMap[num] = (countMap[num] || 0) + 1;

        if (countMap[num] > majorityCount) {
            return num;
        }
    }

    // Since the problem guarantees a majority element, this line should never be reached.
    throw new Error("No majority element found");
}


// Let's do with O(1) space using Boyer-Moore Voting Algorithm
function majorityElementBoyerMoore(nums: number[]): number {
    let count = 0;
    let candidate: number | null = null;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    return candidate!;
}

export { majorityElement, majorityElementBoyerMoore };