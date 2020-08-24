import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../../../service/user-registration.service';
import { UserLoginService } from '../../../service/user-login.service';
import { CognitoCallback } from '../../../service/cognito.service';

export class NewPasswordUser {
    username: string;
    existingPassword: string;
    password: string;
}
/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    selector: 'app-new-password',
    templateUrl: './newpassword.html'
})
export class NewPasswordComponent implements OnInit, CognitoCallback {
    registrationUser: NewPasswordUser;
    router: Router;
    errorMessage: string;

    constructor(
        public userRegistration: UserRegistrationService, public userService: UserLoginService, router: Router) {
        this.router = router;
        this.onInit();
    }

    onInit(): void {
        this.registrationUser = new NewPasswordUser();
        this.errorMessage = null;
    }

    ngOnInit(): void {
        this.errorMessage = null;
        console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
        this.userService.isAuthenticated(this);
    }

    onRegister(): void {
        console.log(this.registrationUser);
        this.errorMessage = null;
        this.userRegistration.newPassword(this.registrationUser, this);
    }

    cognitoCallback(message: any, result: any): void {
        if (message != null) { // error
            this.errorMessage = message.message;
            console.log('result: ' + this.errorMessage);
        } else { // success
            // move to the next step
            this.router.navigate(['/home/profile']);
        }
    }

    isLoggedIn(message: string, isLoggedIn: boolean): void {
        if (isLoggedIn) {
            this.router.navigate(['/home/profile']);
        }
    }
}
