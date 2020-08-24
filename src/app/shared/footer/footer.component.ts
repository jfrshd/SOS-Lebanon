import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/service/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private userLoginService: UserLoginService, private router: Router) { }

  ngOnInit(): void {
    this.userLoginService.isLoggedIn$
      .subscribe(val => this.isLoggedIn = val);
  }

  login(): void {
    this.router.navigate(['/home/login']);
  }

  addInitiative(): void {
    this.router.navigate(['/home/register']);
  }
}
