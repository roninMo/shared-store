/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@shared-store/components';
import { SubclassedFormBuilder, UserFormFactory, SubclassedFormGroup, UserForm, emptyUser, generateUser, ApiService } from '@shared-store/utilities';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  updateUserFormFactory: UserFormFactory;
  updatedUserForm: SubclassedFormGroup<UserForm>;

  constructor(protected fb: SubclassedFormBuilder, protected httpClient: ApiService) {
    this.updateUserFormFactory = new UserFormFactory(this.destroy, this.fb, httpClient, generateUser(emptyUser));
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
