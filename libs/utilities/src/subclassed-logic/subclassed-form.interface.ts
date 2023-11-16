/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControlOptions, FormGroup } from '@angular/forms';
import { SubclassedFormControl } from './subclassed-formControl';


export interface SubclassedForm<T> {
  // Create the form for this factory 
  buildForm(defaultValues: T | any,  controlValidations: AbstractControlOptions, groupValidations: AbstractControlOptions): FormGroup;

  get form(): FormGroup;
  
  // Manual function for sending information to the backend (this is for ease of access and let's you do this in a hands free way to make things less complicated)
  onSave(): void;
  
  // update the values with backend validation
  updateAndRunBackendValidations(control: SubclassedFormControl): void;
}