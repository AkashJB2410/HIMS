import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRadiologyConfirmationComponent } from './quick-radiology-confirmation.component';

describe('QuickRadiologyConfirmationComponent', () => {
  let component: QuickRadiologyConfirmationComponent;
  let fixture: ComponentFixture<QuickRadiologyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickRadiologyConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickRadiologyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
