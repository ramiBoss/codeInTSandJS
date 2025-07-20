// Brute force solution for the Knapsack problem
export function knapsackBruteForce(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;

    function knapsackRec(index: number, remainingCapacity: number): number {
        if (index === n || remainingCapacity <= 0) {
            return 0;
        }
        // Exclude the current item
        const exclude = knapsackRec(index + 1, remainingCapacity);
        // Include the current item if it fits
        const include = weights[index] <= remainingCapacity ? values[index] + knapsackRec(index + 1, remainingCapacity - weights[index]) : 0;
        return Math.max(exclude, include);
    }

    return knapsackRec(0, capacity);
}

// Dynamic programming solution for the Knapsack problem
export function knapsackDP(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(capacity + 1).fill(0));
    for (let i = 0; i < n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], values[i] + dp[i - 1][w - weights[i]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n - 1][capacity];
}

// Space-optimized dynamic programming solution for the Knapsack problem
export function knapsackSpaceOptimized(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;
    const dp: number[] = Array(capacity + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }
    
    return dp[capacity];
}
// Fractional Knapsack problem using Greedy approach
export function fractionalKnapsack(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;
    const items = Array.from({ length: n }, (_, i) => ({ weight: weights[i], value: values[i], ratio: values[i] / weights[i] }));
    
    // Sort items by value-to-weight ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0;
    for (const item of items) {
        if (capacity <= 0) break;
        if (item.weight <= capacity) {
            totalValue += item.value;
            capacity -= item.weight;
        } else {
            totalValue += item.ratio * capacity; // Take the fraction of the item
            capacity = 0; // Knapsack is full
        }
    }
    
    return totalValue;
}


// 0/1 Knapsack problem using memoization
export function knapsackMemo(weights: number[], values: number[], capacity: number): number {
    const n = weights.length;
    const memo: Record<string, number> = {};

    function knapsackRec(index: number, remainingCapacity: number): number {
        if (index === n || remainingCapacity <= 0) {
            return 0;
        }
        const key = `${index}-${remainingCapacity}`;
        if (key in memo) {
            return memo[key];
        }
        // Exclude the current item
        const exclude = knapsackRec(index + 1, remainingCapacity);
        // Include the current item if it fits
        const include = weights[index] <= remainingCapacity ? values[index] + knapsackRec(index + 1, remainingCapacity - weights[index]) : 0;
        memo[key] = Math.max(exclude, include);
        return memo[key];
    }

    return knapsackRec(0, capacity);
}
// Unbounded Knapsack problem using dynamic programming
export function unboundedKnapsack(weights: number[], values: number[], capacity: number): number {
    const dp: number[] = Array(capacity + 1).fill(0);
    
    for (let w = 0; w <= capacity; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }
    
    return dp[capacity];
}