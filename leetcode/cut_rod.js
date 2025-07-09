/*
 * The Rod Cutting Problem: Given a rod of length 'n' and a table of prices `prices[i]`
 * for rods of length `i+1` (where `i` is the array index),
 * determine the maximum revenue obtainable by cutting up the rod and selling the pieces.
 */

// Define the price list (price[i] is the price for a rod of length i+1)
// For example, priceList[0] is price for length 1, priceList[1] for length 2, etc.
const priceList = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30]; // prices for lengths 1 to 10

// 1. Simple Recursive Solution (Brute Force)
// This approach explores all possible ways to cut the rod.
// It has overlapping subproblems and optimal substructure, making it suitable for DP.
/**
 * Computes the maximum revenue obtainable from a rod of length 'n' using a
 * pure recursive (brute-force) approach.
 *
 * @param {number} n - The length of the rod.
 * @param {number[]} prices - An array where prices[i] is the price for a rod of length i+1.
 * @returns {number} The maximum revenue.
 */
const cutRodRecursive = (n, prices) => {
    // Base case: If the rod length is 0, no revenue can be obtained.
    if (n === 0) {
        return 0;
    }

    let maxRevenue = Number.MIN_VALUE; // Initialize maxRevenue to a very small number

    // Iterate through all possible first cuts (from length 1 up to 'n')
    // A cut of length 'i' (actual length, not index) means using prices[i-1]
    for (let i = 1; i <= n; i++) {
        // Calculate the price of the current piece (length 'i')
        // Ensure i-1 is a valid index for prices array
        const currentPiecePrice = prices[i - 1];

        // Recursively find the max revenue for the remaining part of the rod (n - i)
        // Add the current piece's price to it and update maxRevenue if this is better.
        // We ensure that we only consider cuts where prices[i-1] exists
        if (i - 1 < prices.length) { // Check if the price for this length exists
            maxRevenue = Math.max(maxRevenue, currentPiecePrice + cutRodRecursive(n - i, prices));
        }
    }
    return maxRevenue;
};

// 2. Dynamic Programming Solution: Top-Down Approach (Memoization)
// This approach uses recursion but stores the results of subproblems
// to avoid re-calculating them.
/**
 * Computes the maximum revenue obtainable from a rod of length 'n' using a
 * top-down dynamic programming (memoization) approach.
 *
 * @param {number} n - The length of the rod.
 * @param {number[]} prices - An array where prices[i] is the price for a rod of length i+1.
 * @param {number[]} memo - An array to store computed results of subproblems (initialized with -1 or undefined).
 * @returns {number} The maximum revenue.
 */
const cutRodDPTopDown = (n, prices, memo) => {
    // Base case: If the rod length is 0, no revenue can be obtained.
    if (n === 0) {
        return 0;
    }

    // If the result for length 'n' has already been computed and stored in memo, return it.
    if (memo[n] !== undefined) { // Check for undefined, not just truthy (0 could be a valid result)
        return memo[n];
    }

    let maxRevenue = Number.MIN_VALUE;

    // Iterate through all possible first cuts (from length 1 up to 'n')
    for (let i = 1; i <= n; i++) {
        // Check if the price for this length (i) exists in our prices array.
        // The index for length 'i' is `i-1`.
        if (i - 1 < prices.length) {
            maxRevenue = Math.max(maxRevenue, prices[i - 1] + cutRodDPTopDown(n - i, prices, memo));
        }
    }

    // Store the computed maximum revenue for length 'n' in the memoization table.
    memo[n] = maxRevenue;
    return maxRevenue;
};

// 3. Dynamic Programming Solution: Bottom-Up Approach (Tabulation)
// This approach builds up the solution from the smallest subproblems to the largest.
/**
 * Computes the maximum revenue obtainable from a rod of length 'n' using a
 * bottom-up dynamic programming (tabulation) approach.
 *
 * @param {number} n - The length of the rod.
 * @param {number[]} prices - An array where prices[i] is the price for a rod of length i+1.
 * @returns {number} The maximum revenue.
 */
const cutRodDPBottomUp = (n, prices) => {
    // Create a `dp` array where `dp[i]` will store the maximum revenue
    // for a rod of length `i`.
    // Initialize `dp[0]` to 0, as a rod of length 0 yields no revenue.
    const dp = new Array(n + 1).fill(0);

    // Iterate for each rod length from 1 up to 'n'.
    // `i` represents the current rod length we are trying to find the max revenue for.
    for (let i = 1; i <= n; i++) {
        let maxRevenueForCurrentLength = Number.MIN_VALUE;

        // For each length `i`, consider all possible first cuts `j`.
        // `j` represents the length of the first piece we cut (from 1 to `i`).
        for (let j = 1; j <= i; j++) {
            // Check if the price for length 'j' exists in our prices array.
            // The index for length 'j' is `j-1`.
            if (j - 1 < prices.length) {
                // `prices[j-1]` is the revenue from the first piece of length `j`.
                // `dp[i - j]` is the maximum revenue from the remaining rod of length `i - j`.
                maxRevenueForCurrentLength = Math.max(
                    maxRevenueForCurrentLength,
                    prices[j - 1] + dp[i - j]
                );
            }
        }
        // Store the maximum revenue found for the current rod length `i`.
        dp[i] = maxRevenueForCurrentLength;
    }

    // The maximum revenue for the original rod length 'n' is stored at dp[n].
    return dp[n];
};

// --- Test Cases ---
const prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30]; // prices for lengths 1 to 10
const rodLength = 4; // Example rod length

console.log(`Rod length: ${rodLength}`);
console.log(`Prices: ${prices}`);

console.log("\n--- Recursive Solution ---");
// The `cutRod` function will need `prices` as an argument.
// Ensure the `priceList` matches rod lengths (price for length 1 at index 0, etc.)
// For n=4, prices are [1, 5, 8, 9] (for lengths 1, 2, 3, 4)
// Correct calculation:
// cutRod(4) = max(prices[0] + cutRod(3), prices[1] + cutRod(2), prices[2] + cutRod(1), prices[3] + cutRod(0))
// = max(1 + 8, 5 + 5, 8 + 1, 9 + 0)
// = max(9, 10, 9, 9) = 10
// The initial recursive code will use priceList[i] for length i+1.
// Your original `for (let i = 0; i < n; i++)` loop iterates `i` from `0` to `n-1`.
// When `i=0`, it uses `priceList[0]` for length `lengthList[0]`, which is 1. `n - lengthList[0]`
// This needs to align: `priceList[i]` is for `i+1` length.
// The loop should represent the actual length of the cut piece.

console.log(`Recursive Result for n=${rodLength}: ${cutRodRecursive(rodLength, prices)}`); // Expected: 10


console.log("\n--- Dynamic Programming: Top-Down (Memoization) ---");
const memoTable = new Array(rodLength + 1).fill(undefined); // Initialize memo table
console.log(`DP Top-Down Result for n=${rodLength}: ${cutRodDPTopDown(rodLength, prices, memoTable)}`); // Expected: 10
// console.log("Memo Table:", memoTable); // For debugging: will show computed values

console.log("\n--- Dynamic Programming: Bottom-Up (Tabulation) ---");
console.log(`DP Bottom-Up Result for n=${rodLength}: ${cutRodDPBottomUp(rodLength, prices)}`); // Expected: 10

// Example for rodLength = 8 (from CLRS book example)
const pricesCLRS = [1, 5, 8, 9, 10, 17, 17, 20]; // prices for lengths 1 to 8
const rodLengthCLRS = 8;
console.log(`\n--- CLRS Example (n=8) ---`);
console.log(`Prices: ${pricesCLRS}`);
console.log(`Recursive Result for n=${rodLengthCLRS}: ${cutRodRecursive(rodLengthCLRS, pricesCLRS)}`); // Expected: 22 (from 2 cuts of 4, or 10+10 for n=8)
const memoCLRS = new Array(rodLengthCLRS + 1).fill(undefined);
console.log(`DP Top-Down Result for n=${rodLengthCLRS}: ${cutRodDPTopDown(rodLengthCLRS, pricesCLRS, memoCLRS)}`); // Expected: 22
console.log(`DP Bottom-Up Result for n=${rodLengthCLRS}: ${cutRodDPBottomUp(rodLengthCLRS, pricesCLRS)}`); // Expected: 22
