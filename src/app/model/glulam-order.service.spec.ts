import { TestBed, inject } from '@angular/core/testing';

import { GlulamOrderService } from './glulam-order.service';

describe('GlulamOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlulamOrderService]
    });
  });

  it('should be created', inject([GlulamOrderService], (service: GlulamOrderService) => {
    expect(service).toBeTruthy();
  }));
});
