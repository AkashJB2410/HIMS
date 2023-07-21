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
  mergedGridData: any[] = [];
  mergedAddGridData: any[] = [];
  mergedInsuranceGridData: any[] = [];
  mergedMlcGridData: any[] = [];
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
  demoEditData: any;
  addressEditData: any;
  hospitalEditData: any;
  insorunceEditData: any;
  medicalEditData: any;
  addEditData: any;
  mlcEditData: any
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
    "permanentAddressCityName": "string",
    "permanentAddressCountryId": "",
    "permanentAddressCountryName": "string",
    "permanentAddressLandmark": "",
    "permanentAddressLine": "",
    "permanentAddressPinCode": "",
    "permanentAddressStateId": "",
    "permanentAddressStateName": "string",
    "permanentAddressTalukaId": "",
    "permanentAddressTalukaName": "string",
    "permanentAddressVillageId": "",
    "permanentAddressVillageName": "",
    "permanentAddressblock": "string"
  };
  mstPerAddress: any;
  mstHospitalAss: any = {
    "privilegeId": "",
    "privilegeName": "string",
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
    "mlcPoliceStationName": "string",
    "mlcTypeId": "",
    "mlcTypeName": "string",
    "mlcPatientId": "",
  };
  merged: any;
  tabularIndex: any;
  accordionIndex: any;
  paramObj: any = {
    "id": "",
    "patientId": "",
    "patientMrNo": "",
    "patientTitleId": "",
    "patientTitleName": "",
    "patientFirstname": "",
    "patientMiddlename": "",
    "patientLastname": "",
    "patientFullname": "",
    "patientMobileNumber": "",
    "patientEmail": "",
    "patientDob": "",
    "patientIdentificationTypeId": "",
    "patientIdentificationTypeName": "",
    "patientMaritalStatusId": "",
    "patientMaritalStatusName": "",
    "patientAddress": "",
    "patientDemographics": "",
    "patientInsurance": "",
    "patientMedicalHistory": "",
    "patientAddInfo": "",
    "patientPrivilege": "",
    "patientHealthId": "",
    "patientHealthNumber": "",
    "patientUploadImage": "",
    "patientRegistrationSource": "",
    "demographicsId": "",
    "demographicsAge": "",
    "demographicsGenderId": "",
    "demographicsGenderName": "",
    "demographicsBloodGroupId": "",
    "demographicsBloodGroupName": "",
    "demographicsEthinicityId": "",
    "demographicsEthinicityName": "",
    "demographicsReligion": "",
    "demographicsSocialStatusId": "",
    "demographicsSocialStatusName": "",
    "demographicsPatientId": "",
    "addressId": "",
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
    "permanentAddressLine1": "",
    "permanentAddressLine2": "",
    "permanentAddressblock": "",
    "permanentAddressVillageId": "",
    "permanentAddressVillageName": "",
    "permanentAddressTalukaId": "",
    "permanentAddressTalukaName": "",
    "permanentAddressCityId": "",
    "permanentAddressCityName": "",
    "permanentAddressStateId": "",
    "permanentAddressStateName": "",
    "permanentAddressCountryId": "",
    "permanentAddressCountryName": "",
    "permanentAddressPinCode": "",
    "privilegeId": "",
    "privilegeName": "",
    "privilegePatientId": "",
    "insuranceId": "",
    "insuranceNumber": "",
    "insurancePolicyNumber": "",
    "insuranceCompanyNumber": "",
    "insuranceCompanyName": "",
    "insurencePatientId": "",
    "mhId": "",
    "mhIsTobacoConsume": false,
    "mhIsTobacoConsumeYear": "",
    "mhIsAlcoholConsume": false,
    "mhIsAlcoholConsumeYear": "",
    "mhIsHaveSugar": false,
    "mhIsHaveSugarYear": "",
    "mhPatientId": "",
    "patientAddId": "",
    "patientAddOccupation": "",
    "patientAddReferredBy": "",
    "patientAddLanguages": "",
    "patientAddPhoneNumber": "",
    "patientAddInfoPatientId": "",
    "isActive": ""

  };
  receivedData: any;
  startDate: any = "";
  endDate: any = "";
  formTitle: any;
  private subscription: Subscription;
  constructor(private messageService: MessageService, private common: CommonService, public datepipe: DatePipe,
    private http: RegistrationFormService, private form$: FormService, private dataService: DataServiceService) {
  }

  ngOnInit(): void {
    // this.formData = Object.assign({}, rgistrationData);
    this.formData.form.formControls[0].isVisible = false;
    this.formData.form.formControls[1].isVisible = false;
    this.subscription = this.dataService.outputData$.subscribe(
      data => {
        this.receivedData = data;
        console.log("label label====>>", this.receivedData.label);
        if (this.receivedData.label == "OPD" && this.formData.form.formControls[0].formControlName == "OPDRad") {
          this.formData.form.formControls[0].isVisible = true;
          this.isShowServices = !this.isShowServices;
          this.servData = dataOPD;
          this.formTitle = "OPD REGISTRATION";
        } else if (this.receivedData.label == "IPD" && this.formData.form.formControls[1].formControlName == "IPDRad") {
          this.formData.form.formControls[1].isVisible = true;
          this.isShowServices = !this.isShowServices;
          this.servData = dataIPD;
          this.formTitle = "IPD REGISTRATION";
        }
      }
    );

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
    console.log("Mobile data =>", e);
    this.form$.reRenderForm(this.formData.form.formControls[4], e.patientTitleId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[5], e.patientFirstname, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[6], e.patientMiddlename, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[7], e.patientLastname, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[8], e.patientMobileNumber, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[9], e.patientEmail, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[10], e.patientIdentificationTypeId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[11], e.patientIdentificationTypeNumber, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[13], e.patientDob, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[15], e.patientAge, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[16], e.patientGenderId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[17], e.patientBloodGroupId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[18], e.patientEthinicityId, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[19], e.patientReligion, 'autofill');
    this.form$.reRenderForm(this.formData.form.formControls[20], e.patientMaritalStatusId, 'autofill');

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
        this.mobileGridData = data[1].result;
        this.form$.showModal(true);
        console.log("this.mobileGridData ===>", this.mobileGridData)

      });
    }
    if (e[1].fieldName == "selectIdentificationType" && e[0].value != "") {
      this.form$.reRenderForm(this.formData.form.formControls[11], true, 'isEditable');
      if (e[0].value == "1") {
        let validations = {
          "required": true,
          "pattern": "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "2") {
        let validations = {
          "required": true,
          "pattern": "^[A-PR-WY][1-9]\\d\\s?\\d{4}[1-9]$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "[A-Z]{3}[0-9]{4}[A-Z]{1}"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "4") {
        let validations = {
          "required": true,
          "pattern": "^[A-Z]{3}[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "^\\d{10,12}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "6") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      }
      else if (e[0].value == "7") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "8") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "9") {
        let validations = {
          "required": true,
          "pattern": "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "10") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      } else if (e[0].value == "11") {
        let validations = {
          "required": true,
          "pattern": "^[1-9]{2}-[0-9]{4}-[0-9]{4}-[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[11], validations, 'validations');
      }
    }

    if (e[1].fieldName == "selectTitle") {
      if (e[0].value == "0") {
        // this.form$.reRenderForm(this.formData.form.formControls[13], "1", 'autofill');
      } else if (e[0].value == "1") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "1", 'autofill');
      } else if (e[0].value == "2") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "2", 'autofill');
      } else if (e[0].value == "3") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "1", 'autofill');
      } else if (e[0].value == "4") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "2", 'autofill');
      } else if (e[0].value == "5") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "1", 'autofill');
      } else if (e[0].value == "6") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "1", 'autofill');
      } else if (e[0].value == "7") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "2", 'autofill');
      } else if (e[0].value == "8") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "2", 'autofill');
      } else if (e[0].value == "9") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "1", 'autofill');
      } else if (e[0].value == "10") {
        this.form$.reRenderForm(this.formData.form.formControls[14], "2", 'autofill');
      }
    }

    if (e[1].fieldName == "DOBRad" && e[0].value == "DOB") {
      this.form$.reRenderForm(this.formData.form.formControls[13], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[15], false, 'isEditable');

    } else if (e[1].fieldName == "DOBRad" && e[0].value == "Age") {
      this.form$.reRenderForm(this.formData.form.formControls[15], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[13], false, 'isEditable');
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
      this.form$.reRenderForm(this.formData.form.formControls[15], this.getage, 'autofill');
    }

  }
  changeSelect(e: any) {
    if (e[1].fieldName == "surgicalRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[5], true, 'isEditable');
    } else if (e[1].fieldName == "surgicalRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[5], false, 'isEditable');
    }
    if (e[1].fieldName == "medicationRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[7], true, 'isEditable');
    } else if (e[1].fieldName == "medicationRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[7], false, 'isEditable');
    }
    if (e[1].fieldName == "diagnosticsRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[9], true, 'isEditable');
    } else if (e[1].fieldName == "diagnosticsRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[9], false, 'isEditable');
    }
    if (e[1].fieldName == "alcoholRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[11], true, 'isEditable');
    } else if (e[1].fieldName == "alcoholRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[11], false, 'isEditable');
    }
    if (e[1].fieldName == "tobacooRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[13], true, 'isEditable');
    } else if (e[1].fieldName == "tobacooRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[13], false, 'isEditable');
    }
    if (e[1].fieldName == "smokingRad" && e[0].value == "true") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[15], true, 'isEditable');
    } else if (e[1].fieldName == "smokingRad" && e[0].value == "false") {
      this.form$.reRenderForm(this.medicalHisFormData.form.formControls[15], false, 'isEditable');
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

  getAllData() {
    this.http.getDataFromApis().subscribe(
      ([api1Response, api2Response, api3Response, api4Response, api5Response, api6Response, api7Response]) => {
        // Handle the responses from both APIs
        console.log('API 1 Response:', api1Response[1].result);
        console.log('API 2 Response:', api2Response[1].result);
        console.log('API 3 Response:', api3Response[1].result);
        console.log('API 4 Response:', api4Response[1].result);
        console.log('API 5 Response:', api5Response[1].result);
        console.log('API 6 Response:', api6Response[1].result);
        console.log('API 7 Response:', api7Response[1].result);
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
            "patientEthinicityId": e.patientEthinicityId,
            "patientEthinicityName": e.patientEthinicityName,
            "patientGenderId": e.patientGenderId,
            "patientGenderName": e.patientGenderName,
            "patientReligion": e.patientReligion
          }
          this.gridData.push(patientData);
        })
        console.log("this gridData =====>>>>>", this.gridData);
        api2Response[1].result.forEach((e: any) => {
          let addressData = {
            "addressCityId": e.addressCityId,
            "addressCityName": e.addressCityName,
            "addressCountryId": e.addressCountryId,
            "addressCountryName": e.addressCountryName,
            "addressId": e.addressId,
            "addressLandmark": e.addressLandmark,
            "addressLine": e.addressLine,
            "addressPatientId": e.addressPatientId,
            "addressPinCode": e.addressPinCode,
            "addressStateId": e.addressStateId,
            "addressStateName": e.addressStateName,
            "addressTalukaId": e.addressTalukaId,
            "addressTalukaName": e.addressTalukaName,
            "addressVillageId": e.addressVillageId,
            "addressVillageName": e.addressVillageName,
            "addressblock": e.addressblock,
            "permanentAddressCityId": e.permanentAddressCityId,
            "permanentAddressCityName": e.permanentAddressCityName,
            "permanentAddressCountryId": e.permanentAddressCountryId,
            "permanentAddressCountryName": e.permanentAddressCountryName,
            "permanentAddressLandmark": e.permanentAddressLandmark,
            "permanentAddressLine": e.permanentAddressLine,
            "permanentAddressPinCode": e.permanentAddressPinCode,
            "permanentAddressStateId": e.permanentAddressStateId,
            "permanentAddressStateName": e.permanentAddressStateName,
            "permanentAddressTalukaId": e.permanentAddressTalukaId,
            "permanentAddressTalukaName": e.permanentAddressTalukaName,
            "permanentAddressVillageId": e.permanentAddressVillageId,
            "permanentAddressVillageName": e.permanentAddressVillageName,
            "permanentAddressblock": e.permanentAddressblock,
          }
          this.gridData.forEach(res => {
            if (res.patientId == e.addressPatientId) {
              this.merged = this.mergeObjects(res, addressData);
              this.mergedGridData.push(this.merged);
            }
          })
        })
        this.merged = '';
        api3Response[1].result.forEach((e: any) => {
          let privilegeData = {
            "privilegeId": e.privilegeId,
            "privilegeName": e.privilegeName,
            "privilegePatientId": e.privilegePatientId,
          }
          this.mergedGridData.forEach(res => {
            if (res.patientId == e.privilegePatientId) {
              this.merged = this.mergeObjects(res, privilegeData);
              this.mergedPrivalegeGridData.push(this.merged);
            }
          })
        })

        this.merged = '';
        api4Response[1].result.forEach((e: any) => {
          let insuranceData = {
            "insuranceCompanyName": e.insuranceCompanyName,
            "insuranceCompanyNumber": e.insuranceCompanyNumber,
            "insuranceId": e.insuranceId,
            "insuranceNumber": e.insuranceNumber,
            "insurancePatientId": e.insurancePatientId,
            "insurancePolicyNumber": e.insurancePolicyNumber,
          }
          this.mergedPrivalegeGridData.forEach(res => {
            if (res.patientId == e.insurancePatientId) {
              this.merged = this.mergeObjects(res, insuranceData);
              this.mergedInsuranceGridData.push(this.merged);
            }
          })
        })
        this.merged = '';
        api5Response[1].result.forEach((e: any) => {
          let mhData = {
            "mhId": e.mhId,
            "mhIsAlcoholConsume": e.mhIsAlcoholConsume,
            "mhIsAlcoholConsumeYear": e.mhIsAlcoholConsumeYear,
            "mhIsMedicationHistory": e.mhIsMedicationHistory,
            "mhIsMedicationHistoryYear": e.mhIsMedicationHistoryYear,
            "mhIsPreviousDiagnosis": e.mhIsPreviousDiagnosis,
            "mhIsPreviousDiagnosisYear": e.mhIsPreviousDiagnosisYear,
            "mhIsSmoker": e.mhIsSmoker,
            "mhIsSmokerYear": e.mhIsSmokerYear,
            "mhIsSurgicalHistory": e.mhIsSurgicalHistory,
            "mhIsSurgicalHistoryYear": e.mhIsSurgicalHistoryYear,
            "mhIsTobacoConsume": e.mhIsTobacoConsume,
            "mhIsTobacoConsumeYear": e.mhIsTobacoConsumeYear,
            "mhPatientId": e.mhIsTobacoConsumeYear,
          }
          this.mergedInsuranceGridData.forEach(res => {
            if (res.patientId == e.mhPatientId) {
              this.merged = this.mergeObjects(res, mhData);
              this.mergedMhGridData.push(this.merged);
            }
          })
        })
        this.merged = '';
        api6Response[1].result.forEach((e: any) => {
          let paiData = {
            "paiId": e.paiId,
            "paiLanguages": e.paiLanguages,
            "paiOccupation": e.paiOccupation,
            "paiPatientId": e.paiPatientId,
            "paiPhoneNumber": e.paiPhoneNumber,
            "paiReferredBy": e.paiReferredBy,
          }
          this.mergedMhGridData.forEach(res => {
            if (res.patientId == e.paiPatientId) {
              this.merged = this.mergeObjects(res, paiData);
              this.mergedPaiGridData.push(this.merged);
            }
          })
        })
        this.merged = '';
        api7Response[1].result.forEach((e: any) => {
          let mlcData = {
            "mlcId": "",
            "mlcPatientId": "",
            "mlcPoliceStationId": "",
            "mlcPoliceStationName": "",
            "mlcTypeId": "",
            "mlcTypeName": "",
          }
          this.mergedPaiGridData.forEach(res => {
            if (res.patientId == e.mlcPatientId) {
              this.merged = this.mergeObjects(res, mlcData);
              this.mergedMlcGridData.push(this.merged);
            }
          })
        })
        this.merged = '';
        this.data = [...this.mergedMlcGridData];
        this.gridData = [];
        this.mergedGridData = [];
        this.mergedInsuranceGridData = [];
        this.mergedMhGridData = [];
        this.mergedMlcGridData = [];
        this.mergedPaiGridData = [];
        this.mergedPrivalegeGridData = [];
        console.log('API Data ===>>>:', this.data);
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
      this.mstAddress.addressPatientId = res[1].result.patientId;
      this.mstHospitalAss.privilegePatientId = res[1].result.patientId;
      this.mstInsurance.insurancePatientId = res[1].result.patientId;
      this.mstMedicalHistory.mhPatientId = res[1].result.patientId;
      this.mstAdditionalDetails.paiPatientId = res[1].result.patientId;
      this.mstMLC.mlcPatientId = res[1].result.patientId;
    });
  }
  sidebarData(e: any) {
    console.log("sidebar data => ", e)
    if (e == 'reset') {
      console.log(e);
    } else if (this.isAddEditFlag.add == "add") {
      this.submitMstPatient(this.mstPatient);

      setTimeout(() => {
        this.http.saveDataFromApis(this.mstAddress, this.mstHospitalAss, this.mstInsurance, this.mstMedicalHistory, this.mstAdditionalDetails, this.mstMLC).subscribe(
          (response: any[]) => {
            this.data = undefined;
            this.getAllData();
            // Handle the responses from all the POST requests
            // console.log('Response 1:', response);
            console.log('Response 2:', response[0][1].result);
            console.log('Response 3:', response[1][1].result);
            console.log('Response 4:', response[2][1].result);
            console.log('Response 5:', response[3][1].result);
            console.log('Response 6:', response[4][1].result);
            console.log('Response 7:', response[5][1].result);
          },
          (error: any) => {
            console.error('Error:', error);
          });
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your registration has been successfully completed!' });
      }, 1000)

    } else {
      this.updateUserData(this.paramObj);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });
    }
  }

  saveRegistartionForm(e: any) {
    // if (e.middleNameInput != undefined) {
    //   this.middleName = e.middleNameInput;
    // }
    // if (e.lastNameInput != undefined) {
    //   this.lastName = e.lastNameInput;
    // }
    // let fullName = e.firstNameInput + " " + this.middleName + " " + this.lastName;
    // let fullNamestring=fullName.split(" ").join("");
    // console.log("full name ==>>", fullNamestring)
    let date = this.datepipe.transform(
      e.userBirthdate, "MM/dd/yyyy"
    );
    this.mstPatient = {
      "patientAge": e.ageText || '',
      // "patientBloodGroupId": e.selectBlood.code || '',
      "patientBloodGroupName": e.selectBlood.name || '',
      "patientDob": date || '',
      "patientEmail": e.emailInput || '',
      "patientEthinicityId": e.selectEthincity.code || '',
      "patientEthinicityName": e.selectEthincity.name || '',
      "patientFirstname": e.firstNameInput || '',
      "patientGenderId": e.selectGender.code || '',
      "patientGenderName": e.selectGender.name || '',
      "patientIdentificationTypeId": e.selectIdentificationType.code || '',
      "patientIdentificationTypeName": e.selectIdentificationType.name || '',
      "patientIdentificationTypeNumber": e.identificationNoInput || '',
      "patientLastname": e.lastNameInput || '',
      "patientMaritalStatusId": e.selectMaritalStatus.code || '',
      "patientMaritalStatusName": e.selectMaritalStatus.name || '',
      "patientMiddlename": e.middleNameInput || '',
      "patientMobileNumber": e.mobileNoInput || '',
      "patientRegistrationSource": "Conter",
      "patientReligion": e.religionInput || '',
      "patientTitleId": e.selectTitle.code || '',
      "patientTitleName": e.selectTitle.name || '',
      "patientUploadImage": ""
    }
    console.log("mstPatient => ", this.mstPatient);
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
  }

  saveAddress(e: any) {
    this.mstAddress = {
      "addressLine1": e.addressInput,
      "addressLine2": e.landmarkInput,
      "addressblock": "",
      "addressVillageId": "",
      "addressVillageName": e.selectVillage,
      "addressTalukaId": e.dependentdropdown[2],
      "addressTalukaName": "",
      "addressCityId": e.dependentdropdown[1],
      "addressCityName": "",
      "addressStateId": e.dependentdropdown[0],
      "addressStateName": "",
      "addressCountryId": e.selectCountry,
      "addressCountryName": "",
      "addressPatientId": e.pinCodeInput,
      "addressPinCode": "",
      "permanentAddressCityId": e.perAddDependentdropdown[1],
      "permanentAddressCityName": "string",
      "permanentAddressCountryId": e.perAddSelectCountry,
      "permanentAddressCountryName": "string",
      "permanentAddressLandmark": e.perAddLandmarkInput,
      "permanentAddressLine": e.perAddAddressInput,
      "permanentAddressPinCode": e.perAddPinCodeInput,
      "permanentAddressStateId": e.perAddDependentdropdown[0],
      "permanentAddressStateName": "string",
      "permanentAddressTalukaId": e.perAddDependentdropdown[2],
      "permanentAddressTalukaName": "string",
      "permanentAddressVillageId": e.perAddSelectVillage,
      "permanentAddressVillageName": "",
      "permanentAddressblock": "string"
    }
    console.log("mstAddress=> ", this.mstAddress);
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
  }

  saveFormThree(e: any) {
    this.mstHospitalAss = {
      "privilegeId": e.privilageType,
      "privilegeName": "string",
      "privilegePatientId": ""
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("mstHospitalAss => ", this.mstHospitalAss);
  }
  saveFormFour(e: any) {
    this.mstInsurance =
    {
      "insuranceCompanyName": e.companyName,
      "insuranceCompanyNumber": e.companyNo,
      "insuranceNumber": e.insuranceNo,
      "insurancePolicyNumber": e.policyNo,
      "insurancePatientId": ""
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("mstInsurance => ", this.mstInsurance);
  }
  saveFormFive(e: any) {
    this.mstMedicalHistory = {
      "mhIsAlcoholConsume": e.alcoholRad,
      "mhIsAlcoholConsumeYear": e.alcoholQuestion1,
      "mhIsMedicationHistory": e.medicationRad,
      "mhIsMedicationHistoryYear": e.medicationDetails,
      "mhIsPreviousDiagnosis": e.DiagnosisRad,
      "mhIsPreviousDiagnosisYear": e.DiagnosissDetails,
      "mhIsSmoker": e.smokingRad,
      "mhIsSmokerYear": e.smokingQuestion1,
      "mhIsSurgicalHistory": e.surgeriesDetails,
      "mhIsSurgicalHistoryYear": e.surgicalRad,
      "mhIsTobacoConsume": e.tobacooRad,
      "mhIsTobacoConsumeYear": e.tobacooQuestion1,
      "mhPatientId": ""
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstMedicalHistory => ", this.mstMedicalHistory);
  }
  saveFormSix(e: any) {
    this.mstAdditionalDetails = {
      "paiLanguages": e.language,
      "paiOccupation": e.occupation,
      "paiPhoneNumber": e.phoneNo,
      "paiReferredBy": e.refferedBy,
      "paiPatientId": "",
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstAdditionalDetails => ", this.mstAdditionalDetails);
  }

  saveFormMLC(e: any) {
    this.mstMLC = {
      "mlcPoliceStationId": e.selectPoliceStation,
      "mlcPoliceStationName": "string",
      "mlcTypeId": e.selectMLCType,
      "mlcTypeName": "string",
      "mlcPatientId": "",
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("mstMLC => ", this.mstMLC);
  }


  updateUserData(userId: any) {
    this.http.updateUserData(userId)
      .subscribe((data: any) => {
        this.data = undefined;
        this.getAllData();
      })
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
      "OPDRad": "",
      "IPDRad": "",
      "divider1": "",
      "patientId": e.editRow.patientId,
      "patientTitleId": e.editRow.patientTitleId,
      "patientFirstname": e.editRow.patientFirstname,
      "patientMiddlename": e.editRow.patientMiddlename,
      "patientLastname": e.editRow.patientLastname,
      "patientMobileNumber": e.editRow.patientMobileNumber,
      "patientEmail": e.editRow.patientEmail,
      "patientIdentificationTypeId": e.editRow.patientIdentificationTypeId,
      "patientIdentificationTypeNumber": e.editRow.patientIdentificationTypeNumber,
      "DOBRad": "",
      "patientDob": date,
      "AgeRad": ["Age"],
      "patientAge": e.editRow.patientAge,
      "patientGenderId": e.editRow.patientGenderId,
      "patientBloodGroupId": e.editRow.patientBloodGroupId,



      "divider2": "",
      "dependentdropdown": [e.editRow.patientCountryId, e.editRow.patientStateId, e.editRow.patientCityId],
      "staticText1": "",
      "patientCountryName": e.editRow.patientCountryName,
      "patientMaritalStatusName": e.editRow.patientMaritalStatusName,
      "patientTitleName": e.editRow.patientTitleName,
      "profileImage": e.editRow.profileImage,

      "patientCityName": e.editRow.patientCityName,
      "patientStateName": e.editRow.patientStateName,
      "patientHealthId": e.editRow.patientHealthId,
      "patientHealthNumber": e.editRow.patientHealthNumber,
      "patientSocialStatusId": e.editRow.patientSocialStatusId,
      "patientSocialStatusName": e.editRow.patientSocialStatusName,
      "patientBlock": e.editRow.patientBlock,
      "patientUploadImage": e.editRow.patientUploadImage,
      "patientRegistrationSource": e.editRow.patientRegistrationSource,
      "isActive": e.editRow.isActive,
      "patientMrNo": e.editRow.patientMrNo,
      "patientIdentificationTypeName": e.editRow.patientIdentificationTypeName,

      "patientMaritalStatusId": e.editRow.patientMaritalStatusId,
    }
    this.editData = edit;
    let demogarfic = {
      "patientBloodGroupId": e.editRow.patientBloodGroupId,
      "patientEthinicityId": e.editRow.patientEthinicityId,
      "patientReligion": e.editRow.patientReligion,
      "patientBloodGroupName": e.editRow.patientBloodGroupName,
      "patientEthinicityName": e.editRow.patientEthinicityName
    }
    this.demoEditData = demogarfic;
    let address = {
      "patientSocialStatusId": e.editRow.patientSocialStatusId,
      "patientSocialStatusName": e.editRow.patientSocialStatusName,

    }
    this.addressEditData = address;
    let hospital = {
      "patientPrnNumber": e.editRow.patientPrnNumber,
      "patientPrivilageId": e.editRow.patientPrivilageId,
      "patientPrivilageName": e.editRow.patientPrivilageName,
    }
    this.hospitalEditData = hospital;
    let insorunce = {
      "patientInsuranceNumber": e.editRow.patientInsuranceNumber,
      "patientInsurancePolicyNumber": e.editRow.patientInsurancePolicyNumber,
      "patientInsuranceCompanyNumber": e.editRow.patientInsuranceCompanyNumber,
      "patientInsuranceCompanyName": e.editRow.patientInsuranceCompanyName,

    }
    this.insorunceEditData = insorunce;
    let medical = {
      "patientIsAlcoholConsume": [e.editRow.patientIsAlcoholConsume],
      "patientIsAlcoholConsumeYear": e.editRow.patientIsAlcoholConsumeYear,
      "patientIsTobacoConsume": [e.editRow.patientIsTobacoConsume],
      "patientIsTobacoConsumeYear": e.editRow.patientIsTobacoConsumeYear,
      "statix": "",
      "patientIsHaveDiabeties": [e.editRow.patientIsHaveDiabeties],
      "patientIsHaveDiabetiesYear": e.editRow.patientIsHaveDiabetiesYear,

    }
    this.medicalEditData = medical;
    let additionDetailsEdit = {
      "patientOccupation": e.editRow.patientOccupation,
      "patientReferredBy": e.editRow.patientReferredBy,
      "patientLanguages": e.editRow.patientLanguages,
      "patientPhoneNumber": e.editRow.patientPhoneNumber
    }
    this.addEditData = additionDetailsEdit;

    let mlcEditDataObj = {
    }
    this.mlcEditData = mlcEditDataObj;
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

