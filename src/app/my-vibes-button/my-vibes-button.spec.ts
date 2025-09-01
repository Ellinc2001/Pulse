import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVibesButton } from './my-vibes-button';

describe('MyVibesButton', () => {
  let component: MyVibesButton;
  let fixture: ComponentFixture<MyVibesButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyVibesButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVibesButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
