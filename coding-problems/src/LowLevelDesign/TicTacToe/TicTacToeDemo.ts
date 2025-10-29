import TicTacToeSystem from "./TicTacToeSystem";

class TicTacToeDemo {
    public static main(): void {
        console.log("Tic Tac Toe Game Demo");
        // You can add code here to demonstrate the Tic Tac Toe game functionality.
        const gameSystem = TicTacToeSystem.getInstance();
        gameSystem.createGame("Alice", "Bob");
        gameSystem.printBoard();
        gameSystem.makeMove(0, 0); // Alice 
    }
}

TicTacToeDemo.main();