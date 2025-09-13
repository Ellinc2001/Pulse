import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEventDetail } from './live-event-detail';

describe('LiveEventDetail', () => {
  let component: LiveEventDetail;
  let fixture: ComponentFixture<LiveEventDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveEventDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveEventDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
