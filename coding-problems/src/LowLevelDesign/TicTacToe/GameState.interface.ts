import Game from "./Game";
import Player from "./Player";

interface GameState {
    handleMove(game: Game, player: Player,row: number, col: number): void;
}

export default GameState;