/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserActions } from '@shared-store/shared-store';
import { AddressPipe, User } from '@shared-store/utilities';
import { UserInformationComponent } from '../UserInformation/UserInformation.component';

@Component({
  selector: 'shared-store-remove-user-modal',
  standalone: true,
  templateUrl: './RemoveUserModal.component.html',
  styleUrls: ['./RemoveUserModal.component.scss'],
  imports: [CommonModule, UserInformationComponent, AddressPipe],
})
export class RemoveUserModalComponent {
  @Output() userRemoved: EventEmitter<boolean> = new EventEmitter();
  @Output() modalDeactivated: EventEmitter<void> = new EventEmitter();
  @Input() showModal = true;
  @Input() userToRemove!: number;
  @Input() userInformation!: User | null;
  validToHideModal: boolean;

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    // console.log('mouse event', this?.eRef?.nativeElement?.querySelector('.modal-component'));
    if(!this?.eRef?.nativeElement?.querySelector('.modal-component')?.contains(event.target)) {
      if (this.showModal && this.validToHideModal) {
        // console.log('hiding modal');
        this.handleHideModal();
      }
    }
  }

  constructor(private eRef: ElementRef, protected store: Store) {
    console.log('constructing the modal');
    this.validToHideModal = false;
    setTimeout(() => {
      this.validToHideModal = true;
    }, 250);
  }

  protected removeUser() {
    console.log('removing user!');
    this.store.dispatch(UserActions['[UserPage]DeleteUser']({ userId: this.userToRemove }));
    this.userRemoved.emit(true);
    this.handleHideModal();
  }

  protected onCloseModal() {
    this.handleHideModal();
  }

  protected handleHideModal(): void {
    this.showModal = false;
    setTimeout(() => {
      this.modalDeactivated.emit();
    }, 300);
  }
}
