/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressForm, Countries, UserFormFactory, SubclassedFormGroup, UserForm } from '@shared-store/utilities';
import { ButtonComponent, InputComponent, SelectComponent, TextareaComponent } from '@shared-store/components';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-store-add-user-form',
  standalone: true,
  templateUrl: './AddUserForm.component.html',
  styleUrls: ['./AddUserForm.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ButtonComponent
  ],
})
export class AddUserFormComponent {
  @Input()
  set formFactory(formFactory: UserFormFactory) {
    if (formFactory) {
      this.factory = formFactory;
      this.geoForm = formFactory.form.controls.address.controls.geo;
      this.addressForm = formFactory.form.controls.address;
      this.companyForm = formFactory.form.controls.company;
      this.userForm = formFactory.subclassedForm;
    }
  }

  geoForm!: FormGroup<any>;
  addressForm!: FormGroup<AddressForm>;
  companyForm!: FormGroup<any>;
  userForm!: FormGroup<UserForm>;
  factory!: UserFormFactory;
  
  formSubmittedLabel = 'Add User';
  countries: string[] = Countries;

  protected onFormSubmitted(): void {
    console.log('form submitted', this.factory);
  }
}
