import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeStatusService } from './employee-status.service';
import  emp_Table_Config  from './employee-table-config.json'
import emp_Data from './employee-input-update.json'
import Employee_status_breadcrumb from './employee-status-breadcrumb.json'
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.css']
})
export class EmployeeStatusComponent implements OnInit {

  configurations: any;
  table_Config: any;
  isDataReady: boolean = false;
  visibleSiderbar: boolean = false;
  table_Data: any;
  sidebar_Update_Input: any = emp_Data;
  saveMethod: boolean = false;
  Employee_status_breadcrumb =Employee_status_breadcrumb;
  editData:any;

  constructor(private messageService:MessageService, private http:EmployeeStatusService, private common:CommonService) { }
  ngOnInit(): void {
    this.configurations={
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.table_Config = emp_Table_Config
    this.getAllEmp();
  }

  buttonEvent(e:any){
    this.editData=undefined;
    this.common.sendEditData(false);
  }

  getAllEmp(){
    this.http.getAllEmp().subscribe(item => {
      this.table_Data = item;
      this.isDataReady=true;
      for(let i=0; i<this.table_Data.length;i++){
        this.table_Data[i].id=i+1;
      }
      this.table_Data;
    })
  }

  editRow(e:any){
    this.visibleSiderbar=true;
  }

  saveEmp(data:any){
    this.sidebar_Update_Input.form.formControls[0].isVisible=false;
    this.saveMethod = true;
    this.editData=[];
    this.common.sendEditData(false);
  }

  editEmp(data:any){
    this.sidebar_Update_Input.form.formControls[0].isVisible=true;
    this.editData = data.editRow;
  }

  isActive(data:any){
    if(data.is_Deleted){
      this.http.reactiveEmp(data)
        .subscribe(b_Data => {
          this.table_Data = undefined;
          this.getAllEmp();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Employee Enable Successfully' });  
    }
    else if(!data.is_Deleted){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee is already Active' });
    }
  }

  confirmAction(e:any){
    if(e.is_Active==true){
      this.table_Data=undefined;
      this.deleteEmp(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Employee Disabled Successfully' });
    }
    else if (e.is_Active==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee is already Disabled' });
    }
    else{}
  }

  sidebarData(e:any){
    if(e=='reset'){}
    else if (this.saveMethod) {
      this.addEmp(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Employee Added Successfully' });
      this.saveMethod=false;
    } else {
        this.updateEmp(e);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Employee Updated Successfully.' });
    }
  }

  addEmp(emp:any){
    this.http.addEmp(emp)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllEmp();
      })
  }

  updateEmp(emp:any){
    this.http.updateEmp(emp)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllEmp();
      })
  }

  deleteEmp(emp:any){
    this.http.deleteEmp(emp.esId)
      .subscribe(b_Data => {
        this.table_Data=undefined;
        this.getAllEmp();
      })
  }

  bulkDeleteRows(emp_Data:any){
    let count = 0;
    if (emp_Data != '') {
      emp_Data.forEach((emp: any) => {
        if (emp.is_Active == true) {
          this.deleteEmp(emp);
          count++;
        }
      });
      if (count == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The Selected Rows are Already Disabled',
        });
        this.table_Data=undefined;
        this.getAllEmp();
      }
      else if (count != 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Bulk Deleted',
          detail: 'Successful Disabled',
        });
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No Row Selected',
      });
    }
  }

}
