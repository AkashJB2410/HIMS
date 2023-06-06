import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodReceiveNoteComponent } from './good-receive-note.component';

describe('GoodReceiveNoteComponent', () => {
  let component: GoodReceiveNoteComponent;
  let fixture: ComponentFixture<GoodReceiveNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodReceiveNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodReceiveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
