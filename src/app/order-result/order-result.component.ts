import { Component, OnInit } from '@angular/core';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GlulamModel} from '../model/glulam.model';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.css']
})
export class OrderResultComponent implements OnInit {

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
    this.glulamModel.calculate();
  }

}
