import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdRegistrationComponent } from './opd-registration.component';

describe('OpdRegistrationComponent', () => {
  let component: OpdRegistrationComponent;
  let fixture: ComponentFixture<OpdRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
