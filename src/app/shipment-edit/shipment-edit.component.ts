import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {Shipment, ShipmentType} from '../model/shipments.model';
import {ShipmentsService} from '../model/shipments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import {AlertStackModel} from '../alert-stack/alert-stack.model';

@Component({
  selector: 'app-shipment-edit',
  templateUrl: './shipment-edit.component.html',
  styleUrls: ['./shipment-edit.component.css']
})
export class ShipmentEditComponent implements OnInit, OnDestroy {

  sideNavModel: SideNavModel = {
    title: 'Lieferung',
    items: [{
      id: 1,
      link: '/shipments',
      queryParams: {
        type: 'glue'
      },
      label: 'Bearbeiten'
    }]
  };

  shipment: Shipment;
  shipmentType: ShipmentType;

  subscription: Subscription;

  alertStackModel: AlertStackModel;
  selectable: boolean;

  constructor(private shipmentService: ShipmentsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    const shipmentId = +this.route.snapshot.paramMap.get('shipmentId');
    const type = this.route.snapshot.queryParamMap.get('type');
    this.shipmentType = ShipmentType[type as keyof typeof ShipmentType];

    if (shipmentId === -1) {
      this.shipment = new Shipment();
      this.shipment.date = new Date();
      this.shipment.selectable = this.selectable = true;
      this.shipment.shipmentType = this.shipmentType;
    } else {
      this.subscription = this.shipmentService.getShipment(shipmentId).subscribe(result => {
        this.shipment = result;
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    if (this.shipment.id) {
      this.handleResponse(this.shipmentService.updateShipment(this.shipment));
    } else {
      this.handleResponse(this.shipmentService.createShipment(this.shipment));
    }
  }

  toggle() {
    this.selectable = !this.selectable;
  }

  private handleResponse(responseObservable: Observable<any>) {
    this.subscription.add(responseObservable.subscribe(result => {
        if (result.ok) {
          this.router.navigate(['/shipments'], {queryParams: {type: this.shipmentType}});
        } else {
          this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht gespeichert werden!');
        }
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht aktualisiert werden!');
      }));
  }
}
