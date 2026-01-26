import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoworkingStatsComponent } from './coworking-stats-component';

describe('CoworkingStatsComponent', () => {
  let component: CoworkingStatsComponent;
  let fixture: ComponentFixture<CoworkingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoworkingStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoworkingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
