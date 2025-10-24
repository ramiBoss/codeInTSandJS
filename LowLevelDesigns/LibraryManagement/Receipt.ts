import { Book } from './Book';
import { Member } from './User';

/**
 * Transaction type enumeration
 */
export enum TransactionType {
    BORROW = 'BORROW',
    RETURN = 'RETURN',
    RENEW = 'RENEW',
    RESERVE = 'RESERVE',
    FINE_PAYMENT = 'FINE_PAYMENT'
}

/**
 * Transaction status enumeration
 */
export enum TransactionStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    OVERDUE = 'OVERDUE',
    CANCELLED = 'CANCELLED'
}

/**
 * Book transaction entry interface
 */
export interface BookTransactionEntry {
    bookId: string;
    bookTitle: string;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    renewalCount: number;
    fineAmount: number;
    isOverdue: boolean;
}

/**
 * @interface ReceiptInterface
 * @description Interface for Receipt to support extensibility
 */
export interface ReceiptInterface {
    readonly receiptId: string;
    readonly memberId: string;
    readonly transactionType: TransactionType;
    readonly createdAt: Date;
    readonly status: TransactionStatus;
    
    addBook(book: Book, dueDate: Date): void;
    returnBook(bookId: string): void;
    calculateTotalFines(): number;
    isOverdue(): boolean;
}

/**
 * @class Receipt
 * @description Enhanced receipt class for comprehensive transaction management
 */
export class Receipt implements ReceiptInterface {
    private static receiptCounter = 1;
    
    public readonly receiptId: string;
    private bookTransactions: Map<string, BookTransactionEntry> = new Map();
    private _status: TransactionStatus = TransactionStatus.ACTIVE;
    private _totalFines: number = 0;
    
    constructor(
        public readonly memberId: string,
        public readonly transactionType: TransactionType = TransactionType.BORROW,
        public readonly createdAt: Date = new Date(),
        initialBook?: Book,
        initialDueDate?: Date
    ) {
        this.receiptId = `RCP_${String(Receipt.receiptCounter++).padStart(8, '0')}`;
        
        if (initialBook && initialDueDate) {
            this.addBook(initialBook, initialDueDate);
        }
    }

    /**
     * Get current status
     */
    get status(): TransactionStatus {
        if (this._status === TransactionStatus.ACTIVE) {
            // Check if any books are overdue
            const hasOverdue = Array.from(this.bookTransactions.values())
                .some(entry => !entry.returnDate && new Date() > entry.dueDate);
            
            if (hasOverdue) {
                this._status = TransactionStatus.OVERDUE;
            }
        }
        return this._status;
    }

    /**
     * Add a book to this receipt
     */
    addBook(book: Book, dueDate: Date): void {
        if (this.bookTransactions.has(book.id)) {
            throw new Error(`Book ${book.title} is already in this receipt`);
        }

        const entry: BookTransactionEntry = {
            bookId: book.id,
            bookTitle: book.title,
            borrowDate: new Date(),
            dueDate: dueDate,
            renewalCount: 0,
            fineAmount: 0,
            isOverdue: false
        };

        this.bookTransactions.set(book.id, entry);
        console.log(`Added "${book.title}" to receipt ${this.receiptId}`);
    }

    /**
     * Return a book
     */
    returnBook(bookId: string): void {
        const entry = this.bookTransactions.get(bookId);
        if (!entry) {
            throw new Error(`Book with ID ${bookId} not found in this receipt`);
        }

        if (entry.returnDate) {
            throw new Error(`Book ${entry.bookTitle} has already been returned`);
        }

        entry.returnDate = new Date();
        
        // Calculate fine if overdue
        if (new Date() > entry.dueDate) {
            const daysOverdue = Math.ceil((new Date().getTime() - entry.dueDate.getTime()) / (1000 * 60 * 60 * 24));
            entry.fineAmount = daysOverdue * 0.50; // $0.50 per day
            entry.isOverdue = true;
            this._totalFines += entry.fineAmount;
        }

        console.log(`Book "${entry.bookTitle}" returned. Fine: $${entry.fineAmount.toFixed(2)}`);
        
        // Check if all books are returned
        const allReturned = Array.from(this.bookTransactions.values())
            .every(e => e.returnDate !== undefined);
        
        if (allReturned) {
            this._status = TransactionStatus.COMPLETED;
        }
    }

    /**
     * Renew a book
     */
    renewBook(bookId: string, newDueDate: Date): boolean {
        const entry = this.bookTransactions.get(bookId);
        if (!entry) {
            return false;
        }

        if (entry.returnDate) {
            throw new Error(`Cannot renew returned book ${entry.bookTitle}`);
        }

        if (entry.renewalCount >= 2) {
            throw new Error(`Book ${entry.bookTitle} has reached maximum renewal limit`);
        }

        entry.dueDate = newDueDate;
        entry.renewalCount++;
        console.log(`Book "${entry.bookTitle}" renewed. Due date: ${newDueDate.toDateString()}`);
        return true;
    }

    /**
     * Calculate total fines for this receipt
     */
    calculateTotalFines(): number {
        let totalFines = 0;
        const currentDate = new Date();

        this.bookTransactions.forEach((entry) => {
            if (!entry.returnDate && currentDate > entry.dueDate) {
                const daysOverdue = Math.ceil((currentDate.getTime() - entry.dueDate.getTime()) / (1000 * 60 * 60 * 24));
                entry.fineAmount = daysOverdue * 0.50;
                entry.isOverdue = true;
            }
            totalFines += entry.fineAmount;
        });

        this._totalFines = totalFines;
        return totalFines;
    }

    /**
     * Check if receipt has overdue books
     */
    isOverdue(): boolean {
        const currentDate = new Date();
        return Array.from(this.bookTransactions.values())
            .some(entry => !entry.returnDate && currentDate > entry.dueDate);
    }

    /**
     * Get all book transactions
     */
    getBookTransactions(): BookTransactionEntry[] {
        return Array.from(this.bookTransactions.values());
    }

    /**
     * Get active (not returned) book transactions
     */
    getActiveTransactions(): BookTransactionEntry[] {
        return Array.from(this.bookTransactions.values())
            .filter(entry => !entry.returnDate);
    }

    /**
     * Get overdue book transactions
     */
    getOverdueTransactions(): BookTransactionEntry[] {
        const currentDate = new Date();
        return Array.from(this.bookTransactions.values())
            .filter(entry => !entry.returnDate && currentDate > entry.dueDate);
    }

    /**
     * Cancel the receipt
     */
    cancel(): void {
        if (this._status === TransactionStatus.COMPLETED) {
            throw new Error('Cannot cancel completed receipt');
        }
        this._status = TransactionStatus.CANCELLED;
    }

    /**
     * Get receipt details
     */
    getReceiptDetails(): string {
        const booksList = Array.from(this.bookTransactions.values())
            .map(entry => {
                const status = entry.returnDate 
                    ? `Returned: ${entry.returnDate.toDateString()}` 
                    : `Due: ${entry.dueDate.toDateString()}`;
                const fine = entry.fineAmount > 0 ? ` | Fine: $${entry.fineAmount.toFixed(2)}` : '';
                const renewals = entry.renewalCount > 0 ? ` | Renewals: ${entry.renewalCount}` : '';
                return `  - ${entry.bookTitle} | ${status}${fine}${renewals}`;
            }).join('\n');

        return `Receipt ID: ${this.receiptId}
Member ID: ${this.memberId}
Type: ${this.transactionType} | Status: ${this.status}
Created: ${this.createdAt.toDateString()}
Total Fines: $${this._totalFines.toFixed(2)}

Books:
${booksList}`;
    }

    // Legacy support methods for backward compatibility
    
    /**
     * Legacy property for backward compatibility
     */
    get userId(): string {
        return this.memberId;
    }

    /**
     * Legacy property for backward compatibility
     */
    get assignedOn(): Date {
        return this.createdAt;
    }

    /**
     * Legacy property for backward compatibility
     */
    get returnedOn(): Date | null {
        return this._status === TransactionStatus.COMPLETED ? new Date() : null;
    }

    /**
     * Legacy property for backward compatibility
     */
    get books(): Book[] {
        // This is a simplified representation for backward compatibility
        return [];
    }

    /**
     * Legacy method for backward compatibility
     */
    addAnotherBook(book: Book): void {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // Default 14-day loan
        this.addBook(book, dueDate);
    }

    /**
     * Legacy method for backward compatibility
     */
    setReturnedOn(): void {
        this._status = TransactionStatus.COMPLETED;
    }

    /**
     * Legacy method for backward compatibility
     */
    calculateCharges(dailyRate: number): number {
        return this.calculateTotalFines();
    }
}