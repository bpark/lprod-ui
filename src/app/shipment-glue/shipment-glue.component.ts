import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {ShipmentsService} from '../model/shipments.service';
import {ShipmentsList} from '../model/shipments.model';

@Component({
  selector: 'app-shipment-glue',
  templateUrl: './shipment-glue.component.html',
  styleUrls: ['./shipment-glue.component.css']
})
export class ShipmentGlueComponent implements OnInit {

  sideNavModel: SideNavModel = {
    title: 'Lieferungen',
    items: [{
      id: 1,
      link: '/shipments-glue',
      label: 'Leim'
    }, {
      id: 2,
      link: '/hardener',
      label: 'Härter'
    }]
  };

  errors: boolean;
  page = 1;
  pageSize = 10;
  totalPages: number;
  selectedIndex = 0;
  selectedId: number;
  shipmentsList: ShipmentsList;

  constructor(private shipmentsService: ShipmentsService) { }

  ngOnInit() {
    this.getMessages(this.page, this.pageSize);
  }

  getMessages(page: number, pageSize: number): void {

    this.shipmentsService.getShipments(page, pageSize).subscribe(
      result => {
        this.shipmentsList = result;
        this.totalPages = Math.floor(result.totalCount / pageSize) + 1;
        this.select(0);
      },
      error => {
        this.errors = true;
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
