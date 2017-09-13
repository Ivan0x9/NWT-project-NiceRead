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
var http_1 = require('@angular/http');
var httpclient_service_1 = require('./httpclient.service');
var AuthenticationService = (function () {
    function AuthenticationService(router, http, httpA) {
        this.router = router;
        this.http = http;
        this.httpA = httpA;
        this.url = 'http://localhost:56010/api/users/';
        this.ratedBookIDs = [];
    }
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("userLogin");
        this.user = null;
        this.httpA.loginData = null;
        this.router.navigate(['book-list']);
    };
    AuthenticationService.prototype.login = function (user) {
        var _this = this;
        if (this.user)
            return false;
        if (user.Username && user.Password) {
            this.httpA.loginData = this.buildHeader(user.Username, user.Password);
            this.httpA.get(this.url + user.Username)
                .then(function (response) {
                var servedUser = response.json();
                localStorage.setItem("userLogin", _this.httpA.loginData);
                _this.user = servedUser;
                if (servedUser.Cart)
                    _this.user.Cart = servedUser.Cart;
                else
                    _this.user.Cart = [];
                _this.router.navigate(['book-list']);
                return true;
            })
                .catch(this.handleError);
            return true;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.rateBook = function (rating, bookId) {
        var rateUrl = this.url + this.user.Username + "/book/" + bookId + "/rate/" + rating;
        this.httpA.post(rateUrl, "").catch(this.handleError);
    };
    AuthenticationService.prototype.cartBook = function (book) {
        var _this = this;
        var url = this.url + this.user.Username + "/book/" + book.Id;
        console.log(url);
        this.httpA.post(url, "").then(function () {
            _this.user.Cart.push(book);
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.decartBook = function (book) {
        var _this = this;
        var url = this.url + this.user.Username + "/book/" + book.Id;
        this.httpA.delete(url).then(function () {
            for (var i; i < _this.user.Cart.length; i++) {
                if (_this.user.Cart[i].Id == book.Id)
                    _this.user.Cart.splice(i, 1);
            }
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.getRatings = function () {
        var ratesUrl = this.url + this.user.Username + "/book/rates";
        return this.httpA.get(ratesUrl);
    };
    AuthenticationService.prototype.hasUserRatedBook = function (bookId) {
        var ratedUrl = this.url + this.user.Username + "/book/" + bookId + "/rate";
        return this.httpA.get(ratedUrl);
    };
    AuthenticationService.prototype.addUser = function (user) {
        return this.http
            .post(this.url, JSON.stringify(user), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.updateUser = function (user) {
        return this.http
            .put(this.url, JSON.stringify(user), { headers: new http_1.Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.checkout = function () {
        var url = this.url + this.user.Username + "/checkout";
        this.httpA.post(url, "").catch(this.handleError);
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    AuthenticationService.prototype.buildHeader = function (username, password) {
        return btoa(username + ":" + password);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, httpclient_service_1.HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map