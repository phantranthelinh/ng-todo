import { AbstractControl } from '@angular/forms';

export function getErrorMessage(
  control: AbstractControl | null
): string | null {
  if (!control || !control.errors || !control.touched) {
    return null;
  }

  const errorMessages: { [key: string]: string | ((error: any) => string) } = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    passwordNotMatch: 'Passwords do not match.',
    minlength: (error: any) => `Minimum length is ${error.requiredLength}.`,
    maxlength: (error: any) => `Maximum length is ${error.requiredLength}.`,
  };

  // Iterate through errors and return the appropriate message
  for (const [errorKey, errorValue] of Object.entries(control.errors)) {
    if (errorMessages[errorKey]) {
      const message = errorMessages[errorKey];
      return typeof message === 'function' ? message(errorValue) : message;
    }
  }

  // Default message if no match is found
  return 'Invalid field.';
}
