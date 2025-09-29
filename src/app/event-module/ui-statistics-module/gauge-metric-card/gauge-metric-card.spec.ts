import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeMetricCard } from './gauge-metric-card';

describe('GaugeMetricCard', () => {
  let component: GaugeMetricCard;
  let fixture: ComponentFixture<GaugeMetricCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaugeMetricCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaugeMetricCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
