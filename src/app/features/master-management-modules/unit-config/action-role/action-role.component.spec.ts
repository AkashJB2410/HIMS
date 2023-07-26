import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRoleComponent } from './action-role.component';

describe('ActionRoleComponent', () => {
  let component: ActionRoleComponent;
  let fixture: ComponentFixture<ActionRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
