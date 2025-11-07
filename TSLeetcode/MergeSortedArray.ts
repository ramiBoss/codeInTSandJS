/**
 * Merge Sorted Array
 * Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
 * You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2. The number of elements initialized in nums1 and nums2 are m and n respectively.
 * 
 * Example 1:
 * Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * Output: [1,2,2,3,5,6]
 */

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1; // Pointer for nums1
    let j = n - 1; // Pointer for nums2
    let k = m + n - 1; // Pointer for merged array in nums1

    // Merge in reverse order
    while (i >= 0 && j >= 0) {
        if (nums1[i]! > nums2[j]!) {
            nums1[k--] = nums1[i--]!;
        } else {
            nums1[k--] = nums2[j--]!;
        }
    }

    // If there are remaining elements in nums2, copy them
    while (j >= 0) {
        nums1[k--] = nums2[j--]!;
    }   

}