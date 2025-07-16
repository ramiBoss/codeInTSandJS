 const wordSearch = (board: string[][], word: string) => {
    const rows = board.length;
    const cols = board[0].length;

    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

    const dfs = (i: number, j: number, word: string, index: number): boolean => {
        if (index === word.length) return true; // Found the word
        if (i < 0 || i >= rows || j < 0 || j >= cols || visited[i][j] || board[i][j] !== word[index]) {
            return false; // Out of bounds or already visited or character does not match
        }

        visited[i][j] = true; // Mark as visited

        // Explore all 4 directions
        const found = dfs(i + 1, j, word, index + 1) ||
                      dfs(i - 1, j, word, index + 1) ||
                      dfs(i, j + 1, word, index + 1) ||
                      dfs(i, j - 1, word, index + 1);

        visited[i][j] = false; // Unmark as visited
        return found;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, word, 0)) {
                return true;
            }
        }
    }
    return false;
}

// Let's try a more optimal approach using a single DFS function
const wordSearchOptimized = (board: string[][], word: string): boolean => {
    const rows = board.length;
    const cols = board[0].length;

    const dfs = (i: number, j: number, index: number): boolean => {
        if (index === word.length) return true; // Found the word
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[index]) {
            return false; // Out of bounds or character does not match
        }

        const temp = board[i][j]; // Save the current character
        board[i][j] = '#'; // Mark as visited

        // Explore all 4 directions
             const found = dfs(i + 1, j, index + 1) ||
                      dfs(i - 1, j, index + 1) ||
                      dfs(i, j + 1, index + 1) ||
                      dfs(i, j - 1, index + 1);



                      board[i][j] = temp; // Restore the original character
                      return found;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
}