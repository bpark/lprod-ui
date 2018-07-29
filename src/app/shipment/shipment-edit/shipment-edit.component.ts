import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../../components/side-nav/side-nav-model';
import {Shipment, ShipmentType} from '../../model/shipments.model';
import {ShipmentsService} from '../../model/shipments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import {AlertStackModel} from '../../components/alert-stack/alert-stack.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  shipmentType: ShipmentType;

  alertStackModel: AlertStackModel = new AlertStackModel();

  shipmentForm: FormGroup;

  minDate = new Date();

  private subscription: Subscription;
  private shipment: Shipment;

  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  };

  constructor(private shipmentService: ShipmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    const shipmentId = +this.route.snapshot.paramMap.get('shipmentId');
    const type = this.route.snapshot.queryParamMap.get('type');
    this.shipmentType = ShipmentType[type as keyof typeof ShipmentType];

    this.shipmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date(), Validators.required],
      selectable: [true, Validators.required]
    });

    this.shipmentForm.statusChanges.debounceTime(1000).subscribe(status => {
      if (status === 'VALID') {
        this.alertStackModel.clear();
      }
    });

    if (shipmentId === -1) {
      this.shipment = new Shipment();
      this.shipment.shipmentType = this.shipmentType;
    } else {
      this.subscription = this.shipmentService.getShipment(shipmentId).subscribe(result => {
        this.shipment = result;
        this.shipmentForm.patchValue({
          name: result.name,
          date: result.date,
          selectable: result.selectable
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    if (!this.shipmentForm.valid) {
      this.alertStackModel.addDangerMessage('Die Eingaben sind falsch!');
    } else {
      this.shipment.name = this.shipmentForm.controls.name.value;
      this.shipment.date = this.shipmentForm.controls.date.value;
      this.shipment.selectable = this.shipmentForm.controls.selectable.value;
      console.log('shipment: ', this.shipment);
      if (this.shipment.id) {
        this.handleResponse(this.shipmentService.updateShipment(this.shipment));
      } else {
        this.handleResponse(this.shipmentService.createShipment(this.shipment));
      }
    }
  }

  private handleResponse(responseObservable: Observable<any>) {
    responseObservable.subscribe(result => {
        this.router.navigate(['/app/shipments'], {queryParams: {type: this.shipmentType}});
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Der Datensatz konnte nicht aktualisiert werden!');
      });
  }
}
