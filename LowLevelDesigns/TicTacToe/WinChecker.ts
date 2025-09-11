import { Board } from './Board';
import { Position, PlayerSymbol } from './types';

/**
 * Handles win condition checking for the game
 */


// interface WinChecker {
//   checkWin(board: Board, lastMove: Position, symbol: PlayerSymbol): boolean;
// }

// export class RowWinChecker implements WinChecker {
//   checkWin(board: Board, lastMove: Position, symbol: PlayerSymbol): boolean {
//     const size = board.getSize();
//     const row = lastMove.row
//     for (let col = 0; col < size; col++) {
//       if (board.getCellValue({ row, col }) !== symbol) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

// export class ColumnWinChecker implements WinChecker {
//   checkWin(board: Board, lastMove: Position, symbol: PlayerSymbol): boolean {
//     const size = board.getSize();
//     const col = lastMove.col
//     for (let row = 0; row < size; row++) {
//       if (board.getCellValue({ row, col }) !== symbol) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

// export class DiagonalWinChecker implements WinChecker {
//   checkWin(board: Board, lastMove: Position, symbol: PlayerSymbol): boolean {
//       // Only check if position is on the main diagonal
//     if (lastMove.row !== lastMove.col) {
//       return false;
//     }

//     const size = board.getSize();
//     for (let i = 0; i < size; i++) {
//       if (board.getCellValue({ row: i, col: i }) !== symbol) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

// export class AntiDiagonalWinChecker implements WinChecker {
//   checkWin(board: Board, lastMove: Position, symbol: PlayerSymbol): boolean {
//      const size = board.getSize();
    
//     // Only check if position is on the anti-diagonal
//     if (lastMove.row + lastMove.col !== size - 1) {
//       return false;
//     }

//     for (let i = 0; i < size; i++) {
//       if (board.getCellValue({ row: i, col: size - 1 - i }) !== symbol) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

export class WinChecker {
  private readonly board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  /**
   * Check if there's a winner after the last move
   * Optimized to only check relevant lines
   */
  public checkWin(lastMove: Position, symbol: PlayerSymbol): boolean {
    return this.checkRow(lastMove.row, symbol) ||
           this.checkColumn(lastMove.col, symbol) ||
           this.checkDiagonal(lastMove, symbol) ||
           this.checkAntiDiagonal(lastMove, symbol);
  }

  /**
   * Check horizontal line
   */
  private checkRow(row: number, symbol: PlayerSymbol): boolean {
    const size = this.board.getSize();
    for (let col = 0; col < size; col++) {
      if (this.board.getCellValue({ row, col }) !== symbol) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check vertical line
   */
  private checkColumn(col: number, symbol: PlayerSymbol): boolean {
    const size = this.board.getSize();
    for (let row = 0; row < size; row++) {
      if (this.board.getCellValue({ row, col }) !== symbol) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check main diagonal (top-left to bottom-right)
   */
  private checkDiagonal(position: Position, symbol: PlayerSymbol): boolean {
    // Only check if position is on the main diagonal
    if (position.row !== position.col) {
      return false;
    }

    const size = this.board.getSize();
    for (let i = 0; i < size; i++) {
      if (this.board.getCellValue({ row: i, col: i }) !== symbol) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check anti-diagonal (top-right to bottom-left)
   */
  private checkAntiDiagonal(position: Position, symbol: PlayerSymbol): boolean {
    const size = this.board.getSize();
    
    // Only check if position is on the anti-diagonal
    if (position.row + position.col !== size - 1) {
      return false;
    }

    for (let i = 0; i < size; i++) {
      if (this.board.getCellValue({ row: i, col: size - 1 - i }) !== symbol) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if the game is a draw (board full with no winner)
   */
  public isDraw(): boolean {
    return this.board.isFull() && !this.hasWinner();
  }

  /**
   * Check if there's any winner on the board (brute force check)
   */
  private hasWinner(): boolean {
    const size = this.board.getSize();
    
    // Check all rows
    for (let row = 0; row < size; row++) {
      if (this.isLineWin(row, 0, 0, 1)) return true;
    }
    
    // Check all columns
    for (let col = 0; col < size; col++) {
      if (this.isLineWin(0, col, 1, 0)) return true;
    }
    
    // Check main diagonal
    if (this.isLineWin(0, 0, 1, 1)) return true;
    
    // Check anti-diagonal
    if (this.isLineWin(0, size - 1, 1, -1)) return true;
    
    return false;
  }

  /**
   * Check if a line (defined by start position and direction) has a winner
   */
  private isLineWin(startRow: number, startCol: number, rowDir: number, colDir: number): boolean {
    const size = this.board.getSize();
    const firstSymbol = this.board.getCellValue({ row: startRow, col: startCol });
    
    if (!firstSymbol) return false;
    
    for (let i = 1; i < size; i++) {
      const row = startRow + i * rowDir;
      const col = startCol + i * colDir;
      
      if (this.board.getCellValue({ row, col }) !== firstSymbol) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Get all winning positions for a symbol (for highlighting)
   */
  public getWinningPositions(symbol: PlayerSymbol): Position[] {
    const size = this.board.getSize();
    const winningPositions: Position[] = [];

    // Check rows
    for (let row = 0; row < size; row++) {
      if (this.checkRow(row, symbol)) {
        for (let col = 0; col < size; col++) {
          winningPositions.push({ row, col });
        }
        return winningPositions;
      }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      if (this.checkColumn(col, symbol)) {
        for (let row = 0; row < size; row++) {
          winningPositions.push({ row, col });
        }
        return winningPositions;
      }
    }

    // Check main diagonal
    let mainDiagonalWin = true;
    for (let i = 0; i < size; i++) {
      if (this.board.getCellValue({ row: i, col: i }) !== symbol) {
        mainDiagonalWin = false;
        break;
      }
    }
    if (mainDiagonalWin) {
      for (let i = 0; i < size; i++) {
        winningPositions.push({ row: i, col: i });
      }
      return winningPositions;
    }

    // Check anti-diagonal
    let antiDiagonalWin = true;
    for (let i = 0; i < size; i++) {
      if (this.board.getCellValue({ row: i, col: size - 1 - i }) !== symbol) {
        antiDiagonalWin = false;
        break;
      }
    }
    if (antiDiagonalWin) {
      for (let i = 0; i < size; i++) {
        winningPositions.push({ row: i, col: size - 1 - i });
      }
      return winningPositions;
    }

    return winningPositions;
  }
}
