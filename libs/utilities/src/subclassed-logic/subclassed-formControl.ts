/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  AsyncValidatorFn, 
  FormControl, 
  FormControlOptions, 
  FormControlState, 
  ValidatorFn 
} from "@angular/forms";



export class SubclassedFormControl<TValue = any> extends FormControl {
  
  constructor(
    // formState and defaultValue will only be null if T is nullable
    formState: FormControlState<TValue>|TValue = null as unknown as TValue,
    validatorOrOpts?: ValidatorFn|ValidatorFn[]|FormControlOptions|null,
    asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  override setValue(value: TValue, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}): void {
    super.setValue(value, options);
  }

  override patchValue(value: TValue, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}): void {
    super.patchValue(value, options);
  }

  override reset(
      formState: TValue|FormControlState<TValue> = this.defaultValue,
      options: {onlySelf?: boolean, emitEvent?: boolean} = {}): void {
    super.reset(formState, options);
  }
}