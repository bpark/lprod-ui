import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {AlertModule, BsDatepickerModule} from 'ngx-bootstrap';
import {OrderStepComponent} from './order-step/order-step.component';
import {OrderScreenComponent} from './order-screen/order-screen.component';
import {OrderPressDataComponent} from './order-press-data/order-press-data.component';
import {OrderResultComponent} from './order-result/order-result.component';
import {NavbarComponent} from './navbar/navbar.component';
import {OrderGlueComponent} from './order-glue/order-glue.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {RouterModule, Routes} from '@angular/router';
import {OrderDetailsTableComponent} from './order-details-table/order-details-table.component';
import {GlulamOrderService} from './model/glulam-order.service';


const appRoutes: Routes = [
  {path: 'glue', component: OrderGlueComponent},
  {path: 'pressdata', component: OrderPressDataComponent},
  {path: 'details', component: OrderDetailsComponent},
  {path: 'detailstbl', component: OrderDetailsTableComponent},
  {path: '**', component: OrderPressDataComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OrderStepComponent,
    OrderScreenComponent,
    OrderPressDataComponent,
    OrderResultComponent,
    NavbarComponent,
    OrderGlueComponent,
    OrderDetailsComponent,
    OrderDetailsTableComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    GlulamOrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
