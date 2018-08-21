import { Injectable } from '@angular/core';
import {CalculationParameters, CalculationResult, GlulamDetail, GlulamDetailEntity, GlulamModel} from './glulam.model';

@Injectable()
export class GluelamCalculatorService {

  calculationResult: CalculationResult;

  constructor() {
    this.calculationResult = new CalculationResult();
  }

  calculate(laminationStrength: number) {
    this.calculationResult.lamination = Math.floor(CalculationParameters.maxPressHeight / laminationStrength);
  }

  calculateDetail(calculationInputData): GlulamDetailEntity {
    const inputDetailLength = calculationInputData.length;
    const inputDetailAmount = calculationInputData.amount;
    const inputDetailHeight = calculationInputData.height;

    const singleLamella = Math.round(inputDetailHeight * 10 / calculationInputData.laminationStrength);

    const totalLength = inputDetailLength * 100 + calculationInputData.additionalLength;
    const totalWidht = calculationInputData.width + 1;
    const singleSquare = totalLength * totalWidht * (singleLamella - 1);

    const outputDetailLamella = singleLamella * inputDetailAmount;
    const outputDetailSquare = singleSquare / 10000;
    const outputDetailTotalSquare = inputDetailAmount * singleSquare / 10000;

    const outputRowVolume = calculationInputData.width * inputDetailHeight * inputDetailLength * inputDetailAmount / 10000;

    this.calculationResult.lamination -= outputDetailLamella;  // TODO: error if negative

    const detail = new GlulamDetailEntity();

    detail.detailsLength = inputDetailLength;
    detail.detailsAmount = inputDetailAmount;
    detail.detailsHeight = inputDetailHeight;

    detail.detailsLamella = outputDetailLamella;
    detail.detailsSquare = GluelamCalculatorService.roundNumber(outputDetailSquare, 2);
    detail.detailsSquareTotal = GluelamCalculatorService.roundNumber(outputDetailTotalSquare, 2);
    detail.detailsVolume = GluelamCalculatorService.roundNumber(outputRowVolume, 4);

    return detail;
  }

  private static roundNumber(num, scale): number {
    if (!('' + num).includes('e')) {
      return +(Math.round(parseFloat(num + 'e+' + scale)) + 'e-' + scale);
    } else {
      const arr = ('' + num).split('e');
      let sig = '';
      if (+arr[1] + scale > 0) {
        sig = '+';
      }
      return +(Math.round(parseFloat(+arr[0] + 'e' + sig + (+arr[1] + scale))) + 'e-' + scale);
    }
  }
}
