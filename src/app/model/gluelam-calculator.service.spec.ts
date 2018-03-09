import { TestBed, inject } from '@angular/core/testing';

import { GluelamCalculatorService } from './gluelam-calculator.service';

describe('GluelamCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GluelamCalculatorService]
    });
  });

  it('should be created', inject([GluelamCalculatorService], (service: GluelamCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
