import { Component, OnInit } from '@angular/core';
import {GlulamModel} from '../model/glulam.model';
import {GlulamOrderService} from '../model/glulam-order.service';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
  }

}
