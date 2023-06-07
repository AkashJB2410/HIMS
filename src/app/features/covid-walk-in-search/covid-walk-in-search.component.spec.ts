import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidWalkInSearchComponent } from './covid-walk-in-search.component';

describe('CovidWalkInSearchComponent', () => {
  let component: CovidWalkInSearchComponent;
  let fixture: ComponentFixture<CovidWalkInSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidWalkInSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidWalkInSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
