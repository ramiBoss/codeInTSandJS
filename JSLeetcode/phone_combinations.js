/**
 * @constant {string[]} keypad - A mapping from digit (index) to its corresponding letters.
 * Indices 0 and 1 are intentionally empty as typical phone keypads
 * do not map letters to 0 or 1.
 */
const keypad = [
    '',      // 0
    '',      // 1
    'abc',   // 2
    'def',   // 3
    'ghi',   // 4
    'jkl',   // 5
    'mno',   // 6
    'pqrs',  // 7
    'tuv',   // 8
    'wxyz'   // 9
];

/**
 * Generates all possible letter combinations that a given string of digits can represent.
 * This function initiates the recursive backtracking process.
 *
 * Time Complexity: O(4^N * N)
 * - N is the number of digits in the input string.
 * - 4 represents the maximum number of letters a digit can map to (e.g., '7' maps to 'pqrs').
 * - The `* N` factor comes from string concatenation (`strSet + char`) in each recursive call,
 * which creates a new string of length up to N.
 * Space Complexity: O(N) for recursion stack depth and O(4^N * N) for storing the results.
 *
 * @param {string} digits - A string containing digits from '2' to '9' inclusive.
 * @returns {string[]} An array of all possible letter combinations.
 * Returns an empty array if the input `digits` string is empty.
 */
const phoneCombinations = (digits) => {
    // Handle the base case where no digits are provided.
    // An empty input string results in an empty list of combinations.
    if (digits.length === 0) {
        return [];
    }

    // `resultCombinations` will store all the generated valid letter combinations.
    const resultCombinations = [];

    // Start the recursive backtracking process.
    // - `currentCombination`: The combination string built so far (initially empty).
    // - `digitIndex`: The index of the digit in the `digits` string currently being processed (starts at 0).
    // - `digits`: The original input string of digits.
    // - `resultCombinations`: The array to which completed combinations are pushed.
    combinationRecurse('', 0, digits, resultCombinations);

    return resultCombinations;
};

/**
 * A recursive helper function to build letter combinations using backtracking.
 * It explores all possible paths to form combinations based on the `keypad` mapping.
 *
 * @param {string} currentCombination - The letter combination string built up to the current point.
 * @param {number} digitIndex - The current index of the digit being processed in the `digits` string.
 * @param {string} digits - The original input string of digits.
 * @param {string[]} resultCombinations - The array to store all the valid combinations found.
 */
const combinationRecurse = (currentCombination, digitIndex, digits, resultCombinations) => {
    // Base Case: If we have processed all digits in the input string,
    // it means a complete letter combination has been formed.
    if (digitIndex === digits.length) {
        resultCombinations.push(currentCombination); // Add the completed combination to the result set.
        return; // Backtrack to the previous recursive call.
    }

    // Get the numeric value of the current digit.
    // Using `parseInt` for explicit conversion, although `keypad[digits[digitIndex]]` often works implicitly.
    const digit = parseInt(digits[digitIndex], 10);

    // Retrieve the string of characters mapped to the current digit from the `keypad`.
    const charsForDigit = keypad[digit];

    // Iterate through each character available for the current digit.
    // For each character, make a recursive call to explore that path.
    for (let i = 0; i < charsForDigit.length; i++) {
        // Make a recursive call:
        // 1. Append the current character to the `currentCombination`.
        //    (Note: `+` creates a new string, which is standard in JS backtracking for strings).
        // 2. Move to the next digit by incrementing `digitIndex`.
        // 3. Pass the original `digits` string and the `resultCombinations` array.
        combinationRecurse(currentCombination + charsForDigit[i], digitIndex + 1, digits, resultCombinations);
    }
};

// --- Test Cases ---
console.log("Test Case 1: '2345'");
const test1 = '2345';
console.log("Input:", test1);
console.log("Output:", phoneCombinations(test1));
/* Expected for '23':
["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
For '2345', it will be a much larger list.
*/

console.log("\nTest Case 2: '' (Empty string)");
const test2 = '';
console.log("Input:", test2);
console.log("Output:", phoneCombinations(test2)); // Expected: []

console.log("\nTest Case 3: '2'");
const test3 = '2';
console.log("Input:", test3);
console.log("Output:", phoneCombinations(test3)); // Expected: ["a", "b", "c"]

console.log("\nTest Case 4: '7'");
const test4 = '7'; // 'pqrs'
console.log("Input:", test4);
console.log("Output:", phoneCombinations(test4)); // Expected: ["p", "q", "r", "s"]

console.log("\nTest Case 5: '29'");
const test5 = '29'; // 'abc' and 'wxyz'
console.log("Input:", test5);
console.log("Output:", phoneCombinations(test5));
/* Expected:
["aw", "ax", "ay", "az",
 "bw", "bx", "by", "bz",
 "cw", "cx", "cy", "cz"]
*/