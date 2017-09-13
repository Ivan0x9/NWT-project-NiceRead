import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
import { BookAddComponent } from './book-add.component';
import { BookDetailComponent } from './book-detail.component';
import { BookListComponent } from './book-list.component';
import { TagsComponent } from './tags.component';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';

const appRoutes: Routes = [
    {
        path: 'book-list',
        component: BookListComponent
    },
    {
        path: '',
        redirectTo: '/book-list',
        pathMatch: 'full'
    },
    {
        path: 'books/new',
        component: BookAddComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'detail/:id',
        component: BookDetailComponent
    },
    {
        path: 'tags',
        component: TagsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);