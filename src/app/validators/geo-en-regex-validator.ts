import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class GeoEnRegexValidator {
   geoRegex = /[ა-ჰ]/;
   enRegex = /[a-zA-Z]/;

  validate() {
    return (control: FormControl) => {
      if ( this.geoRegex.test(control.value) && this.enRegex.test(control.value)) {
        return {geoEnRegexErrorMessage: 'გთხოვთ გამოიყენოთ მხოლოდ ქართული ან მხოლოდ ინგლისური ანბანის სიმბოლოები'};
      }
      return null;
    };
  }

  // import {AbstractControl} from '@angular/forms';
//



// export function validateGeoOrEnInput(control: AbstractControl): { [key: string]: boolean } | null {
//   if (GeoRegex.test(control.value) && EnRegex.test(control.value)) {
//     return {invalidName: true};
//   }
//   return null;
// }
}
