/**
 * @class Book
 * @description Represents a book in the library management system.
 * It contains properties such as title, author, ISBN, and published year,
 * along with methods to manage its availability and borrower.
 */
class Book {
    // Private properties to manage the book's availability and current borrower.
    private isAvailable: boolean = true;
    private borrower: string | null = null;

    /**
     * Creates an instance of Book.
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     * @param {string} isbn - The International Standard Book Number (unique identifier).
     * @param {number} publishedYear - The year the book was published.
     */
    constructor(
        public title: string,
        public author: string,
        public isbn: string,
        public publishedYear: number
    ) {}

    /**
     * Assigns a borrower to the book, marking it as unavailable.
     * @param {string} borrower - The name or ID of the person borrowing the book.
     * @throws {Error} If the book is already borrowed.
     */
    assignBorrower(borrower: string): void {
        if (this.isAvailable) {
            this.borrower = borrower;
            this.isAvailable = false;
            console.log(`Book "${this.title}" has been borrowed by ${this.borrower}.`);
        } else {
            // Throw an error if the book is already unavailable
            throw new Error(`Book "${this.title}" is currently borrowed by ${this.borrower}.`);
        }
    }

    /**
     * Marks the book as returned, making it available again.
     * Clears the borrower information.
     * @throws {Error} If the book is not currently borrowed.
     */
    returnBook(): void {
        if (!this.isAvailable) {
            this.borrower = null;
            this.isAvailable = true;
            console.log(`Book "${this.title}" has been returned.`);
        } else {
            // Throw an error if the book is already available (not borrowed)
            throw new Error(`Book "${this.title}" is not currently borrowed.`);
        }
    }

    /**
     * Checks the availability status of the book.
     * @returns {boolean} True if the book is available, false otherwise.
     */
    isBookAvailable(): boolean {
        return this.isAvailable;
    }

    /**
     * Gets the name or ID of the current borrower.
     * @returns {string | null} The borrower's name/ID if borrowed, otherwise null.
     */
    getBorrower(): string | null {
        return this.borrower;
    }
    
    /**
     * Returns a formatted string with the book's details.
     * @returns {string} A string containing the title, author, ISBN, and published year.
     */
    getDetails(): string {
        return `${this.title} by ${this.author}, ISBN: ${this.isbn}, Published Year: ${this.publishedYear}`;
    }
}