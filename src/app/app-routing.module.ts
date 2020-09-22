import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HomeComponent, HomeLandingComponent } from './public/home.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { ListCasesComponent } from './public/list-cases/list-cases.component';
import { RouterModule, Routes } from '@angular/router';
import { InitiativeFormComponent } from './secure/initiative-form/initiative-form.component';
import { CaseFormComponent } from './secure/case-form/case-form.component';
import { AuthGuard } from './app.auth.guard';
import { PublicGuard } from './app.public.guard';
import { AboutComponent } from './public/about/about.component';
import {ListInitiativesComponent} from './public/list-initiatives/list-initiatives.component';
import {InitiativePageComponent} from './public/initiative-page/initiative-page.component';
import { QaComponent } from './public/qa/qa.component';

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
      { path: 'qa', component:  QaComponent},
      { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
      { path: 'register', component: InitiativeFormComponent, canActivate: [PublicGuard] },
      { path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent, canActivate: [PublicGuard] },
      { path: 'resendCode', component: ResendCodeComponent, canActivate: [PublicGuard] },
      { path: 'forgotPassword/:email', component: ForgotPassword2Component, canActivate: [PublicGuard] },
      { path: 'forgotPassword', component: ForgotPasswordStep1Component, canActivate: [PublicGuard] },
      { path: 'newPassword', component: NewPasswordComponent, canActivate: [PublicGuard] },
      { path: 'cases-list', component: ListCasesComponent },
      { path: 'initiatives', component: ListInitiativesComponent },
      { path: 'initiatives/:id', component: InitiativePageComponent },
      { path: 'cases/new', component: CaseFormComponent, canActivate: [AuthGuard] },
      { path: 'cases/:id', component: CaseFormComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
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
