import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          passwordNotMatch: 'Passwords do not match',
          required: 'This field is required',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error: any) => `Address isn't valid`,
          notANumber: 'Not a number',
        },
      },
      controlErrorsOn:{
        blur: true
      }
    }),
  ],
};
