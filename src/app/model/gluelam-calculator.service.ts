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
    const inputDetailLength = detail.length;
    const inputDetailAmount = detail.amount;
    const inputDetailHeight = detail.height;

    const singleLamella = Math.round(inputDetailHeight * 10 / glulamModel.pressData.laminationStrength);

    const totalLength = inputDetailLength + glulamModel.gluelamData.additionalLength;
    const totalWidht = glulamModel.gluelamData.width;
    const singleSquare = totalLength * totalWidht * (singleLamella - 1);

    const outputDetailLamella = singleLamella * inputDetailAmount;
    const outputDetailSquare = singleSquare * inputDetailAmount;
    const outputDetailTotalSquare = outputDetailLamella + singleSquare;

    const outputRowVolume = glulamModel.gluelamData.width * inputDetailHeight * inputDetailLength * inputDetailAmount;

    this.calculationResult.lamination -= outputDetailLamella;  // TODO: error if negative

    detail.lamella = outputDetailLamella;
    detail.square = outputDetailSquare;
    detail.squareTotal = outputDetailTotalSquare;
    detail.volume = outputRowVolume;
  }
}
