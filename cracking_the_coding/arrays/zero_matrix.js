/**
 * Sets entire rows and columns to zero if an element in the matrix is zero.
 * This function modifies the matrix in-place.
 *
 * @param {number[][]} matrix - The input matrix.
 * @returns {number[][]} The modified matrix with rows and columns zeroed out.
 */
function build_zero_matrix(matrix){ // Pass matrix as an argument for better reusability
    // Handle edge case for an empty matrix or empty rows
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return matrix;
    }

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Use two sets to store the indices of rows and columns that need to be zeroed.
    // Using Sets provides efficient O(1) average time complexity for adding and checking existence.
    const rowsToZero = new Set();
    const colsToZero = new Set();

    // First pass: Iterate through the matrix to find all zero elements.
    // Store their corresponding row and column indices in the sets.
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (matrix[i][j] === 0) {
                rowsToZero.add(i); // Add row index to the set
                colsToZero.add(j); // Add column index to the set
            }
        }
    }

    // console.log("Rows to zero:", rowsToZero); // For debugging
    // console.log("Cols to zero:", colsToZero); // For debugging

    // Second pass: Iterate through the matrix again.
    // If the current row 'i' or current column 'j' is marked for zeroing,
    // set the element matrix[i][j] to 0.
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // Check if the current row 'i' is in the rowsToZero set
            // OR if the current column 'j' is in the colsToZero set.
            if (rowsToZero.has(i) || colsToZero.has(j)) {
                matrix[i][j] = 0; // Set the element to 0
            }
        }
    }

    return matrix; // Return the modified matrix
}

// --- Test Cases ---

// Original matrix
const matrix1 = [
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1]
];

console.log("Original Matrix 1:");
console.log(JSON.stringify(matrix1)); // Print original for comparison

console.log("\nModified Matrix 1:");
console.log(JSON.stringify(build_zero_matrix(matrix1)));
/* Expected Output:
[
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 0, 0]
]
*/

const matrix2 = [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5]
];

console.log("\nOriginal Matrix 2:");
console.log(JSON.stringify(matrix2));

console.log("\nModified Matrix 2:");
console.log(JSON.stringify(build_zero_matrix(matrix2)));
/* Expected Output:
[
    [0, 0, 0, 0],
    [0, 4, 5, 0],
    [0, 3, 1, 0]
]
*/

const matrix3 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log("\nOriginal Matrix 3 (No Zeroes):");
console.log(JSON.stringify(matrix3));
console.log("\nModified Matrix 3 (No Zeroes):");
console.log(JSON.stringify(build_zero_matrix(matrix3)));
/* Expected Output:
[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
*/

const matrix4 = [[1]];
console.log("\nOriginal Matrix 4 (Single Element):");
console.log(JSON.stringify(matrix4));
console.log("\nModified Matrix 4 (Single Element):");
console.log(JSON.stringify(build_zero_matrix(matrix4)));

const matrix5 = [[0]];
console.log("\nOriginal Matrix 5 (Single Zero Element):");
console.log(JSON.stringify(matrix5));
console.log("\nModified Matrix 5 (Single Zero Element):");
console.log(JSON.stringify(build_zero_matrix(matrix5)));

const matrix6 = []; // Empty matrix
console.log("\nOriginal Matrix 6 (Empty):");
console.log(JSON.stringify(matrix6));
console.log("\nModified Matrix 6 (Empty):");
console.log(JSON.stringify(build_zero_matrix(matrix6)));
