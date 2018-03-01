import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-order-step',
  templateUrl: './order-step.component.html',
  styleUrls: ['./order-step.component.css']
})
export class OrderStepComponent implements OnInit, OnDestroy {

  // id: number;

  // private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['orderId']; // (+) converts string 'id' to a number
    });*/
  }

  ngOnDestroy(): void {
    // this.routeSubscription.unsubscribe();
  }
}
