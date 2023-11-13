/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ɵElement } from "@angular/forms";
import { DestroyRef } from '@angular/core';
import { SubclassedForm } from "./subclassed-form.interface";
import { SubclassedFormGroup } from "./subclassed-formGroup";
import { SubclassedFormBuilder } from "./subclassed-formBuilder";
import { SubclassedFormControl } from "./subclassed-formControl";

export interface FormFactoryControlOptions extends AbstractControlOptions {
  formFactory?: SubclassedFormFactory;
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

type AbstractControlProperties<T> = { [K in keyof T]: AbstractControl<any, any>; };
// group<T extends {}>(controls: T, options?: AbstractControlOptions | null): FormGroup<{
//   [K in keyof T]: ɵElement<T[K], null>;
// }>;

export class SubclassedFormFactory<T extends AbstractControlProperties<T> = any> implements SubclassedForm<T> {
  protected _form: SubclassedFormGroup<T>;
  
  constructor(
      protected ref: DestroyRef, 
      protected fb: SubclassedFormBuilder,
      protected baseValues: any = {},
      protected controlValidations: AbstractControlOptions = defaultFormOptions,
      protected groupValidations: AbstractControlOptions = defaultFormOptions
    ) {
      this._form = this.buildForm(baseValues, controlValidations, groupValidations);
  }

  buildForm(defaultValues: T | any,  controlValidations: AbstractControlOptions = {}, groupValidations: AbstractControlOptions = {}): 
    SubclassedFormGroup<T> 
  {
    const formValues: any = {};
    for (const property in defaultValues) {
      if (typeof defaultValues[property] !== 'object') {
        const formControl: SubclassedFormControl = new SubclassedFormControl(defaultValues[property], controlValidations);
        formControl.formFactory = this;
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

  onSave(): void {
    console.log('saved the form values!', this?.form);
  }
  
  saveData(): void {
    console.log('saved the form values!', this?.form);
  }
  
  updateAndRunBackendValidations(): void {
    console.log("complicated business logic here (i don't know what to add to these subclassed functions");
  }

  public get form(): SubclassedFormGroup {
    return this?._form;
  }
}