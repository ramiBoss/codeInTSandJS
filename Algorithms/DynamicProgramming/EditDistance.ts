/*
    Edit Distance (Levenshtein Distance) implementation in TypeScript
    - The edit distance between two strings is the minimum number of operations required to transform one string into the other.
    - Operations include insertion, deletion, and substitution of characters.
    - This implementation uses dynamic programming to compute the edit distance.

    example input:
    const str1 = "kitten";
    const str2 = "sitting";
    const distance = editDistance(str1, str2);
    console.log(distance); // Output: 3

    This implementation has a time complexity of O(m * n) and space complexity of O(m * n), where m and n are the lengths of the two strings.
*/

export function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    // Create a 2D array (m+1) x (n+1)
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i; // Deleting all characters from word1
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j; // Inserting all characters into word1
    }

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // Characters match
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],    // Delete
                    dp[i][j - 1],    // Insert
                    dp[i - 1][j - 1] // Replace
                );
            }
        }
    }

    return dp[m][n];
}