import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DecryptPipe } from 'src/app/core/shared/pipes/encrypt-decrypt.pipe';
import { SessionService } from 'src/app/core/shared/service/session.service';
import { Base64ConverterService } from 'src/app/core/shared/service/base64-converter.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: any
  logindata: any
  editData: any;
  files: any;
  base64Image: any;
  image: any;
  user: any;
  Imageshow = false;
  userID: any;
  chooseMethod: boolean = true;
  emailOrMobileCard: boolean = false;
  otpScreen: boolean = false;
  confirmPassword: FormGroup = new FormGroup({});
  password: any = '';
  repassword: any = '';
  errorMessage: any;
  showSave = false;
  showotp = true
  showVerifyEmail= false;
  showVerifyMobile = false
  emailFlag: boolean = false;
  whatsappflag: boolean = false;
  inputForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNo: new FormControl(''),
  });
 
  constructor(private decrypt: DecryptPipe, private http: SessionService, private base64: Base64ConverterService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.logindata = JSON.parse(this.decrypt.transform(sessionStorage.getItem("loggedUser")))
    this.image = this.logindata.profileImage
    this.userID = this.logindata.userId
    if (this.image != "") {
      this.Imageshow = false;
    } else {
      this.Imageshow = true;
    }
    this.editForm = new FormGroup({
      userNameId: new FormControl(this.logindata.userNameId || "", [Validators.required]),
      mobileNo: new FormControl(this.logindata.mobileNo || "", [Validators.required]),
      emailId: new FormControl(this.logindata.emailId || "", [Validators.required]),
      profileImage: new FormControl(this.logindata.profileImage, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.http.editProfile(this.editForm.getRawValue(), this.userID).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Login', detail: 'Profile updated successfully.' });
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid details' });
    }
  }

  onFileChange(event: any) {
    this.base64.covertToBase64(event.target.files[0]).subscribe(res => {
      this.editForm.get('profileImage').value = res;
    })
  }

  // login() {
  //   this.http.Logincheck(this.loginForm.value)
  //     .subscribe({


  //     });
  // }
  // send otp
  sendOTPButton: boolean = true
  timeLeft: any = 60;
  sendOTP(e: any) {
    this.otpScreen = true;
    this.sendOTPButton = false
  }
  verifyOTP(e: any) {
    this.http.verifyOTP(e, this.inputForm.value).subscribe({
      next: data => {
        if (data.metadata.message == 'OTP is valid for mobile no' || data.metadata.message == 'OTP is valid for email-id') {
          this.otpScreen = true;
          // this.resetPassword = true;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid OTP !',
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
  backtoSendOTP() {
    this.otpScreen = false;
  }
  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }
  onGetVerificationCode() {
    this.startTimer();
    this.http.sendOTP(this.inputForm.value).subscribe({
      next: data => {
        if (data.metadata.message == 'OTP send sucessfully on mobile no.' || data.metadata.message == 'OTP send sucessfully on email-id') {
          this.messageService.add({
            severity: 'success',
            summary: 'OTP sent Successfully.',
            detail: '',
          });
          this.otpScreen = true;
          this.showVerifyEmail = false;
          this.chooseMethod = false;
          this.showVerifyMobile = false;
        
          this.startTimer();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'OTP not sent !',
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
  continueWith(e: any) {
    // this.otpScreen=true;
    if (e == 'email') {
      this.showVerifyMobile = false;
      this.showVerifyEmail = true;
    }
    else{
      this.showVerifyEmail = false;
      this.showVerifyMobile = true;
    }
  }
  
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

}