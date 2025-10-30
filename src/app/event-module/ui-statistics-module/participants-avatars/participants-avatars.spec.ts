import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsAvatars } from './participants-avatars';

describe('ParticipantsAvatars', () => {
  let component: ParticipantsAvatars;
  let fixture: ComponentFixture<ParticipantsAvatars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantsAvatars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantsAvatars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
