import Game from "./Game";
import GameState from "./GameState.interface";
import Player from "./Player";

class WinState implements GameState {
    handleMove(game: Game, player: Player, row: number, col: number): void {
        throw new Error("Game has already been won");
    }
}

export default WinState;