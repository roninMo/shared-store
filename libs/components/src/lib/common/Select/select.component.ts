import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'shared-store-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() label = '';
  @Input() OmitBlankOption = false;
  @Input() options: string[] = ['None'];

  protected onValueChange(value: Event): void {
    this.control.setValue(value);
  }
}
