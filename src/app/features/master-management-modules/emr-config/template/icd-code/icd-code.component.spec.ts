import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdCodeComponent } from './icd-code.component';

describe('IcdCodeComponent', () => {
  let component: IcdCodeComponent;
  let fixture: ComponentFixture<IcdCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcdCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcdCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
