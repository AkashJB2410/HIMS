import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../shared/service/session.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [ `.wrapper-1 { background-color: #b8c0cc; }`, ],
})

export class ForgotPasswordComponent implements OnInit {
  inputForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNo: new FormControl(''),
  });

  timeLeft: any = 60;
  chooseMethod: boolean = true;
  emailFlag: boolean = false;
  whatsappflag: boolean = false;
  emailOrMobileCard: boolean = false;
  otpScreen: boolean = false;
  resetPassword: boolean = false;
  successScreen: boolean = false;
  btnDissabled: boolean = false;
  confirmPassword: FormGroup = new FormGroup({});
  password: any = '';
  repassword: any = '';
  errorMessage: any;
  
  constructor(
    private router: Router,
    private http: SessionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  // To change the screen
  continueWith(e: any) {
    if (e == 'email') {
      this.emailFlag = true;
      this.whatsappflag = false;
    } else if (e == 'whatsapp') {
      this.whatsappflag = true;
      this.emailFlag = false;
    } else {
      this.emailFlag = false;
      this.whatsappflag = false;
    }
    this.emailOrMobileCard = true;
  }


  // To check entered number or email is present in database or not
  onSubmitEmail() {
    if (this.whatsappflag == true) {
      this.inputForm.value.mobileNo =
        'whatsapp:+91' + this.inputForm.value.mobileNo;
    }
    this.http.verifyEmailId(this.inputForm.value).subscribe({
      next:data=>{
        if ( data.metadata.message == 'Valid Mobile No' || data.metadata.message == 'Valid EmailId' ) {
          this.chooseMethod = false;
          this.emailOrMobileCard = false;
          
          this.onGetVerificationCode();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Invalid credentials!',
            detail: 'Please enter valid credentials !',
          });
        }
      },
      error: error=>{
        this.errorMessage = error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: this.errorMessage,
        });

      }
        
      
    });
  }


  // To send OTP to the verified number or email Id
  onGetVerificationCode() {
    this.startTimer();
    this.http.sendOTP(this.inputForm.value).subscribe({
      next:data=>{
        if (data.metadata.message == 'OTP send sucessfully on mobile no.' || data.metadata.message == 'OTP send sucessfully on email-id' ) {
          this.messageService.add({
            severity: 'success',
            summary: 'OTP sent Successfully.',
            detail: '',
          });
          this.otpScreen = true;
          this.chooseMethod = false;
          this.emailOrMobileCard = false;
          this.startTimer();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'OTP not sent !',
          });
          this.emailOrMobileCard = true;
        }
      },
      error:error=>{
        this.errorMessage = error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: this.errorMessage,
        });
      }      
    });
  }

  // Start timer to enter OTP
  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }

  // Tp check entered OTP is valid or not
  verifyOTP(e: any) {
    this.http.verifyOTP(e, this.inputForm.value).subscribe({
      next:data=>{
        if ( data.metadata.message == 'OTP is valid for mobile no' || data.metadata.message == 'OTP is valid for email-id' ) {
          this.otpScreen = false;
          this.resetPassword = true;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid OTP !',
          });
        }
      },
      error:error=>{
        this.errorMessage = error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: this.errorMessage,
        });
      }
    });
    
  }

  //To check Confirm password first field
  pass(e: any) {
    this.password = e.target.value;
    if (this.repassword != '') {
      if (this.password != this.repassword) {
      }
    }
  }

  //To check Confirm password second field
  repass(e: any) {
    this.repassword = e.target.value;
    if (this.password == this.repassword) {
      this.btnDissabled = false;
    } else {
      this.btnDissabled = true;
    }
  }

  // To confirm password
  cnfPassword() {
    if (!this.btnDissabled) {
      this.http
        .updatePassword(this.inputForm.value, this.repassword)
        .subscribe({
          next:data=>{
            if (data.metadata.message == 'Password Update Sucessfully') {
              this.messageService.add({
                severity: 'success',
                summary: 'Password updated successfully.',
                detail: '',
              });
              this.resetPassword = false;
              this.successScreen = true;
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Something went wrong...!',
                detail: 'Unable to update the password.',
              });
            }
          },
          error:error=>{
            this.errorMessage = error.message;
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
              detail: this.errorMessage,
            });
          }
          
        });
    }
    this.inputForm.value.mobileNo ='';
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

  backtoLogin() {
    this.chooseMethod = false;
    this.emailOrMobileCard = false;
    this.otpScreen = false;
    this.resetPassword = false;
    this.successScreen = false;
    this.btnDissabled = false;
    this.router.navigateByUrl('login');
  }
}
