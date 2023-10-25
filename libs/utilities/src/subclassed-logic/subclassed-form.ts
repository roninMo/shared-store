import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyRef } from '@angular/core';



export abstract class SubclassedFormFactory<T> {
  protected _form: FormGroup<any> = new FormGroup({});

  constructor(protected ref: DestroyRef, protected fb: FormBuilder) {}
}