import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPressDataComponent } from './order-press-data.component';

describe('OrderPressDataComponent', () => {
  let component: OrderPressDataComponent;
  let fixture: ComponentFixture<OrderPressDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPressDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPressDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
