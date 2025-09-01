import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompassSearchButton } from './compass-search-button';

describe('CompassSearchButton', () => {
  let component: CompassSearchButton;
  let fixture: ComponentFixture<CompassSearchButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompassSearchButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompassSearchButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
