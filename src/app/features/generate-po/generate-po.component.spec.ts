import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePoComponent } from './generate-po.component';

describe('GeneratePoComponent', () => {
  let component: GeneratePoComponent;
  let fixture: ComponentFixture<GeneratePoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
