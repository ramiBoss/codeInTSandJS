# Enhanced Library Management System

A comprehensive, production-ready library management system built with TypeScript, demonstrating advanced software engineering principles including concurrent access handling, extensible architecture, and robust business logic.

## 🚀 Features

### 📚 Book Management
- **Comprehensive Book Information**: Title, author, ISBN, publication year, category, multiple copies support
- **Advanced Status Tracking**: Available, borrowed, reserved, maintenance, lost
- **Category Organization**: Fiction, non-fiction, science, history, biography, mystery, romance, fantasy, technology, reference
- **Multiple Copy Support**: Track individual copies and availability
- **Reservation System**: Queue management for popular books
- **Search Functionality**: Search by title, author, ISBN, category, publication year

### 👥 Member Management
- **Diverse Member Types**: Regular, premium, student, faculty, senior with different privileges
- **Contact Information**: Email, phone, address tracking
- **Status Management**: Active, suspended, expired, blocked
- **Borrowing Limits**: Configurable based on member type
- **Fine Management**: Automatic calculation and tracking
- **Borrowing History**: Complete transaction history

### 📋 Transaction Management
- **Advanced Receipt System**: Detailed transaction tracking
- **Multiple Transaction Types**: Borrow, return, renew, reserve, fine payment
- **Renewal Support**: Up to configurable limit with due date extension
- **Fine Calculation**: Automatic overdue fine calculation
- **Transaction History**: Complete audit trail

### 🔐 Concurrent Access Control
- **Resource Locking**: Prevents race conditions during borrowing/returning
- **Thread-Safe Operations**: Atomic operations for critical sections
- **Deadlock Prevention**: Proper lock ordering and timeout mechanisms

### 📊 Reporting & Analytics
- **System Statistics**: Books, members, active borrowings, overdue items
- **Distribution Reports**: Books by category, members by type
- **Health Metrics**: Overdue rates, utilization statistics
- **Member Reports**: Individual borrowing history and status

### 🔧 Extensibility Features
- **Interface-Based Design**: Easy to extend and modify
- **Plugin Architecture**: Custom borrowing rules and validation
- **Configuration System**: Adjustable limits and policies
- **Observer Pattern**: Event-driven notifications
- **Factory Pattern**: Flexible object creation

## 🏗️ Architecture

### Class Structure

```
Library (Main System)
├── Book (Enhanced with multiple copies)
├── Member (Enhanced with member types)
├── Receipt (Advanced transaction tracking)
├── BorrowingRules (Configurable business logic)
└── LibraryConfig (System configuration)
```

### Key Interfaces

- `BookInterface`: Extensible book operations
- `MemberInterface`: Member management contract
- `ReceiptInterface`: Transaction handling
- `LibraryInterface`: Core library operations
- `BorrowingRules`: Customizable business rules

## 🔧 Configuration

```typescript
const config: LibraryConfig = {
    maxBooksPerMember: 5,      // Default book limit
    defaultLoanDurationDays: 14, // Default loan period
    finePerDay: 0.50,          // Daily fine amount
    maxRenewals: 2,            // Maximum renewals allowed
    reservationLimitDays: 7    // Reservation hold period
};
```

## 📋 Business Rules

### Member Types & Privileges

| Member Type | Max Books | Loan Duration | Fine Rate |
|------------|-----------|---------------|-----------|
| Faculty    | 10        | 30 days       | $0.50/day |
| Premium    | 8         | 21 days       | $0.50/day |
| Student    | 5         | 14 days       | $0.25/day |
| Senior     | 3         | 21 days       | $0.50/day |
| Regular    | 3         | 14 days       | $0.50/day |

### Borrowing Rules
- Members cannot borrow if suspended, blocked, or have excessive fines (>$50)
- Books cannot be borrowed if unavailable or in maintenance
- Members cannot borrow the same book multiple times
- Maximum renewals: 2 per book
- Cannot renew overdue books

### Fine System
- Automatic calculation based on overdue days
- Different rates for student vs. other members
- Auto-suspension at $25+ fines
- Payment tracking and balance management

## 🚀 Usage Examples

### Basic Setup

```typescript
import { Library } from './Library';
import { Book, BookCategory } from './Book';
import { Member, MemberType } from './User';

// Initialize library with custom config
const library = new Library({
    maxBooksPerMember: 5,
    defaultLoanDurationDays: 14,
    finePerDay: 0.50
});

// Add books
const book = new Book(
    "Clean Code",
    "Robert C. Martin", 
    "978-0132350884",
    2008,
    BookCategory.TECHNOLOGY,
    3 // 3 copies available
);
await library.addBook(book);

// Add members
const member = new Member(
    "Alice Johnson",
    { email: "alice@email.com", phone: "555-0101" },
    MemberType.PREMIUM
);
await library.addMember(member);
```

### Borrowing Operations

```typescript
// Borrow a book
const receipt = await library.borrowBook(member.memberId, book.id);
console.log(`Receipt ID: ${receipt.receiptId}`);

// Renew a book
await library.renewBook(member.memberId, receipt.receiptId, book.id);

// Return a book
await library.returnBook(member.memberId, book.id);
```

### Search Operations

```typescript
// Search by category
const fictionBooks = library.searchBooks({ 
    category: BookCategory.FICTION 
});

// Search by author
const authorBooks = library.searchBooks({ 
    author: "Stephen Hawking" 
});

// Combined search
const results = library.searchBooks({
    category: BookCategory.SCIENCE,
    publishedYear: 1988
});
```

### System Management

```typescript
// Process overdue books and calculate fines
await library.processOverdueBooks();

// Generate comprehensive reports
const reports = library.generateReports();
console.log(`Total Books: ${reports.summary.totalBooks}`);
console.log(`Active Borrowings: ${reports.summary.activeReceipts}`);
console.log(`Total Fines: ${reports.summary.totalFines}`);

// Get member history
const history = library.getMemberBorrowingHistory(member.memberId);
```

## 🔧 Advanced Features

### Custom Borrowing Rules

```typescript
class CustomBorrowingRules implements BorrowingRules {
    canBorrow(member: Member, book: Book): { allowed: boolean; reason?: string } {
        // Custom business logic
        if (book.category === BookCategory.REFERENCE) {
            return { allowed: false, reason: 'Reference books cannot be borrowed' };
        }
        return { allowed: true };
    }
    
    calculateDueDate(member: Member, borrowDate: Date): Date {
        // Custom due date calculation
        const dueDate = new Date(borrowDate);
        const extraDays = member.memberType === MemberType.FACULTY ? 30 : 14;
        dueDate.setDate(dueDate.getDate() + extraDays);
        return dueDate;
    }
}

const library = new Library({}, new CustomBorrowingRules());
```

### Concurrent Operations

```typescript
// The system handles concurrent access automatically
const promises = [
    library.borrowBook(member1.memberId, book.id),
    library.borrowBook(member2.memberId, book.id) // Will fail safely
];

const results = await Promise.allSettled(promises);
```

## 🧪 Testing

The system includes comprehensive error handling and validation:

```typescript
try {
    await library.borrowBook('invalid-member', book.id);
} catch (error) {
    console.log('Correctly handled invalid member ID');
}

try {
    await library.removeMember(memberWithActiveBooks.memberId);
} catch (error) {
    console.log('Correctly prevented removal of member with active borrowings');
}
```

## 📈 System Reports

The system provides detailed analytics:

```typescript
const reports = library.generateReports();

// Summary statistics
console.log(reports.summary);
// { totalBooks: 50, totalMembers: 25, activeReceipts: 12, overdueReceipts: 2, totalFines: "$25.50" }

// Distribution analysis
console.log(reports.distribution);
// { booksByCategory: { FICTION: 20, SCIENCE: 15, ... }, membersByType: { REGULAR: 10, PREMIUM: 8, ... } }

// System health metrics
console.log(reports.systemHealth);
// { overdueRate: "16.67%", averageBooksPerMember: "0.48" }
```

## 🔄 Migration from Legacy System

The system maintains backward compatibility:

```typescript
// Legacy methods still work
const book = library.searchBookByTitle("1984");
const isAvailable = library.isBookAvailable("978-0451524935");
const borrower = library.getCurrentBorrower("978-0451524935");

// Legacy receipt methods
receipt.addAnotherBook(book);
receipt.setReturnedOn();
const charges = receipt.calculateCharges(0.50);
```

## 🔒 Security Features

- **Input Validation**: All inputs are validated before processing
- **Access Control**: Member status and permissions enforced
- **Audit Trail**: Complete transaction history maintained
- **Concurrent Safety**: Thread-safe operations with proper locking
- **Error Handling**: Comprehensive error catching and reporting

## 🚀 Performance Optimizations

- **Map-based Storage**: O(1) lookups for books, members, and receipts
- **Lazy Loading**: Status calculations performed on demand
- **Efficient Search**: Optimized search algorithms with early termination
- **Memory Management**: Proper cleanup of expired locks and references

## 📝 Future Enhancements

- **Database Integration**: PostgreSQL/MongoDB support
- **REST API**: Express.js API endpoints
- **Authentication**: JWT-based user authentication
- **Notifications**: Email/SMS notifications for due dates
- **Mobile App**: React Native mobile application
- **Analytics Dashboard**: Real-time system analytics
- **Backup System**: Automated data backup and recovery

## 🤝 Contributing

1. Follow TypeScript best practices
2. Maintain interface compliance
3. Add comprehensive tests
4. Update documentation
5. Ensure backward compatibility

## 📄 License

MIT License - see LICENSE file for details

---

**Built with modern TypeScript, following SOLID principles and enterprise-grade architecture patterns.**
