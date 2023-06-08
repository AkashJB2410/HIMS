import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyCofirmationComponent } from './radiology-cofirmation.component';

describe('RadiologyCofirmationComponent', () => {
  let component: RadiologyCofirmationComponent;
  let fixture: ComponentFixture<RadiologyCofirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyCofirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologyCofirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
