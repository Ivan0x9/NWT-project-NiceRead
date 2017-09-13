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
var router_1 = require('@angular/router');
var book_service_1 = require('./book.service');
var authentication_service_1 = require('./authentication.service');
var BookListComponent = (function () {
    function BookListComponent(bookService, auth, router) {
        this.bookService = bookService;
        this.auth = auth;
        this.router = router;
    }
    BookListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.auth.user) {
            this.customer = this.auth.user;
            this.books = this.auth.user.Cart;
        }
        else {
            this.bookService.getBooks().then(function (books) { return _this.books = books; });
        }
    };
    BookListComponent.prototype.checkout = function () {
        this.auth.checkout();
    };
    BookListComponent.prototype.gotoDetail = function (book) {
        var link = ['/detail', book.Id];
        this.router.navigate(link);
    };
    BookListComponent = __decorate([
        core_1.Component({
            selector: 'my-book-list',
            templateUrl: 'template/book-list.component.html',
            styleUrls: ['template/book-list.component.css']
        }), 
        __metadata('design:paramtypes', [book_service_1.BookService, authentication_service_1.AuthenticationService, router_1.Router])
    ], BookListComponent);
    return BookListComponent;
}());
exports.BookListComponent = BookListComponent;
//# sourceMappingURL=book-list.component.js.map