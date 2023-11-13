/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  AsyncValidatorFn, 
  FormControl, 
  FormControlOptions, 
  FormControlState, 
  ValidatorFn 
} from "@angular/forms";
import { SubclassedFormFactory } from "./subclassed-form-factory";



export class SubclassedFormControl<TValue = any> extends FormControl {
  public formFactory: SubclassedFormFactory<any> | null = null;

  constructor(
      // formState and defaultValue will only be null if T is nullable
      formState: FormControlState<TValue>|TValue = null as unknown as TValue,
      public validatorOrOpts?: ValidatorFn|ValidatorFn[]|FormControlOptions|null,
      asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null,
      formFactory?: SubclassedFormFactory
  ) {
    super(formState, validatorOrOpts, asyncValidator);

    if (formFactory) {
      this.formFactory = formFactory;
    }
    // console.log('constructing form control: ', { formState, validatorOrOpts, asyncValidator });
  }

  override setValue(value: TValue, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}): void {
    super.setValue(value, options);
    console.log('value set: ', value);
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

  override updateValueAndValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
    super.updateValueAndValidity(opts);
    // console.log('validatorOrOpts', this.validatorOrOpts);
    // I think when angular merges the validator functions it removes console logging for some reason (even though I think it's just calculating each validation and merging the results together)
  }
}