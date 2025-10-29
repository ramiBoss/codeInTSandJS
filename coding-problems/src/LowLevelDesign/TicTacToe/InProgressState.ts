import DrawState from "./DrawState";
import Game from "./Game";
import GameState from "./GameState.interface";
import GameStatus from "./GameStatus.enum";
import Player from "./Player";
import SymbolMarker from "./Symbol.enum";
import WinState from "./WinState";

class InProgressState implements GameState {
    handleMove(game: Game, player: Player, row: number, col: number): void {
       if(game.getCurrentPlayer() !== player) {
        throw new Error("Not this player's turn");
       }
       
       game.getBoard().placeSymbol(row, col, player.getSymbol());
         if (game.checkWinner(game.getBoard(), player.getSymbol())) {
            game.setGameStatus(player.getSymbol() === SymbolMarker.X ? GameStatus.X_WON : GameStatus.O_WON);
            game.setWinner(player);
            game.setGameState(new WinState());
        } else if (game.getBoard().isFull()) {
            game.setGameStatus(GameStatus.DRAW);
            game.setGameState(new DrawState());
        } else {
            game.switchPlayer();
        }
    }
}

export default InProgressState;