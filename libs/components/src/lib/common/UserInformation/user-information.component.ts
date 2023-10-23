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
  @Input() user: User;

  constructor() {
    this.user = generateUser();
  }
}
