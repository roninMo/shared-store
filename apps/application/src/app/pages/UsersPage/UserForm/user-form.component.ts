import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Countries, UserForm } from '@shared-store/utilities';
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from '@shared-store/components';

@Component({
  selector: 'shared-store-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [
    CommonModule,
    SelectComponent,
    TextareaComponent,
    InputComponent,
    ButtonComponent,
  ],
})
export class UserFormComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  @Input() userForm!: FormGroup<UserForm>;
  @Input() submitFormLabel = 'Submit Form';
  countries: string[] = Countries;

  ngOnInit(): void {
    if (this.userForm) {
      // console.log(
      //   'the user form component has been successfully initialized and the form has been passed down: ',
      //   this.userForm
      // );
    }
  }

  protected onFormSubmitted(): void {
    // console.log('submitted the form: ', this.userForm);
    this.formSubmitted.emit();
  }
}
