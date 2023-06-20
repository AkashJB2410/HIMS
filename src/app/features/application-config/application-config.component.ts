import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import ApplictionForm from './ApplicationConfig_Form.json';
import ApplictionTable from './ApplicationConfig_TableConfig.json';
import { ApplicationConfigService } from './application-config.service';
import Application_breadcrumb from './Application_breadcrumb.json'

@Component({
  selector: 'app-application-config',
  templateUrl: './application-config.component.html',
  styleUrls: ['./application-config.component.css']
})
export class ApplicationConfigComponent implements OnInit {
  tableConfig: any;
  visibleSidebar: boolean = true;
  ApplictionFormData: any = ApplictionForm;
  Application_breadcrumb=Application_breadcrumb
  configurations: any;
  data: any;
  isdataReady = false;
  applicationData: any = [];
  flag: any;
  errorFlag: boolean = false;
  constructor(private messageService: MessageService, private http: ApplicationConfigService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = ApplictionTable;
    // this.getConfigForTable();
    this.getAllApplication();
    console.log("working ")
  }

  onAdd(e: any) {
    this.flag = e;
  }

  isActive(event: string) {
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;
      this.getAllApplication();
    });
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  getConfigForTable() {
    this.tableConfig = ApplictionTable;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  BulkDeleteRows(e: any) {
    this.applicationData = [];
    if (e != '') {
      e.forEach((data: any) => {
        if (data.is_Active != false) {
          let obj = {
            "applicationId": data.applicationId,
          }
          this.deleteApplication(obj.applicationId);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'selected Rows',
            detail: ' Deleted.',
          });
        }
      });
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Delete All Data successfull.',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'select Rows',
        detail: 'Rows are not selected.',
      });
    }

  }
  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == "edit") {
        this.updateApplication(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitApplication(e);

      }
    }
  }

  confirmAction(e: any) {
    if (e != false) {
      this.deleteApplication(e.applicationId);
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Deleted Sucessfully',
      });
    }
  }

  getAllApplication() {
    this.data = undefined;
    this.applicationData = [];
    this.http.GetAllApplicationData().subscribe((res) => {
      res.forEach((e: any) => {
        let obj = {
          "applicationId": e.id,
          "keyname": e.keyname,
          "keyvalue": e.keyvalue,
          "is_Active": e.is_Active,
        }
        this.applicationData.push(obj);
      })
      this.data = [...this.applicationData];
      this.isdataReady = true;
    })
  }

  updateApplication(applicationId: any) {
    this.http.updateApplicationData(applicationId).subscribe((data) => {
      this.data = undefined;
      this.getAllApplication();
    });
  }

  deleteApplication(applicationId: any) {
    this.http.deleteApplicationData(applicationId).subscribe((data) => {
      this.data = undefined;
      this.getAllApplication();
    });
  }

  submitApplication(applicationId: any) {
    this.http.saveApplicationData(applicationId).subscribe((resData) => {
      this.data = undefined;
      this.getAllApplication();
      if (resData.id != "") {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data save successfull.',
        });
      }
    },(error) => {                              //Error callback
        console.log('error caught in component : ', error.error.error)
        this.errorFlag = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "This key name is alredy exit" });

      });
    }
  }
