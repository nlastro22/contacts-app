import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string, format: 'intl' | 'local' = 'intl'): string {
    let trimmedValue = '';
    if (value.startsWith('+385')) {
      trimmedValue = value.slice(4);
    } else if (value.startsWith('00385')) {
      trimmedValue = value.slice(5);
    } else if (value.startsWith('0')) {
      trimmedValue = value.slice(1);
    }

    if (!trimmedValue) {
      return value;
    }
    trimmedValue = trimmedValue.replace(/\s/g, '');

    const part1 =
      format === 'intl'
        ? ['+385', trimmedValue.slice(0, 2)].join(' ')
        : ['0', trimmedValue.slice(0, 2)].join('');
    const part2 = trimmedValue.slice(2, 5);
    const part3 = trimmedValue.slice(5);
    const transformedValue = [part1, part2, part3].join(' ');
    return transformedValue;
  }
}
