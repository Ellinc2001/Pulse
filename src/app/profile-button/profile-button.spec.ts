import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButton } from './profile-button';

describe('ProfileButton', () => {
  let component: ProfileButton;
  let fixture: ComponentFixture<ProfileButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
