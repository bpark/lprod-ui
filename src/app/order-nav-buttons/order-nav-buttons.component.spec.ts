import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNavButtonsComponent } from './order-nav-buttons.component';

describe('OrderNavButtonsComponent', () => {
  let component: OrderNavButtonsComponent;
  let fixture: ComponentFixture<OrderNavButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNavButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
