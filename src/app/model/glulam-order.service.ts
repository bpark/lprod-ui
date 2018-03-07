import { Injectable } from '@angular/core';
import {GluelamList, GlulamModel} from './glulam.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class GlulamOrderService {

  glulamModel: GlulamModel;

  private static createConnectionUrl(): string {
    if (environment.production) {
      return 'api/sftp/connections/';
    } else {
      return 'assets/gluelams.json';
    }
  }

  constructor(private http: HttpClient) {
    this.glulamModel = new GlulamModel();
  }

  getGluelamOrders(page: number, pageSize: number): Observable<GluelamList> {
    const queryParams = new HttpParams();
    queryParams.set('page', String(page));
    queryParams.set('pageSize', String(pageSize));
    return this.http.get<GluelamList>(GlulamOrderService.createConnectionUrl(), {params: queryParams });
  }

  deleteGluelamOrder(id: number): Observable<number> {
    console.log('deleting item with id: ' + id);
    return this.http.delete<number>(GlulamOrderService.createConnectionUrl() + id);
  }

}
