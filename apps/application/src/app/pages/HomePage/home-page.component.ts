import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UserInformationComponent,
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from '@shared-store/components';
import {
  Countries,
  SubclassedFormBuilder,
  SubclassedFormFactory,
  SubclassedFormGroup,
  User,
  UserForm,
  emptyUser,
  generateUser,
} from '@shared-store/utilities';
import { UsersPageComponent } from '../UsersPage/users-page.component';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { UserFormComponent } from '../UsersPage/UserForm/UserForm/user-form.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ApiService,
  selectSelectedUser,
  selectUsersEntities,
} from '@shared-store/shared-store';
import { Dictionary } from '@ngrx/entity';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    UserDataComponent
  ],
})
export class HomePageComponent {
  protected readonly destroy: DestroyRef = inject(DestroyRef);
  userFormFactory: SubclassedFormFactory<UserForm>;
  userForm: SubclassedFormGroup<UserForm>;
  countries: string[] = Countries;

  // random warm up logic
  users: Observable<Dictionary<User>>;
  user: Observable<User> | null;
  
  constructor(protected fb: SubclassedFormBuilder, protected httpClient: ApiService, protected store: Store) {
    this.userFormFactory = new SubclassedFormFactory<UserForm>(this.destroy, this.fb, httpClient, generateUser(emptyUser));
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
