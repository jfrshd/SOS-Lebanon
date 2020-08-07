import { Component, OnInit } from '@angular/core';
import { LoggedInCallback, CognitoUtil } from '../../service/cognito.service';
import { Router } from '@angular/router';
import { UserLoginService } from '../../service/user-login.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ListingService } from '../../public/services/listing/listing.service';
import { Listing } from '../../public/models';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './my-listings.component.html',
    styleUrls: ['./my-listings.component.css'],
    providers: [ListingService]
})
export class MyListingsComponent implements OnInit, LoggedInCallback {
    user: CognitoUser;
    username: string;
    keyword: string;
    data: Listing[] = [];

    constructor(public router: Router, public userService: UserLoginService,
        private cognitoUtil: CognitoUtil, private listingService: ListingService) {
        this.userService.isAuthenticated(this);
        this.user = this.cognitoUtil.getCurrentUser();
        if (this.user) {
            this.username = this.user.getUsername();
        }
    }

    refresh() {
        this.listingService.get('', this.keyword)
            .subscribe(data => this.data = data);
    }

    ngOnInit() {
        this.refresh();
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        // if (!isLoggedIn) {
        //     this.router.navigate(['/home/login']);
        // }
    }

    onDelete(id: number) {
        this.data = this.data.filter(f => f.id !== id);
    }
}
