import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {Shipment, ShipmentType} from '../model/shipments.model';
import {ShipmentsService} from '../model/shipments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {AlertStackModel} from '../alert-stack/alert-stack.model';

@Component({
  selector: 'app-shipment-edit',
  templateUrl: './shipment-edit.component.html',
  styleUrls: ['./shipment-edit.component.css']
})
export class ShipmentEditComponent implements OnInit, OnDestroy {

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2030, 9, 15);

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
  requestSubscription: Subscription;

  alertStackModel: AlertStackModel;

  constructor(private shipmentService: ShipmentsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    const allParams = combineLatest(this.route.params, this.route.queryParams,
      (params, qparams) => ({ params, qparams }));

    this.subscription = allParams.subscribe(params => {
      const shipmentId = +params.params['shipmentId'];
      this.shipmentType = params.qparams['type'];
      if (shipmentId === -1) {
        this.shipment = new Shipment();
        this.shipment.date = new Date();
        this.shipment.selectable = true;
      } else {
        this.requestSubscription = this.shipmentService.getCachedShipments().subscribe(result => {
          console.log('shipments: ', result);
          console.log('shipmentId: ' + shipmentId);
          this.shipment = result.items.find(s => s.id === shipmentId);
          console.log('shipment: ', this.shipment);
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

  save() {
    if (this.shipment.id) {
      this.handleResponse(this.shipmentService.updateShipment(this.shipment));
    } else {
      this.handleResponse(this.shipmentService.createShipment(this.shipment));
    }
  }

  private handleResponse(responseObservable: Observable<any>) {
    this.subscription.add(responseObservable.subscribe(result => {
      if (result.ok) {
        this.router.navigate(['/shipments'], { queryParams: { type: this.shipmentType } });
      } else {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht gespeichert werden!');
      }
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht aktualisiert werden!');
      }));
  }
}
