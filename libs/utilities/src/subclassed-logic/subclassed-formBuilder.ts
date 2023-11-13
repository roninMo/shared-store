/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { SubclassedFormGroup } from './subclassed-formGroup';
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  ControlConfig,
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormControlState,
  FormGroup,
  ValidatorFn,
  ɵElement,
} from '@angular/forms';
import { SubclassedFormControl } from './subclassed-formControl';
import { FormFactoryControlOptions, SubclassedFormFactory } from './subclassed-form-factory';


@Injectable({providedIn: 'root'})
export class SubclassedFormBuilder extends FormBuilder {
  override group<T extends {}>(controls: T, options?: FormFactoryControlOptions | null): SubclassedFormGroup<{ [K in keyof T]: ɵElement<T[K], null> }>;
  override group(              controls: { [key: string]: any }, options: { [key: string]: any }): SubclassedFormGroup;
  override group(              controls: { [key: string]: any }, options: FormFactoryControlOptions | { [key: string]: any } | null = null
  ): SubclassedFormGroup {
    // code for handling validations of old form group options
    const reducedControls = this._reduceControls(controls);
    let newOptions: FormControlOptions = {};
    let formFactory: SubclassedFormFactory | undefined;
    if (isFormFactoryControlOptions(options)) {
      // `options` are `AbstractControlOptions`
      newOptions = options;
      formFactory = options.formFactory;
    } else if (options !== null) {
      // `options` are legacy form group options
      newOptions.validators = (options as any).validator;
      newOptions.asyncValidators = (options as any).asyncValidator;
    }

    // console.log('form group construction values: ', { reducedControls, newOptions });
    return new SubclassedFormGroup(reducedControls, newOptions, null, formFactory);
  }


  /** @deprecated Use `nonNullable` instead. */
  override control<T>(formState: T|FormControlState<T>, opts: FormControlOptions&{ initialValueIsDefault: true }): FormControl<T>;
  override control<T>(formState: T|FormControlState<T>, opts: FormControlOptions&{ nonNullable: true }): FormControl<T>;
  /** @deprecated When passing an `options` argument, the `asyncValidator` argument has no effect. */
  override control<T>(formState: T|FormControlState<T>, opts: FormControlOptions, asyncValidator: AsyncValidatorFn|AsyncValidatorFn[]): FormControl<T|null>;
  override control<T>(formState: T|FormControlState<T>, validatorOrOpts?: ValidatorFn|ValidatorFn[]|FormControlOptions|null, asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null): FormControl<T|null>;
  override control<T>(formState: T|FormControlState<T>,validatorOrOpts?: ValidatorFn|ValidatorFn[]|FormControlOptions|null,asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null): FormControl {
    let newOptions: FormControlOptions = {};

    // If the second argument is options, then they are copied.
    if (isAbstractControlOptions(validatorOrOpts)) {
      newOptions = validatorOrOpts;

    } else {
      // If the other arguments are validators, they are copied into an options object.
      newOptions.validators = validatorOrOpts;
      newOptions.asyncValidators = asyncValidator;
    }

    return new SubclassedFormControl<T>(formState, {...newOptions, nonNullable: true});
  }


  // Helper functions copied to figure out what's going on here
  /** @internal */
  _reduceControls<T>(controls: {
    [k: string]:
      | T
      | ControlConfig<T>
      | FormControlState<T>
      | AbstractControl<T>;
  }): { [key: string]: AbstractControl } {
    const createdControls: { [key: string]: AbstractControl } = {};
    Object.keys(controls).forEach((controlName) => {
      createdControls[controlName] = this._createControl(controls[controlName]);
    });
    return createdControls;
  }


  /** @internal */
  _createControl<T>(
    controls: | T | FormControlState<T> | ControlConfig<T> | FormControl<T> | AbstractControl<T>
  ): FormControl<T> | FormControl<T | null> | AbstractControl<T> {
    if (controls instanceof FormControl) {
      return controls as FormControl<T>;

    } else if (controls instanceof AbstractControl) {  // A control; just return it
      return controls;

    } else if (Array.isArray(controls)) {  // ControlConfig Tuple
      const value: T|FormControlState<T> = controls[0];
      const validator: ValidatorFn|ValidatorFn[]|null = controls.length > 1 ? controls[1]! : null;
      const asyncValidator: AsyncValidatorFn|AsyncValidatorFn[]|null =
          controls.length > 2 ? controls[2]! : null;
      return this.control<T>(value, validator, asyncValidator);

    } else {  // T or FormControlState<T>
      return this.control<T>(controls);
    }
  }
}


function isAbstractControlOptions(options: AbstractControlOptions | { [key: string]: any } | null | undefined): options is AbstractControlOptions {
  return (
    !!options &&
    ((options as AbstractControlOptions).asyncValidators !== undefined ||
      (options as AbstractControlOptions).validators !== undefined ||
      (options as AbstractControlOptions).updateOn !== undefined)
  );
}

function isFormFactoryControlOptions(options: FormFactoryControlOptions | { [key: string]: any } | null | undefined): options is FormFactoryControlOptions {
  return (
    !!options &&
    ((options as FormFactoryControlOptions).asyncValidators !== undefined ||
      (options as FormFactoryControlOptions).validators !== undefined ||
      (options as FormFactoryControlOptions).updateOn !== undefined)
  );
}