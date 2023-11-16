/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@shared-store/components';
import { AddressForm, SubclassedFormBuilder, SubclassedFormFactory, SubclassedFormGroup, UserForm, controlValidation, emptyUser, generateUser } from '@shared-store/utilities';
import { FormBuilder, FormControl, FormControlOptions, FormControlState, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@shared-store/shared-store';

// This was a component created to figure out a good way to use custom control value accessors with angular forms
// You can add input update intervals to let the user typeahead before you validate or add your own custom logic that determines when you should submit values
@Component({
  selector: 'shared-store-form-controls',
  standalone: true,
  templateUrl: './FormControls.component.html',
  styleUrls: ['./FormControls.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ReactiveFormsModule
  ],
})
export class FormControlsComponent {
  protected readonly destroy: DestroyRef = inject(DestroyRef);
  updateUserFormFactory: SubclassedFormFactory<UserForm>;
  updatedUserForm: SubclassedFormGroup<UserForm>;

  constructor(protected fb: SubclassedFormBuilder, protected httpClient: ApiService) {
    this.updateUserFormFactory = new SubclassedFormFactory<UserForm>(this.destroy, this.fb, httpClient, generateUser(emptyUser));
    this.updatedUserForm = this.updateUserFormFactory.subclassedForm;
    console.log('constructed the form', this.updateUserFormFactory);
  }

  onTouched(): void {
    console.log('FormControlsComponent -> touched: ');
  }

  onBlur(value: any): void {
    console.log('FormControlsComponent -> blur: ', value);
  }

  onUpdate(value: any): void {
    console.log('FormControlsComponent -> update: ', value);
  }
}
