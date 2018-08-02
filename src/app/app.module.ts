import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, BsDatepickerModule, CollapseModule} from 'ngx-bootstrap';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {OrderScreenComponent} from './order/order-screen/order-screen.component';
import {OrderPressDataComponent} from './order/order-press-data/order-press-data.component';
import {OrderResultComponent} from './order/order-result/order-result.component';
import {NavbarComponent} from './navbar/navbar.component';
import {OrderGlueComponent} from './order/order-glue/order-glue.component';
import {OrderDetailsComponent} from './order/order-details/order-details.component';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {OrderDetailsTableComponent} from './order/order-details-table/order-details-table.component';
import {GlulamOrderService} from './model/glulam-order.service';
import { OrderNavButtonsComponent } from './order/order-nav-buttons/order-nav-buttons.component';
import { OrderSummaryComponent } from './order/order-summary/order-summary.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ShipmentGlueComponent } from './shipment/shipment-glue/shipment-glue.component';
import {ShipmentsService} from './model/shipments.service';
import { ShipmentEditComponent } from './shipment/shipment-edit/shipment-edit.component';
import { OrderDataComponent } from './order/order-data/order-data.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import {LoginService} from './login/login.service';
import localeDe from '@angular/common/locales/de';
import {registerLocaleData} from '@angular/common';
import {ApiInterceptor} from './model/api-interceptor';
import {JwtTokenStoreService} from './model/jwt-token-store.service';
import {AlertStackComponent} from './components/alert-stack/alert-stack.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {ToggleButtonComponent} from './components/toggle-button/toggle-button.component';
import {TimesPipe} from './components/times.pipe';
import { OrderEditComponent } from './order/order-edit/order-edit.component';


defineLocale('de', deLocale);
registerLocaleData(localeDe);


const appRoutes: Routes = [
  {
    path: 'app',
    component: ProductComponent,
    children: [
      {path: '', redirectTo: 'gluelam', pathMatch: 'full'},
      {path: 'gluelam', component: OrderListComponent},
      {path: 'shipments', component: ShipmentGlueComponent},
      {path: 'shipments/:shipmentId', component: ShipmentEditComponent},
      {path: 'bigorders/:orderId', component: OrderEditComponent},
      {
        path: 'orders/:orderId',
        component: OrderScreenComponent,
        children: [
          {path: '', redirectTo: 'customer', pathMatch: 'full'},
          {path: 'customer', component: OrderDataComponent},
          {path: 'glue', component: OrderGlueComponent},
          {path: 'pressdata', component: OrderPressDataComponent},
          {path: 'details', component: OrderDetailsComponent},
          {path: 'detailstbl', component: OrderDetailsTableComponent},
          {path: 'summary', component: OrderSummaryComponent}
        ]
      }
    ]
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
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
    ShipmentGlueComponent,
    ShipmentEditComponent,
    OrderDataComponent,
    LoginComponent,
    ProductComponent,
    AlertStackComponent,
    PaginatorComponent,
    SideNavComponent,
    ToggleButtonComponent,
    TimesPipe,
    OrderEditComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes/*,
      {enableTracing: true}*/
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [
    GlulamOrderService,
    ShipmentsService,
    LoginService,
    JwtTokenStoreService,
    { provide: LOCALE_ID, useValue: 'de' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
