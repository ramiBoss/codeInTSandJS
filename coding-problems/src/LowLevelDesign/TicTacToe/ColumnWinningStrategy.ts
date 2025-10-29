import Board from "./Board";
import WinningStrategy from "./WinningStrategy.interface";

class ColumnWinningStrategy implements WinningStrategy {
    size: number;

    constructor(size: number) {
        this.size = size;
    }

    checkWin(board: Board, symbol: string): boolean {
        for (let col = 0; col < this.size; col++) {
            let win = true;
            for (let row = 0; row < this.size; row++) {
                if (board.getCell(row, col)?.getSymbol() !== symbol) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }
        return false;
    }
}

export default ColumnWinningStrategy;