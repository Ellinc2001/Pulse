import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteHistogramCard } from './discrete-histogram-card';

describe('DiscreteHistogramCard', () => {
  let component: DiscreteHistogramCard;
  let fixture: ComponentFixture<DiscreteHistogramCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscreteHistogramCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteHistogramCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
