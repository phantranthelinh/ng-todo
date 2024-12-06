import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent {
  @Input() control!: any; 
  @Input() options: { label: string; value: any }[] = []; 
  @Output() selectedOptionsChange = new EventEmitter<any[]>(); 

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleOption(option: { label: string; value: any }) {
    const selectedOptions = this.control.value || [];
    const index = selectedOptions.findIndex(
      (selected: any) => selected.value === option.value
    );

    if (index > -1) {
      selectedOptions.splice(index, 1); // Remove the option if it's already selected
    } else {
      selectedOptions.push(option); // Add the option if it's not selected
    }

    this.control.setValue(selectedOptions); // Update the FormControl value
    this.selectedOptionsChange.emit(selectedOptions); // Emit the updated selection
  }

  isSelected(option: { label: string; value: any }) {
    const selectedOptions = this.control.value || [];
    return selectedOptions.some(
      (selected: any) => selected.value === option.value
    );
  }
}
