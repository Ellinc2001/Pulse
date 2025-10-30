import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatChoice } from './format-choice';

describe('FormatChoice', () => {
  let component: FormatChoice;
  let fixture: ComponentFixture<FormatChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormatChoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatChoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
