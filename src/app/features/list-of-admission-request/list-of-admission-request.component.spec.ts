import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAdmissionRequestComponent } from './list-of-admission-request.component';

describe('ListOfAdmissionRequestComponent', () => {
  let component: ListOfAdmissionRequestComponent;
  let fixture: ComponentFixture<ListOfAdmissionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAdmissionRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfAdmissionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
