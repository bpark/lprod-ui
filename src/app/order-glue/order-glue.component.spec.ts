import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGlueComponent } from './order-glue.component';

describe('OrderGlueComponent', () => {
  let component: OrderGlueComponent;
  let fixture: ComponentFixture<OrderGlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
