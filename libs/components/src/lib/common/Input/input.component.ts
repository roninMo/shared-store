/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, Self, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  interval,
  skip,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SubclassedFormControl } from '@shared-store/utilities';

@Component({
  selector: 'shared-store-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() control: FormControl = new FormControl('');
  @Input() controlName = '';
  @Input() autocomplete = '';
  @Input() label = '';

  inputDisabled = false;
  _value = new BehaviorSubject<string>('');
  propagateChange: any = () => {};
  propagateTouched: any = () => {};

  constructor() {
    // This only activates an update to a value and broadcasts it after the user has finished entering keys
    this._value
      .pipe(skip(2), takeUntilDestroyed(), debounceTime(430)) // This skips the initial subscription and the control value accessor binding so we achieve updating every interval instead of keypress
      .subscribe((input) => {
        this.propagateChange(input);
        console.log('\npropagating value: ', {
          value: input, control: this.control, propagateChangeFunction: this.propagateChange, propagateTouchedFunction: this.propagateTouched
        });
      });
  }

  onChange(event: any): void {
    // This let's you have access to when you send values to the form and right now we're just using subscriptions to handle this
    const value = event?.target?.value;
    // if (value) {
      this._value.next(value);
    // }
  }
  
  onBlur(event: any): void {
    // TODO: you should create an event emitter here to capture these events otherwise it's not necessary
    const value = event?.target?.value;
    this.control.markAsTouched({ onlySelf: true });
    // this._value.next(value);
    // if (value) {
    //   console.log('input onBlur: ', value);
    //   this.propagateChange(value);
    // }
  }

  writeValue(value: string): void {
    // console.log('form submit writeValue: ', value);
    this._value.next(value);
  }

  registerOnChange(fn: any): void {
    // console.log('registering the propagateChange function', fn); // Make sure these are binding to angular's directives, otherwise they don't update input events and break everything
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // console.log('registering the propagateTouched function', fn);
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // console.log('set disabled state: ', isDisabled);
    this.inputDisabled = isDisabled;
  }
}
