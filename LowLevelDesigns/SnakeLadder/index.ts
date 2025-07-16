

/* Example Usage: Running the Game

Here's how you can instantiate and play a simple game of Snakes and Ladders using your improved classes:

*/

console.log("Setting up the game...");

// 1. Create Board
const board = new Board(10); // A 10x10 board, total 100 cells

// 2. Add Special Entities
try {
    board.addSpecialEntity(new Ladder(4, 14));
    board.addSpecialEntity(new Ladder(9, 31));
    board.addSpecialEntity(new Ladder(20, 38));
    board.addSpecialEntity(new Ladder(28, 84));
    board.addSpecialEntity(new Ladder(40, 59));
    board.addSpecialEntity(new Ladder(51, 67));
    board.addSpecialEntity(new Ladder(63, 81));
    board.addSpecialEntity(new Ladder(71, 91));

    board.addSpecialEntity(new Snake(17, 7));
    board.addSpecialEntity(new Snake(54, 34));
    board.addSpecialEntity(new Snake(62, 19));
    board.addSpecialEntity(new Snake(64, 60));
    board.addSpecialEntity(new Snake(87, 24));
    board.addSpecialEntity(new Snake(93, 73));
    board.addSpecialEntity(new Snake(95, 75));
    board.addSpecialEntity(new Snake(98, 79));

    // Example of invalid entity (should throw an error)
    // board.addSpecialEntity(new Ladder(1, 10)); // Cannot start on 1
    // board.addSpecialEntity(new Snake(100, 50)); // Cannot start on last cell
    // board.addSpecialEntity(new Ladder(5, 5)); // Invalid ladder (start = end)
    // board.addSpecialEntity(new Snake(30, 40)); // Invalid snake (goes up)
    // board.addSpecialEntity(new Ladder(4, 15)); // Duplicate start position (already 4->14)

} catch (e) {
    console.error(`Error adding special entity: ${e.message}`);
}

console.log("\nBoard Layout:");
board.printBoard(); // Print the board to visualize

// 3. Create Dice
const dice = new Dice(6); // A standard 6-sided dice

// 4. Create Players
const player1 = new Player("Alice");
const player2 = new Player("Bob");
const player3 = new Player("Charlie");

// 5. Create Game instance
const game = new Game(board, dice);

// 6. Add Players to Game
try {
    game.addPlayers([player1, player2, player3]);
    // game.addPlayers([]); // Test: No players
} catch (e) {
    console.error(`Error adding players: ${e.message}`);
}

// 7. Start the Game
try {
    game.startGame();
} catch (e) {
    console.error(`Error starting game: ${e.message}`);
}

// 8. Game Loop (manual turn-by-turn simulation)
let winner: Player | null = null;
let turns = 0;
const maxTurns = 200; // Prevent infinite loops for testing

console.log("\n--- Starting Game Turns ---");
while (game.getGameStatus() === GameStatus.RUNNING && turns < maxTurns) {
    turns++;
    try {
        winner = game.makeMove();
        if (winner) {
            break; // Game finished, break loop
        }
    } catch (e) {
        console.error(`Error during move: ${e.message}`);
        game.gameStatus = GameStatus.FINISHED; // End game on error
    }
    // Small delay to make output readable if running quickly
    // await new Promise(resolve => setTimeout(resolve, 50));
}

if (game.getGameStatus() === GameStatus.FINISHED) {
    console.log(`Game ended after ${turns} turns.`);
    if (winner) {
        console.log(`The winner is ${winner.getName()}!`);
    }
} else {
    console.log(`Game reached max turns (${maxTurns}) without a winner. Current Status: ${game.getGameStatus()}`);
}

// Optional: Reset game and play again
// game.resetGame();
// game.startGame(); // You can now restart with the same players or add new ones