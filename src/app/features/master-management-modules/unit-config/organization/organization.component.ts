import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import organization_breadcrumb from './organization-breadcrumb.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import orgSidebarConfig from './orgSidebarConfig.json'
import orgTableConfig from './orgTableConfig.json'
import { FeaturescommonService } from 'src/app/features/shared/featurescommon.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  // styleUrls: ['./organization.component.css']
  styles: [`
  :host ::ng-deep .p-component-overlay {
    width: 100%;
  }
`]
})

export class OrganizationComponent implements OnInit {  
  selectedOrgData: any;
  isEditMode: boolean;
  applicationBreadcrumb = organization_breadcrumb;
  orgData: any[];
  gridConfigurations: any;
  tableConfig: any;
  isDataReady = false;
  sidebarConfig: any = orgSidebarConfig;
  deleteMsg = false;

  apiGet="mstOrganization/list";
  apiAdd="mstOrganization/create";
  apiUpdate="mstOrganization/update";
  apidelete="mstOrganization/inActivate";
  apiactive="mstOrganization/activate";

  constructor(private messageService: MessageService, private common:CommonService, private featurescommonService:FeaturescommonService) { }
  
  ngOnInit(): void {
    this.gridConfigurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getConfigForTable();
    this.fetchOrgData();
  }

  getConfigForTable() {
    this.tableConfig = orgTableConfig;
  }

  fetchOrgData() {
    //fetch Data from API
    this.featurescommonService.getData(this.apiGet).subscribe(
      (response) => {
        //response stored in OrgData with id as index
        this.orgData = response.content.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        this.isDataReady = true;
      },
      (error) => {
        console.error('API Error:', error);
      });
  }

  addOrgData(orgData: any) {
    //adding data into database
    this.featurescommonService.addData(orgData, this.apiAdd).subscribe(
      (response) => {
        //response stored in OrgData with id as index
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      });
    this.isDataReady = false;
  }

  updateOrg(orgData: any) {
    //updating data into database
    this.featurescommonService.updateData(orgData, this.apiUpdate).subscribe(
      (response) => {
        //response stored in OrgData with id as index
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      });
    this.isDataReady = false;
  }

  deleteOrg(orgData: any) {
    // deleting data from database
    this.featurescommonService.deleteData(this.apidelete, orgData.orgId).subscribe(
      (response) => {
        //response stored in OrgData with id as index
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        this.isDataReady = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      });
    this.isDataReady = false;
  }

  toggleOrgStatus(orgData: any) {
    if (orgData.isActive == false) {
      //reactiveting data into database
      this.featurescommonService.reactiveData(this.apiactive, orgData, orgData.orgId).subscribe(
        (response) => {
          //response stored in OrgData with id as index
          this.orgData = response.result.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
          }));
          this.isDataReady = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.metadata.message })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        });
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
        //response stored in OrgData with id as index
        this.orgData = response.result.map((item: any, index: number) => ({
          ...item,
          id: index + 1,
        }));
        this.isDataReady = true;
        this.deleteMsg = false;
      },
      (error) => {
        console.log('delete API Error', error);
      });
    this.isDataReady = false;
  }

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
    this.selectedOrgData = undefined;
  }

  sidebarData(e: any) {
    if (e === 'reset') {}
     else if (this.isEditMode) {
      this.addOrgData(e);
    } else {
      this.updateOrg(e);
    }
  }

  onEdit(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = true;
    this.selectedOrgData = e.editRow;
    this.isEditMode = false;
  }

  initializeAddForm(e: any) {
    this.sidebarConfig.form.formControls[0].isVisible = false;
    this.selectedOrgData = [];
    this.isEditMode = true;
    this.common.sendEditData(false);
  }

  handleButtonClick(e: any) {
    this.selectedOrgData = undefined;
    this.common.sendEditData(false);
  }  
}
