import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-store-user-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {}
