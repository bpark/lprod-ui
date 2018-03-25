import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class LoginService {

  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<number>> {
    return this.http.post<number>('login', {'username': username, 'password':  password}, {headers: this.headers, observe: 'response'});
  }
}
