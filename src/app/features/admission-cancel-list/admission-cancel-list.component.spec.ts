import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionCancelListComponent } from './admission-cancel-list.component';

describe('AdmissionCancelListComponent', () => {
  let component: AdmissionCancelListComponent;
  let fixture: ComponentFixture<AdmissionCancelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionCancelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionCancelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
