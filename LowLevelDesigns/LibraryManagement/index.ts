console.log("--- Initializing Library ---");
const library = new Library();

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565", 1925);
const book2 = new Book("1984", "George Orwell", "978-0451524935", 1949);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084", 1960);
const book4 = new Book("Brave New World", "Aldous Huxley", "978-0060850524", 1932);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);

console.log("\n--- User Borrows Multiple Books in One Go (One Receipt) ---");
const userId = "user001";
let user1CurrentReceipt: Receipt | null = null;

try {
    // User 001 borrows The Great Gatsby - this creates the first receipt
    user1CurrentReceipt = library.assignBookToBorrower(book1.isbn, userId);
    
    // User 001 also wants to borrow 1984 and Brave New World *at the same time*.
    // We pass the existing receipt to add these books to it.
    library.assignBookToBorrower(book2.isbn, userId, user1CurrentReceipt);
    library.assignBookToBorrower(book4.isbn, userId, user1CurrentReceipt);

} catch (error: any) {
    console.error(`Error during borrowing: ${error.message}`);
}

console.log(`\nIs "${book1.title}" available? ${library.isBookAvailable(book1.isbn)}`);
console.log(`Is "${book2.title}" available? ${library.isBookAvailable(book2.isbn)}`);
console.log(`Is "${book4.title}" available? ${library.isBookAvailable(book4.isbn)}`);

console.log("\n--- Details of User001's Active Receipt ---");
if (user1CurrentReceipt) {
    console.log(user1CurrentReceipt.getReceiptDetails());
}

console.log("\n--- User Borrows Another Book Later (New Receipt) ---");
const userId2 = "user002";
let user2Receipt: Receipt | null = null;
try {
    // User 002 borrows "To Kill a Mockingbird" - this creates a new receipt
    user2Receipt = library.assignBookToBorrower(book3.isbn, userId2);
} catch (error: any) {
    console.error(`Error during borrowing: ${error.message}`);
}

console.log("\n--- Details of User002's Active Receipt ---");
if (user2Receipt) {
    console.log(user2Receipt.getReceiptDetails());
}


console.log("\n--- Returning Books from User001's Receipt ---");
// Simulate returning book1 from user001's receipt
try {
    const returnedReceiptBook1 = library.returnBook(book1.isbn);
    console.log(`Is "${book1.title}" available now? ${library.isBookAvailable(book1.isbn)}`);
    console.log(`Borrower of "${book1.title}": ${library.getCurrentBorrower(book1.isbn)}`);
    // The receipt for user001 is NOT yet marked as returned, because other books are still out.
    if (returnedReceiptBook1 && returnedReceiptBook1.returnedOn === null) {
        console.log("User001's receipt is still active because not all books are returned.");
    }
} catch (error: any) {
    console.error(`Error returning book1: ${error.message}`);
}

// Simulate returning book2 from user001's receipt
try {
    library.returnBook(book2.isbn);
} catch (error: any) {
    console.error(`Error returning book2: ${error.message}`);
}

// Now return the last book (book4) from user001's receipt, which should mark the receipt as returned.
try {
    const finalReturnedReceipt = library.returnBook(book4.isbn);
    console.log(`Is "${book4.title}" available now? ${library.isBookAvailable(book4.isbn)}`);
    console.log(`Borrower of "${book4.title}": ${library.getCurrentBorrower(book4.isbn)}`);
    if (finalReturnedReceipt && finalReturnedReceipt.returnedOn) {
        console.log(`User001's receipt is now fully returned and marked as such.`);
        const dailyRate = 0.5; // Example daily rate
        console.log(`Calculated charge for User001's multi-book receipt: $${finalReturnedReceipt.calculateCharges(dailyRate)}`);
    }
} catch (error: any) {
    console.error(`Error returning book4: ${error.message}`);
}

console.log("\n--- All Active Receipts ---");
library.getActiveReceipts().forEach(receipt => {
    console.log(receipt.getReceiptDetails());
});

console.log("\n--- User Borrowing History for user001 ---");
library.getBorrowingHistoryForUser(userId).forEach((receipt: Receipt) => console.log(receipt.getReceiptDetails()));