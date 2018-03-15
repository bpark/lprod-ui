export class Shipment {
  id: number;
  name: string;
  date: Date;
  selectable: boolean;
  shipmentType: ShipmentType;
}

export interface ShipmentsList {
  totalCount: number;
  items: Shipment[];
}

export enum ShipmentType {
  glue = 'glue', hardener = 'hardener'
}
