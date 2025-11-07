/**
 * Word Break
 * https://leetcode.com/problems/word-break/
 * 
 * Given a string s and a dictionary of strings wordDict, return true if s 
 * can be segmented into a space-separated sequence of dictionary words.
 * 
 * Example:
 * Input: s = "leetcode", wordDict = ["leet","code"]
 * Output: true (can be segmented as "leet code")
 * 
 * Time Complexity: O(n² * m) where n = s.length, m = avg word length
 * Space Complexity: O(n + k) where k = number of words in dict
 */


function wordBreak(s: string, wordDict: string[]): boolean {
    const wordSet = new Set(wordDict);
    const dp: boolean[] = Array(s.length + 1).fill(false);
    dp[0] = true; // Empty string can be segmented

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            const substring = s.substring(j, i);
            if (dp[j] && wordSet.has(substring)) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length]!;
}

// Recursive approach with memoization (alternative solution)
function wordBreakRecursive(s: string, wordDict: string[]): boolean {
    const wordSet = new Set(wordDict);
    const memo = new Map<number, boolean>();
    
    function canBreak(start: number): boolean {
        if (start === s.length) return true;
        if (memo.has(start)) return memo.get(start)!;
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word) && canBreak(end)) {
                memo.set(start, true);
                return true;
            }
        }
        
        memo.set(start, false);
        return false;
    }
    
    return canBreak(0);
}

export { wordBreak, wordBreakRecursive };