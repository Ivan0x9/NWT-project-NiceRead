import { Injectable } from '@angular/core';
import { Headers, Http, HttpModule } from '@angular/http';

import { Book } from './models';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookService {
    private booksUrl = 'http://localhost:56010/api/books';  // URL to web api

    constructor(private http: Http) { }

    getBooks(): Promise<Book[]> {
        return this.http.get(this.booksUrl)
            .toPromise()
            .then(response => response.json() as Book[])
            .catch(this.handleError);
    }

    getBook(id: number): Promise<Book> {
        let url = `${this.booksUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Book)
            .catch(this.handleError);
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    create(book: Book): Promise<Book> {
        return this.http
            .post(this.booksUrl, JSON.stringify(book), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(book: Book): Promise<Book> {
        let url = `${this.booksUrl}/${book.Id}`;
        return this.http
            .put(url, JSON.stringify(book), { headers: this.headers })
            .toPromise()
            .then(() => book)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.booksUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

