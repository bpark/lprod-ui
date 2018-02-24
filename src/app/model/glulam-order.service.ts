import { Injectable } from '@angular/core';
import {GlulamModel} from './glulam.model';

@Injectable()
export class GlulamOrderService {

  glulamModel: GlulamModel;

  constructor() {
    this.glulamModel = new GlulamModel();
  }

}
