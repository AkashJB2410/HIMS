import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdApplicationFormComponent } from './ipd-application-form.component';

describe('IpdApplicationFormComponent', () => {
  let component: IpdApplicationFormComponent;
  let fixture: ComponentFixture<IpdApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdApplicationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
