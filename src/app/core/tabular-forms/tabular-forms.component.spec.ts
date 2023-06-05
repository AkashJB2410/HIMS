import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularFormsComponent } from './tabular-forms.component';

describe('TabularFormsComponent', () => {
  let component: TabularFormsComponent;
  let fixture: ComponentFixture<TabularFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabularFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabularFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
