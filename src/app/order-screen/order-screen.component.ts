import {Component, OnInit} from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {stringDistance} from 'codelyzer/util/utils';

@Component({
  selector: 'app-order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.css']
})
export class OrderScreenComponent implements OnInit {

  sideNavModel: SideNavModel = {
    title: 'Leimbinder',
    items: [{
        id: 1,
        link: './pressdata',
        label: 'Pressdaten'
      },
      {
        id: 2,
        link: './glue',
        label: 'Leim/Härter'
      },
      {
        id: 3,
        link: './details',
        label: 'Leimbinderdaten'
      },
      {
        id: 4,
        link: './detailstbl',
        label: 'Details'
      },
      {
        id: 5,
        link: './summary',
        label: 'Übersicht'
      }]
  };

  constructor() {
  }

  ngOnInit() {
  }

}
