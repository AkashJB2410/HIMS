import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmgApplicationFormComponent } from './emg-application-form.component';

describe('EmgApplicationFormComponent', () => {
  let component: EmgApplicationFormComponent;
  let fixture: ComponentFixture<EmgApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmgApplicationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmgApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
