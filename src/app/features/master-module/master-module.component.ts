import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MasterModuleService } from './master-module.service';
import mstModuleData from './mstModule.json';
import * as mstModule_table_config from './mstModule_table_config.json';

@Component({
  selector: 'app-master-module',
  templateUrl: './master-module.component.html',
  // styleUrls: ['./master-module.component.css']
  styles: [`
  :host ::ng-deep .p-component-overlay {
    width: 100%;
  }
`]
})
export class MasterModuleComponent implements OnInit {

  toast: any = {};
  showToast: any;
  Message: any;
  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = mstModuleData;

  constructor(private messageService: MessageService, private http: MasterModuleService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllMstModuleData();
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
  getAllMstModuleData() {
    
    this.http.GetAllMstModuleData().subscribe(res => {
      this.data = res;
      console.log("get all data",res)
      this.isdataReady = true;
    })
  }

  getConfigForTable() {
    // this.data = data;
    this.config = mstModule_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    this.deleteRoleData(e.module_Id);
    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  deleteRoleData(moduleId: any) {
    this.http.deleteMstModule(moduleId)
      .subscribe(data => {
        this.data = undefined;
        this.getAllMstModuleData();
        console.log("data" + data)
      })
  }
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (e.idInput == true) {
      console.log(e)
      this.submitMstModuleData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });
    } else {
      console.log(e);
      this.updateMstModuleData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });
      
    }


  }
  submitMstModuleData(roleData: any) {
    this.http.saveMstModuleData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllMstModuleData();
        console.log("data" + data)
      })
  }

  updateMstModuleData(roleData:any){
    this.http.updateMstModule(roleData)
    .subscribe(data => {
      this.data = undefined;
      this.getAllMstModuleData();
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

