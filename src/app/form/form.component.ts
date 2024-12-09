import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, map, tap } from 'rxjs';
import { MultiSelectComponent } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, MultiSelectComponent],
  templateUrl: './form.component.html',
  providers: [FormBuilder, HttpClient],
})
export class FormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  ngOnInit(): void {
    this.http
      .get('https://restcountries.com/v3.1/all')
      .pipe(
        tap((countryList) => {
          this.country$.next(countryList);
        })
      )
      .subscribe();
    // this.userForm.get('country')!.setValue('Taiwan');
  }
  private http = inject(HttpClient);

  country$ = new BehaviorSubject<any>([]);

  get countries() {
    return this.country$.pipe(
      map((data) => {
        return data.map((country: any) => country.name.common);
      })
    );
  }

  handleSelectedOptionsChange(selectedOptions: any[]) {
    console.log(selectedOptions);
  }

  // profileForm = this.formBuilder.group({
  //   firstName: ['', Validators.required, forbidenName(/bob/i)],
  //   lastName: ['', Validators.required],
  //   address: this.formBuilder.group({
  //     street: [''],
  //     city: [''],
  //     state: [''],
  //     zip: [''],
  //   }),
  //   aliases: this.formBuilder.array([this.formBuilder.control('')]),
  // })

  // get aliases() {
  //   return this.profileForm.get('aliases') as FormArray;
  // }
  // addAlias() {
  //   this.aliases.push(this.formBuilder.control(''));
  // }
  // onSubmit() {
  //   console.log(this.profileForm.value);
  //   console.log(this.profileForm.valid);
  // }

  // updateProfile() {
  //   this.profileForm.patchValue({
  //     firstName: 'Test',
  //     address: {
  //       street: 'Test',
  //     },
  //   });
  // }



  //use empty array
  userForm = this.formBuilder.group(
    {
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      gener: ['male'],
      country: ['Laos'],
      selectedOptions: [[], Validators.required],//use empty array
      // selectedOptions: this.formBuilder.array([])//use form builder empty array
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;
    if (password != '' && confirmPassword != '') {
      return password === confirmPassword ? null : { passwordNotMatch: true };
    }
    return null;
  }

  onSighUp() {
    this.userForm.markAllAsTouched();
    console.log(this.userForm.valid);
    console.log(this.userForm.value);
    console.log(this.userForm.hasError('passwordNotMatch'));
    console.log(this.userForm)

  }

  getErrorMessage(control: AbstractControl | null): string | null {
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
}
