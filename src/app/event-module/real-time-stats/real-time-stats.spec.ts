import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeStatsComponent } from './real-time-stats';

describe('RealTimeStats', () => {
  let component: RealTimeStatsComponent;
  let fixture: ComponentFixture<RealTimeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealTimeStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
