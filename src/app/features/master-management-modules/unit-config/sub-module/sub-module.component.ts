import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Application_breadcrumb from './breadcrum.json';
import subTableConfig from './subModuleTableConfig.json'
import subSidebarConfig from './subModuleSidebarConfig.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';

@Component({
  selector: 'app-sub-module',
  templateUrl: './sub-module.component.html',
})
export class SubModuleComponent implements OnInit {
  //variable declarations
  selectedSubData: any;
  isEditMode: boolean;
  applicationBreadcrumb = Application_breadcrumb;
  mstSubData: any[];
  gridConfigurations = {
    "isFilter": false,
    "isTable": true,
    "isSideBar": true,
    "isConfirmation": true
  };
  tableConfig = subTableConfig;
  isDataReady = false;
  sidebarConfig: any = subSidebarConfig;
  deleteMsg = false;

  //API declarations
  apiGet = 'mstSubModule/list';
  apiAdd = 'mstSubModule/create';
  apiUpdate = 'mstSubModule/update';
  apidelete = 'mstSubModule/inActivate';
  apiactive = 'mstSubModule/activate';
  mstModuleApiGet = 'mstModule/list';
  mstGroupApiGet = 'mstGroup/list';

  constructor(
    private messageService: MessageService,
    private featurescommonService: FeaturescommonService,
    private common: CommonService,
  ) { }
  ngOnInit(): void {
    this.getMasterModule();
    this.getMasterGroupModule();
    this.fetchMstSubModuleData();
  }

  // Filling master module dropdown
  getMasterModule() {
    // Default option for "Select Master Module"
    const defaultModule = {
      name: 'Select Master Module',
      code: "",
    };
    // API call to get master modules
    this.featurescommonService.getData(this.mstModuleApiGet).subscribe(
      (response) => {
        // Extract module objects from the API response
        const moduleObjects = response.content.map((module: any) => ({
          name: module.label,
          code: module.moduleId,
        }));
        // Sort moduleObjects based on the "name" property
        moduleObjects.sort((a: any, b: any) => a.name.localeCompare(b.name));
        // Add the default option to the beginning of the array
        moduleObjects.unshift(defaultModule);
        // Push the sorted and updated moduleObjects to the sidebar form control
        this.sidebarConfig.form.formControls[1].values[0].values = moduleObjects;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  // Filling master sub-module dropdown
  getMasterGroupModule() {
    const defaultModule = {
      name: 'Select Group',
      code: "",
      Mcode:""
    };
    // API call to get master sub-modules
    this.featurescommonService.getData(this.mstGroupApiGet).subscribe(
      (response) => {
        // Extract group module objects from the API response
        const groupModuleObjects = response.content.map((groupmodule: any) => ({
          name: groupmodule.lable,
          code: groupmodule.groupId,
          Mcode: groupmodule.groupModuleId.moduleId,
        }));
        // Sort groupModuleObjects based on the "name" property
        groupModuleObjects.sort((a: any, b: any) => a.name.localeCompare(b.name));
          // Add the default option to the beginning of the array
          groupModuleObjects.unshift(defaultModule);
        // Push the sorted groupModuleObjects to the sidebar form control
        this.sidebarConfig.form.formControls[1].values[1].values = groupModuleObjects;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }


  fetchMstSubModuleData() {
    //fetch Data form API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        // Update the mstSubData with the API response
        this.mstSubData = response.content.map((item: any, index: number) => ({
          id: index + 1,
          smId: item.smId,
          label: item.label,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstModule: item.sbGroupId.groupModuleId.label,
          mstModuleId: item.sbGroupId.groupModuleId.moduleId,
          mstGroup: item.sbGroupId.lable,
          mstGroupId: item.sbGroupId.groupId
        }));
        // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
      },
      (error) => {
        console.log('API Error:', error);
      }
    )
  }

  addOrUpdateMstSub(subData: any, isEditMode: boolean) {
    // Prepare the object to be sent in the API request
    if (subData.mstModuleMstGroup[1].code) {
      let obj = {
        smId: subData.smId,
        label: subData.label,
        icon: subData.icon,
        routerLink: subData.routerLink,
        sequence: subData.sequence,
        sbGroupId: {
          groupId: subData.mstModuleMstGroup[1].code,
          lable: subData.mstModuleMstGroup[1].name,
          groupModuleId: {
            moduleId: subData.mstModuleMstGroup[0].code,
            label: subData.mstModuleMstGroup[0].name
          }
        }
      };
      // Determine the API endpoint based on the 'isEditMode' flag
      const apiEndpoint = isEditMode ? this.apiUpdate : this.apiAdd;
      // Call the corresponding API method (addData or updateData) based on the 'isEditMode' flag
      this.featurescommonService[isEditMode ? 'updateData' : 'addData'](obj, apiEndpoint).subscribe(
        (response) => {
          // Update the mstSubData with the API response
          this.mstSubData = response.result.map((item: any, index: number) => ({
            id: index + 1,
            smId: item.smId,
            label: item.label,
            routerLink: item.routerLink,
            sequence: item.sequence,
            isActive: item.isActive,
            mstModule: item.sbGroupId.groupModuleId.label,
            mstModuleId: item.sbGroupId.groupModuleId.moduleId,
            mstGroup: item.sbGroupId.lable,
            mstGroupId: item.sbGroupId.groupId
          })); // Set the flag to indicate that data is ready for refreshing the grid
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
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Add First Group Module' });
    }
  }

  deleteMstSub(subData: any) {
    this.featurescommonService.deleteData(this.apidelete, subData.smId).subscribe(
      (response) => {
        // Update the mstSubData with the API response
        this.mstSubData = response.result.map((item: any, index: number) => ({
          id: index + 1,
          smId: item.smId,
          label: item.label,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstModule: item.sbGroupId.groupModuleId.label,
          mstModuleId: item.sbGroupId.groupModuleId.moduleId,
          mstGroup: item.sbGroupId.lable,
          mstGroupId: item.sbGroupId.groupId
        })); // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      }
    );
    // Reset the flag to indicate that data is not ready for refreshing the grid yet
    this.isDataReady = false;
  }

  toggleMstSubStatus(subData: any) {
    if (!subData.isActive) {
      this.featurescommonService.reactiveData(this.apiactive, subData, subData.smId).subscribe(
        (response) => {
          // Update the mstSubData with the API response
          this.mstSubData = response.result.map((item: any, index: number) => ({
            id: index + 1,
            smId: item.smId,
            label: item.label,
            routerLink: item.routerLink,
            sequence: item.sequence,
            isActive: item.isActive,
            mstModule: item.sbGroupId.groupModuleId.label,
            mstModuleId: item.sbGroupId.groupModuleId.moduleId,
            mstGroup: item.sbGroupId.lable,
            mstGroupId: item.sbGroupId.groupId
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

  bulkDeleteMstSubModule(arrayOfSubData: any) {
    if (arrayOfSubData != 0) {
      this.isDataReady = false;
      arrayOfSubData.forEach((subData: any) => {
        this.deleteMstGroupForBulk(subData);
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

  deleteMstGroupForBulk(subData: any) {
    this.featurescommonService.deleteData(this.apidelete, subData.smId).subscribe(
      (response) => {
        // Update the mstSubData with the API response
        this.mstSubData = response.result.map((item: any, index: number) => ({
          id: index + 1,
          smId: item.smId,
          label: item.label,
          routerLink: item.routerLink,
          sequence: item.sequence,
          isActive: item.isActive,
          mstModule: item.sbGroupId.groupModuleId.label,
          mstModuleId: item.sbGroupId.groupModuleId.moduleId,
          mstGroup: item.sbGroupId.lable,
          mstGroupId: item.sbGroupId.groupId
        }));
        // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        //set the flag to indicate that message for delete
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
    this.selectedSubData = undefined;
  }

  confirmAction($event: any) {
    if ($event == false) {
      this.fetchMstSubModuleData();
    }
    else {
      if ($event.isActive) {
        this.deleteMstSub($event);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error' })
      }
    }
  }

  onEdit($event: any) {
    // Extract properties from the editRow of the event
    const { mstModuleId, mstGroupId, label, icon, routerLink, sequence } = $event.editRow;
    this.sidebarConfig.form.formControls[0].isVisible = true;
    //Prepares the selected MST group data to be edited in the sidebar
    this.selectedSubData = {
      smId: $event.editRow.smId,
      mstModuleMstGroup: [mstModuleId, mstGroupId],
      label,
      icon,
      routerLink,
      sequence
    };
    this.isEditMode = true;
  }


  initializeAddForm($event: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedSubData = [];
    this.isEditMode = false;
    this.common.sendEditData(false);
  }

  handleButtonClick($event: any) {
    // Clears the selectedGroupData when closing the sidebar
    this.selectedSubData = undefined;
    this.common.sendEditData(false);
  }

  sidebarData($event: any) {
    if ($event == 'reset') { }
    else {
      this.addOrUpdateMstSub($event, this.isEditMode);
    }
  }

}
