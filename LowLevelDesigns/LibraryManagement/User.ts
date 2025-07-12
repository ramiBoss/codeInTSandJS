class User {
    constructor(
        public userId: string,
        public name: string,
        public email: string
    ) {}

    getDetails(): string {
        return `User ID: ${this.userId}, Name: ${this.name}, Email: ${this.email}`;
    }
}