import { Component, OnInit } from '@angular/core';
import subModuleData from './subModuleSidebarConfig.json';
import * as subModule_table_config from './subModuleTableConfig.json';
import { MessageService } from 'primeng/api';
import { SubModuleService } from './sub-module.service';
import Application_breadcrumb from './breadcrum.json'
@Component({
  selector: 'app-sub-module',
  templateUrl: './sub-module.component.html',
})
export class SubModuleComponent implements OnInit {

  Bulkdelete(e: any) {
    if (e.length == 1) {
      if (e[0].is_Active == true) {
        this.deleteSubModuleData(e[0].submoduleId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      }
    } else {
      let a: boolean;
      for (let i = 0; i < e.length; i++) {
        if (e[i].is_Active == true) {
          this.deleteSubModuleData(e[i].submoduleId);
          a = true;
        }
      }
      if (a == true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
        a = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      }
    }
  }
  Application_breadcrumb=Application_breadcrumb
  toast: any = {};
  showToast: any;
  Message: any;
  gridData: any[] = [];
  dataGrid: any = [];
  jsonData: any[] = [];
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  formdata: any;
  mstDropDwon: any[] = [];
  mstModuleList: any[] = [];
  sidebarJSON: any;
  map = new Map<String, String>();

  mstModulesId: any;
  mstModulesName: any;

  constructor(
    private messageService: MessageService,
    private http: SubModuleService
  ) {}

  ngOnInit(): void {
    // this.getMstData();
    this.assignOptions();
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getAllSubModuleData();
    // this.data = roleData;
    this.getConfigForTable();
  }
  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e);
    } else if (e == 'cancel') {
      console.log(e);
    }
  }
  getMstData() {
    this.mstModuleList = [];
    this.http.GetAllMstModuleData().subscribe((data) => {
      data.forEach((e: any) => {
        let data = {
          name: e.label,
          code: e.module_Id,
        };
        this.mstModuleList.push(data);
      });
      this.assignDropDownOptions();
    });
  }

  assignDropDownOptions() {
    this.formdata = Object.assign({}, subModuleData);
    this.formdata.form.formControls.forEach((data: any) => {
      if (data.formControlName === 'selectInput') {
        data.values = this.mstModuleList;
      }
    });
    // console.log("formdata=>", JSON.stringify(this.formdata));
  }

  assignOptions() {
    this.formdata = Object.assign({}, subModuleData);
    this.formdata.form.formControls.forEach((data: any) => {
      // data.values=[];
      if (data.formControlName === 'selectInput') {
        // data.values = this.mstModuleList;
        let defaultObj = {
          name: 'Select Master Module',
          code: '',
        };
        data.values[0].values.push(defaultObj);
        this.http.GetAllMstModuleData().subscribe((item) => {
          item.forEach((e: any) => {
            let obj = {
              name: e.label,
              code: e.moduleId,
            };
            data.values[0].values.push(obj);
            data.values[0].values;
          });
        });

        let fakeObj = {
          name: 'Select Group Module',
          code: '',
          Mcode: '',
        };
        data.values[1].values.push(fakeObj);
        this.http.GetAllGroupModuleData().subscribe((item1) => {
          item1.forEach((e: any) => {
            let obj1 = {
              name: e.lable,
              code: e.groupId,
              Mcode: e.mstModule.moduleId,
            };
            data.values[1].values.push(obj1);
            data.values[1].values;
          });
        });
      }
    });
  }
  getAllSubModuleData() {
    this.dataGrid = undefined;
    this.gridData = [];
    this.http.GetAllSubModuleData().subscribe((res) => {
      res.forEach((e: any) => {
        let obj = {
          

          "submoduleId": e.subModuleId,
          "label": e.label,
          "icon": e.icon,
          "routerLink": e.routerLink,
          "SubModuleSequence": e.sequence,

          
          "mstId": e.mstGroup.mstModule.moduleId,
          "mstLabel": e.mstGroup.mstModule.label,

          "groupId": e.mstGroup.groupId,
          "groupLabel": e.mstGroup.lable,

          "is_Active": e.is_Active,
        };
        this.gridData.push(obj);
        console.log('objet ==>', obj);
      });
      this.dataGrid = [...this.gridData];
      this.isdataReady = true;
    });
  }

  getConfigForTable() {
    // this.data = data;
    this.config = subModule_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    if (e == false) {
      this.getAllSubModuleData();
    } else {
      console.log('Deleted' + JSON.stringify(e));
      if (e.is_Active == false) {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      } else {
        this.deleteSubModuleData(e.submoduleId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
      }
    }
  }

  deleteSubModuleData(subModuleId: any) {
    this.http.deleteSubModule(subModuleId).subscribe((data) => {
      this.dataGrid = undefined;
      this.getAllSubModuleData();
    });
  }
  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (e.idInput == true) {
      console.log(e);
      this.dataGrid = undefined;
      this.submitSubModuleData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.dataGrid = undefined;
      this.updateSubModuleData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }
  submitSubModuleData(roleData: any) {
    this.http.saveSubModuleData(roleData).subscribe((data) => {
      this.dataGrid = undefined;
      this.getAllSubModuleData();
    });
  }

  updateSubModuleData(roleData: any) {
    this.http.updateSubModule(roleData).subscribe((data) => {
      this.dataGrid = undefined;
      this.getAllSubModuleData();
    });
  }

  fiteredData(e: any) {
    this.dataGrid = undefined;
  }

  isActive(e: any) {
    if (e.is_Active) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'Allready Enabled',
      });
    } else {
      this.http.isActiveData(e).subscribe((data) => {
        this.dataGrid = undefined;
        this.getAllSubModuleData();
        console.log('data' + data);
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Enabled Sucessfully',
      });
    }
  }
}
