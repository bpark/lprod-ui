import {Component, OnInit, ViewChild} from '@angular/core';
import {GlulamDetail, GlulamModel} from '../model/glulam.model';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GluelamCalculatorService} from '../model/gluelam-calculator.service';

@Component({
  selector: 'app-order-details-table',
  templateUrl: './order-details-table.component.html',
  styleUrls: ['./order-details-table.component.css']
})
export class OrderDetailsTableComponent implements OnInit {

  @ViewChild('addRowItem') addRowItem;
  @ViewChild('removeRowItem') removeRowItem;

  glulamModel: GlulamModel;

  constructor(private glulamOrderService: GlulamOrderService,
              private gluelamCalculatorService: GluelamCalculatorService) { }

  ngOnInit() {
    this.glulamModel = this.glulamOrderService.glulamModel;
  }

  addRow() {
    const detail = new GlulamDetail();
    detail.id = this.glulamModel.gluelamDetail.length + 1;
    this.glulamModel.gluelamDetail.push(detail);

    this.addRowItem.nativeElement.blur();
  }

  removeRow() {
    this.removeRowItem.nativeElement.blur();
  }

  calculateRow(glulamDetail: GlulamDetail) {
    this.gluelamCalculatorService.calculateDetail(glulamDetail, this.glulamModel);
  }

}
