import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeStats } from './real-time-stats';

describe('RealTimeStats', () => {
  let component: RealTimeStats;
  let fixture: ComponentFixture<RealTimeStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealTimeStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
