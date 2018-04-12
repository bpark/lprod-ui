import { TestBed, inject } from '@angular/core/testing';

import { JwtTokenStoreService } from './jwt-token-store.service';

describe('JwtTokenStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtTokenStoreService]
    });
  });

  it('should be created', inject([JwtTokenStoreService], (service: JwtTokenStoreService) => {
    expect(service).toBeTruthy();
  }));
});
