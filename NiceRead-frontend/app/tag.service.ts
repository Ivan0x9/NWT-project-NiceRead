import { Injectable } from '@angular/core';
import { Headers, Http, HttpModule } from '@angular/http';

import { Tag } from './models';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TagService {
    private tagsUrl = 'http://localhost:56010/api/tags';  // URL to web api

    constructor(private http: Http) { }

    getTags(): Promise<Tag[]> {
        return this.http.get(this.tagsUrl)
            .toPromise()
            .then(response => response.json() as Tag[])
            .catch(this.handleError);
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    create(tag: Tag): Promise<Tag> {
        return this.http
            .post(this.tagsUrl, JSON.stringify(tag), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(tag: Tag): Promise<Tag> {
        let url = `${this.tagsUrl}/${tag.Id}`;
        return this.http
            .put(url, JSON.stringify(tag), { headers: this.headers })
            .toPromise()
            .then(() => tag)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.tagsUrl}/${id}`;
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

