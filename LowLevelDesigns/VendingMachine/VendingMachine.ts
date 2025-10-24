import { Inventory } from "./Inventory";

class VendingMachine {
    private inventory: Inventory;
    private balance: number = 0;
    public state: State = State.IDLE;

    constructor(inventory: Inventory) {
        this.inventory = inventory;
    }

    insertCoin(coin: Coin): void {
        this.balance += coin;
    }
    selectProduct(productName: string): void {
        const productEntry = this.inventory.getInventory().get(productName);
        if (!productEntry || productEntry.quantity === 0) {
            this.state = State.OUT_OF_STOCK;
            throw new Error("Product out of stock");
        }
        if (this.balance < productEntry.product.price) {
            throw new Error("Insufficient balance");
        }
        this.balance -= productEntry.product.price;
        this.inventory.removeProduct(productName, 1);
        this.state = State.DISPENSING;
        // Simulate dispensing
        setTimeout(() => {
            this.state = State.IDLE;
        }, 1000);
    }

    refund(): number {
        const refundAmount = this.balance;
        this.balance = 0;
        this.state = State.IDLE;
        return refundAmount;
    }

    getBalance(): number {
        return this.balance;
    }

    getState(): State {
        return this.state;
    }
}

export { VendingMachine };