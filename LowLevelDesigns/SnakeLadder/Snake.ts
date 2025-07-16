/**
 * @class Snake
 * @extends SpecialEntity
 * @description Represents a Snake on the game board. A snake moves a player down the board.
 * Ensures that the end position is less than the start position.
 */
class Snake extends SpecialEntity {
    /**
     * Creates an instance of Snake.
     * @param {number} start - The starting cell (mouth) of the snake.
     * @param {number} end - The ending cell (tail) of the snake.
     * @throws {Error} If the start position is not greater than the end position.
     */
    constructor(start, end) {
        super(start, end);
        if (this.startPosition <= this.endPosition) {
            throw new Error(`Snake must go down: start (${this.startPosition}) must be greater than end (${this.endPosition}).`);
        }
    }

    /**
     * Gets the ID for this snake.
     * @returns {string} A string identifier for the snake (e.g., "S_5").
     */
    getID() {
        return `S_${this.endPosition}`;
    }
}