import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../../components/side-nav/side-nav-model';
import {GlulamOrderService} from '../../model/glulam-order.service';
import {GluelamList} from '../../model/glulam.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {AlertStackModel} from '../../components/alert-stack/alert-stack.model';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/takeUntil';

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

  alertStackModel: AlertStackModel;
  loading = false;

  gluelamList: GluelamList;
  errors: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  selectedIndex: number;
  selectedId: number;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private gluelamOrderService: GlulamOrderService) { }

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(paramMap => {
      this.page = paramMap.has('page') ? +paramMap.get('page') : 1;
      this.pageSize = paramMap.has('pageSize') ? +paramMap.get('pageSize') : 10;

      this.getOrders(this.page, this.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getOrders(page: number, pageSize: number): void {

    const dataObservable = this.gluelamOrderService.getGluelamOrders(page, pageSize);
    dataObservable.subscribe(
      result => {
        this.loading = false;
        this.gluelamList = result;
        this.totalPages = Math.floor(result.totalCount / pageSize) + 1;
        this.select(0);
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensätze konnten nicht geladen werden!');
      }
    );

    /*
    Observable.create(obs => {
      obs.next(true);
      obs.complete();
    }).takeUntil(dataObservable).delay(200).subscribe(loading => {
      this.loading = loading;
    });*/
  }

  deleteOrder() {
    this.gluelamOrderService.deleteGluelamOrder(this.selectedId);
    this.getOrders(this.page, this.pageSize);
  }

  public select(index: number): void {
    if (this.gluelamList.items.length > 0) {
      this.selectedIndex = index;
      this.selectedId = this.gluelamList.items[index].id;
    } else {
      this.selectedIndex = -1;
      this.selectedId = undefined;
    }
  }

}
