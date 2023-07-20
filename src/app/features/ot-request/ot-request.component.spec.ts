import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtRequestComponent } from './ot-request.component';

describe('OtRequestComponent', () => {
  let component: OtRequestComponent;
  let fixture: ComponentFixture<OtRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
