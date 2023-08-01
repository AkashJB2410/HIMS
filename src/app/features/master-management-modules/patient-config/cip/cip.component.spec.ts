import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CIPComponent } from './cip.component';

describe('CIPComponent', () => {
  let component: CIPComponent;
  let fixture: ComponentFixture<CIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CIPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
