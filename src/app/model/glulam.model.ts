export class CalculationParameters {
  maxPressHeight = 2100; // mm
  additionalWidth = 1; // cm
  additionalLength = 1; // cm
}

export class CalculationResult {
  lamination: number;
}

export class GlulamDetail {
  id: number;
  amount = 0;
  height = 0;
  length = 0;
  lamella = 0;
  square = 0;
  squareTotal = 0;
  volume = 0;
}

export interface GluelamList {
  totalCount: number;
  items: Gluelam[];
}

export interface Gluelam {
  id: number;
  date: Date;
  customer: string;
  elementNumber: string;
}

export class GlulamModel {
  quality: EnumType[] = [{id: 0, name: 'GL24h'}, {id: 1, name: 'GL28h'}, {id: 2, name: 'GL28c'}];
  pressTypes: EnumType[] = [{id: 0, name: '24m'}, {id: 1, name: '16m'}];
  glueTypes: EnumType[] = [{id: 0, name: 'BASF 683 flüssig'}];
  hardenerTypes: EnumType[] = [{id: 0, name: 'BASF 683 flüssig'}];
  woodTypes: EnumType[] = [{id: 0, name: 'Fichte'}, {id: 1, name: 'Lärche'}, {id: 2, name: 'Kiefer'}];
  pressData: PressData = new PressData();
  glueData: GlueData = new GlueData();
  gluelamData: GluelamData = new GluelamData();
  gluelamDetail: GlulamDetail[] = [];

  calculationResult: CalculationResult = new CalculationResult();
  calculationParameters: CalculationParameters = new CalculationParameters();

  calculate() {
    this.calculationResult.lamination = Math.floor(this.calculationParameters.maxPressHeight / this.pressData.laminationStrength);
  }

  calculateDetail(detail: GlulamDetail) {
    const singleLamella = Math.round(detail.height * 10 / this.pressData.laminationStrength);
    detail.lamella = singleLamella * detail.amount;
    /*detail.square = (this.gluelamData.width + this.calculationParameters.additionalWidth) *
      (detail.length + this.gluelamData.additionalLenght) */
    this.calculationResult.lamination -= detail.lamella;  // TODO: error if negative
  }
}

export class PressData {
  date: Date = new Date();
  customer: string;
  elementNumber: string;
  laminationStrength = 33.6;
  coverLamination = 0;
  press = 0;
  woodType = 0;
}

export class GlueData {
  glueType = 0;
  glueDeliveryDate: Date = new Date();
  hardenerType = 0;
  hardenerDeliveryDate: Date = new Date();
}

export class GluelamData {
  width = 8.5;
  additionalLenght = 10.00;
  glueAmount = 380.00;
  hardenerPercentage = 20.00;
}

export interface EnumType {
  id: number;
  name: string;
}
