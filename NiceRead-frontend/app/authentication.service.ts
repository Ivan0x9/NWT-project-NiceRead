import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

import { User, Rating, Book } from './models';
import { HttpClient } from './httpclient.service';

@Injectable()
export class AuthenticationService {
    url = 'http://localhost:56010/api/users/';
    user: User;
    ratedBookIDs : number[] = [];
    constructor(private router: Router, private http: Http, private httpA: HttpClient) { }

    logout() {
        localStorage.removeItem("userLogin");
        this.user = null;
        this.httpA.loginData = null;
        this.router.navigate(['book-list']);
    }

    login(user: { Username: string, Password: string }) {
        if (this.user) return false;

        if (user.Username && user.Password) {
            this.httpA.loginData = this.buildHeader(user.Username, user.Password);
            this.httpA.get(this.url + user.Username)
                .then(response => {
                    var servedUser = response.json() as User;
                    localStorage.setItem("userLogin", this.httpA.loginData);
                    this.user = servedUser;
                    if(servedUser.Cart) 
                        this.user.Cart = servedUser.Cart;
                    else
                        this.user.Cart = [];
                    this.router.navigate(['book-list']);
                    return true;
                })
                .catch(this.handleError);
            return true;
        } else {
            return false;
        }
    }
    
    rateBook(rating : number, bookId : number) : void {
        var rateUrl = this.url + this.user.Username + "/book/" + bookId + "/rate/" + rating;
        this.httpA.post(rateUrl, "").catch(this.handleError);
    }
    
    cartBook(book : Book) : void {
        var url = this.url + this.user.Username + "/book/" + book.Id;
        console.log(url);
        this.httpA.post(url, "").then(()=>{
            this.user.Cart.push(book);
        }).catch(this.handleError);
    }
    
    decartBook(book : Book) : void {
        var url = this.url + this.user.Username + "/book/" + book.Id;
        this.httpA.delete(url).then(()=>{
            for(var i :number; i < this.user.Cart.length; i++ ){
                if(this.user.Cart[i].Id == book.Id)
                    this.user.Cart.splice(i,1);
            }
        }).catch(this.handleError);
    }
    
    getRatings() : Promise<any> {
        var ratesUrl = this.url + this.user.Username + "/book/rates";
        return this.httpA.get(ratesUrl);
    }
    
    hasUserRatedBook(bookId : number) : Promise<any> {
        var ratedUrl = this.url + this.user.Username + "/book/" + bookId +"/rate";
        return this.httpA.get(ratedUrl);
    }

    addUser(user: User): Promise<User> {
        return this.http
            .post(this.url, JSON.stringify(user),
            { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    updateUser(user: User): Promise<User> {
        return this.http
            .put(this.url, JSON.stringify(user),
            { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    
    checkout(): void{
        var url = this.url + this.user.Username + "/checkout";
        this.httpA.post(url, "").catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    buildHeader(username: string, password: string): string {
        return btoa(username + ":" + password);
    }
}