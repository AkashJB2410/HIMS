import { Component, OnDestroy, OnInit } from '@angular/core';
import * as table_config from './registrationForm_table_config.json';
import * as mobile_table_config from './mobileSerch_table_config.json';
import { MessageService } from 'primeng/api';
import { RegistrationFormService } from './registration-form.service';
import rgistrationData from './registrationForm.json';
import { FormService } from 'src/app/core/shared/service/form.service';
import Breadcrumbs from './breadcrumb.json';
import { DatePipe } from '@angular/common';
import filterdata from './filter.json';
import { CommonService } from 'src/app/core/shared/service/common.service';
import patientTabularFormData from './tabular.json';
import permanentAddressFormData from './permanentAddress.json';
import hospitalAssociationFormData from './hospitalAssociation.json';
import insuranceDetailsFormData from './insuranceDetails.json';
import medicalHistoryFormData from './medicalHistory.json';
import additionalDetailsFormData from './additionalDetails.json';
import MLCFormData from './MLC .json';
import emergencyContactFormData from './emergencyContactDetails.json';
import commAddFromData from './communicationAddress.json';
import rgistBUttonData from './RegistButton.json';
import { DataServiceService } from '../master-page/data-service.service';
import { Subscription, forkJoin } from 'rxjs';
import acc from "./accordionData.json";
import configService from './service_table_config.json';
import { dataOPD } from "./serviceData";
import { dataIPD } from './servIPDData';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  data: any[];
  opdData: any[];
  dataInfo: any[];
  mobileGridData: any[];
  config: any;
  configServ: any;
  configMobi: any;
  visibleSidebar: boolean = false;
  configurations: any;
  serviceConfig: any;
  mobileConfig: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = rgistrationData;
  sidebarButtonJSON: any = rgistBUttonData;
  formData: any = rgistrationData;
  perAddressFormData: any = permanentAddressFormData;
  hospitalAssFormData: any = hospitalAssociationFormData;
  insuranceDetailsFormData: any = insuranceDetailsFormData;
  medicalHisFormData: any = medicalHistoryFormData;
  addDetailsFormData: any = additionalDetailsFormData;
  formDataMLC: any = MLCFormData;
  emergencyContactFormData: any = emergencyContactFormData;
  formDateCommAdd: any = commAddFromData;
  accordionData = {
    "id": 0,
    "label": "COMMUNICATION ADDRESS"
  };
  accordionTabTwo = {
    "id": 1,
    "label": "ADDITIONAL INFORMATION"
  }
  registartionFormData: any[] = [];
  isForm: any = true;
  flag: any;
  gridData: any[] = [];
  addressData: any[] = [];
  privilegeData: any[] = [];
  insuranceData: any[] = [];
  mhData: any[] = [];
  paiData: any[] = [];
  mlcData: any[] = [];
  ecData: any[] = [];
  mergedGridData: any[] = [];
  mergedAddGridData: any[] = [];
  mergedInsuranceGridData: any[] = [];
  mergedMlcGridData: any[] = [];
  mergedEcGridData: any[] = [];
  mergedPrivalegeGridData: any[] = [];
  mergedPaiGridData: any[] = [];
  mergedMhGridData: any[] = [];
  isAddEditFlag: any;
  items: any = Breadcrumbs;
  imgName: any
  getage: any;
  agemon: any;
  agedday: any;

  filterData: any;
  editData: any;
  perAddressEditData: any;
  addressEditData: any;
  hospitalEditData: any;
  insorunceEditData: any;
  medicalEditData: any;
  addEditData: any;
  mlcEditData: any
  emergencyContactEditData: any;
  tabularFormData = patientTabularFormData;
  isShowServices = false;
  servData: any[] = [];
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
  merged: any;
  tabularIndex: any;
  accordionIndex: any;
  receivedData: any;
  startDate: any = "";
  endDate: any = "";
  formTitle: any;
  flagPatientIsReady = false;
  flagAddressIsReady = false;
  flagPerAddIsReady = false;
  flagHospitalAssIsReady = false;
  flagInsuranceIsReady = false;
  flagMedicalHistoryIsReady = false;
  flagAdditionalDetailsIsReady = false;
  flagMLCIsReady = false;
  flagECIsReady = false;
  flagUpdateRecord=false;
  saveMstPatientData: any;
  addressMerge: any;
  private subscription: Subscription;
  constructor(private messageService: MessageService, private common: CommonService, public datepipe: DatePipe,
    private http: RegistrationFormService, private form$: FormService, private dataService: DataServiceService) {
  }

  ngOnInit(): void {
    this.isShowServices = !this.isShowServices;
    // this.servData = dataOPD;
    this.getOPDService();
    this.formTitle = "OPD REGISTRATION";
    // this.subscription = this.dataService.outputData$.subscribe(
    //   data => {
    //     this.receivedData = data;
    //     this.receivedData.group.forEach((e: any)=>{
    //       if (e.label == "OPD" && e.routerLink=="/master-page/opd-registration-form") {
    //         this.isShowServices = !this.isShowServices;
    //         this.servData = dataOPD;
    //         this.formTitle = "OPD REGISTRATION";
    //       } else if (e == "IPD" && e.routerLink=="/master-page/ipd-registration-form") {
    //         this.isShowServices = !this.isShowServices;
    //         this.servData = dataIPD;
    //         this.formTitle = "IPD REGISTRATION";
    //       }
    //     })

    //   }
    // );

    // this.assignDropDownOptions();
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.serviceConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": true
    };
    this.mobileConfig = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": false,
      "isConfirmation": true
    }
    // this.getAllPatientData();
    this.getAllData();
    this.filterData = filterdata;
    this.getConfigForTable();

  }
  sidebarDataForm1(e: any) {

  }
  rowClickData(e: any) { }
  mobileRowClickData(e: any) {
    this.form$.showModal(false,"");
    console.log("Mobile data =>", e);
    this.form$.reRenderForm(this.formData.form.formControls[0], e.patientMobileNumber, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[3], e.patientTitleId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[4], e.patientFirstname, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[5], e.patientMiddlename, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[6], e.patientLastname, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[7], e.patientGenderId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[8], e.patientIdentificationTypeId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[9], e.patientIdentificationTypeNumber, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[10], e.patientEmail, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[12], e.patientDob, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[14], e.patientAge, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[15], e.patientBloodGroupId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[16], e.patientEthinicityId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[17], e.patientReligion, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[18], e.patientMaritalStatusId, 'autofill');

  }
  assignDropDownOptions() {
    this.formData = Object.assign({}, rgistrationData);
    this.formData.form.formControls.forEach((data: any) => {
      // if (data.formControlName === "selectIdentificationType") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Identification Type",
      //     "code": "0"
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllIdentificationTypeData().subscribe(item => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.identification_Type,
      //         "code": e.identificationTypeId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectTitle") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Title",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllTitleData().subscribe(item => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.value,
      //         "code": e.lovListId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectYear") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select an Option",
      //     "code": "0"
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllMstDurationData().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.durationType,
      //         "code": e.durationId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectGender") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Gender",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllmstGenderData().subscribe(item => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.value,
      //         "code": e.lovListId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectBlood") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Blood",
      //     "code": "0"
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllBloodGroupData().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.bloodgroupName,
      //         "code": e.bloodgroupId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectState") {
      //   // data.values = [];
      //   data.values.forEach((a: any) => {
      //     if (a.label === "State") {
      //       a.values = [];
      //       let defaultObj = {
      //         "name": "Select State",
      //         "code": ""
      //       }
      //       a.values.push(defaultObj);
      //       this.http.GetAllMstStateData().subscribe((item: any[]) => {
      //         item.forEach((e: any) => {
      //           let obj = {
      //             "name": e.stateName,
      //             "code": e.stateId
      //           }
      //           a.values.push(obj);
      //         })
      //       })
      //     }
      //     if (a.label === "Districts") {
      //       a.values = [];
      //       let defaultObj = {
      //         "name": "Select Districts",
      //         "code": "",
      //         "Mcode": ""
      //       }
      //       a.values.push(defaultObj);
      //       this.http.GetAllMstDistrictData().subscribe((item: any[]) => {
      //         item.forEach((e: any) => {
      //           let obj = {
      //             "name": e.districtName,
      //             "code": e.districtId,
      //             "Mcode": e.stateId.stateId
      //           }
      //           a.values.push(obj);
      //         })
      //       })
      //     }
      //   })
      // }
      // if (data.formControlName === "selectTaluka") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Taluka",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllMstTalukaData().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.talukaName,
      //         "code": e.talukaId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectVillage") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Village",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllVillageData().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.villageName,
      //         "code": e.villageid
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectDepartment") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Department",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllMstDepartment().subscribe((item: any[]) => {
      //     console.log("department => ", item)
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.departmentName,
      //         "code": e.departmentId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectSubDepartment") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Sub-Department",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllSubDepartmentData().subscribe((item: any[]) => {
      //     console.log("Sub department => ", item)
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.subDepartment,
      //         "code": e.subDepartmentId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectDoctor") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Doctor",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllDoctorData().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.doctorName,
      //         "code": e.doctorId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectRelativeTitle") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Relative Title",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllRelativeTitle().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.relativeTitleType,
      //         "code": e.relativeTitleId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      // if (data.formControlName === "selectWard") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Ward",
      //     "code": ""
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllWardData().subscribe((item: any[]) => {
      //     item.forEach((e: any) => {
      //       let obj = {
      //         "name": e.wardDetails,
      //         "code": e.mstWardDetailsid
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
    })
  }
  events(e: any) {
    this.flag = e;

  }
  changeSelectItem(e: any) {
    console.log("changeSelectItem e => ", e)
    if (e[1].fieldName == "mobileNoInput" && e[0] != "") {

      this.mobileGridData = undefined;
      this.http.mobileSerchData(e[0]).subscribe((data: any) => {
        if (data[1].result.length === 0) {
          this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'New mobile number for registration.' });
        } else {
          this.mobileGridData = data[1].result;
          this.form$.showModal(true,"");
          console.log("this.mobileGridData ===>", this.mobileGridData)
        }
      });
    }
    if (e[1].fieldName == "selectIdentificationType" && e[0].value != "") {
      this.form$.reRenderForm(this.formData.form.formControls[12], true, 'isEditable');
      if (e[0].value == 1) {
        let validations = {
          "required": true,
          "pattern": "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 2) {
        let validations = {
          "required": true,
          "pattern": "^[A-PR-WY][1-9]\\d\\s?\\d{4}[1-9]$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 3) {
        let validations = {
          "required": true,
          "pattern": "[A-Z]{3}[0-9]{4}[A-Z]{1}"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 4) {
        let validations = {
          "required": true,
          "pattern": "^[A-Z]{3}[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 5) {
        let validations = {
          "required": true,
          "pattern": "^\\d{10,12}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 6) {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      }
      else if (e[0].value == 7) {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 8) {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 9) {
        let validations = {
          "required": true,
          "pattern": "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 10) {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      } else if (e[0].value == 11) {
        let validations = {
          "required": true,
          "pattern": "^[1-9]{2}-[0-9]{4}-[0-9]{4}-[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[12], validations, 'validations');
      }
    }

    if (e[1].fieldName == "selectTitle") {
      if (e[0].value == "0") {
        // this.form$.reRenderForm(this.formData.form.formControls[13], "1", 'autofill');
      } else if (e[0].value == 1) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 1, 'autofill');
      } else if (e[0].value == 2) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 2, 'autofill');
      } else if (e[0].value == 3) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 1, 'autofill');
      } else if (e[0].value == 4) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 2, 'autofill');
      } else if (e[0].value == 5) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 1, 'autofill');
      } else if (e[0].value == 6) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 1, 'autofill');
      } else if (e[0].value == 7) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 2, 'autofill');
      } else if (e[0].value == 8) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 2, 'autofill');
      } else if (e[0].value == 9) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 1, 'autofill');
      } else if (e[0].value == 10) {
        this.form$.reRenderForm(this.formData.form.formControls[10], 2, 'autofill');
      }
    }

    if (e[1].fieldName == "DOBRad" && e[0].value == "DOB") {
      this.form$.reRenderForm(this.formData.form.formControls[15], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[17], false, 'isEditable');

    } else if (e[1].fieldName == "DOBRad" && e[0].value == "Age") {
      this.form$.reRenderForm(this.formData.form.formControls[17], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[15], false, 'isEditable');
    }

    if (e[1].fieldName == "imgUpl") {
      let fileDta = e[0].target.files[0];
      this.http.uploadImg(fileDta).subscribe((res: { ImageName: any; }) => {
        console.log("upload img data =>", res)
        this.imgName = res.ImageName;
      })
    }
    if (e[1].fieldName == "userBirthdate") {
      console.log("date of birth => ", e[0])
      let age = this.datepipe.transform(e[0], "MM/dd/yyyy")
      this.calculateAge(age);
      this.form$.reRenderForm(this.formData.form.formControls[17], this.getage, 'autofill');
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

  changeAddressEvent(e: any) {
    console.log("chnage event address => ", e);
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

  mergeObjects<T extends object>(target: T, ...sources: object[]): T {
    return Object.assign(target, ...sources);
  }

  getOPDService() {
    this.http.getOPDService().subscribe((res) => {
      this.opdData = [];
      this.opdData = res[1].result;
      console.log("get all data getOPDService ====>>>>", res)
      this.isdataReady = true;
    });
  }

  getAllData() {
    this.http.getDataFromApis().subscribe(
      ([api1Response, api2Response, api3Response, api4Response, api5Response, api6Response, api7Response, api8Response]) => {
        // Handle the responses from both APIs
        console.log('API 1 Response:', api1Response[1].result);
        console.log('API 2 Response:', api2Response[1].result);
        console.log('API 3 Response:', api3Response[1].result);
        console.log('API 4 Response:', api4Response[1].result);
        console.log('API 5 Response:', api5Response[1].result);
        console.log('API 6 Response:', api6Response[1].result);
        console.log('API 7 Response:', api7Response[1].result);
        console.log('API 8 Response:', api8Response[1].result);
        api1Response[1].result.forEach((e: any, index: any) => {
          let date = this.datepipe.transform(
            e.patientDob, "MM/dd/yyyy"
          );
          let patientData = {
            "id": index,
            "patientId": e.patientId,
            "patientMrNo": e.patientMrNo,
            "patientTitleId": e.patientTitleId,
            "patientTitleName": e.patientTitleName,
            "patientFirstname": e.patientFirstname,
            "patientMiddlename": e.patientMiddlename,
            "patientLastname": e.patientLastname,
            "patientFullname": e.patientFullname,
            "patientMobileNumber": e.patientMobileNumber,
            "patientAadharNumber": e.patientAadharNumber,
            "patientUhIdNumber": e.patientUhIdNumber,
            "patientHealthNumber": e.patientHealthNumber,

            "patientEmail": e.patientEmail,
            "patientIdentificationTypeId": e.patientIdentificationTypeId,
            "patientIdentificationTypeName": e.patientIdentificationTypeName,
            "patientIdentificationTypeNumber": e.patientIdentificationTypeNumber,
            "patientMaritalStatusId": e.patientMaritalStatusId,
            "patientMaritalStatusName": e.patientMaritalStatusName,
            "patientDob": date,
            "image": e.patientUploadImage,
            "isActive": e.isActive,
            "patientAge": e.patientAge,
            "patientBloodGroupId": e.patientBloodGroupId,
            "patientBloodGroupName": e.patientBloodGroupName,
            "patientGenderId": e.patientGenderId,
            "patientGenderName": e.patientGenderName,
            "patientReligion": e.patientReligion,
            "patientPgId": e.patientPgId,
            "patientPgName": e.patientPgName
          }
          this.gridData.push(patientData);
        })
        console.log("this gridData =====>>>>>", this.gridData);
        //mst_address
        api2Response[1].result.forEach((e: any) => {
          this.addressData.push(e);
        })
        this.gridData.forEach(res => {
          let data = this.addressData.find(data => data.addressPatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedGridData.push(this.merged);
          } else {
            this.mergedGridData.push(res);
          }
          console.log('mergedGridData ====>', this.mergedGridData);
        })
        //mst_privilege
        this.merged = '';
        api3Response[1].result.forEach((e: any) => {
          this.privilegeData.push(e);
        })
        this.mergedGridData.forEach(res => {
          let data = this.privilegeData.find(data => data.privilegePatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedPrivalegeGridData.push(this.merged);
          } else {
            this.mergedPrivalegeGridData.push(res);
          }
          console.log('mergedPrivalegeGridData', this.mergedPrivalegeGridData);
        })
        //mst_insurance
        this.merged = '';
        api4Response[1].result.forEach((e: any) => {
          this.insuranceData.push(e);
        })
        this.mergedPrivalegeGridData.forEach(res => {
          let data = this.insuranceData.find(data => data.insurancePatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedInsuranceGridData.push(this.merged);
          } else {
            this.mergedInsuranceGridData.push(res);
          }
          console.log('mergedInsuranceGridData', this.mergedInsuranceGridData);
        })
        //mst_mh
        this.merged = '';
        api5Response[1].result.forEach((e: any) => {
          this.mhData.push(e);
        })
        this.mergedInsuranceGridData.forEach(res => {
          let data = this.mhData.find(data => data.mhPatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedMhGridData.push(this.merged);
          } else {
            this.mergedMhGridData.push(res);
          }
          console.log('mergedMhGridData', this.mergedMhGridData);
        })
        //mst_pai
        this.merged = '';
        api6Response[1].result.forEach((e: any) => {
          this.paiData.push(e);
        })
        this.mergedMhGridData.forEach(res => {
          let data = this.paiData.find(data => data.paiPatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedPaiGridData.push(this.merged);
          } else {
            this.mergedPaiGridData.push(res);
          }
          console.log('mergedPaiGridData', this.mergedPaiGridData);
        })
        //mst_mlc
        this.merged = '';
        api7Response[1].result.forEach((e: any) => {
          this.mlcData.push(e);
        })
        this.mergedPaiGridData.forEach(res => {
          let data = this.mlcData.find(data => data.mlcPatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedMlcGridData.push(this.merged);
          } else {
            this.mergedMlcGridData.push(res);
          }
          console.log('mergedMlcGridData', this.mergedMlcGridData);
        })
        ///mst_emergency_contact
        this.merged = '';
        api8Response[1].result.forEach((e: any) => {
          this.ecData.push(e);
        })
        this.mergedMlcGridData.forEach(res => {
          let data = this.ecData.find(data => data.ecPatientId === res.patientId);
          if (data) {
            this.merged = this.mergeObjects(res, data);
            this.mergedEcGridData.push(this.merged);
          } else {
            this.mergedEcGridData.push(res);
          }
          console.log('mergedEcGridData', this.mergedEcGridData);
        })
        this.merged = '';
        this.data = [...this.mergedEcGridData];
        console.log('API Data ===>>>:', this.data);
        this.gridData = [];
        this.mergedGridData = [];
        this.mergedInsuranceGridData = [];
        this.mergedMhGridData = [];
        this.mergedMlcGridData = [];
        this.mergedPaiGridData = [];
        this.mergedPrivalegeGridData = [];

      },
      error => {
        // Handle any errors
        console.error('Error:', error);
      }
    );
  }

  getConfigForTable() {
    this.config = table_config;
    this.configServ = configService;
    this.configMobi = mobile_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    this.data = undefined;
    this.deletePatientData(e.patientId);
    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }

  deletePatientData(patientId: any) {
    this.http.deletePatientData(patientId)
      .subscribe(data => {
        this.getAllData();
      })
  }
  isActive(event: string) {
    this.http.isActiveData(event).subscribe((data: any) => {
      this.data = undefined;
      this.getAllData();
    });
  }

  closeSidebarData(e: any) {
    this.editData = undefined;
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

  updateMstPatient(data: any) {
    this.http.updateMstPatient(data)
      .subscribe((res: any) => {
        // this.mstAddress.addressPatientId = res[1].result.patientId;
        // this.mstHospitalAss.privilegePatientId = res[1].result.patientId;
        // this.mstInsurance.insurancePatientId = res[1].result.patientId;
        // this.mstMedicalHistory.mhPatientId = res[1].result.patientId;
        // this.mstAdditionalDetails.paiPatientId = res[1].result.patientId;
        // this.mstMLC.mlcPatientId = res[1].result.patientId;
        // this.mstEmergencyContact.ecPatientId = res[1].result.patientId;
        // this.data = undefined;
        // this.getAllData();
      })
  }
  sidebarData(e: any) {
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
    } else {
      if (this.flagUpdateRecord == true) {
        this.updateMstPatient(this.mstPatient);
      }
      // setTimeout(() => {
      //   if (this.flagPerAddIsReady == true) {
          this.http.updateMstAddress(this.addressMerge).subscribe((res: any) => {
            console.log("mstPatient merge ==>> res ", res[1].result);
          });
        // } else if (this.flagPatientIsReady == true) {
          this.http.updateMstAddress(this.mstAddress).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        // }
        // if (this.flagHospitalAssIsReady == true) {
          this.http.updateMstPrivilege(this.mstHospitalAss).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        // }
        // if (this.flagInsuranceIsReady == true) {
          this.http.updateMstInsurance(this.mstInsurance).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        // }
        // if (this.flagMedicalHistoryIsReady == true) {
          this.http.updateMstMedicalHistory(this.mstMedicalHistory).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        // }
        // if (this.flagAdditionalDetailsIsReady == true) {
          this.http.updateMstPatientAddInfo(this.mstAdditionalDetails).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        // }
        // if (this.flagMLCIsReady == true) {
          this.http.updateMstMedicalLegalCaseSave(this.mstMLC).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
        // }
        // if (this.flagECIsReady == true) {
          this.http.updateMstEmergencyContact(this.mstEmergencyContact).subscribe((res: any) => {
            console.log("mstPatient ==>> res ", res[1].result);
          });
      //   }
      // }, 1000)
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });
    }
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

  fiteredData(e: any) {
    this.data = undefined;
    if (e.startDateInput != "") {
      this.startDate = this.datepipe.transform(
        e.startDateInput, "yyyy-MM-dd"
      );
    }
    if (e.endDateInput != "") {
      this.endDate = this.datepipe.transform(
        e.endDateInput, "yyyy-MM-dd"
      );
    }

    this.http.getFilterData(e, this.startDate, this.endDate)
      .subscribe((data: any[]) => {
        this.data = undefined;
        this.data = data[1].result;
      })
  }

  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }

  dataForm(e: any) {
    this.data = e;
  }
  onAdd(e: any) {
    this.editData = []
    this.isAddEditFlag = e;
  }
  onEdit(e: any) {
    this.isAddEditFlag = e.edit;
    let date = this.datepipe.transform(
      e.editRow.patientDob, "MM/dd/yyyy"
    );
    let edit = {
      "patientMobileNumber": e.editRow.patientMobileNumber,
      "patientHealthNumber": e.editRow.patientHealthNumber,
      "patientUhIdNumber": e.editRow.patientUhIdNumber,
      "patientAadharNumber": e.editRow.patientAadharNumber,
      "divider1": "",
      "patientId": e.editRow.patientId,
      "patientTitleId": e.editRow.patientTitleId,
      "patientFirstname": e.editRow.patientFirstname,
      "patientMiddlename": e.editRow.patientMiddlename,
      "patientLastname": e.editRow.patientLastname,
      "patientGenderId": e.editRow.patientGenderId,
      "patientIdentificationTypeId": e.editRow.patientIdentificationTypeId,
      "patientIdentificationTypeNumber": e.editRow.patientIdentificationTypeNumber,
      "patientEmail": e.editRow.patientEmail,
      "DOBRad": "",
      "patientDob": date,
      "AgeRad": ["Age"],
      "patientAge": e.editRow.patientAge,
      "patientBloodGroupId": e.editRow.patientBloodGroupId,
      "patientMaritalStatusId": e.editRow.patientMaritalStatusId,
      "patientUploadImage": e.editRow.patientUploadImage,
      "patientPgId": e.editRow.patientPgId,
      "patientPgName": e.editRow.patientPgName,
      "divider": "",
      "addressCountryId": e.editRow.addressCountryId,
      "patientCityName": e.editRow.patientCityName,
      "dependentdropdown": [e.editRow.addressStateId, e.editRow.addressCityId, e.editRow.addressTalukaId],
      "addressVillageId": e.editRow.addressVillageId,
      "addressLine": e.editRow.addressLine,
      "addressLandmark": e.editRow.addressLandmark,
      "addressPinCode": e.editRow.addressPinCode,

      "patientStateName": e.editRow.patientStateName,
      "patientIdentificationTypeName": e.editRow.patientIdentificationTypeName,
      "patientGenderName": e.editRow.patientGenderName,

      "patientCountryName": e.editRow.patientCountryName,
      "patientMaritalStatusName": e.editRow.patientMaritalStatusName,
      "patientTitleName": e.editRow.patientTitleName,
      "profileImage": e.editRow.profileImage,
      "addressId": e.editRow.addressId,
    }
    this.editData = edit;
    let address = {
      "addressId": e.editRow.addressId,
      "addressCountryId": e.editRow.addressCountryId,
      "dependentdropdown": [e.editRow.addressStateId, e.editRow.addressCityId, e.editRow.addressTalukaId],
      "addressVillageId": e.editRow.addressVillageId,
      "addressLine": e.editRow.addressLine,
      "addressLandmark": e.editRow.addressLandmark,
      "addressPinCode": e.editRow.addressPinCode,
      "addressPatientId":e.editRow.addressPatientId
    }
    this.addressEditData = address;
    let perAddress = {
      "checkBox": false,
      "permanentAddressCountryId": e.editRow.permanentAddressCountryId,
      "patientCityName": e.editRow.patientCityName,
      "dependentdropdown": [e.editRow.permanentAddressStateId, e.editRow.permanentAddressCityId, e.editRow.permanentAddressTalukaId],
      "permanentAddressVillageId": e.editRow.permanentAddressVillageId,
      "permanentAddressLine": e.editRow.permanentAddressLine,
      "permanentAddressLandmark": e.editRow.permanentAddressLandmark,
      "permanentAddressPinCode": e.editRow.permanentAddressPinCode
    }
    this.perAddressEditData = perAddress;
    let hospital = {
      "privilegeId":e.editRow.privilegeId,
      "privilegeName": e.editRow.privilegeName,
      "privilegePatientId": e.editRow.privilegePatientId,
    }
    this.hospitalEditData = hospital;
    let insorunce = {
      "insuranceId":e.editRow.insuranceId,
      "insuranceNumber": e.editRow.insuranceNumber,
      "insurancePolicyNumber": e.editRow.insurancePolicyNumber,
      "insuranceCompanyNumber": e.editRow.insuranceCompanyNumber,
      "insuranceCompanyName": e.editRow.insuranceCompanyName,
      "insurancePatientId":e.editRow.insurancePatientId
    }
    this.insorunceEditData = insorunce;
    let medical = {
      "mhId": e.editRow.mhId,
      "pastMedicationConditions":"",
      "familyMedicalHistory":"",
      "allergies":"",
      "selectPreviousTreatment":"",
      "mhIsSurgicalHistory": [e.editRow.mhIsSurgicalHistory],
      "mhIsSurgicalHistoryYear": e.editRow.mhIsSurgicalHistoryYear,
      "mhIsMedicationHistory": [e.editRow.mhIsMedicationHistory],
      "mhIsMedicationHistoryYear": e.editRow.mhIsMedicationHistoryYear,
      "mhIsPreviousDiagnosis": [e.editRow.mhIsPreviousDiagnosis],
      "mhIsPreviousDiagnosisYear": e.editRow.mhIsPreviousDiagnosisYear,
      "mhIsAlcoholConsume": [e.editRow.mhIsAlcoholConsume],
      "mhIsAlcoholConsumeYear": e.editRow.mhIsAlcoholConsumeYear,
      "mhIsTobacoConsume": [e.editRow.mhIsTobacoConsume],
      "mhIsTobacoConsumeYear": e.editRow.mhIsTobacoConsumeYear,
      "mhIsSmoker": [e.editRow.mhIsSmoker],
      "mhIsSmokerYear": e.editRow.mhIsSmokerYear,
      "mhPatientId":e.editRow.mhPatientId,
    }
    this.medicalEditData = medical;
    let additionDetailsEdit = {
      "paiId":e.editRow.paiId,
      "paiOccupation": e.editRow.paiOccupation,
      "paiReferredBy": e.editRow.paiReferredBy,
      "paiLanguages": e.editRow.paiLanguages,
      "paiPhoneNumber": e.editRow.paiPhoneNumber,
      "paiEthinicityId": e.editRow.paiEthinicityId,
      "paiReligion":  e.editRow.paiReligion,
      "paiEthinicityName":  e.editRow.paiEthinicityName,
      "paiPatientId":e.editRow.paiPatientId
    }
    this.addEditData = additionDetailsEdit;

    let mlcEditDataObj = {
      "mlcId": e.editRow.mlcId,
      "mlcTypeId": e.editRow.mlcTypeId,
      "mlcPoliceStationId": e.editRow.mlcPoliceStationId,
      "mlcTypeName": e.editRow.mlcTypeName,
      "mlcPoliceStationName": e.editRow.mlcPoliceStationName,
      "mlcPatientId": e.editRow.mlcPatientId,
    }
    this.mlcEditData = mlcEditDataObj;
    let emergencyContactEditDataObj = {
      "ecId": e.editRow.ecId,
      "ecName": e.editRow.ecName,
      "ecMobile": e.editRow.ecMobile,
      "ecRelation": e.editRow.ecRelation,
      "ecAddress": e.editRow.ecAddress,
      "ecPatientId": e.editRow.ecPatientId,
    }
    this.emergencyContactEditData = emergencyContactEditDataObj;
  }
  accordionrEmitData(e: any) {
    console.log("accordion => ", e);
    this.accordionIndex = e;

  }
  tabularValue(e: any) {
    this.tabularIndex = e.id;
  }

  calculateAge(dateString: any) {
    let now, today, yearNow, monthNow, dateNow, dob, yearDob, monthDob, dateDob, monthAge, dateAge, yearAge;
    now = new Date();
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    yearNow = now.getFullYear();
    monthNow = now.getMonth();
    dateNow = now.getDate();
    dob = new Date(dateString.substring(6, 10),
      dateString.substring(0, 2) - 1,
      dateString.substring(3, 5)
    );
    yearDob = dob.getFullYear();
    monthDob = dob.getMonth();
    dateDob = dob.getDate();
    monthAge = 0;
    dateAge = 0;
    yearAge = yearNow - yearDob;
    if (monthNow >= monthDob) {
      monthAge = monthNow - monthDob;
    } else {
      yearAge--;
      monthAge = 12 + monthNow - monthDob;
    }
    if (dateNow >= dateDob) {
      dateAge = dateNow - dateDob;
    } else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    this.getage = yearAge;
    this.agemon = monthAge;
    this.agedday = dateAge;
  }
}

