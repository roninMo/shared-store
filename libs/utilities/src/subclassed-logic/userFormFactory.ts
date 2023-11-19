/* eslint-disable @typescript-eslint/no-explicit-any */
import { DestroyRef } from "@angular/core";
import { AbstractControlOptions } from "@angular/forms";
import { ApiService } from "../api.service";
import { UserValidationInformation, defaultFormOptions, SubclassedFormFactory } from "./subclassed-form-factory";
import { UserForm, Writable, expressApiRoute_Base } from "..";
import { SubclassedFormBuilder } from "./subclassed-formBuilder";
import { SubclassedFormGroup } from "./subclassed-formGroup";
import { SubclassedFormControl } from "./subclassed-formControl";
import { take } from "rxjs";

export interface UserValidationResponse {
  validation: string;
  status: number;
}

export class UserFormFactory extends SubclassedFormFactory<UserForm> {
  protected override _form!: SubclassedFormGroup<UserForm>;

  constructor(
      protected override ref: DestroyRef, 
      protected override fb: SubclassedFormBuilder,
      protected override httpClient: ApiService,
      protected override baseValues: any = {},
      protected override controlValidations: AbstractControlOptions = defaultFormOptions,
      protected override groupValidations: AbstractControlOptions = defaultFormOptions
    ) {
      super(ref, fb, httpClient, baseValues, controlValidations, groupValidations); 
      // this._form = this.buildForm(baseValues, controlValidations, groupValidations);
  }


  override updateAndRunBackendValidations(control: SubclassedFormControl<UserForm>): void {
    console.log('user form factory::updateAndRunBackendValidations: ', control);
    if (control.value && control.keyName) {
      const userId = this._form.value.id;
      const validationInformation: UserValidationInformation = {
        value: control.value,
        key: control.keyName
      };

      this.httpClient
        .post<UserValidationResponse>(`${expressApiRoute_Base}/users/${userId}/validatevalues`, validationInformation).pipe(take(1))
        .subscribe((value: UserValidationResponse) => {
          const editableControl = control as Writable<SubclassedFormControl>;
          // console.log('api response: ', value);
          if (value.validation) {
            editableControl.errors = {
              ...control.errors,
              serverValidation: value.validation
            };
          } else if (editableControl.errors && editableControl.errors['serverValidation']) {
            delete editableControl.errors['serverValidation'];
          }
        });
    }
  }
}
