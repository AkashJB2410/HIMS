import { Component, OnInit } from '@angular/core';
import * as table_config from './registrationForm_table_config.json';
import registrationForm from "./registrationForm.json";
import { MessageService } from 'primeng/api';
import { RegistrationFormService } from './registration-form.service';
import * as role_table_config from './registrationForm_table_config.json';
import rgistrationData from './registrationForm.json';
import { FormService } from 'src/app/core/shared/service/form.service';

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
  formData: any;
  isForm: any = true;
  flag: any;
  gridData: any[];
  isAddEditFlag:any;

  constructor(private messageService: MessageService, private http: RegistrationFormService, private form$: FormService) { }

  ngOnInit(): void {
    this.assignDropDownOptions();
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllUserData();
    this.getConfigForTable();
  }

  assignDropDownOptions() {
    this.formData = Object.assign({}, rgistrationData);
    this.formData.form.formControls.forEach((data: any) => {
      if (data.formControlName === "selectIdentificationType") {
        data.values = [];
        let defaultObj = {
          "name": "Select Identification Type",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllIdentificationTypeData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.identification_Type,
              "code": e.identificationTypeId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectTitle") {
        data.values = [];
        let defaultObj = {
          "name": "Select Title",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllTitleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.title_Type,
              "code": e.titleId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectYear") {
        data.values = [];
        let defaultObj = {
          "name": "Select an Option",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllMstDurationData().subscribe(item => {
          item.forEach((e: any) => {
            console.log("sub module ==>> ==>>", e)
            let obj = {
              "name": e.durationType,
              "code": e.durationId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectGender") {
        data.values = [];
        let defaultObj = {
          "name": "Select Gender",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllmstGenderData().subscribe(item => {
          item.forEach((e: any) => {
            console.log("sub module ==>> ==>>", e)
            let obj = {
              "name": e.gender_Type,
              "code": e.mstGenderId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectBlood") {
        data.values = [];
        let defaultObj = {
          "name": "Select Blood",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllBloodGroupData().subscribe(item => {
          item.forEach((e: any) => {
            console.log("bloodGroup ==>> ==>>", e)
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
      if (data.formControlName === "selectSubDepartment") {
        data.values = [];
        let defaultObj = {
          "name": "Select Sub-Department",
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
      this.form$.reRenderForm(this.formData.form.formControls[5], true, 'isEditable');
      if (e[0].value == "1") {
        let validations = {
          "required": true,
          "pattern": "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "2") {
        let validations = {
          "required": true,
          "pattern": "^[A-PR-WY][1-9]\\d\\s?\\d{4}[1-9]$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "[A-Z]{5}[0-9]{4}[A-Z]{1}"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "4") {
        let validations = {
          "required": true,
          "pattern": "^[A-Z]{3}[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "5") {
        let validations = {
          "required": true,
          "pattern": "^\\d{10,12}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "6") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      }
      else if (e[0].value == "7") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "8") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "9") {
        let validations = {
          "required": true,
          "pattern": "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      } else if (e[0].value == "10") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      }else if (e[0].value == "11") {
        let validations = {
          "required": true,
          "pattern": "^[1-9]{2}-[0-9]{4}-[0-9]{4}-[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[5], validations, 'validations');
      }

    }

    if (e[1].fieldName == "DOBRad" && e[0].value == "DOB") {
      this.form$.reRenderForm(this.formData.form.formControls[11], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[13], false, 'isEditable');

    } else if (e[1].fieldName == "DOBRad" && e[0].value == "Age") {
      this.form$.reRenderForm(this.formData.form.formControls[13], true, 'isEditable');
      this.form$.reRenderForm(this.formData.form.formControls[11], false, 'isEditable');
    }
  }
  getAllUserData() {

    this.data = undefined;
    this.gridData = [];
    this.http.GetAllUserData().subscribe(res => {
      res.forEach((e: any) => {
        console.log("user data => ", e)
        let obj = {
          "userId": e.userId,
          "abhaAddress": e.abhaAddress,
          "abhaId": e.abhaId,
          "address": e.address,
          "age": e.age,
          "dob": e.dob,
          "emailId": e.emailId,
          "firstName": e.firstName,
          "identificationNo": e.identificationNo,
          "imagedata": e.imageData,
          "imageType": e.imageType,

          "lastName": e.lastName,
          "middleName": e.middleName,
          "mobileNo": e.mobileNo,

          "pincode": e.pincode,
          "userImage": e.userImage,

          "identificationType_Id":e.identificationType.identificationTypeId,
          "identificationType":e.identificationType.identification_Type,

          "bloodgroupId":e.mstBloodGroup.bloodgroupId,
          "bloodgroupName":e.mstBloodGroup.bloodgroupName,

          "districtId":e.mstDistrict.districtId,
          "districtName":e.mstDistrict.districtName,

          "doctorId":e.mstDoctor.doctorId,
          "doctorName":e.mstDoctor.doctorName,

          
          "durationId":e.mstDuration.durationId,
          "durationType":e.mstDuration.durationType,

          "gender_Type":e.mstGender.gender_Type,
          "mstGenderId":e.mstGender.mstGenderId,

          "stateId":e.mstState.stateId,
          "stateName":e.mstState.stateName,
          "titleId":e.mstTitle.titleId,
          "title_Type":e.mstTitle.title_Type,
          
          "mstWardDetailsid":e.mstWardDetails.mstWardDetailsid,
          "wardDetails":e.mstWardDetails.wardDetails
        
        }
        this.gridData.push(obj);
        console.log("objet ==>", obj);
      })
      this.data = [...this.gridData];
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
    this.deleteUSerData(e.role_Id);

    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  deleteUSerData(roleId: any) {
    this.http.deleteUserData(roleId)
      .subscribe(data => {
        this.getAllUserData();
        console.log("data" + data)
      })
  }
  isActive(e:any){}

  onAddEdit(e:any){
this.isAddEditFlag=e;
  }
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (this.isAddEditFlag == "add") {
      console.log(e)
      this.submitUserData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });

    } else {
      console.log(e);
      this.updateUserData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });

    }
  }

  submitUserData(roleData: any) {
    this.http.saveUserData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllUserData();
        console.log("data" + data)
      })
  }

  updateUserData(roleData: any) {
    this.http.updateUserData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllUserData();
        console.log("data" + data)
      })
  }

  fiteredData(e: any) {
    this.data = undefined;
    // this.http.filter(e)
    //   .subscribe(data => {
    //     this.data = data;
    //   })
  }
}

