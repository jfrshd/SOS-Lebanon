import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function ConfirmPasswordValidator(value): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.errors &&
    !control.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== value) {
      if (control.value) {
        control.setErrors({confirmPasswordValidator: true});
      }
      return { confirmPasswordValidator: true };
    } else {
      control.setErrors(null);
    }
  };
}
