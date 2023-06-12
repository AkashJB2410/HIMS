import { Component, OnInit } from '@angular/core';
import smsConfig from './smsConfig.json';
import newSmsConfig from './newSmsConfig.json';
import smsConfig_table_config from './smsConfig_table_config.json';
import { MessageService } from 'primeng/api';
import { SmsConfigurationService } from '../shared/service/sms-configuration.service';

@Component({
  selector: 'app-sms-configuration',
  templateUrl: './sms-configuration.component.html',
  styles: [`
  :host ::ng-deep .p-component-overlay {
    width: 100%;
  }
`]
})
export class SmsConfigurationComponent implements OnInit {

  toast: any = {};
  showToast: any;
  Message: any;
  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = smsConfig;
  // sidebarJSON: any = newSmsConfig;

  constructor(private messageService: MessageService, private http: SmsConfigurationService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllSMSData();
    this.getConfigForTable();
  }
  
  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e)
    } else if (e == 'cancel') {
      console.log(e)
    }
  }
 
  getAllSMSData() {
    this.http.GetAllSMSData().subscribe(res => {
      this.data = res;
      this.isdataReady = true;
    })
  }

 
  getConfigForTable() {
    // this.data = data;
    this.config = smsConfig_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    this.deleteSMSData(e.id);
    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  
  deleteSMSData(emailId: any) {
    this.http.deleteSMSData(emailId)
      .subscribe(data => {
        this.data = undefined;
        this.getAllSMSData();
        console.log("data" + data)
      })
  }
  
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (e.idInput == true) {
      console.log(e)
      this.data = undefined;
      this.submitSMSData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });
    } else {
      console.log(e);
      
      this.updateSMSData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });
      
    }
  }
 
  submitSMSData(roleData: any) {
    this.http.saveSMSData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllSMSData();
        console.log("data" + data)
      })
  }

  updateSMSData(roleData:any){
    this.http.updateSMSData(roleData)
    .subscribe(data => {
      this.data = undefined;
      this.getAllSMSData();
      console.log("data" + data)
    })
  }

  fiteredData(e: any) {
    this.data = undefined;
  }
}

