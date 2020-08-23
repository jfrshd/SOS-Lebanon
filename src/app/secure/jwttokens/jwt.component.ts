import { Component } from '@angular/core';
import { UserLoginService } from '../../service/user-login.service';
import { CognitoUtil, LoggedInCallback } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { AccessTokenCallback } from './access-token-callback';
import { IdTokenCallback } from './id-token-callback';


export class Stuff {
    public accessToken: string;
    public idToken: string;
}

@Component({
    selector: 'app-jwt',
    templateUrl: './jwt.html'
})
export class JwtComponent implements LoggedInCallback {

    public stuff: Stuff = new Stuff();

    constructor(public router: Router, public userService: UserLoginService, public cognitoUtil: CognitoUtil) {
        this.userService.isAuthenticated(this);
        console.log('in JwtComponent');

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.cognitoUtil.getAccessToken(new AccessTokenCallback(this));
            this.cognitoUtil.getIdToken(new IdTokenCallback(this));
        }
    }
}

