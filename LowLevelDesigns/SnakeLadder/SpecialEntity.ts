/**
 * @abstract
 * @class SpecialEntity
 * @description Represents an abstract base class for special entities on the game board,
 * such as Snakes and Ladders. It defines common properties and an abstract method for getting an ID.
 */
class SpecialEntity {

    public startPosition: number;
    public endPosition: number;
    /**
     * @property {number} startPosition - The cell number where the special entity starts (e.g., mouth of a snake, base of a ladder).
     * @property {number} endPosition - The cell number where the special entity leads to (e.g., tail of a snake, top of a ladder).
     */
    constructor(start: number, end: number) {
        if (new.target === SpecialEntity) {
            throw new TypeError("Cannot construct SpecialEntity instances directly. Use Snake or Ladder.");
        }
        if (start < 1 || end < 1) {
            throw new Error("Start and end positions must be positive numbers.");
        }
        this.startPosition = start;
        this.endPosition = end;
    }

    /**
     * Gets the target position after encountering this special entity.
     * @returns {number} The end position of the special entity.
     */
    getEndPosition(): number {
        return this.endPosition;
    }

    /**
     * Gets the position where this special entity is activated.
     * @returns {number} The start position of the special entity.
     */
    getStartPosition(): number {
        return this.startPosition;
    }

    /**
     * @abstract
     * @method getID
     * @description Abstract method to be implemented by subclasses to provide a unique identifier for the entity.
     * @returns {string} A unique ID for the special entity.
     */
    getID(): string {
        throw new Error("Method 'getID()' must be implemented by subclasses.");
    }
}