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
import { UserForm, User, AddressForm, Post } from '@shared-store/utilities';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  UserActions,
  selectAllUserPosts,
  selectPostById,
  selectSelectedUser,
  selectUsersEntities,
} from '@shared-store/shared-store';
import { CommentsComponent } from './Comments/Comments.component';
import { PostComponent } from './Post/Post.component';

@Component({
  selector: 'shared-store-users-page',
  standalone: true,
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  imports: [
    CommonModule,
    CommentsComponent,
    PostComponent,
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
  posts: Observable<Post[]>;
  currentPost = 1;

  // Form
  addUserForm!: FormGroup<UserForm>;
  activeUserId!: FormControl<number>;
  updateUserForm!: FormGroup<UserForm>;

  constructor(protected fb: FormBuilder, protected store: Store) {
    this.users = store.select(selectUsersEntities);
    this.user = store.select(selectSelectedUser);
    this.posts = store.select(selectAllUserPosts(this?.activeUserId?.value || 1));

    this.createUpdateUserForm();
    this.activeUserId = new FormControl(0, { nonNullable: true });
    this.createAddUserForm();
  }

  getUser() {
    this.store.dispatch(UserActions['[UserPage]GetUser']({ userId: this.activeUserId.value || 0 }));
    this.posts = this.store.select(selectAllUserPosts(this?.activeUserId?.value || 0));
  }

  addUser() {
    console.log('\nadd user form: ', this.addUserForm);
    this.addDummyId(this.addUserForm);
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
    console.log('\nupdate user form: ', this.updateUserForm);
    this.addDummyId(this.updateUserForm, 9);
    const userInformation: User = this.updateUserForm.getRawValue();
    this.store.dispatch(UserActions['[UserPage]UpdateUser']({ user: userInformation }));
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

  protected addDummyId(form: FormGroup<UserForm>, id = 11): void {
    if (form) {
      form.controls.id.setValue(id);
    }
  }
}
