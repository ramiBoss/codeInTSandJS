import Board from "./Board";
import ColumnWinningStrategy from "./ColumnWinningStrategy";
import DiagonalWinningStrategy from "./DiagonalWinningStrategy";
import GameState from "./GameState.interface";
import GameStatus from "./GameStatus.enum";
import GameSubject from "./GameSubject";
import InProgressState from "./InProgressState";
import Player from "./Player";
import RowWinningStrategy from "./RowWinningStrategy";
import SymbolMarker from "./Symbol.enum";
import WinningStrategy from "./WinningStrategy.interface";

class Game extends GameSubject {
    private readonly board: Board;
    private readonly player1: Player;
    private readonly player2: Player;
    private gameStatus: GameStatus;
    private gameState: GameState;
    private winner: Player | null;
    private currentPlayer: Player;

    private readonly winningStrategies: WinningStrategy[] = [new RowWinningStrategy(3), new ColumnWinningStrategy(3), new DiagonalWinningStrategy(3)];
    
    constructor(player1: Player, player2: Player) {
        super();
        this.board = new Board(3);
        this.gameStatus = GameStatus.IN_PROGRESS;
        this.player1 = player1;
        this.player2 = player2;
        this.winner = null;
        this.currentPlayer = player1;
        this.gameState = new InProgressState();
    }

    switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    makeMove(row: number, col: number): void {
      this.gameState.handleMove(this, this.currentPlayer, row, col);

    }

    checkWinner(board: Board, symbol: SymbolMarker): boolean {
        for (const strategy of this.winningStrategies) {
            if (strategy.checkWin(board, symbol)) {
                return true;
            }
        }
        return false;
    }

     getBoard(): Board {
        return this.board;
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    getWinner(): Player | null {
        return this.winner;
    }

    getGameStatus(): GameStatus {
        return this.gameStatus;
    }

    getGameState(): GameState {
        return this.gameState;
    }

    setGameState(state: GameState): void {
        this.gameState = state;
    }

    setWinner(player: Player): void {
        this.winner = player;
    }

    setGameStatus(status: GameStatus): void {
        this.gameStatus = status;
        if(status !== GameStatus.IN_PROGRESS) {
            this.notifyObservers();
        }
    }

}

export default Game;