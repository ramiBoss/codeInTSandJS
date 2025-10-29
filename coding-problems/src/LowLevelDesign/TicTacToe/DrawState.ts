import Game from "./Game";
import GameState from "./GameState.interface";
import Player from "./Player";


class DrawState implements GameState {
    handleMove(game: Game, player: Player, row: number, col: number): void {
        throw new Error("Game ended in a draw");
    }
}

export default DrawState;