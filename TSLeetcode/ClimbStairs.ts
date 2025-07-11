/**
 * Calculates the number of distinct ways to climb a staircase with `n` steps
 * using a top-down recursive approach with memoization.
 *
 * At each step, you can climb either 1 or 2 steps.
 * This is a classic Fibonacci-style problem where:
 * ways(n) = ways(n - 1) + ways(n - 2)
 *
 * @param n - The total number of steps in the staircase.
 * @returns The number of distinct ways to reach the top.
 *
 * @example
 * ClimbStairs(5); // returns 8
 */
const ClimbStairs = (n: number): number => {
    const memo: number[] = [];

    const climb = (k: number): number => {
        if (k <= 1) {
            return 1;
        }
        if (memo[k] !== undefined) {
            return memo[k];
        }
        memo[k] = climb(k - 1) + climb(k - 2);
        return memo[k];
    };

    return climb(n);
};

/**
 * Calculates the number of distinct ways to climb a staircase with `n` steps
 * using a bottom-up dynamic programming approach.
 *
 * This iterative solution avoids recursion and builds the result from the base cases.
 * 
 * @param n - The total number of steps in the staircase.
 * @returns The number of distinct ways to reach the top.
 *
 * @example
 * ClimbStairsDP(5); // returns 8
 */
const ClimbStairsDP = (n: number): number => {
    if (n <= 1) {
        return 1;
    }

    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
};
