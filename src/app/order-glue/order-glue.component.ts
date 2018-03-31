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
export class OrderGlueComponent implements OnInit {

  glulamModel: GlulamModel;

  glueShipments: Shipment[];
  hardenerShipments: Shipment[];

  constructor(private glulamOrderService: GlulamOrderService,
              private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;

    this.shipmentsService.getSelectableShipments(ShipmentType.glue).subscribe(shipments => {
      this.glueShipments = shipments.items;
    });

    this.shipmentsService.getSelectableShipments(ShipmentType.hardener).subscribe(shipments => {
      this.hardenerShipments = shipments.items;
    });
  }

}
