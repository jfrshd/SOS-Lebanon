import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistrationService } from '../../../service/user-registration.service';
import { UserLoginService } from '../../../service/user-login.service';
import { LoggedInCallback } from '../../../service/cognito.service';

@Component({
    selector: 'app-logout',
    template: ''
})
export class LogoutComponent implements LoggedInCallback {

    constructor(public router: Router,
        public userService: UserLoginService) {
        this.userService.isAuthenticated(this)
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.userService.logout();
            this.router.navigate(['/home/profile']);
        }

        this.router.navigate(['/home/profile']);
    }
}

@Component({
    selector: 'app-registration-confirmation',
    templateUrl: './confirmRegistration.html'
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    private sub: any;

    constructor(public regService: UserRegistrationService, public router: Router, public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.email = decodeURI(params['username']);

        });

        this.errorMessage = null;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onConfirmRegistration(): void {
        this.errorMessage = null;
        this.regService.confirmRegistration(this.email, this.confirmationCode, this);
    }

    cognitoCallback(message: string, result: any): void {
        if (message != null) { // error
            this.errorMessage = message;
            console.log('message: ' + this.errorMessage);
        } else { // success
            // move to the next step
            console.log('Moving to profile');
            // this.configs.curUser = result.user;
            this.router.navigate(['/home/profile']);
        }
    }
}





