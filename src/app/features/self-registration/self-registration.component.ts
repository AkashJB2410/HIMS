import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import selfRegForm from './selfRegForm.json';
import selfRegbreadcrumb from './selfReg_breadcrumb.json';
import tabular from './selfRegTabular.json';
import addressForm from './AddressForm.json';
import medicalForm from './MedicalForm.json';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { SelfRegistrationService } from './self-registration.service';
import { Router } from '@angular/router';

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

  tabularFormData = tabular
  addressEditData: any;
  medicalEditData: any;
  formData1: any =addressForm;
  formData2: any ;
  formData3: any;
  paramObj: any = {
    "patientIdentificationTypeId": "",
    "patientIdentificationTypeName": "",
    "patientTitleId": "",
    "patientTitleName": "",
    "patientFirstname": "",
    "patientMiddlename": "",
    "patientLastname": "",
    "patientDob": "",
    "patientAge": "",
    "patientMaritalStatusId": "",
    "patientMaritalStatusName": "",
    "profileImage": "",
    "patientMobileNumber": "",
    "patientAddressLine1": "",
    "patientAddressLine2": "",
    "patientCityId": "",
    "patientCityName": "",
    "patientStateId": "",
    "patientStateName": "",
    "patientCountryId": "",
    "patientCountryName": "",
    "patientBloodGroupId": "",
    "patientBloodGroupName": "",
    "patientEthinicityId": "",
    "patientEthinicityName": "",
    "patientReligion": "",
    "patientBlock": "",
    "patientPrnNumber": "",
    "patientPrivilageId": "",
    "patientPrivilageName": "",
    "patientInsuranceNumber": "",
    "patientInsurancePolicyNumber": "",
    "patientInsuranceCompanyNumber": "",
    "patientInsuranceCompanyName": "",
    "patientIsTobacoConsume": false,
    "patientIsTobacoConsumeYear": "",
    "patientIsAlcoholConsume": false,
    "patientIsAlcoholConsumeYear": "",
    "patientOccupation": "",
    "patientReferredBy": "",
    "patientLanguages": "",
    "patientPhoneNumber": "",
    "patientUploadImage": "",
    "patientRegistrationSource": "",
    "patientSocialStatusId": "",
    "patientSocialStatusName": "",
    "patientHealthId": "",
    "patientHealthNumber": "",
    "patientEmail": ""

  };

  constructor(private messageService: MessageService, private http: SelfRegistrationService, private router:Router) { }

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

  saveAddressData(e: any) {
    this.paramObj = {
      "patientStateId": [e.selectState[0], e.selectState[1]],

    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }
  saveMedicalData(e: any) {
    this.paramObj = {
      "patientIsTobacoConsume": e.alcoholRad,
      "patientIsTobacoConsumeYear": e.alcoholQuestion1,
      "patientIsAlcoholConsume": e.tobacooRad,
      "patientIsAlcoholConsumeYear": e.tobacooQuestion1,

    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }

  buttonEvent(e: any) {
    this.editData = undefined;
    if(e=="reset"){
this.router.navigateByUrl('')
    }
  }
  sidebarData(e: any) {
    if (e != 'reset') {
      const param = {
        "patientTitleId": e.patientTitleId,
        "patientTitleName": e.selectTitle,
        "patientFirstname": e.firstName,
        "patientMiddlename": e.middleName,
        "patientLastname": e.lastName,
        "patientAge": e.age,
        "patientMobileNumber": e.mobileNo,
        "patientAddressLine1": e.address,
        "patientCityId": e.state[2],
        "patientCityName": e.patientCityName,
        "patientStateId": e.state[0],
        "patientRegistrationSource": "Self"
      };
      this.http.saveSelfRegData(param).subscribe((resData) => {
        this.data = undefined;
        if (resData.id != "") {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Data save successfull.',
          });
        }
      }, (error) => {                              //Error callback
        console.log('error caught in component : ', error.error.error)
        this.errorFlag = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "This key name is alredy exit" });
      });
    }
  }
}