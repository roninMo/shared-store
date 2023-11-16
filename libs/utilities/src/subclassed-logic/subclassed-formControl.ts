/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  AbstractControl,
  AsyncValidatorFn, 
  FormControl, 
  FormControlOptions, 
  FormControlState, 
  FormControlStatus, 
  ValidatorFn 
} from "@angular/forms";
import { SubclassedFormFactory } from "./subclassed-form-factory";
import { Subscription, debounceTime } from "rxjs";


export class SubclassedFormControl<TValue = any> extends FormControl {
  public formFactory: SubclassedFormFactory<any> | null = null;
  public keyName!: string; // This is a hacky way to get around angular complex multiple constructors and convoluted typing

  public apiSubscription!: Subscription;

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
      this.apiSubscription = this.valueChanges.pipe(debounceTime(250)).subscribe(value => {
        if (this.value && this.valid) {
          this.formFactory?.updateAndRunBackendValidations(this);
        }
      });
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
    // console.log('value set: ', value);
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

  override updateValueAndValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean;  }): void {
    super.updateValueAndValidity(opts);
    // console.log('validatorOrOpts', {opts, validator: this.validatorOrOpts});
  }
}
