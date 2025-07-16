/**
 * @class Dice
 * @description Represents a standard dice used in the game.
 */
class Dice {
    /**
     * @property {number} maxValue - The maximum value that can be rolled on the dice (e.g., 6 for a standard die).
     */
    private maxValue: number;

    /**
     * Creates an instance of Dice.
     * @param {number} maxValue - The maximum value the dice can roll.
     * @throws {Error} If maxValue is not a positive integer.
     */
    constructor(maxValue: number) {
        if (!Number.isInteger(maxValue) || maxValue <= 0) {
            throw new Error("Dice maxValue must be a positive integer.");
        }
        this.maxValue = maxValue;
    }

    /**
     * Simulates rolling the dice.
     * @returns {number} A random integer between 1 and `maxValue` (inclusive).
     */
    rollDice(): number {
        return Math.floor(Math.random() * this.maxValue) + 1;
    }
}