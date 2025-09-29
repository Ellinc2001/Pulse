import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedProgressCard } from './stacked-progress-card';

describe('StackedProgressCard', () => {
  let component: StackedProgressCard;
  let fixture: ComponentFixture<StackedProgressCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StackedProgressCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedProgressCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
