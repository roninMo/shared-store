import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface TabValue {
  displayName: string;
  route: string;
  value: string;
}

@Component({
  selector: 'shared-store-tabs',
  standalone: true,
  templateUrl: './Tabs.component.html',
  styleUrls: ['./Tabs.component.scss'],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class TabsComponent {
  @Input() 
  public set tabs(value: TabValue[]) {
    if (this.tabValues) {
      this.tabValues = value;
      this.selectedTab = value?.[0]?.value;
    }
  } 

  @Output() tabPressed: EventEmitter<TabValue> = new EventEmitter();

  selectedTab = '';
  tabValues: TabValue[] = [];

  constructor() {
    console.log('tabs: ', this.tabs);
  }

  protected clickedTab(tab: TabValue): void {
    this.tabPressed.emit(tab);
    this.selectedTab = tab.value;
  }
}
