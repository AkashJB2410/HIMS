import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api/messageservice';
import { DepartmentService } from './department.service';
import department_Table_Config from './department-tableConfig.json';
import department_Form from './department.json'

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
  saveMethod: boolean = false;
  constructor(private http:DepartmentService) { }

  ngOnInit(): void {
    this.configurations={
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    // this.table_Config = const department_Config: any
    this.getConfigForTable();
    this. getAllDepartment();
  }

  getConfigForTable() {
    this.config = department_Table_Config;
  }

  getAllDepartment(){
    this.http.getAllDepartment().subscribe(res => {
      this.table_Data = res;
      console.log('All data=>',res)
      this.isDataReady = true;
      for (let i = 0; i < this.table_Data.length; i++) {
        this.table_Data[i].srNumber = i + 1;
      }
      // for(let i=0; i<this.table_Data.length;i++){
      //   this.table_Data[i].srNo=i+1;
      // }
      // this.table_Data;
    })
  
  }
  editRow(e:any){
    this.visibleSiderbar=true;
  }

  saveDepartment(data:any){
    this.saveMethod = true;
  }

  editDepartment(data:any){
    this.visibleSiderbar = true;
  }

  isActive(data:any){
    if(data.is_Deleted){
      this.http.reactiveDepartment(data)
        .subscribe(d_Data => {
          this.table_Data = undefined;
          this. getAllDepartment();
        })
        // this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Bank Master Enable Successfully' });  
    }
    else if(!data.is_Deleted){
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Active' });
    }
  }

  confirmAction(e:any){
    if(e.is_Active==true){
      this.table_Data=undefined;
      this.deleteDepartment(e.departmentId);
      // this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Bank Master Disabled Successfully' });
    }
    else if (e.is_Active==false){
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Disabled' });
    }
    else{}
  }

  sidebarData(e:any){
    if(e =='reset'){}
    else if (this.saveMethod) {
      this.addDepartment(e.departmentId);
      console.log("sidebardata =>" , e)
      // this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Bank Master Added Successfully' });
      this.saveMethod=false;
    } else {
        this.updateDepartment(e.departmentId);
        // this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Bank Master Updated Successfully.' });
    }
  }

  addDepartment(department:any){
    this.http.addDepartment(department)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllDepartment();
      })
  }

  updateDepartment(e:any){
    this.http.updateDepartment(e.departmentId)
      .subscribe(d_Data => {
        console.log('update fill=>',e)
        this.table_Data = undefined;
        this.getAllDepartment();
      })
  }

  deleteDepartment(e:any){
    this.http.deleteDepartment(e)
      .subscribe(d_Data => {
        this.getAllDepartment();
      })
  }
  
}


