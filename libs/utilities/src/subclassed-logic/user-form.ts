import { AbstractControlOptions, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SubclassedFormFactory } from "./subclassed-form";
import { SubclassedForm } from "./subclassed-form.interface";
import { DestroyRef } from '@angular/core';
import { AddressForm, UserForm } from "../models";
import { SublcassedFormGroup } from "./subclassed-formGroup";



export class UserFormFactory<T> extends SubclassedFormFactory<UserForm> implements SubclassedForm<UserForm> {
  protected override _form: SublcassedFormGroup<UserForm>;

  constructor(protected override ref: DestroyRef, protected override fb: FormBuilder) {
    super(ref, fb);
    this._form = this.createForm();
  }
  
  public createForm(): SublcassedFormGroup {
    const formGroupOptions: AbstractControlOptions = {
      validators: [],
      asyncValidators: [],
      updateOn: 'change',
    };

    const addressGroup: SublcassedFormGroup<AddressForm> = this.fb.group<AddressForm>(
      {
        street: new FormControl(),
        suite: new FormControl(),
        city: new FormControl(),
        zipcode: new FormControl(),
        country: new FormControl(),
        geo: new FormGroup({
          lat: new FormControl(),
          lng: new FormControl(),
        }),
      },
      formGroupOptions
    );

    return this.fb.group<UserForm>(
      {
        id: new FormControl(),
        name: new FormControl(),
        username: new FormControl(),
        email: new FormControl(),
        address: addressGroup,
        phone: new FormControl(),
        website: new FormControl(),
        company: new FormGroup({
          name: new FormControl(),
          catchPhrase: new FormControl(),
          bs: new FormControl(),
        }),
      },
      formGroupOptions
    );
  }

  onSave(): void {
    console.log('saved the form values!', this?.form);
  }
  
  saveData(): void {
    console.log('saved the form values!', this?.form);
  }
  
  updateAndRunBackendValidations(): void {
    console.log("complicated business logic here (i don't know what to add to these subclassed functions");
  }

  public get form(): SublcassedFormGroup {
    return this?._form;
  }
}