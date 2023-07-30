import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSpecialityComponent } from './super-speciality.component';

describe('SuperSpecialityComponent', () => {
  let component: SuperSpecialityComponent;
  let fixture: ComponentFixture<SuperSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSpecialityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
