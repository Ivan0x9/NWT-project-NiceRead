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
var tag_service_1 = require('./tag.service');
var authentication_service_1 = require('./authentication.service');
var BookDetailComponent = (function () {
    function BookDetailComponent(bookService, auth, tagService, route) {
        this.bookService = bookService;
        this.auth = auth;
        this.tagService = tagService;
        this.route = route;
        this.editor = false;
        this.rated = 0;
        this.inCart = false;
    }
    BookDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tagService.getTags().then(function (tags) { return _this.tags = tags; });
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.bookService.getBook(id)
                .then(function (book) {
                _this.book = book;
                if (_this.auth.user) {
                    _this.auth.hasUserRatedBook(_this.book.Id)
                        .then(function (testRaw) {
                        console.log(testRaw);
                        if (testRaw._body)
                            var test = testRaw.json();
                        else
                            var test = null;
                        if (test) {
                            _this.rated = test.Value;
                        }
                        else {
                            _this.rated = 0;
                        }
                    }).catch(_this.handleError);
                    if (_this.book.Creator.Id == _this.auth.user.Id)
                        _this.editor = true;
                    _this.inCart = false;
                    console.log(_this.auth.user.Cart);
                    for (var i; i < _this.auth.user.Cart.length; i++) {
                        if (_this.auth.user.Cart[i].Id == book.Id)
                            _this.inCart = true;
                    }
                }
            }).catch(_this.handleError);
        });
    };
    BookDetailComponent.prototype.checked = function (tag) {
        for (var i = 0; i < this.book.Tags.length; i++)
            if (this.book.Tags[i].Id == tag.Id)
                return true;
        return false;
    };
    BookDetailComponent.prototype.onChange = function (tag) {
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
    };
    BookDetailComponent.prototype.rate = function (rating) {
        this.auth.rateBook(rating, this.book.Id);
        this.rated = rating;
    };
    BookDetailComponent.prototype.save = function () {
        this.bookService.update(this.book)
            .then(this.goBack);
    };
    BookDetailComponent.prototype.delete = function () {
        this.bookService.delete(this.book.Id)
            .then(this.goBack);
    };
    BookDetailComponent.prototype.cart = function () {
        this.auth.cartBook(this.book);
        this.inCart = true;
    };
    BookDetailComponent.prototype.decart = function () {
        this.auth.decartBook(this.book);
        this.inCart = false;
    };
    BookDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    BookDetailComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    BookDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-book-detail',
            templateUrl: 'template/book-detail.component.html',
            styleUrls: ['template/book-detail.component.css']
        }), 
        __metadata('design:paramtypes', [book_service_1.BookService, authentication_service_1.AuthenticationService, tag_service_1.TagService, router_1.ActivatedRoute])
    ], BookDetailComponent);
    return BookDetailComponent;
}());
exports.BookDetailComponent = BookDetailComponent;
//# sourceMappingURL=book-detail.component.js.map