import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-store-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() OnClick?: () => void;
  @Input() label = 'Submit Form';

  protected OnButtonClick(): void {
    console.log('button was clicked');

    if (this.OnClick) {
      this.OnClick();
    }
  }
}
