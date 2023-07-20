import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import selfRegForm from './selfRegForm.json';
import selfRegbreadcrumb from './selfReg_breadcrumb.json';
import tabular from './selfRegTabular.json';
import addressForm from './AddressForm.json';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { SelfRegistrationService } from './self-registration.service';
import { Router } from '@angular/router';
import selfTable from './selfRegTable.json'
import { FormService } from 'src/app/core/shared/service/form.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.css']
})
export class SelfRegistrationComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  selfRegFormData: any = selfRegForm;
  selfRegbreadcrumb = selfRegbreadcrumb
  configurations: any;
  data: any;
  isdataReady = false;
  SelfRegData: any = [];
  flag: any;
  errorFlag: boolean = false;
  editData: any;
  selfFormData: any;
  selfRegData: any
  paramObj: any = {

  };
  otp:boolean=false;
  constructor(
    private elementRef: ElementRef,
    public datepipe: DatePipe,
    private messageService: MessageService,
    private http: SelfRegistrationService,
    private router: Router,
    private form: FormService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = selfTable;
  }

  
  ngAfterViewInit() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    this.elementRef.nativeElement.appendChild(s);
  }
  tableRowClick(e: any) {
    console.log(e)
  }
  changeEvents(ch: any) {
    console.log(ch)
    if (ch[1].fieldName == "mobileNo") {
      this.otp=true
      this.form.showModal(true)
      // this.getAllSelfReg();
    }
    if (ch[1].fieldName == "userDOB") {
      this.otp=false
      // this.getAllSelfReg();
      this.age = this.datepipe.transform(ch[1].fieldValue, "MM/dd/yyyy")
    }
  }
  FormData(e: any) {
    if (e == "save") {
      this.http.saveSelfRegData(this.selfFormData).subscribe((resData) => {
        this.data = undefined;
      }, (error) => {                              //Error callback
        this.errorFlag = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "This key name is alredy exit" });
      });
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your registration has been successfully completed!' });
    } else {
      this.router.navigateByUrl('')
    }
  }

  buttonEvent(e: any) {
    this.editData = undefined;
    if (e == "reset") {
      this.router.navigateByUrl('')
    } else {
      this.FormData(e);
    }
  }
age:any 
  sidebarData(e: any) {
    
    if (e != 'reset') {
      const param = {
        "patientTitleName": e.selectTitle,
        "patientFirstname": e.firstName,
        "patientMiddlename": e.middleName,
        "patientLastname": e.lastName,
        "patientMobileNumber": e.mobileNo,
        "patientEmail": e.email,
        "patientGenderId": e.selectGender,
        "patientBloodGroupId": e.selectBlood,
        "patientAddress": e.address,
        "patientDob": this.age,
        "additionalComment": e.additionalComment,
        "patientRegistrationSource": "Self"
      };
      this.selfFormData = param;
    }
  }
 
  getAllSelfReg() {
    this.data = undefined;
    this.selfRegData = [];
    this.http.GetAllSelfRegData().subscribe((res) => {
      console.log(res)
      res[1].result.forEach((e: any, index: any) => {
        let obj = {
          "id": index,
          "patientTitleName": e.selectTitle,
          "patientFirstname": e.patientFirstname,
          "patientMiddlename": e.middleName,
          "patientLastname": e.patientLastname,
          "patientMobileNumber": e.patientMobileNumber,
          "patientEmail": e.email,
          "patientGenderId": e.selectGender,
          "patientAddress": e.address,
          "patientDob": e.userDOB,
          "additionalComment": e.additionalComment,
          "patientRegistrationSource": "Self"
        }
        this.selfRegData.push(obj);
      })
      this.data = [...this.selfRegData];
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
      this.form.showModal(true);
    })
  }
  // mobile verify
  timeLeft: any = 60;
  chooseMethod: boolean = true;
  emailFlag: boolean = false;
  whatsappflag: boolean = false;
  emailOrMobileCard: boolean = false;
  otpScreen: boolean = false;
  resetPassword: boolean = false;
  successScreen: boolean = false;
  btnDissabled: boolean = false;
  errorMessage: any;

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

  //verify OTP
  inputForm = new FormGroup({
    emailId: new FormControl(''),
    mobileNo: new FormControl(''),
  });
  onSubmitEmail(){ 
    this.http.mobileOTP(this.inputForm.value).subscribe({
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

}