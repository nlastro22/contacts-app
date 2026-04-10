import { AbstractControl } from '@angular/forms';

// export function hrPhoneValid1(control: AbstractControl) {
//   const number = control.value.trim('');

//   if (number.startsWith('+385')) {
//     const numberPart = number.slice(4);
//     console.log(numberPart);
//     const numberValid =
//       (numberPart[0] >= 1 && numberPart[0] <= 5) || numberPart[0] === 9
//         ? null
//         : { hrPhoneValid: true };
//     const lengthValid = numberPart.length >= 7 && numberPart.length <= 9;
//     return numberValid && lengthValid ? null : { hrPhoneValid: true };
//   } else if (number.startsWith('00385')) {
//     const numberPart = number.slice(5);
//     console.log(numberPart);
//     return (numberPart[0] >= 1 && numberPart[0] <= 5) ||
//       (numberPart[0] === 9 && numberPart.length >= 7 && numberPart.length <= 9)
//       ? null
//       : { hrPhoneValid: true };
//   } else if (number.startsWith('09')) {
//     const thirdNum = number[2];
//     const validNums = ['1', '2', '5', '7', '8', '9'];
//     return validNums.includes(thirdNum) && (number.length === 9 || number.length === 10)
//       ? null
//       : { hrPhoneValid: true };
//   }
//   return { hrPhoneValid: true };
// }

export function hrPhoneValid(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  const number = control.value.replace(/\s/g, '');
  let trimmedNumber = '';
  if (number.startsWith('+385')) {
    trimmedNumber = number.slice(4);
  } else if (number.startsWith('00385')) {
    trimmedNumber = number.slice(5);
  } else if (number.startsWith('0')) {
    trimmedNumber = number.slice(1);
  }

  if (trimmedNumber && /^\d+$/.test(trimmedNumber)) {
    const allValidNumberCodes = [
      '1',
      '20',
      '21',
      '22',
      '23',
      '31',
      '32',
      '33',
      '34',
      '35',
      '40',
      '42',
      '43',
      '44',
      '47',
      '48',
      '49',
      '51',
      '52',
      '53',
      '91',
      '92',
      '95',
      '97',
      '98',
      '99',
    ];
    const validNumber = allValidNumberCodes.some((code) => trimmedNumber.startsWith(code));
    const validLength = trimmedNumber.length >= 7 && trimmedNumber.length <= 9;

    return validNumber && validLength ? null : { hrPhoneValid: true };
  } else {
    return { hrPhoneValid: true };
  }
}
