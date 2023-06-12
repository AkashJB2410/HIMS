import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeStatusService } from './employee-status.service';
import  emp_Table_Config  from './employee-table-config.json'
import emp_Data from './employee-input-update.json'


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
  constructor(private messageService:MessageService, private http:EmployeeStatusService) { }
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

  getAllEmp(){
    this.http.getAllEmp().subscribe(item => {
      this.table_Data = item;
      this.isDataReady=true;
      for(let i=0; i<this.table_Data.length;i++){
        this.table_Data[i].srNo=i+1;
      }
      this.table_Data;
    })
  }

  editRow(e:any){
    this.visibleSiderbar=true;
  }

  saveEmp(data:any){
    this.saveMethod = true;
  }

  editEmp(data:any){
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
        this.getAllEmp();
      })
  }

}
