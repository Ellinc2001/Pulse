import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartCard } from './donut-chart-card';

describe('DonutChartCard', () => {
  let component: DonutChartCard;
  let fixture: ComponentFixture<DonutChartCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonutChartCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutChartCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
