/**
 * @enum {string} GameStatus
 * @description Enum for possible states of the game.
 */
const GameStatus = {
    NOT_STARTED: 'Not started',
    RUNNING: 'Running',
    FINISHED: 'Finished',
};

/**
 * @class Game
 * @description Manages the overall flow and state of the Snakes and Ladders game.
 */
class Game {
    /**
     * @property {Board} board - The game board.
     * @property {Player[]} players - An array of players in the game.
     * @property {string} gameStatus - The current status of the game (e.g., 'Not started', 'Running', 'Finished').
     * @property {Dice} dice - The dice used for rolling.
     * @property {Player | null} currentPlayer - The player whose turn it is.
     * @property {number} currentPlayerIndex - Index to track whose turn it is.
     */
    board: Board;
    players: Player[];
    gameStatus: string;
    dice: Dice;
    currentPlayer: Player | null = null;
    currentPlayerIndex = 0; // Added to track turns

    /**
     * Creates an instance of Game.
     * @param {Board} board - The game board instance.
     * @param {Dice} dice - The dice instance.
     */
    constructor(board: Board, dice: Dice) {
        this.board = board;
        this.dice = dice;
        this.gameStatus = GameStatus.NOT_STARTED;
        this.players = [];
    }

    /**
     * Adds players to the game. Can only be done before the game starts.
     * @param {Player[]} allPlayers - An array of Player objects to add to the game.
     * @throws {Error} If players are added when the game has already started or if no players are provided.
     */
    addPlayers(allPlayers: Player[]) {
        if (this.gameStatus !== GameStatus.NOT_STARTED) {
            throw new Error('Players cannot be added when the game has already started.');
        }
        if (!Array.isArray(allPlayers) || allPlayers.length === 0) {
            throw new Error('Please provide an array of players to add.');
        }
        this.players.push(...allPlayers); // Use spread operator for cleaner push
        console.log(`Added ${allPlayers.length} players to the game.`);
    }

    /**
     * Starts the game. Initializes the first player's turn and sets game status to RUNNING.
     * @throws {Error} If there are no players or if the game is already running/finished.
     */
    startGame() {
        if (this.players.length === 0) {
            throw new Error("Cannot start game: No players added.");
        }
        if (this.gameStatus === GameStatus.RUNNING) {
            throw new Error("Game is already running.");
        }
        if (this.gameStatus === GameStatus.FINISHED) {
            console.warn("Game has already finished. Starting a new game might require a reset.");
            // Optionally add logic to reset game state here if a new game can be started after FINISHED
        }

        this.gameStatus = GameStatus.RUNNING;
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];
        console.log(`\n--- Game Started! ---`);
        console.log(`First turn for: ${this.currentPlayer?.getName() ?? 'Unknown Player'}`);
    }

    /**
     * Executes a single move for the current player.
     * This involves rolling the dice, moving the player, checking for special entities,
     * and handling win conditions.
     * @returns {Player | null} The winning player if the game ends, otherwise null.
     * @throws {Error} If the game is not in RUNNING status.
     * Commentary: This is the core game logic.
     */
    makeMove() {
        if (this.gameStatus !== GameStatus.RUNNING) {
            throw new Error(`Game is ${this.gameStatus}. Cannot make a move.`);
        }
        if (!this.currentPlayer) {
            throw new Error("No current player set. Game state might be inconsistent.");
        }

        const player = this.currentPlayer;
        const diceRoll = this.dice.rollDice();
        let newPosition = player.getPosition() + diceRoll;

        console.log(`\n${player.getName()} (Current: ${player.getPosition()}) rolls a ${diceRoll}.`);

        const totalCells = this.board.getTotalCells();

        // If player overshoots the last cell, they stay at their current position.
        if (newPosition > totalCells) {
            newPosition = player.getPosition(); // Player stays if they overshoot
            console.log(`${player.getName()} overshoots! Stays at ${player.getPosition()}.`);
            // Set current player for next turn if game is not won
            this.moveToNextPlayer();
            return null; // No winner yet
        }

        player.setPosition(newPosition);
        console.log(`${player.getName()} moves to ${player.getPosition()}.`);

        // Check for special entity at the new position
        if (this.board.hasSpecialEntity(player.getPosition())) {
            const entity = this.board.getSpecialEntity(player.getPosition());
            if (entity) {
                const oldPosition = player.getPosition();
                player.setPosition(entity.getEndPosition());
                console.log(`Oh! ${player.getName()} landed on a ${entity.constructor.name}! Moving from ${oldPosition} to ${player.getPosition()}.`);
            }
        }

        // Check for win condition
        if (player.getPosition() === totalCells) {
            this.gameStatus = GameStatus.FINISHED;
            console.log(`\n--- ${player.getName()} wins the game! Congratulations! ---`);
            return player; // Return the winning player
        }

        // If game not finished, move to the next player's turn
        this.moveToNextPlayer();
        return null; // No winner yet
    }

    /**
     * Moves the current player pointer to the next player in the sequence.
     * This handles wrapping around to the first player if at the end of the player list.
     */
    moveToNextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.currentPlayer = this.players[this.currentPlayerIndex];
        console.log(`Next turn: ${this.currentPlayer.getName()}`);
    }

    /**
     * Gets the current status of the game.
     * @returns {string} The current game status string.
     */
    getGameStatus() {
        return this.gameStatus;
    }

    /**
     * Gets the current player whose turn it is.
     * @returns {Player | null} The current player object, or null if the game hasn't started.
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    /**
     * Gets all players currently in the game.
     * @returns {Player[]} An array of Player objects.
     */
    getPlayers() {
        return [...this.players]; // Return a copy
    }

    /**
     * Resets the game to its initial state, allowing a new game to be started.
     * This clears player positions and resets game status.
     * Commentary: Essential for playing multiple games without re-instantiating everything.
     */
    resetGame() {
        this.players.forEach(player => player.setPosition(0));
        this.gameStatus = GameStatus.NOT_STARTED;
        this.currentPlayerIndex = 0;
        this.currentPlayer = null;
        console.log("\n--- Game reset. Ready for a new game! ---");
    }
}