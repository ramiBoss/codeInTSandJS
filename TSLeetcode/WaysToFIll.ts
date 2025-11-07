/**
 * Ways to Fill Slots with Single or Double Coverage
 * This function calculates the number of ways to fill slots with either single or double coverage.
 */

function waysToFillSlots(n: number): number {
    const MOD = 1000000007;
    if (n === 0 || n === 1) return 1; // Base cases: 1 way for 0 slots, 1 way for 1 slot

    let prev1 = 1; // dp[i-1], initialized with dp[1]
    let prev2 = 1; // dp[i-2], initialized with dp[0]
    let current = 0;

    for (let i = 2; i <= n; i++) {
        current = ((prev1 % MOD) + (prev2 % MOD)) % MOD; // Apply modulo at each step
        prev2 = prev1; // Move to next
        prev1 = current;
    }

    return current;
}

export { waysToFillSlots };