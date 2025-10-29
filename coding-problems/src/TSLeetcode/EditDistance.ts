// Edit Distance Problem
// Given two words word1 and word2, find the minimum number of operations required to convert word1 to word2.
// You have the following 3 operations permitted on a word:
// 1. Insert a character
// 2. Delete a character
// 3. Replace a character

// e.g. Input: word1 = "horse", word2 = "ros"
//      Output: 3
//      Explanation: 
//      horse -> rorse (replace 'h' with 'r')
//      rorse -> rose (remove 'r')
//      rose -> ros (remove 'e')

function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;
    
    // Create a 2D array with proper typing
    const dp = Array.from({ length: m + 1 }, () => 
        Array.from({ length: n + 1 }, () => 0)
    ) as number[][];

    // Initialize the base cases
    for (let i = 0; i <= m; i++) {
        dp[i]![0] = i; // Deleting all characters from word1
    }
    for (let j = 0; j <= n; j++) {
        dp[0]![j] = j; // Inserting all characters to word1 to form word2
    }

    // Fill the dp array
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i]![j] = dp[i - 1]![j - 1]!; // No operation needed
            } else {
                dp[i]![j] = Math.min(
                    dp[i - 1]![j]! + 1,    // Deletion
                    dp[i]![j - 1]! + 1,    // Insertion
                    dp[i - 1]![j - 1]! + 1 // Replacement
                );
            }
        }
    }

    // The edit distance is in the bottom-right cell
    return dp[m]![n]!;
}