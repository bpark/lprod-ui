import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {JwtToken} from '../model/jwt-token';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {

  // private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<JwtToken> {
    /*
    var formData = {
            username: $form.find('input[name="username"]').val(),
            password: $form.find('input[name="password"]').val()
        };
        url: "/auth",
            type: "POST",
            data: JSON.stringify(loginData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    console.log('body: ', body.toString());
    */

    // return this.http.post<JwtToken>('http://localhost:8080/auth', {username: username, password: password});
    return this.http.post<JwtToken>(this.createConnectionUrl(), {username: username, password: password});
  }

  private createConnectionUrl(): string {
    if (!environment.production) {
        return 'http://localhost:8080/auth';
    } else {
        return 'https://lprod-v1.appspot.com/auth';
    }
  }
}
