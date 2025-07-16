import { BatsMan, Bowler } from "./Player";

class ScoreBoard {
    public numberOfOvers: number;
    public venue: string;
    public matchStatus: string;
    public batsmen: BatsMan[];
    public bowlers: Bowler[];

    constructor(numberOfOvers: number, venue: string) {
        if (numberOfOvers <= 0) {
            throw new Error("Number of overs must be a positive integer.");
        }
        this.numberOfOvers = numberOfOvers;
        this.venue = venue;
        this.matchStatus = "NOT_STARTED"; // Initial match status
        this.batsmen = [];
        this.bowlers = [];
    }

    /**
     * Adds a batsman to the scoreboard.
     * @param {BatsMan} batsman - The batsman to add.
     */
    addBatsman(batsman: BatsMan) {
        this.batsmen.push(batsman);
    }

    /**
     * Adds a bowler to the scoreboard.
     * @param {Bowler} bowler - The bowler to add.
     */
    addBowler(bowler: Bowler) {
        this.bowlers.push(bowler);
    }

    /**
     * Gets the current status of the match.
     * @returns {string} The current match status.
     */
    getMatchStatus(): string {
        return this.matchStatus;
    }

    /**
     * Sets the match status.
     * @param {string} status - The new match status.
     */
    setMatchStatus(status: string) {
        this.matchStatus = status;
    }

    /**
     * Gets the list of batsmen.
     * @returns {BatsMan[]} The list of batsmen.
     */
    getBatsmen(): BatsMan[] {
        return this.batsmen;
    }

    /**
     * Gets the list of bowlers.
     * @returns {Bowler[]} The list of bowlers.
     */
    getBowlers(): Bowler[] {
        return this.bowlers;
    }

    /**
     * Gets the venue of the match.
     * @returns {string} The venue of the match.
     */
    getVenue(): string {
        return this.venue;
    }

    /**
     * Sets the venue of the match.
     * @param {string} venue - The new venue for the match.
     */
    setVenue(venue: string) {
        this.venue = venue;
    }
}