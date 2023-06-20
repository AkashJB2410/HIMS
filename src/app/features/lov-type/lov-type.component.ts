import { Component, OnInit } from '@angular/core';
import mstModuleData from './lovTypeSidebarConfig.json'
import { MessageService } from 'primeng/api';
import { LovTypeService } from './lov-type.service';
import Application_breadcrumb from './breadcrumb.json'
import mstModule_table_config from './lovTypeTableConfig.json'
@Component({
  selector: 'app-lov-type',
  templateUrl: './lov-type.component.html',
  styleUrls: ['./lov-type.component.css']
})
export class LovTypeComponent implements OnInit {

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

  constructor(
    private messageService: MessageService,
    private http: LovTypeService
  ) {}

  ngOnInit(): void {
    this.configurations = {
      isFilter: true,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getAllMstLovTypeData();
    // this.data = roleData;
    this.getConfigForTable();
  }

  getAllMstLovTypeData() {
    this.http.GetAllMstLovData().subscribe((res) => {
      this.data = res;
      console.log("get all data",res)
      this.isdataReady = true;
    });
  }

  getConfigForTable() {
    // this.data = data;
    this.config = mstModule_table_config;
  }

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (e.idInput == true) {
      console.log(e);
      this.submitMstLovTypeData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateMstLovTypeData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  submitMstLovTypeData(roleData: any) {
    this.http.saveMstLovData(roleData).subscribe((data) => {
      this.data = undefined;
      this.getAllMstLovTypeData();
      console.log('data' + data);
    });
  }

  updateMstLovTypeData(idInput: any) {
    this.http.updateMstLov(idInput).subscribe((data) => {
      this.data = undefined;
      this.getAllMstLovTypeData();
      console.log('data' + data);
    });
  }


  confirmAction(e: any) {
    if (e.is_Deleted) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'Allready Deleted',
      });
    } else {
      this.deleteMstLov(e.lovTypeId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
     console.log('Deleted' + JSON.stringify(e));
  }
   

    deleteMstLov(lovTypeId: any) {
    this.http.deleteMstLov(lovTypeId).subscribe((data) => {
      this.data = undefined;
      this.getAllMstLovTypeData();
      console.log('data' + data);
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
      this.http.isActiveData(e).subscribe((data) => {
        this.data = undefined;
        this.getAllMstLovTypeData();
        console.log('data' + data);
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Enabled Sucessfully',
      });
    }
  }


  Bulkdelete(e:any){
    if(e.length==1){
      if(e[0].is_Deleted==false){
        this.deleteMstLov(e[0].lovTypeId);
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
          this.deleteMstLov(e[i].lovTypeId);
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


}
