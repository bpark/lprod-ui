export abstract class BaseEntity {
  id: number;
}

export class GluelamBaseEntity extends BaseEntity {
  date: Date;
  customer: string;
  elementNumber: string;
}

export class GluelamEntity extends GluelamBaseEntity {

  laminationStrength = 33.6;
  quality = 0;
  press = 0;
  woodType = 0;
  glueTypeId: number;
  hardenerTypeId: number;
  width = 8.5;
  additionalLength = 10.00;
  glueAmount = 380.00;
  hardenerPercentage = 20.00;

}

export class GlulamDetailEntity extends BaseEntity {
  amount = 0;
  height = 0;
  length = 0;
  lamella = 0;
  square = 0;
  squareTotal = 0;
  volume = 0;
  show = true;
}

export interface EnumType {
  id: number;
  name: string;
}

export class GluelamTypes {

  private static instance = new GluelamTypes();

  quality: EnumType[] = [{id: 0, name: 'GL24h'}, {id: 1, name: 'GL28h'}, {id: 2, name: 'GL28c'}];
  pressTypes: EnumType[] = [{id: 0, name: '24m'}, {id: 1, name: '16m'}];
  glueTypes: EnumType[] = [{id: 0, name: 'BASF 683 flüssig'}];
  hardenerTypes: EnumType[] = [{id: 0, name: 'BASF 683 flüssig'}];
  woodTypes: EnumType[] = [{id: 0, name: 'Fichte'}, {id: 1, name: 'Lärche'}, {id: 2, name: 'Kiefer'}];

  public static getInstance(): GluelamTypes {
    return GluelamTypes.instance;
  }
}

export class CalculationParameters {
  static maxPressHeight = 2100; // mm
  static additionalWidth = 1; // cm
  static additionalLength = 1; // cm
}

export class CalculationResult {
  lamination: number;
}

export class GlulamDetail extends BaseEntity {
  amount = 0;
  height = 0;
  length = 0;
  lamella = 0;
  square = 0;
  squareTotal = 0;
  volume = 0;
  show = true;
}

export interface GluelamList {
  totalCount: number;
  items: Gluelam[];
}

export interface Gluelam extends BaseEntity {
  id: number;
  date: Date;
  customer: string;
  elementNumber: string;
}

export class GlulamModel extends BaseEntity {
  pressData: PressData = new PressData();
  glueData: GlueData = new GlueData();
  gluelamData: GluelamData = new GluelamData();
  gluelamDetail: GlulamDetail[] = [];
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
  glueTypeId: number;
  hardenerTypeId: number;
}

export class GluelamData {
  width = 8.5;
  additionalLength = 10.00;
  glueAmount = 380.00;
  hardenerPercentage = 20.00;
}

