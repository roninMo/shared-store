import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ButtonComponent,
  InputComponent,
  UserInformationComponent,
} from '@shared-store/components';
import { UserFormComponent } from './UserForm/user-form.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Dictionary } from '@ngrx/entity';
import { UserForm, User, AddressForm } from '@shared-store/utilities';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  UserActions,
  selectSelectedUser,
  selectUsersEntities,
} from '@shared-store/shared-store';

@Component({
  selector: 'shared-store-users-page',
  standalone: true,
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    UserInformationComponent,
    UserFormComponent,
  ],
})
export class UsersPageComponent {
  // Store
  user: Observable<User | null>;
  users: Observable<Dictionary<User>>;

  // Form
  addUserForm!: FormGroup<UserForm>;
  activeUserId!: FormControl<number>;
  updateUserForm!: FormGroup<UserForm>;

  constructor(protected fb: FormBuilder, protected store: Store) {
    this.users = store.select(selectUsersEntities).pipe(takeUntilDestroyed());
    this.user = store.select(selectSelectedUser);

    this.createUpdateUserForm();
    this.activeUserId = new FormControl();
    this.createAddUserForm();
  }

  getUser() {
    this.store.dispatch(
      UserActions['[UserPage]GetUser']({ userId: this.activeUserId.value || 0 })
    );
  }

  addUser() {
    console.log('add user form: ', this.addUserForm);
    const userInformation: User = this.addUserForm.getRawValue();
    this.store.dispatch(
      UserActions['[UserPage]AddUser']({ user: userInformation })
    );
  }

  deleteUser() {
    const userId = this.activeUserId.value;
    if (userId) {
      this.store.dispatch(UserActions['[UserPage]DeleteUser']({ userId }));
    }
  }

  updateUser() {
    console.log('update user form: ', this.updateUserForm);
    const userInformation: User = this.updateUserForm.getRawValue();
    this.store.dispatch(
      UserActions['[UserPage]AddUser']({ user: userInformation })
    );
  }

  createAddUserForm() {
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

    this.addUserForm = this.fb.group<UserForm>(
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

  createUpdateUserForm() {
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

    this.updateUserForm = this.fb.group<UserForm>(
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
}
