import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavModel} from '../side-nav/side-nav-model';
import {ActivatedRoute} from '@angular/router';
import {GlulamOrderService} from '../model/glulam-order.service';
import {Subscription} from 'rxjs/Subscription';
import {GlulamModel} from '../model/glulam.model';
import {GluelamCalculatorService} from '../model/gluelam-calculator.service';

@Component({
  selector: 'app-order-screen',
  templateUrl: './order-screen.component.html',
  styleUrls: ['./order-screen.component.css'],
  providers: [
    GluelamCalculatorService
  ]
})
export class OrderScreenComponent implements OnInit, OnDestroy {

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

  routeSubscription: Subscription;
  orderSubscription: Subscription;
  glulamModel: GlulamModel;

  constructor(private route: ActivatedRoute,
              private gluelamOrderService: GlulamOrderService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      const orderId = params['orderId'];
      console.log('orderid is ' + orderId);
      if (orderId === 'new') {
        this.glulamModel = new GlulamModel();
        this.gluelamOrderService.glulamModel = this.glulamModel;
        console.log('model created');
      } else {
        this.orderSubscription = this.gluelamOrderService.getGluelamOrder(orderId).subscribe(
          result => {
            this.glulamModel = result;
            this.gluelamOrderService.glulamModel = this.glulamModel;
            console.log('model loaded');
          },
          error => {
            console.log('error');
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

}
