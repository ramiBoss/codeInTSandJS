/**
 * Rotten Oranges
 * 
 * You are given an m x n grid where each cell can have one of three values:
 * 0 representing an empty cell,
 * 1 representing a fresh orange, or
 * 2 representing a rotten orange.
 * 
 * Example 1:
 * Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 * 
 * Example 2:
 * Input: grid = [[0,2,1],[1,0,1],[1,1,1]]
 * Output: 2
 * 
 * Example 3:
 * Input: grid = [[0,1,2]]
 * Output: 1
 * 
 * Example 4:
 * Input: grid = [[0]]
 * Output: 0
 * 
 * Example 5:
 * Input: grid = [[1]]
 * Output: -1
 */


function orangesRotting(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0]!.length;
    const queue: [number, number][] = [];
    let freshOranges = 0;
    let minutes = 0;

    // Initialize the queue with all rotten oranges and count fresh oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r]![c] === 2) {
                queue.push([r, c]);
            } else if (grid[r]![c] === 1) {
                freshOranges++;
            }
        }
    }

    // Directions for adjacent cells (up, down, left, right)
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    // BFS to rot adjacent fresh oranges
    while (queue.length > 0 && freshOranges > 0) {
        const currentLevelSize = queue.length;

        for (let i = 0; i < currentLevelSize; i++) {
            const [r, c] = queue.shift()!;

            for (const [dr, dc] of directions) {
                const newRow = r + dr!;
                const newCol = c + dc!;

                // Check bounds and if the orange is fresh
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow]![newCol] === 1) {
                    // Rot the fresh orange
                    grid[newRow]![newCol] = 2;
                    freshOranges--;
                    queue.push([newRow, newCol]);
                }
            }
        }

        minutes++;
    }

    return freshOranges === 0 ? minutes : -1;
}

export { orangesRotting };