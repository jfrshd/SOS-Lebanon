import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(formGroup: FormGroup, controlName: string, matchingControlName: string) {
  return () => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return null;
    }

    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
    } else {
        matchingControl.setErrors(null);
    }
  }
}

