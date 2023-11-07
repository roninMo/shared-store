import { Component, DestroyRef, inject } from '@angular/core';
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
import { UserForm, User, Post, SubclassedFormFactory, SublcassedFormGroup, generateUser, emptyUser, SubclassedFormBuilder } from '@shared-store/utilities';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  UserActions,
  selectAllUserPosts,
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
  protected readonly destroy: DestroyRef = inject(DestroyRef);

  // Store
  user: Observable<User | null>;
  users: Observable<Dictionary<User>>;
  posts: Observable<Post[]>;
  currentPost = 1;

  // Form
  addUserFormFactory: SubclassedFormFactory<UserForm>;
  updateUserFormFactory: SubclassedFormFactory<UserForm>;

  get addUserForm(): SublcassedFormGroup<UserForm> {
    return this.addUserFormFactory.form;
  }

  get updateUserForm(): SublcassedFormGroup<UserForm> {
    return this.updateUserFormFactory.form;
  }

  activeUserId: FormControl<number>;

  constructor(protected fb: SubclassedFormBuilder, protected store: Store) {
    // Forms
    this.addUserFormFactory = new SubclassedFormFactory<UserForm>(this.destroy, this.fb, generateUser(emptyUser));
    this.updateUserFormFactory = new SubclassedFormFactory<UserForm>(this.destroy, this.fb, generateUser(emptyUser));
    this.activeUserId = new FormControl(0, { nonNullable: true });
    console.info('user form factory: ', { addUser: this.addUserFormFactory, updateUser: this.updateUserFormFactory });
    
    // Store
    this.users = store.select(selectUsersEntities);
    this.user = store.select(selectSelectedUser);
    this.posts = store.select(selectAllUserPosts(this?.activeUserId?.value || 1));
  }

  getUser() {
    this.store.dispatch(UserActions['[UserPage]GetUser']({ userId: this.activeUserId.value || 0 }));
    this.posts = this.store.select(selectAllUserPosts(this?.activeUserId?.value || 0));
  }

  addUser() {
    console.log('\nadd user form: ', this.addUserForm);
    this.addDummyId(this.addUserForm);

    const userInformation: User = this.addUserForm.getRawValue();
    this.store.dispatch(UserActions['[UserPage]AddUser']({ user: userInformation }));
    this.addUserForm.reset();
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
    this.updateUserForm.reset();
  }

  protected addDummyId(form: SublcassedFormGroup<UserForm>, id = 11): void {
    if (form) {
      form.controls.id.setValue(id);
    }
  }
}
