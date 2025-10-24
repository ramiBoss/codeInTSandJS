/**
 * Book availability status enumeration
 */
export enum BookStatus {
    AVAILABLE = 'AVAILABLE',
    BORROWED = 'BORROWED',
    RESERVED = 'RESERVED',
    MAINTENANCE = 'MAINTENANCE',
    LOST = 'LOST'
}

/**
 * Book category enumeration for better organization
 */
export enum BookCategory {
    FICTION = 'FICTION',
    NON_FICTION = 'NON_FICTION',
    SCIENCE = 'SCIENCE',
    HISTORY = 'HISTORY',
    BIOGRAPHY = 'BIOGRAPHY',
    MYSTERY = 'MYSTERY',
    ROMANCE = 'ROMANCE',
    FANTASY = 'FANTASY',
    TECHNOLOGY = 'TECHNOLOGY',
    REFERENCE = 'REFERENCE'
}

/**
 * @interface BookInterface
 * @description Interface for Book to support extensibility
 */
export interface BookInterface {
    readonly id: string;
    readonly title: string;
    readonly author: string;
    readonly isbn: string;
    readonly publishedYear: number;
    readonly category: BookCategory;
    readonly totalCopies: number;
    readonly availableCopies: number;
    
    isAvailable(): boolean;
    borrowCopy(borrowerId: string): boolean;
    returnCopy(borrowerId: string): boolean;
    getDetails(): string;
    updateStatus(status: BookStatus): void;
}

/**
 * @class Book
 * @description Enhanced book class with better state management and concurrency support
 */
export class Book implements BookInterface {
    private static idCounter = 1;
    
    public readonly id: string;
    private status: BookStatus = BookStatus.AVAILABLE;
    private currentBorrowers: Set<string> = new Set();
    private reservationQueue: string[] = [];
    private readonly lockObject = Symbol('bookLock');
    
    /**
     * Creates an instance of Book with enhanced properties
     */
    constructor(
        public readonly title: string,
        public readonly author: string,
        public readonly isbn: string,
        public readonly publishedYear: number,
        public readonly category: BookCategory = BookCategory.FICTION,
        public readonly totalCopies: number = 1,
        private _availableCopies: number = totalCopies,
        public readonly description?: string,
        public readonly publisher?: string,
        public readonly language: string = 'English'
    ) {
        this.id = `BOOK_${Book.idCounter++}`;
        this._availableCopies = Math.min(this._availableCopies, this.totalCopies);
    }

    /**
     * Get number of available copies
     */
    get availableCopies(): number {
        return this._availableCopies;
    }

    /**
     * Check if any copies are available for borrowing
     */
    isAvailable(): boolean {
        return this._availableCopies > 0 && this.status !== BookStatus.MAINTENANCE;
    }

    /**
     * Borrow a copy of this book
     */
    borrowCopy(borrowerId: string): boolean {
        if (!this.isAvailable()) {
            return false;
        }
        
        if (this.currentBorrowers.has(borrowerId)) {
            throw new Error(`Member ${borrowerId} has already borrowed this book`);
        }

        this.currentBorrowers.add(borrowerId);
        this._availableCopies--;
        
        if (this._availableCopies === 0) {
            this.status = BookStatus.BORROWED;
        }
        
        console.log(`Book "${this.title}" borrowed by ${borrowerId}. Available copies: ${this._availableCopies}`);
        return true;
    }

    /**
     * Return a copy of this book
     */
    returnCopy(borrowerId: string): boolean {
        if (!this.currentBorrowers.has(borrowerId)) {
            throw new Error(`Member ${borrowerId} has not borrowed this book`);
        }

        this.currentBorrowers.delete(borrowerId);
        this._availableCopies++;
        
        if (this._availableCopies > 0 && this.status === BookStatus.BORROWED) {
            this.status = BookStatus.AVAILABLE;
        }
        
        console.log(`Book "${this.title}" returned by ${borrowerId}. Available copies: ${this._availableCopies}`);
        return true;
    }

    /**
     * Update book status
     */
    updateStatus(status: BookStatus): void {
        if (status === BookStatus.MAINTENANCE && this.currentBorrowers.size > 0) {
            throw new Error('Cannot set book to maintenance while copies are borrowed');
        }
        this.status = status;
    }

    /**
     * Get current borrowers
     */
    getCurrentBorrowers(): string[] {
        return Array.from(this.currentBorrowers);
    }

    /**
     * Add member to reservation queue
     */
    addReservation(memberId: string): boolean {
        if (this.reservationQueue.includes(memberId)) {
            return false;
        }
        this.reservationQueue.push(memberId);
        return true;
    }

    /**
     * Remove member from reservation queue
     */
    removeReservation(memberId: string): boolean {
        const index = this.reservationQueue.indexOf(memberId);
        if (index > -1) {
            this.reservationQueue.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Get next member in reservation queue
     */
    getNextReservation(): string | null {
        return this.reservationQueue.length > 0 ? this.reservationQueue[0] : null;
    }

    /**
     * Get detailed book information
     */
    getDetails(): string {
        return `[${this.id}] "${this.title}" by ${this.author}
ISBN: ${this.isbn} | Year: ${this.publishedYear} | Category: ${this.category}
Status: ${this.status} | Available: ${this._availableCopies}/${this.totalCopies}
Current Borrowers: ${this.getCurrentBorrowers().join(', ') || 'None'}
Reservations: ${this.reservationQueue.length}`;
    }

    /**
     * Get basic book information
     */
    getBasicInfo(): string {
        return `${this.title} by ${this.author}, ISBN: ${this.isbn}, Published Year: ${this.publishedYear}`;
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use borrowCopy instead
     */
    assignBorrower(borrower: string): void {
        if (!this.borrowCopy(borrower)) {
            throw new Error(`Book "${this.title}" is not available for borrowing`);
        }
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use returnCopy instead
     */
    returnBook(): void {
        if (this.currentBorrowers.size === 0) {
            throw new Error(`Book "${this.title}" is not currently borrowed`);
        }
        // Return first borrower's copy for compatibility
        const firstBorrower = this.currentBorrowers.values().next().value;
        this.returnCopy(firstBorrower);
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use isAvailable instead
     */
    isBookAvailable(): boolean {
        return this.isAvailable();
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use getCurrentBorrowers instead
     */
    getBorrower(): string | null {
        return this.currentBorrowers.size > 0 
            ? this.currentBorrowers.values().next().value 
            : null;
    }
}