import { Component, Input, OnInit } from '@angular/core';
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
  @Input() userForm!: FormGroup<UserForm>;
  countries: string[] = Countries;

  ngOnInit(): void {
    if (this.userForm) {
      console.log(
        'the user form component has been successfully initialized and the form has been passed down: ',
        this.userForm
      );
    }
  }

  protected onCreateUser(): void {
    console.log('created a user!', this.userForm);
  }
}
