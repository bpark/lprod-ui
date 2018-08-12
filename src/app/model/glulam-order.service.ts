import { Injectable } from '@angular/core';
import {GluelamList, GlulamModel} from './glulam.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {JwtTokenStoreService} from './jwt-token-store.service';

@Injectable()
export class GlulamOrderService {

  glulamModel: GlulamModel;

  private static createConnectionUrl(id?: number): string {
    if (!environment.production) {
      if (id) {
        return 'http://localhost:3000/api/gluelams/' + id;
      } else {
        return 'http://localhost:3000/api/gluelams';
      }
    } else {
      if (id) {
        return 'https://lprod-v1.appspot.com/api/orders/' + id;
      } else {
        return 'https://lprod-v1.appspot.com/api/orders';
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
    return this.http.get<GluelamList>(GlulamOrderService.createConnectionUrl(), {
      headers: this.jwtTokenStore.createTokenHeader(),
      params: queryParams
    });
  }

  getGluelamOrder(id: number): Observable<GlulamModel> {
    return this.http.get<GlulamModel>(GlulamOrderService.createConnectionUrl(id), {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  deleteGluelamOrder(id: number): Observable<number> {
    const options = {headers: this.jwtTokenStore.createTokenHeader()};
    return this.http.delete<number>(GlulamOrderService.createConnectionUrl(id), options);
  }

  create(gluelam: GlulamModel): Observable<number>  {
    return this.http.post<number>(GlulamOrderService.createConnectionUrl(), gluelam, {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }

  update(gluelam: GlulamModel): Observable<void> {
    return this.http.put<void>(GlulamOrderService.createConnectionUrl(gluelam.id), gluelam, {
      headers: this.jwtTokenStore.createTokenHeader()
    });
  }
}
