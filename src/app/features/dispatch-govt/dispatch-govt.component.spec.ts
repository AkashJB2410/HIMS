import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchGovtComponent } from './dispatch-govt.component';

describe('DispatchGovtComponent', () => {
  let component: DispatchGovtComponent;
  let fixture: ComponentFixture<DispatchGovtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchGovtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchGovtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
