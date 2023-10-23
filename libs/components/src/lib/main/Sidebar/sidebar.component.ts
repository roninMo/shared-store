import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-store-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(protected store: Store) {}

  printStore() {
    this.store
      .subscribe((data) => console.log('\n\nstore: ', data))
      .unsubscribe();
  }
}
