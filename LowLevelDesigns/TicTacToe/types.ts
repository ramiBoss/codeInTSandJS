/**
 * Core types and interfaces for Tic Tac Toe game
 */

import type { Board } from './Board';

export type PlayerSymbol = 'X' | 'O';
export type CellValue = PlayerSymbol | null;

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  position: Position;
  player: Player;
  timestamp: number;
}

export enum GameStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS', 
  WON = 'WON',
  DRAW = 'DRAW',
  PAUSED = 'PAUSED'
}

export interface GameState {
  status: GameStatus;
  currentPlayer: Player | null;
  winner: Player | null;
  moveCount: number;
  board: CellValue[][];
}

export interface GameResult {
  success: boolean;
  message: string;
  gameState: GameState;
}

export interface GameObserver {
  onGameStateChanged(gameState: GameState): void;
  onMoveAttempted(move: Move, result: GameResult): void;
  onGameEnded(result: GameResult): void;
}

export abstract class Player {
  constructor(
    public readonly name: string,
    public readonly symbol: PlayerSymbol
  ) {}

  abstract makeMove(board: Board): Position;
  
  toString(): string {
    return `${this.name} (${this.symbol})`;
  }
}

export class HumanPlayer extends Player {
  makeMove(board: Board): Position {
    // In a real implementation, this would get input from UI
    throw new Error('Human player moves should be provided via game interface');
  }
}

export class AIPlayer extends Player {
  makeMove(board: Board): Position {
    // Simple AI: find first empty cell
    for (let row = 0; row < board.getSize(); row++) {
      for (let col = 0; col < board.getSize(); col++) {
        if (board.isEmpty({ row, col })) {
          return { row, col };
        }
      }
    }
    throw new Error('No valid moves available');
  }
}
