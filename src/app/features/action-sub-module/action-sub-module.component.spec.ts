import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSubModuleComponent } from './action-sub-module.component';

describe('ActionSubModuleComponent', () => {
  let component: ActionSubModuleComponent;
  let fixture: ComponentFixture<ActionSubModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSubModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionSubModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
