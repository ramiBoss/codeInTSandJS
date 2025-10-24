/**
 * Member type enumeration
 */
export enum MemberType {
    REGULAR = 'REGULAR',
    PREMIUM = 'PREMIUM',
    STUDENT = 'STUDENT',
    FACULTY = 'FACULTY',
    SENIOR = 'SENIOR'
}

/**
 * Member status enumeration
 */
export enum MemberStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    EXPIRED = 'EXPIRED',
    BLOCKED = 'BLOCKED'
}

/**
 * Contact information interface
 */
export interface ContactInfo {
    email: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

/**
 * Borrowing history entry interface
 */
export interface BorrowingHistoryEntry {
    bookId: string;
    bookTitle: string;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    isOverdue: boolean;
    fineAmount?: number;
}

/**
 * @interface MemberInterface
 * @description Interface for Member to support extensibility
 */
export interface MemberInterface {
    readonly memberId: string;
    readonly name: string;
    readonly memberType: MemberType;
    readonly status: MemberStatus;
    readonly contactInfo: ContactInfo;
    readonly registrationDate: Date;
    readonly maxBooksAllowed: number;
    readonly maxLoanDurationDays: number;
    
    canBorrowBooks(): boolean;
    getCurrentBorrowedCount(): number;
    addToBorrowingHistory(entry: BorrowingHistoryEntry): void;
    getBorrowingHistory(): BorrowingHistoryEntry[];
    calculateFines(): number;
}

/**
 * @class Member
 * @description Enhanced member class with comprehensive member management
 */
export class Member implements MemberInterface {
    private static memberCounter = 1;
    
    public readonly memberId: string;
    private _status: MemberStatus = MemberStatus.ACTIVE;
    private currentlyBorrowed: Set<string> = new Set();
    private borrowingHistory: BorrowingHistoryEntry[] = [];
    private totalFines: number = 0;
    private suspensionEndDate?: Date;
    
    constructor(
        public readonly name: string,
        public readonly contactInfo: ContactInfo,
        public readonly memberType: MemberType = MemberType.REGULAR,
        public readonly registrationDate: Date = new Date(),
        private _maxBooksAllowed?: number,
        private _maxLoanDurationDays?: number
    ) {
        this.memberId = `MEM_${String(Member.memberCounter++).padStart(6, '0')}`;
    }

    /**
     * Get member status
     */
    get status(): MemberStatus {
        // Check if suspension has expired
        if (this._status === MemberStatus.SUSPENDED && this.suspensionEndDate && new Date() > this.suspensionEndDate) {
            this._status = MemberStatus.ACTIVE;
            this.suspensionEndDate = undefined;
        }
        return this._status;
    }

    /**
     * Get maximum books allowed based on member type
     */
    get maxBooksAllowed(): number {
        if (this._maxBooksAllowed) return this._maxBooksAllowed;
        
        switch (this.memberType) {
            case MemberType.FACULTY: return 10;
            case MemberType.PREMIUM: return 8;
            case MemberType.STUDENT: return 5;
            case MemberType.SENIOR: return 3;
            case MemberType.REGULAR: return 3;
            default: return 3;
        }
    }

    /**
     * Get maximum loan duration based on member type
     */
    get maxLoanDurationDays(): number {
        if (this._maxLoanDurationDays) return this._maxLoanDurationDays;
        
        switch (this.memberType) {
            case MemberType.FACULTY: return 30;
            case MemberType.PREMIUM: return 21;
            case MemberType.STUDENT: return 14;
            case MemberType.SENIOR: return 21;
            case MemberType.REGULAR: return 14;
            default: return 14;
        }
    }

    /**
     * Check if member can borrow books
     */
    canBorrowBooks(): boolean {
        return this.status === MemberStatus.ACTIVE &&
               this.getCurrentBorrowedCount() < this.maxBooksAllowed &&
               this.totalFines < 50; // Maximum fine limit
    }

    /**
     * Get current borrowed book count
     */
    getCurrentBorrowedCount(): number {
        return this.currentlyBorrowed.size;
    }

    /**
     * Add a book to currently borrowed
     */
    addBorrowedBook(bookId: string): void {
        this.currentlyBorrowed.add(bookId);
    }

    /**
     * Remove a book from currently borrowed
     */
    removeBorrowedBook(bookId: string): void {
        this.currentlyBorrowed.delete(bookId);
    }

    /**
     * Check if member has borrowed a specific book
     */
    hasBorrowedBook(bookId: string): boolean {
        return this.currentlyBorrowed.has(bookId);
    }

    /**
     * Get list of currently borrowed book IDs
     */
    getCurrentlyBorrowedBooks(): string[] {
        return Array.from(this.currentlyBorrowed);
    }

    /**
     * Add entry to borrowing history
     */
    addToBorrowingHistory(entry: BorrowingHistoryEntry): void {
        this.borrowingHistory.push(entry);
    }

    /**
     * Get complete borrowing history
     */
    getBorrowingHistory(): BorrowingHistoryEntry[] {
        return [...this.borrowingHistory];
    }

    /**
     * Get overdue books
     */
    getOverdueBooks(): BorrowingHistoryEntry[] {
        return this.borrowingHistory.filter(entry => 
            !entry.returnDate && new Date() > entry.dueDate
        );
    }

    /**
     * Calculate total fines
     */
    calculateFines(): number {
        const overdueBooks = this.getOverdueBooks();
        let totalFines = 0;
        
        overdueBooks.forEach(entry => {
            const daysOverdue = Math.ceil((new Date().getTime() - entry.dueDate.getTime()) / (1000 * 60 * 60 * 24));
            const finePerDay = this.memberType === MemberType.STUDENT ? 0.25 : 0.50;
            entry.fineAmount = daysOverdue * finePerDay;
            entry.isOverdue = true;
            totalFines += entry.fineAmount;
        });
        
        this.totalFines = totalFines;
        return totalFines;
    }

    /**
     * Pay fine
     */
    payFine(amount: number): void {
        this.totalFines = Math.max(0, this.totalFines - amount);
    }

    /**
     * Suspend member
     */
    suspend(durationDays: number = 30): void {
        this._status = MemberStatus.SUSPENDED;
        this.suspensionEndDate = new Date();
        this.suspensionEndDate.setDate(this.suspensionEndDate.getDate() + durationDays);
    }

    /**
     * Reactivate member
     */
    reactivate(): void {
        if (this._status === MemberStatus.SUSPENDED) {
            this._status = MemberStatus.ACTIVE;
            this.suspensionEndDate = undefined;
        }
    }

    /**
     * Block member permanently
     */
    block(): void {
        this._status = MemberStatus.BLOCKED;
    }

    /**
     * Mark membership as expired
     */
    expire(): void {
        this._status = MemberStatus.EXPIRED;
    }

    /**
     * Renew membership
     */
    renew(): void {
        if (this._status === MemberStatus.EXPIRED) {
            this._status = MemberStatus.ACTIVE;
        }
    }

    /**
     * Get member details
     */
    getDetails(): string {
        return `Member ID: ${this.memberId}
Name: ${this.name}
Type: ${this.memberType} | Status: ${this.status}
Email: ${this.contactInfo.email}
Phone: ${this.contactInfo.phone || 'N/A'}
Registration Date: ${this.registrationDate.toDateString()}
Books Allowed: ${this.maxBooksAllowed} | Currently Borrowed: ${this.getCurrentBorrowedCount()}
Loan Duration: ${this.maxLoanDurationDays} days
Total Fines: $${this.totalFines.toFixed(2)}
${this.suspensionEndDate ? `Suspended Until: ${this.suspensionEndDate.toDateString()}` : ''}`;
    }

    /**
     * Get basic member info
     */
    getBasicInfo(): string {
        return `${this.name} (${this.memberId}) - ${this.memberType}`;
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use memberId instead
     */
    get userId(): string {
        return this.memberId;
    }

    /**
     * Legacy method for backward compatibility
     * @deprecated Use contactInfo.email instead
     */
    get email(): string {
        return this.contactInfo.email;
    }
}