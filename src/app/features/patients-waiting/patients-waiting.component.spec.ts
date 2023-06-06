import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsWaitingComponent } from './patients-waiting.component';

describe('PatientsWaitingComponent', () => {
  let component: PatientsWaitingComponent;
  let fixture: ComponentFixture<PatientsWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsWaitingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
