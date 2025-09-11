import { CellValue, Position, PlayerSymbol } from './types';

/**
 * Represents the game board with all cell operations
 */
export class Board {
  private grid: CellValue[][];
  private readonly size: number;

  constructor(size: number = 3) {
    this.size = size;
    this.grid = this.initializeGrid();
  }

  private initializeGrid(): CellValue[][] {
    return Array.from({ length: this.size }, () => 
      Array(this.size).fill(null)
    );
  }

  /**
   * Make a move on the board
   */
  public makeMove(position: Position, symbol: PlayerSymbol): boolean {
    if (!this.isValidPosition(position) || !this.isEmpty(position)) {
      return false;
    }

    this.grid[position.row]![position.col] = symbol;
    return true;
  }

  /**
   * Check if a position is empty
   */
  public isEmpty(position: Position): boolean {
    if (!this.isValidPosition(position)) {
      return false;
    }
    return this.grid[position.row]![position.col] === null;
  }

  /**
   * Check if position is within board bounds
   */
  public isValidPosition(position: Position): boolean {
    return position.row >= 0 && 
           position.row < this.size && 
           position.col >= 0 && 
           position.col < this.size;
  }

  /**
   * Get value at specific position
   */
  public getCellValue(position: Position): CellValue {
    if (!this.isValidPosition(position)) {
      return null;
    }
    return this.grid[position.row]![position.col] ?? null;
  }

  /**
   * Check if board is full
   */
  public isFull(): boolean {
    return this.grid.every(row => 
      row.every(cell => cell !== null)
    );
  }

  /**
   * Get all empty positions
   */
  public getEmptyPositions(): Position[] {
    const emptyPositions: Position[] = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.isEmpty({ row, col })) {
          emptyPositions.push({ row, col });
        }
      }
    }
    return emptyPositions;
  }

  /**
   * Reset the board to empty state
   */
  public reset(): void {
    this.grid = this.initializeGrid();
  }

  /**
   * Get board size
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Get a copy of the current board state
   */
  public getBoard(): CellValue[][] {
    return this.grid.map(row => [...row]);
  }

  /**
   * Get string representation of the board
   */
  public toString(): string {
    return this.grid
      .map(row => row.map(cell => cell || '_').join(' '))
      .join('\n');
  }

  /**
   * Create a deep copy of the board
   */
  public clone(): Board {
    const newBoard = new Board(this.size);
    newBoard.grid = this.grid.map(row => [...row]);
    return newBoard;
  }
}
