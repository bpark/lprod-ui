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
        link: '/gluelam',
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

  constructor(private route: ActivatedRoute,
              private gluelamOrderService: GlulamOrderService) { }

  ngOnInit() {
    const paramMap = this.route.snapshot.queryParamMap;
    this.page = paramMap.has('page') ? +paramMap.get('page') : 1;
    this.pageSize = paramMap.has('pageSize') ? +paramMap.get('pageSize') : 10;
    this.getMessages(this.page, this.pageSize);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMessages(page: number, pageSize: number): void {

    this.subscription = this.subscription = this.gluelamOrderService.getGluelamOrders(page, pageSize).subscribe(
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

  public select(index: number): void {
    this.selectedIndex = index;
    this.selectedId = this.gluelamList.items[index].id;
  }

}
