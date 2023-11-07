import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export function userRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('control: ', control); 

    return null;
  };
}
