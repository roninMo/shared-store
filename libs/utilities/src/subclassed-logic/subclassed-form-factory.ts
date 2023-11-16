/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ɵElement } from "@angular/forms";
import { DestroyRef } from '@angular/core';
import { SubclassedForm } from "./subclassed-form.interface";
import { SubclassedFormGroup } from "./subclassed-formGroup";
import { SubclassedFormBuilder } from "./subclassed-formBuilder";
import { SubclassedFormControl } from "./subclassed-formControl";
import { ApiService } from "../api.service";
import { UserForm } from "../models";
import { jsonApiRoute_Base } from "../api-routes";

export interface FormFactoryControlOptions extends AbstractControlOptions {
  formFactory?: SubclassedFormFactory;
};


export interface UserValidationInformation { 
  key: string, 
  value: string 
};

export const defaultFormOptions: FormFactoryControlOptions = {
  validators: [],
  asyncValidators: [],
  updateOn: 'change',
};

export const updateFormOptions: FormFactoryControlOptions = {
  validators: [],
  asyncValidators: [],
  updateOn: 'change'
};

export type AbstractControlProperties<T> = { [K in keyof T]: AbstractControl<any, any>; };
// group<T extends {}>(controls: T, options?: AbstractControlOptions | null): FormGroup<{
//   [K in keyof T]: ɵElement<T[K], null>;
// }>;

export class SubclassedFormFactory<T extends AbstractControlProperties<T> = any> implements SubclassedForm<T> {
  protected _form: SubclassedFormGroup<T>;
  
  constructor(
      protected ref: DestroyRef, 
      protected fb: SubclassedFormBuilder,
      protected httpClient: ApiService,
      protected baseValues: any = {},
      protected controlValidations: AbstractControlOptions = defaultFormOptions,
      protected groupValidations: AbstractControlOptions = defaultFormOptions
    ) {
      this._form = this.buildForm(baseValues, controlValidations, groupValidations);
      
      this._form.valueChanges.pipe().subscribe(changes => {
        console.log('value changes: ', changes);
      })
  }

  public buildForm(defaultValues: T | any,  controlValidations: AbstractControlOptions, groupValidations: AbstractControlOptions): 
    SubclassedFormGroup<T> 
  {
    const formValues: any = {};
    for (const property in defaultValues) {
      if (typeof defaultValues[property] !== 'object') {
        const formControl: SubclassedFormControl = new SubclassedFormControl(defaultValues[property], controlValidations);
        formControl.formFactory = this;
        formControl.keyName = property;
        formValues[property] = formControl;
      } else {
        formValues[property] = this.buildForm(defaultValues[property], controlValidations, groupValidations);
      }
    }

    const abstractGroupOptions: FormFactoryControlOptions = {
      ...groupValidations,
      formFactory: this
    }
    const form: SubclassedFormGroup = this.fb.group<T>(formValues, abstractGroupOptions);
    return form;
  }

  public onSave(): void {
    console.log('saved the form values!', this?.form);
  }

  public updateAndRunBackendValidations(control: SubclassedFormControl): void {
    console.log('update backend validations: ', control);
  }

  // This is left generic because angular's form directives require it to be that way. Otherwise just store the value on creation
  public get form(): FormGroup<T> {
    return this?._form;
  }

  public get subclassedForm(): SubclassedFormGroup<T> {
    return this?._form;
  }

  public get formValid(): boolean {
    return this._form.valid;
  }
}