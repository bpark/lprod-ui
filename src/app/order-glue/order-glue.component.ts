import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GluelamTypes, GlulamModel} from '../model/glulam.model';
import {ShipmentsService} from '../model/shipments.service';
import {Shipment, ShipmentType} from '../model/shipments.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-order-glue',
  templateUrl: './order-glue.component.html',
  styleUrls: ['./order-glue.component.css']
})
export class OrderGlueComponent implements OnInit, OnDestroy {

  glulamModel: GlulamModel;
  gluelamTypes = GluelamTypes.getInstance();

  glueShipments: Shipment[];
  hardenerShipments: Shipment[];

  dataSubscription: Subscription;

  constructor(private glulamOrderService: GlulamOrderService,
              private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
    this.dataSubscription = this.shipmentsService.getSelectableShipments().subscribe(shipments => {
      this.glueShipments = shipments.items.filter(shipment => shipment.shipmentType === ShipmentType.glue);
      console.log('glueShipments=', this.glueShipments);
      this.hardenerShipments = shipments.items.filter(shipment => shipment.shipmentType === ShipmentType.hardener);
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
