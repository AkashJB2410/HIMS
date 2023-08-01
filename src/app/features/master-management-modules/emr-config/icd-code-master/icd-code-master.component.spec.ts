import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdCodeMasterComponent } from './icd-code-master.component';

describe('IcdCodeMasterComponent', () => {
  let component: IcdCodeMasterComponent;
  let fixture: ComponentFixture<IcdCodeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcdCodeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcdCodeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
