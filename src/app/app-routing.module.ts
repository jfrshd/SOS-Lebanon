import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent, HomeComponent, HomeLandingComponent } from './public/home.component';
import { SecureHomeComponent } from './secure/landing/securehome.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { LogoutComponent, RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { MyListingsComponent } from './secure/my-listings/my-listings.component';
import { ListingComponent } from './public/listing/listing.component';
import { RouterModule, Routes } from '@angular/router';
import {ListingFormComponent} from './secure/listing-form/listing-form.component';
import { AuthGuard } from './app.auth.guard';
import { PublicGuard } from './app.public.guard';


const homeRoutes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent,
      children: [
          { path: 'about', component: AboutComponent },
          { path: 'login', component: LoginComponent, canActivate: [PublicGuard]  },
          { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },
          { path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent, canActivate: [PublicGuard]  },
          { path: 'resendCode', component: ResendCodeComponent, canActivate: [PublicGuard]  },
          { path: 'forgotPassword/:email', component: ForgotPassword2Component, canActivate: [PublicGuard] },
          { path: 'forgotPassword', component: ForgotPasswordStep1Component, canActivate: [PublicGuard]  },
          { path: 'newPassword', component: NewPasswordComponent, canActivate: [PublicGuard]},
          { path: 'listings', component: ListingComponent },
          { path: 'listings/:id', component: ListingFormComponent, canActivate: [AuthGuard]  },
          { path: 'my-listings', component: MyListingsComponent, canActivate: [AuthGuard] },
          { path: '', component: HomeLandingComponent }
      ]
  },
];

const routes: Routes = [
  {
      path: '',
      children: [
          ...homeRoutes,
          {
              path: '',
              component: HomeComponent
          }
      ]
  },


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
