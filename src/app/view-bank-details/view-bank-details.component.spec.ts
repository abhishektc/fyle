import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewBankDetailsComponent } from './view-bank-details.component';

describe('ViewBankDetailsComponent', () => {
  let component: ViewBankDetailsComponent;
  let fixture: ComponentFixture<ViewBankDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
