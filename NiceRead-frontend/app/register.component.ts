import { Component, OnInit } from '@angular/core';

import { User } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'profile',
    templateUrl: 'template/register.component.html',
    styleUrls: ['template/book-add.component.css']
})
export class RegisterComponent implements OnInit {
    user: User = <User>{};
    passwordTest: String;

    constructor(
        private auth: AuthenticationService
    ) { }



    ngOnInit(): void {
        if (this.auth.user) {
            this.user = this.auth.user;
        }
    }

    register(): void {
        if (this.passwordTest != this.user.Password) {
            alert("Your passwords have to match.");
            return;
        }
        this.auth.addUser(this.user).then(() => {
            this.goBack();
        });
    }

    update(): void {
        if (this.passwordTest != this.user.Password) {
            alert("Your passwords have to match.");
            return;
        }
        this.auth.updateUser(this.user).then(() => {
            this.goBack();
        });
    }
    goBack(): void {
        window.history.back();
    }
}