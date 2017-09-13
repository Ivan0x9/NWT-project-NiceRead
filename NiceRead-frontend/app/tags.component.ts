import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Tag } from './models';
import { TagService } from './tag.service';

@Component({
    selector: 'all-tags',
    templateUrl: 'template/tags.component.html',
    styleUrls: ['template/books.component.css']
})
export class TagsComponent implements OnInit {
    tags: Tag[];
    selectedTag: Tag;

    constructor(
        private tagService: TagService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getTags();
    }

    getTags(): void {
        this.tagService.getTags().then(tags => this.tags = tags);
        this.selectedTag = null;
    }

    createTag(): void {
        var name = prompt("What is the name the new tag?");
        if (name) {
            this.tagService.create(<Tag>{ Id: null, Name: name })
                .then(() => this.getTags());
        }
    }

    deleteTag(): void {
        this.tagService.delete(this.selectedTag.Id)
            .then(() => this.getTags());
    }

    onSelect(tag: Tag): void {
        this.selectedTag = tag;
    }

    /*gotoDetail(book: Book): void {
            let link = ['/detail', book.Id];
            this.router.navigate(link);
    }*/
}