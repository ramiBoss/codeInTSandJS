/***
 * Number of Islands
 * Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 * 
 * Example:
 * Input:
 * 11110
 * 11010
 * 11000
 * 00000
 * Output: 1
 * 
 * Input:
 * 11000
 * 11000
 * 00100
 * 00011
 * Output: 3
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n) - in worst case when the grid is filled with lands
 */


// Current approach: Modifies original grid (requires all 4 directions)
function numIslands(grid: string[][]): number {
    if (grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0]!.length;
    let islandCount = 0;
    
    const directions = [
        [1, 0],  // down
        [-1, 0], // up  ← Still needed because DFS can reach cells from any direction
        [0, 1],  // right
        [0, -1]  // left ← Still needed because DFS can reach cells from any direction
    ];
    
    function dfs(r: number, c: number) {
        // Check bounds and if the cell is land
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r]![c] === '0') {
            return;
        }
        
        // Mark the cell as visited by setting it to '0'
        grid[r]![c] = '0';
        
        // Explore all adjacent cells
        for (const [dr, dc] of directions) {
            dfs(r + dr!, c + dc!);
        }
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r]![c] === '1') {
                islandCount++;
                dfs(r, c); // Start DFS to mark all connected lands
            }
        }
    }
    
    return islandCount;
}

// Alternative: Using visited array (could optimize to only check down/right)
function numIslandsWithVisited(grid: string[][]): number {
    if (grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0]!.length;
    const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
    let islandCount = 0;
    
    const allDirections = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    function dfs(r: number, c: number) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || 
            visited[r]![c] || grid[r]![c] === '0') {
            return;
        }
        
        visited[r]![c] = true;
        
        // Check all 4 directions from current cell
        for (const [dr, dc] of allDirections) {
            dfs(r + dr!, c + dc!);
        }
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r]![c] === '1' && !visited[r]![c]) {
                islandCount++;
                dfs(r, c);
            }
        }
    }
    
    return islandCount;
}

// Your corrected solution
function numIslandsCorrected(grid: string[][]): number {
    if (grid.length === 0) return 0;
    
    // Fix: Correct array creation
    let visited = new Array(grid.length).fill(null).map(() => new Array(grid[0]!.length).fill(false));
    let islandCount = 0;

    function doDFS(row: number, col: number) {
        // Fix: Check bounds first, then grid value and visited status
        const directions = [
            [1, 0],  // down
            [-1, 0], // up
            [0, 1],  // right
            [0, -1]  // left
        ];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr!;
            const newCol = col + dc!;
            
            // Fix: Check bounds first, then conditions
            if (newRow >= 0 && newRow < grid.length && 
                newCol >= 0 && newCol < grid[0]!.length &&
                grid[newRow]![newCol] === '1' && 
                !visited[newRow]![newCol]) {
                
                visited[newRow]![newCol] = true;
                doDFS(newRow, newCol);
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0]!.length; j++) {
            // Fix: Check for '1' string and visited status
            if (grid[i]![j] === '1' && !visited[i]![j]) {
                visited[i]![j] = true;
                doDFS(i, j); // Fix: Pass the parameters
                islandCount++;
            }
        }
    }

    return islandCount;
}

export { numIslands, numIslandsWithVisited, numIslandsCorrected };