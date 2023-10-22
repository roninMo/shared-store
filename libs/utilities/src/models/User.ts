import { FormControl, FormGroup } from '@angular/forms';
import { Address, AddressForm } from './Address';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserForm {
  // id: FormControl<number>; // Not necessary
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  address: FormGroup<AddressForm>;
}

export const Countries: string[] = ['United States', 'Mexico', 'Canada'];
