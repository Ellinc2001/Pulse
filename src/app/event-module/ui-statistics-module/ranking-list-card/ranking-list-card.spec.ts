import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingListCard } from './ranking-list-card';

describe('RankingListCard', () => {
  let component: RankingListCard;
  let fixture: ComponentFixture<RankingListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
