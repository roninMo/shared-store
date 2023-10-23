import { FormControl, FormGroup } from '@angular/forms';
import { Address, AddressForm, generateAddress } from './Address';

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
  address: FormGroup<AddressForm>;
  phone: FormControl<string>;
  website: FormControl<string>;
  company: FormGroup<{
    name: FormControl<string>;
    catchPhrase: FormControl<string>;
    bs: FormControl<string>;
  }>;
}

export const Countries: string[] = ['United States', 'Mexico', 'Canada'];

export const generateUser = (data: Partial<User> = {}): User => {
  const user = {
    id: -1,
    name: 'Josh Foster',
    username: 'Josh_Foster',
    email: 'joshfoster@example.com',
    address: generateAddress(),
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