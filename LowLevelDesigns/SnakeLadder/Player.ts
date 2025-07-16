/**
 * @class Player
 * @description Represents a player in the game.
 */
class Player {
    /**
     * @property {string} name - The name of the player.
     * @property {number} position - The current cell number the player is on. Starts at 0 (before the board).
     */
    name: string;
    position: number;

    /**
     * Creates an instance of Player.
     * @param {string} name - The name of the player.
     * @throws {Error} If the name is empty or not a string.
     */
    constructor(name: string) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("Player name cannot be empty.");
        }
        this.name = name;
        this.position = 0; // Players start at position 0, before cell 1.
    }

    /**
     * Sets the player's current position on the board.
     * @param {number} position - The new cell number for the player.
     */
    setPosition(position: number) {
        this.position = position;
    }

    /**
     * Gets the player's current position on the board.
     * @returns {number} The current cell number.
     */
    getPosition(): number {
        return this.position;
    }

    /**
     * Sets the player's name.
     * @param {string} name - The new name for the player.
     * @throws {Error} If the name is empty or not a string.
     */
    setName(name: string) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("Player name cannot be empty.");
        }
        this.name = name;
    }

    /**
     * Gets the player's name.
     * @returns {string} The player's name.
     */
    getName(): string {
        return this.name;
    }
}