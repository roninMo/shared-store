import { FormControl, } from '@angular/forms';
import { SubclassedFormGroup } from '../subclassed-logic/subclassed-formGroup';

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface AddressForm {
  street: FormControl<string>;
  suite: FormControl<string>;
  city: FormControl<string>;
  zipcode: FormControl<string>;
  country: FormControl<string>;
  geo: SubclassedFormGroup<{ lat: FormControl<string>; lng: FormControl<string>; }>;
}

export const generateAddress = (data: Partial<Address> = {}): Address => {
  const address = {
    street: '3441 Kulas Light',
    suite: 'Apt. 556 ',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '',
      lng: '',
    },
  };

  return Object.assign(address, data);
};


export const emptyAddress: Address = {
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  geo: {
    lat: '',
    lng: '',
  }
};