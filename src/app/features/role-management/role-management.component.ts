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

  toast: any = {};
  showToast: any;
  Message: any;
  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = roleData;

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
    this.deleteRoleData(e.role_Id);

    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
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
    } else if (e.idInput == true) {
      console.log(e)
     
      this.submitRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });

    } else {
      console.log(e);
      this.updateRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });

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

