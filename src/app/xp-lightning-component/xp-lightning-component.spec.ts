import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpLightningComponent } from './xp-lightning-component';

describe('XpLightningComponent', () => {
  let component: XpLightningComponent;
  let fixture: ComponentFixture<XpLightningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XpLightningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpLightningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
