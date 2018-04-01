import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {AlertStackModel} from '../alert-stack/alert-stack.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;

  subscription: Subscription;
  alertStackModel: AlertStackModel;

  rnd: number;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.rnd = Math.floor(Math.random() * 16);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    console.log('username: ' + this.username + ', password: ' + this.password);
    this.handleResponse(this.loginService.login(this.username, this.password));
  }

  private handleResponse(responseObservable: Observable<any>) {
    this.subscription = responseObservable.subscribe(result => {
        if (result.ok) {
          this.router.navigate(['/app']);
        } else {
          this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht gespeichert werden!');
        }
      },
      error => {
        this.alertStackModel = AlertStackModel.withDangerMessage('Datensatz konnte nicht aktualisiert werden!');
      });
  }
}
