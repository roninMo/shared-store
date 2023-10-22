import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationComponent } from '@shared-store/components';
import { UserFormComponent } from './UserForm/user-form.component';

@Component({
  selector: 'shared-store-users-page',
  standalone: true,
  imports: [CommonModule, UserInformationComponent, UserFormComponent],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent {}
