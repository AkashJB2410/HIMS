import { Component, OnInit } from '@angular/core';
import groupForm from './group_form.json';
import groupTable from './group_TableConfig.json';
import Group_breadcrumb from './Group_breadcrumb.json';
import { GroupModuleService } from './group-module.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import { MasterPageComponent } from '../master-page/master-page.component';
@Component({
  selector: 'app-group-module',
  templateUrl: './group-module.component.html',
  styleUrls: ['./group-module.component.css']
})
export class GroupModuleComponent implements OnInit {
  tableConfig: any;
  visibleSidebar: boolean = true;
  groupFormData: any = groupForm;
  Group_breadcrumb=Group_breadcrumb
  configurations: any;
  data: any;
  formdata: any;
  isdataReady = false;
  groupData: any = [];
  flag: any;
  editData:any;
  constructor(private messageService: MessageService, private http: GroupModuleService,private common:CommonService, private sidenav:MasterPageComponent) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = groupTable;
    // this.getConfigForTable();
    this.getAllGroup();
    this.assignOptions();
  }

  onAdd(e: any) {
    this.editData=[]
    this.flag = e;
  }

  onEdit(e:any){
    this.flag=e.edit
    let obj = {
      "groupId": e.editRow.groupId,
          "mstModule": e.editRow.mstModule,
          "lable": e.editRow.lable,
          "icon": e.editRow.icon,
          "routerLink": e.editRow.routerLink,
          "sequence": e.editRow.sequence,
          "is_Active": e.editRow.is_Active,
          "mstModule_name": e.editRow.mstModule,
    }
    this.editData=obj;
  }
  buttonEvent(e:any){
    this.editData=undefined;
this.common.sendEditData(false);
  }

  isActive(event: string) {
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
    });
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  getConfigForTable() {
    this.tableConfig = groupTable;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  BulkDeleteRows(e: any) {
    this.groupData = [];
 
    if (e != '') {
      e.forEach((data:any) => {
        if(data.is_Active!=false){
        let obj ={
          "groupId": data.groupId,
        }
        this.deleteGroup(obj.groupId);
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
        this.updateGroup(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfully.',
        });
      } else {
        this.submitGroup(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data saved successfully.',
        });
      }
    }
  }

  confirmAction(e: any) {
    if(e != false){
    this.deleteGroup(e.groupId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
  }
  }

  getAllGroup() {
    this.data = undefined;
    this.groupData = [];
    this.http.GetAllGroupData().subscribe((res) => {
      res.forEach((e: any, index:any) => {
        let obj = {
          "id":index,
          "groupId": e.groupId,
          "mstModule": e.mstModule.moduleId,
          "lable": e.lable,
          "icon": e.icon,
          "routerLink": e.routerLink,
          "sequence": e.sequence,
          "is_Active": e.is_Active,
          "mstModule_name": e.mstModule.label,
        }
        this.groupData.push(obj);
      })
      this.data = [...this.groupData];
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
      this.data;
      if(this.isdataReady){
        this.sidenav.getALLSideNavData();
      }
    })
  }

  updateGroup(groupId: any) {
    this.http.updateGroupData(groupId).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
    });
  }

  deleteGroup(groupId: any) {
    this.http.deleteGroupData(groupId).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
    });
  }

  submitGroup(groupId: any) {
    this.http.saveGroupData(groupId).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
    });
  }

  assignOptions() {
    this.formdata = Object.assign({}, groupForm);
    this.formdata.form.formControls.forEach((data: any) => {
      data.values = [];
      if (data.formControlName === "selectmstModule") {
        let defaultObj = {
          "name": "Select Master Module",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllMasterModuleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.label,
              "code": e.moduleId
            }
            data.values.push(obj);
          })
        })
      }
    })
  }
}
