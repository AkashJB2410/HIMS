import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovTypeComponent } from './lov-type.component';

describe('LovTypeComponent', () => {
  let component: LovTypeComponent;
  let fixture: ComponentFixture<LovTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
