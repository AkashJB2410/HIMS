import { Component, OnInit } from '@angular/core';
import opdRgistrationForm from './opdRegistrationForm.json';
import rgistrationForm from './registrationForm.json';
import configService from './service_table_config.json';
import configMobile from './mobileSerch_table_config.json';
import { OpdRegistrationService } from './opd-registration.service';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FormService } from 'src/app/core/shared/service/form.service';
import filterdata from './filter.json';
import opdRgistButtonData from './OPDRegistButton.json';
import * as table_config from './additionalServices_table_config.json';
import { MessageService } from 'primeng/api';
import patientTabularFormData from './tabular.json';
import permanentAddressFormData from './permanentAddress.json';
import hospitalAssociationFormData from './hospitalAssociation.json';
import insuranceDetailsFormData from './insuranceDetails.json';
import medicalHistoryFormData from './medicalHistory.json';
import additionalDetailsFormData from './additionalDetails.json';
import MLCFormData from './MLC .json';
import emergencyContactFormData from './emergencyContactDetails.json';
import rgistBUttonData from './RegistButton.json';
import { DatePipe } from '@angular/common';
import { DataServiceService } from '../master-page/data-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-opd-registration',
  templateUrl: './opd-registration.component.html',
  styleUrls: ['./opd-registration.component.css']
})
export class OpdRegistrationComponent implements OnInit {
  formJSON: any = opdRgistrationForm;
  configurations: any;
  serviceConfig: any;
  mobileConfig: any;
  configServ: any;
  configMobi: any;
  opdData: any[];
  data: any[];
  addData: any[] = [];
  sidebarJSON: any = rgistrationForm;
  formData: any = rgistrationForm;
  mobileGridData: any;
  accordionData = {
    "id": 0,
    "label": "Additional Services"
  };
  filterData: any;
  config: any;
  varPage: any = 0;
  varSize: any = 10;
  varSort: any = "ASC";
  VarQString: any = "";
  editData: any;
  opdButtonJSON: any = opdRgistButtonData;
  sidebarButtonJSON: any = rgistBUttonData;
  serviceObj: any;
  varPatientId: any;
  serviceArr: any[] = [];
  tabularIndex: any;
  accordionTabTwo = {
    "id": 1,
    "label": "ADDITIONAL INFORMATION"
  };
  tabularFormData = patientTabularFormData;
  perAddressFormData: any = permanentAddressFormData;
  hospitalAssFormData: any = hospitalAssociationFormData;
  insuranceDetailsFormData: any = insuranceDetailsFormData;
  medicalHisFormData: any = medicalHistoryFormData;
  addDetailsFormData: any = additionalDetailsFormData;
  formDataMLC: any = MLCFormData;
  emergencyContactFormData: any = emergencyContactFormData;
  flagPatientIsReady = false;
  flagAddressIsReady = false;
  flagPerAddIsReady = false;
  flagHospitalAssIsReady = false;
  flagInsuranceIsReady = false;
  flagMedicalHistoryIsReady = false;
  flagAdditionalDetailsIsReady = false;
  flagMLCIsReady = false;
  flagECIsReady = false;
  addressMerge: any;
  mstPatient: any;
  mstAddress: any = {
    "addressLine1": "",
    "addressLine2": "",
    "addressblock": "",
    "addressVillageId": "",
    "addressVillageName": "",
    "addressTalukaId": "",
    "addressTalukaName": "",
    "addressCityId": "",
    "addressCityName": "",
    "addressStateId": "",
    "addressStateName": "",
    "addressCountryId": "",
    "addressCountryName": "",
    "addressPatientId": "",
    "addressPinCode": "",
    "permanentAddressCityId": "",
    "permanentAddressCityName": "",
    "permanentAddressCountryId": "",
    "permanentAddressCountryName": "",
    "permanentAddressLandmark": "",
    "permanentAddressLine": "",
    "permanentAddressPinCode": "",
    "permanentAddressStateId": "",
    "permanentAddressStateName": "",
    "permanentAddressTalukaId": "",
    "permanentAddressTalukaName": "",
    "permanentAddressVillageId": "",
    "permanentAddressVillageName": "",
    "permanentAddressblock": ""
  };
  mstPerAddress: any;
  mstHospitalAss: any = {
    "privilegeId": "",
    "privilegeName": "",
    "privilegePatientId": ""
  };
  mstInsurance: any =
    {
      "insuranceCompanyName": "",
      "insuranceCompanyNumber": "",
      "insuranceNumber": "",
      "insurancePolicyNumber": "",
      "insurancePatientId": ""
    };
  mstMedicalHistory: any = {
    "mhIsAlcoholConsume": "",
    "mhIsAlcoholConsumeYear": "",
    "mhIsMedicationHistory": "",
    "mhIsMedicationHistoryYear": "",
    "mhIsPreviousDiagnosis": "",
    "mhIsPreviousDiagnosisYear": "",
    "mhIsSmoker": "",
    "mhIsSmokerYear": "",
    "mhIsSurgicalHistory": "",
    "mhIsSurgicalHistoryYear": "",
    "mhIsTobacoConsume": "",
    "mhIsTobacoConsumeYear": "",
    "mhPatientId": ""
  };
  mstAdditionalDetails: any = {
    "paiLanguages": "",
    "paiOccupation": "",
    "paiPhoneNumber": "",
    "paiReferredBy": "",
    "paiPatientId": "",
  };
  mstMLC: any = {
    "mlcPoliceStationId": "",
    "mlcPoliceStationName": "",
    "mlcTypeId": "",
    "mlcTypeName": "",
    "mlcPatientId": "",
  };
  mstEmergencyContact: any = {
    "ecId": "",
    "ecName": "",
    "ecMobile": "",
    "ecRelation": "",
    "ecAddress": "",
    "ecPatientId": ""
  }
  isAddEditFlag: any;
  receivedData: any;
  formTitle: any;
  private subscription: Subscription;
  constructor(private http: OpdRegistrationService, private comService: CommonService, private form$: FormService, private messageService: MessageService, public datepipe: DatePipe,private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.outputData$.subscribe(
      data => {
        this.receivedData = data;
        console.log("this.receivedData ==>>",this.receivedData)
        // this.receivedData.forEach((e: any)=>{
          if (this.receivedData.label == "OPD" && this.receivedData.routerLink=="/master-page/opd-registration") {
            // this.isShowServices = !this.isShowServices;
            this.formTitle = "OPD REGISTRATION";
            this.opdData =undefined;
            this.getOPDService();
            
          } else if (this.receivedData.label == "IPD" && this.receivedData.routerLink=="/master-page/opd-registration") {
            // this.isShowServices = !this.isShowServices;
            this.formTitle = "IPD REGISTRATION";
            this.opdData =undefined;
            this.getIPDService();
            
          }
        // })

      }
    );
    this.serviceConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    };
    this.mobileConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    }
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": false
    };
    this.filterData = filterdata;
    this.getConfigForTable();
    
    this.additionalServices(this.varPage, this.varSize, this.varSort, this.VarQString);
  }
  getConfigForTable() {
    this.configServ = configService;
    this.configMobi = configMobile;
    this.config = table_config;
  }
  changeEvent(e: any) {
    if (e[1].fieldName == "mobileNo" && e[0] != "") {
      this.mobileGridData = undefined;
      this.http.mobileSerchData(e[0]).subscribe((data: any) => {
        this.mobileGridData = data[1].result;
        this.form$.showModal(true, "");
      });
    }
  }
  buttonEvent(e: any) {
    if (e === "save") {
      this.comService.sendEditData(true);
    }
  }
  sidebarButtonEvent(e: any) {
    if (e === "reset") {
      this.editData = undefined;
      this.comService.sendEditData(false);
    }

  }
  submitMstPatient(Data: any) {
    this.http.saveMstPatient(Data).subscribe((res: any) => {
      console.log("mstPatient ==>> res ", res[1].result);
      this.mstMLC.mlcPatientId = res[1].result.patientId;
      this.mstAddress.addressPatientId = res[1].result.patientId;
      this.addressMerge.addressPatientId = res[1].result.patientId;
      this.mstHospitalAss.privilegePatientId = res[1].result.patientId;
      this.mstInsurance.insurancePatientId = res[1].result.patientId;
      this.mstMedicalHistory.mhPatientId = res[1].result.patientId;
      this.mstAdditionalDetails.paiPatientId = res[1].result.patientId;
      this.mstEmergencyContact.ecPatientId = res[1].result.patientId;
    });
  }
  sidebarDataSave(e: any) {
    console.log("sidebar data => ", e)
    if (e == 'reset') {
      console.log(e);
    } else if (this.isAddEditFlag.add == "add") {
      if (this.flagPatientIsReady == true) {
        this.submitMstPatient(this.mstPatient);
      }
      setTimeout(() => {
        if (this.flagPerAddIsReady == true) {
          this.http.saveMstAddress(this.addressMerge).subscribe((res: any) => {
            console.log("mstPatient merge ==>> res ", res[1].result);
          });
        } else if (this.flagPatientIsReady == true) {
          this.http.saveMstAddress(this.mstAddress).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
        if (this.flagHospitalAssIsReady == true) {
          this.http.saveMstPrivilege(this.mstHospitalAss).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
        if (this.flagInsuranceIsReady == true) {
          this.http.saveMstInsurance(this.mstInsurance).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
        if (this.flagMedicalHistoryIsReady == true) {
          this.http.saveMstMedicalHistory(this.mstMedicalHistory).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
        if (this.flagAdditionalDetailsIsReady == true) {
          this.http.saveMstPatientAddInfo(this.mstAdditionalDetails).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
        if (this.flagMLCIsReady == true) {
          this.http.saveMstMedicalLegalCase(this.mstMLC).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
        if (this.flagECIsReady == true) {
          this.http.saveMstEmergencyContact(this.mstEmergencyContact).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        }
      }, 1000)
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your registration has been successfully completed!' });
    }
  }
  getOPDService() {
    this.http.getOPDService().subscribe((res) => {
      // this.opdData = [];
      this.opdData = res[1].result;
    });
  }
  getIPDService() {
    this.http.getIPDService().subscribe((res) => {
      // this.opdData = [];
      this.opdData = res[1].result;
    });
  }
  mobileRowClickData(e: any) {
    this.varPatientId = e.patientId;
    this.form$.reRenderForm(this.formJSON.form.formControls[8], e.patientTitleId, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[9], e.patientFirstname, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[10], e.patientMiddlename, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[11], e.patientLastname, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[12], e.patientGenderId, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[13], e.patientDob, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[14], e.patientAge, 'autofill');
    this.form$.reRenderForm(this.formJSON.form.formControls[15], e.patientMobileNumber, 'autofill');
    this.form$.showModal(false, "");
  }
  accordionEmitData(e: any) { }
  fiteredData(e: any) {
    this.data = undefined;
    this.VarQString = e.searchServicesInput;
    this.additionalServices(this.varPage, this.varSize, this.varSort, this.VarQString);
    console.log("data additionalServices filter==>", this.data)
  }
  rowClickDataComService(e: any) {
    console.log("rowClickDataComService ==>", e)
    this.serviceObj = {
      "vsType": "1",
      "vsUnitId": "2",
      "serviceCancelReason": "clode",
      "serviceBaseRate": e.serviceBaseRate,
      "vsCancelRate": "50",
      "vsGrossRate": "150",
      "vsQtyRate": "75",
      "vsQuantity": "1",
      "vsStatus": "1",
      "vsDeliveredBy": "Nayan",
      "createdBy": "Nayan",
      "vsStaffId": "1",
      "grossAmount": "300",
      "vsServiceId": {
        "serviceId": e.serviceId
      },
      "vsPatientId": this.varPatientId
    }
    this.serviceArr.push(this.serviceObj)
  }
  rowClickData(e: any) {
    console.log("data row click data ==>", e)
    this.serviceObj = {
      "vsType": "1",
      "vsUnitId": "2",
      "serviceBaseRate": e.serviceBaseRate,
      "vsQuantity": "1",
      "vsStatus": "1",
      "vsDeliveredBy": "Nayan",
      "createdBy": "Sagar",
      "vsStaffId": "1",
      "grossAmount": e.serviceBaseRate,
      "vsServiceId": {
        "serviceId": e.serviceId
      },
      "vsPatientId": this.varPatientId
    }
    this.serviceArr.push(this.serviceObj)
    console.log("addition service =>", this.serviceArr)
  }
  additionalServices(page: any, size: any, sort: any, qString: any) {
    this.addData=[];
    this.http.getAdditionalServices(page, size, sort, qString).subscribe((res) => {
      res[1].result.forEach((e: any, index: any) => {
        let obj = {
          "id": index,
          "serviceId": e.serviceId,
          "serviceName": e.serviceName,
          "createdBy": e.createdBy,
          "serviceBaseRate": e.serviceBaseRate,
          "serviceAbbreviations": e.serviceAbbreviations,
          "serviceCode": e.serviceCode,
        }
        this.addData.push(obj)
      })
      this.data = [...this.addData];
      console.log("data additionalServices==>", this.data)
    })
  }
  changeSelectItem(e: any) { }
  sidebarData(e: any) { }
  buttonEventSubmit(e: any) {
    this.http.saveTrnVisitServices(this.serviceArr).subscribe((res) => {
      this.form$.reRenderForm(this.formJSON.form.formControls[0], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[8], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[9], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[10], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[11], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[12], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[13], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[14], "", 'autofill');
      this.form$.reRenderForm(this.formJSON.form.formControls[15], "", 'autofill');
      this.opdData = undefined;
      this.getOPDService();
      this.VarQString = "";
      this.serviceArr = [];
      this.data = undefined;
      this.additionalServices(this.varPage, this.varSize, this.varSort, this.VarQString);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your registration has been successfully completed!' });
    })

  }
  changePerAddressEvent(e: any) {
    console.log("chnage event address => ", e);
    if (e[0].checked[0] == true) {
      this.form$.reRenderForm(this.perAddressFormData.form.formControls[4], "2", 'autofill');
      this.form$.reRenderForm(this.perAddressFormData.form.formControls[5], "2", 'autofill');
      this.form$.reRenderForm(this.perAddressFormData.form.formControls[6], "2", 'autofill');
      this.form$.reRenderForm(this.perAddressFormData.form.formControls[7], "2", 'autofill');
    }
  }

  changeSelect(e: any) {
    if (e[1].fieldName == "surgicalRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[6], true, 'isEditable');
    } else if (e[1].fieldName == "surgicalRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[6], false, 'isEditable');
    }
    if (e[1].fieldName == "medicationRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[8], true, 'isEditable');
    } else if (e[1].fieldName == "medicationRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[8], false, 'isEditable');
    }
    if (e[1].fieldName == "diagnosticsRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[10], true, 'isEditable');
    } else if (e[1].fieldName == "diagnosticsRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[10], false, 'isEditable');
    }
    if (e[1].fieldName == "alcoholRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[12], true, 'isEditable');
    } else if (e[1].fieldName == "alcoholRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[12], false, 'isEditable');
    }
    if (e[1].fieldName == "tobacooRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[14], true, 'isEditable');
    } else if (e[1].fieldName == "tobacooRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[14], false, 'isEditable');
    }
    if (e[1].fieldName == "smokingRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[16], true, 'isEditable');
    } else if (e[1].fieldName == "smokingRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[16], false, 'isEditable');
    }
  }

  tabularValue(e: any) {
    this.tabularIndex = e.id;
  }
  saveRegistartionForm(e: any) {
    let date = this.datepipe.transform(
      e.userBirthdate, "MM/dd/yyyy"
    );
    this.mstPatient = {
      "patientAge": e.ageText || '',
      "patientBloodGroupId": e.selectBlood != undefined ? e.selectBlood.code : "",
      "patientBloodGroupName": e.selectBlood != undefined ? e.selectBlood.name : "",
      "patientDob": date || '',
      "patientEmail": e.emailInput || '',
      "patientEthinicityId": e.selectEthincity != undefined ? e.selectEthincity.code : "",
      "patientEthinicityName": e.selectEthincity != undefined ? e.selectEthincity.name : "",
      "patientFirstname": e.firstNameInput || '',
      "patientGenderId": e.selectGender != undefined ? e.selectGender.code : "",
      "patientGenderName": e.selectGender != undefined ? e.selectGender.name : "",
      "patientIdentificationTypeId": e.selectIdentificationType != undefined ? e.selectIdentificationType.code : "",
      "patientIdentificationTypeName": e.selectIdentificationType != undefined ? e.selectIdentificationType.name : "",
      "patientIdentificationTypeNumber": e.identificationNoInput || '',
      "patientLastname": e.lastNameInput || '',
      "patientMaritalStatusId": e.selectMaritalStatus != undefined ? e.selectMaritalStatus.code : "",
      "patientMaritalStatusName": e.selectMaritalStatus != undefined ? e.selectMaritalStatus.name : "",
      "patientMiddlename": e.middleNameInput || '',
      "patientMobileNumber": e.mobileNoInput || '',
      "patientRegistrationSource": "Conter",
      "patientReligion": e.religionInput || '',
      "patientTitleId": e.selectTitle != undefined ? e.selectTitle.code : "",
      "patientTitleName": e.selectTitle != undefined ? e.selectTitle.name : "",
      "patientAadharNumber": e.aadharNo || '',
      "patientHealthNumber": e.abhaNoInput || '',
      "patientUhIdNumber": e.uhIdInput || '',
      "patientPgId": e.selectRelation != undefined ? e.selectRelation.code : "",
      "patientPgName": e.parentsGuardianName || '',
      "patientUploadImage": ""
    }
    this.mstAddress = {
      "addressLine": e.addressInput || "",
      "addressLandmark": e.landmarkInput || "",
      "addressblock": "",
      "addressVillageId": e.selectVillage != undefined ? e.selectVillage.code : "",
      "addressVillageName": e.selectVillage != undefined ? e.selectVillage.name : "",
      "addressTalukaId": e.dependentdropdown != undefined ? e.dependentdropdown[2] : "",
      "addressTalukaName": "",
      "addressCityId": e.dependentdropdown != undefined ? e.dependentdropdown[1] : "",
      "addressCityName": "",
      "addressStateId": e.dependentdropdown != undefined ? e.dependentdropdown[0] : "",
      "addressStateName": "",
      "addressCountryId": e.selectCountry != undefined ? e.selectCountry.code : "",
      "addressCountryName": e.selectCountry != undefined ? e.selectCountry.name : "",
      "addressPatientId": "",
      "addressPinCode": e.pinCodeInput || "",
    }
    console.log("mstPatient => ", this.mstPatient);
    this.flagPatientIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
  }

  saveAddress(e: any) {
    this.mstAddress = {
      "addressLine": e.addressInput || "",
      "addressLandmark": e.landmarkInput || "",
      "addressblock": "",
      "addressVillageId": e.selectVillage != undefined ? e.selectVillage.code : "",
      "addressVillageName": e.selectVillage != undefined ? e.selectVillage.name : "",
      "addressTalukaId": e.dependentdropdown != undefined ? e.dependentdropdown[2] : "",
      "addressTalukaName": "",
      "addressCityId": e.dependentdropdown != undefined ? e.dependentdropdown[1] : "",
      "addressCityName": "",
      "addressStateId": e.dependentdropdown != undefined ? e.dependentdropdown[0] : "",
      "addressStateName": "",
      "addressCountryId": e.selectCountry != undefined ? e.selectCountry.code : "",
      "addressCountryName": e.selectCountry != undefined ? e.selectCountry.name : "",
      "addressPatientId": "",
      "addressPinCode": e.pinCodeInput || "",
    }
    console.log("mstAddress=> ", this.mstAddress);
    this.flagAddressIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
  }

  savePerAddress(e: any) {
    this.mstPerAddress = {
      "permanentAddressCityId": e.perAddDependentdropdown != undefined ? e.perAddDependentdropdown[1] : "",
      "permanentAddressCityName": "string",
      "permanentAddressCountryId": e.perAddSelectCountry != undefined ? e.perAddSelectCountry.code : "",
      "permanentAddressCountryName": e.perAddSelectCountry != undefined ? e.perAddSelectCountry.name : "",
      "permanentAddressLandmark": e.perAddLandmarkInput || "",
      "permanentAddressLine": e.perAddAddressInput || "",
      "permanentAddressPinCode": e.perAddPinCodeInput || "",
      "permanentAddressStateId": e.perAddDependentdropdown != undefined ? e.perAddDependentdropdown[0] : "",
      "permanentAddressStateName": "string",
      "permanentAddressTalukaId": e.perAddDependentdropdown != undefined ? e.perAddDependentdropdown[2] : "",
      "permanentAddressTalukaName": "string",
      "permanentAddressVillageId": e.perAddSelectVillage != undefined ? e.perAddSelectVillage.code : "",
      "permanentAddressVillageName": e.perAddSelectVillage != undefined ? e.perAddSelectVillage.name : "",
      "permanentAddressblock": "string"
    }
    console.log("mstAddress=> ", this.mstPerAddress);

    if (this.flagPatientIsReady == true) {
      this.addressMerge = this.mergeObjects(this.mstAddress, this.mstPerAddress)
    } else {
      this.addressMerge = this.mstPerAddress;
    }
    this.flagPerAddIsReady = true;
    console.log("merge =>", this.addressMerge);
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
  }

  savePrivilege(e: any) {
    this.mstHospitalAss = {
      "privilegeId": e.privilageType != undefined ? e.privilageType.code : "",
      "privilegeName": e.privilageType != undefined ? e.privilageType.name : "",
      "privilegePatientId": ""
    }
    this.flagHospitalAssIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("mstHospitalAss => ", this.mstHospitalAss);
  }
  saveInsurance(e: any) {
    this.mstInsurance =
    {
      "insuranceCompanyName": e.companyName || '',
      "insuranceCompanyNumber": e.companyNo || '',
      "insuranceNumber": e.insuranceNo || '',
      "insurancePolicyNumber": e.policyNo || '',
      "insurancePatientId": ""
    }
    this.flagInsuranceIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("mstInsurance => ", this.mstInsurance);
  }
  saveMh(e: any) {
    this.mstMedicalHistory = {
      "mhIsAlcoholConsume": e.alcoholRad || '',
      "mhIsAlcoholConsumeYear": e.alcoholQuestion1 || '',
      "mhIsMedicationHistory": e.medicationRad || '',
      "mhIsMedicationHistoryYear": e.medicationDetails || '',
      "mhIsPreviousDiagnosis": e.DiagnosisRad || '',
      "mhIsPreviousDiagnosisYear": e.DiagnosissDetails || '',
      "mhIsSmoker": e.smokingRad || '',
      "mhIsSmokerYear": e.smokingQuestion1 || '',
      "mhIsSurgicalHistory": e.surgeriesDetails || '',
      "mhIsSurgicalHistoryYear": e.surgicalRad || '',
      "mhIsTobacoConsume": e.tobacooRad || '',
      "mhIsTobacoConsumeYear": e.tobacooQuestion1 || '',
      "mhPatientId": ""
    }
    this.flagMedicalHistoryIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstMedicalHistory => ", this.mstMedicalHistory);
  }
  savePai(e: any) {
    this.mstAdditionalDetails = {
      "paiLanguages": e.language || '',
      "paiOccupation": e.occupation || '',
      "paiPhoneNumber": e.phoneNo || '',
      "paiReferredBy": e.refferedBy || '',
      "paiAadharNumber": e.aadharNo || '',
      "paiUsshIdNumber": e.usshId || '',
      "paiUhIdNumber": e.uhId || '',
      "paiAbhaIdNumber": e.abhaId || '',
      "paiEthinicityId": e.selectEthincity != undefined ? e.selectEthincity.code : "",
      "paiEthinicityName": e.selectEthincity != undefined ? e.selectEthincity.name : "",
      "paiReligion": e.religionInput || '',
      "paiPatientId": "",
    }
    this.flagAdditionalDetailsIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstAdditionalDetails => ", this.mstAdditionalDetails);
  }

  saveFormMLC(e: any) {
    this.mstMLC = {
      "mlcPoliceStationId": e.selectPoliceStation != undefined ? e.selectPoliceStation.code : "",
      "mlcPoliceStationName": e.selectPoliceStation != undefined ? e.selectPoliceStation.name : "",
      "mlcTypeId": e.selectMLCType != undefined ? e.selectMLCType.code : "",
      "mlcTypeName": e.selectMLCType != undefined ? e.selectMLCType.name : "",
      "mlcPatientId": "",
    }
    this.flagMLCIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstMLC => ", this.mstMLC);
  }

  saveFormEmergencyContact(e: any) {
    this.mstEmergencyContact = {
      "ecName": e.nameInput,
      "ecMobile": e.mobileNoInput,
      "ecRelation": e.relationInput,
      "ecAddress": e.addressInput,
      "ecPatientId": ""
    }
    this.flagECIsReady = true;
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstEmergencyContact => ", this.mstEmergencyContact);
  }
  mergeObjects<T extends object>(target: T, ...sources: object[]): T {
    return Object.assign(target, ...sources);
  }

}
