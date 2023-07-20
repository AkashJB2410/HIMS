import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMortemCertificateComponent } from './post-mortem-certificate.component';

describe('PostMortemCertificateComponent', () => {
  let component: PostMortemCertificateComponent;
  let fixture: ComponentFixture<PostMortemCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMortemCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMortemCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
