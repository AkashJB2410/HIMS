import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperGridComponent } from './super-grid.component';

describe('SuperGridComponent', () => {
  let component: SuperGridComponent;
  let fixture: ComponentFixture<SuperGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
