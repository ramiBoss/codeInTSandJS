/**
 * @class Receipt
 * @description Represents a record of one or more books borrowed by a specific user.
 * It tracks the borrowing and return dates and can calculate charges.
 *
 */
class Receipt {
    // Private array to hold all books associated with this single borrowing transaction.
    public books: Book[] = [];

    /**
     * Creates an instance of Receipt (Borrowing Transaction).
     * @param {string} userId - The ID of the user who borrowed the book(s).
     * @param {Book} book - The first book borrowed in this transaction.
     * @param {Date} assignedOn - The date and time when the book(s) were borrowed.
     * @param {Date | null} [returnedOn=null] - The date and time when all book(s) were returned. Null if not yet returned.
     */
    constructor(
        public userId: string,
        book: Book, // Changed to private to reinforce that the internal `books` array is the source of truth
        public assignedOn: Date,
        public returnedOn: Date | null = null,
    ) {
        this.books.push(book); // Add the initial book to the internal list.
    }

    /**
     * Adds another book to this existing borrowing transaction.
     * This is useful if a user borrows multiple books simultaneously under one record.
     * @param {Book} book - The book to add to this receipt/transaction.
     */
    addAnotherBook(book: Book): void {
        this.books.push(book);
        console.log(`Added "${book.title}" to receipt for User ID: ${this.userId}.`);
    }

    /**
     * Sets the return date for this borrowing transaction.
     * This implies all books on this receipt are being returned at this time.
     */
    setReturnedOn(): void {
        this.returnedOn = new Date();
        console.log(`Receipt for User ID: ${this.userId} marked as returned on ${this.returnedOn.toDateString()}.`);
    }

    /**
     * Generates a detailed string representation of the receipt.
     * @returns {string} A formatted string showing user ID, borrowed books, and dates.
     */
    getReceiptDetails(): string {
       const bookDetails = this.books.map(book => `- ${book.getDetails()}`).join('\n'); // Improved formatting
       return `Receipt for User ID: ${this.userId}\nBooks Borrowed:\n${bookDetails}\nAssigned On: ${this.assignedOn.toDateString()}\nReturned On: ${this.returnedOn ? this.returnedOn.toDateString() : 'Not Returned Yet'}`;
   }

   /**
    * Calculates the total charges for the borrowed books based on a daily rate.
    * The charge is per book, per day.
    * @param {number} dailyRate - The daily charge for each book.
    * @returns {number} The total calculated charge.
    * @throws {Error} If the book(s) on this receipt have not been returned yet.
    */
   calculateCharges(dailyRate: number): number {
       if (!this.returnedOn) {
           throw new Error('Book(s) have not been returned yet. Cannot calculate charges.');
       }
       // Calculate days borrowed, rounding up to ensure full day is charged even for partial day.
       const daysBorrowed = Math.ceil((this.returnedOn.getTime() - this.assignedOn.getTime()) / (1000 * 60 * 60 * 24));
       // Total charge is days * daily rate * number of books on this receipt.
       return daysBorrowed * dailyRate * this.books.length;
   }
}