import { Component, OnInit } from '@angular/core';

import { BookService } from './book.service';
import { TagService } from './tag.service';
import { Book, Tag } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'book-add',
    templateUrl: 'template/book-add.component.html',
    styleUrls: ['template/book-add.component.css']
})
export class BookAddComponent implements OnInit {
    book: Book = <Book>{};
    tags: Tag[];

    constructor(
        private bookService: BookService,
        private tagService: TagService,
        private auth: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.tagService.getTags().then(tags => this.tags = tags);
        this.book.Tags = [];
    }

    onChange(tag: Tag): void {
        console.log("Click!");
        if (!this.book.Tags) this.book.Tags.push(tag);
        var index = this.book.Tags.indexOf(tag);
        if (index > 0) this.book.Tags.splice(index, 1);
        else this.book.Tags.push(tag); 
   }

    save(): void {
        this.book.Creator = this.auth.user;
        console.log("Saving... ", this.book);
        this.bookService.create(this.book)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}
