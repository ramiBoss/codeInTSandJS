/**
 * Determines if it's possible to reach the last index of the array,
 * starting from the first index (index 0).
 * Each element nums[i] represents the maximum jump length from index i.
 *
 * This implementation uses the Greedy Approach, which is the most efficient.
 *
 * @param {number[]} nums The array of non-negative integers representing jump lengths.
 * @returns {boolean} True if the last index can be reached, false otherwise.
 */
const jump = (nums) => {
    console.time('jump_greedy_time'); // Start timer for performance measurement

    const n = nums.length;

    // Edge case: If the array has only one element, we are already at the last index.
    if (n === 1) {
        console.timeEnd('jump_greedy_time');
        return true;
    }

    // `maxReach` tracks the farthest index we can reach from the current position
    // or any previous position.
    let maxReach = 0;

    // Iterate through the array. `i` represents the current position.
    // We only need to check up to the `maxReach` or `n-1` (the target), whichever comes first.
    // The loop condition `i < n` is crucial. We must check all positions up to the current maxReach,
    // and if maxReach allows us to reach the end, we can stop.
    for (let i = 0; i < n; i++) {
        // If the current index `i` is beyond the `maxReach`, it means
        // we cannot reach this index, and therefore cannot reach the end.
        if (i > maxReach) {
            console.timeEnd('jump_greedy_time');
            return false;
        }

        // Update `maxReach`: It's the maximum of its current value
        // and the farthest point reachable from the current `i`.
        maxReach = Math.max(maxReach, i + nums[i]);

        // If `maxReach` has reached or surpassed the last index,
        // it means we can successfully reach the end.
        if (maxReach >= n - 1) {
            console.timeEnd('jump_greedy_time');
            return true;
        }
    }

    // If the loop finishes (meaning `i` iterated up to `n-1` or `maxReach`),
    // and `maxReach` never reached `n-1`, then the last index is unreachable.
    console.timeEnd('jump_greedy_time');
    return false;
};

// --- Test Cases ---
const test1 = [1, 0, 1, 0];       // Expected: false (cannot get past the 0 at index 1)
const test2 = [3, 2, 1, 0, 4];    // Expected: false (the 0 at index 3 blocks the path)
const test3 = [2, 3, 1, 1, 4];    // Expected: true (e.g., 0 -> 1 (jump 2) -> 4 (jump 3 from index 1))
const test4 = [2, 0, 6, 9, 8, 4, 5, 0, 8, 9, 1, 2, 9, 6, 8, 8, 0, 6, 3, 1, 2, 2, 1, 2, 6, 5, 3, 1, 2, 2, 6, 4, 2, 4, 3, 0, 0, 0, 3, 8, 2, 4, 0, 1, 2, 0, 1, 4, 6, 5, 8, 0, 7, 9, 3, 4, 6, 6, 5, 8, 9, 3, 4, 3, 7, 0, 4, 9, 0, 9, 8, 4, 3, 0, 7, 7, 1, 9, 1, 9, 4, 9, 0, 1, 9, 5, 7, 7, 1, 5, 8, 2, 8, 2, 6, 8, 2, 2, 7, 5, 1, 7, 9, 6]; // Large array
const test5 = [0];                // Expected: true (length 1)
const test6 = [0, 1];             // Expected: false (cannot move from index 0)
const test7 = [0, 0];             // Expected: false
const test8 = [1, 1, 0, 1];       // Expected: false (0 at index 2 blocks path)
const test9 = [2, 5, 0, 0, 0];    // Expected: true (0->1->(end)) or (0->2->(end))
const test10 = [2,0,0] // Expected false (0->2 no, 0->1(value 0))

console.log(`Test 1: ${JSON.stringify(test1)} -> ${jump(test1)} (Expected: false)`);
console.log(`Test 2: ${JSON.stringify(test2)} -> ${jump(test2)} (Expected: false)`);
console.log(`Test 3: ${JSON.stringify(test3)} -> ${jump(test3)} (Expected: true)`);
console.log(`Test 4 (Large): ${JSON.stringify(test4).substring(0, 50)}... -> ${jump(test4)} (Expected: true)`); // Outputting only start of large array
console.log(`Test 5: ${JSON.stringify(test5)} -> ${jump(test5)} (Expected: true)`);
console.log(`Test 6: ${JSON.stringify(test6)} -> ${jump(test6)} (Expected: false)`);
console.log(`Test 7: ${JSON.stringify(test7)} -> ${jump(test7)} (Expected: false)`);
console.log(`Test 8: ${JSON.stringify(test8)} -> ${jump(test8)} (Expected: false)`);
console.log(`Test 9: ${JSON.stringify(test9)} -> ${jump(test9)} (Expected: true)`);
console.log(`Test 10: ${JSON.stringify(test10)} -> ${jump(test10)} (Expected: false)`);
