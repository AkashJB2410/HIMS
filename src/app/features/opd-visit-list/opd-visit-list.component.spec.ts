import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdVisitListComponent } from './opd-visit-list.component';

describe('OpdVisitListComponent', () => {
  let component: OpdVisitListComponent;
  let fixture: ComponentFixture<OpdVisitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdVisitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdVisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
