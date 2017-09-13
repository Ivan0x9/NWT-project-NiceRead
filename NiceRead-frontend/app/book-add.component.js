"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var book_service_1 = require('./book.service');
var tag_service_1 = require('./tag.service');
var authentication_service_1 = require('./authentication.service');
var BookAddComponent = (function () {
    function BookAddComponent(bookService, tagService, auth) {
        this.bookService = bookService;
        this.tagService = tagService;
        this.auth = auth;
        this.book = {};
    }
    BookAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tagService.getTags().then(function (tags) { return _this.tags = tags; });
        this.book.Tags = [];
    };
    BookAddComponent.prototype.onChange = function (tag) {
        console.log("Click!");
        if (!this.book.Tags)
            this.book.Tags.push(tag);
        var index = this.book.Tags.indexOf(tag);
        if (index > 0)
            this.book.Tags.splice(index, 1);
        else
            this.book.Tags.push(tag);
    };
    BookAddComponent.prototype.save = function () {
        this.book.Creator = this.auth.user;
        console.log("Saving... ", this.book);
        this.bookService.create(this.book)
            .then(this.goBack);
    };
    BookAddComponent.prototype.goBack = function () {
        window.history.back();
    };
    BookAddComponent = __decorate([
        core_1.Component({
            selector: 'book-add',
            templateUrl: 'template/book-add.component.html',
            styleUrls: ['template/book-add.component.css']
        }), 
        __metadata('design:paramtypes', [book_service_1.BookService, tag_service_1.TagService, authentication_service_1.AuthenticationService])
    ], BookAddComponent);
    return BookAddComponent;
}());
exports.BookAddComponent = BookAddComponent;
//# sourceMappingURL=book-add.component.js.map