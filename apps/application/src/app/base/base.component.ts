import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SidebarComponent,
  TableOfContentsComponent,
} from '@shared-store/components';
import { RouterModule } from '@angular/router';
import { User } from '@shared-store/utilities';
import { Store } from '@ngrx/store';
import { UserActions } from '@shared-store/shared-store';

@Component({
  selector: 'shared-store-base',
  standalone: true,
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TableOfContentsComponent,
  ],
})
export class BaseComponent {
  userData: User | null = null;

  constructor(protected store: Store) {
    console.log('store: ', store);
    // http
    //   .get<User>('https://jsonplaceholder.typicode.com/users/1')
    //   .subscribe((data: User) => {
    //     this.userData = data;
    //     console.log('api response complete, user data: ', this.userData);
    //   });

    this.store.dispatch(UserActions['[UserPage]GetUser']({ userId: 1 }));
  }

  // User functions
  // protected initializeUserData(): void {}
}
