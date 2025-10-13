import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitTimePills } from './wait-time-pills';

describe('WaitTimePills', () => {
  let component: WaitTimePills;
  let fixture: ComponentFixture<WaitTimePills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitTimePills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitTimePills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
