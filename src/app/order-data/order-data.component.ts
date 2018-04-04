import { Component, OnInit } from '@angular/core';
import {GlulamModel} from '../model/glulam.model';
import {GlulamOrderService} from '../model/glulam-order.service';
import {BsLocaleService} from 'ngx-bootstrap';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService,
              private localeService: BsLocaleService) {
  }

  ngOnInit() {
    this.localeService.use('de');
    this.glulamModel = this.glulamOrderService.glulamModel;
    this.glulamModel.pressData.date = new Date(this.glulamModel.pressData.date);
    console.log('date: ', this.glulamModel.pressData.date);
  }

}
