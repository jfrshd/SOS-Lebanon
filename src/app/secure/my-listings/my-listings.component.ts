import { Component, OnInit } from '@angular/core';
import { LoggedInCallback, CognitoUtil } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../../service/user-login.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ListingService } from '../../public/services/listing/listing.service';
import { Listing, ApiResponse } from '../../public/models';

@Component({
    selector: 'app-my-listings',
    templateUrl: './my-listings.component.html',
    styleUrls: ['./my-listings.component.css'],
})
export class MyListingsComponent implements OnInit, LoggedInCallback {
    user: CognitoUser;
    username: string;
    keyword: string;
    data: ApiResponse<Listing> = new ApiResponse<Listing>();
    public count = 10;

    constructor(public router: Router, public userService: UserLoginService,
        private cognitoUtil: CognitoUtil, private listingService: ListingService) {
        this.userService.isAuthenticated(this);
        const cognitoUser = this.cognitoUtil.getCurrentUser();
        if (cognitoUser != null) {
          cognitoUser.getSession( (err, session) => {
            cognitoUser.getUserData((err, data) => {
               const user = data.UserAttributes.filter(entry => entry.Name == 'given_name').pop();
               this.username = user.Value;
            });
          });
        }
    }

    refresh(loadMore: boolean): void {
        this.listingService.get('', this.keyword, this.count, this.data.result.LastEvaluatedKey)
            .subscribe(data => {
                if (loadMore) {
                    this.data.result.ScannedCount += data.result.ScannedCount;
                    this.data.result.Items = [
                        ...this.data.result.Items,
                        ...data.result.Items
                    ];
                    this.data.result.LastEvaluatedKey = data.result.LastEvaluatedKey;
                } else {
                    this.data = new ApiResponse<Listing>(data);
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
        this.data.result.Items = this.data.result.Items.filter(f => f.id !== id);
    }
}
