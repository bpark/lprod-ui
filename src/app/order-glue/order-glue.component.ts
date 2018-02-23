import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-glue',
  templateUrl: './order-glue.component.html',
  styleUrls: ['./order-glue.component.css']
})
export class OrderGlueComponent implements OnInit {

  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
