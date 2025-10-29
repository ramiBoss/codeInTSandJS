class User {
    private id: number;
    private name: string;
    private reputation: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.reputation = 0; // Initial reputation
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getReputation(): number {
        return this.reputation;
    }

    increaseReputation(points: number): void {
        this.reputation += points;
    }

    decreaseReputation(points: number): void {
        this.reputation = Math.max(0, this.reputation - points); // Reputation cannot be negative
    }
}

export default User;