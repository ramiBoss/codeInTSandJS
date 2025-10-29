/**
 * Egg Dropping Problem - Dynamic Programming Approach
 * Given n eggs and k floors, find the minimum number of attempts needed in the worst case to find the highest floor from which an egg can be dropped without breaking.
 * You can use the same egg multiple times if it doesn't break.
 *
 * e.g. Input: n = 2, k = 10
 *      Output: 4
 *      Explanation:
 *     Drop from floor 4:
 *          If it breaks, drop from floors 1, 2, 3 (3 attempts)
 *          If it doesn't break, drop from floors 5, 6, 7, 8, 9, 10 (4 attempts)
 *      The worst case is 4 attempts.
 */


function superEggDrop(n: number, k: number): number {
    // Create a 2D array to store results of subproblems
    const dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: k + 1 }, () => 0)
    ) as number[][];

    // Base cases:
    // 1. One egg: We need to try each floor from 1 to k
    for (let j = 1; j <= k; j++) {
        dp[1]![j] = j;
    }

    // 2. Zero floors: Zero attempts needed
    // 3. One floor: One attempt needed
    for (let i = 1; i <= n; i++) {
        dp[i]![0] = 0;
        dp[i]![1] = 1;
    }

    // Fill the rest of the dp table
    for (let i = 2; i <= n; i++) {
        for (let j = 2; j <= k; j++) {
            dp[i]![j] = Infinity;
            for (let x = 1; x <= j; x++) {
                const worstCase = 1 + Math.max(dp[i - 1]![x - 1]!, dp[i]![j - x]!);
                dp[i]![j] = Math.min(dp[i]![j]!, worstCase);
            }
        }
    }

    // The answer is in the bottom-right cell
    return dp[n]![k]!;
}