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
var authentication_service_1 = require('./authentication.service');
var RegisterComponent = (function () {
    function RegisterComponent(auth) {
        this.auth = auth;
        this.user = {};
    }
    RegisterComponent.prototype.ngOnInit = function () {
        if (this.auth.user) {
            this.user = this.auth.user;
        }
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (this.passwordTest != this.user.Password) {
            alert("Your passwords have to match.");
            return;
        }
        this.auth.addUser(this.user).then(function () {
            _this.goBack();
        });
    };
    RegisterComponent.prototype.update = function () {
        var _this = this;
        if (this.passwordTest != this.user.Password) {
            alert("Your passwords have to match.");
            return;
        }
        this.auth.updateUser(this.user).then(function () {
            _this.goBack();
        });
    };
    RegisterComponent.prototype.goBack = function () {
        window.history.back();
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'template/register.component.html',
            styleUrls: ['template/book-add.component.css']
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map