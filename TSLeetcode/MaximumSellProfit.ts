// Maximum Single Sell Profit (Stock Buy and Sell). Dynamic Programming Approach
// This function calculates the maximum profit that can be achieved by buying and selling a stock once.
// It iterates through the prices, keeping track of the minimum price seen so far and calculating the maximum profit possible.
/**
 * Calculates the maximum profit that can be obtained by buying and selling a stock once.
 * Uses dynamic programming approach to find the optimal trading strategy.
 * 
 * @param prices - An array of stock prices where prices[i] represents the price on day i
 * @returns The maximum profit that can be achieved from a single buy-sell transaction.
 *          Returns 0 if no profit is possible or if less than 2 prices are provided.
 * 
 * @example
 * ```typescript
 * maxProfit([7,1,5,3,6,4]) // returns 5
 * maxProfit([7,6,4,3,1]) // returns 0
 * ```
 * 
 * @complexity
 * Time complexity: O(n²) where n is the length of prices array
 * Space complexity: O(n) for the dp array
 */


export function maxProfit(prices: number[]): number {
    if (prices.length < 2) return 0;
    
    const dp: number[] = new Array(prices.length).fill(0);
    
    // dp[i] represents the maximum profit that can be obtained up to day i
    for (let i = 1; i < prices.length; i++) {
        // Previous day's profit plus any potential profit from today's transaction
        dp[i] = Math.max(
            dp[i-1]!, // Don't make any transaction today
            prices[i]! - Math.min(...prices.slice(0, i)) // Make a transaction today
        );
    }
    
    return dp[prices.length - 1]!;
}

// Example usage:
const prices = [7, 1, 5, 3, 6, 4];
console.log(maxProfit(prices)); // Output: 5 (Buy at 1 and sell at 6)

/**
 * Alternative solution using single pass approach
 * @param prices - Array of stock prices
 * @returns Maximum profit possible
 * 
 * @complexity
 * Time complexity: O(n) where n is the length of prices array
 * Space complexity: O(1)
 */
export function maxProfitSinglePass(prices: number[]): number {
    if (prices.length < 2) return 0;
    
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        minPrice = Math.min(minPrice!, prices[i]!);
        maxProfit = Math.max(maxProfit, prices[i]! - minPrice);
    }

    return maxProfit;
}

// Comparison of the two approaches:
// 1. maxProfit (Dynamic Programming):
//    - Time: O(n²) due to slice operation
//    - Space: O(n) for dp array
//    - More complex implementation
//    - Less efficient for large inputs

// 2. maxProfitSinglePass:
//    - Time: O(n) single pass
//    - Space: O(1) constant
//    - Simpler implementation
//    - More efficient overall

// Therefore, maxProfitSinglePass is the better solution in most cases
// due to better time complexity and space efficiency.

// Example comparing performance:
const testPrices = Array.from({length: 10000}, () => Math.floor(Math.random() * 100));

console.time('DP Approach');
maxProfit(testPrices);
console.timeEnd('DP Approach');

console.time('Single Pass');
maxProfitSinglePass(testPrices);
console.timeEnd('Single Pass');