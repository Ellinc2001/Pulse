import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonGroup } from './icon-button-group';

describe('IconButtonGroup', () => {
  let component: IconButtonGroup;
  let fixture: ComponentFixture<IconButtonGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconButtonGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
