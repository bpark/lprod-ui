import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {GlulamOrderService} from '../model/glulam-order.service';
import {Gluelam} from '../model/glulam.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  sideNavModel: SideNavModel = {
    title: 'Produktion',
    items: [{
        id: 1,
        link: './gluelam',
        label: 'Leimbinder'
      },
      {
        id: 2,
        link: './bilam',
        label: 'Bilam'
      },
      {
        id: 3,
        link: './arc',
        label: 'Bögen'
      }]
  };

  gluelamItems: Gluelam[];
  errors: boolean;

  constructor(private gluelamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.gluelamOrderService.getGluelamOrders().subscribe(
      items => {
        this.gluelamItems = items;
      },
      error => {
        this.errors = true;
      }
    );
  }

}
