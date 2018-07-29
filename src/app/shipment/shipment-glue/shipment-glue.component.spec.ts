import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentGlueComponent } from './shipment-glue.component';

describe('ShipmentGlueComponent', () => {
  let component: ShipmentGlueComponent;
  let fixture: ComponentFixture<ShipmentGlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentGlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentGlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
