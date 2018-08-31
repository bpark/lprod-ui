import {AbstractControl} from '@angular/forms';
import {isValidDate} from 'ngx-bootstrap/timepicker/timepicker.utils';

export class LbValidators {

  static ptDate(control: AbstractControl): { [key: string]: boolean | null } {

    if (!isValidDate(control.value)) {
      return {'ptDate': true};
    }

    return null;
  }

  static numeric(control: AbstractControl): { [key: string]: boolean | null } {

    if (isNaN(control.value)) {
      return {'numeric': true};
    }

    return null;
  }

}
