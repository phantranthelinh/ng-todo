import { AbstractControl, ValidationErrors } from "@angular/forms";

function getControlValue(control: AbstractControl, fieldName: string): string | null {
  return control.get(fieldName)?.value || null;
}

function arePasswordsValid(password: string | null, confirmPassword: string | null): boolean {
  return !!password && !!confirmPassword;
}

function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = getControlValue(control, 'password');
  const confirmPassword = getControlValue(control, 'confirmPassword');

  if (!arePasswordsValid(password, confirmPassword)) {
    return null; // Skip validation if either password field is missing or empty
  }

  return doPasswordsMatch(password!, confirmPassword!) ? null : { passwordNotMatch: true };
}
