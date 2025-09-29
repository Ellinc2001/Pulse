import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMetricCard } from './progress-metric-card';

describe('ProgressMetricCard', () => {
  let component: ProgressMetricCard;
  let fixture: ComponentFixture<ProgressMetricCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressMetricCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressMetricCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
