import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingConsoleComponent } from './nursing-console.component';

describe('NursingConsoleComponent', () => {
  let component: NursingConsoleComponent;
  let fixture: ComponentFixture<NursingConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
