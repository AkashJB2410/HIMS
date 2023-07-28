import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import Application_breadcrumb from './breadcrum.json';
import mstModuleTableConfig from './mstModuleTableConfig.json';
import mstModuleSidebarConfig from './mstModuleSidebarConfig.json';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';

@Component({
  selector: 'app-master-module',
  templateUrl: './master-module.component.html',
})
export class MasterModuleComponent implements OnInit {
  //variable declarations
  selectedModuleData: any;
  isEditMode: boolean;
  applicationBreadcrumb = Application_breadcrumb;
  mstModuleData: any[];
  gridConfigurations: any;
  tableConfig: any;
  isDataReady = false;
  sidebarConfig: any = mstModuleSidebarConfig;
  deleteMsg = false;

  //API declarations
  apiGet = 'mstModule/list';
  apiAdd = 'mstModule/create';
  apiUpdate = 'mstModule/update';
  apidelete = 'mstModule/inActivate';
  apiactive = 'mstModule/activate';

  constructor(
    private messageService: MessageService,
    private featurescommonService: FeaturescommonService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.gridConfigurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getConfigForTable();
    this.fetchMstModuleData();
  }

  getConfigForTable() {
    this.tableConfig = mstModuleTableConfig;
  }

  fetchMstModuleData() {
    //fetch Data from API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        //response stored in mstMouldeData with id as index
        this.mstModuleData = response.content.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
         //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
      },
      (error) => {
        console.error('API Error:', error);
      });
  }

  addMstModuleData(moduleData: any) {
    //adding data into database
    this.featurescommonService.addData(moduleData, this.apiAdd).subscribe(
      (response) => {
        //response stored in mstMouldeData with id as index
        this.mstModuleData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
         //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
       //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  updateMstModule(moduleData: any) {
    //updating data into database
    this.featurescommonService.updateData(moduleData, this.apiUpdate).subscribe(
      (response) => {
        //response stored in mstMouldeData with id as index
        this.mstModuleData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
         //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
       //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  deleteMstModule(moduleData: any) {
    // deleting data from database
    this.featurescommonService.deleteData(this.apidelete, moduleData.moduleId).subscribe(
      (response) => {
        //response stored in mstMouldeData with id as index
        this.mstModuleData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
         //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
       //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  toggleModuleStatus(moduleData: any) {
    if (moduleData.isActive == false) {
      //reactiveting data form database
      this.featurescommonService.reactiveData(this.apiactive, moduleData, moduleData.moduleId).subscribe(
        (response) => {
          //response stored in mstMouldeData with id as index
          this.mstModuleData = response.result.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
          }));
           //changing the value of isDataReady to refresh the gird
          this.isDataReady = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        });
        //changing the value of isDataReady to refresh the gird
      this.isDataReady = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error' })
    }
  }

  bulkDeleteMstModules(arrayOfModuleData: any[]) {
    if (arrayOfModuleData.length != 0) {
      this.isDataReady = false;
      //send one by one moduledata to delete method
      arrayOfModuleData.forEach((moduleData: any) => {
        this.deleteMstModuleForBulk(moduleData);
      })
      if (this.deleteMsg) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bulk Delete' });
        this.deleteMsg=false;
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Row Selected', });
    }
  }

  deleteMstModuleForBulk(moduleData: any) {
    this.featurescommonService.deleteData(this.apidelete, moduleData.moduleId).subscribe(
      (response) => {
        //response stored in mustMouldeData with id as index
        this.mstModuleData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
         //changing the value of isDataReady to refresh the gird
        this.isDataReady = true;
        //changing the value of deleteMsg to display the delete message
        this.deleteMsg = false;
      },
      (error) => {
        console.log('delete API Error', error);
      });
      //changing the value of isDataReady to refresh the gird
    this.isDataReady = false;
  }

  confirmAction(e: any) {
    if (e === false) {
      this.fetchMstModuleData();
    } else {
      if (e.isActive) {
        this.deleteMstModule(e);
      } else {
      }
    }
  }

  closeSidebarData(e: any) {
      //removing last selectedModuleData
    this.selectedModuleData = undefined;
  }

  sidebarData(e: any) {
    if (e === 'reset') {} 
    else if (this.isEditMode) {
      this.addMstModuleData(e);
    } else {
      this.updateMstModule(e);
    }
  }

  onEdit(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = true;
    this.selectedModuleData = e.editRow;
    this.isEditMode = false;
  }

  initializeAddForm(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedModuleData = [];
    this.isEditMode = true;
    this.common.sendEditData(false);
  }

  handleButtonClick(e: any) {
     //removing last selectedModuleData
    this.selectedModuleData = undefined;
    this.common.sendEditData(false);
  }
}