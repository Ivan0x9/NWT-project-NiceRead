"use strict";
var Tag = (function () {
    function Tag() {
    }
    return Tag;
}());
exports.Tag = Tag;
var Book = (function () {
    function Book() {
        this.Author = null;
        this.Image = null;
        this.Url = null;
        this.Creator = null;
        this.Tags = [];
        this.AvgRating = 0;
    }
    return Book;
}());
exports.Book = Book;
var User = (function () {
    function User() {
        this.Cart = [];
    }
    return User;
}());
exports.User = User;
var Purchase = (function () {
    function Purchase() {
    }
    return Purchase;
}());
exports.Purchase = Purchase;
var Rating = (function () {
    function Rating() {
    }
    return Rating;
}());
exports.Rating = Rating;
//# sourceMappingURL=models.js.map