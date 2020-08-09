import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListingType } from './models';
import { ListingTypeService } from './services/listing-type/listing-type.service';
import { UserLoginService } from '../service/user-login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare let AWS: any;
declare let AWSCognito: any;

@Component({
    selector: 'app-about',
    template: '<p>Hello and welcome!\'< /p>'
})
export class AboutComponent {

}

@Component({
    selector: 'app-landinghome',
    templateUrl: './landinghome.html',
    styleUrls: ['./landinghome.css'],
})
export class HomeLandingComponent implements OnInit, OnDestroy {
    types: ListingType[];
    isSecure: boolean;
    private subscription: Subscription;

    constructor(private dataTypeService: ListingTypeService, private auth: UserLoginService) {}

    ngOnInit(): void {
        this.dataTypeService.get()
            .subscribe(data => this.types = data.result.Items);
            this.subscription = this.auth.isLoggedIn$.subscribe((isLoggedIn:boolean) => this.isSecure = isLoggedIn);
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    public isSecure: boolean = false;
    private auth: UserLoginService;
    private router: Router;
    private subscription: Subscription;

    constructor(auth: UserLoginService, router: Router) {
      this.auth = auth;
      this.router = router;
    }

    ngOnInit(): void {
      this.subscription = this.auth.isLoggedIn$.subscribe((isLoggedIn:boolean) => this.isSecure = isLoggedIn);
    }

    logout() {
      this.auth.logout();
      this.router.navigate(['/home']);
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
}


