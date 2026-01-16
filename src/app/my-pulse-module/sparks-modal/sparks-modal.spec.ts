import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparksModal } from './sparks-modal';

describe('SparksModal', () => {
  let component: SparksModal;
  let fixture: ComponentFixture<SparksModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SparksModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparksModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
