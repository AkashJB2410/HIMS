import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovValueComponent } from './lov-value.component';

describe('LovValueComponent', () => {
  let component: LovValueComponent;
  let fixture: ComponentFixture<LovValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LovValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
