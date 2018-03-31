import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {ShipmentsService} from '../model/shipments.service';
import {ShipmentsList, ShipmentType} from '../model/shipments.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AlertStackModel} from '../alert-stack/alert-stack.model';

@Component({
  selector: 'app-shipment-glue',
  templateUrl: './shipment-glue.component.html',
  styleUrls: ['./shipment-glue.component.css']
})
export class ShipmentGlueComponent implements OnInit, OnDestroy {

  sideNavModel: SideNavModel = {
    title: 'Lieferungen',
    items: [{
      id: 1,
      link: '/app/shipments',
      queryParams: {
          type: 'glue'
      },
      label: 'Leim'
    }, {
      id: 2,
      link: '/app/shipments',
      queryParams: {
        type: 'hardener'
      },
      label: 'Härter'
    }]
  };

  ShipmentType = ShipmentType;

  alertStackModel: AlertStackModel;
  page = 1;
  pageSize = 10;
  totalPages: number;
  selectedIndex = 0;
  selectedId: number;
  shipmentsList: ShipmentsList;
  subscription: Subscription;
  dataSubscription: Subscription = new Subscription();
  shipmentType: ShipmentType;


  constructor(private route: ActivatedRoute,
              private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(paramMap => {
      // const type = this.route.snapshot.queryParamMap.get('type');
      console.log('paramMap', paramMap);
      this.page = paramMap.has('page') ? +paramMap.get('page') : 1;
      this.pageSize = paramMap.has('pageSize') ? +paramMap.get('pageSize') : 10;
      const type = paramMap.get('type');
      this.shipmentType = ShipmentType[type as keyof typeof ShipmentType];
      console.log('shipmentType=', this.shipmentType);
      this.getMessages(this.page, this.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(): void {
    this.shipmentsService.deleteShipment(this.selectedId).subscribe(
      result => {
        if (result.ok) {
          this.getMessages(this.page, this.pageSize);
        } else {
          this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht gelöscht werden!');
        }
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht gelöscht werden!');
      }
    );
  }

  updateSelecteable(index): void {
    this.select(index);
    const shipment = this.shipmentsList.items.find(s => s.id === this.selectedId);
    shipment.selectable = !shipment.selectable;
    this.shipmentsService.updateShipment(shipment).subscribe(
      result => {
        if (!result.ok) {
          this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht aktualisiert werden!');
        }
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht aktualisiert werden!');
      }
    );
  }

  getMessages(page: number, pageSize: number): void {

    console.log('shipments paging with page: ' + page + ', pageSize: ' + pageSize);

    this.shipmentsService.getShipments(page, pageSize, this.shipmentType).subscribe(
      result => {
        this.shipmentsList = result;
        this.totalPages = Math.floor(result.totalCount / pageSize) + 1;
        this.select(0);
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensätze konnten nicht geladen werden!');
      }
    );
  }

  public select(index: number): void {
    this.selectedIndex = index;
    this.selectedId = this.shipmentsList.items[index].id;
  }

}
