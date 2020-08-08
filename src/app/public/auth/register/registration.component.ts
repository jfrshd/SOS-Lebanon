import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegistrationService} from '../../../service/user-registration.service';
import {CognitoCallback} from '../../../service/cognito.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../validators/password.confirm.validator';

/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegisterComponent implements CognitoCallback {
  router: Router;
  errorMessage: string;
  form: FormGroup;

    constructor(public userRegistration: UserRegistrationService, router: Router) {
        this.router = router;


      this.onInit();
    }

    onInit() {
        this.errorMessage = null;

        this.form = new FormGroup({
          firstname: new FormControl(null, [Validators.required]),
          lastname: new FormControl(null, [Validators.required]),
          email: new FormControl(null, [Validators.required, Validators.email]),
          phone: new FormControl(null, [Validators.required]),
          help_note: new FormControl(null, [Validators.required]),
          password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
          confirm_password: new FormControl(null, [Validators.required, Validators.minLength(8)])
        });

        this.form.get('confirm_password').setValidators([
          Validators.required,
          Validators.minLength(8),
          ConfirmedValidator(this.form, 'password', 'confirm_password')
        ]);
    }


    onRegister() {
      this.errorMessage = null;
      if (this.form.controls.email.invalid) {
        this.errorMessage = 'Please enter a correct email';
        return;
      }
      if (this.form.controls.password.invalid ) {
        this.errorMessage = 'Password must be minimun 8 characters';
        return;
      }
      if (this.form.controls.password.value != this.form.controls.confirm_password.value) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      this.userRegistration.register(this.form.value, this);
    }


    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.errorMessage = message;
            console.log('result: ' + this.errorMessage);
        } else { // success
            // move to the next step
            console.log('redirecting');
            this.router.navigate(['/home/confirmRegistration', encodeURI(result.user.username)]);
        }
    }
}
