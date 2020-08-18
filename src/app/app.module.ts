import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserRegistrationService } from './service/user-registration.service';
import { UserParametersService } from './service/user-parameters.service';
import { UserLoginService } from './service/user-login.service';
import { CognitoUtil } from './service/cognito.service';
import { AboutComponent, HomeComponent, HomeLandingComponent } from './public/home.component';
import { AwsUtil } from './service/aws.service';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { SecureHomeComponent } from './secure/landing/securehome.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { DynamoDBService } from './service/ddb.service';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { LogoutComponent, RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { MFAComponent } from './public/auth/mfa/mfa.component';
import { CaseEntryComponent } from './public/case-entry/case-entry.component';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { ListCasesComponent } from './public/list-cases/list-cases.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './secure/profile/profile.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppInterceptorProviders } from './app-interceptor.provider';
import { InitiativeFormComponent } from './secure/initiative-form/initiative-form.component';
import { CaseFormComponent } from './secure/case-form/case-form.component';
import {ListInitiativesComponent} from './public/list-initiatives/list-initiatives.component';
import {InitiativeEntryComponent} from './public/initiative-entry/initiative-entry.component';
import {InitiativeViewComponent} from './public/initiative-view/initiative-view.component';
import {InitiativePageComponent} from './public/initiative-page/initiative-page.component';

@NgModule({
  declarations: [
    NewPasswordComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationConfirmationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPassword2Component,
    RegisterComponent,
    MFAComponent,
    AboutComponent,
    HomeLandingComponent,
    HomeComponent,
    UseractivityComponent,
    ListCasesComponent,
    CaseEntryComponent,
    SecureHomeComponent,
    ProfileComponent,
    InitiativeFormComponent,
    InitiativeEntryComponent,
    ListInitiativesComponent,
    InitiativeViewComponent,
    InitiativePageComponent,
    CaseFormComponent,
    JwtComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TagInputModule,
    ReactiveFormsModule,
    InternationalPhoneNumberModule,
    NgbModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CognitoUtil,
    AwsUtil,
    DynamoDBService,
    UserRegistrationService,
    UserLoginService,
    UserParametersService,
    AppInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
