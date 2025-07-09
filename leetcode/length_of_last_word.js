/**
 * Calculates the length of the last word in a string.
 * Handles leading/trailing spaces and multiple spaces between words.
 *
 * @param {string} s The input string.
 * @returns {number} The length of the last word, or 0 if no word is found.
 */
const lengthOfLastWord_TrimSplit = (s) => {
    // 1. Trim leading and trailing spaces. This is crucial as `split(' ')`
    //    on "  hello  " would give ["", "", "hello", "", ""]. Trimming first
    //    gives "hello", then split gives ["hello"], simplifying filter needs.
    //    It also handles strings with only spaces gracefully by turning them into an empty string.
    const trimmedString = s.trim();

    // Edge case: If the string becomes empty after trimming, there are no words.
    if (trimmedString.length === 0) {
        return 0;
    }

    // 2. Split the trimmed string by one or more spaces using a regular expression.
    //    `/\s+/` matches one or more whitespace characters. This automatically handles
    //    multiple spaces between words and avoids empty strings in the result array.
    const words = trimmedString.split(/\s+/);

    // 3. Get the last word from the resulting array and return its length.
    //    Since we trimmed and used `/\s+/`, the array `words` will never be empty
    //    if `trimmedString` was not empty.
    const lastWord = words[words.length - 1];
    return lastWord.length;
};

console.log("\n--- Approach 1: Trim and Split ---");
console.log(`"Hello Word": ${lengthOfLastWord_TrimSplit("Hello Word")} (Expected: 4)`);
console.log(`" fly me   to   the moon   ": ${lengthOfLastWord_TrimSplit(" fly me   to   the moon   ")} (Expected: 4)`);
console.log(`"a": ${lengthOfLastWord_TrimSplit("a")} (Expected: 1)`);
console.log(`"": ${lengthOfLastWord_TrimSplit("")} (Expected: 0)`);
console.log(`"   ": ${lengthOfLastWord_TrimSplit("   ")} (Expected: 0)`);
console.log(`"  Hello  ": ${lengthOfLastWord_TrimSplit("  Hello  ")} (Expected: 5)`);
console.log(`"Last": ${lengthOfLastWord_TrimSplit("Last")} (Expected: 4)`);
console.log(`"Hello World": ${lengthOfLastWord_TrimSplit("Hello World")} (Expected: 5)`);


/**
 * Calculates the length of the last word in a string by iterating backwards.
 * This is the most efficient approach as it avoids creating intermediate arrays.
 *
 * @param {string} s The input string.
 * @returns {number} The length of the last word, or 0 if no word is found.
 */
const lengthOfLastWord_Backwards = (s) => {
    let length = 0;
    let foundWord = false; // Flag to indicate if we've started counting a word

    // Iterate from the end of the string backwards
    for (let i = s.length - 1; i >= 0; i--) {
        const char = s[i];

        if (char !== ' ') {
            // If it's a non-space character, increment length and set flag
            length++;
            foundWord = true;
        } else {
            // If it's a space:
            if (foundWord) {
                // If we were already counting a word (i.e., we just finished a word),
                // then this space signifies the end of the last word.
                return length;
            }
            // If `foundWord` is false, it means we are still in leading/trailing spaces
            // or multiple spaces before the actual last word. Just continue.
        }
    }

    // If the loop finishes, it means the string started with a word and ended there,
    // or the whole string was a single word. In either case, `length` holds the result.
    // Example: "Hello" -> loop counts 5, then finishes.
    return length;
};

console.log("\n--- Approach 2: Iterate Backwards (Most Efficient) ---");
console.log(`"Hello Word": ${lengthOfLastWord_Backwards("Hello Word")} (Expected: 4)`);
console.log(`" fly me   to   the moon   ": ${lengthOfLastWord_Backwards(" fly me   to   the moon   ")} (Expected: 4)`);
console.log(`"a": ${lengthOfLastWord_Backwards("a")} (Expected: 1)`);
console.log(`"": ${lengthOfLastWord_Backwards("")} (Expected: 0)`);
console.log(`"   ": ${lengthOfLastWord_Backwards("   ")} (Expected: 0)`);
console.log(`"  Hello  ": ${lengthOfLastWord_Backwards("  Hello  ")} (Expected: 5)`);
console.log(`"Last": ${lengthOfLastWord_Backwards("Last")} (Expected: 4)`);
console.log(`"Hello World": ${lengthOfLastWord_Backwards("Hello World")} (Expected: 5)`);
