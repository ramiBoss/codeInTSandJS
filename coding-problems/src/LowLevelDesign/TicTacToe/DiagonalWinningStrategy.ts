import Board from "./Board";
import WinningStrategy from "./WinningStrategy.interface";

class DiagonalWinningStrategy implements WinningStrategy {
    size: number;

    constructor(size: number) {
        this.size = size;
    }

    checkWin(board: Board, symbol: string): boolean {
        let win = true;
        // Check primary diagonal
        for (let i = 0; i < this.size; i++) {
            if (board.getCell(i, i)?.getSymbol() !== symbol) {
                win = false;
                break;
            }
        }
        if (win) return true;

        // Check secondary diagonal
        win = true;
        for (let i = 0; i < this.size; i++) {
            if (board.getCell(i, this.size - i - 1)?.getSymbol() !== symbol) {
                win = false;
                break;
            }
        }
        return win;
    }
}

export default DiagonalWinningStrategy;