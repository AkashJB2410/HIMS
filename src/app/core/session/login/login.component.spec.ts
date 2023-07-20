import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EncryptPipe } from '../../shared/pipes/encrypt-decrypt.pipe';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  var orgList: any = [];
  let mockLoginService: any;
  let mockMessageService: any;
  let mockRouter: any;
  let mockEncryptPipe: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [MessageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockMessageService = new MessageService();
    mockLoginService = jasmine.createSpyObj(['Logincheck']);
    mockEncryptPipe = new EncryptPipe();
    component = new LoginComponent(mockRouter, mockMessageService, mockLoginService, mockEncryptPipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bring organization data', () => {
    let email = "abc@mail.com";
    let orgDefault = {
      "organization_Id": "",
      "organization_Type": "Select an option"
    };
    let org= {
      "organization_Id": "1",
      "organization_Type": "JNK"
    };
    mockLoginService.Logincheck.and.returnValue(true);
    orgList.push(orgDefault);
    orgList.push(org);
    component.getOrganiszation(email);
    expect(orgList.length).toBe(2);
  });
});
