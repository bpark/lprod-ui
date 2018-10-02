import {BaseEntity} from './base-entity';

export class GluelamBaseEntity extends BaseEntity {
  date: Date;
  customer: string;
  elementNumber: string;
}

export interface GluelamBaseEntityList {
  totalCount: number;
  items: GluelamBaseEntity[];
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
  details: GlulamDetailEntity[] = [];
  result: GlulamResultEntity = new GlulamResultEntity();
}

export class GlulamDetailEntity extends BaseEntity {
  detailsAmount = 0;
  detailsHeight = 0;
  detailsLength = 0;
  detailsLamella = 0;
  detailsSquare = 0;
  detailsSquareTotal = 0;
  detailsVolume = 0;
}

export class GlulamResultEntity extends BaseEntity {
  lamination = 0;
  cotterlength = 0;
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
  spreads: number[] = [8.5, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 22.0, 24.0, 26.0, 28.0];

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

// ---- old

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
