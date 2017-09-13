import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BookService } from './book.service';
import { Book } from './models';

@Component({
    selector: 'my-book-detail',
    templateUrl: 'template/book-detail.component.html',
    styleUrls: ['template/book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
    book: Book;

    constructor(
        private bookService: BookService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.bookService.getBook(id)
                .then(book => this.book = book);
        });
    }

    save(): void {
        this.bookService.update(this.book)
            .then(this.goBack);
    }

    delete(): void {
        this.bookService.delete(this.book.Id)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}
