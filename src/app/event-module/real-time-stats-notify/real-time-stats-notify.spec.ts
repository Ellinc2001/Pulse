import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeStatsNotify } from './real-time-stats-notify';

describe('RealTimeStatsNotify', () => {
  let component: RealTimeStatsNotify;
  let fixture: ComponentFixture<RealTimeStatsNotify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealTimeStatsNotify]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeStatsNotify);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
