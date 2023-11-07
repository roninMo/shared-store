import { FormControl } from '@angular/forms';
import { Address, AddressForm, generateAddress } from './Address';
import { SublcassedFormGroup } from '../subclassed-logic/subclassed-formGroup';

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
  id: FormControl<number>;
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  address: SublcassedFormGroup<AddressForm>;
  phone: FormControl<string>;
  website: FormControl<string>;
  company: SublcassedFormGroup<{
    name: FormControl<string>;
    catchPhrase: FormControl<string>;
    bs: FormControl<string>;
  }>;
}

export const Countries: string[] = ['United States', 'Mexico', 'Canada'];

export const generateUser = (data: Partial<User> = {}, address: Partial<Address> = {}): User => {
  const user = {
    id: -1,
    name: '',
    username: '',
    email: '',
    address: generateAddress(address),
    phone: '317-908-2517',
    website: '',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: '',
      bs: '',
    },
  };

  return Object.assign(user, data);
};

export const emptyUser: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: '',
  },
};