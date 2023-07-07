import {
  Component,
  OnInit
} from '@angular/core';
import {
  SubDepartmentService
} from './sub-department.service';
import sub_department_Table_Config from './sub-department_table_config.json';
import sub_department_Form from './sub-department.json'
import breadcrumb from './breadcrumb.json'

import {
  MessageService
} from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-sub-department',
  templateUrl: './sub-department.component.html',
  styleUrls: ['./sub-department.component.css']
})
export class SubDepartmentComponent implements OnInit {

  data: any = [];
  subDepartment: any = [];
  config: any;
  configurations: any;
  isdataReady = false;
  table_Config: any;
  visibleSiderbar: boolean = false;
  table_Data: any;
  status :boolean = false;
  // editMethod: boolean = false;
  sidebar_Update_Input: any = sub_department_Form;
  saveMethod: any;
  breadcrumb=breadcrumb;
  editData:any;
  flag: any;
  constructor(private http: SubDepartmentService, private messageService: MessageService,private common:CommonService) {}

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

  buttonEvent(e:any){
    this.editData=undefined;
this.common.sendEditData(false);
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
      res.forEach((e: any ,index:any) => {
        console.log("res => ",e)
        let obj = {
          "id": index,
          "subDepartmentId": e.subDepartmentId,
          "subDepartment" : e.subDepartment,
          "is_Active":e.is_Active,
          "mstDepartment": e.mstDepartment.departmentId,

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

  addRow(e: any) {
    this.visibleSiderbar = true;
  }

  onEdit(e: any) {
    this.editData = e.editRow;
    this.status = false;
  }

  onAdd(e: any) {
    this.editData = [];
    this.common.sendEditData(false);
    this.status = true;
  }
  // onEdit(e: any) {
  //   this.flag=e.edit
  //   let obj = {
  //     "subDepartmentId": e.subDepartmentId,
  //     "mstDepartment": e.mstDepartment.departmentId,
  //     "subDepartment" : e.subDepartment,
  //     "is_Active":e.is_Active,
  //     "departmentName":e.mstDepartment.departmentName,
  //   }
  //   this.editData = obj;
  //   // this.visibleSiderbar = true;
  // }

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
    if (e ! == true) {
      this.deleteSubDepartment(e.subDepartmentId);
      this.messageService.add({
        severity: 'success',
        summary: 'Disabled',
        detail: 'Sub Department Disabled Successfully'
      });
    } else if (e.is_Active == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Sub Department is already Disabled'
      });
    } else {}
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == "add") {
        this.updateSubDepartment(e);
        console.log("sidebardata =>", e)
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Sub Department Added Successfully'
        });
        this.flag = false;
      } else {
        this.addSubDepartment(e);
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Sub Department Updated Successfully.'
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
}
