import Game from "./Game";
import Player from "./Player";
import Scoreboard from "./Scoreboard";
import SymbolMarker from "./Symbol.enum";

class TicTacToeSystem {
    private static instance: TicTacToeSystem;
    private game: Game | null = null;
    private readonly scoreboard: Scoreboard;

    constructor() {
        this.scoreboard = new Scoreboard();
    }

    static getInstance(): TicTacToeSystem {
        if (!TicTacToeSystem.instance) {
            TicTacToeSystem.instance = new TicTacToeSystem();
        }
        return TicTacToeSystem.instance;
    }

    createGame(player1Name: string, player2Name: string): Game {
        const player1 = new Player(player1Name, SymbolMarker.X);
        const player2 = new Player(player2Name, SymbolMarker.O);
        this.game = new Game(player1, player2);
        this.game.addObserver(this.scoreboard);
        return this.game;
    }

    makeMove(row: number, col: number): void {
        if (!this.game) {
            throw new Error("No game in progress");
        }
        this.game.makeMove(row, col);
    }
    
    printBoard(): void {
        if (!this.game) {
            throw new Error("No game in progress");
        }
        console.log(this.game.getBoard().toString());
    }

    printScoreboard(): void {
        this.scoreboard.printScores();
    }
}

export default TicTacToeSystem;
