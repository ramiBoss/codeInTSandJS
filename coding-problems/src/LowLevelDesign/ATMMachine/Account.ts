import Card from "./Card";

class Account {
    private accountNumber: string;
    private accountHolderName: string;
    private balance: number;
    private card: Card;

    constructor(accountNumber: string, accountHolderName: string, initialBalance: number, card: Card) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = initialBalance;
        this.card = card;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }

    getAccountHolderName(): string {
        return this.accountHolderName;
    }

    getBalance(): number {
        return this.balance;
    }

    getCard(): Card {
        return this.card;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        } else {
            throw new Error("Deposit amount must be positive");
        }
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        } else {
            return false; // Insufficient funds or invalid amount
        }
    }
}

export default Account;