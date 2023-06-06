import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdApplicationFormComponent } from './opd-application-form.component';

describe('OpdApplicationFormComponent', () => {
  let component: OpdApplicationFormComponent;
  let fixture: ComponentFixture<OpdApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdApplicationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
