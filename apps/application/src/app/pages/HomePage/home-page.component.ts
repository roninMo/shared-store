import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserInformationComponent,
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from '@shared-store/components';
import { UsersPageComponent } from '../UsersPage/users-page.component';
import { UserFormComponent } from '../UsersPage/UserForm/UserForm/user-form.component';
import { Dictionary } from '@ngrx/entity';
import { ApiService, SubclassedFormBuilder, SubclassedFormGroup, User, UserForm, UserFormFactory, emptyUser, generateUser } from '@shared-store/utilities';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectUsersEntities, selectSelectedUser } from '@shared-store/shared-store';
import { UserDataComponent } from '../UsersPage/UserForm/UserData.component';

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
    UserDataComponent,
  ],
})
export class HomePageComponent {
  protected readonly destroy: DestroyRef = inject(DestroyRef);
  userFormFactory: UserFormFactory;
  userForm: SubclassedFormGroup<UserForm>;

  // random warm up logic
  users: Observable<Dictionary<User>>;
  user: Observable<User> | null;
  
  constructor(protected fb: SubclassedFormBuilder, protected httpClient: ApiService, protected store: Store) {
    this.userFormFactory = new UserFormFactory(this.destroy, this.fb, httpClient, generateUser(emptyUser));
    this.userForm = this.userFormFactory.subclassedForm;
    console.log('user form: ', this.userForm);
    this.users = store.select(selectUsersEntities).pipe(takeUntilDestroyed());
    this.user = store.select(selectSelectedUser) as Observable<User>;
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
