"use strict";
var router_1 = require('@angular/router');
var books_component_1 = require('./books.component');
var book_add_component_1 = require('./book-add.component');
var book_detail_component_1 = require('./book-detail.component');
var book_list_component_1 = require('./book-list.component');
var tags_component_1 = require('./tags.component');
var profile_component_1 = require('./profile.component');
var register_component_1 = require('./register.component');
var appRoutes = [
    {
        path: 'book-list',
        component: book_list_component_1.BookListComponent
    },
    {
        path: '',
        redirectTo: '/book-list',
        pathMatch: 'full'
    },
    {
        path: 'books/new',
        component: book_add_component_1.BookAddComponent
    },
    {
        path: 'books',
        component: books_component_1.BooksComponent
    },
    {
        path: 'detail/:id',
        component: book_detail_component_1.BookDetailComponent
    },
    {
        path: 'tags',
        component: tags_component_1.TagsComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map