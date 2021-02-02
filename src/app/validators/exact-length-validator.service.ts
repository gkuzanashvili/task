import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class ExactLengthValidator {

  validate(length: number) {
    return (control: FormControl) => {
      if (control.value && control.value.toString().length !== length) {
        return {exactLengthErrorMessage: 'სიმბოლოების რაოდენობა უნდა იყოს:' + length};
      }
      return null;
    };
  }
}

