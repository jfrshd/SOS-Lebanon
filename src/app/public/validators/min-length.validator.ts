import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function MinLengthValidator(controlName: string, minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value.length < minLength) {
      if (control.value) {
        control.setErrors({minLengthValidator: true});
      }
      return { minLengthValidator: true };
    } else {
    control.setErrors(null);
    }
    return;
  };
}
