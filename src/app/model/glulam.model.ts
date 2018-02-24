export class GlulamDetail {
  id: number;
}

export class GlulamModel {
  coverLaminations: EnumType[] = [{id: 0, name: 'Keine'}, {id: 1, name: 'Eine'}, {id: 2, name: 'Zwei'}];
  pressTypes: EnumType[] = [{id: 0, name: '24m'}, {id: 1, name: '16m'}];
  woodTypes: EnumType[] = [{id: 0, name: 'Fichte'}, {id: 1, name: 'Lärche'}, {id: 2, name: 'Kiefer'}];
  pressData: PressData = new PressData();
}

export class PressData {
  date: Date = new Date();
  customer: string;
  coverLamination = 0;
  press = 0;
  woodType = 0;
}

export interface EnumType {
  id: number;
  name: string;
}
