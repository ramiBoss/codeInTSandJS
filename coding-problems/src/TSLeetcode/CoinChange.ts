/**
 * Coin Change Problem - Dynamic Programming Approach
 * Given an array of coin denominations and a total amount, find the minimum number of coins needed to make up that amount.
 * If it's not possible to make the amount with the given coins, return -1.
 *
 * e.g. Input: coins = [1, 2, 5], amount = 11
 *      Output: 3
 *      Explanation: 11 = 5 + 5 + 1
 */

function coinChange(coins: number[], amount: number): number {
    // Create a dp array to store the minimum coins for each amount
    const dp = Array.from({ length: amount + 1 }, () => Infinity) as number[];
    dp[0] = 0; // Base case: 0 coins are needed to make amount 0

    // Fill the dp array
    for (let coin of coins) {
        for (let x = coin; x <= amount; x++) {
            dp[x] = Math.min(dp[x]!, dp[x - coin]! + 1);
        }
    }

    // If dp[amount] is still Infinity, it means it's not possible to form that amount
    return dp[amount] === Infinity ? -1 : dp[amount]!;
}

export { coinChange };