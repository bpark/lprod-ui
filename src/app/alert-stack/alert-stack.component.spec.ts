import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertStackComponent } from './alert-stack.component';

describe('AlertStackComponent', () => {
  let component: AlertStackComponent;
  let fixture: ComponentFixture<AlertStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
