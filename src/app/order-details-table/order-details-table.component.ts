import { Component, OnInit } from '@angular/core';
import {GlulamDetail, GlulamModel} from '../model/glulam.model';

@Component({
  selector: 'app-order-details-table',
  templateUrl: './order-details-table.component.html',
  styleUrls: ['./order-details-table.component.css']
})
export class OrderDetailsTableComponent implements OnInit {

  rows: GlulamDetail[] = [{id: 1}, {id: 2}];

  constructor() { }

  ngOnInit() {
  }

  addRow() {
    const len = this.rows.length;
    this.rows.push({id: len + 1});
  }

}
