class Over {
    private runOnballs: number[];

    constructor(overNumber: number) {
        if (overNumber < 1) {
            throw new Error("Over number must be a positive integer.");
        }
        this.runOnballs = Array(6).fill(0); // Initialize runs for 6 balls in the over
    }

    /**
     * Records runs scored on a specific ball.
     * @param {number} ballIndex - The index of the ball (0 to 5).
     * @param {number} runs - The number of runs scored on that ball.
     */
    recordRuns(ballIndex: number, runs: number) {
        if (ballIndex < 0 || ballIndex >= 6) {
            throw new Error("Ball index must be between 0 and 5.");
        }
        if (runs < 0) {
            throw new Error("Runs cannot be negative.");
        }
        this.runOnballs[ballIndex] = runs;
    }

    /**
     * Gets the total runs scored in the over.
     * @returns {number} The total runs scored in the over.
     */
    getTotalRuns(): number {
        return this.runOnballs.reduce((total, runs) => total + runs, 0);
    }
}