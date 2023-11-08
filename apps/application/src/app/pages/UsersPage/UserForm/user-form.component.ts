/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countries, SubclassedFormFactory, SubclassedFormGroup, UserForm } from '@shared-store/utilities';
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from '@shared-store/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule,
    ReactiveFormsModule
  ],
})
export class UserFormComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  @Input() userFormFactory!: SubclassedFormFactory<UserForm>;
  @Input() userForm!: SubclassedFormGroup<UserForm>;
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

  get UserGroup(): SubclassedFormGroup<any> {
    return this.userForm;
  }
  
  get AddressGroup(): SubclassedFormGroup<any> {
    return this.userForm.controls.address;
  }
  
  get GeoGroup(): SubclassedFormGroup<any> {
    return this.userForm.controls.address.controls.geo;
  }
  
  get CompanyGroup(): SubclassedFormGroup<any> {
    return this.userForm.controls.company;
  }
}
