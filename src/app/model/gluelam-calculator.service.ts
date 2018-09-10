import {Injectable} from '@angular/core';
import {CalculationParameters, GluelamEntity, GlulamDetailEntity} from './glulam.model';

@Injectable()
export class GluelamCalculatorService {

  constructor() {
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

  calculate(gluelamEntity: GluelamEntity) {
    gluelamEntity.result.lamination = Math.floor(CalculationParameters.maxPressHeight / gluelamEntity.laminationStrength);

    gluelamEntity.result.cotterlength = 0;
    gluelamEntity.details.forEach(detail => {
      this.calculateDetail(gluelamEntity, detail);

      gluelamEntity.result.lamination  -= detail.detailsLamella;  // TODO: error if negative
      gluelamEntity.result.cotterlength = (gluelamEntity.result.cotterlength +
         (detail.detailsLength + gluelamEntity.additionalLength / 100)) * detail.detailsLamella;
    });

    console.log('calculated: ', gluelamEntity);
  }

  private calculateDetail(gluelamEntity: GluelamEntity, gluelamDetailEntity: GlulamDetailEntity) {
    const inputDetailLength = gluelamDetailEntity.detailsLength;
    const inputDetailAmount = gluelamDetailEntity.detailsAmount;
    const inputDetailHeight = gluelamDetailEntity.detailsHeight;

    const singleLamella = Math.round(inputDetailHeight * 10 / gluelamEntity.laminationStrength);

    const totalLength = inputDetailLength * 100 + gluelamEntity.additionalLength;
    const totalWidht = gluelamEntity.width + 1;
    const singleSquare = totalLength * totalWidht * (singleLamella - 1);

    const outputDetailLamella = singleLamella * inputDetailAmount;
    const outputDetailSquare = singleSquare / 10000;
    const outputDetailTotalSquare = inputDetailAmount * singleSquare / 10000;

    const outputRowVolume = gluelamEntity.width * inputDetailHeight * inputDetailLength * inputDetailAmount / 10000;

    gluelamDetailEntity.detailsLamella = outputDetailLamella;
    gluelamDetailEntity.detailsSquare = GluelamCalculatorService.roundNumber(outputDetailSquare, 2);
    gluelamDetailEntity.detailsSquareTotal = GluelamCalculatorService.roundNumber(outputDetailTotalSquare, 2);
    gluelamDetailEntity.detailsVolume = GluelamCalculatorService.roundNumber(outputRowVolume, 4);

  }

}
