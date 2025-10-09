import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCircle } from './rating-circle';

describe('RatingCircle', () => {
  let component: RatingCircle;
  let fixture: ComponentFixture<RatingCircle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingCircle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingCircle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
