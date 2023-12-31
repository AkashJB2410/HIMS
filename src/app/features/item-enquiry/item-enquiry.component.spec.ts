import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEnquiryComponent } from './item-enquiry.component';

describe('ItemEnquiryComponent', () => {
  let component: ItemEnquiryComponent;
  let fixture: ComponentFixture<ItemEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEnquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
