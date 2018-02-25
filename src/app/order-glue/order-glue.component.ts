import { Component, OnInit } from '@angular/core';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GlulamModel} from '../model/glulam.model';

@Component({
  selector: 'app-order-glue',
  templateUrl: './order-glue.component.html',
  styleUrls: ['./order-glue.component.css']
})
export class OrderGlueComponent implements OnInit {

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
  }

}
