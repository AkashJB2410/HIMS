import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaspathalReportComponent } from './haspathal-report.component';

describe('HaspathalReportComponent', () => {
  let component: HaspathalReportComponent;
  let fixture: ComponentFixture<HaspathalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaspathalReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaspathalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
