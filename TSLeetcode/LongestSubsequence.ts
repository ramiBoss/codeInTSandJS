// Length of the longest subsequence that increases before decreasing.

export function longestSubsequence(nums: number[]): number {
    if (nums.length === 0) return 0;

    const n = nums.length;
    const dp: number[] = new Array(n).fill(1); // dp[i] will hold the length of the longest increasing subsequence ending at index i

    // Calculate the longest increasing subsequence
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i]! > nums[j]!) {
                dp[i] = Math.max(dp[i]!, dp[j]! + 1);
            }
        }
    }

    // Find the maximum length of the increasing subsequence
    let maxLength = 0;
    for (let i = 0; i < n; i++) {
        maxLength = Math.max(maxLength, dp[i]!);
    }

    return maxLength;
}