import {
  Component,
  OnInit
} from '@angular/core';
import {
  SubDepartmentService
} from './sub-department.service';
import sub_department_Table_Config from './sub-department_table_config.json';
import sub_department_Form from './sub-department.json'
import {
  MessageService
} from 'primeng/api';

@Component({
  selector: 'app-sub-department',
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.css']
})
export class SubDepartmentComponent implements OnInit {

  data: any = [];
  subDepartment: any = [] = [];
  config: any;
  configurations: any;
  isdataReady = false;
  table_Config: any;
  visibleSiderbar: boolean = false;
  table_Data: any;
  editMethod: boolean = false;
  sidebar_Update_Input: any = sub_department_Form;
  saveMethod: any;
  constructor(private http: SubDepartmentService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.assignDropDownOptions();
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getConfigForTable();
    this.getAllSubDepartment();
  }
  getConfigForTable() {
    this.config = sub_department_Table_Config;
  }

  assignDropDownOptions() {
    this.table_Data = Object.assign({}, sub_department_Form);
    this.table_Data.form.formControls.forEach((data: any) => {
      if (data.formControlName === "selectDepartment") {
        data.values = [];
        let defaultObj = {
          "name": "Select Department",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.getAllDepartment().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.departmentName,
              "code": e.departmentId
            }
            data.values.push(obj);
          })
        })
      }
    })
  }

  getAllSubDepartment() {
    this.data = undefined;
    this.subDepartment=[];
    
    this.http.getAllSubDepartment().subscribe(res => {
      res.forEach((e: any) => {
        console.log("res => ",e)
        let obj = {
          "subDepartmentId": e.subDepartmentId,
          "mstDepartment": e.mstDepartment.departmentId,
          "subDepartment" : e.subDepartment,
          "is_Active":e.is_Active,
          "departmentName":e.mstDepartment.departmentName,
        }
        this.subDepartment.push(obj);
        for (let i = 0; i < this.subDepartment.length; i++) {
          this.subDepartment[i].srNumber = i + 1;
        }
        
      })
      this.data = [...this.subDepartment];
      console.log("res data => ",this.data)
      this.isdataReady= true
      console.log("data ==>", this.data);
    })
  }

  editRow(e: any) {
    this.visibleSiderbar = true;
  }

  saveDepartment(data: any) {
    this.saveMethod = data;
  }

  editDepartment(data: any) {
    this.visibleSiderbar = true;
  }

  isActive(data: any) {
    if (!data.is_Deleted) {
      this.http.reactiveSubDepartment(data)
        .subscribe(d_Data => {
          this.table_Data = undefined;
          this.getAllSubDepartment();
        })
      this.messageService.add({
        severity: 'success',
        summary: 'Enable',
        detail: 'Sub Department Enable Successfully'
      });
    } else if (!data.is_Deleted) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Sub Department is already Active'
      });
    }
  }

  confirmAction(e: any) {
    if (e.is_Active == true) {
      this.deleteSubDepartment(e.subDepartmentId);
      this.messageService.add({
        severity: 'success',
        summary: 'Disabled',
        detail: 'Department Disabled Successfully'
      });
    } else if (e.is_Active == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Department is already Disabled'
      });
    } else {}
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.saveMethod == "add") {
        this.addSubDepartment(e);
        console.log("sidebardata =>", e)
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Department Added Successfully'
        });
        this.saveMethod = false;
      } else {
        this.updateSubDepartment(e);
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Department Updated Successfully.'
        });
      }
    }
  }

  addSubDepartment(department: any) {
    this.http.addSubDepartment(department)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllSubDepartment();
        console.log("data" + b_Data)

      })
  }

  updateSubDepartment(e: any) {
    this.http.updateSubDepartment(e)
      .subscribe(d_Data => {
        console.log('update fill=>', e)
        this.table_Data = undefined;
        this.getAllSubDepartment();
        console.log("data" + d_Data)
      })
  }

  deleteSubDepartment(e: any) {
    this.http.deleteSubDepartment(e)
      .subscribe(d_Data => {
        this.table_Data = undefined;
        this.getAllSubDepartment();
        console.log("data" + d_Data)
      })
  }
  
  BulkDeleteRow(e: any) {
    this.data = [];
    if (e != '') {
      e.forEach((data: any) => {
        if (data.is_Active != false) {
          let obj = {
            "subDepartmentId": data.subDepartmentId,
          }
          this.deleteSubDepartment(obj.subDepartmentId);
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
  // BulkDeleteRow(e: any) {
  //   this.data = [];
  //   if (e != '') {
  //     e.forEach((data: any) => {
  //       let obj = {
  //         "subDepartmentId": data.subDepartmentId,
  //       }
  //       this.deleteSubDepartment(obj.subDepartmentId);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'success',
  //         detail: 'Delete All Data successfull.',
  //       });
  //     });

  //   } else {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'select Rows',
  //       detail: 'Rows are not selected.',
  //     });
  //   }
  // }

}
