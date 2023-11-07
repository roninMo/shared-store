import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-store-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() control: FormControl = new FormControl('');
  @Input() autocomplete = '';
  @Input() label = '';

  
  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
    
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }
}
