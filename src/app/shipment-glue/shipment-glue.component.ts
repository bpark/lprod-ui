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
      link: '/shipments',
      queryParams: {
          type: 'glue'
      },
      label: 'Leim'
    }, {
      id: 2,
      link: '/shipments',
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
  shipmentType: ShipmentType;


  constructor(private route: ActivatedRoute,
              private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.shipmentType = params['type'];
      this.getMessages(this.page, this.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(): void {
    this.subscription.add(this.shipmentsService.deleteShipment(this.selectedId).subscribe(
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
    ));
  }

  getMessages(page: number, pageSize: number): void {

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

  public goToPage(n: number): void {
    this.page = n;
    this.getMessages(this.page, this.pageSize);
  }

  public onNext(): void {
    this.page++;
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
    this.getMessages(this.page, this.pageSize);
  }

  public onPrev(): void {
    this.page--;
    if (this.page < 1) {
      this.page = 1;
    }
    this.getMessages(this.page, this.pageSize);
  }

  public select(index: number): void {
    this.selectedIndex = index;
    this.selectedId = this.shipmentsList.items[index].id;
  }

}
