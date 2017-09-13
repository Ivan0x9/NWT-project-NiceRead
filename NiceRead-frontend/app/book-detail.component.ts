import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BookService } from './book.service';
import { TagService } from './tag.service';
import { Book, Tag, Rating } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'my-book-detail',
    templateUrl: 'template/book-detail.component.html',
    styleUrls: ['template/book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
    book: Book;
    editor: boolean = false;
    rated: number = 0;
    inCart: boolean = false;
    tags: Tag[];

    constructor(
        private bookService: BookService,
        private auth: AuthenticationService,
        private tagService: TagService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.tagService.getTags().then(tags => this.tags = tags);
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.bookService.getBook(id)
                .then(book => {
                    this.book = book;
                    if (this.auth.user) {
                        this.auth.hasUserRatedBook(this.book.Id)
                            .then(testRaw => {
                                console.log(testRaw);
                                if (testRaw._body) var test = testRaw.json();
                                else var test = null;
                                if (test) {
                                    this.rated = test.Value;
                                } else {
                                    this.rated = 0;
                                }
                            }).catch(this.handleError);
                        if (this.book.Creator.Id == this.auth.user.Id)
                            this.editor = true;
                        this.inCart = false;
                        console.log(this.auth.user.Cart);
                        for (var i: number; i < this.auth.user.Cart.length; i++) {
                            if (this.auth.user.Cart[i].Id == book.Id)
                                this.inCart = true;
                        }
                    }}).catch(this.handleError);
        });
    }

    checked(tag: Tag): boolean {
        for (var i = 0; i < this.book.Tags.length; i++)
            if (this.book.Tags[i].Id == tag.Id) return true;
        return false;
    }

    onChange(tag: Tag): void {
        if (!this.book.Tags) {
            this.book.Tags.push(tag);
            return;
        }
        for (var i = 0; i < this.book.Tags.length; i++) {
            if (this.book.Tags[i].Id == tag.Id) {
                this.book.Tags.splice(i, 1);
                return;
            }
        }
        this.book.Tags.push(tag);
    }
    
    rate(rating: number): void {
        this.auth.rateBook(rating, this.book.Id);
        this.rated = rating;
    }
    
    save(): void {
        this.bookService.update(this.book)
            .then(this.goBack);
    }

    delete(): void {
        this.bookService.delete(this.book.Id)
            .then(this.goBack);
    }

    cart(): void {
        this.auth.cartBook(this.book);
        this.inCart = true;
    }

    decart(): void {
        this.auth.decartBook(this.book);
        this.inCart = false;
    }

    goBack(): void {
        window.history.back();
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
