import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class JwtTokenStoreService {

  token: string;

  constructor() { }

  createTokenHeader(): HttpHeaders {
    return new HttpHeaders({'Authorization': 'Bearer ' + this.token});
  }
}
