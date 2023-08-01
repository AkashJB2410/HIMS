import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Application_breadcrumb from './breadcrum.json';
import groupTableConfig from './groupTableConfig.json'
import groupSidebarConfig from './groupSidebarConfig.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';

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
  gridConfigurations= {
    "isFilter": false,
    "isTable": true,
    "isSideBar": true,
    "isConfirmation": true
  };
  tableConfig = groupTableConfig;
  isDataReady = false;
  sidebarConfig: any = groupSidebarConfig;
  deleteMsg = false;

   //API declarations
  apiGet = 'mstGroup/list';
  apiAdd = 'mstGroup/create';
  apiUpdate = 'mstGroup/update';
  apidelete = 'mstGroup/inActivate';
  apiactive = 'mstGroup/activate';
  mstModuleApiGet = 'mstModule/list'

  constructor(
    private messageService: MessageService,
    private featurescommonService: FeaturescommonService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.getMasterModule();
    this.fetchMstGroupData();
  }

  //filling master module dropdown
  getMasterModule() {
    let defaultValues = {
      "name": "Select Master Module",
      "code": "0"
    }
    this.featurescommonService.getData(this.mstModuleApiGet).subscribe(
      (response) => {
        this.sidebarConfig.form.formControls[1].values=[
            //pushing the master module values in sidebar form
          ...response.content.map((module:any)=>({
            name:module.label,
            code:module.moduleId
          }))
          //sorting the array of master module
        ].sort((a:any, b:any)=> a.name.localeCompare(b.name));
        //shifting the first object in master module array
        this.sidebarConfig.form.formControls[1].values.unshift(defaultValues)
      },
      (error) => {
        console.error('API Error:', error);
      })
  }

  fetchMstGroupData() {
    //fetch Data from API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        // Update the mstGroupData with the API response
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
            // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
      },
      (error) => {
        console.log('API Error:', error);
      }
    )
  }

  addOrUpdateMstGroup(groupData: any, isEditMode: boolean) {
     // Prepare the object to be sent in the API request
    let obj = {
      lable: groupData.lable,
      icon: groupData.icon,
      routerLink: groupData.routerLink,
      sequence: groupData.sequence,
      groupModuleId: {
        moduleId: groupData.mstModule.code,
        lable: groupData.mstModule.name
      }
    };
     // Determine the API endpoint based on the 'isEditMode' flag
    const apiEndpoint = isEditMode ? this.apiUpdate : this.apiAdd;
     // Call the corresponding API method (addData or updateData) based on the 'isEditMode' flag
    this.featurescommonService[isEditMode ? 'updateData' : 'addData'](obj, apiEndpoint).subscribe(
      (response) => {
         // Update the mstGroupData with the API response
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
         // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    );
      // Reset the flag to indicate that data is not ready for refreshing the grid yet
    this.isDataReady = false;
  }

  deleteMstGroup(groupData: any) {
    this.featurescommonService.deleteData(this.apidelete, groupData.groupId).subscribe(
      (response) => {
           // Update the mstGroupData with the API response
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
             // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      }
    );
     // Reset the flag to indicate that data is not ready for refreshing the grid yet
    this.isDataReady = false;
  }

  toggleMstGroupStatus(groupData: any) {
    if (!groupData.isActive) {
      this.featurescommonService.reactiveData(this.apiactive, groupData, groupData.groupId).subscribe(
        (response) => {
          // Update the mstGroupData with the API response
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
               // Set the flag to indicate that data is ready for refreshing the grid
          this.isDataReady = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
        }
      );
          // Reset the flag to indicate that data is not ready for refreshing the grid yet
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
         // Update the mstGroupData with the API response
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
            // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
         // Set the flag to indicate that message for delete
        this.deleteMsg = false;
      },
      (error) => {
        console.log('delete API Error', error);
      });
           // Reset the flag to indicate that data is not ready for refreshing the grid yet
    this.isDataReady = false;
  }

  closeSidebarData($event: any) {
    // Clears the selectedGroupData when closing the sidebar
    this.selectedGroupData = undefined;
  }

  //Handles the action after confirming an operation
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
    //Prepares the selected MST group data to be edited in the sidebar
    this.selectedGroupData = {
      id: $event.editRow.groupId,
      mstModule: $event.editRow.mstMduleId,
      label: $event.editRow.lable,
      icon: $event.editRow.icon,
      routerLink: $event.editRow.routerLink,
      sequence: $event.editRow.sequence
    };
    this.isEditMode = true;
  }
  initializeAddForm($event: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedGroupData = [];
    this.isEditMode = false;
    this.common.sendEditData(false);
  }
  handleButtonClick($event: any) {
     // Clears the selectedGroupData when closing the sidebar
    this.selectedGroupData = undefined;
    this.common.sendEditData(false);
  }
  sidebarData($event: any) {
    if ($event == 'reset') { }
    else {
      this.addOrUpdateMstGroup($event, this.isEditMode);
    }
  }

}
