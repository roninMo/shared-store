/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from "@angular/common";
import { Component, Input, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, AbstractControlOptions, Validators, FormControl } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { TabValue, TabsComponent } from "@shared-store/components";
import { selectSelectedUser, selectAllUserPosts, ApiService } from "@shared-store/shared-store";
import { AddressPipe, User, Post, UserFormFactory, UserForm, controlValidation, SubclassedFormBuilder, generateUser, emptyUser, SubclassedFormControl } from "@shared-store/utilities";
import { Observable, take } from "rxjs";
import { AddUserFormComponent } from "./AddUserForm/AddUserForm.component";
import { UpdateUserFormComponent } from "./UpdateUserForm/UpdateUserForm.component";
import { UserInformationComponent } from "./UserInformation/UserInformation.component";
import { RemoveUserModalComponent } from "./UpdatedUserModal/RemoveUserModal.component";


type UserTab = 'information' | 'update' | 'add';
const UserTabs: TabValue[] = [
  {
    displayName: 'Information',
    route: '/home/information',
    value: 'information'
  },
  {
    displayName: 'Add',
    route: '/home/add',
    value: 'add'
  },
  {
    displayName: 'Update',
    route: '/home/update',
    value: 'update'
  },
];

@Component({
  selector: 'shared-store-user-data',
  standalone: true,
  templateUrl: './UserData.component.html',
  styleUrls: ['./UserData.component.scss'],
  imports: [
    CommonModule,
    TabsComponent,
    RouterModule,
    ReactiveFormsModule,
    AddressPipe,
    UserInformationComponent,
    AddUserFormComponent,
    RemoveUserModalComponent,
    UpdateUserFormComponent
  ],
})
export class UserDataComponent {
  userTabs: TabValue[] = UserTabs;
  selectedTab = UserTabs[0].value;
  protected readonly destroy: DestroyRef = inject(DestroyRef);

  // Store
  user: Observable<User | null>;
  posts: Observable<Post[]>;
  currentPost = 1;

  // Form
  updateUserFormFactory: UserFormFactory;
  addUserFormFactory: UserFormFactory;
  userFormControlValidations: AbstractControlOptions = {
    validators: [Validators.required, controlValidation],
    asyncValidators: [],
    updateOn: 'change',
  };
  userFormGroupValidations: AbstractControlOptions = {
    validators: [],
    asyncValidators: [],
    updateOn: 'change',
  };

  activeUserId: FormControl<number>;


  constructor(protected store: Store, protected httpClient: ApiService, protected fb: SubclassedFormBuilder) {
    // Forms
    this.addUserFormFactory = new UserFormFactory(this.destroy, this.fb, httpClient, generateUser(emptyUser), this.userFormControlValidations, this.userFormGroupValidations);
    this.updateUserFormFactory = new UserFormFactory(this.destroy, this.fb, httpClient, generateUser(emptyUser), this.userFormControlValidations, this.userFormGroupValidations);
    this.updateUserFormFactory.form.controls.address.controls.geo.controls.lat.setValidators([]);
    this.updateUserFormFactory.form.controls.address.controls.geo.controls.lng.setValidators([]);
    this.addUserFormFactory.form.controls.address.controls.geo.controls.lat.setValidators([]);
    this.addUserFormFactory.form.controls.address.controls.geo.controls.lng.setValidators([]);
    this.addUserFormFactory.form.controls.website.setValidators([]);
    this.activeUserId = new FormControl(0, { nonNullable: true });

    // Observable information
    this.user = store.select(selectSelectedUser).pipe(takeUntilDestroyed());
    this.posts = store.select(selectAllUserPosts(this?.activeUserId?.value || 1)).pipe(takeUntilDestroyed());
  }

  protected clickedTab(tab: TabValue): void {
    this.selectedTab = tab.value;
    console.log('selected tab: ', tab);
    // route the nested component

    const selectedTab: UserTab  = tab.value as UserTab;
    if (selectedTab == 'update') {
      let user: User = generateUser(emptyUser);
      this.user.pipe(take(1)).subscribe(userData => userData ? user = userData : null);

      console.log('updating the user factory form', { information: user, form: this.updateUserFormFactory.form });
      this.updateUserFormFactory.form.setValue(user, { onlySelf: false, emitEvent: false });

      const formControl: SubclassedFormControl<string> = (this.updateUserFormFactory.subclassedForm.controls.name as SubclassedFormControl);
    }
  }
}
