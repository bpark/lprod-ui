import {Injectable} from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Shipment, ShipmentsList, ShipmentType} from './shipments.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import {JwtTokenStoreService} from './jwt-token-store.service';
import {AbstractRepository} from './abstract-repository';

@Injectable()
export class ShipmentsService extends AbstractRepository<Shipment> {

  constructor(protected http: HttpClient,
              protected jwtTokenStore: JwtTokenStoreService) {
    super(http, jwtTokenStore, 'shipments');
  }

  getShipments(page: number, pageSize: number, shipmentType: ShipmentType): Observable<ShipmentsList> {
    const queryParams = new HttpParams()
      .set('shipmentType', String(shipmentType));

    return super.list(page, pageSize, queryParams);
  }

  getSelectableShipments(shipmentType: ShipmentType): Observable<ShipmentsList> {
    const queryParams = new HttpParams()
      .set('selectable', String(true))
      .set('shipmentType', String(shipmentType));
    return this.list(1, 20, queryParams);
  }

}
