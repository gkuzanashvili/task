import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class GeoEnRegexValidator {
  geoRegex = /[ა-ჰ]/;
  enRegex = /[a-zA-Z]/;

  validate() {
    return (control: FormControl) => {
      if (this.geoRegex.test(control.value) && this.enRegex.test(control.value)) {
        return {geoEnRegexErrorMessage: 'გთხოვთ გამოიყენოთ მხოლოდ ქართული ან მხოლოდ ინგლისური ანბანის სიმბოლოები'};
      }
      return null;
    };
  }
}
