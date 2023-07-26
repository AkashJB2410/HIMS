import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Application_breadcrumb from './breadcrum.json';
import { FeaturescommonService } from '../shared/featurescommon.service';
import mstModuleTableConfig from './masterModuleTableConfig.json';
import masterModuleSidebarConfig from './masterModuleSidebarConfig.json';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-master-module',
  templateUrl: './master-module.component.html',
})
export class MasterModuleComponent implements OnInit {
  selectedModuleData: any;
  isEditMode: boolean;
  applicationBreadcrumb = Application_breadcrumb;
  mstModuleData: any[] = []; // Initialize as empty array
  gridConfig: any;
  visibleSidebar: boolean = false;
  gridConfigurations: any;
  tableConfig: any;
  isDataReady = false;
  sidebarConfig: any = masterModuleSidebarConfig;

  apiGet = 'mstModule/list';
  apiAdd = 'mstModule/create';
  apiUpdate = 'mstModule/update';
  apidelete = 'mstModule/inActivate';
  apiactive = 'mstModule/activate';

  constructor(
    private messageService: MessageService,
    private featurescommonService: FeaturescommonService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.gridConfigurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.mstModuleData =  JSON.parse(localStorage.getItem('mstModuleData') || '[]');
    this.getConfigForTable();
    if (this.mstModuleData.length === 0) {
      this.fetchMstModuleData();
    } else {
      this.isDataReady = true;
      console.log(this.mstModuleData);
      
    }
  }

  fetchMstModuleData() {
    this.featurescommonService.getData(this.apiGet).subscribe(
      (resData) => {
        // Map the data from the API response and add 'id' property as index + 1
        this.mstModuleData = resData.content.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        localStorage.setItem('mstModuleData', JSON.stringify(this.mstModuleData));
        this.isDataReady = true;
      },
      (error) => {
        console.error('API Error:', error);
        // Handle the error, show a message to the user, or retry the API call.
      }
    );
  }

  addMstModuleData(moduleData: any) {
    const saveData=moduleData;
    moduleData.id = this.mstModuleData.length + 1; // Auto-generate the moduleId
    moduleData.isActive = true; // Set isActive to true when adding data
    this.mstModuleData.push(moduleData); // Add the new moduleData to the local array
    localStorage.setItem('mstModuleData', JSON.stringify(this.mstModuleData));

    // Show a success message to the user
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data added to the table successfully.',
    });
    this.saveMstModuleDataToDB(saveData);
  }

  updateMstModule(moduleData: any) {
    // Find the index of the moduleData in the local array and update it
    const index = this.mstModuleData.findIndex((item) => item.id === moduleData.id);
    if (index !== -1) {
      this.mstModuleData[index] = moduleData;
      localStorage.setItem('mstModuleData', JSON.stringify(this.mstModuleData));
    }

    // Show a success message to the user
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data updated successfully.',
    });
  }

  toggleModuleStatus(e: any) {
    if (e.is_Deleted == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'Already Enabled',
      });
    } else {
      // Find the index of the moduleData in the local array and update it
      const index = this.mstModuleData.findIndex((item) => item.id === e.id);
      if (index !== -1) {
        this.mstModuleData[index].is_Deleted = false;
        localStorage.setItem('mstModuleData', JSON.stringify(this.mstModuleData));
      }

      // Show a success message to the user
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Enabled Successfully',
      });
    }
  }

  deleteMstModule(moduleId: any) {
    // Find the index of the moduleData in the local array and remove it
    const index = this.mstModuleData.findIndex((item) => item.id === moduleId);
    if (index !== -1) {
      this.mstModuleData.splice(index, 1);
      localStorage.setItem('mstModuleData', JSON.stringify(this.mstModuleData));
    }

    // Show a success message to the user
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Successfully',
    });
  }

  bulkDeleteMstModules(e: any[]) {
    const deletedModules = e.filter((item) => !item.is_Deleted);
    if (deletedModules.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'All Already Deleted',
      });
    } else {
      deletedModules.forEach((item) => this.deleteMstModule(item.moduleId));
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Successfully',
      });
    }
  }

  handleButtonClick(e: any) {
    this.selectedModuleData = undefined;
    this.common.sendEditData(false);
  }

  getConfigForTable() {
    this.tableConfig = mstModuleTableConfig;
  }

  editRow() {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    if (e === false) {
      this.fetchMstModuleData();
    } else {
      if (e.is_Deleted) {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Already Deleted',
        });
      } else {
        this.deleteMstModule(e.moduleId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Successfully',
        });
      }
      console.log('Deleted' + JSON.stringify(e));
    }
  }

  closeSidebarData(e: any) {
    this.selectedModuleData = undefined;
  }

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e === 'reset') {
      console.log(e);
    } else if (this.isEditMode) {
      console.log(e);
      this.addMstModuleData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data saved successfully.',
      });
    } else {
      console.log(e);
      this.updateMstModule(e);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data updated successfully.',
      });
    }
  }

  // Save data to the database
  saveMstModuleDataToDB(data:any) {
    // Assuming 'this.mstModuleData' contains the user-entered data in the table
    this.featurescommonService.addData(data, this.apiAdd).subscribe((response) => {
      // Update the 'mstModuleData' array with the data returned from the server (including the 'moduleId')
      this.mstModuleData = response.result.map((item: any, index: number) => ({
        ...item,
        id: index + 1,
      }));
      // Store the updated data in the local storage
      localStorage.setItem('mstModuleData', JSON.stringify(this.mstModuleData));
      // Show a success message to the user
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data saved to the database successfully.',
      });
    });
  }

  onEdit(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible=true;
    this.selectedModuleData = e.editRow;
    this.isEditMode = false;
  }

  initializeAddForm(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible=false;
    this.selectedModuleData = [];
    this.isEditMode = true;
    this.common.sendEditData(false);
  }

  resetForm(e: any) {
    this.selectedModuleData = undefined;
  }
}
