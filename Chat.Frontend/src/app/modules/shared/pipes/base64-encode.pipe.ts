import { Pipe, PipeTransform } from '@angular/core';
import { Buffer } from 'buffer';

@Pipe({
  name: 'base64Encode',
})
export class Base64EncodePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return Buffer.from(value).toString('base64');
  }
}
