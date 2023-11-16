import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe, User, emptyUser, generateUser } from '@shared-store/utilities';
import { ButtonComponent } from '@shared-store/components';
import { RemoveUserModalComponent } from '../UpdatedUserModal/RemoveUserModal.component';

@Component({
  selector: 'shared-store-display-user-information',
  standalone: true,
  templateUrl: './UserInformation.component.html',
  styleUrls: ['./UserInformation.component.scss'],
  imports: [CommonModule, RemoveUserModalComponent, AddressPipe, ButtonComponent],
})
export class UserInformationComponent {
  @Input() user: User | null;
  showRemoveUserModal = false;

  constructor(protected changeDetectorRef: ChangeDetectorRef) {
    this.user = generateUser(emptyUser);
  }

  protected removeUser(): void {
    console.log('remove user');
    this.showRemoveUserModal = true;
  }

  protected modalDeactivated(): void {
    this.showRemoveUserModal = false;
  }
}
