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
  constructor(private router: Router, private http: SessionService, private messageService: MessageService) {}

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
            this.chooseMethod = false;
            this.emailOrMobileCard = false;
            this.otpScreen = true;
            this.onGetVerificationCode();
          } else if (data.status == "Invalid") {
            this.messageService.add({ severity: 'error', summary: 'Invalid email id ...!', detail: 'Please enter valid credentials.' });
          }
        })
    }
  }

  onGetVerificationCode() {
    this.startTimer();
    this.http.sendOTP(this.inputForm.value)
      .subscribe(data => {
        if (data.status == "sent") {
          this.messageService.add({ severity: 'success', summary: 'OTP sent Successfully.', detail: '' });
          this.chooseMethod = false;
          this.emailOrMobileCard = false;
          this.startTimer();
        } else if (data.status == "fail") {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: 'OTP not sent...!' });
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
          this.otpScreen = false;
          this.resetPassword = true;
        } else if (data.otp == "Invalid") {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid OTP...!' });
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
            this.messageService.add({ severity: 'success', summary: 'Password updated successfully.', detail: '' });
            this.resetPassword = false;
            this.successScreen = true;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong...!', detail: 'Unable to update the password.' });
          }
        })
    }
  }

  backtoSelection() {
    this.chooseMethod = true;
    this.emailOrMobileCard = false;
    this.otpScreen = false;
    this.resetPassword = false;
    this.successScreen = false;
    this.btnDissabled = false;
  }

  backtoSendOTP() {
    this.chooseMethod = false;
    this.emailOrMobileCard = true;
    this.otpScreen = false;
    this.resetPassword = false;
    this.successScreen = false;
    this.btnDissabled = false;
  }

  backtoVerifyOTP() {
    this.chooseMethod = false;
    this.emailOrMobileCard = false;
    this.otpScreen = true;
    this.resetPassword = false;
    this.successScreen = false;
    this.btnDissabled = false;
  }
  backtoLogin(){
    this.chooseMethod = false;
    this.emailOrMobileCard = false;
    this.otpScreen = false;
    this.resetPassword = false;
    this.successScreen = false;
    this.btnDissabled = false;
    this.router.navigateByUrl('login')
  }
}

