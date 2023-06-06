import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdmissionRequestComponent } from './new-admission-request.component';

describe('NewAdmissionRequestComponent', () => {
  let component: NewAdmissionRequestComponent;
  let fixture: ComponentFixture<NewAdmissionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdmissionRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAdmissionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
