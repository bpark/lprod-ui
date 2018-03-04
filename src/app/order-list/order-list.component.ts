import { Component, OnInit } from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {GlulamOrderService} from '../model/glulam-order.service';
import {Gluelam, GluelamList} from '../model/glulam.model';

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

  gluelamList: GluelamList;
  errors: boolean;
  page = 1;
  pageSize = 10;
  totalPages: number;

  constructor(private gluelamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.getMessages(this.page, this.pageSize);
  }

  getMessages(page: number, pageSize: number): void {

    this.gluelamOrderService.getGluelamOrders(page, pageSize).subscribe(
      result => {
        this.gluelamList = result;
        this.totalPages = Math.floor(result.totalCount / pageSize) + 1;
      },
      error => {
        this.errors = true;
      }
    );
  }

  public goToPage(n: number): void {
    this.page = n;
    this.getMessages(this.page, this.pageSize);
  }

  public onNext(): void {
    this.page++;
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }
    this.getMessages(this.page, this.pageSize);
  }

  public onPrev(): void {
    this.page--;
    if (this.page < 1) {
      this.page = 1;
    }
    this.getMessages(this.page, this.pageSize);
  }

}
