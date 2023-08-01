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
  gridConfigurations= {
    isFilter: false,
    isTable: true,
    isSideBar: true,
    isConfirmation: true,
  };
  tableConfig=mstModuleTableConfig;
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
    this.fetchMstModuleData();
  }


  fetchMstModuleData() {
    //fetch Data from API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
       // Update the mstMouldeData with the API response
        this.mstModuleData = response.content.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
          // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
      },
      (error) => {
        console.error('API Error:', error);
      });
  }

  addOrUpdateMstModuleData(moduleData:any, isEditMode:boolean){
     // Determine the API endpoint based on the 'isEditMode' flag
     const apiEndpoint = isEditMode ? this.apiUpdate : this.apiAdd;
      // Call the corresponding API method (addData or updateData) based on the 'isEditMode' flag
      this.featurescommonService[isEditMode?'updateData':'addData'](moduleData,apiEndpoint).subscribe(
        (response)=>{
           // Update the mstMouldeData with the API response
           this.mstModuleData = response.result.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
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

  // addMstModuleData(moduleData: any) {
  //   //adding data into database
  //   this.featurescommonService.addData(moduleData, this.apiAdd).subscribe(
  //     (response) => {
  //       //response stored in mstMouldeData with id as index
  //       this.mstModuleData = response.result.map((item: any, index: number) => ({
  //         ...item,
  //         id: index + 1,
  //       }));
  //        //changing the value of isDataReady to refresh the gird
  //       this.isDataReady = true;
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
  //     },
  //     (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
  //     });
  //      //changing the value of isDataReady to refresh the gird
  //   this.isDataReady = false;
  // }

  // updateMstModule(moduleData: any) {
  //   //updating data into database
  //   this.featurescommonService.updateData(moduleData, this.apiUpdate).subscribe(
  //     (response) => {
  //       //response stored in mstMouldeData with id as index
  //       this.mstModuleData = response.result.map((item: any, index: number) => ({
  //         ...item,
  //         id: index + 1,
  //       }));
  //        //changing the value of isDataReady to refresh the gird
  //       this.isDataReady = true;
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
  //     },
  //     (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
  //     });
  //      //changing the value of isDataReady to refresh the gird
  //   this.isDataReady = false;
  // }

  deleteMstModule(moduleData: any) {
    this.featurescommonService.deleteData(this.apidelete, moduleData.moduleId).subscribe(
      (response) => {
        // Update the mstMouldeData with the API response
        this.mstModuleData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
         // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      });
        // Reset the flag to indicate that data is not ready for refreshing the grid yet
    this.isDataReady = false;
  }

  toggleModuleStatus(moduleData: any) {
    if (!moduleData.isActive) {
      this.featurescommonService.reactiveData(this.apiactive, moduleData, moduleData.moduleId).subscribe(
        (response) => {
          // Update the mstMouldeData with the API response
          this.mstModuleData = response.result.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
          }));
         // Set the flag to indicate that data is ready for refreshing the grid
          this.isDataReady = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        });
      // Reset the flag to indicate that data is not ready for refreshing the grid yet
      this.isDataReady = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error' })
    }
  }

  bulkDeleteMstModules(arrayOfModuleData: any[]) {
    if (arrayOfModuleData.length != 0) {
      this.isDataReady = false;
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
       // Update the mstMouldeData with the API response
        this.mstModuleData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
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

  //Handles the action after confirming an operation
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
      // Clears the selectedGroupData when closing the sidebar
    this.selectedModuleData = undefined;
  }

  sidebarData(e: any) {
    if (e === 'reset') {} 
    else {
     this.addOrUpdateMstModuleData(e, this.isEditMode);
    }
  }

  onEdit(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = true;
    this.selectedModuleData = e.editRow;
    this.isEditMode = true;
  }

  initializeAddForm(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedModuleData = [];
    this.isEditMode = false;
    this.common.sendEditData(false);
  }

  handleButtonClick(e: any) {
     // Clears the selectedGroupData when closing the sidebar
    this.selectedModuleData = undefined;
    this.common.sendEditData(false);
  }
}