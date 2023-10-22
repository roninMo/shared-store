import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserInformationComponent,
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from '@shared-store/components';
import { AddressForm, Countries, UserForm } from '@shared-store/utilities';
import { UsersPageComponent } from '../UsersPage/users-page.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UserFormComponent } from '../UsersPage/UserForm/user-form.component';

@Component({
  selector: 'shared-store-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    CommonModule,
    UserInformationComponent,
    UsersPageComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    UserFormComponent,
  ],
})
export class HomePageComponent {
  // TODO: Let's create the form with a good class implementation to initialize each of the forms
  userForm!: FormGroup<UserForm>;
  countries: string[] = Countries;

  constructor(private fb: FormBuilder) {
    this.createUserForm();
    console.log('user form: ', this.userForm);
  }

  protected createUserForm(): void {
    const formGroupOptions: AbstractControlOptions = {
      validators: [],
      asyncValidators: [],
      updateOn: 'change',
    };

    const addressGroup: FormGroup<AddressForm> = this.fb.group<AddressForm>(
      {
        street: new FormControl(),
        suite: new FormControl(),
        city: new FormControl(),
        zipcode: new FormControl(),
        country: new FormControl(),
        geo: new FormControl(),
      },
      formGroupOptions
    );

    this.userForm = this.fb.group<UserForm>(
      {
        name: new FormControl(),
        username: new FormControl(),
        email: new FormControl(),
        address: addressGroup,
      },
      formGroupOptions
    );
  }
}