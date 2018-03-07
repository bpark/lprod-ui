export class Shipment {
  id: number;
  name: string;
  date: Date;
  selectable: boolean;
}

export interface ShipmentsList {
  totalCount: number;
  items: Shipment[];
}
