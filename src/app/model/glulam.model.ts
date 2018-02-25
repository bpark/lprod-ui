export class GlulamDetail {
  id: number;
}

export class GlulamModel {
  coverLaminations: EnumType[] = [{id: 0, name: 'Keine'}, {id: 1, name: 'Eine'}, {id: 2, name: 'Zwei'}];
  pressTypes: EnumType[] = [{id: 0, name: '24m'}, {id: 1, name: '16m'}];
  glueTypes: EnumType[] = [{id: 0, name: 'BASF 683 flüssig'}];
  hardenerTypes: EnumType[] = [{id: 0, name: 'BASF 683 flüssig'}];
  woodTypes: EnumType[] = [{id: 0, name: 'Fichte'}, {id: 1, name: 'Lärche'}, {id: 2, name: 'Kiefer'}];
  pressData: PressData = new PressData();
  glueData: GlueData = new GlueData();
  gluelamData: GluelamData = new GluelamData();
}

export class PressData {
  date: Date = new Date();
  customer: string;
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
