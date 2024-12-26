type CriteriaBook = {
    title?: string; 
    genre?: string; 
    year?: number; 
    authorName?: typeof Author.name;
}

type BookInfo = {
    title: string; 
    genre: string; 
    year: number; 
    author: Author;
}

interface IBookService {
    name: string;
    books: Book[];
    authors: Author[];
    getBooks(): Book[];
    getBookById(id: number): Book | undefined;
    getAuthors(): Author[];
    getAuthorById(id: number): Author | undefined;
    getBooksByAuthor(authorIdOrName: number | string): Book[];
    getAuthorByBookId(id: number): Author | undefined;
    search(criteria: CriteriaBook): Book[];
}

interface IBook {
    id: number;
    title: string;
    genre: string;
    year: number;
    author: Author;
}

interface IAuthor {
    id: number;
    name: string;
}

class LibraryError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "LibraryError";
    }
};

class Library implements IBookService {
    name: string;
    books: Book[];
    authors: Author[];
    maxBooks: number;

    constructor(name: string, maxBooks: number) {
        this.name = name;
        this.maxBooks = maxBooks;
    }

    addBook(book: Book): void {
        if (this.books.includes(book)) {
          throw new LibraryError("Book is already in the library");
        }

        if(this.books.length >= this.maxBooks) {
            throw new LibraryError("Storage of book is full");
        }
    
        this.books.push(book);
        this.authors.push(book.author);
    }

    getBooks(): Book[] {
        return this.books;
    }
    
    getBookById(id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    getAuthors(): Author[] {
        return this.authors;
    }

    getAuthorById(id: number): Author | undefined {
        return this.authors.find(author => author.id === id);
    }

    getBooksByAuthor(authorIdOrName: number | string): Book[] {
        if (typeof authorIdOrName === "number") {
          return this.books.filter(book => book.author.id === authorIdOrName);
        }

        return this.books.filter(book => book.author.name.toLocaleUpperCase() === authorIdOrName.toLocaleUpperCase());
    }
    
    getAuthorByBookId(id: number): Author | undefined {
        const book = this.getBookById(id);

        if(!book) {
            throw new LibraryError("Havent this book");
        }

        return this.getAuthorById(book.author.id);
    }

    search(criteria: CriteriaBook): Book[] {
        const { title, genre, year, authorName } = criteria;
    
        return this.books.filter(book => {
            const matchesTitle = title ? book.title.toLowerCase().includes(title.toLowerCase()) : false;
            const matchesGenre = genre ? book.genre.toLowerCase().includes(genre.toLowerCase()) : false;
            const matchesYear = year ? book.year === year : false;
            const matchesAuthor = authorName
                ? book.author.name.toLowerCase().includes(authorName.toLowerCase())
                : false;
    
            return matchesTitle || matchesGenre || matchesYear || matchesAuthor;
        });
    }
}

class Book implements IBook {
    static nextId = 1;
  
    title: string;
    id: number;
    genre: string;
    year: number;
    author: Author;

    constructor(info: BookInfo) {
        const { title, genre, year, author } = info;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.author = author;
        this.id = Book.nextId++;
    }
}

class Author implements IAuthor {
    static nextId = 1;
  
    name: string;
    id: number;

    constructor(name: string) {
        this.name = name;
        this.id = Author.nextId++;
    }
}

const library = new Library("City Library", 100);

const author1 = new Author("J.K. Rowling");
const author2 = new Author("George R.R. Martin");

const book1 = new Book({ title: "Harry Potter", genre: "Fantasy", year: 1997, author: author1 });
const book2 = new Book({ title: "Game of Thrones", genre: "Fantasy", year: 1996, author: author2 });
const book3 = new Book({ title: "A Clash of Kings", genre: "War", year: 1998, author: author2 });

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

const results = library.search({ title: "Harry", genre: "Fantasy" });
