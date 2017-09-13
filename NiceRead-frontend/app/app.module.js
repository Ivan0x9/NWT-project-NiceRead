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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var book_list_component_1 = require('./book-list.component');
var httpclient_service_1 = require('./httpclient.service');
var book_service_1 = require('./book.service');
var books_component_1 = require('./books.component');
var book_detail_component_1 = require('./book-detail.component');
var book_add_component_1 = require('./book-add.component');
var tag_service_1 = require('./tag.service');
var tags_component_1 = require('./tags.component');
var authentication_service_1 = require('./authentication.service');
var profile_component_1 = require('./profile.component');
var register_component_1 = require('./register.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
            ],
            declarations: [
                app_component_1.AppComponent,
                book_list_component_1.BookListComponent,
                book_detail_component_1.BookDetailComponent,
                books_component_1.BooksComponent,
                book_add_component_1.BookAddComponent,
                tags_component_1.TagsComponent,
                profile_component_1.ProfileComponent,
                register_component_1.RegisterComponent
            ],
            providers: [
                book_service_1.BookService,
                tag_service_1.TagService,
                authentication_service_1.AuthenticationService,
                httpclient_service_1.HttpClient
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map