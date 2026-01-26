import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkStatsComponent } from './talk-stats-component';

describe('TalkStats', () => {
  let component: TalkStatsComponent;
  let fixture: ComponentFixture<TalkStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalkStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
