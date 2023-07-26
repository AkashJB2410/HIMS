import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DecryptPipe } from 'src/app/core/shared/pipes/encrypt-decrypt.pipe';
import { SessionService } from 'src/app/core/shared/service/session.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


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
  inputForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNo: new FormControl(''),
  });
  logindata: any;
  mobileNo: any;
  constructor(
    private router: Router,
    private http: SessionService,
    private messageService: MessageService,
    private decrypt: DecryptPipe
  ) { }

  ngOnInit(): void {
    this.logindata = JSON.parse(this.decrypt.transform(sessionStorage.getItem("loggedUser")))
  }

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
        .updatePassword( this.logindata, this.repassword)
        .subscribe({
          next: data => {
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
          error: error => {
            this.errorMessage = error.message;
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
              detail: this.errorMessage,
            });
          }

        });
    }
  
  }



  backtoVerifyOTP() {
    this.chooseMethod = false;
    this.emailOrMobileCard = false;
    this.otpScreen = true;
    this.resetPassword = false;
    this.successScreen = false;
    this.btnDissabled = false;
  }


}
