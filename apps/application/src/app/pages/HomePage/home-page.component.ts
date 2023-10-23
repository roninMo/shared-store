import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserInformationComponent,
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from '@shared-store/components';
import {
  AddressForm,
  Countries,
  User,
  UserForm,
} from '@shared-store/utilities';
import { UsersPageComponent } from '../UsersPage/users-page.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UserFormComponent } from '../UsersPage/UserForm/user-form.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectSelectedUser,
  selectUsersEntities,
} from '@shared-store/shared-store';
import { Dictionary } from '@ngrx/entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  countries: string[] = Countries;
  userForm!: FormGroup<UserForm>;
  users: Observable<Dictionary<User>>;
  user: Observable<User> | null;

  constructor(protected fb: FormBuilder, protected store: Store) {
    this.createUserForm();
    console.log('user form: ', this.userForm);
    this.users = store.select(selectUsersEntities).pipe(takeUntilDestroyed());
    this.user = store.select(selectSelectedUser) as Observable<User>;
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
        geo: new FormGroup({
          lat: new FormControl(),
          lng: new FormControl(),
        }),
      },
      formGroupOptions
    );

    this.userForm = this.fb.group<UserForm>(
      {
        id: new FormControl(),
        name: new FormControl(),
        username: new FormControl(),
        email: new FormControl(),
        address: addressGroup,
        phone: new FormControl(),
        website: new FormControl(),
        company: new FormGroup({
          name: new FormControl(),
          catchPhrase: new FormControl(),
          bs: new FormControl(),
        }),
      },
      formGroupOptions
    );
  }

  protected printUsers(): void {
    console.log('\nusers selector: ', this.users);
    this.users
      .subscribe((usersInformation) => {
        console.log('all users: ', usersInformation);
      })
      .unsubscribe();
    this.user
      ?.subscribe((userInformation) => {
        console.log('current user: ', userInformation);
      })
      .unsubscribe();
  }
}
