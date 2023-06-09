import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RoleManagementService } from './role-management.service';
import * as role_table_config from './role_table_config.json';
import roleData from './role.json';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styles: [`
  :host ::ng-deep .p-component-overlay {
    width: 100%;
  }
`]
})
export class RoleManagementComponent implements OnInit {

  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = roleData;
  saveMethod: boolean = false;
  constructor(private messageService: MessageService, private http: RoleManagementService) { }

  ngOnInit(): void {
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
  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e)
    } else if (e == 'cancel') {
      console.log(e)
    }
  }
  getAllRoleData() {
    this.http.GetAllRoleData().subscribe(res => {
      this.data = res;
      this.isdataReady = true;
      for(let i=0; i<this.data.length;i++){
        this.data[i].srNo=i+1;
      }
      this.data;
    })
  }

  getConfigForTable() {
    // this.data = data;
    this.config = role_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }
  saveRole(data:any){
    this.saveMethod = true;
  }

  editRole(data:any){

  }

  isActive(data:any){
    if(data.is_Deleted){
      this.http.reactiveRole(data)
        .subscribe(b_Data => {
          this.data = undefined;
          this.getAllRoleData();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Role Enable Successfully' });  
    }
    else if(!data.is_Deleted){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Role is already Active' });
    }
  }

  confirmAction(e: any) {
    if(e.is_Active==true){
      this.data=undefined;
      this.deleteRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Role Disabled Successfully' });
    }
    else if (e.is_Active==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Role is already Disabled' });
    }
    else{}
  }
  deleteRoleData(roleId: any) {
    this.http.deleteRoleData(roleId)
      .subscribe(data => {
        this.getAllRoleData();
        console.log("data" + data)
      })
  }
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (this.saveMethod) {
      console.log(e)
     
      this.submitRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Role Added Successfully' });
      this.saveMethod = false;

    } else {
      console.log(e);
      this.updateRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Role Updated Successfully.' });

    }


  }
  submitRoleData(roleData: any) {
    this.http.saveRoleData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllRoleData();
        console.log("data" + data)
      })
  }

  updateRoleData(roleData: any) {
    this.http.updateRoleData(roleData)
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

