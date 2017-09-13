import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent }  from './app.component';
import { BookListComponent } from './book-list.component';
import { HttpClient } from './httpclient.service';

import { BookService } from './book.service';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail.component';
import { BookAddComponent } from './book-add.component';

import { TagService } from './tag.service';
import { TagsComponent } from './tags.component';

import { AuthenticationService } from './authentication.service';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        BookListComponent,
        BookDetailComponent,
        BooksComponent,
        BookAddComponent,
        TagsComponent,
        ProfileComponent,
        RegisterComponent
    ],
    providers: [
        BookService,
        TagService,
        AuthenticationService,
        HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
