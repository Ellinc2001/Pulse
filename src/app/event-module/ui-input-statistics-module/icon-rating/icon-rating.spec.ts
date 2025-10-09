import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconRating } from './icon-rating';

describe('IconRating', () => {
  let component: IconRating;
  let fixture: ComponentFixture<IconRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
