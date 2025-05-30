import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Output() selectedOptionsChange = new EventEmitter<any[]>();
  isDropdownOpen = false;
  selectedOptions: any[] = [];

  private onChange: (value: any[]) => void = () => {};
  private onTouched: () => void = () => {};
  ngControl: any;


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.onTouched(); // Notify the form that the control has been touched
  }

  toggleOption(option: { label: string; value: any }) {
    const index = this.selectedOptions.findIndex(
      (selected) => selected.value === option.value
    );

    if (index > -1) {
      this.selectedOptions.splice(index, 1); // Remove the option if it's already selected
    } else {
      this.selectedOptions.push(option); // Add the option if it's not selected
    }

    this.onChange(this.selectedOptions); // Notify the form control
    this.selectedOptionsChange.emit(this.selectedOptions); // Emit the updated selection
    this.onTouched(); // Notify the form that the control has been touched
  }

  isSelected(option: { label: string; value: any }) {
    return this.selectedOptions.some(
      (selected) => selected.value === option.value
    );
  }
  // ControlValueAccessor methods
  writeValue(value: any[]): void {
    this.selectedOptions = value || [];
  }
  registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this if your component needs to handle disabled state
  }
  get errorMessages(): string[] {
    if (this.ngControl?.control?.errors) {
      return Object.entries(this.ngControl.control.errors).map(
        ([key, value]) => {
          if (key === 'required') {
            return 'This field is required.';
          }
          if (key === 'minlength') {
            return `Minimum length is ${(value as any).requiredLength}.`;
          }
          if (key === 'maxlength') {
            return `Maximum length is ${(value as any).requiredLength}.`;
          }
          // Add more validation messages as needed
          return 'Invalid field.';
        }
      );
    }
    return [];
  }
}
