/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  AbstractControl, 
  ɵTypedOrUntyped, 
  ɵFormGroupValue, 
  ɵFormGroupRawValue, 
  AbstractControlOptions, 
  ValidatorFn, 
  AsyncValidatorFn, 
  FormGroup,
  ɵOptionalKeys
} from "@angular/forms";




export class SubclassedFormGroup<TControl extends { [K in keyof TControl]: AbstractControl<any>; } = any> extends FormGroup<TControl> {
  /**
   * Creates a new `FormGroup` instance.
   *
   * @param controls A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains validation functions
   * and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator functions
   *
   */
  constructor(
    controls: TControl, 
    validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null, 
    asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
    this.controls = controls;
    
    // Handle initializing the state and other values you want attached here, whether this is observables for custom validation or other things
  }

  override updateValueAndValidity(opts?: { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined; } | undefined): void {
    super.updateValueAndValidity(opts);
  }

  override setValue(value: ɵFormGroupRawValue<TControl>, options: { onlySelf?: boolean, emitEvent?: boolean } = {}): void {
    super.setValue(value, options);
  }

  override patchValue(value: ɵTypedOrUntyped<TControl, ɵFormGroupValue<TControl>, any>, options?: Object | undefined): void {
    super.patchValue(value, options);
  }


  override reset(value?: ɵTypedOrUntyped<TControl, ɵFormGroupValue<TControl>, any> | undefined, options?: Object | undefined): void {
    super.reset(value, options);
  }


  override addControl(this: FormGroup<{[key: string]: AbstractControl<any>}>, name: string, control: AbstractControl, options?: {emitEvent?: boolean}): void;
  override addControl<K extends string&keyof TControl>(name: K, control: Required<TControl>[K], options?: { emitEvent?: boolean }): void;
  override addControl<K extends string&keyof TControl>(name: K, control: Required<TControl>[K], options: { emitEvent?: boolean } = {}): void {
    // this.registerControl(name, control);
    // this.updateValueAndValidity({emitEvent: options.emitEvent});
    // this._onCollectionChange();
    super.addControl(name, control, options);
  }


  override removeControl(this: FormGroup<{[key: string]: AbstractControl<any>}>, name: string, options?: { emitEvent?: boolean;}): void;
  override removeControl<S extends string>(name: ɵOptionalKeys<TControl>&S, options?: { emitEvent?: boolean;}): void;
  override removeControl(name: string, options: {emitEvent?: boolean;} = {}): void {
    super.removeControl(name, options);
  }


}
