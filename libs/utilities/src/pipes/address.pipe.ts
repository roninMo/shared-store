import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(address: Address, ...args: unknown[]): unknown {
    if (!address || !address?.street || !address?.city || !address?.zipcode) {
      return '';
    }

    return `${address.street}, ${address.city}, ${address.zipcode}`;
  }
}
