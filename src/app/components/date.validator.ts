import {AbstractControl, FormControl} from '@angular/forms';
import {isValidDate} from 'ngx-bootstrap/timepicker/timepicker.utils';

export class DateValidator {

  static ptDate(control: AbstractControl): { [key: string]: boolean | null } {

    if (!isValidDate(control.value)) {
      return {'ptDate': true};
    }

    return null;
  }

}
