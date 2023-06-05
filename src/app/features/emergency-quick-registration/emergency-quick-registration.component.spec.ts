import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyQuickRegistrationComponent } from './emergency-quick-registration.component';

describe('EmergencyQuickRegistrationComponent', () => {
  let component: EmergencyQuickRegistrationComponent;
  let fixture: ComponentFixture<EmergencyQuickRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyQuickRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyQuickRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
