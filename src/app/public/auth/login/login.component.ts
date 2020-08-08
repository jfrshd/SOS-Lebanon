import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '../../../service/user-login.service';
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from '../../../service/cognito.service';
import { DynamoDBService } from '../../../service/ddb.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {
    errorMessage: string;
    form: FormGroup
    mfaStep = false;
    mfaData = {
        destination: '',
        callback: null
    };

    constructor(public router: Router,
        public ddb: DynamoDBService,
        public userService: UserLoginService) {
        console.log('LoginComponent constructor');
    }

    ngOnInit() {
        this.errorMessage = null;
        console.log('Checking if the user is already authenticated. If so, then redirect to the secure site');
        this.userService.isAuthenticated(this);

        this.form = new FormGroup({
            email : new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        })
    }

    onLogin() {
        if (!this.form.controls['email'].value  || !this.form.controls['password'].value) {
            this.errorMessage = 'All fields are required';
            return;
        }
        this.errorMessage = null;
        this.userService.authenticate(this.form.controls['email'].value, this.form.controls['password'].value, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.errorMessage = message;
            console.log('result: ' + this.errorMessage);
            if (this.errorMessage === 'User is not confirmed.') {
                console.log('redirecting');
                this.router.navigate(['/home/confirmRegistration', this.form.controls['email'].value]);
            } else if (this.errorMessage === 'User needs to set password.') {
                console.log('redirecting to set new password');
                this.router.navigate(['/home/newPassword']);
            }
        } else { // success
            this.ddb.writeLogEntry('login');
            this.router.navigate(['/home/my-listings']);
        }
    }

    handleMFAStep(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void {
        this.mfaStep = true;
        this.mfaData.destination = challengeParameters.CODE_DELIVERY_DESTINATION;
        this.mfaData.callback = (code: string) => {
            if (code == null || code.length === 0) {
                this.errorMessage = 'Code is required';
                return;
            }
            this.errorMessage = null;
            callback(code);
        };
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.router.navigate(['/home/my-listings']);
        }
    }

    cancelMFA(): boolean {
        this.mfaStep = false;
        return false;   // necessary to prevent href navigation
    }
}
