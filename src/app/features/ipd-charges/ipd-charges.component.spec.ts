import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdChargesComponent } from './ipd-charges.component';

describe('IpdChargesComponent', () => {
  let component: IpdChargesComponent;
  let fixture: ComponentFixture<IpdChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
