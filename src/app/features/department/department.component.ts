import {
  Component,
  OnInit
} from '@angular/core';
import {
  DepartmentService
} from './department.service';
import department_Table_Config from './department-tableConfig.json';
import department_Form from './department.json'
import {
  MessageService
} from 'primeng/api';
import breadcrumb from './department-breadcrumb.json'

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  data: any = [];
  config: any;
  configurations: any;
  table_Config: any;
  isDataReady: boolean = false;
  visibleSiderbar: boolean = false;
  table_Data: any;
  editMethod: boolean = false;
  sidebar_Update_Input: any = department_Form;
  saveMethod: any;
  breadcrumb=breadcrumb;
  constructor(private http: DepartmentService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    // this.table_Config = const department_Config: any
    this.getConfigForTable();
    this.getAllDepartment();
  }

  getConfigForTable() {
    this.config = department_Table_Config;
  }

  getAllDepartment() {
    this.http.getAllDepartment().subscribe(res => {
      this.table_Data = res;
      console.log('All data=>', res)
      this.isDataReady = true;
      for (let i = 0; i < this.table_Data.length; i++) {
        this.table_Data[i].srNumber = i + 1;
      }
    })
  }
  
  editRow(e: any) {
    this.visibleSiderbar = true;
    console.log(e);
  }

  eventMethod(data: any) {
    this.saveMethod = data;
  }


  submitDepartmentData(e: any) {
    this.http.addDepartment(e)
      .subscribe(res => {
        this.data = undefined;
        this.getAllDepartment();
        console.log("data" + res)
      })
  }

  isActive(data: any) {
    if (data.is_Deleted) {
      this.http.reactiveDepartment(data)
        .subscribe(d_Data => {
          this.table_Data = undefined;
          this.getAllDepartment();
        })
      this.messageService.add({
        severity: 'success',
        summary: 'Enable',
        detail: 'Department Enable Successfully'
      });
    } else if (!data.is_Deleted) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Department is already Active'
      });
    }
  }

  confirmAction(e: any) {
    if (e.is_Active == true) {
      // this.table_Data = undefined;
      this.deleteDepartment(e.departmentId);
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
        this.addDepartment(e);
        console.log("sidebardata =>", e)
        this.messageService.add({
          severity: 'success',
          summary: 'Added',
          detail: 'Department Added Successfully'
        });
        this.saveMethod = false;
      } else {
        this.updateDepartment(e);
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Department Updated Successfully.'
        });
      }
    }
  }

  addDepartment(department: any) {
    this.http.addDepartment(department)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllDepartment();
        console.log("data" + b_Data)

      })
  }

  updateDepartment(e: any) {
    this.http.updateDepartment(e)
      .subscribe(d_Data => {
        console.log('update fill=>', e)
        this.table_Data = undefined;
        this.getAllDepartment();
        console.log("data" + d_Data)

      })
  }

  deleteDepartment(e: any) {
    this.http.deleteDepartment(e)
      .subscribe(d_Data => {
        this.table_Data = undefined;
        this.getAllDepartment();
        console.log("data" + d_Data)
      })
  }



  BulkDeleteRow(e: any) {
    this.data = [];
    if (e != '') {
      e.forEach((data:any) => {
        let obj ={
          "departmentId": data.departmentId,
        }
        this.deleteDepartment(obj.departmentId);
      });
     
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'select Rows',
        detail: 'Rows are not selected.',
      });
    }
  }
}
