import {Component, OnInit, ViewChild} from '@angular/core';
import {GlulamDetail} from '../model/glulam.model';

@Component({
  selector: 'app-order-details-table',
  templateUrl: './order-details-table.component.html',
  styleUrls: ['./order-details-table.component.css']
})
export class OrderDetailsTableComponent implements OnInit {

  rows: GlulamDetail[] = [{id: 1}, {id: 2}];

  @ViewChild('addRowItem') addRowItem;
  @ViewChild('removeRowItem') removeRowItem;

  constructor() { }

  ngOnInit() {
  }

  addRow() {
    const len = this.rows.length;
    this.rows.push({id: len + 1});

    this.addRowItem.nativeElement.blur();
  }

  removeRow() {
    this.removeRowItem.nativeElement.blur();
  }

}
