import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReEnterComponent } from './re-enter.component';

describe('ReEnterComponent', () => {
  let component: ReEnterComponent;
  let fixture: ComponentFixture<ReEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReEnterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
