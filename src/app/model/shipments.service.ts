import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Shipment, ShipmentsList, ShipmentType} from './shipments.model';
import {observable} from 'rxjs/symbol/observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import {JwtTokenStoreService} from './jwt-token-store.service';

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
        return 'https://lprod-v1.appspot.com/api/shipments/' + id;
      } else {
        return 'https://lprod-v1.appspot.com/api/shipments';
      }
    }
  }

  constructor(private http: HttpClient,
              private jwtTokenStore: JwtTokenStoreService) {
  }

  getShipments(page: number, pageSize: number, shipmentType: ShipmentType): Observable<ShipmentsList> {
    const queryParams = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize))
      .set('shipmentType', String(shipmentType));

    return this.http.get<ShipmentsList>(ShipmentsService.createConnectionUrl(), {
      headers: this.jwtTokenStore.createTokenHeader(),
      params: queryParams
    });
  }

  getSelectableShipments(shipmentType: ShipmentType): Observable<ShipmentsList> {
    const queryParams = new HttpParams()
      .set('selectable', String(true))
      .set('shipmentType', String(shipmentType));
    return this.http.get<ShipmentsList>(ShipmentsService.createConnectionUrl(), {
      headers: this.jwtTokenStore.createTokenHeader(),
      params: queryParams
    });
  }

  getShipment(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(ShipmentsService.createConnectionUrl(id), {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  createShipment(shipment: Shipment): Observable<number> {
    return this.http.post<number>(ShipmentsService.createConnectionUrl(), shipment, {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  updateShipment(shipment: Shipment): Observable<void> {
    return this.http.put<void>(ShipmentsService.createConnectionUrl(shipment.id), shipment, {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  deleteShipment(id: number, shipmentType: ShipmentType): Observable<void> {
    const queryParams = new HttpParams()
      .set('shipmentType', String(shipmentType));
    return this.http.delete<void>(ShipmentsService.createConnectionUrl(id), {
      headers: this.jwtTokenStore.createTokenHeader(),
      params: queryParams
    });
  }
}
