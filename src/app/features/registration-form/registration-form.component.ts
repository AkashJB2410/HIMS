import { Component, OnInit } from '@angular/core';
import * as table_config from './registrationForm_table_config.json';
import registrationForm from "./registrationForm.json";
import { MessageService } from 'primeng/api';
import { RegistrationFormService } from './registration-form.service';
import * as role_table_config from './registrationForm_table_config.json';
import rgistrationData from './registrationForm.json';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  toast: any = {};
  showToast: any;
  Message: any;
  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = rgistrationData;
  formdata: any;

  constructor(private messageService: MessageService, private http: RegistrationFormService) { }

  ngOnInit(): void {
    this.assignDropDownOptions();
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllRoleData();
    // this.data = roleData;
    this.getConfigForTable();
  }

  assignDropDownOptions() {
    this.formdata = Object.assign({}, rgistrationData);
    this.formdata.form.formControls.forEach((data: any) => {
      if (data.formControlName === "selectIdentificationType") {
        data.values = [];
        let defaultObj = {
          "name": "Select Role",
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
      // if (data.formControlName === "selectYear") {
      //   data.values = [];
      //   let defaultObj = {
      //     "name": "Select Sub Module",
      //     "code": "0"
      //   }
      //   data.values.push(defaultObj);
      //   this.http.GetAllSubModuleData().subscribe(item => {
      //     item.forEach((e: any) => {
      //       console.log("sub module ==>> ==>>",e)
      //       let obj = {
      //         "name": e.label,
      //         "code": e.submodule_Id
      //       }
      //       data.values.push(obj);
      //     })
      //   })
      // }
      if (data.formControlName === "selectGender") {
        data.values = [];
        let defaultObj = {
          "name": "Select Sub Module",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllmstGenderData().subscribe(item => {
          item.forEach((e: any) => {
            console.log("sub module ==>> ==>>", e)
            let obj = {
              "name": e.gender_Type,
              "code": e.id
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectBlood") {
        data.values = [];
        let defaultObj = {
          "name": "Select Sub Module",
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
              "name": e.taluka,
              "code": e.talukaId
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
                console.log("state ==>> ==>>", e)
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
                console.log("state ==>> ==>>", e)
                let obj = {
                  "name": e.stateName,
                  "code": e.district,
                  "Mcode": e.stateId_stateId
                }
                a.values.push(obj);
              })
            })
          }
        })

      }

    })

  }


  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e)
    } else if (e == 'cancel') {
      console.log(e)
    }
  }
  getAllRoleData() {
    this.http.GetAllUserData().subscribe(res => {
      this.data = res;
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
        this.getAllRoleData();
        console.log("data" + data)
      })
  }
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (e.idInput == true) {
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
        this.getAllRoleData();
        console.log("data" + data)
      })
  }

  updateUserData(roleData: any) {
    this.http.updateUserData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllRoleData();
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

