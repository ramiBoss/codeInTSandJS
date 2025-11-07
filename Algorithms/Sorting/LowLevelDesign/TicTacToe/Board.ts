import Cell from "./Cell";
import SymbolMarker from "./Symbol.enum";

class Board {
    private board: Cell[][];
    private size: number;
    private movesCount: number = 0;

    constructor(size: number) {
        this.size = size;
        this.board = Array.from({length: size}, () => Array.from({length: size}, () => new Cell()));
    }

    getCell(row: number, col: number): Cell | null {
        return this.board[row]?.[col] ?? null;
    }

    printBoard(): void {
        for (let i = 0; i < this.size; i++) {
            let row = "";
            for (let j = 0; j < this.size; j++) {
                row += this.board[i]![j]?.getSymbol() ?? "-" + " ";
            }
            console.log(row.trim());
        }
    }

    isFull(): boolean {
        return this.movesCount >= this.size * this.size;
    }

    placeSymbol(row: number, col: number, symbol: SymbolMarker): void {
        if (this.getCell(row, col)?.getSymbol() === SymbolMarker.EMPTY) {
            this.getCell(row, col)?.setSymbol(symbol);
            this.movesCount++;
        } else {
            throw new Error("Cell is already occupied");
        }
    
    }
}

export default Board;