import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";
import { SubclassedFormGroup } from "../subclassed-logic";
import { UserForm } from "../models";


export function userRequiredValidator(): ValidatorFn {
  return (control: AbstractControl<UserForm>): ValidationErrors | null => {
    console.log('form group: ', control); 

    return null;
  };
}

export function controlValidation(): ValidatorFn {
  return (control: AbstractControl<UserForm>): ValidationErrors | null => {
    console.log('control: ', control);

    return null;
  }
}