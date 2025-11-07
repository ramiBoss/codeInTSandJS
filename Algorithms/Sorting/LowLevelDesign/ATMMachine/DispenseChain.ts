interface DispenseChain {
    setNextChain(chain: DispenseChain): void;
    dispense(cash: number): void;
    canDispense(cash: number): boolean;
}

class NoteDispenser implements DispenseChain {
    private noteValue: number;
    private nextChain: DispenseChain | null = null;
    private numNotes: number;

    constructor(denomination: number) {
        this.noteValue = denomination;
        this.numNotes = 0;
    }

    setNextChain(chain: DispenseChain): void {
        this.nextChain = chain;
    }

    dispense(cash: number): void {
        if (this.canDispense(cash)) {
            this.numNotes = Math.floor(cash / this.noteValue);
            const remainder = cash % this.noteValue;

            console.log(`Dispensing ${this.numNotes} notes of denomination ${this.noteValue}`);

            if (remainder !== 0 && this.nextChain) {
                this.nextChain.dispense(remainder);
            } else if (remainder !== 0) {
                console.log(`Cannot dispense remaining amount: ${remainder}`);
            }
        } else if (this.nextChain) {
            this.nextChain.dispense(cash);
        } else {
            console.log(`Cannot dispense amount: ${cash}`);
        }
    }

    canDispense(cash: number): boolean {
        return cash >= this.noteValue;
    }
}

class NoteDispenser100 extends NoteDispenser {
    constructor() {
        super(100);
    }
}

class NoteDispenser500 extends NoteDispenser {
    constructor() {
        super(500);
    }
}


export { DispenseChain, NoteDispenser, NoteDispenser100, NoteDispenser500 };