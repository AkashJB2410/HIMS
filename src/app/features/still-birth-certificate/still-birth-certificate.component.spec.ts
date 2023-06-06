import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillBirthCertificateComponent } from './still-birth-certificate.component';

describe('StillBirthCertificateComponent', () => {
  let component: StillBirthCertificateComponent;
  let fixture: ComponentFixture<StillBirthCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StillBirthCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StillBirthCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
