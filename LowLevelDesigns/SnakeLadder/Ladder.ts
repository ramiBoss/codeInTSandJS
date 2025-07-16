/**
 * @class Ladder
 * @extends SpecialEntity
 * @description Represents a Ladder on the game board. A ladder moves a player up the board.
 * Ensures that the end position is greater than the start position.
 */
class Ladder extends SpecialEntity {
    /**
     * Creates an instance of Ladder.
     * @param {number} start - The starting cell of the ladder.
     * @param {number} end - The ending cell of the ladder.
     * @throws {Error} If the start position is not less than the end position.
     */
    constructor(start, end) {
        super(start, end);
        if (this.startPosition >= this.endPosition) {
            throw new Error(`Ladder must go up: start (${this.startPosition}) must be less than end (${this.endPosition}).`);
        }
    }

    /**
     * Gets the ID for this ladder.
     * @returns {string} A string identifier for the ladder (e.g., "L_15").
     */
    getID() {
        return `L_${this.endPosition}`;
    }
}