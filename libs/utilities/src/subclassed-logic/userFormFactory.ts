/* eslint-disable @typescript-eslint/no-explicit-any */
import { DestroyRef } from "@angular/core";
import { AbstractControlOptions } from "@angular/forms";
import { ApiService } from "../api.service";
import { UserValidationInformation, AbstractControlProperties, defaultFormOptions, SubclassedFormFactory } from "./subclassed-form-factory";
import { SubclassedFormBuilder } from "./subclassed-formBuilder";
import { SubclassedFormGroup } from "./subclassed-formGroup";
import { SubclassedFormControl } from "./subclassed-formControl";
import { UserForm, jsonApiRoute_Base } from "..";
import { take } from "rxjs";



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
        .post<UserValidationInformation>(`${jsonApiRoute_Base}/user/${userId}/validatevalues`, validationInformation).pipe(take(1))
        .subscribe(value => {
          console.log('api response: ', value);
        });
    }
  }
}
