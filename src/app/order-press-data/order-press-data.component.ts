import { Component, OnInit } from '@angular/core';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GlulamModel} from '../model/glulam.model';

@Component({
  selector: 'app-order-press-data',
  templateUrl: './order-press-data.component.html',
  styleUrls: ['./order-press-data.component.css']
})
export class OrderPressDataComponent implements OnInit {

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
  }

}
