import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAbhaIdComponent } from './create-abha-id.component';

describe('CreateAbhaIdComponent', () => {
  let component: CreateAbhaIdComponent;
  let fixture: ComponentFixture<CreateAbhaIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAbhaIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAbhaIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
