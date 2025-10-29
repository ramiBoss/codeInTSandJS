import Account from "./Account";
import Card from "./Card";

class BankService {
    private accounts: Map<string, Account>;
    private cards: Map<string, Card>; // card
    private cardsToAccount: Map<Card, Account>; // cardNumber to accountNumber

    constructor() {
        this.accounts = new Map<string, Account>();
        this.cards = new Map<string, Card>();
        this.cardsToAccount = new Map<Card, Account>();
    }

    linkCardToAccount(card: Card, account: Account): void {
        this.cards.set(card.getCardNumber(), card);
        this.accounts.set(account.getAccountNumber(), account);
        this.cardsToAccount.set(card, account);
    }

    validateCard(card: Card, inputPin: string): boolean {
        if (card) {
            return card.validatePin(inputPin);
        }
        return false;
    }

    getBalance(card: Card): number | null {
        const account = this.cardsToAccount.get(card);
        if (account) {
            return account.getBalance();
        }
        return null;
    }
    
    deposit(card: Card, amount: number): void {
        const account = this.cardsToAccount.get(card);
        if (account) {
            account.deposit(amount);
        } else {
            throw new Error("Account not found");
        }
    }
    
    withdraw(card: Card, amount: number): boolean {
        const account = this.cardsToAccount.get(card);
        if (account) {
            return account.withdraw(amount);
        }
        return false;
    }

}

export default BankService;