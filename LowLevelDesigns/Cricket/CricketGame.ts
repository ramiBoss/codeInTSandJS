import { CricketPlayer } from "./Player";

class CricketGame {
    private teamOne: CricketPlayer[];
    private teamTwo: CricketPlayer[];
    private overs: number;
    private currentOver: number;
    private currentBatsmanIndex: number;
    private currentBowlerIndex: number;
    private matchStatus: string;
    
    constructor(overs: number) {
        if (overs <= 0) {
            throw new Error("Number of overs must be a positive integer.");
        }
        this.overs = overs;
        this.currentOver = 0;
        this.currentBatsmanIndex = 0;
        this.currentBowlerIndex = 0;
        this.matchStatus = "NOT_STARTED"; // Initial match status
        this.teamOne = [];
        this.teamTwo = [];
    }

    addTeams(teamOne: CricketPlayer[], teamTwo: CricketPlayer[]): void {
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
    }

    startMatch(): void {
        if (this.matchStatus !== "NOT_STARTED") {
            throw new Error("Match has already started or finished.");
        }
        this.matchStatus = "IN_PROGRESS";
        this.currentOver = 0;
        this.currentBatsmanIndex = 0;
        this.currentBowlerIndex = 0;
    }

    endMatch(): void {
        if (this.matchStatus !== "IN_PROGRESS") {
            throw new Error("Match is not currently in progress.");
        }
        this.matchStatus = "FINISHED";
    }

    getMatchStatus(): string {
        return this.matchStatus;
    }
}