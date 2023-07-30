import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Application_breadcrumb from './breadcrum.json';
import groupTableConfig from './groupTableConfig.json'
import groupSidebarConfig from './groupSidebarConfig.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';
import { FormService } from 'src/app/core/shared/service/form.service';

@Component({
  selector: 'app-group-module',
  templateUrl: './group-module.component.html',
  styleUrls: ['./group-module.component.css']
})
export class GroupModuleComponent implements OnInit {
    //variable declarations
  selectedGroupData: any;
  isEditMode: boolean;
  applicationBreadcrumb = Application_breadcrumb;
  mstGroupData: any[];
  gridConfigurations: any;
  tableConfig: any;
  isDataReady = false;
  sidebarConfig: any = groupSidebarConfig;
  deleteMsg = false;

   //API declarations
  apiGet = 'mstGroup/list';
  apiAdd = 'mstGroup/create';
  apiUpdate = 'mstGroup/updated';
  apidelete = 'mstGroup/inActivate';
  apiactive = 'mstGroup/activate';
  masterApiGet = 'mstModule/list'

  constructor(
    private messageService: MessageService,
    private featurescommonService: FeaturescommonService,
    private common: CommonService,
    private formSrvice: FormService
  ) { }

  ngOnInit(): void {
    this.gridConfigurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getConfigForTable()
    this.getMasterModule();
    this.fetchMstGroupData();

    this.mstGroupData
  }

  getConfigForTable() {
    this.tableConfig = groupTableConfig;
  }
  //filling master module dropdown
  getMasterModule() {
    let defaultValues = {
      "name": "Select Master Module",
      "code": "0"
    }
    this.featurescommonService.getData(this.masterApiGet).subscribe(
      (response) => {
        response.content.forEach((module: any) => {
          let moduleObj = {
            "name": module.label,
            "code": module.moduleId
          }
          //pushing the master module values in sidebar form
          this.sidebarConfig.form.formControls[1].values.push(moduleObj);
        })
        //sorting the array of master module
        this.sidebarConfig.form.formControls[1].values.sort((a:any, b:any) => a.name.localeCompare(b.name));
        //shifting the first object in master module array
        this.sidebarConfig.form.formControls[1].values.unshift(defaultValues)
      },
      (error) => {
        console.error('API Error:', error);
      })
  }

  fetchMstGroupData() {
    //getch Data from API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        //response stored in mstGroupData as Table Config
        this.mstGroupData = response.content.map((item: any, index: number) => ({
          id: index + 1,
          groupId: item.groupId,
          mstModule: item.groupModuleId.label,
          lable: item.lable,
          icon: item.icon,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstMduleId: item.groupModuleId.moduleId
        }));
        this.isDataReady = true;
        this.mstGroupData
      },
      (error) => {
        console.log('API Error:', error);
      }
    )
  }

  addMstGroupData(groupData: any) {
    //formating data for API
    let obj = {
      "lable": groupData.lable,
      "icon": groupData.icon,
      "routerLink": groupData.routerLink,
      "sequence": groupData.sequence,
      "groupModuleId": {
        "moduleId": groupData.mstModule.code,
        "lable": groupData.mstModule.name
      }
    }
    this.featurescommonService.addData(obj, this.apiAdd).subscribe(
      (response) => {
        //response stored in mstGroupData as Table Config
        this.mstGroupData = response.result.map((item: any, index: number) => ({
          id: index + 1,
          groupId: item.groupId,
          mstModule: item.groupModuleId.label,
          lable: item.lable,
          icon: item.icon,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstMduleId: item.groupModuleId.moduleId
        }));
            //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      }
    )
        //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  updateMstGroup(groupData: any) {
    //formating data for API
    let obj = {
      "groupId": groupData.groupId,
      "lable": groupData.label,
      "icon": groupData.icon,
      "routerLink": groupData.routerLink,
      "sequence": groupData.sequence,
      "groupModuleId": {
        "moduleId": groupData.mstModule.code
      }
    }
    this.featurescommonService.updateData(obj, this.apiUpdate).subscribe(
      (response) => {
        //response stored in mstGroupData as Table Config
        this.mstGroupData = response.result.map((item: any, index: number) => ({
          id: index + 1,
          groupId: item.groupId,
          mstModule: item.groupModuleId.label,
          lable: item.lable,
          icon: item.icon,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstMduleId: item.groupModuleId.moduleId
        }));
            //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      }
    );
        //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  deleteMstGroup(groupData: any) {
    this.featurescommonService.deleteData(this.apidelete, groupData.groupId).subscribe(
      (response) => {
        //response stored in mstGroupData as Table Config
        this.mstGroupData = response.result.map((item: any, index: number) => ({
          id: index + 1,
          groupId: item.groupId,
          mstModule: item.groupModuleId.label,
          lable: item.lable,
          icon: item.icon,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstMduleId: item.groupModuleId.moduleId
        }));
            //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      }
    );
        //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  toggleMstGroupStatus(groupData: any) {
    if (groupData.isActive == false) {
      this.featurescommonService.reactiveData(this.apiactive, groupData, groupData.groupId).subscribe(
        (response) => {
          //response stored in mstGroupData as Table Config
          this.mstGroupData = response.result.map((item: any, index: number) => ({
            id: index + 1,
            groupId: item.groupId,
            mstModule: item.groupModuleId.label,
            lable: item.lable,
            icon: item.icon,
            routerLink: item.routerLink,
            sequence: item.sequence,
            isActive: item.isActive,
            mstMduleId: item.groupModuleId.moduleId
          }));
              //changing the value of isDataReady to refresh the gird
          this.isDataReady = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
        }
      );
          //changing the value of isDataReady to refresh the gird
      this.isDataReady = false
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error' })
    }
  }

  bulkDeleteMstGroupModule(arrayOfGroupData: any) {
    if (arrayOfGroupData.length != 0) {
      this.isDataReady = false;
      arrayOfGroupData.forEach((groupData: any) => {
        this.deleteMstGroupForBulk(groupData);
      })
      if (this.deleteMsg) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bulk Delete' });
        this.deleteMsg = false;
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Row Selected' })
    }
  }

  deleteMstGroupForBulk(groupData: any) {
    this.featurescommonService.deleteData(this.apidelete, groupData.groupId).subscribe(
      (response) => {
        //response stored in mstGroupData as Table Config
        this.mstGroupData = response.result.map((item: any, index: number) => ({
          id: index + 1,
          groupId: item.groupId,
          mstModule: item.groupModuleId.label,
          lable: item.lable,
          icon: item.icon,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstMduleId: item.groupModuleId.moduleId
        }));
            //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.deleteMsg = false;
      },
      (error) => {
        console.log('delete API Error', error);
      });
          //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  closeSidebarData($event: any) {
    this.selectedGroupData = undefined;
  }
  confirmAction($event: any) {
    if ($event == false) {
      this.fetchMstGroupData();
    }
    else {
      if ($event.isActive) {
        this.deleteMstGroup($event);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error' })
      }
    }
  }
  onEdit($event: any) {
    this.sidebarConfig.form.formControls[0].isVisible = true;
    //default select value for dropdown in obj
    let obj = {
      "id": $event.editRow.groupId,
      "mstModule": $event.editRow.mstMduleId,
      "label": $event.editRow.label,
      "icon": $event.editRow.icon,
      "routerLink": $event.editRow.routerLink,
      "sequence": $event.editRow.sequence
    }
    this.selectedGroupData = obj;
    this.isEditMode = false;
  }
  initializeAddForm($event: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedGroupData = [];
    this.isEditMode = true;
    this.common.sendEditData(false);
  }
  handleButtonClick($event: any) {
    this.selectedGroupData = undefined;
    this.common.sendEditData(false);
  }
  sidebarData($event: any) {
    if ($event == 'reset') { }
    else if (this.isEditMode) {
      this.addMstGroupData($event);
    }
    else {
      this.updateMstGroup($event);
    }
  }

}
