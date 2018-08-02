import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../../components/side-nav/side-nav-model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  sideNavModel: SideNavModel = {
    title: 'Leimbinder',
    items: [{
      id: 1,
      link: './customer',
      label: 'Auftragsdaten'
    },
      {
        id: 2,
        link: './pressdata',
        label: 'Pressdaten'
      },
      {
        id: 3,
        link: './glue',
        label: 'Leim/Härter'
      },
      {
        id: 4,
        link: './details',
        label: 'Leimbinderdaten'
      },
      {
        id: 5,
        link: './detailstbl',
        label: 'Details'
      },
      {
        id: 6,
        link: './summary',
        label: 'Übersicht'
      }]
  };

  constructor() { }

  ngOnInit() {
  }

}
