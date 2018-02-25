import { Component, OnInit } from '@angular/core';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GlulamModel} from '../model/glulam.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
  }

}
