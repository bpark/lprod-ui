import {BaseEntity, BaseEntityList} from './base-entity';

export class Shipment extends BaseEntity {
  name: string;
  date: Date;
  selectable: boolean;
  shipmentType: ShipmentType;
}

export interface ShipmentsList extends BaseEntityList<Shipment> {
}

export enum ShipmentType {
  glue = 'glue', hardener = 'hardener'
}
