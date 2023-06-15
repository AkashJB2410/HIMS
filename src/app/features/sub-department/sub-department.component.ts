import {
  Component,
  OnInit
} from '@angular/core';
import {
  SubDepartmentService
} from './sub-department.service';
import sub_department_Table_Config from './sub-department_table_config.json';
import sub_department_Form from './sub-department.json'

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
  table_Config: any;
  isDataReady: boolean = false;
  visibleSiderbar: boolean = false;
  table_Data: any;
  editMethod: boolean = false;
  sidebar_Update_Input: any = sub_department_Form;
  saveMethod: boolean = false;
  constructor(private http: SubDepartmentService) {}

  ngOnInit(): void {
    this.assignDropDownOptions();
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    // this.table_Config = const department_Config: any
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
    this.subDepartment = [];
    this.http.getAllSubDepartment().subscribe(res => {
      this.table_Data = res;
      res.forEach((e: any) => {
        console.log('All data=>', e)
        let obj = {
          "subDepartmentId": e.subDepartmentId,
          "subDepartment": e.subDepartment,
          "mstDepartment": e.mstDepartment
        }
        this.subDepartment.push(obj);
      })
      // this.isDataReady = true;
      // for (let i = 0; i < this.table_Data.length; i++) {
      //   this.table_Data[i].srNumber = i + 1;
      // }
    })

  }
  editRow(e: any) {
    this.visibleSiderbar = true;
  }

  saveDepartment(data: any) {
    this.saveMethod = true;
  }

  editDepartment(data: any) {
    this.visibleSiderbar = true;
  }

  isActive(data: any) {
    if (data.is_Deleted) {
      this.http.reactiveSubDepartment(data)
        .subscribe(d_Data => {
          this.table_Data = undefined;
          this.getAllSubDepartment();
        })
      // this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Bank Master Enable Successfully' });  
    } else if (!data.is_Deleted) {
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Active' });
    }
  }

  confirmAction(e: any) {
    if (e.is_Active == true) {
      this.table_Data = undefined;
      this.deleteSubDepartment(e.departmentId);
      // this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Bank Master Disabled Successfully' });
    } else if (e.is_Active == false) {
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Disabled' });
    } else {}
  }

  sidebarData(e: any) {
    if (e == 'reset') {} else if (this.saveMethod) {
      this.addSubDepartment(e.departmentId);
      console.log("sidebardata =>", e)
      // this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Bank Master Added Successfully' });
      this.saveMethod = false;
    } else {
      this.updateSubDepartment(e.departmentId);
      // this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Bank Master Updated Successfully.' });
    }
  }

  addSubDepartment(department: any) {
    this.http.addSubDepartment(department)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllSubDepartment();
      })
  }

  updateSubDepartment(e: any) {
    this.http.updateSubDepartment(e.departmentId)
      .subscribe(d_Data => {
        console.log('update fill=>', e)
        this.table_Data = undefined;
        this.getAllSubDepartment();
      })
  }

  deleteSubDepartment(e: any) {
    this.http.deleteSubDepartment(e)
      .subscribe(d_Data => {
        this.getAllSubDepartment();
      })
  }


}
