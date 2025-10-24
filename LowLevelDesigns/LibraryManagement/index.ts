import { Library } from './Library';
import { Book, BookCategory } from './Book';
import { Member, MemberType } from './User';

/**
 * Enhanced Library Management System Demo
 */
async function runLibraryDemo() {
    console.log("=".repeat(60));
    console.log("ENHANCED LIBRARY MANAGEMENT SYSTEM DEMO");
    console.log("=".repeat(60));

    // Initialize library with custom configuration
    const library = new Library({
        maxBooksPerMember: 5,
        defaultLoanDurationDays: 14,
        finePerDay: 0.50,
        maxRenewals: 2,
        reservationLimitDays: 7
    });

    // Create diverse book collection
    const books = [
        new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565", 1925, BookCategory.FICTION, 3),
        new Book("1984", "George Orwell", "978-0451524935", 1949, BookCategory.FICTION, 2),
        new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084", 1960, BookCategory.FICTION, 2),
        new Book("A Brief History of Time", "Stephen Hawking", "978-0553380163", 1988, BookCategory.SCIENCE, 1),
        new Book("The Art of War", "Sun Tzu", "978-1599869773", -500, BookCategory.HISTORY, 1),
        new Book("Clean Code", "Robert C. Martin", "978-0132350884", 2008, BookCategory.TECHNOLOGY, 2)
    ];

    // Add books to library
    console.log("\n📚 ADDING BOOKS TO LIBRARY");
    console.log("-".repeat(40));
    for (const book of books) {
        await library.addBook(book);
    }

    // Create diverse member base
    const members = [
        new Member("Alice Johnson", { email: "alice@email.com", phone: "555-0101" }, MemberType.PREMIUM),
        new Member("Bob Smith", { email: "bob@email.com", phone: "555-0102" }, MemberType.REGULAR),
        new Member("Carol Davis", { email: "carol@email.com", phone: "555-0103" }, MemberType.STUDENT),
        new Member("Dr. David Wilson", { email: "david@university.edu", phone: "555-0104" }, MemberType.FACULTY),
        new Member("Eleanor Brown", { email: "eleanor@email.com", phone: "555-0105" }, MemberType.SENIOR)
    ];

    // Add members to library
    console.log("\n👥 ADDING MEMBERS TO LIBRARY");
    console.log("-".repeat(40));
    for (const member of members) {
        await library.addMember(member);
    }

    // Demonstrate borrowing operations
    console.log("\n📖 BORROWING OPERATIONS");
    console.log("-".repeat(40));

    try {
        // Alice (Premium) borrows multiple books
        const receipt1 = await library.borrowBook(members[0].memberId, books[0].id);
        console.log(`✅ ${members[0].name} borrowed "${books[0].title}"`);

        const receipt2 = await library.borrowBook(members[0].memberId, books[1].id);
        console.log(`✅ ${members[0].name} borrowed "${books[1].title}"`);

        // Bob (Regular) borrows a book
        const receipt3 = await library.borrowBook(members[1].memberId, books[2].id);
        console.log(`✅ ${members[1].name} borrowed "${books[2].title}"`);

        // Carol (Student) borrows a science book
        const receipt4 = await library.borrowBook(members[2].memberId, books[3].id);
        console.log(`✅ ${members[2].name} borrowed "${books[3].title}"`);

        // Dr. David (Faculty) borrows technology book
        const receipt5 = await library.borrowBook(members[3].memberId, books[5].id);
        console.log(`✅ ${members[3].name} borrowed "${books[5].title}"`);

    } catch (error) {
        console.error(`❌ Borrowing error: ${error}`);
    }

    // Demonstrate search functionality
    console.log("\n🔍 SEARCH OPERATIONS");
    console.log("-".repeat(40));

    const fictionBooks = library.searchBooks({ category: BookCategory.FICTION });
    console.log(`Found ${fictionBooks.length} fiction books:`);
    fictionBooks.forEach(book => console.log(`  - ${book.title} by ${book.author}`));

    const hawkingBooks = library.searchBooks({ author: "Stephen Hawking" });
    console.log(`\nFound ${hawkingBooks.length} books by Stephen Hawking:`);
    hawkingBooks.forEach(book => console.log(`  - ${book.title}`));

    // Demonstrate member information
    console.log("\n👤 MEMBER INFORMATION");
    console.log("-".repeat(40));

    const alice = members[0];
    console.log(`Member: ${alice.name}`);
    console.log(`Type: ${alice.memberType} | Status: ${alice.status}`);
    console.log(`Max Books: ${alice.maxBooksAllowed} | Currently Borrowed: ${alice.getCurrentBorrowedCount()}`);
    console.log(`Loan Duration: ${alice.maxLoanDurationDays} days`);

    // Demonstrate renewal
    console.log("\n🔄 RENEWAL OPERATIONS");
    console.log("-".repeat(40));

    try {
        const aliceReceipts = library.getMemberActiveReceipts(alice.memberId);
        if (aliceReceipts.length > 0) {
            const firstReceipt = aliceReceipts[0];
            const activeTransactions = firstReceipt.getActiveTransactions();
            if (activeTransactions.length > 0) {
                const bookToRenew = activeTransactions[0].bookId;
                await library.renewBook(alice.memberId, firstReceipt.receiptId, bookToRenew);
                console.log(`✅ Successfully renewed book for ${alice.name}`);
            }
        }
    } catch (error) {
        console.error(`❌ Renewal error: ${error}`);
    }

    // Demonstrate return operations
    console.log("\n📚 RETURN OPERATIONS");
    console.log("-".repeat(40));

    try {
        // Bob returns his book
        await library.returnBook(members[1].memberId, books[2].id);
        console.log(`✅ ${members[1].name} returned "${books[2].title}"`);

        // Carol returns her book
        await library.returnBook(members[2].memberId, books[3].id);
        console.log(`✅ ${members[2].name} returned "${books[3].title}"`);

    } catch (error) {
        console.error(`❌ Return error: ${error}`);
    }

    // Process overdue books
    console.log("\n⏰ PROCESSING OVERDUE BOOKS");
    console.log("-".repeat(40));
    await library.processOverdueBooks();

    // Generate comprehensive reports
    console.log("\n📊 SYSTEM REPORTS");
    console.log("-".repeat(40));
    const reports = library.generateReports();
    console.log("Library Statistics:");
    console.log(`  📚 Total Books: ${reports.summary.totalBooks}`);
    console.log(`  👥 Total Members: ${reports.summary.totalMembers}`);
    console.log(`  📋 Active Receipts: ${reports.summary.activeReceipts}`);
    console.log(`  ⚠️  Overdue Receipts: ${reports.summary.overdueReceipts}`);
    console.log(`  💰 Total Fines: ${reports.summary.totalFines}`);

    console.log("\nBook Distribution by Category:");
    Object.entries(reports.distribution.booksByCategory).forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`);
    });

    console.log("\nMember Distribution by Type:");
    Object.entries(reports.distribution.membersByType).forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
    });

    console.log("\nSystem Health:");
    console.log(`  Overdue Rate: ${reports.systemHealth.overdueRate}`);
    console.log(`  Avg Books per Member: ${reports.systemHealth.averageBooksPerMember}`);

    // Demonstrate receipt details
    console.log("\n🧾 RECEIPT DETAILS");
    console.log("-".repeat(40));

    const activeReceipts = library.getActiveReceipts();
    activeReceipts.forEach((receipt, index) => {
        console.log(`\nReceipt #${index + 1}:`);
        console.log(receipt.getReceiptDetails());
    });

    // Demonstrate error handling
    console.log("\n❌ ERROR HANDLING DEMONSTRATIONS");
    console.log("-".repeat(40));

    try {
        // Try to borrow a non-existent book
        await library.borrowBook(alice.memberId, "NON_EXISTENT_BOOK_ID");
    } catch (error) {
        console.log(`✓ Correctly caught error: ${error}`);
    }

    try {
        // Try to borrow with non-existent member
        await library.borrowBook("NON_EXISTENT_MEMBER", books[0].id);
    } catch (error) {
        console.log(`✓ Correctly caught error: ${error}`);
    }

    try {
        // Try to remove a member with active borrowings
        await library.removeMember(alice.memberId);
    } catch (error) {
        console.log(`✓ Correctly caught error: ${error}`);
    }

    // Demonstrate concurrent access (simplified)
    console.log("\n🔒 CONCURRENT ACCESS DEMONSTRATION");
    console.log("-".repeat(40));

    const concurrentBorrowPromises = [
        library.borrowBook(members[4].memberId, books[4].id),
        library.borrowBook(members[1].memberId, books[4].id) // Should fail - same book
    ];

    const results = await Promise.allSettled(concurrentBorrowPromises);
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`✅ Concurrent borrow ${index + 1} succeeded`);
        } else {
            console.log(`❌ Concurrent borrow ${index + 1} failed: ${result.reason}`);
        }
    });

    console.log("\n" + "=".repeat(60));
    console.log("DEMO COMPLETED SUCCESSFULLY");
    console.log("The Enhanced Library Management System demonstrates:");
    console.log("✓ Comprehensive book and member management");
    console.log("✓ Robust borrowing rules and enforcement");
    console.log("✓ Concurrent access handling");
    console.log("✓ Detailed reporting and analytics");
    console.log("✓ Extensible architecture");
    console.log("✓ Backward compatibility");
    console.log("=".repeat(60));
}

// Handle async demo
runLibraryDemo().catch(console.error);