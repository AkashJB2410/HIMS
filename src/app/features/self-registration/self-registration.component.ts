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
  MobileNumber: any
  paramObj: any = {

  };
  otp: boolean = false;
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
      if (ch[1].fieldValue != undefined) {
        this.MobileNumber = ch[1].fieldValue;
        this.otp = true
        this.form.showModal(true, "Verity Number")
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Please Enter mobile number" });
      }

      // this.getAllSelfReg();
    }
    if (ch[1].fieldName == "userDOB") {
      this.otp = false
      // this.getAllSelfReg();
      this.age = this.datepipe.transform(ch[1].fieldValue, "MM/dd/yyyy")
    }
  }
  FormData(e: any) {
    if (e == "save") {
      this.http.saveSelfRegData(this.selfFormData).subscribe((resData) => {
        this.data = undefined;
      },);
      console.log(this.addressData)
      this.http.saveMstAddress(this.addressData).subscribe((resData) => {
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
  age: any;
  addressData: any;
  sidebarData(e: any) {
    if (e != 'reset') {
      const param = {
        "patientTitleName": e.selectTitle.name,
        "patientFirstname": e.firstName,
        "patientMiddlename": e.middleName,
        "patientLastname": e.lastName,
        "patientMobileNumber": e.mobileNo,
        "patientEmail": e.email,
        "patientGenderId": e.selectGender.code,
        "patientBloodGroupId": e.selectBlood,
        "patientAddress": e.address,
        "patientDob": this.age,
        "additionalComment": e.additionalComment,
        "patientRegistrationSource": "Self"
      };
      this.selfFormData = param;
      const param2 = {
        "addressLine": e.address,
        "addressLandmark": e.landmark,
        "addressVillageName": e.selectVillage,
        "addressTalukaId": e.state[2],
        "addressTalukaName": e.addressTalukaName,
        "addressStateId": e.state[0],
        "addressStateName": e.addressStateName,
        "addressCountryId": e.addressCountryId,
        "addressCountryName": e.addressCountryName,
        "addressPinCode": e.pinCode
      }
      this.addressData = param2
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
      this.form.showModal(true, "Verity Page");
    })
  }

  // Start timer to enter OTP
  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }



  // send otp
  sendOTPButton: boolean = true
  timeLeft: any = 120;
  sendOTP(e: any) {
    this.startTimer();
    this.http.sendOTPMobile(this.MobileNumber).subscribe((data)=>{

      if (data.status == "ok") {
        this.messageService.add({
          severity: 'success',
          summary: 'OTP sent Successfully.',
          detail: '',
        });
        this.startTimer();
        this.sendOTPButton = false
      }

    })
    // this.sendOTPButton = false
  }
  verifyOTP(e: any) {
    this.otp = false
    this.http.verifyMobileNumber(this.MobileNumber).subscribe((data) => {
      if (data[1].result[0].patientMobileNumber == this.MobileNumber) {
        this.getAllSelfReg();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Number is not Register" });
        this.form.reRenderForm(this.selfRegFormData.form.formControls[3], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[4], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[5], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[6], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[7], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[8], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[9], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[10], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[11], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[13], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[14], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[16], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[17], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[18], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[19], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[20], true, 'isEditable');
        this.form.reRenderForm(this.selfRegFormData.form.formControls[21], true, 'isEditable');
      }
    });


  }
}