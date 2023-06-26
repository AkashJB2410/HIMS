import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../shared/service/session.service';
import findEmailData from './findEmail.json';
import getVerificationCodeData from './getVerificationCode.json';
import accountRecoveryData from './accountRecovery.json';
import welcomeBackData from './welcomeBack.json';
import changePasswordData from './changePassword.json';
import { MessageService } from 'primeng/api';
import data from './changePassword.json'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
    .wrapper-1 {      
      background-color: #B8C0CC;
    }
  `,
  ],
})

export class ForgotPasswordComponent implements OnInit {
  list: any;
  findEmailList: any;
  getVerificationCodeList: any;
  verificationformData: any[] = [];
  accountRecoveryList: any;
  accountformData: any[] = [];
  changePasswordFormData: any[] = [];
  welcomeBackList: any;
  btnContentList: any;
  changePasswordList: any;
  varFindEmail = false;
  varGetVerificationCode = false;
  varAccountRecovery = false;
  varWelcomeBack = false;
  varChangePassword = false;
  public obj: any = {};
  submitted = false;
  submittedEmail = false;
  submittedCode = false;
  submittedPass = false;
  controlsEmail = {};
  controlsCode = {};
  controlsPassword = {};
  varEmailId = '';
  varOTP = '';
  varPassword = '';
  goubleEmailVar: any;
  spinnerFlag = false;
  confirmedPass: any;
  mobileOrEmail: any;
  forgotpassword: any;
  mobileIsPresent = false;

  inputForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNo: new FormControl('')
  });
  timeLeft: any = 60;
  chooseMethod: boolean = true;
  emailFlag: boolean = false;
  emailOrMobileCard: boolean = false;
  otpScreen: boolean = false;
  resetPassword: boolean = false;
  successScreen: boolean = false;
  btnDissabled: boolean = false;
  confirmPassword: FormGroup = new FormGroup({});
  password: any = '';
  repassword: any = '';
  constructor(private router: Router, private http: SessionService, private messageService: MessageService) {
    this.findEmailList = findEmailData;
    this.getVerificationCodeList = getVerificationCodeData;
    this.accountRecoveryList = accountRecoveryData;
    this.welcomeBackList = welcomeBackData;
    this.changePasswordList = changePasswordData;
  }

  ngOnInit(): void {
  }

  continueWith(e: any) {
    if (e == "email") {
      this.emailFlag = true;
    } else {
      this.emailFlag = false;
    }
    this.emailOrMobileCard = true;
  }

  onSubmitEmail() {
    if (this.inputForm.value) {
      this.http.verifyEmailId(this.inputForm.value)
        .subscribe(data => {
          if (data.status == "Valid") {
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Valid email id' });
            this.chooseMethod = false;
            this.emailOrMobileCard = false;
            this.otpScreen = true;
            this.onGetVerificationCode();
          } else if (data.status == "Invalid") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email id ...!' });
            this.mobileIsPresent = false;
          }
        })
    }
  }

  onGetVerificationCode() {
    this.startTimer();
    this.http.sendOTP(this.inputForm.value)
      .subscribe(data => {
        if (data.status == "sent") {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'OTP sent Successfully.' });
          this.chooseMethod = false;
          this.emailOrMobileCard = false;
          this.startTimer();
        } else if (data.status == "fail") {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'OTP Not Sent Something Went Wrong!!' });
        }
      })
  }

  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000)
  }

  verifyOTP(e: any) {
    this.http.verifyOTP(e, this.inputForm.value)
      .subscribe(data => {
        if (data.otp == "Valid") {
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'Valid OTP.' });
          this.otpScreen = false;
          this.resetPassword = true;
        } else if (data.otp == "Invalid") {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid OTP !!' });
          this.mobileIsPresent = false;
        }
      })
  }

  pass(e: any) {
    this.password = e.target.value;
    if (this.repassword != '') {
      if (this.password != this.repassword) {
      }
    }
  }

  repass(e: any) {
    this.repassword = e.target.value;
    if (this.password == this.repassword) {
      this.btnDissabled = false;
    } else {
      this.btnDissabled = true;
    }
  }

  cnfPassword() {
    if (!this.btnDissabled) {
      this.http.updatePassword(this.inputForm.value, this.repassword)
        .subscribe(data => {
          if (data.update == "success") {
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Update the password successfully.' });
            this.resetPassword = false;
            this.successScreen = true;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'unable to update the password. !!' });
          }
        })
    }
  }
}

