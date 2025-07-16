/**
 * @class Board
 * @description Represents the game board, managing its dimensions, cells, and special entities (snakes/ladders).
 */
class Board {
    /**
     * @property {number} dimension - The number of rows/columns (e.g., 10 for a 10x10 board).
     * @property {Map<number, SpecialEntity>} specialEntities - A map storing special entities (Snakes/Ladders)
     * where the key is the start position and the value is the entity object.
     */
    dimension: number;
    specialEntities = new Map<number, SpecialEntity>();

    /**
     * Creates an instance of Board.
     * @param {number} dimension - The dimension of the square board (e.g., 10 for 10x10).
     * @throws {Error} If the dimension is not a positive integer.
     */
    constructor(dimension: number) {
        if (!Number.isInteger(dimension) || dimension <= 0) {
            throw new Error("Board dimension must be a positive integer.");
        }
        this.dimension = dimension;
    }

    /**
     * Prints a visual representation of the board to the console.
     * It arranges cells in a grid pattern and indicates special entities.
     *
     * Commentary:
     * This `printBoard` method is significantly improved to correctly render a grid.
     * It handles alternating row directions to mimic a standard Snakes and Ladders board layout.
     * It also clearly displays cell numbers and indicates if a special entity is present.
     */
    printBoard() {
        const totalCells = this.getTotalCells();
        let boardString = '';

        for (let row = this.dimension - 1; row >= 0; row--) {
            let rowCells: string[] = [];
            // Alternate direction of numbering rows to mimic Snakes and Ladders board (e.g., 1-10, then 20-11, then 21-30)
            const isEvenRow = (row % 2 === 0);
            const startCellInRow = row * this.dimension + 1;
            const endCellInRow = (row + 1) * this.dimension;

            for (let col = 0; col < this.dimension; col++) {
                let cellNumber;
                if (isEvenRow) {
                    cellNumber = startCellInRow + col;
                } else {
                    cellNumber = endCellInRow - col;
                }

                let cellContent = String(cellNumber).padStart(3, ' '); // Pad for consistent width
                if (this.specialEntities.has(cellNumber)) {
                    const entity = this.specialEntities.get(cellNumber);
                    cellContent += entity ? `[${entity.getID()}]` : '[]'; // Add entity ID
                } else {
                    cellContent += '    '; // Placeholder for alignment
                }
                rowCells.push(`| ${cellContent} `);
            }
            boardString += rowCells.join('') + '|\n';
            // Add a separator line after each row
            boardString += '----'.repeat(this.dimension * 2 + 1) + '\n';
        }
        console.log(boardString);
    }

    /**
     * Gets the dimension of the board (e.g., 10 for a 10x10 board).
     * @returns {number} The dimension of the board.
     */
    getDimension(): number {
        return this.dimension;
    }

    /**
     * Calculates the total number of cells on the board.
     * @returns {number} The total number of cells.
     */
    getTotalCells(): number {
        return this.dimension * this.dimension;
    }

    /**
     * Adds a special entity (Snake or Ladder) to the board.
     * @param {SpecialEntity} entity - The special entity to add.
     * @throws {Error} If the entity's start or end position is outside the board bounds,
     * or if an entity already exists at the start position.
     */
    addSpecialEntity(entity: SpecialEntity) {
        const actionPosition = entity.getStartPosition();
        const endPosition = entity.getEndPosition();
        const totalCells = this.getTotalCells();

        if (actionPosition < 1 || actionPosition > totalCells ||
            endPosition < 1 || endPosition > totalCells) {
            throw new Error(`Special entity positions (${actionPosition}, ${endPosition}) must be within board bounds (1 to ${totalCells}).`);
        }
        if (actionPosition === totalCells || actionPosition === 1) {
             throw new Error(`Special entities cannot start on the first (1) or last (${totalCells}) cell.`);
        }
        if (this.specialEntities.has(actionPosition)) {
            throw new Error(`A special entity already exists at position ${actionPosition}.`);
        }
        if (this.specialEntities.has(endPosition)) {
            // Optional: Prevent overlap on end position too, might lead to complex chains.
            console.warn(`Warning: Another special entity starts at the end position ${endPosition} of this entity.`);
        }
        
        this.specialEntities.set(actionPosition, entity);
        console.log(`Added ${entity.constructor.name} from ${actionPosition} to ${endPosition}.`);
    }

    /**
     * Checks if a special entity exists at a given board position.
     * @param {number} position - The board cell number to check.
     * @returns {boolean} True if a special entity is at the position, false otherwise.
     */
    hasSpecialEntity(position) {
        return this.specialEntities.has(position);
    }

    /**
     * Retrieves the special entity at a given board position.
     * @param {number} position - The board cell number to retrieve the entity from.
     * @returns {SpecialEntity | null} The special entity object if found, otherwise null.
     */
    getSpecialEntity(position) {
        return this.specialEntities.get(position) || null;
    }
}