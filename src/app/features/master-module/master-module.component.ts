import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import mstModuleData from './masterModuleSidebarConfig.json';
import mstModule_table_config from './masterModuleTableConfig.json';
import Application_breadcrumb from './breadcrum.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from '../shared/featurescommon.service';

@Component({
  selector: 'app-master-module',
  templateUrl: './master-module.component.html',
  // styleUrls: ['./master-module.component.css']

})
export class MasterModuleComponent implements OnInit {
  editData: any;
  status: boolean;
  Application_breadcrumb=Application_breadcrumb
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
  st: any;
  apiGet="mstModule/list";
  apiAdd="mstModule/create";
  apiUpdate="mstModule/update";
  apidelete="mstModule/inActivate";
  apiactive="mstModule/activate";
  
  constructor(
    private messageService: MessageService,
    private http: FeaturescommonService,
    private common:CommonService,
  ) {}

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getAllMstModuleData();
    this.getConfigForTable();
  }

  getAllMstModuleData() {
    this.http.getData(this.apiGet).subscribe((resData) => {
      this.data=[];
      this.data = resData.content;
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].id = i + 1;
      }
      this.data;
    });
  }

  submitMstModuleData(moduleData: any) {
    this.http.addData(moduleData, this.apiAdd).subscribe((resData) => {
      this.data = undefined;
      this.getAllMstModuleData();
    });
  }

  updateMstModuleData(moduleData: any) {
    this.http.updateData(moduleData, this.apiUpdate).subscribe((resData) => {
      this.data = undefined;
      this.getAllMstModuleData();
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: resData.metadata.message });  
    });
  }

  isActive(e: any) {
    if (e.is_Deleted == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'Allready Enabled',
      });
    } else {
      this.http.reactiveData(this.apiactive, e, e.moduleId).subscribe((data) => {
        this.data = undefined;
        this.getAllMstModuleData();
        console.log('data' + data);
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Enabled Sucessfully',
      });
    }
  }

  deleteRoleData(moduleId: any) {
    this.http.deleteData(this.apidelete, moduleId).subscribe((data) => {
      this.data = undefined;
      this.getAllMstModuleData();
      console.log('data' + data);
    });
  }

  onEdit(st:any){
    this.editData=st.editRow;
    this.status=false;
    this.st = st;
    console.log(st);
  }

  onAdd(e:any){
    this.editData=[];
    this.common.sendEditData(false)
    this.status=true;
  }

  buttonEvent(e:any){
    this.editData=undefined
    this.common.sendEditData(false)
  }

  
  Bulkdelete(e:any){
    if(e.length==1){
      if(e[0].is_Deleted==false){
        this.deleteRoleData(e[0].moduleId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      }
    }else{
      let a:boolean;
      for(let i=0;i<e.length;i++){
        if(e[i].is_Deleted==false){
          this.deleteRoleData(e[i].moduleId);
          a=true;
        }
      }

      if(a==true){
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
        a=false;
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });

      }

    }

  }

 
  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e);
    } else if (e == 'cancel') {
      console.log(e);
    }
  }
  

  getConfigForTable() {
    // this.data = data;
    this.config = mstModule_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  

  confirmAction(e: any) {
   if(e==false){
    this.getAllMstModuleData();
   }else{
    if (e.is_Deleted) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'Allready Deleted',
      });
    } else {
      this.deleteRoleData(e.moduleId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
    console.log('Deleted' + JSON.stringify(e));
   }
  }
 
  closeSidebarData(e:any){
    this.editData=undefined;
  }
  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (this.status == true) {
      console.log(e);
      this.submitMstModuleData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateMstModuleData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  

 

  fiteredData(e: any) {
    this.data = undefined;
  }
}
