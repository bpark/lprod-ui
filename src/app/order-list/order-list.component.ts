import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {GlulamOrderService} from '../model/glulam-order.service';
import {GluelamList} from '../model/glulam.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  sideNavModel: SideNavModel = {
    title: 'Produktion',
    items: [{
        id: 1,
        link: '/app/gluelam',
        label: 'Leimbinder'
      }]
  };

  gluelamList: GluelamList;
  errors: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedIndex = 0;
  selectedId: number;
  subscription: Subscription;
  dataSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private gluelamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(paramMap => {
      this.page = paramMap.has('page') ? +paramMap.get('page') : 1;
      this.pageSize = paramMap.has('pageSize') ? +paramMap.get('pageSize') : 10;
      console.log('page: ', this.page);
      this.getMessages(this.page, this.pageSize);
    });
    // const paramMap = this.route.snapshot.queryParamMap;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  getMessages(page: number, pageSize: number): void {

    this.dataSubscription = this.gluelamOrderService.getGluelamOrders(page, pageSize).subscribe(
      result => {
        this.gluelamList = result;
        this.totalPages = Math.floor(result.totalCount / pageSize) + 1;
        this.select(0);
      },
      error => {
        this.errors = true;
      }
    );
  }

  deleteMessage() {
    this.gluelamOrderService.deleteGluelamOrder(this.selectedId);
    this.getMessages(this.page, this.pageSize);
  }

  public select(index: number): void {
    this.selectedIndex = index;
    this.selectedId = this.gluelamList.items[index].id;
  }

}
