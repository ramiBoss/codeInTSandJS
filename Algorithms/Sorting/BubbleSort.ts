const BubbleSort = (nums: number[]) => {
    // Helper function to swap two elements in the array
    const swap = (i: number, j: number) => {
        // Using a temporary variable for the swap
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;

        // Alternative for numeric values (less readable for some, but avoids temp var)
        // nums[i] = nums[i] + nums[j];
        // nums[j] = nums[i] - nums[j];
        // nums[i] = nums[i] - nums[j];
    }

    // Base case: If the array has 0 or 1 element, it's already sorted.
    if(nums.length <= 1) {
        return;
    }

    // Bubble Sort Algorithm
    // Time Complexity: O(n^2) - Worst and Average Case
    //                  O(n)  - Best Case (when the array is already sorted, due to optimization)
    // Space Complexity: O(1) - Constant additional space
    // Stable Sort: Yes - Preserves the relative order of equal elements
    // In-place Sort: Yes - Modifies the original array directly

    const n = nums.length;

    // Outer loop controls the number of passes
    // After each pass 'i', the largest 'i' elements are in their correct sorted positions
    for(let i = 0; i < n; i++) {
        let swapped = false; // Flag to check if any swaps occurred in this pass

        // Inner loop performs comparisons and swaps
        // We only need to iterate up to (n - 1 - i) because the last 'i' elements are already sorted
        // and j+1 must not go out of bounds (hence n - 1 - i)
        for(let j = 0; j < n - 1 - i; j++) {
            // If the current element is greater than the next element, swap them
            if(nums[j] > nums[j+1]) {
                swap(j, j+1);
                swapped = true; // Mark that a swap occurred
            }
        }

        // Optimization: If no two elements were swapped by the inner loop,
        // it means the array is already sorted, so we can terminate early.
        if(!swapped) {
            break;
        }
    }
}

// --- Test Cases ---

console.log("--- Test Case 1: Unsorted Array ---");
const nums1 = [5, 3, 8, 4, 2];
console.log("Original array:", nums1);
BubbleSort(nums1);
console.log("Sorted array:", nums1); // Expected Output: [2, 3, 4, 5, 8]

console.log("\n--- Test Case 2: Already Sorted Array (Best Case) ---");
const nums2 = [1, 2, 3, 4, 5];
console.log("Original array:", nums2);
BubbleSort(nums2);
console.log("Sorted array:", nums2); // Expected Output: [1, 2, 3, 4, 5]

console.log("\n--- Test Case 3: Reverse Sorted Array (Worst Case) ---");
const nums3 = [9, 8, 7, 6, 5];
console.log("Original array:", nums3);
BubbleSort(nums3);
console.log("Sorted array:", nums3); // Expected Output: [5, 6, 7, 8, 9]

console.log("\n--- Test Case 4: Array with Duplicate Elements ---");
const nums4 = [4, 2, 5, 2, 8, 4];
console.log("Original array:", nums4);
BubbleSort(nums4);
console.log("Sorted array:", nums4); // Expected Output: [2, 2, 4, 4, 5, 8]

console.log("\n--- Test Case 5: Empty Array ---");
const nums5: number[] = [];
console.log("Original array:", nums5);
BubbleSort(nums5);
console.log("Sorted array:", nums5); // Expected Output: []

console.log("\n--- Test Case 6: Single Element Array ---");
const nums6 = [10];
console.log("Original array:", nums6);
BubbleSort(nums6);
console.log("Sorted array:", nums6); // Expected Output: [10]