import { Board } from './Board';
import { WinChecker } from './WinChecker';
import { 
  Player, 
  Position, 
  Move, 
  GameState, 
  GameStatus, 
  GameResult, 
  GameObserver,
  CellValue 
} from './types';

/**
 * Main game engine that orchestrates the Tic Tac Toe game
 */
export class GameEngine {
  private board: Board;
  private players: [Player, Player];
  private currentPlayerIndex: number;
  private gameStatus: GameStatus;
  private winner: Player | null;
  private moveHistory: Move[];
  private observers: GameObserver[];
  private winChecker: WinChecker;

  constructor(boardSize: number = 3, players: [Player, Player]) {
    this.board = new Board(boardSize);
    this.players = players;
    this.currentPlayerIndex = 0;
    this.gameStatus = GameStatus.NOT_STARTED;
    this.winner = null;
    this.moveHistory = [];
    this.observers = [];
    this.winChecker = new WinChecker(this.board);
  }

  /**
   * Start a new game
   */
  public startGame(): GameResult {
    this.gameStatus = GameStatus.IN_PROGRESS;
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.moveHistory = [];
    this.board.reset();
    this.winChecker = new WinChecker(this.board);

    const gameState = this.getGameState();
    this.notifyObservers('onGameStateChanged', gameState);

    return {
      success: true,
      message: `Game started! ${this.getCurrentPlayer().name}'s turn.`,
      gameState
    };
  }

  /**
   * Make a move at the specified position
   */
  public makeMove(position: Position): GameResult {
    const currentPlayer = this.getCurrentPlayer();
    const move: Move = {
      position,
      player: currentPlayer,
      timestamp: Date.now()
    };

    // Validate game state
    if (this.gameStatus !== GameStatus.IN_PROGRESS) {
      const result: GameResult = {
        success: false,
        message: 'Game is not in progress',
        gameState: this.getGameState()
      };
      this.notifyObservers('onMoveAttempted', move, result);
      return result;
    }

    // Validate and make move
    if (!this.board.makeMove(position, currentPlayer.symbol)) {
      const result: GameResult = {
        success: false,
        message: 'Invalid move: position is occupied or out of bounds',
        gameState: this.getGameState()
      };
      this.notifyObservers('onMoveAttempted', move, result);
      return result;
    }

    // Add move to history
    this.moveHistory.push(move);

    // Check for win
    if (this.winChecker.checkWin(position, currentPlayer.symbol)) {
      this.gameStatus = GameStatus.WON;
      this.winner = currentPlayer;
      
      const result: GameResult = {
        success: true,
        message: `${currentPlayer.name} wins!`,
        gameState: this.getGameState()
      };

      this.notifyObservers('onMoveAttempted', move, result);
      this.notifyObservers('onGameEnded', result);
      return result;
    }

    // Check for draw
    if (this.winChecker.isDraw()) {
      this.gameStatus = GameStatus.DRAW;
      
      const result: GameResult = {
        success: true,
        message: 'Game is a draw!',
        gameState: this.getGameState()
      };

      this.notifyObservers('onMoveAttempted', move, result);
      this.notifyObservers('onGameEnded', result);
      return result;
    }

    // Switch players
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;

    const result: GameResult = {
      success: true,
      message: `${this.getCurrentPlayer().name}'s turn`,
      gameState: this.getGameState()
    };

    this.notifyObservers('onMoveAttempted', move, result);
    return result;
  }

  /**
   * Undo the last move
   */
  public undoMove(): GameResult {
    if (this.moveHistory.length === 0) {
      return {
        success: false,
        message: 'No moves to undo',
        gameState: this.getGameState()
      };
    }

    // Remove last move
    this.moveHistory.pop();
    
    // Rebuild board state
    this.board.reset();
    this.gameStatus = GameStatus.IN_PROGRESS;
    this.winner = null;

    // Replay all moves except the last one
    for (const move of this.moveHistory) {
      this.board.makeMove(move.position, move.player.symbol);
    }

    // Set current player
    this.currentPlayerIndex = this.moveHistory.length % 2;

    const gameState = this.getGameState();
    this.notifyObservers('onGameStateChanged', gameState);

    return {
      success: true,
      message: 'Move undone',
      gameState
    };
  }

  /**
   * Get current game state
   */
  public getGameState(): GameState {
    return {
      status: this.gameStatus,
      currentPlayer: this.gameStatus === GameStatus.IN_PROGRESS ? this.getCurrentPlayer() : null,
      winner: this.winner,
      moveCount: this.moveHistory.length,
      board: this.board.getBoard()
    };
  }

  /**
   * Get move history
   */
  public getMoveHistory(): Move[] {
    return [...this.moveHistory];
  }

  /**
   * Get available moves
   */
  public getAvailableMoves(): Position[] {
    if (this.gameStatus !== GameStatus.IN_PROGRESS) {
      return [];
    }
    return this.board.getEmptyPositions();
  }

  /**
   * Get winning positions if game is won
   */
  public getWinningPositions(): Position[] {
    if (this.gameStatus === GameStatus.WON && this.winner) {
      return this.winChecker.getWinningPositions(this.winner.symbol);
    }
    return [];
  }

  /**
   * Add game observer
   */
  public addObserver(observer: GameObserver): void {
    this.observers.push(observer);
  }

  /**
   * Remove game observer
   */
  public removeObserver(observer: GameObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * Get current player
   */
  private getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex]!;
  }

  /**
   * Notify all observers
   */
  private notifyObservers(method: keyof GameObserver, ...args: any[]): void {
    this.observers.forEach(observer => {
      try {
        (observer[method] as Function)(...args);
      } catch (error) {
        console.error('Observer error:', error);
      }
    });
  }

  /**
   * Get board representation as string
   */
  public getBoardString(): string {
    return this.board.toString();
  }

  /**
   * Reset the entire game
   */
  public resetGame(): GameResult {
    return this.startGame();
  }

  /**
   * Pause the game
   */
  public pauseGame(): GameResult {
    if (this.gameStatus !== GameStatus.IN_PROGRESS) {
      return {
        success: false,
        message: 'Cannot pause game that is not in progress',
        gameState: this.getGameState()
      };
    }

    this.gameStatus = GameStatus.PAUSED;
    const gameState = this.getGameState();
    this.notifyObservers('onGameStateChanged', gameState);

    return {
      success: true,
      message: 'Game paused',
      gameState
    };
  }

  /**
   * Resume the game
   */
  public resumeGame(): GameResult {
    if (this.gameStatus !== GameStatus.PAUSED) {
      return {
        success: false,
        message: 'Cannot resume game that is not paused',
        gameState: this.getGameState()
      };
    }

    this.gameStatus = GameStatus.IN_PROGRESS;
    const gameState = this.getGameState();
    this.notifyObservers('onGameStateChanged', gameState);

    return {
      success: true,
      message: 'Game resumed',
      gameState
    };
  }
}
