import { FormArray, FormBuilder, Validators } from '@angular/forms';

const formBuilder = new FormBuilder();

export const formSchema = {
  email: ['', Validators.required],
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
  gener: ['male'],
  selectedOptions: [[], Validators.required], //use empty array
  theme: ['dark', Validators.required],
  address: formBuilder.group({
    name: ['', Validators.required, Validators.minLength(3)],
    city: ['', Validators.required],
    country: ['Laos'],
  }),
  skills: formBuilder.array([formBuilder.control("")]) as FormArray,
};
