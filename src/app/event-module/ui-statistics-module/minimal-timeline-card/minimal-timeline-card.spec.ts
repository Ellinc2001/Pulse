import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalTimelineCard } from './minimal-timeline-card';

describe('MinimalTimelineCard', () => {
  let component: MinimalTimelineCard;
  let fixture: ComponentFixture<MinimalTimelineCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinimalTimelineCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimalTimelineCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
