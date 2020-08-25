import { Component, OnInit } from '@angular/core';
import { LoggedInCallback, CognitoUtil } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../../service/user-login.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ArrayResponse, Case } from '../../public/models';
import { CaseService } from 'src/app/public/services/case/case.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, LoggedInCallback {
    user: CognitoUser;
    username: string;
    keyword: string;
    data: ArrayResponse<Case> = new ArrayResponse<Case>();
    public count = 10;

    constructor(
        public router: Router, public userService: UserLoginService,
        private cognitoUtil: CognitoUtil, private caseService: CaseService) {
        this.userService.isAuthenticated(this);
        const cognitoUser = this.cognitoUtil.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
                cognitoUser.getUserData((error, data) => {
                    const user = data.UserAttributes.filter(entry => entry.Name === 'given_name').pop();
                    this.username = user.Value;
                });
            });
        }
    }

    refresh(loadMore: boolean): void {
        this.caseService.getMyCases(this.keyword, this.count, this.data.result.LastEvaluatedKey)
            .subscribe(data => {
                if (loadMore) {
                    this.data.result.ScannedCount += data.result.ScannedCount;
                    this.data.result.Items = [
                        ...this.data.result.Items,
                        ...data.result.Items
                    ];
                    this.data.result.LastEvaluatedKey = data.result.LastEvaluatedKey;
                } else {
                    this.data = new ArrayResponse<Case>(data);
                }
            });
    }

    ngOnInit(): void {
        this.refresh(false);
    }

    isLoggedIn(message: string, isLoggedIn: boolean): void {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }
    }

    onDelete(id: string): void {
        this.refresh(false);
    }

    onUpdate(id: string): void {
        this.refresh(false);
    }
}
