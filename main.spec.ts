import { describe, test, expect, beforeEach } from '@jest/globals';
import { Library, Book, Author, LibraryError } from "./main";

describe("Library", () => {
    let library: Library;
    let author1: Author;
    let author2: Author;
    let book1: Book;
    let book2: Book;
    let book3: Book;

    beforeEach(() => {
        library = new Library("City Library", 100);
        author1 = new Author("J.K. Rowling");
        author2 = new Author("George R.R. Martin");
        book1 = new Book({ title: "Harry Potter", genre: "Fantasy", year: 1997, author: author1 });
        book2 = new Book({ title: "Game of Thrones", genre: "Fantasy", year: 1996, author: author2 });
        book3 = new Book({ title: "A Clash of Kings", genre: "War", year: 1998, author: author2 });

        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
    });

    test("should add books to the library", () => {
        expect(library.getBooks()).toHaveLength(3);
    });

    test("should throw an error when adding a duplicate book", () => {
        expect(() => library.addBook(book1)).toThrowError("Book is already in the library");
    });

    test("should get a book by ID", () => {
        expect(library.getBookById(book1.id)).toBe(book1);
    });

    test("should return undefined for a non-existing book ID", () => {
        expect(library.getBookById(999)).toBeUndefined();
    });

    test("should get books by author ID", () => {
        expect(library.getBooksByAuthor(author2.id)).toEqual([book2, book3]);
    });

    test("should get books by author name", () => {
        expect(library.getBooksByAuthor("George R.R. Martin")).toEqual([book2, book3]);
    });

    test("should get author by book ID", () => {
        expect(library.getAuthorByBookId(book1.id)).toBe(author1);
    });

    test("should throw an error when getting author by non-existing book ID", () => {
        expect(() => library.getAuthorByBookId(999)).toThrowError("Havent this book");
    });

    test("should search books by criteria", () => {
        expect(library.search({ title: "Harry" })).toEqual([book1]);
        expect(library.search({ genre: "Fantasy" })).toEqual([book1, book2]);
        expect(library.search({ year: 1998 })).toEqual([book3]);
        expect(library.search({ authorName: "George R.R. Martin" })).toEqual([book2, book3]);
    });
});
