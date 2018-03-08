import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ShipmentsList, ShipmentType} from './shipments.model';

@Injectable()
export class ShipmentsService {

  private static createConnectionUrl(): string {
    if (environment.production) {
      return 'api/sftp/connections/';
    } else {
      return 'assets/shipments.json';
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
}
