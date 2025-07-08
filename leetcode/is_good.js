/**
 * Determines if an array of numbers is a "good" array.
 * A "good" array `nums` of length `m` must satisfy:
 * 1. It contains all integers from `1` to `n` exactly once, where `n = m - 1`.
 * 2. It contains the integer `n` exactly twice.
 * 3. All numbers are positive and within the range [1, n].
 *
 * @param {number[]} nums The input array of numbers.
 * @returns {boolean} True if the array is "good", false otherwise.
 */
const isGood = (nums) => {
    // 1. Handle Edge Cases
    // A good array must have at least two elements (e.g., [1, 1] where n=1).
    if (nums.length < 2) {
        return false;
    }

    // Determine 'n' based on the problem definition (n = nums.length - 1)
    // This 'n' is the largest number expected in the sequence, which should appear twice.
    const n = nums.length - 1;

    // Use a Map to store the frequency of each number.
    // A Map is flexible as numbers are not necessarily contiguous or small for array indexing.
    const counts = new Map();

    // 2. Iterate and Count Frequencies with Early Exit Checks
    for (const num of nums) {
        // Check if the number is within the valid range [1, n].
        // Numbers outside this range (e.g., 0, negative, or greater than n) are invalid.
        if (num < 1 || num > n) {
            return false;
        }

        // Get the current count for the number, defaulting to 0 if not present.
        const currentCount = counts.get(num) ?? 0;
        counts.set(num, currentCount + 1); // Increment count

        // Perform early exit checks based on the problem rules:
        if (num === n) {
            // The number 'n' is allowed to appear at most twice.
            if (counts.get(num) > 2) {
                return false; // 'n' appeared more than twice
            }
        } else {
            // Any other number (1 to n-1) is allowed to appear at most once.
            if (counts.get(num) > 1) {
                return false; // A number other than 'n' appeared more than once
            }
        }
    }

    // 3. Final Validation: After processing all numbers, check the final state.

    // Verify that 'n' appeared exactly twice.
    if (counts.get(n) !== 2) {
        return false;
    }

    // Verify that all numbers from 1 to n-1 appeared exactly once.
    for (let i = 1; i < n; i++) {
        if (counts.get(i) !== 1) {
            return false;
        }
    }

    // If all checks pass, the array is "good".
    return true;
};

// --- Test Cases ---
console.log("--- Test Cases for isGood ---");

const test1 = [2, 1, 3];         // n = 2. Expected: false (should be [1,2,2])
console.log(`[${test1}] isGood: ${isGood(test1)} (Expected: false)`);

const test2 = [1, 3, 3, 2];      // n = 3. Expected: true (has 1, 2, 3, 3)
console.log(`[${test2}] isGood: ${isGood(test2)} (Expected: true)`);

const test3 = [3, 4, 1, 2, 1];   // n = 4. Expected: false (1 appears twice, but 4 should appear twice)
console.log(`[${test3}] isGood: ${isGood(test3)} (Expected: false)`);

const test4 = [14, 2, 2];        // n = 2. Expected: false (14 is > n=2)
console.log(`[${test4}] isGood: ${isGood(test4)} (Expected: false)`);

console.log(`[1, 1] isGood: ${isGood([1, 1])} (Expected: true)`);     // n=1. Has 1 twice.
console.log(`[1] isGood: ${isGood([1])} (Expected: false)`);         // Length < 2
console.log(`[] isGood: ${isGood([])} (Expected: false)`);           // Length < 2
console.log(`[1, 2, 1] isGood: ${isGood([1, 2, 1])} (Expected: false)`); // n=2. Should be [1,2,2]
console.log(`[1, 2, 3, 3, 4] isGood: ${isGood([1, 2, 3, 3, 4])} (Expected: false)`); // n=4. Should be [1,2,3,4,4]
console.log(`[1, 2, 3, 4, 4] isGood: ${isGood([1, 2, 3, 4, 4])} (Expected: true)`);
console.log(`[0, 1, 1] isGood: ${isGood([0, 1, 1])} (Expected: false)`); // 0 is invalid
console.log(`[1, 1, 2] isGood: ${isGood([1, 1, 2])} (Expected: false)`); // n=2. '1' appears twice, not '2'.
