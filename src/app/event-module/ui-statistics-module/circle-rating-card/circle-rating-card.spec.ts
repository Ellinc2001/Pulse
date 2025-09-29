import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleRatingCard } from './circle-rating-card';

describe('CircleRatingCard', () => {
  let component: CircleRatingCard;
  let fixture: ComponentFixture<CircleRatingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleRatingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleRatingCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
