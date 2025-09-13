import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideos } from './live-videos';

describe('LiveVideos', () => {
  let component: LiveVideos;
  let fixture: ComponentFixture<LiveVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveVideos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
