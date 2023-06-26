import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import LOVForm from './LOV_valueForm.json';
import LOVTable from './LOV_valueTableConfig.json';
import { LovValueService } from './lov-value.service';
import LOV_breadcrumb from './LOV_valueBreadcrumb.json'

@Component({
  selector: 'app-lov-value',
  templateUrl: './lov-value.component.html',
  styleUrls: ['./lov-value.component.css']
})
export class LovValueComponent implements OnInit {

  tableConfig: any;
  visibleSidebar: boolean = true;
  LOVFormData: any = LOVForm;
  LOV_breadcrumb=LOV_breadcrumb
  configurations: any;
  data: any;
  formdata: any;
  isdataReady = false;
  LOVData: any = [];
  flag: any;
  constructor(private messageService: MessageService, private http: LovValueService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = LOVTable;
    // this.getConfigForTable();
    this.getAllLovValue();
    this.assignOptions();
  }

  onAdd(e: any) {
    this.flag = e;
  }

  isActive(event: string) {
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;
      this.getAllLovValue();
    });
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  getConfigForTable() {
    this.tableConfig = LOVTable;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  BulkDeleteRows(e: any) {
    this.LOVData = [];
 
    if (e != '') {
      e.forEach((data:any) => {
        if(data.is_Active!=false){
        let obj ={
          "lovListId": data.lovListId,
        }
        this.deleteLovValue(obj.lovListId);
      } else{
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
    }else{
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
        this.updateLovValue(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitLovValue(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data save successfull.',
        });
      }
    }
  }

  confirmAction(e: any) {
    if(e != false){
    this.deleteLovValue(e.lovListId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
  }
  }

  getAllLovValue() {
    this.data = undefined;
    this.LOVData = [];
    this.http.GetAllLovValueData().subscribe((res) => {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
      res.forEach((e: any) => {
        let obj = {
          "lovListId": e.lovListId,
          "lovTypeId": e.mstLovType.lovTypeId,
          "value": e.value,
          "typeOfField": e.typeOfField,
          "description": e.description,
          "lovTypeName": e.mstLovType.name,
          "is_Active": e.is_Active,
        }
        this.LOVData.push(obj);
      })
      this.data = [...this.LOVData];
      this.isdataReady = true;
    })
  }

  updateLovValue(LOV_ValueId: any) {
    this.http.updateLovValueData(LOV_ValueId).subscribe((data) => {
      this.data = undefined;
      this.getAllLovValue();
    });
  }

  deleteLovValue(LOV_ValueId: any) {
    this.http.deleteLovValueData(LOV_ValueId).subscribe((data) => {
      this.data = undefined;
      this.getAllLovValue();
    });
  }

  submitLovValue(LOV_ValueId: any) {
    this.http.saveLovValueData(LOV_ValueId).subscribe((data) => {
      this.data = undefined;
      this.getAllLovValue();
    });
  }

  assignOptions() {
    this.formdata = Object.assign({}, LOVForm);
    this.formdata.form.formControls.forEach((data: any) => {
      data.values = [];
      if (data.formControlName === "selectlovType") {
        let defaultObj = {
          "name": "Select LOV Type",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllLovTypeData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.name,
              "code": e.lovTypeId
            }
            data.values.push(obj);
          })
        })
      }
    })
  }
}
