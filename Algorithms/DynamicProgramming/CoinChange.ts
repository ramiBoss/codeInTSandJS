// Coin Change Problem
// This function calculates the minimum number of coins needed to make a given amount
/**
 * Coin Change Problem
 * 
 * Pseudo code:
 * 1. Create dp array of size amount + 1, initialize with Infinity
 * 2. Set dp[0] = 0 (base case)
 * 3. For each coin:
 *    - For each amount from coin to target amount:
 *      - dp[amount] = min(dp[amount], dp[amount - coin] + 1)
 * 4. Return dp[amount] if not Infinity, else return -1
 */
export function coinChange(coins: number[], amount: number): number {
    // Create an array to store minimum coins needed for each amount from 0 to target amount
    // Initially fill it with Infinity as we don't know the solution yet
    const dp: number[] = Array(amount + 1).fill(Infinity);

    // Base case: it takes 0 coins to make amount 0
    dp[0] = 0;

    // Try each coin one by one
    for (const coin of coins) {
        // For each amount from the coin value up to target amount
        for (let i = coin; i <= amount; i++) {
            // For current amount, check if using this coin gives a better solution
            // We add 1 to dp[i - coin] because we're using one more coin
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    // If dp[amount] is still Infinity, it means we couldn't make the amount
    // Otherwise, return the minimum number of coins needed
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Detailed dry run showing the process for each coin
// Example: coins = [1, 2, 5], amount = 11

// Starting with coin = 1:
// dp[0] = 0 (base case)
// dp[1] = min(dp[1], dp[0] + 1) = min(∞, 0 + 1) = 1
// dp[2] = min(dp[2], dp[1] + 1) = min(∞, 1 + 1) = 2
// dp[3] = min(dp[3], dp[2] + 1) = min(∞, 2 + 1) = 3
// ... continues until dp[11]

// After coin = 2:
// dp[2] = min(dp[2], dp[0] + 1) = min(2, 0 + 1) = 1
// dp[3] = min(dp[3], dp[1] + 1) = min(3, 1 + 1) = 2
// dp[4] = min(dp[4], dp[2] + 1) = min(4, 1 + 1) = 2
// ... continues until dp[11]

// After coin = 5:
// dp[5] = min(dp[5], dp[0] + 1) = min(5, 0 + 1) = 1
// dp[6] = min(dp[6], dp[1] + 1) = min(3, 1 + 1) = 2
// dp[7] = min(dp[7], dp[2] + 1) = min(4, 1 + 1) = 2
// dp[8] = min(dp[8], dp[3] + 1) = min(5, 2 + 1) = 3
// dp[9] = min(dp[9], dp[4] + 1) = min(6, 2 + 1) = 3
// dp[10] = min(dp[10], dp[5] + 1) = min(5, 1 + 1) = 2
// dp[11] = min(dp[11], dp[6] + 1) = min(6, 2 + 1) = 3

// Final dp array after processing all coins:
// [0,1,1,2,2,1,2,2,3,3,2,3]
// Result: dp[11] = 3 coins (can be achieved using 5+5+1)

// Recursive solution for Coin Change Problem
/**
 * Recursive solution with memoization for the Coin Change Problem
 * 
 * Pseudo code:
 * 1. Create a memo object to store already computed results
 * 2. Define helper function that takes remaining amount:
 *    - If remaining < 0, return Infinity (invalid case)
 *    - If remaining = 0, return 0 (base case)
 *    - If result in memo, return memoized result
 *    - For each coin:
 *      - Recursively calculate min coins needed for (remaining - coin)
 *      - Update minCoins if better solution found
 *    - Store result in memo and return
 * 3. Return -1 if no solution found, else return minimum coins
 */
export function coinChangeRecursive(coins: number[], amount: number): number {
    // Memoization cache to store results of subproblems
    const memo: Record<number, number> = {};
    
    function helper(remaining: number): number {
        if (remaining < 0) return Infinity; // Invalid case
        if (remaining === 0) return 0; // Base case
        if (memo[remaining] !== undefined) return memo[remaining]; // Use cached result
        
        let minCoins = Infinity;
        // Try each coin and take minimum of all possibilities
        for (const coin of coins) {
            const res = helper(remaining - coin);
            if (res !== Infinity) {
                minCoins = Math.min(minCoins, res + 1);
            }
        }
        
        memo[remaining] = minCoins; // Cache result for future use
        return minCoins;
    }
    
    const result = helper(amount);
    return result === Infinity ? -1 : result;
}
// Space-optimized dynamic programming solution for Coin Change Problem
export function coinChangeSpaceOptimized(coins: number[], amount: number): number {
    const dp: number[] = Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins are needed to make amount 0
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}