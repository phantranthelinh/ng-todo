import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { errorTailorImports } from '@ngneat/error-tailor';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { createSkillGroup, formSchema } from './schema/form-schema';
import { CountryService } from './services/country.service';
import { passwordMatchValidator } from './validators/password-match.validator';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectComponent,
    errorTailorImports,
  ],
  templateUrl: './form.component.html',
  providers: [FormBuilder, CountryService],
})
export class FormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private countryService: CountryService = inject(CountryService);
  countries$ = this.countryService.getCountryNames();
  // Reactive form
  userForm = this.formBuilder.group(formSchema, {
    validators: passwordMatchValidator,
  });
  options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  ngOnInit(): void {
    this.countryService.loadCountries();
  }
  handleSelectedOptionsChange(selectedOptions: any[]) {
    console.log(selectedOptions);
  }

  addNewSkill(): void {
      this.skills.push(createSkillGroup());
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  onSighUp() {
    this.userForm.markAllAsTouched();
    console.log(this.userForm.value);
    console.log(this.userForm.getError('notANumber'));
  }
}
