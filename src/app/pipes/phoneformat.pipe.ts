import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phoneformat'
})

export class PhoneformatPipe implements PipeTransform {

  transform(phoneValue: number | string): string {
    const stringPhone = phoneValue + '';
    const phoneNumber  = parsePhoneNumber(stringPhone, 'US');
    const formatted =phoneNumber.formatNational();
    return formatted;
  }

}
