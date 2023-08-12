class Library{
    books;
    constructor(){
        this.books = [];
    }

    addBook(book){
        this.books.push(book);
        return;
    }

    listBooks(){
        for(let book of this.books){
            console.log('Books Id: ', book.id);
            console.log('Book Name: ', book.name);
        }
        return;
    }

    getBook(id){
        const book = books.find((book, id) => book.id === id);
        return book;
    }

    deleteBook(id){
        const books = this.books.filter((book, id) => book.id === id);
        this.books =  books;
        return;
    }
}