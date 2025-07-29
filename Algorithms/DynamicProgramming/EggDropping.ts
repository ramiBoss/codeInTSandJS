/*
Egg Dropping Puzzle
You are given k eggs and a building with n floors, and you need to find the highest floor from which you can drop an egg without breaking it.
You can drop the egg from any floor, and if it breaks, you can no longer use it.
You want to minimize the number of drops in the worst-case scenario.

Example input:
const n = 100; // Number of floors
const k = 2;   // Number of eggs
const result = eggDropping(n, k);
console.log(result); // Output: Minimum number of drops required in the worst case

//pseudo code explanation:
1. Create a 2D array dp where dp[i][j] represents the minimum number of drops required with i eggs and j floors.
2. Initialize base cases:
   - If there are 0 floors, 0 drops are needed.
   - If there is 1 floor, 1 drop is needed.
   - If there is 1 egg, j drops are needed for j floors.
3. Fill the dp table using the recurrence relation:
   - For each egg and each floor, calculate the minimum number of drops required by trying all possible floors to drop from.
   - Use the maximum of the two scenarios (egg breaks or does not break) to find the worst-case scenario.
4. Return dp[k][n], which gives the minimum number of drops required with k eggs and n floors.

This implementation has a time complexity of O(k * n^2) and space complexity of O(k * n).
*/

export function eggDropping(n: number, k: number): number {
    // Create a 2D array to store results of subproblems
    const dp: number[][] = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
    
    // Base cases
    for (let i = 1; i <= k; i++) {
        dp[i][0] = 0; // 0 floors require 0 drops
        dp[i][1] = 1; // 1 floor requires 1 drop
    }
    for (let j = 1; j <= n; j++) {
        dp[1][j] = j; // 1 egg requires j drops for j floors
    }

    // Fill the DP table
    for (let i = 2; i <= k; i++) {
        for (let j = 2; j <= n; j++) {
            dp[i][j] = Number.MAX_SAFE_INTEGER;
            for (let x = 1; x <= j; x++) {
                // Calculate the worst-case number of drops
                const worstCase = 1 + Math.max(dp[i - 1][x - 1], dp[i][j - x]);
                dp[i][j] = Math.min(dp[i][j], worstCase);
            }
        }
    }

    return dp[k][n];
}