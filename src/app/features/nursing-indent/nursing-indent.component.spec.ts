import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingIndentComponent } from './nursing-indent.component';

describe('NursingIndentComponent', () => {
  let component: NursingIndentComponent;
  let fixture: ComponentFixture<NursingIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingIndentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
