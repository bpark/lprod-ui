import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class LoginService {

  // private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<number>> {
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

    return this.http.post<number>('http://localhost:8080/auth', {username: username, password: password}, {observe: 'response'});
  }
}
