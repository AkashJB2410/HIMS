import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedTransderComponent } from './bed-transder.component';

describe('BedTransderComponent', () => {
  let component: BedTransderComponent;
  let fixture: ComponentFixture<BedTransderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedTransderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedTransderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
