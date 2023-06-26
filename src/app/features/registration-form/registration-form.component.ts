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
  isAddEditFlag: any;
  items: any = Breadcrumbs;
  imgName: any
  dateOfBirth: any;
  getage: any;
  agemon: any;
  agedday: any;

  constructor(private messageService: MessageService, public datepipe: DatePipe, private http: RegistrationFormService, private form$: FormService) { }

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

  rowClickData(e:any){}
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
      this.form$.reRenderForm(this.formData.form.formControls[9], true, 'isEditable');
      if (e[0].value == "1") {
        let validations = {
          "required": true,
          "pattern": "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "2") {
        let validations = {
          "required": true,
          "pattern": "^[A-PR-WY][1-9]\\d\\s?\\d{4}[1-9]$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "[A-Z]{3}[0-9]{4}[A-Z]{1}"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "4") {
        let validations = {
          "required": true,
          "pattern": "^[A-Z]{3}[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "3") {
        let validations = {
          "required": true,
          "pattern": "^\\d{10,12}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "6") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      }
      else if (e[0].value == "7") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "8") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "9") {
        let validations = {
          "required": true,
          "pattern": "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "10") {
        let validations = {
          "required": true,
          "pattern": ""
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      } else if (e[0].value == "11") {
        let validations = {
          "required": true,
          "pattern": "^[1-9]{2}-[0-9]{4}-[0-9]{4}-[0-9]{4}$"
        }
        this.form$.reRenderForm(this.formData.form.formControls[9], validations, 'validations');
      }
    }

    if (e[1].fieldName == "selectTitle") {
      if (e[0].value == "0") {
        // this.form$.reRenderForm(this.formData.form.formControls[13], "1", 'autofill');
      } else if (e[0].value == "1") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "1", 'autofill');
      } else if (e[0].value == "2") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "2", 'autofill');
      } else if (e[0].value == "3") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "1", 'autofill');
      } else if (e[0].value == "4") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "2", 'autofill');
      } else if (e[0].value == "5") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "1", 'autofill');
      } else if (e[0].value == "6") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "1", 'autofill');
      } else if (e[0].value == "7") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "2", 'autofill');
      } else if (e[0].value == "8") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "2", 'autofill');
      } else if (e[0].value == "9") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "1", 'autofill');
      } else if (e[0].value == "10") {
        this.form$.reRenderForm(this.formData.form.formControls[16], "2", 'autofill');
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
      let age =this.datepipe.transform(e[0], "MM/dd/yyyy")
      this.calculateAge(age);
      this.form$.reRenderForm(this.formData.form.formControls[13], this.getage, 'autofill');
    }

  }
  getAllUserData() {
    this.data = undefined;
    this.gridData = [];
    this.http.GetAllUserData().subscribe(res => {
      res.forEach((e: any) => {
        console.log("user data => ", e)
        let date = this.datepipe.transform(
          e.dob, "MM/dd/yyyy"
        );
        console.log("date birth date => ", date)
        let obj = {
          "staticText": "1",
          "userId": e.userId,
          "titleId": e.mstTitle.titleId,
          
          "firstName": e.firstName,
          "middleName": e.middleName,
          "lastName": e.lastName,
          "mobileNo": e.mobileNo,
          "emailId": e.emailId,
          "identificationType_Id": e.identificationType.identificationTypeId,
          "identificationNo": e.identificationNo,

          "RDODOB": "true",
          "dob": date,
          "RDOage": "Age",
          "age": e.age,
          "durationId": e.mstDuration.durationId,

          "bloodgroupId": e.mstBloodGroup.bloodgroupId,
          "mstGenderId": e.mstGender.mstGenderId,
          "staticText2": "1",
          "address": e.address,
          "stateId":[e.mstState.stateId,e.mstDistrict.districtId],
          "taluka": "Ambegaon",
          "village": "Ambegaon",
          "pincode": e.pincode,
          "staticText3": "1",
          "IPDRad": "IPD",
          "departmentId": e.departmentId,
          "subDepartmentId": e.subDepartmentId,
          "doctorId": e.mstDoctor.doctorId,
          "userImage": e.userImage,
          "relationId": e.relationId,
          "relationName": e.relationName,
          "relationLastName": "Gupta",
          "mstWardDetailsid": e.mstWardDetails.mstWardDetailsid,
          "identificationType": e.identificationType.identification_Type,
          "departmentName": e.departmentName,

          "subDepartment": e.subDepartment,
          "bloodgroupName": e.mstBloodGroup.bloodgroupName,


          "districtName": e.mstDistrict.districtName,


          "doctorName": e.mstDoctor.doctorName,



          "durationType": e.mstDuration.durationType,

          "gender_Type": e.mstGender.gender_Type,

          "stateName": e.mstState.stateName,


          "title_Type": e.mstTitle.title_Type,


          "wardDetails": e.mstWardDetails.wardDetails,

          "is_Active": e.is_Active

        }
        this.gridData.push(obj);
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
    this.deleteUserData(e.userId);

    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  deleteUserData(userId: any) {
    this.http.deleteUserData(userId)
      .subscribe(data => {
        this.getAllUserData();
      })
  }
  isActive(event: string) {
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;
      this.getAllUserData();
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
          this.deleteUserData(obj.userId);
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

  onAddEdit(e: any) {
    this.isAddEditFlag = e;
  }
  sidebarData(e: any) {
    console.log("sidebar data => ",e)
    if (this.isAddEditFlag == "add") {
      this.submitUserData(e, this.imgName);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });

    } else {
      this.updateUserData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });

    }
  }

  submitUserData(userData: any, img: any) {
    this.http.saveUserData(userData, img)
      .subscribe(data => {
        this.data = undefined;
        this.getAllUserData();
      })
  }

  updateUserData(userId: any) {
    this.http.updateUserData(userId)
      .subscribe(data => {
        this.data = undefined;
        this.getAllUserData();
      })
  }

  fiteredData(e: any) {
    this.data = undefined;
    // this.http.filter(e)
    //   .subscribe(data => {
    //     this.data = data;
    //   })
  }

  calculateAge(dateString: any) {
    let now, today, yearNow, monthNow, dateNow, dob, yearDob, monthDob, dateDob, monthAge, dateAge, yearAge;
    now = new Date();
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    yearNow = now.getFullYear();
    monthNow = now.getMonth();
    dateNow = now.getDate();

    console.log("yearNow =======> ",yearNow)
    console.log("monthNow =======> ",monthNow)
    console.log("dateNow =======> ",dateNow);
    console.log("dateString ===> ", dateString);
    dob = new Date(dateString.substring(6, 10),
      dateString.substring(0, 2) - 1,
      dateString.substring(3, 5)
    );
    yearDob = dob.getFullYear();
    monthDob = dob.getMonth();
    dateDob = dob.getDate();


    console.log("yearDob =======> ",yearDob)
    console.log("monthDob =======> ",monthDob)
    console.log("dateDob =======> ",dateDob);
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

    console.log("monthAge =======> ",monthAge)
    console.log("dateAge =======> ",dateAge)
    console.log("yearAge =======> ",yearAge)
    this.getage = yearAge;
    this.agemon = monthAge;
    this.agedday = dateAge;

    console.log("age =======> ",this.getage)
    console.log("agemon =======> ",this.agemon)
    console.log("agedat =======> ",this.agedday)

  }
}

function moment(dob: any) {
  throw new Error('Function not implemented.');
}

