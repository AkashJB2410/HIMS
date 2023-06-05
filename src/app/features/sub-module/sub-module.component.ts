import { Component, OnInit } from '@angular/core';
import subModuleData from './subModule.json';
import newJson from './newJson.json';
import * as subModule_table_config from './subModule_table_config.json';
import { MessageService } from 'primeng/api';
import { SubModuleService } from './sub-module.service';

@Component({
  selector: 'app-sub-module',
  templateUrl: './sub-module.component.html',
  styles: [`
  :host ::ng-deep .p-component-overlay {
    width: 100%;
  }
`]
})
export class SubModuleComponent implements OnInit {

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
  
  constructor(private messageService: MessageService, private http: SubModuleService) { }

  ngOnInit(): void {
    // this.getMstData();
    this.assignOptions();
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllSubModuleData();
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
  getMstData() {
    this.mstModuleList = [];
    this.http.GetAllMstModuleData().subscribe(data => {
      data.forEach((e: any) => {
        let data = {
          "name": e.label,
          "code": e.module_Id
        }
        this.mstModuleList.push(data);
      })
      this.assignDropDownOptions();
    })
  }

  assignDropDownOptions() {
    this.formdata = Object.assign({}, subModuleData);
    this.formdata.form.formControls.forEach((data: any) => {
      if (data.formControlName === "selectInput") {
        data.values = this.mstModuleList;
      }
    })
    // console.log("formdata=>", JSON.stringify(this.formdata));
  }

  assignOptions() {
    this.formdata = Object.assign({}, subModuleData);
    this.formdata.form.formControls.forEach((data: any) => {
      data.values=[];
      if (data.formControlName === "selectInput") {
        // data.values = this.mstModuleList;
        let defaultObj = {
          "name": "Select Master Module",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllMstModuleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.label,
              "code": e.module_Id
            }
            data.values.push(obj);
          })
        })
      }
    })

  }
  getAllSubModuleData() {
    this.dataGrid=undefined;
    this.gridData=[];
    this.http.GetAllSubModuleData().subscribe(res => {
      res.forEach((e: any) => {
        let obj = {
          "submodule_Id":e.submodule_Id,
          "module_Id": e.mstModules.module_Id,
          "label": e.label,
          "icon":e.icon,
          "routerLink":e.routerLink,
          "mstLabel": e.mstModules.label,
          // "mstIcon":e.mstModules.icon,
          // "mstRouterLink":e.mstModules.routerLink,
          // "sequence":e.mstModules.sequence
        }
        this.gridData.push(obj);
        console.log("objet ==>", obj);
      })
      this.dataGrid = [...this.gridData];
      this.isdataReady = true;
    })
  }

  getConfigForTable() {
    // this.data = data;
    this.config = subModule_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    this.deleteSubModuleData(e.submodule_Id);
    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  deleteSubModuleData(subModuleId: any) {
    this.http.deleteSubModule(subModuleId)
      .subscribe(data => {
        this.dataGrid = undefined;
        this.getAllSubModuleData();
      })
  }
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (e.idInput == true) {
      console.log(e);
      this.dataGrid = undefined;
      this.submitSubModuleData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });
    } else {
      console.log(e);
      this.dataGrid = undefined;
      this.updateSubModuleData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });

    }


  }
  submitSubModuleData(roleData: any) {
    this.http.saveSubModuleData(roleData)
      .subscribe(data => {
        this.dataGrid = undefined;
        this.getAllSubModuleData();
      })
  }

  updateSubModuleData(roleData: any) {
    this.http.updateSubModule(roleData)
      .subscribe(data => {
        this.dataGrid = undefined;
        this.getAllSubModuleData();
      })
  }

  fiteredData(e: any) {
    this.dataGrid = undefined;
  }
}

