import Game from "./Game";
import GameObserver from "./GameObsever.interface";

class Scoreboard implements GameObserver {
    private readonly scores: Map<string, number> = new Map();

    update(game: Game): void {
        const winner = game.getWinner();
        if (winner) {
            const currentScore = this.scores.get(winner.getName()) || 0;
            this.scores.set(winner.getName(), currentScore + 1);
        }
    }

    printScores(): void {
        console.log("Scoreboard:");
        for (const [playerName, score] of this.scores.entries()) {
            console.log(`${playerName}: ${score}`);
        }
    }
}

export default Scoreboard;