/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { InputComponent, SelectComponent, TextareaComponent, ButtonComponent } from '@shared-store/components';
import { SubclassedFormFactory, UserForm, AddressForm, Countries } from '@shared-store/utilities';

@Component({
  selector: 'shared-store-update-user-form',
  standalone: true,
  templateUrl: './UpdateUserForm.component.html',
  styleUrls: ['./UpdateUserForm.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ButtonComponent
  ],
})
export class UpdateUserFormComponent {
  @Input()
  set formFactory(formFactory: SubclassedFormFactory<UserForm>) {
    console.log('setting the form factory', formFactory);
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
  factory!: SubclassedFormFactory<UserForm>;
  
  formSubmittedLabel = 'Add User';
  countries: string[] = Countries;

  protected onFormSubmitted(): void {
    console.log('form submitted', this.factory);
  }
}
