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
    const queryParams = new HttpParams();
    queryParams.set('page', String(page));
    queryParams.set('pageSize', String(pageSize));
    queryParams.set('shipmentType', String(shipmentType));
    return this.http.get<ShipmentsList>(ShipmentsService.createConnectionUrl(), {params: queryParams });
  }

  getSelectableShipments(): Observable<ShipmentsList> {
    const queryParams = new HttpParams();
    queryParams.set('selectable', String(true));
    return this.http.get<ShipmentsList>(ShipmentsService.createConnectionUrl(), {params: queryParams });
  }

  getShipment(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(ShipmentsService.createConnectionUrl(id));
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
