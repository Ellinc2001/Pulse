import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileModal } from './user-profile-modal';

describe('UserProfileModal', () => {
  let component: UserProfileModal;
  let fixture: ComponentFixture<UserProfileModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
