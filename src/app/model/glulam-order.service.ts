import { Injectable } from '@angular/core';
import {GluelamList, GlulamModel} from './glulam.model';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {JwtTokenStoreService} from './jwt-token-store.service';

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
        return 'http://localhost:8080/api/orders/' + id;
      } else {
        return 'http://localhost:8080/api/orders';
      }
    }
  }

  constructor(private http: HttpClient,
              private jwtTokenStore: JwtTokenStoreService) {
  }

  getGluelamOrders(page: number, pageSize: number): Observable<GluelamList> {
    const queryParams = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    const options = {headers: this.jwtTokenStore.createTokenHeader(), params: queryParams };
    return this.http.get<GluelamList>(GlulamOrderService.createConnectionUrl(), options);
  }

  getGluelamOrder(id: number): Observable<GlulamModel> {
    const options = {headers: this.jwtTokenStore.createTokenHeader()};
    return this.http.get<GlulamModel>(GlulamOrderService.createConnectionUrl(id), options);
  }

  deleteGluelamOrder(id: number): Observable<number> {
    const options = {headers: this.jwtTokenStore.createTokenHeader()};
    return this.http.delete<number>(GlulamOrderService.createConnectionUrl(id), options);
  }

  create(gluelam: GlulamModel) {
    return this.http.post<number>(GlulamOrderService.createConnectionUrl(), gluelam, {headers: this.jwtTokenStore.createTokenHeader(), observe: 'response'});
  }

  update(gluelam: GlulamModel): Observable<HttpResponse<void>> {
    return this.http.put<void>(GlulamOrderService.createConnectionUrl(gluelam.id), gluelam, {headers: this.jwtTokenStore.createTokenHeader(), observe: 'response'});
  }
}
