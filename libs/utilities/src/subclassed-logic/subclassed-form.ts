import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyRef } from '@angular/core';
import { SublcassedFormGroup } from './subclassed-formGroup';



export abstract class SubclassedFormFactory<T> {
  protected _form: SublcassedFormGroup<any> = new FormGroup({});

  constructor(protected ref: DestroyRef, protected fb: FormBuilder) {}
}