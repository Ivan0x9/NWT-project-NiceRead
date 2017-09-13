import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from './models';
import { BookService } from './book.service';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'all-books',
    templateUrl: 'template/books.component.html',
    styleUrls: ['template/books.component.css']
})
export class BooksComponent implements OnInit {
    books: Book[];
    selectedBook: Book;

    constructor(
        private bookService: BookService,
        private auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void {
        this.bookService.getBooks().then(books => this.books = books);
    }

    createBook(): void {
        let link = ['books'];
        this.router.navigate(link);
    }

    onSelect(book: Book): void {
        this.selectedBook = book;
    }

    gotoDetail(book: Book): void {
        let link = ['/detail', book.Id];
        this.router.navigate(link);
    }
}