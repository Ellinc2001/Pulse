import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsModal } from './participants-modal';

describe('ParticipantsModal', () => {
  let component: ParticipantsModal;
  let fixture: ComponentFixture<ParticipantsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
