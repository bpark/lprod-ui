import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {AlertStackModel} from '../components/alert-stack/alert-stack.model';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {JwtTokenStoreService} from '../model/jwt-token-store.service';
import {JwtToken} from '../model/jwt-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  alertStackModel: AlertStackModel;

  rnd: number;

  constructor(private loginService: LoginService,
              private jwtTokenStore: JwtTokenStoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.rnd = Math.floor(Math.random() * 16);
  }

  login() {
    console.log('username: ' + this.username + ', password: ' + this.password);
    this.handleResponse(this.loginService.login(this.username, this.password));
  }

  private handleResponse(responseObservable: Observable<JwtToken>) {
    responseObservable.subscribe(result => {
        this.jwtTokenStore.token = result.token;
        this.router.navigate(['/app']);
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Login fehlgeschlagen!');
        console.log('error: ', error);
      });
  }
}
