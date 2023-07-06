import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpetialityComponent } from './spetiality.component';

describe('SpetialityComponent', () => {
  let component: SpetialityComponent;
  let fixture: ComponentFixture<SpetialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpetialityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpetialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
