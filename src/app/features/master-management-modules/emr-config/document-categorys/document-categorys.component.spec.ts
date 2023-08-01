import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategorysComponent } from './document-categorys.component';

describe('DocumentCategorysComponent', () => {
  let component: DocumentCategorysComponent;
  let fixture: ComponentFixture<DocumentCategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCategorysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
