import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChoice } from './filter-choice';

describe('FilterChoice', () => {
  let component: FilterChoice;
  let fixture: ComponentFixture<FilterChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterChoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterChoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
