import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoClubStatsComponent } from './disco-club-stats-component';

describe('DiscoClubStatsComponent', () => {
  let component: DiscoClubStatsComponent;
  let fixture: ComponentFixture<DiscoClubStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoClubStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoClubStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
