import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTabularComponent } from './vertical-tabular.component';

describe('VerticalTabularComponent', () => {
  let component: VerticalTabularComponent;
  let fixture: ComponentFixture<VerticalTabularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalTabularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
