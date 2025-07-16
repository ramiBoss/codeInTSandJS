class CricketPlayer {
    constructor(public name: string, public position: number = 0) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error("Player name cannot be empty.");
        }
    }
}

class BatsMan extends CricketPlayer {
    constructor(name: string, public runs: number = 0, public ballsFaced: number = 0) {
        super(name);
        if (runs < 0 || ballsFaced < 0) {
            throw new Error("Runs and balls faced cannot be negative.");
        }
    }

    /**
     * Updates the runs scored by the batsman.
     * @param {number} runs - The number of runs to add.
     */
    updateRuns(runs: number) {
        if (runs < 0) {
            throw new Error("Runs cannot be negative.");
        }
        this.runs += runs;
    }

    /**
     * Updates the number of balls faced by the batsman.
     * @param {number} balls - The number of balls faced.
     */
    updateBallsFaced(balls: number) {
        if (balls < 0) {
            throw new Error("Balls faced cannot be negative.");
        }
        this.ballsFaced += balls;
    }

    /**
     * Gets the current score of the batsman.
     * @returns {number} The runs scored by the batsman.
     */
    getScore(): number {
        return this.runs;
    }

    /**
     * Gets the number of balls faced by the batsman.
     * @returns {number} The balls faced by the batsman.
     */
    getBallsFaced(): number {
        return this.ballsFaced;
    }
}


class Bowler extends CricketPlayer {
    constructor(name: string, public oversBowled: number = 0, public runsConceded: number = 0) {
        super(name);
        if (oversBowled < 0 || runsConceded < 0) {
            throw new Error("Overs bowled and runs conceded cannot be negative.");
        }
    }

    addOver() {
        this.oversBowled += 1;
    }

    /**
     * Updates the runs conceded by the bowler.
     * @param {number} runs - The number of runs conceded.
     */
    updateRunsConceded(runs: number) {
        if (runs < 0) {
            throw new Error("Runs conceded cannot be negative.");
        }
        this.runsConceded += runs;
    }

    /**
     * Gets the total overs bowled by the bowler.
     * @returns {number} The overs bowled by the bowler.
     */
    getOversBowled(): number {
        return this.oversBowled;
    }

    /**
     * Gets the total runs conceded by the bowler.
     * @returns {number} The runs conceded by the bowler.
     */
    getRunsConceded(): number {
        return this.runsConceded;
    }
}

// Exporting the classes for use in other modules

export { CricketPlayer, BatsMan, Bowler };