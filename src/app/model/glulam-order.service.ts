import { Injectable } from '@angular/core';
import {GluelamList, GlulamModel} from './glulam.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class GlulamOrderService {

  glulamModel: GlulamModel;

  private static createConnectionUrl(id?: number): string {
    if (environment.production) {
      if (id) {
        return 'api/orders/' + id;
      } else {
        return 'api/orders';
      }
    } else {
      if (id) {
        return 'assets/singleorder.json';
      } else {
        return 'assets/gluelams.json';
      }
    }
  }

  constructor(private http: HttpClient) {
  }

  getGluelamOrders(page: number, pageSize: number): Observable<GluelamList> {
    const queryParams = new HttpParams();
    queryParams.set('page', String(page));
    queryParams.set('pageSize', String(pageSize));
    return this.http.get<GluelamList>(GlulamOrderService.createConnectionUrl(), {params: queryParams });
  }

  getGluelamOrder(id: number): Observable<GlulamModel> {
    // return this.http.get<GlulamModel>(GlulamOrderService.createConnectionUrl() + '/' + id);
    return this.http.get<GlulamModel>(GlulamOrderService.createConnectionUrl(id));
  }

  deleteGluelamOrder(id: number): Observable<number> {
    console.log('deleting item with id: ' + id);
    return this.http.delete<number>(GlulamOrderService.createConnectionUrl(id));
  }

}
