import Board from "./Board";

interface WinningStrategy {
    checkWin(board: Board, symbol: string): boolean;
}

export default WinningStrategy;