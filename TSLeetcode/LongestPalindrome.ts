/**
 * Longest Palindrome
 * Given a string s, return the length of the longest palindrome that can be built with those letters.
 * Letters are case sensitive, for example, "Aa" is not considered a palindrome here.
 *
 * Example 1:
 * Input: s = "abccccdd"
 * Output: 7
 */

function longestPalindrome(s: string): number {
    const charCount: Record<string, number> = {};

    // Count occurrences of each character
    for (const char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    let length = 0;
    let hasOddCount = false;

    // Calculate the length of the longest palindrome
    for (const count of Object.values(charCount)) {
        if (count % 2 === 0) {
            length += count; // Even counts can be fully used
        } else {
            length += count - 1; // Use the even part of odd counts
            hasOddCount = true; // Mark that we have at least one odd count
        }
    }

    // If there's at least one character with an odd count, we can place one in the center
    if (hasOddCount) {
        length += 1;
    }

    return length;
}

export { longestPalindrome };