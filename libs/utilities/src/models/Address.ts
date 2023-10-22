import { FormControl } from '@angular/forms';

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
  geo: FormControl<string>;
}
