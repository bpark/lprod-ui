import { Injectable } from '@angular/core';
import {Gluelam, GlulamModel} from './glulam.model';
import {HttpClient} from '@angular/common/http';
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

  getGluelamOrders(): Observable<Gluelam[]> {
    return this.http.get<Gluelam[]>(GlulamOrderService.createConnectionUrl());
  }

}
