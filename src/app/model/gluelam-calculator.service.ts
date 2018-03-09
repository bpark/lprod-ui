import { Injectable } from '@angular/core';
import {CalculationParameters, CalculationResult, GlulamDetail, GlulamModel} from './glulam.model';

@Injectable()
export class GluelamCalculatorService {

  calculationResult: CalculationResult;

  constructor() {
    this.calculationResult = new CalculationResult();
  }

  calculate(glulamModel: GlulamModel) {
    this.calculationResult.lamination = Math.floor(CalculationParameters.maxPressHeight / glulamModel.pressData.laminationStrength);
  }

  calculateDetail(detail: GlulamDetail, glulamModel: GlulamModel) {
    const singleLamella = Math.round(detail.height * 10 / glulamModel.pressData.laminationStrength);
    detail.lamella = singleLamella * detail.amount;
    /*detail.square = (this.gluelamData.width + this.calculationParameters.additionalWidth) *
      (detail.length + this.gluelamData.additionalLength) */
    this.calculationResult.lamination -= detail.lamella;  // TODO: error if negative
  }
}
