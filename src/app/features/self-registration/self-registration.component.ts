import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import selfRegForm from './selfRegForm.json';
import selfRegTable from './selfRegTableConfig.json';
import selfRegbreadcrumb from './selfReg_breadcrumb.json'
import { CommonService } from 'src/app/core/shared/service/common.service';
import { SelfRegistrationService } from './self-registration.service';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.css']
})
export class SelfRegistrationComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  selfRegFormData: any = selfRegForm;
  selfRegbreadcrumb = selfRegbreadcrumb
  configurations: any;
  data: any;
  isdataReady = false;
  SelfRegData: any = [];
  flag: any;
  errorFlag: boolean = false;
  editData: any
  constructor(private messageService: MessageService, private http: SelfRegistrationService, private common: CommonService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = selfRegTable;
    // this.getConfigForTable();
    this.getAllSelfReg();
  }

  onAdd(e: any) {
    this.editData = []
    this.flag = e;
  }

  onEdit(e: any) {
    this.flag = e.edit
    let obj = {
      "firstName": e.editRow.firstName,
      "middleName": e.editRow.middleName,
      "lastName": e.editRow.lastName,
      "gender_Type": e.editRow.gender_Type,
      "age": e.editRow.age,
      "mobileNo": e.editRow.mobileNo,
    }
    this.editData = obj;
  }
  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }
  editRow(e: any) {
    this.visibleSidebar = true;
  }

  getConfigForTable() {
    this.tableConfig = selfRegTable;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  
  sidebarData(e: any) {
    if (e != 'reset') {
        this.submitSelfReg(e);
    }
  }

  getAllSelfReg() {
    this.data = undefined;
    this.SelfRegData = [];
    this.http.GetAllSelfRegData().subscribe((res) => {
      res.forEach((e: any, index: any) => {
        let obj = {

        }
        this.SelfRegData.push(obj);
        for (let i = 0; i < this.SelfRegData.length; i++) {
          this.SelfRegData[i].srNo = i + 1;
        }
      })
      this.data = [...this.SelfRegData];
      this.isdataReady = true;
    })
  }

  submitSelfReg(applicationId: any) {
    const param = {

    };
    this.http.saveSelfRegData(param).subscribe((resData) => {
      this.data = undefined;
      this.getAllSelfReg();
      if (resData.id != "") {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data save successfull.',
        });
      }
    }, (error) => {                              //Error callback
      console.log('error caught in component : ', error.error.error)
      this.errorFlag = true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "This key name is alredy exit" });
    });
  }
}
