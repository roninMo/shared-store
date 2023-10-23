import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe, User, generateUser } from '@shared-store/utilities';

@Component({
  selector: 'shared-store-user-information',
  standalone: true,
  imports: [CommonModule, AddressPipe],
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {
  protected userInformation: User;

  @Input()
  public get user(): User {
    return this.userInformation;
  }
  public set user(user: User | null) {
    if (user) {
      this.userInformation = user;
    }
  }

  constructor() {
    this.userInformation = generateUser();
  }
}
