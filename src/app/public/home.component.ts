import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category, ArrayResponse } from './models';
import { CategoryService } from './services/category/category.service';
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
  categories: Category[];
  isSecure: boolean;
  private subscription: Subscription;

  constructor(private categoryService: CategoryService, private auth: UserLoginService) { }

  ngOnInit(): void {
    this.categoryService.get()
      .subscribe(data => this.categories = new ArrayResponse<Category>(data).result.Items);
    this.subscription = this.auth.isLoggedIn$
      .subscribe((isLoggedIn: boolean) => this.isSecure = isLoggedIn);
  }

  ngOnDestroy(): void {
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
  public isSecure = false;
  private auth: UserLoginService;
  private router: Router;
  private subscription: Subscription;

  constructor(auth: UserLoginService, router: Router) {
    this.auth = auth;
    this.router = router;
  }

  ngOnInit(): void {
    this.subscription = this.auth.isLoggedIn$.subscribe((isLoggedIn: boolean) => this.isSecure = isLoggedIn);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


