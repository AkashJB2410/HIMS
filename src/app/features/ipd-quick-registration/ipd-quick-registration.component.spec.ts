import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdQuickRegistrationComponent } from './ipd-quick-registration.component';

describe('IpdQuickRegistrationComponent', () => {
  let component: IpdQuickRegistrationComponent;
  let fixture: ComponentFixture<IpdQuickRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdQuickRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdQuickRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
