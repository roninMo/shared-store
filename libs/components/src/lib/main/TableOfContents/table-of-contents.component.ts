import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'shared-store-table-of-contents',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
})
export class TableOfContentsComponent {
  navLinks: { ref: string; description: string }[] = homeNavLinks;
  currentRoute = '';

  constructor(protected router: Router) {
    this.currentRoute = router.url;
    if (router.url == '/home') {
      this.navLinks = homeNavLinks;
    } else if (router.url == '/users') {
      this.navLinks = userNavLinks;
    }
  }
}

export const homeNavLinks = [
  {
    ref: 'introduction',
    description: 'Intro to the Nx Library',
  },
  {
    ref: 'user-information',
    description: 'User Information',
  },
  {
    ref: 'user-form',
    description: 'Add a User',
  },
  {
    ref: 'information',
    description: 'Applying Programming Patterns',
  },
];

export const userNavLinks = [
  {
    ref: 'get-user',
    description: 'User Information',
  },
  {
    ref: 'create-user',
    description: 'Add a User',
  },
  {
    ref: 'delete-user',
    description: 'Delete a user',
  },
  {
    ref: 'update-user',
    description: 'Update a user',
  },
];
