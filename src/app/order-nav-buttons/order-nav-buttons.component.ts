import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-nav-buttons',
  templateUrl: './order-nav-buttons.component.html',
  styleUrls: ['./order-nav-buttons.component.css']
})
export class OrderNavButtonsComponent implements OnInit {

  @Input() back: string;
  @Input() forward: string;
  @Input() backDisabled: boolean;
  @Input() forwardDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
