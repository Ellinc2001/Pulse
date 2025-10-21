import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContextCarousel } from './input-context-carousel';

describe('InputContextCarousel', () => {
  let component: InputContextCarousel;
  let fixture: ComponentFixture<InputContextCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputContextCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputContextCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
