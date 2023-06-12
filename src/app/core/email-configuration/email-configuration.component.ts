import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import emailConfigData from './emailConfig.json';
import emailConfig_table_config from './emailConfig_table_config.json';
import { EmailConfigurationService } from '../shared/service/email-configuration.service';

@Component({
  selector: 'app-email-configuration',
  templateUrl: './email-configuration.component.html'
})
export class EmailConfigurationComponent implements OnInit {

  toast: any = {};
  showToast: any;
  Message: any;
  data: any;
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  sidebarJSON: any = emailConfigData;

  constructor(private messageService: MessageService, private http: EmailConfigurationService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllEmailData();
    this.getConfigForTable();
  }

  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e)
    } else if (e == 'cancel') {
      console.log(e)
    }
  }
  
  getAllEmailData() {
    this.http.GetAllEmailData().subscribe(res => {
      this.data = res;
      this.isdataReady = true;
    })
  }

  getConfigForTable() {
    this.config = emailConfig_table_config;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    this.data = undefined;
    this.deleteEmailData(e.id);
    
    this.messageService.add({ severity: 'success', summary: 'Message form User component', detail: 'Deleted Sucessfully' });
    console.log("Deleted" + JSON.stringify(e))
  }
  deleteEmailData(emailId: any) {
    this.http.deleteEmailData(emailId)
      .subscribe(data => {
        this.getAllEmailData();
        console.log("data" + data)
      })
  }
  
  sidebarData(e: any) {
    console.log("From User Management ==> ", e);
    if (e == 'reset') {
      console.log(e)
    } else if (e.idInput == true) {
      this.submitEmailData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data save successfull.' });
    } else {
      this.updateEmpailData(e);
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Data updated successfull.' });
    }
  }
  
  submitEmailData(roleData: any) {
    this.http.saveEmailData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllEmailData();
      })
  }

  updateEmpailData(roleData:any){
    this.http.updateEmailData(roleData)
    .subscribe(data => {
      this.data = undefined;
      this.getAllEmailData();
    })
  }

  fiteredData(e: any) {
    this.data = undefined;
  }
}
