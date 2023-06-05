import { Component, OnInit } from '@angular/core';
import organizationDetails from './organization_table-config.json'
import addneworg from './organizationForm.json'
import { MessageService } from 'primeng/api';
import { OrganizationServiceService } from './organization.service';

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


  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (e.orgIdInput == true) {
      console.log(e)      
      this.submitOrgData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });
    } else {
      console.log(e);      
      this.updateOrgData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });      
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


  deleteOrgData(organization_Id: any) {
    this.http.deleteOrgData(organization_Id)
      .subscribe(data => {
        this.data = undefined;
        this.getAllOrgData();
        console.log("data" + data)
      })
  }
  
  confirmAction(e: any) {
    // this.data = undefined;
    this.deleteOrgData(e.organization_Id);    
    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }

  
}
