const isValidSudoku = (board) => {
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            if(board[i][j] !== '.'){
                if(!validate(i, j, board)){
                    return false;
                }
            }
        }
    }
    return true;
}
const validate = (row, col, board) => {
   for(let i = col+1; i < board.length; i++){
       if(board[row][i] === board[row][col]){
        return false;
    }
   }

   for(let i = row+1; i < board.length; i++){
       if(board[row][col] === board[i][col]){
        return false;
    }
   }
   const startRow = Math.floor(row/3)*3;
   const startCol = Math.floor(col/3)*3;
   for(let i = startRow; i < startRow+3; i++){
    for(let j = startCol; j < startCol+3; j++){
        if(i !== row && j !== col && board[i][j] === board[row][col]){
            return false;
        }
    }
   }
   return true;
}

const test1 = [["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];

const test2 = [["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];


console.log(isValidSudoku(test1));
console.log(isValidSudoku(test2));