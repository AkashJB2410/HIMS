import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import findEmailData from './findEmail.json';
import getVerificationCodeData from './getVerificationCode.json';
import accountRecoveryData from './accountRecovery.json';
import welcomeBackData from './welcomeBack.json';
import changePasswordData from './changePassword.json';
import { MessageService } from 'primeng/api';
import { SessionService } from '../../shared/service/session.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
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
  goubleMobileNo: any;
  getCode: any;
  spinnerFlag = false;
  confirmedPass: any;
  mobileOrEmail: any;
  mobileIsPresent = false;
  constructor(private router: Router, private http: SessionService, private messageService: MessageService) {
    this.findEmailList = findEmailData;
    this.getVerificationCodeList = getVerificationCodeData;
    this.accountRecoveryList = accountRecoveryData;
    this.welcomeBackList = welcomeBackData;
    this.changePasswordList = changePasswordData;
  }

  ngOnInit(): void {
  }

  onSubmitEmail(e: any) {
    if (e.emailMobileNo.charAt(0) == '+') {
      console.log("inside if block");
      this.http.verifyEmailId(e.emailMobileNo)
        .subscribe(data => {
          console.log(data);

          if (data.status == "Valid") {
            this.goubleMobileNo = e.emailMobileNo;
            this.verificationformData = this.getVerificationCodeList.form
            Object.entries(this.verificationformData).forEach(([key, value]) => {
              if (key == "formControls") {
                Object.entries(value).forEach((e: any) => {
                  e.forEach((a: any) => {
                    if (a.formControlName == "note3") {
                      a.data = this.goubleMobileNo;
                    }
                  })
                })
              }
            })
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Valid Mobile NO.' });
            this.varFindEmail = true;
            this.mobileIsPresent = true;
            this.varGetVerificationCode = true;
          } else if (data.status == "Invalid") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Mobile NO. !!' });
            this.mobileIsPresent = false;
          }
        })
    }
    else {
      this.http.verifyEmailId(e.emailMobileNo)
        .subscribe(data => {
          if (data.status == "Valid") {
            this.goubleEmailVar = e.emailMobileNo;
            this.verificationformData = this.getVerificationCodeList.form
            Object.entries(this.verificationformData).forEach(([key, value]) => {
              if (key == "formControls") {
                Object.entries(value).forEach((e: any) => {
                  e.forEach((a: any) => {
                    if (a.formControlName == "note3") {
                      a.data = this.goubleEmailVar;
                    }
                  })
                })
              }
            })
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Valid Email ID' });
            this.varFindEmail = true;
            this.varGetVerificationCode = true;
          } else if (data.status == "Invalid") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Email ID !!' });
          }
        })
    }
  }

  onGetVerificationCode(e: any) {
    this.getCode = e;
    if (e == 'cancel') {
      this.router.navigateByUrl('');
    } else if (this.mobileIsPresent) {
      this.spinnerFlag = true;
      this.http.sendOTP(this.goubleMobileNo)
        .subscribe(data => {
          console.log(data);
          if (data.status == "sent") {
            console.log("sent otp");
            this.accountformData = this.accountRecoveryList.form
            Object.entries(this.accountformData).forEach(([key, value]) => {
              if (key == "formControls") {
                Object.entries(value).forEach((e: any) => {
                  e.forEach((a: any) => {
                    if (a.formControlName == "note3") {
                      a.data = this.goubleMobileNo;
                      console.log("account Note 3 ==>>", a.data);

                    }
                  })
                })
              }
            })
            this.spinnerFlag = false;
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'OTP sent Successfully.' });
            this.varFindEmail = true;
            this.mobileIsPresent = true;
            this.varGetVerificationCode = false;
            this.varAccountRecovery = true;
          }
          else if (data.status == "fail") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'OTP Not Sent Something Went Wrong!!' });
            this.mobileIsPresent = false;
          }
        })
    }
    else {
      this.spinnerFlag = true;
      this.http.sendOTP(this.goubleEmailVar)
        .subscribe(data => {
          if (data.status == "sent") {
            this.accountformData = this.accountRecoveryList.form
            Object.entries(this.accountformData).forEach(([key, value]) => {
              if (key == "formControls") {
                Object.entries(value).forEach((e: any) => {
                  e.forEach((a: any) => {
                    if (a.formControlName == "note3") {
                      a.data = this.goubleEmailVar;
                      console.log("account Note 3 ==>>", a.data);
                    }
                  })
                })
              }
            })
            this.spinnerFlag = false;
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'OTP sent Successfully.' });
            this.varFindEmail = true;
            this.varGetVerificationCode = false;
            this.varAccountRecovery = true;

          } else if (data.status == "fail") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'OTP Not Sent Something Went Wrong!!' });
          }
        })
    }
  }

  onAccountRecovery(e: any) {
    if (this.mobileIsPresent) {
      this.http.verifyOTP(e.code, this.goubleMobileNo)
        .subscribe(data => {
          if (data.otp == "Valid") {
            this.changePasswordFormData = this.changePasswordList.form
            Object.entries(this.changePasswordFormData).forEach(([key, value]) => {
              if (key == "formControls") {
                Object.entries(value).forEach((e: any) => {
                  e.forEach((a: any) => {
                    if (a.formControlName == "note1") {
                      a.data = this.goubleMobileNo;
                      console.log("account Note 1 ==>>", a.data);
                    }
                  })
                })
              }
            })
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Valid OTP.' });
            this.varFindEmail = true;
            this.varGetVerificationCode = false;
            this.mobileIsPresent = true;
            this.varAccountRecovery = false;
            this.varChangePassword = true;

          } else if (data.otp == "Invalid") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid OTP !!' });
            this.mobileIsPresent = false;
          }
        })
    }
    else {
      this.http.verifyOTP(e.code, this.goubleEmailVar)
        .subscribe(data => {
          if (data.otp == "Valid") {
            this.changePasswordFormData = this.changePasswordList.form
            Object.entries(this.changePasswordFormData).forEach(([key, value]) => {
              if (key == "formControls") {
                Object.entries(value).forEach((e: any) => {
                  e.forEach((a: any) => {
                    if (a.formControlName == "note1") {
                      a.data = this.goubleEmailVar;
                      console.log("account Note 1 ==>>", a.data);
                    }
                  })
                })
              }
            })
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Valid OTP.' });
            this.varFindEmail = true;
            this.varGetVerificationCode = false;
            this.varAccountRecovery = false;
            this.varChangePassword = true;

          } else if (data.otp == "Invalid") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid OTP !!' });
          }
        })
    }
  }

  cnfPassword(e: any) {
    this.confirmedPass = e.password;
  }
  onSavePassword(e: any) {
    if (this.mobileIsPresent) {
      this.http.updatePassword(this.goubleMobileNo, this.confirmedPass)
        .subscribe(data => {
          if (data.update == "sucess") {
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Update the password successfully.' });
            this.router.navigateByUrl('');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'unable to update the password. !!' });
          }
        })
    }
    else {
      this.http.updatePassword(this.goubleEmailVar, this.confirmedPass)
        .subscribe(data => {
          if (data.update == "sucess") {
            this.messageService.add({ severity: 'success', summary: 'success', detail: 'Update the password successfully.' });
            this.router.navigateByUrl('');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'unable to update the password. !!' });
          }
        })
    }
  }
}

