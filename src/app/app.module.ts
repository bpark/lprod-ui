import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AlertModule, BsDatepickerModule} from 'ngx-bootstrap';
import {SideNavComponent} from './side-nav/side-nav.component';
import {OrderScreenComponent} from './order-screen/order-screen.component';
import {OrderPressDataComponent} from './order-press-data/order-press-data.component';
import {OrderResultComponent} from './order-result/order-result.component';
import {NavbarComponent} from './navbar/navbar.component';
import {OrderGlueComponent} from './order-glue/order-glue.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {OrderDetailsTableComponent} from './order-details-table/order-details-table.component';
import {GlulamOrderService} from './model/glulam-order.service';
import { OrderNavButtonsComponent } from './order-nav-buttons/order-nav-buttons.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderListComponent } from './order-list/order-list.component';
import {HttpClientModule} from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';
import { ShipmentGlueComponent } from './shipment-glue/shipment-glue.component';
import {ShipmentsService} from './model/shipments.service';
import { ShipmentEditComponent } from './shipment-edit/shipment-edit.component';
import { AlertStackComponent } from './alert-stack/alert-stack.component';
import { TimesPipe } from './paginator/times.pipe';


const appRoutes: Routes = [
  /*{
    path: 'glue',
    component: OrderGlueComponent
  },
  {
    path: 'pressdata',
    component: OrderPressDataComponent
  },
  {
    path: 'details',
    component: OrderDetailsComponent
  },
  {
    path: 'detailstbl',
    component: OrderDetailsTableComponent
  },
  {
    path: 'summary',
    component: OrderSummaryComponent
  },*/
  /*{
    path: '**',
    component: OrderListComponent,
    pathMatch: 'full'
  },*/
  {
    path: '',
    component: OrderListComponent,
    pathMatch: 'full'
  },
  {
    path: 'gluelam',
    component: OrderListComponent,
    pathMatch: 'full'
  },
  {
    path: 'shipments',
    component: ShipmentGlueComponent,
    pathMatch: 'full'
  },
  {
    path: 'shipments/:shipmentId',
    component: ShipmentEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'orders/:orderId',
    component: OrderScreenComponent,
    children: [
      {path: '', redirectTo: 'pressdata', pathMatch: 'full'},
      {path: 'glue', component: OrderGlueComponent},
      {path: 'pressdata', component: OrderPressDataComponent},
      {path: 'details', component: OrderDetailsComponent},
      {path: 'detailstbl', component: OrderDetailsTableComponent},
      {path: 'summary', component: OrderSummaryComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    OrderScreenComponent,
    OrderPressDataComponent,
    OrderResultComponent,
    NavbarComponent,
    OrderGlueComponent,
    OrderDetailsComponent,
    OrderDetailsTableComponent,
    OrderNavButtonsComponent,
    OrderSummaryComponent,
    OrderListComponent,
    PaginatorComponent,
    ShipmentGlueComponent,
    ShipmentEditComponent,
    AlertStackComponent,
    TimesPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    GlulamOrderService,
    ShipmentsService,
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
