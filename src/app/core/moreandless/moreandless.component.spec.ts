import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreandlessComponent } from './moreandless.component';

describe('MoreandlessComponent', () => {
  let component: MoreandlessComponent;
  let fixture: ComponentFixture<MoreandlessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreandlessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreandlessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
