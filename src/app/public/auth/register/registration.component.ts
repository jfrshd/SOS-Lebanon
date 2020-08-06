import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserRegistrationService} from '../../../service/user-registration.service';
import {CognitoCallback} from '../../../service/cognito.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
    form: FormGroup

    constructor(public userRegistration: UserRegistrationService, router: Router) {
        this.router = router;
        this.onInit();
    }

    onInit() {
        this.errorMessage = null;
        this.form = new FormGroup({
                firstname: new FormControl(null, []),
                lastname: new FormControl(null, []),
                email: new FormControl(null, [Validators.required, Validators.email]),
                phone: new FormControl(null, []),
                help_note: new FormControl(null, []),
            }
        )

    }

    onRegister() {
        this.errorMessage = null;
        if (this.form.controls['email'].invalid) {
            this.errorMessage = 'Please enter a correct email'
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
            this.router.navigate(['/home/confirmRegistration', result.user.username]);
        }
    }
}
