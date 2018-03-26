import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class LoginService {

  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<number>> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    console.log('body: ', body.toString());
    return this.http.post<number>('login', body.toString(), {headers: this.headers, observe: 'response'});
  }
}
