import { Component, OnInit } from '@angular/core';
import {GlulamOrderService} from '../../model/glulam-order.service';
import {CalculationResult, GlulamModel} from '../../model/glulam.model';
import {GluelamCalculatorService} from '../../model/gluelam-calculator.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.css']
})
export class OrderResultComponent implements OnInit {

  glulamModel: GlulamModel;
  calculationResult: CalculationResult;

  constructor(private glulamOrderService: GlulamOrderService,
              private gluelamCalculatorService: GluelamCalculatorService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
    this.gluelamCalculatorService.calculate(this.glulamModel);
    this.calculationResult = this.gluelamCalculatorService.calculationResult;
  }

}
