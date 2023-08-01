import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import organization_breadcrumb from './organization-breadcrumb.json';
import { CommonService } from 'src/app/core/shared/service/common.service';
import orgSidebarConfig from './orgSidebarConfig.json'
import orgTableConfig from './orgTableConfig.json'
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  // styleUrls: ['./organization.component.css']
  styles: [
    `
      :host ::ng-deep .p-component-overlay {
        width: 100%;
      }
    `,
  ],
})

export class OrganizationComponent implements OnInit {
  //variable declarations
  selectedOrgData: any;
  isEditMode: boolean;
  applicationBreadcrumb = organization_breadcrumb;
  orgData: any[];
  gridConfigurations = {
    "isFilter": false,
    "isTable": true,
    "isSideBar": true,
    "isConfirmation": true
  };
  tableConfig = orgTableConfig;
  isDataReady = false;
  sidebarConfig: any = orgSidebarConfig;
  deleteMsg = false;

  //API declarations
  apiGet = "mstOrganization/list";
  apiAdd = "mstOrganization/create";
  apiUpdate = "mstOrganization/update";
  apidelete = "mstOrganization/inActivate";
  apiactive = "mstOrganization/activate";

  constructor(private messageService: MessageService, private common: CommonService, private featurescommonService: FeaturescommonService) { }

  ngOnInit(): void {
    this.fetchOrgData();
  }

  fetchOrgData() {
    //fetch Data from API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        // Update the mstGroupData with the API response
        this.orgData = response.content.map((item: any, index: number) => ({
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

  addOrUpdateOrgData(orgData: any, isEditMode: boolean) {
    // Determine the API endpoint based on the 'isEditMode' flag
    const apiEndpoint = isEditMode ? this.apiUpdate : this.apiAdd;

    // Call the corresponding API method (addData or updateData) based on the 'isEditMode' flag
    this.featurescommonService[isEditMode ? 'updateData' : 'addData'](orgData, apiEndpoint).subscribe(
      (response) => {
        // Update the orgData with the API response
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    );
    // Set the flag to indicate that data is not yet ready for refreshing the grid
    this.isDataReady = false;
  }

  // addOrgData(orgData: any) {
  //   //adding data into database
  //   this.featurescommonService.addData(orgData, this.apiAdd).subscribe(
  //     (response) => {
  //       //response stored in OrgData with id as index
  //       this.orgData = response.result.map((item: any, index: number) => ({
  //         ...item,
  //         id: index + 1,
  //       }));
  //        //changing the value of isDataReady to refresh the gird
  //       this.isDataReady = true;
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
  //     },
  //     (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  //     });
  //      //changing the value of isDataReady to refresh the gird
  //   this.isDataReady = false;
  // }

  // updateOrg(orgData: any) {
  //   //updating data into database
  //   this.featurescommonService.updateData(orgData, this.apiUpdate).subscribe(
  //     (response) => {
  //       //response stored in OrgData with id as index
  //       this.orgData = response.result.map((item: any, index: number) => ({
  //         ...item,
  //         id: index + 1,
  //       }));
  //        //changing the value of isDataReady to refresh the gird
  //       this.isDataReady = true;
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
  //     },
  //     (error) => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  //     });
  //      //changing the value of isDataReady to refresh the gird
  //   this.isDataReady = false;
  // }

  deleteOrg(orgData: any) {
    this.featurescommonService.deleteData(this.apidelete, orgData.orgId).subscribe(
      (response) => {
        // Update the orgData with the API response
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      });
    // Reset the flag to indicate that data is not ready for refreshing the grid yet
    this.isDataReady = false;
  }

  toggleOrgStatus(orgData: any) {
    if (!orgData.isActive) {
      this.featurescommonService.reactiveData(this.apiactive, orgData, orgData.orgId).subscribe(
        (response) => {
          // Update the orgData with the API response
          this.orgData = response.result.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
          }));
          // Set the flag to indicate that data is ready for refreshing the grid
          this.isDataReady = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        });
      // Reset the flag to indicate that data is not ready for refreshing the grid yet
      this.isDataReady = false;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error' })
    }
  }

  bulkDeleteOrg(arrayOfOrgData: any[]) {
    if (arrayOfOrgData.length != 0) {
      this.isDataReady = false;
      arrayOfOrgData.forEach((orgData: any) => {
        this.deleteOrgForBulk(orgData);
      })
      if (this.deleteMsg) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bulk Delete' });
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Row Selected', });
    }
  }

  deleteOrgForBulk(orgData: any) {
    this.featurescommonService.deleteData(this.apidelete, orgData.orgId).subscribe(
      (response) => {
        // Update the orgData with the API response
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        // Set the flag to indicate that data is ready for refreshing the grid
        this.isDataReady = true;
        // Set the flag to indicate that message to show
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
      this.fetchOrgData();
    } else {
      if (e.isActive) {
        this.deleteOrg(e);
      } else {
      }
    }
  }

  closeSidebarData(e: any) {
    // Clears the selectedGroupData when closing the sidebar
    this.selectedOrgData = undefined;
  }

  sidebarData(e: any) {
    if (e === 'reset') { }
    else {
      this.addOrUpdateOrgData(e, this.isEditMode)
    }
  }

  onEdit(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = true;
    this.selectedOrgData = e.editRow;
    this.isEditMode = true;
  }

  initializeAddForm(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedOrgData = [];
    this.isEditMode = false;
    this.common.sendEditData(false);
  }

  handleButtonClick(e: any) {
    // Clears the selectedGroupData when closing the sidebar
    this.selectedOrgData = undefined;
    this.common.sendEditData(false);
  }
}
