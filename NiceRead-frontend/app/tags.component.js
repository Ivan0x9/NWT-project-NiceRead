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
var tag_service_1 = require('./tag.service');
var TagsComponent = (function () {
    function TagsComponent(tagService, router) {
        this.tagService = tagService;
        this.router = router;
    }
    TagsComponent.prototype.ngOnInit = function () {
        this.getTags();
    };
    TagsComponent.prototype.getTags = function () {
        var _this = this;
        this.tagService.getTags().then(function (tags) { return _this.tags = tags; });
        this.selectedTag = null;
    };
    TagsComponent.prototype.createTag = function () {
        var _this = this;
        var name = prompt("What is the name the new tag?");
        if (name) {
            this.tagService.create({ Id: null, Name: name })
                .then(function () { return _this.getTags(); });
        }
    };
    TagsComponent.prototype.deleteTag = function () {
        var _this = this;
        this.tagService.delete(this.selectedTag.Id)
            .then(function () { return _this.getTags(); });
    };
    TagsComponent.prototype.onSelect = function (tag) {
        this.selectedTag = tag;
    };
    TagsComponent = __decorate([
        core_1.Component({
            selector: 'all-tags',
            templateUrl: 'template/tags.component.html',
            styleUrls: ['template/books.component.css']
        }), 
        __metadata('design:paramtypes', [tag_service_1.TagService, router_1.Router])
    ], TagsComponent);
    return TagsComponent;
}());
exports.TagsComponent = TagsComponent;
//# sourceMappingURL=tags.component.js.map