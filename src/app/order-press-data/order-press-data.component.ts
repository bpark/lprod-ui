import { Component, OnInit } from '@angular/core';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GluelamTypes, GlulamModel} from '../model/glulam.model';
import {GluelamCalculatorService} from '../model/gluelam-calculator.service';

@Component({
  selector: 'app-order-press-data',
  templateUrl: './order-press-data.component.html',
  styleUrls: ['./order-press-data.component.css']
})
export class OrderPressDataComponent implements OnInit {

  glulamModel: GlulamModel;
  gluelamTypes = GluelamTypes.getInstance();

  constructor(private glulamOrderService: GlulamOrderService,
              private gluelamCalculatorService: GluelamCalculatorService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
  }

  calculate() {
    this.gluelamCalculatorService.calculate(this.glulamModel);
  }
}
