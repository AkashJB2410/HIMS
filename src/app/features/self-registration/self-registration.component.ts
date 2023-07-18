import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import selfRegForm from './selfRegForm.json';
import selfRegbreadcrumb from './selfReg_breadcrumb.json';
import tabular from './selfRegTabular.json';
import addressForm from './AddressForm.json';
import medicalForm from './MedicalForm.json';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { SelfRegistrationService } from './self-registration.service';
import { Router } from '@angular/router';
import selfButton from './selfRegButton.json'
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
  editData: any
  selfButton = selfButton;
  tabularFormData = tabular
  addressEditData: any;
  medicalEditData: any;
  formData1: any = addressForm;
  formData2: any;
  formData3: any;
  paramObj: any = {
   
  };

  constructor( private elementRef: ElementRef,private messageService: MessageService, private http: SelfRegistrationService, private router: Router) { }

  ngOnInit(): void {

  }

  tabularValue(e: any) {
    if (e.id == 0) {
      this.formData1 = addressForm;
      this.formData2 = "";
    } else if (e.id == 1) {
      this.formData1 = "";
      this.formData2 = medicalForm;
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
  selfFormData: any
  sidebarData(e: any) {
    if (e != 'reset') {
      const param = {
        "patientTitleName": e.selectTitle,
        "patientFirstname": e.firstName,
        "patientMiddlename": e.middleName,
        "patientLastname": e.lastName,
        "patientAge": e.age,
        "patientMobileNumber": e.mobileNo,
        "patientEmail": e.email,
        "patientGenderId": e.selectGender,
        "patientBloodGroupId": e.selectBlood,
        "patientAddress":e.address,
        "additionalComment":e.additionalComment,
        "patientRegistrationSource": "Self"
      };
      this.selfFormData = param;
    }
  }
}