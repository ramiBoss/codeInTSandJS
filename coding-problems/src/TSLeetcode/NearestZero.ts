/** 
 * Nearest Zero Problem - Breadth-First Search Approach
 * Given a binary matrix, find the distance of the nearest 0 for each cell.
 * The distance between two adjacent cells is 1.
 *
 * e.g. Input: [[0,0,0],[0,1,0],[1,1,1]]
 *      Output: [[0,0,0],[0,1,0],[1,2,1]]
 */


function nearestZero(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0]!.length;
    const result: number[][] = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => Infinity)
    ) as number[][];
    const queue: [number, number][] = [];

    // Initialize the queue with all 0 cells and set their distance to 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r]![c]! === 0) {
                result[r]![c] = 0;
                queue.push([r, c]);
            }
        }
    }

    const directions = [
        [1, 0],  // down
        [-1, 0], // up
        [0, 1],  // right
        [0, -1]  // left
    ];

    // Perform BFS from all 0 cells
    while (queue.length > 0) {
        const [r, c] = queue.shift()!;

        for (const [dr, dc] of directions) {
            const newRow = r + dr!;
            const newCol = c + dc!;
            
            // Check bounds
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                // If we found a shorter path to a 1 cell, update its distance and add it to the queue
                if (result[newRow]![newCol]! > result[r]![c]! + 1) {
                    result[newRow]![newCol] = result[r]![c]! + 1;
                    queue.push([newRow, newCol]);
                }
            }
        }   
    }

    return result;
}

export { nearestZero };