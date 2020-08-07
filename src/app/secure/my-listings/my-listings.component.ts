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
    private initialCount = 10;
    count: number = this.initialCount;

    constructor(public router: Router, public userService: UserLoginService,
        private cognitoUtil: CognitoUtil, private listingService: ListingService) {
        this.userService.isAuthenticated(this);
        this.user = this.cognitoUtil.getCurrentUser();
        if (this.user) {
            this.username = this.user.getUsername();
        }
    }

    refresh(): void {
        this.listingService.get('')
            .subscribe(data => this.data = data);
    }

    ngOnInit(): void {
        this.refresh();
    }

    isLoggedIn(message: string, isLoggedIn: boolean): void {
        // if (!isLoggedIn) {
        //     this.router.navigate(['/home/login']);
        // }
    }

    onDelete(id: string): void {
        this.data.result.Items = this.data.result.Items.filter(f => f.id !== id);
    }
}
