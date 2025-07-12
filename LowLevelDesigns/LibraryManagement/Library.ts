/**
 * @class Library
 * @description Manages the collection of books and facilitates borrowing/returning operations.
 * It acts as the central hub for interacting with the library system.
 */
class Library {
    // Private array to hold all `Book` objects available in the library.
    private books: Book[] = [];
    // A more complete system would also have a list of active and past receipts/borrowing records
    private borrowingRecords: Receipt[] = [];

    /**
     * Creates an instance of Library.
     */
    constructor() {
        console.log("Library system initialized.");
    }

    /**
     * Adds a book to the library's collection.
     * @param {Book} book - The book object to add.
     */
    addBook(book: Book): void {
        // Optional: Check for duplicate ISBN before adding
        if (this.books.some(b => b.isbn === book.isbn)) {
            console.warn(`Book with ISBN ${book.isbn} already exists in the library.`);
            return;
        }
        this.books.push(book);
        console.log(`Added book: "${book.title}" to the library.`);
    }

    /**
     * Removes a book from the library's collection by its ISBN.
     * @param {string} isbn - The ISBN of the book to remove.
     * @throws {Error} If the book with the specified ISBN is not found.
     * Commentary: You might want to prevent removal if the book is currently borrowed.
     */
    removeBook(isbn: string): void {
        const index = this.books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
            // Optional: Prevent removal if book is currently borrowed
            if (!this.books[index].isBookAvailable()) {
                throw new Error(`Book "${this.books[index].title}" (ISBN: ${isbn}) is currently borrowed and cannot be removed.`);
            }
            this.books.splice(index, 1);
            console.log(`Removed book with ISBN: ${isbn} from the library.`);
        } else {
            throw new Error(`Book with ISBN ${isbn} not found in the library.`);
        }
    }

    /**
     * Searches for a book by its title (case-insensitive).
     * @param {string} title - The title of the book to search for.
     * @returns {Book | null} The found book object, or null if not found.
     */
    searchBookByTitle(title: string): Book | null {
        const foundBook = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (!foundBook) {
            console.log(`Book with title "${title}" not found.`);
        }
        return foundBook || null;
    }

    /**
     * Lists all books currently in the library's collection.
     * @returns {Book[]} An array of all book objects.
     */
    listBooks(): Book[] {
        if (this.books.length === 0) {
            console.log("No books currently in the library.");
        }
        return [...this.books]; // Return a shallow copy to prevent external modification of the internal array.
    }
    
    /**
     * Checks if a book is available for borrowing using its ISBN.
     * @param {string} isbn - The ISBN of the book to check.
     * @returns {boolean} True if the book is found and available, false otherwise.
     */
    isBookAvailable(isbn: string): boolean {
        const book = this.books.find(book => book.isbn === isbn);
        if (!book) {
            console.warn(`Book with ISBN ${isbn} not found in library.`);
            return false;
        }
        return book.isBookAvailable();
    }

    /**
     * Assigns a book to a borrower and creates a new receipt (borrowing record).
     * @param {string} isbn - The ISBN of the book to assign.
     * @param {string} borrowerId - The ID of the borrower.
     * @returns {Receipt | null} The new receipt/borrowing record, or null if the book cannot be borrowed.
     * @throws {Error} If the book is not found or cannot be borrowed.
     * Commentary: This method now also manages the `Receipt` objects.
     */
    assignBookToBorrower(isbn: string, borrowerId: string, currentReceipt: Receipt | null = null): Receipt | null {
        const book = this.books.find(book => book.isbn === isbn);
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found.`);
        }
        if (!book.isBookAvailable()) {
            throw new Error(`Book "${book.title}" (ISBN: ${isbn}) is currently borrowed.`);
        }

        try {
            book.assignBorrower(borrowerId);
             let receipt: Receipt;
            if (currentReceipt && currentReceipt.userId === borrowerId && currentReceipt.returnedOn === null) {
                // If a valid active receipt for this user is provided, add the book to it.
                currentReceipt.addAnotherBook(book);
                receipt = currentReceipt;
                console.log(`Added "${book.title}" to existing receipt for user ${borrowerId}.`);
            } else {
                // Otherwise, create a new receipt for this borrowing.
                receipt = new Receipt(borrowerId, book, new Date());
                this.borrowingRecords.push(receipt); // Store the new receipt
                console.log(`New receipt created for user ${borrowerId} with "${book.title}".`);
            }
            
            return receipt;
        } catch (error) {
            // Re-throw any errors from book.assignBorrower
            throw error;
        }
    }

    /**
     * Handles the return of a borrowed book.
     * This method will also update the corresponding receipt/borrowing record.
     * @param {string} isbn - The ISBN of the book being returned.
     * @returns {Receipt | null} The updated receipt for the returned book, or null if not found.
     * @throws {Error} If the book is not found or not currently borrowed.
     * Commentary: This now finds and updates the receipt.
     */
    returnBook(isbn: string): Receipt | null {
        const book = this.books.find(book => book.isbn === isbn);
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found.`);
        }
        if (book.isBookAvailable()) {
            throw new Error(`Book "${book.title}" (ISBN: ${isbn}) is not currently borrowed.`);
        }

        // Find the active receipt for this book and borrower (assuming one active receipt per book at a time)
        // This logic might need to be more sophisticated if a user can borrow multiple instances of the same book
        const activeReceipt = this.borrowingRecords.find(
            record => record.books.some(b => b.isbn === isbn) && record.returnedOn === null
        );

        if (!activeReceipt) {
            // This scenario should ideally not happen if assignBorrower works correctly
            throw new Error(`No active borrowing record found for book with ISBN ${isbn}.`);
        }

        try {
            book.returnBook();
            activeReceipt.setReturnedOn(); // Mark the receipt as returned
            console.log(`Book "${book.title}" returned. Receipt updated.`);
            return activeReceipt;
        } catch (error) {
            // Re-throw any errors from book.returnBook
            throw error;
        }
    }

    /**
     * Gets the details of a book using its ISBN.
     * @param {string} isbn - The ISBN of the book to retrieve details for.
     * @returns {string} A formatted string of the book's details.
     * @throws {Error} If the book with the specified ISBN is not found.
     */
    getBookDetails(isbn: string): string {
        const book = this.books.find(book => book.isbn === isbn);
        if (book) {
            return book.getDetails();
        } else {
            throw new Error(`Book with ISBN ${isbn} not found.`);
        }
    }

    /**
     * Retrieves all borrowing records (receipts) for a given user ID.
     * @param {string} userId - The ID of the user.
     * @returns {Receipt[]} An array of receipts associated with the user.
     */
    getBorrowingHistoryForUser(userId: string): Receipt[] {
        return this.borrowingRecords.filter(record => record.userId === userId);
    }

    /**
     * Retrieves the current borrower for a specific book.
     * @param {string} isbn - The ISBN of the book.
     * @returns {string | null} The borrower's ID if the book is borrowed, otherwise null.
     */
    getCurrentBorrower(isbn: string): string | null {
        const book = this.books.find(b => b.isbn === isbn);
        return book ? book.getBorrower() : null;
    }

     /**
     * Gets all active (not yet returned) receipts in the library.
     * @returns {Receipt[]} An array of active receipts.
     */
    getActiveReceipts(): Receipt[] {
        return this.borrowingRecords.filter(record => record.returnedOn === null);
    }
}