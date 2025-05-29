import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddressGroupComponent } from './address-group-form/form.component';

@Component({
  selector: 'app-reuse-form',
  standalone: true,
  imports: [ReactiveFormsModule, AddressGroupComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="form-field">
        <label for="displayName">Display Name</label>
        <input formControlName="displayName" type="text" id="displayName" />
      </div>
      <app-address-group
        label="Delivery Address"
        controlKey="deliveryAddress"
      ></app-address-group>
      <app-address-group
        label="Billing Address"
        controlKey="billingAddress"
      ></app-address-group>
      <button>Submit</button>
    </form>
  `,
})
export class ReuseFormComponent {
  form = new FormGroup({
    displayName: new FormControl(''),
  });
  submit() {
    // do whatever you need with it...
    console.log(this.form.value);
    this.form.reset();
  }
}
