/**
 * But and Sell Stock with Cooldown
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 * 
 * 
 * Example 1:
 * Input: prices = [1,2,3,0,2]
 * Output: 3
 * Explanation: transactions = [buy, sell, cooldown, buy, sell]
 * 
 * Example 2:
 * Input: prices = [1]
 * Output: 0
 * Explanation: No transactions are done, max profit = 0.
 * 
 * Example 3:
 * Input: prices = [2,1,4]
 * Output: 3
 * Explanation: transactions = [buy, sell]
 * 
 * Example 4:
 * Input: prices = [1,2,4]
 * Output: 3
 * Explanation: transactions = [buy, sell]
 * 
 * Example 5:
 * Input: prices = [6,1,3,2,4,7]
 * Output: 6
 * Explanation: transactions = [buy, sell, cooldown, buy, sell]
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * 
 */


function maxProfit(prices: number[]): number {
    if (prices.length === 0) return 0;
    
    let hold = -prices[0]!; // Max profit when holding a stock
    let sold = 0;           // Max profit when just sold a stock
    let rest = 0;           // Max profit when in cooldown or doing nothing
    
    for (let i = 1; i < prices.length; i++) {
        const prevHold = hold;
        const prevSold = sold;
        const prevRest = rest;
        
        // Update hold: either keep holding or buy today
        hold = Math.max(prevHold, prevRest - prices[i]!);
        
        // Update sold: sell the stock held until yesterday
        sold = prevHold + prices[i]!;
        
        // Update rest: either stay in rest or come from sold state
        rest = Math.max(prevRest, prevSold);
    }
    
    // The maximum profit will be in either sold or rest state
    return Math.max(sold, rest);
}

export { maxProfit };