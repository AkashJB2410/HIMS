import { Component, OnInit } from '@angular/core';
import organizationDetails from './organization_table-config.json'
import addneworg from './organizationForm.json'
import { MessageService } from 'primeng/api';
import { OrganizationServiceService } from './organization.service';
import organization_breadcrumb from './organization-breadcrumb.json'

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

  orgDetails:any
  addneworganization:any =addneworg;
  configurations: any
  data:any;
  config: any;
  visibleSidebar: boolean = true;
  isdataReady = false;
  saveMethod: boolean=false;
  organization_breadcrumb =organization_breadcrumb;
  constructor(private messageService: MessageService,private http: OrganizationServiceService) { }
  
  ngOnInit(): void {
    
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllOrgData();
    this.getConfigForTable();
  }

  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e)
    } else if (e == 'cancel') {
      console.log(e)
    }
  }

  getConfigForTable() {    
    this.orgDetails = organizationDetails;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  saveOrg(e:any){
    this.saveMethod = true;
  }

  editOrg(e:any){

  }

  isActive(data:any){
    
    if(data.is_Deleted){
      this.http.reactiveOrgData(data)
        .subscribe(b_Data => {
          this.data = undefined;
          this.getAllOrgData();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Organization Enable Successfully' });  
    }
    else if(!data.is_Deleted){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Organization is already Active' });
    }
  }


  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (this.saveMethod) {
      console.log(e)      
      this.submitOrgData(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Organization Added Successfully' });
      this.saveMethod=false;
    } else {
      console.log(e);      
      this.updateOrgData(e);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Organization Updated Successfully.' });      
    }
  }  

  submitOrgData(orgData: any) {
    console.log("hello");
    
    this.http.saveOrgData(orgData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllOrgData();
        console.log("data" + data)
      })
  } 

  getAllOrgData() {
    this.http.GetAllOrgData().subscribe(res => {
      this.data = res;
      this.isdataReady = true;
      for(let i=0; i<this.data.length;i++){
        this.data[i].srNo=i+1;
      }
      this.data;
    })
  }

  updateOrgData(orgData:any){
    this.http.updateOrgData(orgData)
    .subscribe(data => {
      this.data = undefined;
      this.getAllOrgData();
      console.log("data" + data)
    })
  }


  deleteOrgData(orgData: any) {
    this.http.deleteOrgData(orgData.orgId)
      .subscribe(data => {
        this.data = undefined;
        this.getAllOrgData();
        console.log("data" + data)
      })
  }
  
  confirmAction(e: any) {
    if(e.is_Active==true){
      this.data=undefined;
    this.deleteOrgData(e);    
    this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Organization Disabled Successfully' });
    }
    else if (e.is_Active==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Organization is already Disabled' });
    }
    else{}
  }

  
}
