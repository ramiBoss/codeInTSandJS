import Game from "./Game";

interface GameObserver {
    update(game: Game): void;
}

export default GameObserver;