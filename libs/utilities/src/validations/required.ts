import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";
import { SubclassedFormGroup } from "../subclassed-logic";
import { UserForm } from "../models";


export function userRequiredValidator(): ValidatorFn {
  return (control: AbstractControl<UserForm>): ValidationErrors | null => {
    console.log('\nform group: ', control); 

    return { groupValidation: { value: control.value } };
  };
}

export function controlValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('\ncontrol: ', control);

    return { controlValidation: { value: control.value } };
  }
}
