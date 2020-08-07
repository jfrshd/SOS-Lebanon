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
import { MyProfileComponent } from './secure/profile/myprofile.component';
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
import { ListingEntryComponent } from './public/listing-entry/listing-entry.component';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { ListingComponent } from './public/listing/listing.component';
import { CreateListingComponent } from './secure/create-listing/create-listing.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyListingsComponent } from './secure/my-listings/my-listings.component';

import { AppRoutingModule } from './app-routing.module';

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
    MyProfileComponent,
    ListingComponent,
    ListingEntryComponent,
    SecureHomeComponent,
    MyListingsComponent,
    CreateListingComponent,
    JwtComponent,
    AppComponent
  ],
  imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        InternationalPhoneNumberModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
