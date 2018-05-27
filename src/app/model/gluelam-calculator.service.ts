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
    const inputDetailLength = detail.length; // 15
    const inputDetailAmount = detail.amount; // 2
    const inputDetailHeight = detail.height; // 10

    const singleLamella = Math.round(inputDetailHeight * 10 / glulamModel.pressData.laminationStrength);
    //  10x10 / 33.6 = 2,97

    const totalLength = inputDetailLength + glulamModel.gluelamData.additionalLength; // 15?? + 10 cm
    console.log('inputDetailLength: ' + inputDetailLength);
    console.log('addLen: ' + glulamModel.gluelamData.additionalLength);
    console.log('totalLength: ' + totalLength);
    const totalWidht = glulamModel.gluelamData.width; // 8.5
    const singleSquare = totalLength * totalWidht * (singleLamella - 1); // 25 * 8.5 * (3-1)
    console.log('single square: ' + singleSquare);

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
