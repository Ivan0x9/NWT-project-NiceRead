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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var TagService = (function () {
    function TagService(http) {
        this.http = http;
        this.tagsUrl = 'http://localhost:56010/api/tags'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TagService.prototype.getTags = function () {
        return this.http.get(this.tagsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TagService.prototype.create = function (tag) {
        return this.http
            .post(this.tagsUrl, JSON.stringify(tag), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TagService.prototype.update = function (tag) {
        var url = this.tagsUrl + "/" + tag.Id;
        return this.http
            .put(url, JSON.stringify(tag), { headers: this.headers })
            .toPromise()
            .then(function () { return tag; })
            .catch(this.handleError);
    };
    TagService.prototype.delete = function (id) {
        var url = this.tagsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    TagService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TagService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TagService);
    return TagService;
}());
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map