import { Component, OnInit } from '@angular/core';
import * as table_config from './registrationForm_table_config.json';
import registrationForm from "./registrationForm.json";
import { MessageService } from 'primeng/api';
import { RegistrationFormService } from './registration-form.service';
import * as role_table_config from './registrationForm_table_config.json';
import rgistrationData from './registrationForm.json';
import { FormService } from 'src/app/core/shared/service/form.service';
import Breadcrumbs from './breadcrumb.json';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/core/shared/service/common.service';
import patientTabularFormData from './tabular.json';
import form1Data from './form1.json';
import form2Data from './form2.json';
import form3Data from './form3.json';
import form4Data from './form4.json';
import form5Data from './form5.json';
import form6Data from './form6.json';
import rgistBUttonData from './RegistButton.json';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  toast: any = {};
  showToast: any;
  Message: any;
  data: any[];
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = rgistrationData;
  sidebarButtonJSON: any = rgistBUttonData;
  formData: any;
  formData1: any;
  formData2: any;
  formData3: any;
  formData4: any;
  formData5: any;
  formData6: any;

  registartionFormData: any[] = [];
  isForm: any = true;
  flag: any;
  gridData: any[];
  isAddEditFlag: any;
  items: any = Breadcrumbs;
  imgName: any
  dateOfBirth: any;
  getage: any;
  agemon: any;
  agedday: any;
  editData: any;
  demoEditData:any;
  addressEditData:any;
  hospitalEditData:any;
  insorunceEditData:any;
  medicalEditData:any;
  addEditData:any;
  tabularFormData = patientTabularFormData;
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

  constructor(private messageService: MessageService, private common: CommonService, public datepipe: DatePipe, private http: RegistrationFormService, private form$: FormService) { }


  ngOnInit(): void {
    this.assignDropDownOptions();
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllPatientData();
    this.getConfigForTable();

  }
  sidebarDataForm1(e: any) {

  }
  rowClickData(e: any) { }
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
      //         "name": e.title_Type,
      //         "code": e.titleId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      if (data.formControlName === "selectYear") {
        data.values = [];
        let defaultObj = {
          "name": "Select an Option",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllMstDurationData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.durationType,
              "code": e.durationId
            }
            data.values.push(obj);
          })
        })
      }
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
      //         "name": e.gender_Type,
      //         "code": e.mstGenderId
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      if (data.formControlName === "selectBlood") {
        data.values = [];
        let defaultObj = {
          "name": "Select Blood",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllBloodGroupData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.bloodgroupName,
              "code": e.bloodgroupId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectState") {
        // data.values = [];
        data.values.forEach((a: any) => {
          if (a.label === "State") {
            a.values = [];
            let defaultObj = {
              "name": "Select State",
              "code": ""
            }
            a.values.push(defaultObj);
            this.http.GetAllMstStateData().subscribe(item => {
              item.forEach((e: any) => {
                let obj = {
                  "name": e.stateName,
                  "code": e.stateId
                }
                a.values.push(obj);
              })
            })
          }
          if (a.label === "Districts") {
            a.values = [];
            let defaultObj = {
              "name": "Select Districts",
              "code": "",
              "Mcode": ""
            }
            a.values.push(defaultObj);
            this.http.GetAllMstDistrictData().subscribe(item => {
              item.forEach((e: any) => {
                let obj = {
                  "name": e.districtName,
                  "code": e.districtId,
                  "Mcode": e.stateId.stateId
                }
                a.values.push(obj);
              })
            })
          }
        })

      }
      if (data.formControlName === "selectTaluka") {
        data.values = [];
        let defaultObj = {
          "name": "Select Taluka",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllMstTalukaData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.talukaName,
              "code": e.talukaId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectVillage") {
        data.values = [];
        let defaultObj = {
          "name": "Select Village",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllVillageData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.villageName,
              "code": e.villageid
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectDepartment") {
        data.values = [];
        let defaultObj = {
          "name": "Select Department",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllMstDepartment().subscribe(item => {
          console.log("department => ", item)
          item.forEach((e: any) => {
            let obj = {
              "name": e.departmentName,
              "code": e.departmentId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectSubDepartment") {
        data.values = [];
        let defaultObj = {
          "name": "Select Sub-Department",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllSubDepartmentData().subscribe(item => {
          console.log("Sub department => ", item)
          item.forEach((e: any) => {
            let obj = {
              "name": e.subDepartment,
              "code": e.subDepartmentId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectDoctor") {
        data.values = [];
        let defaultObj = {
          "name": "Select Doctor",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllDoctorData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.doctorName,
              "code": e.doctorId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectRelativeTitle") {
        data.values = [];
        let defaultObj = {
          "name": "Select Relative Title",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllRelativeTitle().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.relativeTitleType,
              "code": e.relativeTitleId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectWard") {
        data.values = [];
        let defaultObj = {
          "name": "Select Ward",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllWardData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.wardDetails,
              "code": e.mstWardDetailsid
            }
            data.values.push(obj);
          })
        })
      }
    })
  }
  events(e: any) {
    this.flag = e;

  }
  changeSelectItem(e: any) {
    console.log("changeSelectItem e => ", e)
    if (e[1].fieldName == "selectIdentificationType" && e[0].value != "") {
      this.form$.reRenderForm(this.formData.form.formControls[8], true, 'isEditable');
      if (e[0].value == "1") {
        let validations = {
          "required": true,
          "pattern": "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "2") {
        let validations = {
          "required": true,
          "pattern": "^[A-PR-WY][1-9]\\d\\s?\\d{4}[1-9]$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "[A-Z]{3}[0-9]{4}[A-Z]{1}"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "4") {
        let validations = {
          "required": true,
          "pattern": "^[A-Z]{3}[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "^\\d{10,12}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "6") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      }
      else if (e[0].value == "7") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "8") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "9") {
        let validations = {
          "required": true,
          "pattern": "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "10") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
      } else if (e[0].value == "11") {
        let validations = {
          "required": true,
          "pattern": "^[1-9]{2}-[0-9]{4}-[0-9]{4}-[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[8], validations, 'validations');
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
      this.form$.reRenderForm(this.formData.form.formControls[11], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[13], false, 'isEditable');

    } else if (e[1].fieldName == "DOBRad" && e[0].value == "Age") {
      this.form$.reRenderForm(this.formData.form.formControls[13], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[11], false, 'isEditable');
    }
    if (e[1].fieldName == "IPDRad" && e[0].value == "IPD") {
      this.form$.reRenderForm(this.formData.form.formControls[30], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[31], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[32], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[33], true, 'isEditable');
    }

    if (e[1].fieldName == "imgUpl") {
      let fileDta = e[0].target.files[0];
      this.http.uploadImg(fileDta).subscribe(res => {
        console.log("upload img data =>", res)
        this.imgName = res.ImageName;
      })
    }
    if (e[1].fieldName == "userBirthdate") {
      console.log("date of birth => ", e[0])
      let age = this.datepipe.transform(e[0], "MM/dd/yyyy")
      this.calculateAge(age);
      this.form$.reRenderForm(this.formData.form.formControls[13], this.getage, 'autofill');
    }

  }
  changeSelect(e:any){
    if (e[1].fieldName == "alcoholRad" && e[1].values[0].code ==true) {
      this.form$.reRenderForm(this.formData5.form.formControls[1], true, 'isVisible');
    }
    if (e[1].fieldName == "tobacooRad" && e[1].values[0].code==true ) {
      this.form$.reRenderForm(this.formData5.form.formControls[3], true, 'isVisible');
    }
    if (e[1].fieldName == "diabetesRad" && e[1].values[0].code ==true) {
      this.form$.reRenderForm(this.formData5.form.formControls[4], true, 'isVisible');
      this.form$.reRenderForm(this.formData5.form.formControls[6], true, 'isVisible');
    }
      
  }
  getAllPatientData() {
    this.data = undefined;
    this.gridData = [];
    this.http.GetAllPatientData().subscribe(res => {
      res.forEach((e: any, index: any) => {
        console.log("Patient data => ", e)
        let date = this.datepipe.transform(
          e.patientDob, "MM/dd/yyyy"
        );
        console.log("date birth date => ", date)
        let obj = {
          "id": index,
          "patientId": e.patientId,
          
          "patientTitleId": e.patientTitleId,
          "patientFirstname": e.patientFirstname,
          "patientMiddlename": e.patientMiddlename,
          "patientLastname": e.patientLastname,
          "patientMobileNumber": e.patientMobileNumber,
          "patientIdentificationTypeId": e.patientIdentificationTypeId,
          "patientIdentificationNo": "",
          "patientMaritalStatusId": e.patientMaritalStatusId,
          "DOBRad":"Age",
          "patientDob": date,
          
          "patientAge": e.patientAge,
          "patientGender": "2",
          // "dependentdropdown":[]
          
          "patientAddressLine1": e.patientAddressLine1,
          "patientAddressLine2": e.patientAddressLine2,
          "patientCityId": e.patientCityId,
          "patientStateId": e.patientStateId,
          "patientCountryId": e.patientCountryId,
          "patientBloodGroupId": e.patientBloodGroupId,
          "patientEthinicityId": e.patientEthinicityId,
          "patientReligion": e.patientReligion,
          "patientSocialStatusId": e.patientSocialStatusId,
          "patientBlock": e.patientBlock,
          "patientPrnNumber": e.patientPrnNumber,
          "patientPrivilageId": e.patientPrivilageId,
          "patientInsuranceNumber": e.patientInsuranceNumber,
          "patientInsurancePolicyNumber": e.patientInsurancePolicyNumber,
          "patientInsuranceCompanyNumber": e.patientInsuranceCompanyNumber,
          "patientInsuranceCompanyName": e.patientInsuranceCompanyName,
          "patientIsTobacoConsume": e.patientIsTobacoConsume,
          "patientIsTobacoConsumeYear": e.patientIsTobacoConsumeYear,
          "patientIsAlcoholConsume": e.patientIsAlcoholConsume,
          "patientIsAlcoholConsumeYear": e.patientIsAlcoholConsumeYear,
          "patientIsHaveDiabeties": e.patientIsHaveDiabeties,
          "patientIsHaveDiabetiesYear": e.patientIsHaveDiabetiesYear,

          "patientOccupation": e.patientOccupation,
          "patientReferredBy": e.patientReferredBy,
          "patientLanguages": e.patientLanguages,
          "patientPhoneNumber": e.patientPhoneNumber,


          "patientIdentificationTypeName": e.patientIdentificationTypeName,
          "patientTitleName": e.patientTitleName,
          "patientMaritalStatusName": e.patientMaritalStatusName,
          "patientCityName": e.patientCityName,
          "patientStateName": e.patientStateName,
          "patientCountryName": e.patientCountryName,
          "patientBloodGroupName": e.patientBloodGroupName,
          "patientEthinicityName": e.patientEthinicityName,
          "patientSocialStatusName": e.patientSocialStatusName,
          "patientPrivilageName": e.patientPrivilageName,


          "patientMrNo": e.patientMrNo,
          "profileImage": e.profileImage,
          "patientEmail": e.patientEmail,

          "patientHealthId": e.patientHealthId,
          "patientHealthNumber": e.patientHealthNumber,

          "patientIsHaveSugar": e.patientIsHaveSugar,
          "patientIsHaveSugarYear": e.patientIsHaveSugarYear,
          "patientUploadImage": e.patientUploadImage,
          "patientRegistrationSource": e.patientRegistrationSource,
          "isActive": e.isActive

        }
        this.gridData.push(obj);
      })
      this.data = [...this.gridData];
      // for (let i = 0; i < this.data.length; i++) {
      //   this.data[i].srNumber = i + 1;
      // }
      this.data;
      this.isdataReady = true;
    })
  }

  getConfigForTable() {
    // this.data = data;
    this.config = role_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    // this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    // console.log(e)
    this.data = undefined;
    this.deletePatientData(e.patientId);

    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  deletePatientData(patientId: any) {
    this.http.deletePatientData(patientId)
      .subscribe(data => {
        this.getAllPatientData();
      })
  }
  isActive(event: string) {
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;
      this.getAllPatientData();
    });
  }

  BulkDeleteRows(e: any) {
    this.data = [];
    if (e != '') {
      e.forEach((data: any) => {
        if (data.is_Active != false) {
          let obj = {
            "userId": data.userId,
          }
          this.deletePatientData(obj.userId);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'selected Rows',
            detail: ' Deleted.',
          });
        }
      });
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Delete All Data successfull.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'select Rows',
        detail: 'Rows are not selected.',
      });
    }

  }

  sidebarData(e: any) {
    console.log("sidebar data => ", e)
    if (this.isAddEditFlag.add == "add") {
      this.submitUserData(this.paramObj);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Your registration has been successfully completed!' });

    } else {
      this.updateUserData(this.paramObj);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });

    }
  }

  saveRegistartionForm(e: any) {
    console.log("saveRegistartionForm => ", this.paramObj);
    this.paramObj = {
      "patientIdentificationTypeId": e.selectIdentificationType,
      "patientTitleId": e.selectTitle,
      "patientFirstname": e.firstNameInput,
      "patientMiddlename": e.middleNameInput,
      "patientLastname": e.lastNameInput,

      "patientDob": e.userBirthdate,
      "patientAge": e.ageText,
      "patientBloodGroupId": e.selectBlood,
      "patientMaritalStatusId": e.selectMaritalStatus,
      "patientMobileNumber": e.mobileNoInput,
      "patientAddressLine1": e.addressLine1Input,
      "patientAddressLine2": e.addressLine2Input,
      "patientCityId": e.selectCity,
      "patientStateId": e.selectState,
      "patientCountryId": e.selectCountry,
      "patientId":e.patientId,
      "patientRegistrationSource": "Counter"

    }
    console.log("saveRegistartionForm => ", this.paramObj);
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
  }
  saveFormOne(e: any) {

    this.paramObj = {
      
      "patientEthinicityId": e.selectEthincity,
      "patientReligion": e.religionInput,

    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("saveFormOne => ", this.paramObj);
  }
  saveFormTwo(e: any) {
    this.paramObj = {
      "patientStateId": [e.selectState[0], e.selectState[1]],

    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }
  saveFormThree(e: any) {
    this.paramObj = {
      "patientPrnNumber": e.PRNNumber,
      "patientPrivilageId": e.privilageType,
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }
  saveFormFour(e: any) {
    this.paramObj = {
      "patientInsuranceNumber": e.insuranceNo,
      "patientInsurancePolicyNumber": e.policyNo,
      "patientInsuranceCompanyNumber": e.companyNo,
      "patientInsuranceCompanyName": e.companyName
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue..' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }
  saveFormFive(e: any) {
// diabetesQuestion1

// diabetesRad

    this.paramObj = {
      "patientIsTobacoConsume": e.alcoholRad,
      "patientIsTobacoConsumeYear": e.alcoholQuestion1,
      "patientIsAlcoholConsume": e.tobacooRad,
      "patientIsAlcoholConsumeYear": e.tobacooQuestion1,

    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }
  saveFormSix(e: any) {
    this.paramObj = {
      "patientOccupation": e.occupation,
      "patientReferredBy": e.refferedBy,
      "patientLanguages": e.language,
      "patientPhoneNumber": e.phoneNo,
    }
    this.messageService.add({ severity: 'success', summary: 'success', detail: 'Save And Continue.' });
    console.log("saveRegistartionForm => ", this.paramObj);
  }
  submitUserData(userData: any) {
    this.http.savePatientData(userData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllPatientData();
      })
  }

  updateUserData(userId: any) {
    this.http.updateUserData(userId)
      .subscribe(data => {
        this.data = undefined;
        this.getAllPatientData();
      })
  }

  fiteredData(e: any) {
    this.data = undefined;
    // this.http.filter(e)
    //   .subscribe(data => {
    //     this.data = data;
    //   })
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
      "divider1":"",
      "patientId": e.editRow.patientId,
      "patientTitleId": e.editRow.patientTitleId,
      "patientFirstname": e.editRow.patientFirstname,
      "patientMiddlename": e.editRow.patientMiddlename,
      "patientLastname": e.editRow.patientLastname,
      "patientMobileNumber": e.editRow.patientMobileNumber,
      "patientIdentificationTypeId": e.editRow.patientIdentificationTypeId,
      "patientIdentificationNumber": "2234 1234 1234",
      "patientMaritalStatusId": e.editRow.patientMaritalStatusId,
      "DOBRad":"",
      "patientDob": date,
      "AgeRad":["Age"],
      "patientAge": e.editRow.patientAge,
      "patientGender":"2",
      "divider2":"",
      "dependentdropdown":[e.editRow.patientCountryId,e.editRow.patientStateId,e.editRow.patientCityId],
      // "patientCountryId": ,
      // "patientStateId": ,
      // "patientCityId": ,
      "patientAddressLine1": e.editRow.patientAddressLine1,
      "patientAddressLine2": e.editRow.patientAddressLine2,
      "staticText1":"",
      "patientCountryName": e.editRow.patientCountryName,
      "patientMaritalStatusName": e.editRow.patientMaritalStatusName,
      
      "patientTitleName": e.editRow.patientTitleName,
      
      "profileImage": e.editRow.profileImage,
      
      "patientEmail": e.editRow.patientEmail,
      
      
      "patientCityName": e.editRow.patientCityName,
      
      "patientStateName": e.editRow.patientStateName,
      
     
      "patientHealthId": e.editRow.patientHealthId,
      "patientHealthNumber": e.editRow.patientHealthNumber,
      "patientSocialStatusId": e.editRow.patientSocialStatusId,
      "patientSocialStatusName": e.editRow.patientSocialStatusName,
     
      
      "patientBlock": e.editRow.patientBlock,
      
      
      
      // "patientOccupation": e.editRow.patientOccupation,
      // "patientReferredBy": e.editRow.patientReferredBy,
      // "patientLanguages": e.editRow.patientLanguages,
      // "patientPhoneNumber": e.editRow.patientPhoneNumber,
      "patientUploadImage": e.editRow.patientUploadImage,
      "patientRegistrationSource": e.editRow.patientRegistrationSource,
      "isActive": e.editRow.isActive,
      "patientMrNo": e.editRow.patientMrNo,
      "patientIdentificationTypeName": e.editRow.patientIdentificationTypeName,
      

    }
    this.editData = edit;
    let demogarfic={
      "patientBloodGroupId": e.editRow.patientBloodGroupId,
      "patientEthinicityId": e.editRow.patientEthinicityId,
      "patientReligion": e.editRow.patientReligion,
      "patientBloodGroupName": e.editRow.patientBloodGroupName,
      "patientEthinicityName": e.editRow.patientEthinicityName
    }
    this.demoEditData=demogarfic;
    let address={
      "patientSocialStatusId": e.editRow.patientSocialStatusId,
      "patientSocialStatusName": e.editRow.patientSocialStatusName,

    }
    this.addressEditData=address;
    let hospital={
      "patientPrnNumber": e.editRow.patientPrnNumber,
      "patientPrivilageId": e.editRow.patientPrivilageId,
      "patientPrivilageName": e.editRow.patientPrivilageName,
    }
    this.hospitalEditData=hospital;
    let insorunce={
      "patientInsuranceNumber": e.editRow.patientInsuranceNumber,
      "patientInsurancePolicyNumber": e.editRow.patientInsurancePolicyNumber,
      "patientInsuranceCompanyNumber": e.editRow.patientInsuranceCompanyNumber,
      "patientInsuranceCompanyName": e.editRow.patientInsuranceCompanyName,
     
    }
    this.insorunceEditData=insorunce;
    let medical={
      "patientIsAlcoholConsume": [e.editRow.patientIsAlcoholConsume],
      "patientIsAlcoholConsumeYear": e.editRow.patientIsAlcoholConsumeYear,
      "patientIsTobacoConsume":[ e.editRow.patientIsTobacoConsume],
      "patientIsTobacoConsumeYear": e.editRow.patientIsTobacoConsumeYear,
      "statix":"",
      "patientIsHaveDiabeties": [e.editRow.patientIsHaveDiabeties],
      "patientIsHaveDiabetiesYear": e.editRow.patientIsHaveDiabetiesYear,
      // "patientIsHaveSugar": e.editRow.patientIsHaveSugar,
      // "patientIsHaveSugarYear": e.editRow.patientIsHaveSugarYear,

    }
    this.medicalEditData=medical;
    let additionDetailsEdit = {
     
      "patientOccupation": e.editRow.patientOccupation,
      "patientReferredBy": e.editRow.patientReferredBy,
      "patientLanguages": e.editRow.patientLanguages,
      "patientPhoneNumber": e.editRow.patientPhoneNumber

    }
    this.addEditData=additionDetailsEdit;
    
    // this.common.sendEditData(e.editRow);
    // this.form$.reRenderForm(this.sidebarJSON.form.formControls[1], false, 'isVisible');
  }

  tabularValue(e: any) {
    console.log("tabular => ", e);
    if (e.id == 0) {
      this.formData2 = form2Data;
      this.formData3 = '';
      this.formData4 = '';
      this.formData5 = '';
      this.formData6 = '';
    } else if (e.id == 1) {
      this.formData2 = '';
      this.formData3 = form3Data;
      this.formData4 = '';
      this.formData5 = '';
      this.formData6 = '';
    } else if (e.id == 2) {
      this.formData2 = '';
      this.formData3 = '';
      this.formData4 = form4Data;
      this.formData5 = '';
      this.formData6 = '';
    } else if (e.id == 3) {
      this.formData2 = '';
      this.formData3 = '';
      this.formData4 = '';
      this.formData5 = form5Data;
      this.formData6 = '';
    } else if (e.id == 4) {
      this.formData2 = '';
      this.formData3 = '';
      this.formData4 = '';
      this.formData5 = '';
      this.formData6 = form6Data;
    }

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

    console.log("monthAge =======> ", monthAge)
    console.log("dateAge =======> ", dateAge)
    console.log("yearAge =======> ", yearAge)
    this.getage = yearAge;
    this.agemon = monthAge;
    this.agedday = dateAge;

    console.log("age =======> ", this.getage)
    console.log("agemon =======> ", this.agemon)
    console.log("agedat =======> ", this.agedday)

  }
}

function moment(dob: any) {
  throw new Error('Function not implemented.');
}

