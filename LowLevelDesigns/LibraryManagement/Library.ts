import { Book, BookCategory, BookStatus, BookInterface } from './Book';
import { Member, MemberType, MemberStatus, MemberInterface } from './User';
import { Receipt, TransactionType, TransactionStatus, ReceiptInterface } from './Receipt';

/**
 * Library configuration interface
 */
export interface LibraryConfig {
    maxBooksPerMember: number;
    defaultLoanDurationDays: number;
    finePerDay: number;
    maxRenewals: number;
    reservationLimitDays: number;
}

/**
 * Search criteria interface
 */
export interface SearchCriteria {
    title?: string;
    author?: string;
    isbn?: string;
    category?: BookCategory;
    status?: BookStatus;
    publishedYear?: number;
}

/**
 * Borrowing rules interface
 */
export interface BorrowingRules {
    canBorrow(member: Member, book: Book): { allowed: boolean; reason?: string };
    calculateDueDate(member: Member, borrowDate: Date): Date;
    canRenew(member: Member, receipt: Receipt, bookId: string): { allowed: boolean; reason?: string };
}

/**
 * Default borrowing rules implementation
 */
export class DefaultBorrowingRules implements BorrowingRules {
    constructor(private config: LibraryConfig) {}

    canBorrow(member: Member, book: Book): { allowed: boolean; reason?: string } {
        if (!member.canBorrowBooks()) {
            return { allowed: false, reason: 'Member cannot borrow books (suspended, blocked, or has fines)' };
        }

        if (!book.isAvailable()) {
            return { allowed: false, reason: 'Book is not available' };
        }

        if (member.getCurrentBorrowedCount() >= member.maxBooksAllowed) {
            return { allowed: false, reason: 'Member has reached maximum book limit' };
        }

        if (member.hasBorrowedBook(book.id)) {
            return { allowed: false, reason: 'Member has already borrowed this book' };
        }

        return { allowed: true };
    }

    calculateDueDate(member: Member, borrowDate: Date): Date {
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + member.maxLoanDurationDays);
        return dueDate;
    }

    canRenew(member: Member, receipt: Receipt, bookId: string): { allowed: boolean; reason?: string } {
        const transactions = receipt.getBookTransactions();
        const bookTransaction = transactions.find(t => t.bookId === bookId);

        if (!bookTransaction) {
            return { allowed: false, reason: 'Book not found in receipt' };
        }

        if (bookTransaction.returnDate) {
            return { allowed: false, reason: 'Book has already been returned' };
        }

        if (bookTransaction.renewalCount >= this.config.maxRenewals) {
            return { allowed: false, reason: 'Maximum renewal limit reached' };
        }

        if (bookTransaction.isOverdue) {
            return { allowed: false, reason: 'Cannot renew overdue books' };
        }

        return { allowed: true };
    }
}

/**
 * @interface LibraryInterface
 * @description Interface for Library to support extensibility
 */
export interface LibraryInterface {
    readonly config: LibraryConfig;
    readonly borrowingRules: BorrowingRules;
    
    // Book management
    addBook(book: Book): Promise<void>;
    removeBook(bookId: string): Promise<void>;
    updateBook(bookId: string, updates: Partial<Book>): Promise<void>;
    searchBooks(criteria: SearchCriteria): Book[];
    
    // Member management
    addMember(member: Member): Promise<void>;
    removeMember(memberId: string): Promise<void>;
    updateMember(memberId: string, updates: Partial<Member>): Promise<void>;
    
    // Borrowing operations
    borrowBook(memberId: string, bookId: string): Promise<Receipt>;
    returnBook(memberId: string, bookId: string): Promise<Receipt>;
    renewBook(memberId: string, receiptId: string, bookId: string): Promise<Receipt>;
    
    // System operations
    processOverdueBooks(): Promise<void>;
    generateReports(): any;
}

/**
 * @class Library
 * @description Enhanced library management system with comprehensive features
 */
export class Library implements LibraryInterface {
    private books: Map<string, Book> = new Map();
    private members: Map<string, Member> = new Map();
    private receipts: Map<string, Receipt> = new Map();
    private activeReceipts: Map<string, Set<string>> = new Map(); // memberId -> receiptIds
    
    // Concurrency control
    private readonly locks: Map<string, Promise<void>> = new Map();
    
    // Configuration
    public readonly config: LibraryConfig;
    public readonly borrowingRules: BorrowingRules;
    
    constructor(
        config: Partial<LibraryConfig> = {},
        borrowingRules?: BorrowingRules
    ) {
        this.config = {
            maxBooksPerMember: 5,
            defaultLoanDurationDays: 14,
            finePerDay: 0.50,
            maxRenewals: 2,
            reservationLimitDays: 7,
            ...config
        };
        
        this.borrowingRules = borrowingRules || new DefaultBorrowingRules(this.config);
        
        console.log("Enhanced Library Management System initialized.");
        console.log("Configuration:", this.config);
    }

    /**
     * Concurrency control helper
     */
    private async withLock<T>(key: string, operation: () => Promise<T>): Promise<T> {
        // Wait for any existing lock on this key
        while (this.locks.has(key)) {
            await this.locks.get(key);
        }

        // Create new lock
        let resolve: () => void;
        const promise = new Promise<void>((res) => {
            resolve = res;
        });
        this.locks.set(key, promise);

        try {
            const result = await operation();
            return result;
        } finally {
            // Release lock
            this.locks.delete(key);
            resolve!();
        }
    }

    // ===================
    // BOOK MANAGEMENT
    // ===================

    /**
     * Add a book to the library catalog
     */
    async addBook(book: Book): Promise<void> {
        await this.withLock(`book:${book.isbn}`, async () => {
            if (this.books.has(book.id)) {
                throw new Error(`Book with ID ${book.id} already exists`);
            }
            
            // Check for duplicate ISBN
            const existingBook = Array.from(this.books.values()).find(b => b.isbn === book.isbn);
            if (existingBook) {
                console.warn(`Book with ISBN ${book.isbn} already exists. Consider updating copies instead.`);
                return;
            }
            
            this.books.set(book.id, book);
            console.log(`Added book: "${book.title}" (${book.id}) to the library catalog.`);
        });
    }

    /**
     * Remove a book from the library catalog
     */
    async removeBook(bookId: string): Promise<void> {
        await this.withLock(`book:${bookId}`, async () => {
            const book = this.books.get(bookId);
            if (!book) {
                throw new Error(`Book with ID ${bookId} not found`);
            }

            // Check if book has borrowed copies
            if (book.getCurrentBorrowers().length > 0) {
                throw new Error(`Cannot remove book "${book.title}" as it has borrowed copies`);
            }

            this.books.delete(bookId);
            console.log(`Removed book: "${book.title}" (${bookId}) from the library catalog.`);
        });
    }

    /**
     * Update book information
     */
    async updateBook(bookId: string, updates: Partial<Book>): Promise<void> {
        await this.withLock(`book:${bookId}`, async () => {
            const book = this.books.get(bookId);
            if (!book) {
                throw new Error(`Book with ID ${bookId} not found`);
            }

            // Apply updates (this is simplified - in practice you'd have proper update methods)
            Object.assign(book, updates);
            console.log(`Updated book: "${book.title}" (${bookId})`);
        });
    }

    /**
     * Search books by various criteria
     */
    searchBooks(criteria: SearchCriteria): Book[] {
        const allBooks = Array.from(this.books.values());
        
        return allBooks.filter(book => {
            if (criteria.title && !book.title.toLowerCase().includes(criteria.title.toLowerCase())) {
                return false;
            }
            if (criteria.author && !book.author.toLowerCase().includes(criteria.author.toLowerCase())) {
                return false;
            }
            if (criteria.isbn && book.isbn !== criteria.isbn) {
                return false;
            }
            if (criteria.category && book.category !== criteria.category) {
                return false;
            }
            if (criteria.publishedYear && book.publishedYear !== criteria.publishedYear) {
                return false;
            }
            return true;
        });
    }

    /**
     * Get book by ID
     */
    getBook(bookId: string): Book | null {
        return this.books.get(bookId) || null;
    }

    /**
     * Get book by ISBN
     */
    getBookByISBN(isbn: string): Book | null {
        return Array.from(this.books.values()).find(book => book.isbn === isbn) || null;
    }

    /**
     * List all books
     */
    listBooks(): Book[] {
        return Array.from(this.books.values());
    }

    // ===================
    // MEMBER MANAGEMENT
    // ===================

    /**
     * Add a member to the library
     */
    async addMember(member: Member): Promise<void> {
        await this.withLock(`member:${member.memberId}`, async () => {
            if (this.members.has(member.memberId)) {
                throw new Error(`Member with ID ${member.memberId} already exists`);
            }

            this.members.set(member.memberId, member);
            this.activeReceipts.set(member.memberId, new Set());
            console.log(`Added member: ${member.name} (${member.memberId})`);
        });
    }

    /**
     * Remove a member from the library
     */
    async removeMember(memberId: string): Promise<void> {
        await this.withLock(`member:${memberId}`, async () => {
            const member = this.members.get(memberId);
            if (!member) {
                throw new Error(`Member with ID ${memberId} not found`);
            }

            // Check if member has active borrowings
            const activeReceiptIds = this.activeReceipts.get(memberId) || new Set();
            if (activeReceiptIds.size > 0) {
                throw new Error(`Cannot remove member ${member.name} who has active borrowings`);
            }

            // Check for unpaid fines
            if (member.calculateFines() > 0) {
                throw new Error(`Cannot remove member ${member.name} who has unpaid fines`);
            }

            this.members.delete(memberId);
            this.activeReceipts.delete(memberId);
            console.log(`Removed member: ${member.name} (${memberId})`);
        });
    }

    /**
     * Update member information
     */
    async updateMember(memberId: string, updates: Partial<Member>): Promise<void> {
        await this.withLock(`member:${memberId}`, async () => {
            const member = this.members.get(memberId);
            if (!member) {
                throw new Error(`Member with ID ${memberId} not found`);
            }

            // Apply updates (simplified)
            Object.assign(member, updates);
            console.log(`Updated member: ${member.name} (${memberId})`);
        });
    }

    /**
     * Get member by ID
     */
    getMember(memberId: string): Member | null {
        return this.members.get(memberId) || null;
    }

    /**
     * List all members
     */
    listMembers(): Member[] {
        return Array.from(this.members.values());
    }

    /**
     * Search members by name or email
     */
    searchMembers(query: string): Member[] {
        const allMembers = Array.from(this.members.values());
        const lowerQuery = query.toLowerCase();
        
        return allMembers.filter(member => 
            member.name.toLowerCase().includes(lowerQuery) ||
            member.contactInfo.email.toLowerCase().includes(lowerQuery)
        );
    }

    // ===================
    // BORROWING OPERATIONS
    // ===================

    /**
     * Borrow a book
     */
    async borrowBook(memberId: string, bookId: string): Promise<Receipt> {
        return await this.withLock(`borrow:${memberId}:${bookId}`, async () => {
            const member = this.members.get(memberId);
            if (!member) {
                throw new Error(`Member with ID ${memberId} not found`);
            }

            const book = this.books.get(bookId);
            if (!book) {
                throw new Error(`Book with ID ${bookId} not found`);
            }

            // Check borrowing rules
            const borrowCheck = this.borrowingRules.canBorrow(member, book);
            if (!borrowCheck.allowed) {
                throw new Error(borrowCheck.reason || 'Borrowing not allowed');
            }

            // Create receipt
            const borrowDate = new Date();
            const dueDate = this.borrowingRules.calculateDueDate(member, borrowDate);
            const receipt = new Receipt(memberId, TransactionType.BORROW, borrowDate, book, dueDate);

            // Update book and member state
            if (!book.borrowCopy(memberId)) {
                throw new Error('Failed to borrow book copy');
            }

            member.addBorrowedBook(bookId);
            member.addToBorrowingHistory({
                bookId: book.id,
                bookTitle: book.title,
                borrowDate: borrowDate,
                dueDate: dueDate,
                renewalCount: 0,
                fineAmount: 0,
                isOverdue: false
            });

            // Store receipt
            this.receipts.set(receipt.receiptId, receipt);
            const memberReceipts = this.activeReceipts.get(memberId) || new Set();
            memberReceipts.add(receipt.receiptId);
            this.activeReceipts.set(memberId, memberReceipts);

            console.log(`Book "${book.title}" borrowed by ${member.name}. Due: ${dueDate.toDateString()}`);
            return receipt;
        });
    }

    /**
     * Return a book
     */
    async returnBook(memberId: string, bookId: string): Promise<Receipt> {
        return await this.withLock(`return:${memberId}:${bookId}`, async () => {
            const member = this.members.get(memberId);
            if (!member) {
                throw new Error(`Member with ID ${memberId} not found`);
            }

            const book = this.books.get(bookId);
            if (!book) {
                throw new Error(`Book with ID ${bookId} not found`);
            }

            // Find active receipt for this book and member
            const memberReceiptIds = this.activeReceipts.get(memberId) || new Set();
            let targetReceipt: Receipt | null = null;

            for (const receiptId of memberReceiptIds) {
                const receipt = this.receipts.get(receiptId);
                if (receipt && receipt.getActiveTransactions().some(t => t.bookId === bookId)) {
                    targetReceipt = receipt;
                    break;
                }
            }

            if (!targetReceipt) {
                throw new Error(`No active borrowing found for book "${book.title}" by member ${member.name}`);
            }

            // Return book copy and update receipt
            if (!book.returnCopy(memberId)) {
                throw new Error('Failed to return book copy');
            }

            targetReceipt.returnBook(bookId);
            member.removeBorrowedBook(bookId);

            // Update borrowing history
            const history = member.getBorrowingHistory();
            const historyEntry = history.find(h => h.bookId === bookId && !h.returnDate);
            if (historyEntry) {
                historyEntry.returnDate = new Date();
                historyEntry.isOverdue = new Date() > historyEntry.dueDate;
                if (historyEntry.isOverdue) {
                    const daysOverdue = Math.ceil((new Date().getTime() - historyEntry.dueDate.getTime()) / (1000 * 60 * 60 * 24));
                    historyEntry.fineAmount = daysOverdue * this.config.finePerDay;
                }
            }

            // If all books in receipt are returned, remove from active receipts
            if (targetReceipt.getActiveTransactions().length === 0) {
                memberReceiptIds.delete(targetReceipt.receiptId);
            }

            console.log(`Book "${book.title}" returned by ${member.name}`);
            return targetReceipt;
        });
    }

    /**
     * Renew a book
     */
    async renewBook(memberId: string, receiptId: string, bookId: string): Promise<Receipt> {
        return await this.withLock(`renew:${memberId}:${bookId}`, async () => {
            const member = this.members.get(memberId);
            if (!member) {
                throw new Error(`Member with ID ${memberId} not found`);
            }

            const receipt = this.receipts.get(receiptId);
            if (!receipt) {
                throw new Error(`Receipt with ID ${receiptId} not found`);
            }

            if (receipt.memberId !== memberId) {
                throw new Error('Receipt does not belong to this member');
            }

            // Check renewal rules
            const renewCheck = this.borrowingRules.canRenew(member, receipt, bookId);
            if (!renewCheck.allowed) {
                throw new Error(renewCheck.reason || 'Renewal not allowed');
            }

            // Calculate new due date
            const newDueDate = this.borrowingRules.calculateDueDate(member, new Date());
            
            // Renew in receipt
            if (!receipt.renewBook(bookId, newDueDate)) {
                throw new Error('Failed to renew book in receipt');
            }

            console.log(`Book renewed for ${member.name}. New due date: ${newDueDate.toDateString()}`);
            return receipt;
        });
    }

    // ===================
    // SYSTEM OPERATIONS
    // ===================

    /**
     * Process overdue books and calculate fines
     */
    async processOverdueBooks(): Promise<void> {
        const currentDate = new Date();
        
        for (const member of this.members.values()) {
            const fines = member.calculateFines();
            if (fines > 0) {
                console.log(`Member ${member.name} has fines: $${fines.toFixed(2)}`);
                
                // Auto-suspend members with high fines
                if (fines > 25 && member.status === MemberStatus.ACTIVE) {
                    member.suspend(30);
                    console.log(`Member ${member.name} suspended due to high fines`);
                }
            }
        }

        // Update receipt statuses
        for (const receipt of this.receipts.values()) {
            if (receipt.status === TransactionStatus.ACTIVE && receipt.isOverdue()) {
                console.log(`Receipt ${receipt.receiptId} is now overdue`);
            }
        }
    }

    /**
     * Generate comprehensive system reports
     */
    generateReports(): any {
        const totalBooks = this.books.size;
        const totalMembers = this.members.size;
        const activeReceipts = Array.from(this.receipts.values())
            .filter(r => r.status === TransactionStatus.ACTIVE).length;
        const overdueReceipts = Array.from(this.receipts.values())
            .filter(r => r.status === TransactionStatus.OVERDUE).length;

        const booksByCategory = {};
        for (const book of this.books.values()) {
            booksByCategory[book.category] = (booksByCategory[book.category] || 0) + 1;
        }

        const membersByType = {};
        for (const member of this.members.values()) {
            membersByType[member.memberType] = (membersByType[member.memberType] || 0) + 1;
        }

        const totalFines = Array.from(this.members.values())
            .reduce((sum, member) => sum + member.calculateFines(), 0);

        return {
            summary: {
                totalBooks,
                totalMembers,
                activeReceipts,
                overdueReceipts,
                totalFines: `$${totalFines.toFixed(2)}`
            },
            distribution: {
                booksByCategory,
                membersByType
            },
            systemHealth: {
                overdueRate: activeReceipts > 0 ? (overdueReceipts / activeReceipts * 100).toFixed(2) + '%' : '0%',
                averageBooksPerMember: totalMembers > 0 ? (activeReceipts / totalMembers).toFixed(2) : '0'
            }
        };
    }

    /**
     * Get member's borrowing history
     */
    getMemberBorrowingHistory(memberId: string): Receipt[] {
        return Array.from(this.receipts.values())
            .filter(receipt => receipt.memberId === memberId);
    }

    /**
     * Get active receipts for a member
     */
    getMemberActiveReceipts(memberId: string): Receipt[] {
        const receiptIds = this.activeReceipts.get(memberId) || new Set();
        return Array.from(receiptIds).map(id => this.receipts.get(id)!).filter(Boolean);
    }

    /**
     * Get all overdue receipts
     */
    getOverdueReceipts(): Receipt[] {
        return Array.from(this.receipts.values())
            .filter(receipt => receipt.status === TransactionStatus.OVERDUE);
    }

    // ===================
    // LEGACY SUPPORT
    // ===================

    /**
     * Legacy method - search book by title
     */
    searchBookByTitle(title: string): Book | null {
        return this.searchBooks({ title })[0] || null;
    }

    /**
     * Legacy method - check if book is available
     */
    isBookAvailable(isbn: string): boolean {
        const book = this.getBookByISBN(isbn);
        return book ? book.isAvailable() : false;
    }

    /**
     * Legacy method - get current borrower
     */
    getCurrentBorrower(isbn: string): string | null {
        const book = this.getBookByISBN(isbn);
        if (!book) return null;
        
        const borrowers = book.getCurrentBorrowers();
        return borrowers.length > 0 ? borrowers[0] : null;
    }

    /**
     * Legacy method - get book details
     */
    getBookDetails(isbn: string): string {
        const book = this.getBookByISBN(isbn);
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }
        return book.getDetails();
    }

    // For backward compatibility - simplified methods
    async assignBookToBorrower(isbn: string, borrowerId: string): Promise<Receipt | null> {
        try {
            const book = this.getBookByISBN(isbn);
            if (!book) throw new Error(`Book with ISBN ${isbn} not found`);
            
            return await this.borrowBook(borrowerId, book.id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getBorrowingHistoryForUser(userId: string): Receipt[] {
        return this.getMemberBorrowingHistory(userId);
    }

    getActiveReceipts(): Receipt[] {
        return Array.from(this.receipts.values())
            .filter(r => r.status === TransactionStatus.ACTIVE);
    }
}