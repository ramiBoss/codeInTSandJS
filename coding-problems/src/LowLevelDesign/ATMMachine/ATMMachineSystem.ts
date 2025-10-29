import BankService from "./BankService";
import Card from "./Card";
import { DispenseChain, NoteDispenser } from "./DispenseChain";

interface ATMMachineState {
    insertCard(): void;
    ejectCard(): void;
    enterPin(pin: number): void;
    requestCash(amount: number): void;
};

class IdleState implements ATMMachineState {
    private atmMachine: ATMMachineSystem;

    constructor(atmMachine: ATMMachineSystem) {
        this.atmMachine = atmMachine;
    }

    insertCard(): void {
        console.log("Card inserted.");
        this.atmMachine.setState(new HasCardState(this.atmMachine));
    }

    ejectCard(): void {
        console.log("No card to eject.");
    }

    enterPin(pin: number): void {
        console.log("No card inserted. Please insert your card first.");
    }

    requestCash(amount: number): void {
        console.log("No card inserted. Please insert your card first.");
    }
}

class HasCardState implements ATMMachineState {
    private atmMachine: ATMMachineSystem;

    constructor(atmMachine: ATMMachineSystem) {
        this.atmMachine = atmMachine;
    }

    insertCard(): void {
        console.log("Card already inserted.");
    }

    ejectCard(): void {
        console.log("Ejecting card...");
        this.atmMachine.setState(new IdleState(this.atmMachine));
    }

    enterPin(pin: number): void {
        console.log("PIN entered.");
        this.atmMachine.setState(new AuthenticatedState(this.atmMachine));
    }

    requestCash(amount: number): void {
        console.log("Please enter PIN first.");
    }
}

class AuthenticatedState implements ATMMachineState {
    private atmMachine: ATMMachineSystem;

    constructor(atmMachine: ATMMachineSystem) {
        this.atmMachine = atmMachine;
    }

    insertCard(): void {
        console.log("Card already inserted.");
    }

    ejectCard(): void {
        console.log("Ejecting card...");
        this.atmMachine.setState(new IdleState(this.atmMachine));
    }

    enterPin(pin: number): void {
        console.log("PIN already entered.");
    }

    requestCash(amount: number): void {
        console.log(`Dispensing ${amount} cash.`);
        this.atmMachine.setState(new IdleState(this.atmMachine));
    }
}

class ATMMachineSystem {
    private static instance: ATMMachineSystem;
    private atmState: ATMMachineState;
    private bankService: BankService
    private cashDispenserChain: DispenseChain;
    private currentCard: Card;
    
    constructor() {
        this.atmState = new IdleState(this);
        this.bankService = new BankService();
        this.cashDispenserChain = new NoteDispenser(200);
        this.currentCard = null as any;
    }

    static getInstance(): ATMMachineSystem {
        if (!ATMMachineSystem.instance) {
            ATMMachineSystem.instance = new ATMMachineSystem();
        }
        return ATMMachineSystem.instance;
    }

    setState(state: ATMMachineState): void {
        this.atmState = state;
    }

    insertCard(card: Card): void {
        this.currentCard = card;
        this.atmState.insertCard();
    }

    enterPin(pin: number): void {
        if (this.bankService.validateCard(this.currentCard, pin.toString())) {
            this.atmState.enterPin(pin);
        } else {
            console.log("Invalid PIN. Ejecting card.");
        }
    }

    checkBalance(): void {
        const balance = this.bankService.getBalance(this.currentCard);
        console.log(`Current balance: ${balance}`);
    }

    withdrawCash(amount: number): void {
        const success = this.bankService.withdraw(this.currentCard, amount);
        if (success) {
            this.cashDispenserChain.dispense(amount);
            this.atmState.requestCash(amount);
        } else {
            console.log("Insufficient funds or invalid amount.");
        }
    }

    ejectCard(): void {
        this.atmState.ejectCard();
        this.currentCard = null as any;
    }

}