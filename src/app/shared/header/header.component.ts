import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLoginService } from '../../service/user-login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

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

  login(): void {
    this.router.navigate(['/home/login']);
  }

  about(): void {
    this.router.navigate(['/home/about']);
  }

  addInitiative(): void {
    this.router.navigate(['/home/register']);
  }

  profile(): void {
    this.router.navigate(['/home/profile']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
