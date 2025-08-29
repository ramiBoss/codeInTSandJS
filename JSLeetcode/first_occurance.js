/**
 * Finds the first occurrence of the `needle` string within the `haystack` string.
 *
 * @param {string} haystack The string to search within.
 * @param {string} needle The string to search for.
 * @returns {number} The starting index of the first occurrence of `needle` in `haystack`,
 * or -1 if `needle` is not found.
 */
const strStr = (haystack, needle) => {
    // --- Edge Cases ---

    // If needle is an empty string, it's considered to be found at index 0.
    if (needle.length === 0) {
        return 0;
    }

    // If haystack is shorter than needle, it's impossible to find needle.
    // Also covers cases where haystack is empty but needle is not.
    if (haystack.length < needle.length) {
        return -1;
    }

    // --- Brute-Force String Matching ---

    // Iterate through the haystack. The loop goes up to the point where
    // there's still enough space left in haystack to accommodate the needle.
    // For example, if haystack="abcde" and needle="cde",
    // needle.length is 3. The last possible starting index for 'c' is 2.
    // So, we loop from i = 0 up to haystack.length - needle.length.
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        let match = true; // Assume a match until proven otherwise

        // Inner loop: Compare the substring of haystack (starting at i)
        // with the entire needle.
        for (let j = 0; j < needle.length; j++) {
            // If characters don't match, it's not a match for this starting 'i'.
            if (haystack[i + j] !== needle[j]) {
                match = false; // Mark as no match
                break;         // Exit the inner loop, no need to check further characters
            }
        }

        // If the inner loop completed without finding any mismatches,
        // it means we found the needle.
        if (match) {
            return i; // Return the starting index 'i'
        }
    }

    // If the outer loop completes and no match was found, return -1.
    return -1;
};

console.log(strStr('butsad', 'sad'));     // Expected: 3
console.log(strStr('leetcode', 'leeto')); // Expected: -1
console.log(strStr('mississippi', 'pi'));  // Expected: 9
console.log(strStr('oookok', 'koko'));     // Expected: 2
console.log(strStr('hello', 'll'));       // Expected: 2
console.log(strStr('aaaaa', 'bba'));      // Expected: -1
console.log(strStr('', ''));              // Expected: 0
console.log(strStr('a', ''));             // Expected: 0
console.log(strStr('', 'a'));             // Expected: -1
