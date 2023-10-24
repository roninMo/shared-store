import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-store-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() OnClicked: EventEmitter<any> = new EventEmitter();
  @Input() label = 'Submit Form';

  protected OnButtonClicked(): void {
    // console.log('button was clicked');
    this.OnClicked.emit();
  }
}
