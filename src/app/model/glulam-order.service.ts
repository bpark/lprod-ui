import { Injectable } from '@angular/core';
import {GluelamBaseEntityList, GluelamEntity} from './glulam.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {JwtTokenStoreService} from './jwt-token-store.service';
import {AbstractRepository} from './abstract-repository';

@Injectable()
export class GlulamOrderService extends AbstractRepository<GluelamEntity> {

  private static readonly apiPath = 'gluelams';

  constructor(protected http: HttpClient,
              protected jwtTokenStore: JwtTokenStoreService) {
    super(http, jwtTokenStore, GlulamOrderService.apiPath);
  }

  getOrders(page: number, pageSize: number): Observable<GluelamBaseEntityList> {
    return super.list(page, pageSize);
  }

}
