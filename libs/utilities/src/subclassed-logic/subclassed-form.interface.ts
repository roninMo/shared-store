/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControlOptions, FormGroup } from '@angular/forms';


export interface SubclassedForm<T> {
  // Create the form for this factory 
  buildForm(defaultValues: T | any,  controlValidations: AbstractControlOptions, groupValidations: AbstractControlOptions): FormGroup;

  get form(): FormGroup;
  
  // OnSave -> overrided control value accesor functions should determine when you should actually save information to the database if you're sending that information on key press
  onSave(): void;
  
  // Manual function for sending information to the backend (this is for ease of access and let's you do this in a hands free way to make things less complicated)
  saveData(): void;
  
  // update the values with backend validation
  updateAndRunBackendValidations(): void;
}