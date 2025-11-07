/**
 * A warehouse is a grid of  cells. A robot starts in the top-left corner and can move only right or down. Some cells have boxes (cannot pass through). Given the warehouse map, compute how many distinct paths the robot can take to reach the bottom-right corner.
Input:
First line: Two integers 
Next  lines: each line has  characters (’.’ for open, ‘#’ for box)
Output:
An integer, the number of distinct paths.
 */

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0]!.length;
    
    // If the starting cell has an obstacle, then return 0 as there is no way to move anywhere.
    if (obstacleGrid[0]![0]! === 1) return 0;
    
    // Create a 2D array to store the number of ways to reach each cell.
    const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
    
    // Starting point
    dp[0]![0] = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // If the cell has an obstacle, skip it.
            if (obstacleGrid[i]![j] === 1) {
                dp[i]![j] = 0;
            } else {
                // If not in the first row, add the number of ways from the cell above.
                if (i > 0) dp[i]![j]! += dp[i - 1]![j]!;
                // If not in the first column, add the number of ways from the cell to the left.
                if (j > 0) dp[i]![j]! += dp[i]![j - 1]!;
            }
        }
    }
    
    return dp[m - 1]![n - 1]!;
}