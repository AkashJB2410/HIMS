import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionModuleComponent } from './action-module.component';

describe('ActionModuleComponent', () => {
  let component: ActionModuleComponent;
  let fixture: ComponentFixture<ActionModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
