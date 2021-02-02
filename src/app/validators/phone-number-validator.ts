import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class PhoneNumberValidator {

  validate() {
    return (control: FormControl) => {
      if (control.value && control.value.charAt(0) !== '5' && control.value.toString().length !== 9) {
        return {phoneNumberErrorMessage: 'ტელეფონის ნომერი უნდა იწყებოდეს 5-ით და  უნდა იყოს 9  სიმბოლო'};
      }
      return null;
    };
  }
}
