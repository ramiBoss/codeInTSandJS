// Initialize a memoization array outside the function to store computed results.
// This allows the results to persist across recursive calls.
// Using an array here is suitable since 'n' will be a non-negative integer,
// directly mapping to array indices.
const memo = [];

/**
 * Calculates the number of distinct ways to climb 'n' stairs using a top-down (recursive) approach with memoization.
 *
 * @param {number} n The total number of stairs to climb.
 * @returns {number} The number of distinct ways to climb 'n' stairs.
 */
const climbStairs = (n) => {
    // Base case 1: If there are 0 or 1 stairs, there's only one way to climb them.
    // For n=0, it represents the starting point, and for n=1, taking one step.
    if (n <= 1) {
        return 1;
    }

    // Check if the result for 'n' has already been computed and stored in the memo array.
    // If it has, return the stored result to avoid redundant calculations.
    if (memo[n]) {
        return memo[n];
    }

    // Recursive step: If the result is not memoized, compute it.
    // The number of ways to climb 'n' stairs is the sum of:
    // 1. Ways to climb (n-1) stairs (by taking 1 step from n-1)
    // 2. Ways to climb (n-2) stairs (by taking 2 steps from n-2)
    memo[n] = climbStairs(n - 1) + climbStairs(n - 2);

    // Store the computed result in the memo array before returning it.
    return memo[n];
};

// Example usage of the top-down approach:
// console.log(climbStairs(45)); // Uncomment to test with a larger number


/**
 * Calculates the number of distinct ways to climb 'n' stairs using a bottom-up (iterative) approach.
 * This method builds up the solution from the smallest subproblems.
 *
 * @param {number} n The total number of stairs to climb.
 * @returns {number} The number of distinct ways to climb 'n' stairs.
 */
const climbStairsBU = (n) => {
    // Edge case: If n is 0, there's 1 way (doing nothing).
    if (n === 0) {
        return 1;
    }
    // Edge case: If n is 1, there's 1 way (take one step).
    if (n === 1) {
        return 1;
    }

    // Initialize a memoization array (often called 'dp' table in dynamic programming)
    // to store the number of ways to reach each stair.
    const memo = new Array(n + 1);

    // Base cases:
    // There's 1 way to reach stair 0 (by being at the starting point).
    memo[0] = 1;
    // There's 1 way to reach stair 1 (by taking one step from stair 0).
    memo[1] = 1;

    // Iterate from the 2nd stair up to 'n' stairs.
    // For each stair 'i', the number of ways to reach it is the sum of:
    // - Ways to reach stair (i-1) and then take 1 step.
    // - Ways to reach stair (i-2) and then take 2 steps.
    for (let i = 2; i <= n; i++) {
        memo[i] = memo[i - 1] + memo[i - 2];
    }

    // Optionally, you can log the entire memo array to see the computed ways for each step.
    // console.log(memo);

    // The result for 'n' stairs is stored at memo[n].
    return memo[n];
};

// Example usage of the bottom-up approach:
console.log(`Ways to climb 3 stairs (BU): ${climbStairsBU(3)}`); // Output: 3
console.log(`Ways to climb 5 stairs (BU): ${climbStairsBU(5)}`); // Output: 8
