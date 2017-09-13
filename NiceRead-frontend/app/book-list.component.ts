import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book, User } from './models';
import { BookService } from './book.service';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'my-book-list',
    templateUrl: 'template/book-list.component.html',
    styleUrls: ['template/book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[];
    customer: User;

    constructor(
        private bookService: BookService,
        private auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.auth.user) {
            this.customer = this.auth.user;
            this.books = this.auth.user.Cart;
        } else {
            this.bookService.getBooks().then(books => this.books = books);
        }
    }
    
    checkout(): void{
        this.auth.checkout();
    }
    
    gotoDetail(book: Book): void {
        let link = ['/detail', book.Id];
        this.router.navigate(link);
    }

}
