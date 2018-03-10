import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Shipment, ShipmentsList, ShipmentType} from './shipments.model';
import {observable} from 'rxjs/symbol/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';

@Injectable()
export class ShipmentsService {

  private observable: Observable<ShipmentsList>;
  private shipmentsList: ShipmentsList;

  private page: number;
  private pageSize: number;
  private shipmentType: ShipmentType;

  private static createConnectionUrl(id?: number): string {
    if (environment.production) {
      if (id) {
        return 'api/shipments/' + id;
      } else {
        return 'api/shipments';
      }
    } else {
      if (id) {
        return 'assets/shipments.json';
      } else {
        return 'assets/shipments.json';
      }
    }
  }

  constructor(private http: HttpClient) { }

  getShipments(page: number, pageSize: number, shipmentType: ShipmentType): Observable<ShipmentsList> {

    if (this.shipmentsList && this.page === page && this.pageSize === pageSize && this.shipmentType === shipmentType) {
      return Observable.of(this.shipmentsList);
    } else if (this.observable) {
      return this.observable;
    } else {

      this.page = page;
      this.pageSize = pageSize;
      this.shipmentType = shipmentType;

      const queryParams = new HttpParams();
      queryParams.set('page', String(page));
      queryParams.set('pageSize', String(pageSize));
      queryParams.set('shipmentType', String(shipmentType));
      this.observable = this.http.get<ShipmentsList>(ShipmentsService.createConnectionUrl(), {params: queryParams })
      .map(result => {
        this.observable = null;
        this.shipmentsList = result;
        return this.shipmentsList;
      }).share<ShipmentsList>();
      return this.observable;
    }

  }

  getCachedShipments(): Observable<ShipmentsList> {
    return this.getShipments(this.page, this.pageSize, this.shipmentType);
  }

  createShipment(shipment: Shipment): Observable<HttpResponse<number>> {
    return this.http.post<number>(ShipmentsService.createConnectionUrl(), shipment, {observe: 'response'});
  }

  updateShipment(shipment: Shipment): Observable<HttpResponse<void>> {
    return this.http.put<void>(ShipmentsService.createConnectionUrl(shipment.id), shipment, {observe: 'response'});
  }

  deleteShipment(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(ShipmentsService.createConnectionUrl(id), {observe: 'response'});
  }
}
