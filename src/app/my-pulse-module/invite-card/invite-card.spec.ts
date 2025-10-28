import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCard } from './invite-card';

describe('InviteCard', () => {
  let component: InviteCard;
  let fixture: ComponentFixture<InviteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
