/**
 * Represents an activity with a start and finish time.
 * @typedef {object} Activity
 * @property {number} start - The start time of the activity.
 * @property {number} finish - The finish time of the activity.
 */

/**
 * Solves the Activity Selection Problem using a greedy approach.
 * This function finds the maximum number of non-overlapping activities that can be performed
 * from a given set of activities.
 *
 * Pre-condition: The activities must be sorted by their finish times in non-decreasing order.
 * If not sorted, the function will first sort them.
 *
 * @param {number[]} startTimes - An array of start times for the activities.
 * @param {number[]} finishTimes - An array of finish times for the activities.
 * @returns {Activity[] | string} An array of selected activities (objects with start and finish times),
 * or an error string if the input data is inconsistent.
 */
const activitySelection = (startTimes, finishTimes) => {
    // 1. Input Validation: Check if the lengths of start and finish arrays match.
    if (startTimes.length !== finishTimes.length) {
        return 'Wrong data supplied: Start and finish arrays must have the same length.';
    }

    // 2. Prepare Activities: Combine start and finish times into an array of objects
    //    for easier manipulation and sorting.
    const activities = [];
    for (let i = 0; i < startTimes.length; i++) {
        activities.push({ start: startTimes[i], finish: finishTimes[i] });
    }

    // 3. Sort Activities: This is the CRUCIAL step for the greedy algorithm.
    //    Sort the activities based on their finish times in ascending order.
    //    If finish times are equal, sorting by start time is a common tie-breaking rule,
    //    though not strictly necessary for correctness here.
    activities.sort((a, b) => a.finish - b.finish);

    // 4. Select Activities: Initialize the list of selected activities.
    const selected = [];

    // 5. Select the first activity: Always select the activity that finishes first.
    //    This is the greedy choice that leaves the maximum time for other activities.
    if (activities.length > 0) {
        selected.push(activities[0]);
    } else {
        // If no activities provided, return empty array.
        return selected;
    }

    // 6. Iterate and Select Remaining Activities:
    //    Keep track of the finish time of the last selected activity.
    let lastFinishTime = selected[0].finish;

    // Iterate through the remaining activities starting from the second one.
    for (let i = 1; i < activities.length; i++) {
        const currentActivity = activities[i];

        // If the current activity's start time is greater than or equal to
        // the finish time of the last selected activity, then it's non-overlapping
        // and can be selected.
        if (currentActivity.start >= lastFinishTime) {
            selected.push(currentActivity);        // Add the current activity to the selected list
            lastFinishTime = currentActivity.finish; // Update the last finish time
        }
    }

    // 7. Return the selected activities.
    return selected;
};

// --- Test Cases ---
const start1 = [1, 3, 0, 5, 3, 5, 6, 8, 8, 2, 12];
const finish1 = [4, 5, 6, 7, 9, 9, 10, 11, 12, 14, 16];

console.log("Original start times:", start1);
console.log("Original finish times:", finish1);
console.log("Selected activities:", activitySelection(start1, finish1));
/* Expected Output (order might vary slightly if finish times are equal, but the set of activities should be the same):
Selected activities: [
  { start: 1, finish: 4 },  // Original (1,4)
  { start: 5, finish: 7 },  // Original (5,7)
  { start: 8, finish: 11 }, // Original (8,11)
  { start: 12, finish: 16 } // Original (12,16)
]
Note: (0,6) (3,5) (5,9) (6,10) (8,12) (2,14) etc. are skipped because they overlap with better choices that finish earlier.
*/

console.log("\n--- Another Test Case ---");
const start2 = [10, 12, 20];
const finish2 = [20, 25, 30];
console.log("Original start times:", start2);
console.log("Original finish times:", finish2);
console.log("Selected activities:", activitySelection(start2, finish2));
/* Expected Output:
Selected activities: [
  { start: 10, finish: 20 },
  { start: 20, finish: 30 }
]
*/

console.log("\n--- Edge Case: Empty Input ---");
const startEmpty = [];
const finishEmpty = [];
console.log("Selected activities (empty):", activitySelection(startEmpty, finishEmpty));
// Expected Output: Selected activities (empty): []

console.log("\n--- Edge Case: Single Activity ---");
const startSingle = [1];
const finishSingle = [5];
console.log("Selected activities (single):", activitySelection(startSingle, finishSingle));
// Expected Output: Selected activities (single): [ { start: 1, finish: 5 } ]

console.log("\n--- Edge Case: All Overlapping ---");
const startOverlap = [1, 2, 3];
const finishOverlap = [10, 4, 5]; // Note: (2,4) finishes earliest
console.log("Selected activities (all overlapping):", activitySelection(startOverlap, finishOverlap));
/* Expected Output:
Selected activities (all overlapping): [ { start: 2, finish: 4 } ]
*/

console.log("\n--- Edge Case: Different Lengths ---");
const startDiff = [1, 2];
const finishDiff = [5];
console.log("Selected activities (different lengths):", activitySelection(startDiff, finishDiff));
// Expected Output: Wrong data supplied: Start and finish arrays must have the same length.
