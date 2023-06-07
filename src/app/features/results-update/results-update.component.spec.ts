import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsUpdateComponent } from './results-update.component';

describe('ResultsUpdateComponent', () => {
  let component: ResultsUpdateComponent;
  let fixture: ComponentFixture<ResultsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
