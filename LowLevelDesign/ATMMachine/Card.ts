class Card {
    private cardNumber: string;
    private cardHolderName: string;
    private expiryDate: string;
    private cvv: string;
    private pin: string;

    constructor(cardNumber: string, cardHolderName: string, expiryDate: string, cvv: string, pin: string) {
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.pin = pin;
    }

    getCardNumber(): string {
        return this.cardNumber;
    }

    getCardHolderName(): string {
        return this.cardHolderName;
    }

    getExpiryDate(): string {
        return this.expiryDate;
    }

    getCvv(): string {
        return this.cvv;
    }

    validatePin(inputPin: string): boolean {
        return this.pin === inputPin;
    }
}

export default Card;